#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
export HOME="/home/ubuntu/"
sudo PM2_HOME=/home/ubuntu/services/.pm2 pm2 list

# start Auth
cd /home/ubuntu/services/Auth
pm2 restart AUTH-SERVICE

# start User
cd /home/ubuntu/services/Users
pm2 restart USERS-SERVICE

# start Payments
cd /home/ubuntu/services/Payments
pm2 restart PAYMENT-SERVICE

# start Consumers[Notifications]
cd /home/ubuntu/services/Notification[Consumers]
pm2 restart NOTIFICATION[CONSUMERS]-SERVICE

# start Wallet
cd /home/ubuntu/services/Wallets
pm2 restart WALLET-SERVICE