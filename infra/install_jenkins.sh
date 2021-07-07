#!/bin/sh

# Alias server_jenkins
# Variable de mise en forme
RED='\033[0;31m'	# Red Color
YELLOW='\033[0;33m'	# Yellow Color
GREEN='\033[0;32m'	# Grean Color
NC='\033[0m' 		# No Color


##Fonction:
#Execution du script en tant que root
root_connect(){
    ID="$(id -u)"
    if ["$ID" -ne 0]; then
        1>&2 echo "Vous devez executer le script en tant que root"
        exit 1
    fi
}

#Installation des packages sous forme de fonction avec vérification si le package est installé
install_package() {
    PACKAGE="$1"
    if ! dpkg -l |grep --quiet "^ii.$PACKAGE"; then
        apt install -y "$PACKAGE"
    fi
}

#ajout de la source du package d'installation jenkins
source_jenkins() {
        if ! test -f /etc/apt/sources.list.d/jenkins.list ; then
        wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | apt-key add -
        sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
            /etc/apt/sources.list.d/jenkins.list'
    fi
}

#Droit de l'utilisateur
permission_user(){
    #sauvegarde du sudoers
    cp /etc/sudoers /etc/sudoers.old
    #ajout des droits du user dans le sudoers
    cat /etc/sudoers |
        echo "userjenkins      ALL(ALL)/bin/apt," >> sudo tee -a /etc/sudoers
}


# Installation de relay (webhook)
install_webhook(){
	wget -O /usr/local/bin/relay https://storage.googleapis.com/webhookrelay/downloads/relay-linux-amd64

	chmod +wx /usr/local/bin/relay
}

##Main

# On installe le pare-feu
install_package "ufw"

# On le met en route
ufw --force enable

# On lui fixe de nouvelles regles
ufw allow ssh
ufw allow 8080

# On prepare l'installation de jenkins
apt-get -y update
install_package "openjdk-11-jdk"
install_package "gnupg"
install_package "git"
install_package "unzip"
install_package "python3"
install_package "python3-pip"
install_package "python3-venv"

install_webhook

# On installe jenkins suivant les preconisations du site
source_jenkins

# On installe le paquet jenkins
apt-get update
install_package "jenkins"

# On demarre le service
echo "${GREEN}$(date +'%Y-%m-%d %H:%M:%S') [ INFO  ] : Démarrage du service Jenkins ... ${NC}"
service jenkins start

# On ajoute le nouvel utilisateur userjenkins + définition du password
echo "${GREEN}$(date +'%Y-%m-%d %H:%M:%S') [ INFO  ] : Création de l'utilisateur userjenkins ... ${NC}"
useradd -m userjenkins
echo "userjenkins:userjenkins" | chpasswd

# Modification des droits du userjenkins avec la sauvegarde
permission_user

# On affiche le mot de passe de jenkins
#sleep 30s
#echo "${GREEN}$(date +'%Y-%m-%d %H:%M:%S') [ INFO  ] : Mot de passe jenkins ... ${NC}"
#cat /var/lib/jenkins/secrets/initialAdminPassword | xargs echo

# On sauvegarde le fichier sshd_config
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bck

# On change l'option PasswordAuthentication de no à yes dans le fichier sshd_config
sed "s/PasswordAuthentication no/PasswordAuthentication yes/" \
/etc/ssh/sshd_config.bck > /etc/ssh/sshd_config

#install fail2ban
install_package "fail2ban"

#start du service fail2ban + activation au démarrage
systemctl start fail2ban
systemctl enable fail2ban

#configuration fail2ban
echo "[DEFAULT]
ignoreip = 127.0.0.1
findtime = 10m
bantime = 24h
maxretry = 3

[sshd]
enabled = true
logpath = /var/log/auth.log

[jenkins]
filter = jenkins
logpath = /var/log/jenkins.log

" >> /etc/fail2ban/jail.d/custom.conf

systemctl restart fail2ban

# On restart le service
systemctl restart sshd

sudo cat /var/lib/jenkins/secrets/initialAdminPassword