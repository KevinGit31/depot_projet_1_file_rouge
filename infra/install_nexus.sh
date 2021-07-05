#!/usr/bin/bash

### MODE SECURE
set -u # en cas de variable non définit, arreter le script
set -e # en cas d'erreur (code de retour non-zero) arreter le script

ps_assert_root(){
	REAL_ID="$(id -u)"
	if [ "$REAL_ID" -ne 0 ]; then
		1>&2 echo "ERREUR: Le script doit etre exécuté en tant que root"
		exit 1
	fi
}

# debut du lancement

ps_assert_root

apt update -y
apt install -y openjdk-8-jdk

useradd -M -d /opt/nexus -s /bin/bash -r nexus
echo "nexus   ALL=(ALL)       NOPASSWD: ALL" > /etc/sudoers.d/nexus

wget https://sonatype-download.global.ssl.fastly.net/repository/downloads-prod-group/3/nexus-3.29.2-02-unix.tar.gz

mkdir /opt/nexus

tar xzf nexus-3.29.2-02-unix.tar.gz -C /opt/nexus --strip-components=1

chown -R nexus: /opt/nexus

sed -i 's/#run_as_user=""/run_as_user="nexus"/' /opt/nexus/bin/nexus.rc

## On modifie la configuration pour qu'elle fonctionne
sudo sed -i 's/..\/sonatype-work/.\/sonatype-work/g' /opt/nexus/bin/nexus.vmoptions
sudo sed -i 's/2073/1024/g' /opt/nexus/bin/nexus.vmoptions

sudo -u nexus /opt/nexus/bin/nexus start


# Service

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

/opt/nexus/bin/nexus stop

systemctl daemon-reload

systemctl enable --now nexus.service

ufw allow 8081/tcp

sleep 300s

# Affiche le mot de passe
echo 'Mot de passe admin \n'
cat /opt/nexus/sonatype-work/nexus3/admin.password
echo '\n\n'

echo "Success"


