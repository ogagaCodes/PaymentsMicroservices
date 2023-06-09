﻿# Payments Microserevices

![Express](https://img.shields.io/badge/express-js)

This repository contains code for a minimal yet scalable and robust microservices architecture api using the [Express framework](https://expressjs.com/) ,Uvicorn server and Postgres Database to perform crud operations on notes.

## Installation method 1 (Run application locally)

1. Clone this Repo 
2. cd into the services folder
3. The Services folder contian each microservices eg AUTH, USERS, PAYMENT GATE WAY, NOTIFICATIONS and WALLLETS
4. cd into any of the folder and do the following

5. Install the required packages
   `npm install`
6. Start the app using npm
   `npm run start`
7. Ensure you have a Mongodb Database running locally.
 

## Installation method 2 (Run Locally using Docker)

1. Ensure [Docker](https://docs.docker.com/install/) is installed.

2. Ensure [Docker Compose](https://docs.docker.com/compose/install/) is installed.

3. Clone this Repo and follow above instructructions no 4 and 5
4. Use Docker-Compose to spin up containers `docker-compose up -d --build`

5. If everything is completed successfully, it should be available on [notes](http://localhost:2100/)


## Tests

Tests are available using npm test command
Run them using `npm run test .` while in the root directory (/Credit-Engine)

## Documentation
Postman : https://documenter.getpostman.com/view/6034175/2s93m8zM1B

## Usage
1. Create A User Via The AUth Service
2. Use Generated Token To Get Users Details
3. Use Generated JWT to fetch User Wallet
4. Create A savings Plan
5. If Your Wallet Balance Is insufficient, when the cron for savings deposit runs you get a mail or an sms(Platform decision)

