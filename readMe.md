# AERS Web Application Project

## Overview

This project is designed to create a front-end web application utilizing the AERS (Armwrestling Elo Ratings System) database. The AERS database contains elo scores and armwrestler names, providing valuable data for armwrestling enthusiasts. The application fetches data from AERS' API, inserts it into a MySQL database, and then references this database for real-time information.

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

To run the project, type the command ```npm run dev``` to begin the typescript compiler in watch mode. 
This will keep your compiled JS up to date with your TS files. 

Next, type the command ```npm run start``` to run the compiled index.js file.