CREATE TABLE AERS_DATA.MS_PULLERS(
    ID INT AUTO_INCREMENT,
    AERSID INT,
    FIRSTNAME VARCHAR(255),
    LASTNAME VARCHAR(255),
    MS_CLASS VARCHAR(255),
    MS_RANK VARCHAR(255),
    CITY VARCHAR(255),
    PRIMARY KEY(ID)
)


-- MANUALLY INSERT MS ATHLETES TO THIS TABLE TO THEN BE USED IN VIEWS THAT JOIN IFA AND WAF RECORDS 