#!/bin/bash +xe
#RECUPERATION DU DNS PUBLIC RDS BDD
LINES=$(aws rds describe-db-instances --region $1 --query "DBInstances[*].[ [[TagList[?Key==\`aws:cloudformation:stack-name\`].Value]],[Endpoint.Address] ]" | grep "\"" | sed 's/[ |\"]//g')
SAVEIFS=$IFS   # Save current IFS
IFS=$'\n'      # Change IFS to new line
LINES=($LINES) # split to array $names
IFS=$SAVEIFS   # Restore IFS
for (( i=0; i<${#LINES[@]}; i++ ))
do
    if [[ $(grep "$2" <<<${LINES[$i]} ) ]]; then
        echo  ${LINES[$i]}
        ((i++))
        continue
    fi
done
