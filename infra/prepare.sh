#!/bin/bash

HNAME=$(echo hostname | awk 1 ORS='' )
if [[ -n "$HNAME | grep \"jenkins\"" ]]; then
    CMDSCRIPT1=$(sudo wget -O /tmp/install_jenkins.sh https://raw.githubusercontent.com/KevinGit31/depot_projet_1_file_rouge/dev/infra/install_jenkins.sh && chmod +x /tmp/install_jenkins.sh && sudo /bin/bash /tmp/install_jenkins.sh)
elif [[ -n "$HNAME | grep \"nexus\"" ]]; then
    CMDSCRIPT2=$(sudo wget -O /tmp/install_nexus.sh https://raw.githubusercontent.com/KevinGit31/depot_projet_1_file_rouge/dev/infra/install_nexus.sh && chmod +x /tmp/install_nexus.sh && sudo /bin/bash /tmp/install_nexus.sh)
elif [[ -n "$HNAME | grep \"qcm\"" ]]; then
    CMDSCRIPT3=$(sudo wget -O /tmp/install_qcm.sh https://raw.githubusercontent.com/KevinGit31/depot_projet_1_file_rouge/dev/infra/install_qcm.sh && chmod +x /tmp/install_qcm.sh && sudo /bin/bash /tmp/install_qcm.sh)
fi