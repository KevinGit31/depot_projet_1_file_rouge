#!/usr/bin/bash


#Installation des packages sous forme de fonction avec vérification si le package est installé
install_package() {
    PACKAGE="$1"
    if ! dpkg -l |grep --quiet "^ii.$PACKAGE"; then
        sudo apt install -y "$PACKAGE"
    fi
}

#Test si openjdk est installé
dpkg -l | grep openjdk-8-jdk
RETOUR_INSTALL_OPENJDK=$?
#Test presence du binaire nexus
RETOUR_BIN_NEXUS=/opt/nexus/bin/nexus

if [[ $RETOUR_INSTALL_OPENJDK = 0 ]] && [[ ! -f $RETOUR_BIN_NEXUS ]]; then
    echo "Serveur Nexus déjà installé"
    exit 0
fi

sudo apt -y update

install_package openjdk-8-jdk
#Test si le user nexus existe
RETOUR_USER_NEXUS=sudo cat /etc/passwd | grep -i nexus
echo $RETOUR_USER_NEXUS
#creation du user nexus et positionnement dans le sudoers
if [[ $RETOUR_USER_NEXUS != 0 ]]; then
    sudo useradd -M -d /opt/nexus -s /bin/bash -r nexus
    sudo echo 'nexus   ALL=(ALL)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo
fi

#Download des sources
URLDL=https://sonatype-download.global.ssl.fastly.net/repository/downloads-prod-group/3/nexus-3.31.1-01-unix.tar.gz
wget $URLDL
sleep 5s

if [[ ! -f nexus-3.31.1-01-unix.tar.gz ]]; then
    echo "Problème de download $URLDL \n"
    exit 0
fi

#creation du dossier cible
if [ ! -d "/opt/nexus" ]; then
        sudo mkdir /opt/nexus
        #decompression des sources dans le dossier cible
        sudo tar xzf nexus-3.31.1-01-unix.tar.gz -C /opt/nexus --strip-components=1
        #positionnement du proprietaire dans le dossier cible
        sudo chown -R nexus: /opt/nexus
fi

#positionnement du user nexus
grep "run_as_user=\"nexus\"" /opt/nexus/bin/nexus.rc
if [[ ! $? = 0 ]]; then
    sudo sed -i 's/#run_as_user=""/run_as_user="nexus"/' /opt/nexus/bin/nexus.rc
fi

## Ajustement des chemins
sudo sed -i 's/..\/sonatype-work/.\/sonatype-work/g' /opt/nexus/bin/nexus.vmoptions
sudo sed -i 's/2703/1024/g' /opt/nexus/bin/nexus.vmoptions

# Creation du serviceService
sudo bash -c "cat > /etc/systemd/system/nexus.service" <<EOF
[Unit]
Description=nexus service
After=network.target

[Service]
Type=forking
LimitNOFILE=65536
ExecStart=/opt/nexus/bin/nexus start
ExecStop=/opt/nexus/bin/nexus stop
User=nexus
Group=nexus
Restart=on-abort

[Install]
WantedBy=multi-user.target
EOF


#Demarrage de nexus
sudo systemctl enable nexus

sudo systemctl start nexus


#Autorisation de l'acces
sudo ufw allow 8081/tcp

#install fail2ban
install_package "fail2ban"

#start du service fail2ban + activation au démarrage
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

#configuration fail2ban
sudo bash -c "cat >> /etc/fail2ban/jail.d/custom.conf" <<EOF
[DEFAULT]
ignoreip = 127.0.0.1
findtime = 10m
bantime = 24h
maxretry = 3

[sshd]
enabled = true
logpath = /var/log/auth.log
EOF

sudo systemctl restart fail2ban


# Affiche le mot de passe
echo 'Mot de passe admin dans 40s en cours de generation PATIENTEZ SVP...:\n'
#Attente pour la generation du password
sleep 40s
sudo cat /opt/nexus/sonatype-work/nexus3/admin.password
echo '\n\n'