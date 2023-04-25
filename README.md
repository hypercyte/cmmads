# cmmads

CMMADS - Centralised Mosque Management And Display System

## Initial set-up

### Requirements

- MySQL 8.0.31 or up
- Node.JS 18.15.0
- NPM (node package manager) 9.5.0 or up
- These are the versions this app was developed on, and possibly may work for other versions but not tested.

### Step-by-step guide (Windows)

1. If you don't have MySQL downloaded yet, you can download from here: https://dev.mysql.com/downloads/installer/

2. Open MySQL 8.0 Command Line Client, and if first time set-up, make sure you set up the root user and passowrd. Know these!

3. In MySQL Command Line, enter:

```sql
CREATE DATABASE cmmads;
```

4. Then use the database you created by typing:

```sql
USE cmmads;
```

5. Run the following commands to create the necessary tables:

```sql
CREATE TABLE `announcements` (
  `Title` varchar(255) DEFAULT NULL,
  `Content` varchar(1000) DEFAULT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Bot_Subscribers` (
  `ChatID` varchar(12) DEFAULT NULL
);

CREATE TABLE `Rooms` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Location` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Events` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Description` varchar(1500) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Approved` tinyint NOT NULL DEFAULT '0',
  `RoomsID` int NOT NULL,
  `UserID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKEvents251315` (`RoomsID`),
  CONSTRAINT `FKEvents251315` FOREIGN KEY (`RoomsID`) REFERENCES `Rooms` (`ID`)
);

CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(64) DEFAULT NULL,
  `hash` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `isAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
);
```

6. Keep MySQL command line open, but now go to the file explorer and open `/config/db_config.js`.

Edit file ".env" in the project root directory, where DB_USERNAME is your mysql username ('root' if you set it up that way), and DB_PASSWORD is the password.
For example your .env file should look like this:

```json
DB_USERNAME="root"
DB_PASSWORD="3uk4Gzabcdewf"
SECRET="thiscanbeanythingyouwantittobe"
TELEGRAM_TOKEN=""
```

7. Run the application by typing `node app` in command line/bash/terminal. Make sure you are in the project root directory.

8. It should create a prayer times table and you can access the app via `localhost:3000/shahporan` in your browser.

9. Click "Admin" and it will take you to the login page. Click the "Register" link under the Login button.

10. Register a new user, this will be your admin user. Remember the username and password.

11. After you have created a user, you will need to make it an admin. Send this query to your MySQL 8.0 Command Line you opened earlier:

```sql
    UPDATE users SET `active`=1, `isAdmin`=1 WHERE `ID`=1;
```

Your user account should now have full access to the system. Feel free to play with all the features :)

## Bugs

You can't log out at the moment, so if you need to do this, restart the node server.

## Troubleshooting

If CSS is not working, in each file in the /views/partials folder, there is a commented alternate css which may work. Just switch the commends around.
