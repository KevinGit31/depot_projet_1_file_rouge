#!/bin/bash
#Permet de récupérer le dns public de l'ec2 avec le nom de sa stack
#commande.sh argSVCTYPE argDESCRIBECMD argREGION arg$QUERY argFXDESC_FILTER1 argFILTEROPTION argNEXTPIPECMD

# SVCTYPE="$1"
# DESCRIBECMD="$2"
# REGION="$3"
# QUERY="$4"
# FXDESC_FILTER1="$5"
# FILTEROPTION="$6"
# NEXTPIPECMD="$7"

SVCTYPE="ec2"
DESCRIBECMD="describe-instances"
REGION="$2"
QUERY="Reservations[].Instances[].[Tags[?Key=='Name'].Value[],InstanceId ]"
FXDESC_FILTER1="$1"
FILT1="Name=instance-state-name,Values=running"
FILT2="Name=tag:Name,Values=$1"
FILTEROPTION="$FILT1 $FILT2"
NEXTPIPECMD="sort -r -n"

#Fonction qui permet de récupérer la describe list suivant le service Type et la commande de description
#FXDESC_FILTER1=FXDESC_FILTER "" >>>> exemple nom de la stack
#SVCTYPE="rds"
#DESCRIBECMD="describe-db-instances"
#QUERY="DBInstances[*].[ [[TagList[?Key==\`aws:cloudformation:stack-name\`].Value]],[Endpoint.Address] ]"
#FXAWS_DESCRIBE "$SVCTYPE" "$DESCRIBECMD" "$REGION" "$QUERY" "$FXDESC_FILTER1 CLE" "AWS FILTER OPTIONNEL AJOUTER laisser vide ou ne pas le mettre" " CMD TO PIPE OPTION OU NE PAS METTRE LE 7EME ARGUMENT"
#FXAWS_DESCRIBE $1          $2            $3        $4       $5                    $6                                                               $7     <<===correspondance
#INIT VAR RECUPERATION des 2 entrées du tableau dans la fonction FXAWS_DESCRIBE
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
    RDSLIST1=$(aws $1 $2 --region $3 --output text --query "$4" --filter $6 | $VAL1)
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
##
################### END FONCTION##############

eval $(FXAWS_DESCRIBE "$SVCTYPE" "$DESCRIBECMD" "$REGION" "$QUERY" "$FXDESC_FILTER1" "$FILTEROPTION" "$NEXTPIPECMD")
# echo "KEY= $T2FXAWS_DESCRETURN"
# echo "VALUE= $T1FXAWS_DESCRETURN"

RESULTINSTANCEID=$T2FXAWS_DESCRETURN
RESULTPUBDNSNAME=$(aws ec2 describe-instances --query "Reservations[].Instances[].PublicDnsName" --instance-ids $RESULTINSTANCEID --output text)
echo "$RESULTPUBDNSNAME"