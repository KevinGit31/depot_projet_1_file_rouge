#!/bin/bash

#IP=$(ip addr | grep eth1 | grep 'state UP' -A2 | tail -n1 | awk '{print $2}' | cut -f1  -d'/' | awk 1 ORS='')
VARIPCLOUDFORMATION=$(cat /tmp/ip.txt)
VARENV=$(cat /tmp/env.txt | awk 1 ORS='')
if [[ -n "$VARIPCLOUDFORMATION | grep \"10\.80\.140\.10\""  ]]; then
    CMDSCRIPT1=$(sudo wget -O /tmp/install_jenkins.sh https://raw.githubusercontent.com/KevinGit31/depot_projet_1_file_rouge/$VARENV/infra/install_jenkins.sh && chmod +x /tmp/install_jenkins.sh && sudo /bin/bash /tmp/install_jenkins.sh)
    CMDSCRIPT=$(sudo wget -O /tmp/ssh.sh https://github.com/KevinGit31/depot_projet_1_file_rouge/raw/$VARENV/infra/ssh.py && chmod +x /tmp/ssh.py)
elif [[ -n "$VARIPCLOUDFORMATION | grep \"10\.80\.140\.11\""  ]]; then
    CMDSCRIPT2=$(sudo wget -O /tmp/install_nexus.sh https://raw.githubusercontent.com/KevinGit31/depot_projet_1_file_rouge/$VARENV/infra/install_nexus.sh && chmod +x /tmp/install_nexus.sh && sudo /bin/bash /tmp/install_nexus.sh)
elif [[ -n "$VARIPCLOUDFORMATION | grep \"10\.80\.1??\.??\""  ]]; then
    CMDSCRIPT3=$(sudo wget -O /tmp/install_qcm.sh https://raw.githubusercontent.com/KevinGit31/depot_projet_1_file_rouge/$VARENV/infra/install_qcm.sh && chmod +x /tmp/install_qcm.sh && sudo /bin/bash /tmp/install_qcm.sh)
fi