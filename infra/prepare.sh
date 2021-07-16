#!/bin/bash

if [[ !Ref Urlscript == "jenkins" ]]; then
CMDSCRIPT1=$(sudo wget -O /tmp/install_jenkins.sh https://raw.githubusercontent.com/KevinGit31/depot_projet_1_file_rouge/dev/infra/install_jenkins.sh && chmod +x /tmp/install_jenkins.sh && sudo /bin/bash /tmp/install_jenkins.sh)
elif [[ !Ref Urlscript == "nexus" ]]; then
CMDSCRIPT2=$(sudo wget -O /tmp/install_nexus.sh https://raw.githubusercontent.com/KevinGit31/depot_projet_1_file_rouge/dev/infra/install_nexus.sh && chmod +x /tmp/install_nexus.sh && sudo /bin/bash /tmp/install_nexus.sh)
elif [[ !Ref Urlscript == "envapp" ]]; then
CMDSCRIPT3=$(sudo wget -O /tmp/install_envapp.sh https://raw.githubusercontent.com/KevinGit31/depot_projet_1_file_rouge/dev/infra/install_envapp.sh && chmod +x /tmp/install_envapp.sh && sudo /bin/bash /tmp/install_envapp.sh)
fi