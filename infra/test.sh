#!/bin/bash
AWSBIN=aws
REGION="eu-west-2"
STACKNAMEEC2="jenkins"


#Recupération de l'instance ID
FXDESC_FILTER1=$STACKNAMEEC2
#Filtre sur DBINSTANCE et cherche 2 éléments
VAL1="Name=instance-state-name,Values=running"
VAL2="Name=tag:Name,Values=$STACKNAMEEC2"
NEXTPIPECMD="sort -r -n"
FILTEROPTION="$VAL1 $VAL2 "
QUERY="Reservations[].Instances[].[Tags[?Key=='Name'].Value[],InstanceId ]"
SVCTYPE="ec2"
DESCRIBECMD="describe-instances"


T1FXAWS_DESCRETURN=""
T2FXAWS_DESCRETURN=""
FXAWS_DESCRIBE () {
    declare -a TAB1=()
    #Permet l'ajout d'une commande la 7eme variable peut etre non ajouter
    if [[ $7 == "" ]]; then
        VAL1="cat"
    else
        VAL1=$7
    fi
    #Recupere la describe list
    RDSLIST1=$($AWSBIN $1 $2 --region $3 --output text --query "$4" --filter $6 | $VAL1)
    echo ""
    SAVEIFS=$IFS   # Save current IFS
    IFS=$'\n'      # Change IFS to new line
    RDSLIST1=($RDSLIST1) # split to array $names
    IFS=$SAVEIFS   # Restore IFS
    declare -i k=0
    for (( i=0; i<${#RDSLIST1[@]}; i++ ))
    do
        ((k++))
        if [[ $(grep "$5" <<<${RDSLIST1[$i]} ) ]]; then
            local TAB1[0]=${RDSLIST1[$i]}
            ((i++))
            j=$i
            k=$((k+1))
            local TAB1[1]=${RDSLIST1[((j++))]}
            continue
        fi
    done
    echo "T1FXAWS_DESCRETURN=\"${TAB1[0]}\"; T2FXAWS_DESCRETURN=\"${TAB1[1]}\""
}


eval $(FXAWS_DESCRIBE "$SVCTYPE" "$DESCRIBECMD" "$REGION" "$QUERY" "$FXDESC_FILTER1" "$FILTEROPTION" "$NEXTPIPECMD")
echo "InstanceID= $T2FXAWS_DESCRETURN"
echo "InstanceName= $T1FXAWS_DESCRETURN"



                # FILTEROPTION="Name=instance-state-name,Values=running"
                # QUERY="Reservations[].Instances[].[InstanceId, Tags[?Key=='Name'].Value[]]"

# #FXAWS_DESCRIBE () {
#     declare -a TAB1=()

#     #Recupere la describe list
#     #RDSLIST1=$($AWSBIN $1 $2 --region $3 --output text --query "$4" --filter $6)
#     RDSLIST1=$($AWSBIN $SVCTYPE $DESCRIBECMD --region $REGION --output text --query "$QUERY" --filter $FILTEROPTION | $TEST )

#     SAVEIFS=$IFS   # Save current IFS
#     IFS=$'\n'      # Change IFS to new line
#     RDSLIST1=($RDSLIST1) # split to array $names
#     IFS=$SAVEIFS   # Restore IFS
#     declare -i k=0
#     for (( i=0; i<${#RDSLIST1[@]}; i++ ))
#     do

#         ((k++))
#         if [[ $(grep "$FXDESC_FILTER1" <<<${RDSLIST1[$i]} ) ]]; then
#             echo "A ${RDSLIST1[$i]}"
#             #local TAB1[0]=${RDSLIST1[$i]}
#             TAB1[0]=${RDSLIST1[$i]}
#             echo ${TAB1[0]}
#             ((i++))
#             j=$i
#             k=$((k+1))
#             #local TAB1[1]=${RDSLIST1[((j++))]}
#             echo "B ${RDSLIST1[((j++))]}"
#             TAB1[1]=${RDSLIST1[((j++))]}
#             echo ${TAB1[1]}
#             continue
#         fi
#     done
    #echo "T1FXAWS_DESCRETURN=\"${TAB1[0]}\"; T2FXAWS_DESCRETURN=\"${TAB1[1]}\""
#}


# echo "En attente 120s de transfert de la clé ssh temps de disponibilité de l'instance ID et de la connexion ssh"

#eval $(FXAWS_DESCRIBE "$SVCTYPE" "$DESCRIBECMD" "$REGION" "$QUERY" "$FXDESC_FILTER1" "$FILTEROPTION")
#echo "InstanceID= $T2FXAWS_DESCRETURN"
#echo "InstanceName= $T1FXAWS_DESCRETURN"
# RESULTINSTANCEID=$T2FXAWS_DESCRETURN
# RESULTPUBDNSNAME=$(aws ec2 describe-instances --query "Reservations[].Instances[].PublicDnsName" --instance-ids $RESULTINSTANCEID --output text)
# echo "L'id EC2 de l'instance $T1FXAWS_DESCRETURN pour : $RESULTINSTANCEID et son PublicDNSName est: $RESULTPUBDNSNAME"
# echo ""

# echo "Transfert de la clé ssh vers l'instance $STACKNAMEEC2"

# #Transfert la clé ssh
echo "exit" | ssh -o "StrictHostKeyChecking no" -i "projet1grp3key.pem" ec2-user@$RESULTPUBDNSNAME
# sleep 4s
scp -i projet1grp3key.pem projet1grp3key.pem ec2-user@$RESULTPUBDNSNAME:/tmp/projet1grp3key.txt