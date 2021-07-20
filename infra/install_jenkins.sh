#!/bin/bash

JENKINSPWD=$(cat /tmp/jenkinskey.txt)
DEVOPSPWD=$(cat /tmp/devopsuserkey.txt)
ROOTPASS=$(cat /tmp/root.txt)
ANSIBPASS=$(cat /tmp/ansiblekey.txt)
#install java
yum install -y java-1.8.0-openjdk-devel
#recuperation package
wget –O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo
#Modification du fichier de conf
sh -c ' echo "[jenkins]
name=Jenkins-stable
baseurl=http://pkg.jenkins.io/redhat-stable
gpgcheck=1" > /etc/yum.repos.d/jenkins.repo'
# recuperation key jenkins
rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key

# On prepare l'installation de jenkins
yum  upgrade -y
#sudo yum install -y openjdk-11-jdk
amazon-linux-extras install -y java-openjdk11
yum install -y gnupg
yum install -y git
yum install -y unzip
yum install -y python3
yum install -y python3-pip
pip3 install pip --upgrade

# installation jenkins
yum install -y  jenkins
sleep 5
# start jenkins
systemctl start jenkins
/sbin/chkconfig jenkins on

# On modifit l' utilisateur jenkins définition du password
useradd -m userjenkins
echo "userjenkins:$JENKINSPWD" | sudo chpasswd
echo 'userjenkins   ALL=(ALL)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo
#sudo -H -u userjenkins -c 'mkdir -p ~/ansible'
#su - userjenkins -c 'git clone https://github.com/KevinGit31/depot_projet_1_file_rouge.git ; exit'

#install ansible
amazon-linux-extras install ansible2 -y
echo "#!/bin/bash" >> /etc/ansible/ansvlt.sh
echo "$ANSIBPASS" >> /etc/ansible/.ansvlt
echo "RET=$(sudo cat /etc/ansible/.ansvlt)" >> /etc/ansible/ansvlt.sh
echo "echo \$RET" >> /etc/ansible/ansvlt.sh
chmod +x /etc/ansible/ansvlt.sh
#configuration ansible vault paswword
sed -i 's/\#vault_password_file = \/path\/to\/vault_password_file/vault_password_file=\/etc\/ansible\/ansvlt.sh/' /etc/ansible/ansible.cfg

#preparation du user devops sur les host remote + distrib key

useradd -m -s /bin/bash devops
echo "devops:$DEVOPSPWD" | sudo chpasswd
echo 'devops   ALL=(ALL)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo
echo "root:$ROOTPASS" | sudo chpasswd
#genere la cle pub et priv pour le user devops
#su - devops -c 'ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa <<<y >/dev/null 2>&1 ; exit'



#Nettoyage /tmp
#sudo rm -f /tmp/root.txt /tmp/jenkinskey.txt /tmp/devopsuserkey.txt /tmp/ansiblekey.txt

sleep 30
# Mdp jenkins
cat /var/lib/jenkins/secrets/initialAdminPassword



