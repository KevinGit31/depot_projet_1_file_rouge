#!/bin/bash

AWSBIN=/usr/local/bin/aws
STACKNAME="projet1grp3"
TPL=""
INSTANCE_TYPE="t2.micro"
KEYNAME=$STACKNAME + "_key"
PEMKEYNAME=$KEYNAME + ".pem"
REGION="eu-west-2"
echo ""
echo "Le nom de la stack utilisé est: $STACKNAME"
echo ""


echo "------START CREATE STACK-------" 1>>trace.log 2>&1
read -p "Saisir jenkins ou nexus pour l'installation" n1
if [ "$n1" = "jenkins" ]; then
    echo "Choix du template jenkins effectué."
    TPL="tplgrp3jenkins.yaml"
elif [ "$n1" = "nexus" ]; then
    echo "Choix du template nexus effectué."
    TPL="tplgrp3nexus.yaml"
else
    echo "Mauvaise saisi."
    exit
fi

echo "Choisir une action de stack 1,2,3 ou 4."
echo ""
CHOIX=("CREATE" "UPDATE" "DELETE" "EXIT")

#RAZ trace.log
echo "" > trace.log


if [! -f $PEMKEYNAME ]; then
  $AWSBIN ec2 create-key-pair --key-name $KEYNAME --query "KeyMaterial" --output text > $PEMKEYNAME
fi

select var in "${CHOIX[@]}"; do
    case $var in
        "CREATE")
            RETCREAT1=$($AWSBIN cloudformation create-stack --template-body file://aws_cloudform/$TPL --stack-name $STACKNAME --parameters  ParameterKey=KeyName,ParameterValue=$KEYNAME ParameterKey=InstanceType,ParameterValue=$INSTANCE_TYPE)
            RETCREAT2=$($AWSBIN cloudformation wait stack-create-complete --stack-name $STACKNAME)
            RETCREAT3=$($AWSBIN cloudformation describe-stacks --stack-name $STACKNAME)
            echo "==>RETOUR CREATE STACK<==" 1>>trace.log 2>&1
            echo $RETCREAT1 1>>trace.log 2>&1
            echo "==>RETOUR CREATE WAIT STACK<==" 1>>trace.log 2>&1
            echo $RETCREAT2 1>>trace.log 2>&1
            echo "==>RETOUR describe-stacks STACK<==" 1>>trace.log 2>&1
            echo $RETCREAT3 1>>trace.log 2>&1
            echo "------END CREATE STACK-------" 1>>trace.log 2>&1
            ;;
        "UPDATE")
            echo "------START UPDATE STACK-------" 1>>trace.log 2>&1
            RETUPT1=$($AWSBIN cloudformation update-stack --template-body file://aws_cloudform/$TPL --stack-name $STACKNAME)
            RETUPT2=$($AWSBIN cloudformation cloudformation wait stack-update-complete --stack-name $STACKNAME)
            RETUPT3=$($AWSBIN cloudformation describe-stacks --stack-name $STACKNAME)
            echo "==>RETOUR UPDATE STACK<==" 1>>trace.log 2>&1
            echo $RETUPT1 1>>trace.log 2>&1
            echo "==>RETOUR UPDATE WAIT STACK<==" 1>>trace.log 2>&1
            echo $RETUPT2 1>>trace.log 2>&1
            echo "==>RETOUR UPDATE WAIT STACK<==" 1>>trace.log 2>&1
            echo $RETUPT3 1>>trace.log 2>&1
            echo "------END UPDATE STACK-------" 1>>trace.log 2>&1
            ;;
        "DELETE")
            echo "------START DELETE STACK-------" 1>>trace.log 2>&1
            RETDEL1=$($AWSBIN cloudformation delete-stack --stack-name $STACKNAME)
            echo $RETDEL1 1>>trace.log 2>&1
            echo "------END DELETE STACK-------" 1>>trace.log 2>&1
            ;;
        "EXIT")
            echo "EXIT" 1>>trace.log 2>&1
            exit
            ;;
        *)
            echo "CHOIX NON VALIDE"
            ;;
    esac
done