#!/bin/bash

JENKINSPWD=$(cat /tmp/jenkinskey.txt)
DEVOPSPWD=$(cat /tmp/devopsuserkey.txt)
#ROOTPASS=$(cat /tmp/root.txt)
ANSIBPASS=$(cat /tmp/ansiblekey.txt)
ENV1=$(cat /tmp/env.txt)
KEYNAME1=$(cat /tmp/KeyName.txt)
EC2USER=$(cat /tmp/projet1grp3key.txt)
REGION1=$(cat /tmp/region.txt)
SUBIDPUB1=$(cat /tmp/SubnetIdPub.txt)
SUBIDPRIV1=$(cat /tmp/SubnetIdPriv.txt)
SUBIDPUBADM1=$(cat /tmp/SubnetIdPubADM.txt)
SUBIDPRIVADM1=$(cat /tmp/SubnetIdPrivADM.txt)
SUBIDPUBDEV1=$(cat /tmp/SubnetIdPubDEV.txt)
SUBIDPRIVDEV1=$(cat /tmp/SubnetIdPrivDEV.txt)
SUBIDPUBQUA1=$(cat /tmp/SubnetIdPubQUA.txt)
SUBIDPRIVQUA1=$(cat /tmp/SubnetIdPrivQUA.txt)
SUBIDPUBPROD1=$(cat /tmp/SubnetIdPubPROD.txt)
SUBIDPRIVPROD1=$(cat /tmp/SubnetIdPrivPROD.txt)
VPCID1=$(cat /tmp/VpcId.txt)
PRIVIP1=$(cat /tmp/PrivateIP.txt)
INGRPORT1=$(cat /tmp/IngressPort.txt)
SECGRPNLST1=$(cat /tmp/SecurityGroupNameList.txt)
USCRIPT1=$(cat /tmp/Urlscript.txt)
SECGRPID1=$(cat /tmp/SecurityGroupId.txt)
INSTTYPE1=$(cat /tmp/InstanceType.txt)
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
yum install -y python2
yum install -y python2-pip
yum install -y python3
yum install -y python3-pip

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
usermod -a -G userjenkins jenkins

#Pour que jenkins puisse faire executé le playbook par devops avec sudo -u devops -s ansible-playbook
echo 'jenkins   ALL=(devops)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo


#creation de l'utilisateur devops
useradd -m -s /bin/bash devops
echo "devops:$DEVOPSPWD" | chpasswd
echo 'devops   ALL=(ALL)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo
echo "root:$ROOTPASS" | chpasswd
#genere la cle pub et priv pour le user devops
#su - devops -c 'ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa <<<y >/dev/null 2>&1 ; exit'
#echo \"export PATH=$PATH:/usr/local/bin\" >> ~/.bashrc

#install ansible
amazon-linux-extras install ansible2 -y

#configuration ansible vault paswword
echo "#!/bin/bash" >> /etc/ansible/ansvlt.sh
echo "$ANSIBPASS" >> /etc/ansible/.ansvlt
echo "RET=$(sudo cat /etc/ansible/.ansvlt)" >> /etc/ansible/ansvlt.sh
echo "echo \$RET" >> /etc/ansible/ansvlt.sh
sed -i 's/\#vault_password_file = \/path\/to\/vault_password_file/vault_password_file=\/etc\/ansible\/ansvlt.sh/' /etc/ansible/ansible.cfg
sed -i 's/\#host_key_checking = False/host_key_checking = False/' /etc/ansible/ansible.cfg
#preparation pour le client aws pour ansible dans jenkins
pip install boto3==1.15.16
pip uninstall -y botocore
pip install botocore==1.18.6
ansible-galaxy collection install amazon.aws

#install du client pour verifier la connexion rds
yum install mysql

#Preparation et transfert du contenu des  variables pour les vm dev qua et prod
su - jenkins -c "echo \"export PATH=$PATH:/var/lib/jenkins/.local/bin\" >> ~/.bashrc"
sed -i 's/\/jenkins:\/bin\/false/\/jenkins:\/bin\/bash/' /etc/passwd
#su - userjenkins -c "cd /home/userjenkins && wget -O $ENV1.zip https://github.com/KevinGit31/depot_projet_1_file_rouge/archive/refs/heads/$ENV1.zip && unzip $ENV1.zip && mv depot_projet_1_file_rouge* depot_projet_1_file_rouge && chmod +x /home/userjenkins/depot_projet_1_file_rouge/infra/ansvlt.sh && exit"
su - devops -c "cd /tmp && /bin/bash ssh.sh && exit"
#preparation du user devops sur les host remote + distrib key
su - devops -c "$(echo $EC2USER) > ~/.ssh/projet1grp3key.pem"
su - devops -c "chmod 600 ~/.ssh/projet1grp3key.pem"
#cp /home/devops/.ssh/id_rsa.pub /var/lib/jenkins/.ssh/devops_id_rsa.pub && chown jenkins: /var/lib/jenkins/.ssh/devops_id_rsa.pub
su - jenkins -c "mkdir ~/.aws && cd ~/.aws && echo \"[default]\" >> credentials && echo \"aws_access_key_id=$AAKI1\" >> credentials && echo \"aws_secret_access_key=$ASAKI1\" >> credentials && exit"
su - jenkins -c "cd ~/.aws && echo \"[default]\" >> config && echo \"region=$REGION1\" >> config && echo \"output=json\" >> config && exit"
su - jenkins -c "echo \"export SECRETDEVOPS=$DEVOPSPWD\" >> ~/.bashrc"
su - jenkins -c "echo \"export ANS=$ANSIBPASS\" >> ~/.bashrc"
su - jenkins -c "echo \"export KEYNAME=$KEYNAME1\" >> ~/.bashrc"
su - jenkins -c "echo \"export TYPENAME=$TYPENAME1\" >> ~/.bashrc"
su - jenkins -c "echo \"export REGION=$REGION1\" >> ~/.bashrc"
su - jenkins -c "echo \"export AWS_ACCESS_KEY=$AAKI1\" >> ~/.bashrc"
su - jenkins -c "echo \"export AWS_SECRET_KEY=$ASAKI1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SUBIDPUB=$SUBIDPUB1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SUBIDPRIV=$SUBIDPRIV1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SUBIDPUBADM=$SUBIDPUBADM1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SUBIDPRIVADM=$SUBIDPRIVADM1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SUBIDPUBDEV=$SUBIDPUBDEV1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SUBIDPRIVDEV=$SUBIDPRIVDEV1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SUBIDPUBQUA=$SUBIDPUBQUA1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SUBIDPRIVQUA=$SUBIDPRIVQUA1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SUBIDPUBPROD=$SUBIDPUBPROD1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SUBIDPRIVPROD=$SUBIDPRIVPROD1\" >> ~/.bashrc"
su - jenkins -c "echo \"export VPCID=$VPCID1\" >> ~/.bashrc"
su - jenkins -c "echo \"export PRIVIP=$PRIVIP1\" >> ~/.bashrc"
su - jenkins -c "echo \"export INGRPORT=$INGRPORT1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SECGRPNLST=$SECGRPNLST1\" >> ~/.bashrc"
su - jenkins -c "echo \"export USCRIPT=$USCRIPT1\" >> ~/.bashrc"
su - jenkins -c "echo \"export SECGRPID=$SECGRPID1\" >> ~/.bashrc"
su - jenkins -c "echo \"export INSTTYPE=$INSTTYPE1\" >> ~/.bashrc"
sed -i 's/\/jenkins:\/bin\/bash/\/jenkins:\/bin\/false/' /etc/passwd
#sudo su -s /bin/bash jenkins

#Install docker
su - ec2-user -c "sudo amazon-linux-extras enable docker"
su - ec2-user -c "sudo yum -y install docker"
su - ec2-user -c "sudo systemctl daemon-reload"
su - ec2-user -c "sudo systemctl enable --now docker"
#Install docker compose
curl -L "https://github.com/docker/compose/releases/download/1.29.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

sleep 30
# Mdp jenkins
cat /var/lib/jenkins/secrets/initialAdminPassword



