#!/bin/bash

JENKINSPWD=$(cat /tmp/jenkinskey.txt)
DEVOPSPWD=$(cat /tmp/devopsuserkey.txt)
ROOTPASS=$(cat /tmp/root.txt)
ANSIBPASS=$(cat /tmp/ansiblekey.txt)
ENV1=$(cat /tmp/env.txt)
KEYNAME1=$(cat /tmp/KeyName.txt)
REGION1=$(cat /tmp/region.txt)
SUBIDPUB1=$(cat /tmp/SubnetIdPub.txt)
SUBIDPRIV1=$(cat /tmp/SubnetIdPriv.txt)
VPCID1=$(cat /tmp/VpcId.txt)
PRIVIP1=$(cat /tmp/PrivateIP.txt)
INGRPORT=$(cat /tmp/IngressPort.txt)
SECGRPNLST=$(cat /tmp/SecurityGroupNameList.txt)
USCRIPT=$(cat /tmp/Urlscript.txt)
SECGRPID=$(cat /tmp/SecurityGroupId.txt)
INSTTYPE=$(cat /tmp/InstanceType.txt)
AAKI1=$(cat /tmp/AWSAccessKeyId.txt)
ASAKI1=$(cat /tmp/AWSSecretAccessKeyId.txt)
TYPENAME1=$(cat /tmp/TypeName.txt)



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
usermod -a -G jenkins userjenkins
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
echo "devops:$DEVOPSPWD" | chpasswd
echo 'devops   ALL=(ALL)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo
echo "root:$ROOTPASS" | chpasswd
#genere la cle pub et priv pour le user devops
#su - devops -c 'ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa <<<y >/dev/null 2>&1 ; exit'


su - userjenkins -c "mkdir ~/.aws && cd ~/.aws && echo \"[default]\" >> credentials && echo \"aws_access_key_id=$AAKI1\" >> credentials && echo \"aws_secret_access_key=$ASAKI1\" >> credentials && exit"
su - userjenkins -c "cd ~/.aws && echo \"[default]\" >> config && echo \"region=$REGION1\" >> config && echo \"output=json\" >> config && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $DEVOPSPWD --name \"secret_devops\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $ROOTPASS --name \"ROOTKEY\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $KEYNAME1 --name \"KEYNAME\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $TYPENAME1 --name \"TypeName\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $REGION1 --name \"REGION\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $SUBIDPUB1 --name \"SubnetIdPub\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $SUBIDPRIV1 --name \"SubnetIdPriv\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $VPCID1 --name \"VpcId\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $PRIVIP1 --name \"PrivateIP\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $INGRPORT --name \"IngressPort\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $SECGRPNLST --name \"SecurityGroupNameList\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $USCRIPT --name \"Urlscript\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $SECGRPID --name \"SecurityGroupId\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && ansible-vault encrypt_string $INSTTYPE --name \"InstanceType\" >> all && exit"
su - userjenkins -c "cd /home/userjenkins && cat all >> depot_projet_1_file_rouge/infra/ansible/inventory/dev/group_vars/all/all"
su - userjenkins -c "cd /home/userjenkins && cat all >> depot_projet_1_file_rouge/infra/ansible/inventory/qua/group_vars/all/all"
su - userjenkins -c "cd /home/userjenkins && cat all >> depot_projet_1_file_rouge/infra/ansible/inventory/prod/group_vars/all/all"


#Nettoyage /tmp
#rm -f /tmp/root.txt /tmp/jenkinskey.txt /tmp/devopsuserkey.txt /tmp/ansiblekey.txt

sleep 30
# Mdp jenkins
cat /var/lib/jenkins/secrets/initialAdminPassword



