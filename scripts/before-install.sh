#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


# deploy Auth
cd /home/ubuntu/services/Auth
rm -rf package-lock.json
npm install

# deploy Users
cd /home/ubuntu/services/Users
rm -rf package-lock.json
npm install

# deploy Payments
cd /home/ubuntu/services/Payments
rm -rf package-lock.json
npm install

# deploy Consumers
cd /home/ubuntu/services/Notification[Consumers]
rm -rf package-lock.json
npm install

# deploy Wallet
cd /home/ubuntu/services/Wallets
rm -rf package-lock.json
npm install