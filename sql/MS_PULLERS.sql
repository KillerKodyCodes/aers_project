CREATE TABLE MS_PULLERS(
	ID VARCHAR(255),
    IFAID INT,
    WAFID INT,
    FIRSTNAME VARCHAR(255),
    LASTNAME VARCHAR(255),
    MS_CLASS VARCHAR(255),
    MS_RANKRIGHT INT,3
    MS_RANKLEFT INT,
    CITY VARCHAR(255),
    primary key(ID)
);3



INSERT INTO MS_PULLERS (ID, IFAID, WAFID, FIRSTNAME, LASTNAME, MS_CLASS, MS_RANKRIGHT, MS_RANKLEFT, CITY)
SELECT 
CONCAT(FIRSTNAME, LASTNAME) AS ID,
  MAX(CASE WHEN LEAGUE = 'IFA' THEN AERSID END) AS IFAID,
  MAX(CASE WHEN LEAGUE = 'WAF' THEN AERSID END) AS WAFID,
  FIRSTNAME,
  LASTNAME,
  NULL AS MS_CLASS,  -- Replace 'Your_MS_CLASS_Value' with the appropriate value
  NULL AS MS_RANKRIGHT,  -- Replace 'Your_MS_RANKRIGHT_Value' with the appropriate value
  NULL AS MS_RANKLEFT,  -- Replace 'Your_MS_RANKLEFT_Value' with the appropriate value
  NULL AS CITY  -- Replace 'Your_CITY_Value' with the appropriate value
FROM PULLER_RECORDS 
WHERE 
(firstname = 'TREVOR' AND lastname = 'CLAUNCH') OR
(firstname = 'AUSTIN' AND lastname = 'ELZY') OR
(firstname = 'DUSTIN' AND lastname = 'HYATT') OR
(firstname = 'JACKSON' AND lastname = 'LOTHENORE') OR
(firstname = 'WILL' AND lastname = 'SMITH') OR
(firstname = 'WARDELL' AND lastname = 'FERGUSON') OR
(firstname = 'CHETT' AND lastname = 'BURGE') OR
(firstname = 'DILLON' AND lastname = 'THOMPSON') OR
(firstname = 'ADAM' AND lastname = 'GREGORY') OR
(firstname = 'BRIAN' AND lastname = 'CALHOUN') OR
(firstname = 'KODY' AND lastname = 'BYRD') OR
(firstname = 'LATHE' AND lastname = 'WARD') OR
(firstname = 'SEAN' AND lastname = 'HANCOCK') OR
(firstname = 'JEREMY' AND lastname = 'THORNTON') OR
(firstname = 'JUSTIN' AND lastname = 'WHITE') OR
(firstname = 'EVAN' AND lastname = 'BEDWELL') OR
(firstname = 'BURT' AND lastname = 'WILKERSON') OR
(firstname = 'MAX' AND lastname = 'POLK') OR
(firstname = 'RANCE' AND lastname = 'CLAYTON') OR
(firstname = 'KEEGAN' AND lastname = 'PORCH') OR
(firstname = 'BRANDON' AND lastname = 'SMITH') OR
(firstname = 'MASON' AND lastname = 'WILLIAMS') OR
(firstname = 'SEAN' AND lastname = 'KEEN') OR
(firstname = 'JOSH' AND lastname = 'DAVIS') OR
(firstname = 'BRAD' AND lastname = 'MANN') OR
(firstname = 'WAYNE' AND lastname = 'WITHERS') OR
(firstname = 'BJ' AND lastname = 'FOKAKIS') OR
(firstname = 'BRANDON' AND lastname = 'MANN') OR
(firstname = 'TRENT' AND lastname = 'DAVIS') OR
(firstname = 'STUART' AND lastname = 'HYATT') OR
(firstname = 'JOSH' AND lastname = 'JARVIS') OR
(firstname = 'HUNTER' AND lastname = 'MCNEELY') OR
(firstname = 'JOASH' AND lastname = 'DENNIS') OR
(firstname = 'RUSSELL' AND lastname = 'PITTMAN')
GROUP BY FIRSTNAME, LASTNAME;


-- The above query inserts records for every provided name that EXISTS in PULLER_RECORDS. Some MS pullers don't have anything in AERS yet.

