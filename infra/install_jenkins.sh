#!/bin/bash

#Recupération des variables déposé par le script de cloudformation
JENKINSPWD=$(cat /tmp/jenkinskey.txt)
DEVOPSPWD=$(cat /tmp/devopsuserkey.txt)
#ROOTPASS=$(cat /tmp/root.txt)
ANSIBPASS=$(cat /tmp/ansiblekey.txt)
ENV1=$(cat /tmp/env.txt)
KEYNAME1=$(cat /tmp/KeyName.txt)
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

amazon-linux-extras install epel -y

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

# On modifit l' utilisateur jenkins définition du password ajout d'un compte de secours userjenkins
useradd -m userjenkins
echo "userjenkins:$JENKINSPWD" | sudo chpasswd
echo 'userjenkins   ALL=(ALL)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo
usermod -a -G jenkins userjenkins
usermod -a -G userjenkins jenkins

#Pour que jenkins puisse faire executé le playbook par devops avec sudo -u devops -s ansible-playbook
echo 'jenkins   ALL=(devops)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo


#creation de l'utilisateur devops compte d'install ansible sur les environnments EC2
useradd -m -s /bin/bash devops
echo "devops:$DEVOPSPWD" | chpasswd
echo 'devops   ALL=(ALL)       NOPASSWD: ALL' | sudo EDITOR='tee -a' visudo
echo "root:$ROOTPASS" | chpasswd


#install ansible
amazon-linux-extras install ansible2 -y

#configuration ansible vault paswword
echo "#!/bin/bash" >> /etc/ansible/ansvlt.sh
echo "$ANSIBPASS" >> /etc/ansible/.ansvlt
echo "RET=$(sudo cat /etc/ansible/.ansvlt)" >> /etc/ansible/ansvlt.sh
echo "echo \$RET" >> /etc/ansible/ansvlt.sh
sed -i 's/\#vault_password_file = \/path\/to\/vault_password_file/vault_password_file=\/etc\/ansible\/ansvlt.sh/' /etc/ansible/ansible.cfg
sed -i 's/\#host_key_checking = False/host_key_checking = False/' /etc/ansible/ansible.cfg
sed -i 's/\#remote_tmp     = ~\/.ansible\/tmp/remote_tmp     = \/tmp\/.ansible-${USER}\/tmp/' /etc/ansible/ansible.cfg
sed -i 's/\#local_tmp     = ~\/.ansible\/tmp/local_tmp     = \/tmp\/.ansible-${USER}\/tmp/' /etc/ansible/ansible.cfg

#preparation pour le client aws pour ansible dans jenkins
pip install boto3==1.15.16
pip uninstall -y botocore
pip install botocore==1.18.6
ansible-galaxy collection install amazon.aws

#install du client pour verifier la connexion rds
yum install -y mysql

#Preparation et transfert du contenu des  variables pour les vm dev qua et prod
#positionnement du fichier contenant les variables d'environnement sous jenkins
mkdir /var/lib/jenkins/.envvars && touch /var/lib/jenkins/.envvars/stacktest-staging.groovy
chown jenkins: /var/lib/jenkins/.envvars /var/lib/jenkins/.envvars/stacktest-staging.groovy
su - jenkins -c "echo \"env.PATH=\"$PATH:/var/lib/jenkins/.local/bin\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
sed -i 's/\/jenkins:\/bin\/false/\/jenkins:\/bin\/bash/' /etc/passwd
#su - userjenkins -c "cd /home/userjenkins && wget -O $ENV1.zip https://github.com/KevinGit31/depot_projet_1_file_rouge/archive/refs/heads/$ENV1.zip && unzip $ENV1.zip && mv depot_projet_1_file_rouge* depot_projet_1_file_rouge && chmod +x /home/userjenkins/depot_projet_1_file_rouge/infra/ansvlt.sh && exit"
su - devops -c "cd /tmp && /bin/bash ssh.sh && exit"



#Compte aws + récupération des variables nécessaires à la création du fichier de variable ansible pour les playbook
su - jenkins -c "mkdir ~/.aws && cd ~/.aws && echo \"[default]\" >> credentials && echo \"aws_access_key_id=$AAKI1\" >> credentials && echo \"aws_secret_access_key=$ASAKI1\" >> credentials && exit"
su - jenkins -c "cd ~/.aws && echo \"[default]\" >> config && echo \"region=$REGION1\" >> config && echo \"output=json\" >> config && exit"
su - devops -c "mkdir ~/.aws && cd ~/.aws && echo \"[default]\" >> credentials && echo \"aws_access_key_id=$AAKI1\" >> credentials && echo \"aws_secret_access_key=$ASAKI1\" >> credentials && exit"
su - devops -c "cd ~/.aws && echo \"[default]\" >> config && echo \"region=$REGION1\" >> config && echo \"output=json\" >> config && exit"
su - devops -c "echo \"export PATH=$PATH:/var/lib/jenkins/.local/bin\" >> ~/.bashrc"
su - jenkins -c "echo \"env.SECRETDEVOPS=\"$DEVOPSPWD\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.ANS=\"$ANSIBPASS\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.KEYNAME=\"$KEYNAME1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.TYPENAME=\"$TYPENAME1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.REGION="$REGION1"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.AWS_ACCESS_KEY=\"$AAKI1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.AWS_SECRET_KEY=\"$ASAKI1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SUBIDPUB=\"$SUBIDPUB1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SUBIDPRIV=\"$SUBIDPRIV1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SUBIDPUBADM=\"$SUBIDPUBADM1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SUBIDPRIVADM=\"$SUBIDPRIVADM1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SUBIDPUBDEV=\"$SUBIDPUBDEV1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SUBIDPRIVDEV=\"$SUBIDPRIVDEV1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SUBIDPUBQUA=\"$SUBIDPUBQUA1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SUBIDPRIVQUA=\"$SUBIDPRIVQUA1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SUBIDPUBPROD=\"$SUBIDPUBPROD1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SUBIDPRIVPROD=\"$SUBIDPRIVPROD1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.VPCID=\"$VPCID1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.PRIVIP=\"$PRIVIP1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.INGRPORT=\"$INGRPORT1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SECGRPNLST=\"$SECGRPNLST1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.USCRIPT=\"$USCRIPT1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.SECGRPID=\"$SECGRPID1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "echo \"env.INSTTYPE=\"$INSTTYPE1\"\" >> /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "sed -i -- 's/=/=\"/g' /var/lib/jenkins/.envvars/stacktest-staging.groovy"
su - jenkins -c "sed -i -- 's/$/\"/g' /var/lib/jenkins/.envvars/stacktest-staging.groovy"
sed -i 's/\/jenkins:\/bin\/bash/\/jenkins:\/bin\/false/' /etc/passwd
#sudo su -s /bin/bash jenkins

#Install docker pour les test partie jenkins
su - ec2-user -c "sudo amazon-linux-extras enable docker"
su - ec2-user -c "sudo yum -y install docker"
su - ec2-user -c "sudo systemctl daemon-reload"
su - ec2-user -c "sudo systemctl enable --now docker"
#Install docker compose
curl -L "https://github.com/docker/compose/releases/download/1.29.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

sleep 300
chown devops: /tmp/projet1grp3key.pem
su - devops -c "cp /tmp/projet1grp3key.pem ~/.ssh/projet1grp3key.pem"
su - devops -c "chmod 600 ~/.ssh/projet1grp3key.pem"
# Mdp jenkins
cat /var/lib/jenkins/secrets/initialAdminPassword



