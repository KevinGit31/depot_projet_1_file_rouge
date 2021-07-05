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


#!/usr/bin/bash

#Test si openjdk est installé
dpkg -l | grep openjdk-8-jdk
RETOUR_INSTALL_OPENJDK=$?
#Test presence du binaire nexus
RETOUR_BIN_NEXUS=/opt/nexus/bin/nexus

if [[ $RETOUR_INSTALL_OPENJDK = 0 ]] && [[ ! -f $RETOUR_BIN_NEXUS ]]; then
    echo "Serveur Nexus déjà installé"
    exit 0
fi

#mise en place du mot de passe pour vagrant
echo 'vagrant:vagrant' | sudo chpasswd

sudo apt -y update
sudo apt -y install openjdk-8-jdk

#Test si le user nexus existe
RETOUR_USER_NEXUS=sudo cat /etc/passwd | grep -i nexus
#creation du user nexus et positionnement dans le sudoers
if [[ $RETOUR_USER_NEXUS != 0 ]]; then
    useradd -M -d /opt/nexus -s /bin/bash -r nexus
    echo "nexus   ALL=(ALL)       NOPASSWD: ALL" > /etc/sudoers.d/nexus
fi

#Download des sources
URLDL=https://sonatype-download.global.ssl.fastly.net/repository/downloads-prod-group/3/nexus-3.29.2-02-unix.tar.gz
wget $URLDL
sleep 5s
if [[ ! -f nexus-3.29.2-02-unix.tar.gz ]]; then
    echo "Problème de download $URLDL \n"
    exit 0
fi

#creation du dossier cible
if [ ! -d "/opt/nexus" ]; then
        sudo mkdir /opt/nexus
        #decompression des sources dans le dossier cible
        tar xzf nexus-3.29.2-02-unix.tar.gz -C /opt/nexus --strip-components=1
        #positionnement du proprietaire dans le dossier cible
        chown -R nexus: /opt/nexus
fi

#positionnement du user nexus
grep "run_as_user=\"nexus\"" /opt/nexus/bin/nexus.rc
if [[ ! $? = 0 ]]; then
    sed -i 's/#run_as_user=""/run_as_user="nexus"/' /opt/nexus/bin/nexus.rc
fi

## Ajustement des chemins
sudo sed -i 's/..\/sonatype-work/.\/sonatype-work/g' /opt/nexus/bin/nexus.vmoptions
sudo sed -i 's/2073/1024/g' /opt/nexus/bin/nexus.vmoptions

#Demarrage de nexus
sudo -u nexus /opt/nexus/bin/nexus start

# Creation du serviceService
cat > /etc/systemd/system/nexus.service << 'EOL'
[Unit]
Description=nexus service
After=network.target

[Service]
Type=forking
LimitNOFILE=65536
ExecStart=/opt/nexus/bin/nexus start
ExecStop=/opt/nexus/bin/nexus stop
User=nexus
Restart=on-abort

[Install]
WantedBy=multi-user.target
EOL
#arret du service
/opt/nexus/bin/nexus stop
#activation du service au reboot machine
systemctl daemon-reload
systemctl enable --now nexus.service

#Autorisation de l'acces
ufw allow 8081/tcp

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

" >> /etc/fail2ban/jail.d/custom.conf

systemctl restart fail2ban


# Affiche le mot de passe
echo 'Mot de passe admin dans 5min en cours de generation PATIENTEZ SVP...:\n'
#Attente pour la generation du password
sleep 5m
cat /opt/nexus/sonatype-work/nexus3/admin.password
echo '\n\n'