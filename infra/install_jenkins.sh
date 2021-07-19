#!/bin/bash

JENKINSPWD=$(cat key.txt)
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

sleep 30
# Mdp jenkins
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
