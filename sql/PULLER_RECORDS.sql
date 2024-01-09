-- Active: 1704506443605@@localhost@3306
-- create the database
CREATE DATABASE AERS_DATA
    DEFAULT CHARACTER SET = 'utf8mb4';

-- use the database OR you can access with AERS_DATA.tablename
-- USE AERS_DATA;

-- create the table
CREATE TABLE AERS_DATA.PULLER_RECORDS(
    ID INT AUTO_INCREMENT,
    AERSID INT,
    FIRSTNAME VARCHAR(255),
    LASTNAME VARCHAR(255),
    ELO FLOAT,
    LASTMATCH VARCHAR(50),
    ARM VARCHAR(50),
    WEIGHT VARCHAR(50),
    DIVISION VARCHAR(50),
    LEAGUE VARCHAR(50),
    PRIMARY KEY (ID)
);

-- insert our test puller record
INSERT INTO AERS_DATA.PULLER_RECORDS(
    AERSID,
    FIRSTNAME,
    LASTNAME,
    ELO,
    LASTMATCH,
    ARM,
    WEIGHT,
    DIVISION,
    LEAGUE
)VALUES(
    10001,
    'TEST',
    'PULLER',
    1000.01,
    '2030-01-01',
    'RIGHT',
    '231+',
    'OPEN',
    'IFA'
)

SELECT * FROM AERS_DATA.PULLER_RECORDS

-- if the AUTO_INCREMENT is not correct, you can manually set the current number
-- ALTER TABLE PULLER_RECORDS AUTO_INCREMENT = 1;

-- This command will clear all non-test data since our test record is id = 1
-- DELETE FROM `AERS_DATA`.`PULLER_RECORDS` WHERE ID <> 1