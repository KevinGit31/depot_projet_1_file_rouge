#!/usr/bin/bash

#Test presence du binaire nexus
RETOUR_BIN_NEXUS=/opt/nexus/bin/nexus

if [[ $RETOUR_INSTALL_OPENJDK = 0 ]] && [[ ! -f $RETOUR_BIN_NEXUS ]]; then
    echo "Serveur Nexus déjà installé"
    exit 0
fi

sudo yum update -y
sudo yum install wget -y
sudo yum install java-1.8.0-openjdk.x86_64 -y

#Test si le user nexus existe
RETOUR_USER_NEXUS=sudo cat /etc/passwd | grep -i nexus
echo $RETOUR_USER_NEXUS
#creation du user nexus et positionnement dans le sudoers
if [[ $RETOUR_USER_NEXUS != 0 ]]; then
    sudo sudo adduser nexus
    sudo echo 'nexus   ALL=(ALL)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo
fi

#Download des sources
#URLDL=https://sonatype-download.global.ssl.fastly.net/repository/downloads-prod-group/3/nexus-3.31.1-01-unix.tar.gz
URLDL='https://download.sonatype.com/nexus/3/latest-unix.tar.gz'
wget -O nexus.tar.gz $URLDL
sleep 5s

#if [[ ! -f nexus-3.31.1-01-unix.tar.gz ]]; then
if [[ ! -f nexus.tar.gz ]]; then
    echo "Problème de download $URLDL \n"
    exit 0
fi

#creation du dossier cible
if [ ! -d "/opt/nexus" ]; then
        sudo mkdir /opt/nexus
        #decompression des sources dans le dossier cible
        sudo tar xzf nexus.tar.gz -C /opt/nexus --strip-components=1
        #positionnement du proprietaire dans le dossier cible
        sudo chown -R nexus: /opt/nexus /opt/sonatype-work
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


sudo chkconfig nexus on
#Demarrage de nexus
sudo systemctl start nexus

# Affiche le mot de passe
echo 'Mot de passe admin dans 40s en cours de generation PATIENTEZ SVP...:\n'
#Attente pour la generation du password
sleep 40s
sudo cat /opt/nexus/sonatype-work/nexus3/admin.password
echo '\n\n'