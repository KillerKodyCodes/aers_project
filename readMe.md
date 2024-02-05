# AERS Web Application Project


## Developer notes

Currently, the sync process of pushing data up to an empty mySQL database takes about 3 minutes for almost 21000 records. In the future I would like to add the functionality of filtering out old data before sending to the database. This would make syncs alot faster, but for now the 3 minute process is ok since this only needs to happen once a week at most. 
## Overview

This project is designed to create a front-end web application utilizing the AERS (Armwrestling Elo Ratings System) database. The AERS database contains elo scores and armwrestler names, providing valuable data for armwrestling enthusiasts. The application fetches data from AERS' API, inserts it into a MySQL database, and then references this database for real-time information.


## AERS api call

These are the two api endpoints that are used to sync the data
This is the Request URL for WAF classes: https://aersarm.com/api/Elosnapshot/GetCombinedResults/?weightClassType=WAF
This is the Request URL for IFA classes: https://aersarm.com/api/Elosnapshot/GetCombinedResults/?weightClassType=IFA

## Prerequisites

Before getting started, make sure you have MySQL installed on your local machine. It is recommended to run the application in the Windows Subsystem for Linux (WSL) environment for seamless compatibility.


## Database Setup

To set up the database for testing, follow the commands outlined in the `create.sql` file. This script will create the necessary tables and structure for the application.

To start mySql in the cli, use the command sudo ```/etc/init.d/mysql start```. I recommend attaching this to an alias for ease of use.
Then use the command ```mysql -u username -p``` with your username. The cli will prompt the password related to this user.
Note: this is the mysql user, not the ubuntu user. 
To add a user, follow these commands in the mysql cli: 
```
CREATE USER 'newuser'@'%' IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'%';
FLUSH PRIVILEGES;
```

## Running the Project

First, copy the .env.example file to src/.env and add your parameters for your local connection. This will vary depending on the user you setup in the previous step.
Only the TEST parameters are necessary for local development. PROD parameters are only needed when working with the production database. 
To run the project, type the command ```npm run dev``` to begin the typescript compiler in watch mode. 
This will keep your compiled JS up to date with your TS files. 

Next, type the command ```npm run starttest``` to run the compiled index.js file.

In index.ts, you can change the source of data between ```aers or local```. I recommend using aers once, then pointing to local after that. 
This will prevent unneccesary requests to the AERS api. You can also manually change data by editing the produced .JSON. 