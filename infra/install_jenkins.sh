#!/bin/bash

JENKINSPWD=$(cat /tmp/jenkinskey.txt)
DEVOPSPWD=$(cat /tmp/devopsuserkey.txt)
ROOTPASS=$(cat /tmp/root.txt)
ANSIBPASS=$(cat /tmp/ansiblekey.txt)
#install java
sudo yum install -y java-1.8.0-openjdk-devel
#recuperation package
sudo wget –O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo
#Modification du fichier de conf
sudo sh -c ' echo "[jenkins]
name=Jenkins-stable
baseurl=http://pkg.jenkins.io/redhat-stable
gpgcheck=1" > /etc/yum.repos.d/jenkins.repo'
# recuperation key jenkins
sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key

# On prepare l'installation de jenkins
sudo yum  upgrade -y
#sudo yum install -y openjdk-11-jdk
sudo amazon-linux-extras install -y java-openjdk11
sudo yum install -y gnupg
sudo yum install -y git
sudo yum install -y unzip
sudo yum install -y python3
sudo yum install -y python3-pip
pip install pip --upgrade

# installation jenkins
sudo yum install -y  jenkins
sleep 5
# start jenkins
sudo systemctl start jenkins
sudo /sbin/chkconfig jenkins on

# On ajoute le nouvel utilisateur userjenkins + définition du password
echo "${GREEN}$(date +'%Y-%m-%d %H:%M:%S') [ INFO  ] : Création de l'utilisateur userjenkins ... ${NC}"
sudo useradd -m userjenkins
echo "userjenkins:$JENKINSPWD" | sudo chpasswd

sudo echo 'userjenkins   ALL=(ALL)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo

#install ansible
sudo su - userjenkins && mkdir -p ~/ansible && git clone https://github.com/KevinGit31/depot_projet_1_file_rouge.git
sudo amazon-linux-extras install ansible2 -y
sudo echo "#!/bin/bash" >> /etc/ansible/ansvlt.sh
sudo echo $ANSIBPASS >> /etc/ansible/.ansvlt
sudo echo "RET=$(cat /etc/ansible/.ansvlt)"
sudo echo "echo $RET" >> /etc/ansible/ansvlt.sh
sudo chmod +x /etc/ansible/ansvlt.sh
#configuration ansible vault paswword
sudo sed -e "/\[defaults\]/a\\
vault_password_file=/etc/ansible/ansvlt.sh" < /etc/ansible/ansible.cfg

#ansible-vault encrypt_string $DEVOPSPWD --name 'secret_devops' >> ~/vault
#preparation du user devops sur les host remote + distrib key
sudo -i
sudo useradd -m -s /bin/bash devops
echo "devops:$DEVOPSPWD" | sudo chpasswd
sudo echo 'devops   ALL=(ALL)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo
echo "root:$ROOTPASS" | sudo chpasswd
#genere la cle pub et priv pour le user devops
#sudo -H -u devops bash -c 'ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa <<<y >/dev/null 2>&1'
sudo python3 /tmp/ssh.py

#Nettoyage /tmp
sudo rm -f /tmp/*.txt

sleep 30
# Mdp jenkins
sudo cat /var/lib/jenkins/secrets/initialAdminPassword



