//This function is intended to seed an empty database. Use syncData() in order to update a database. 

import * as mysql from 'mysql2/promise';
import { pullData } from './pullData.js';
import { readFile } from 'fs/promises';
import { pullerRecord } from './interfaces.js';
import * as dotenv from 'dotenv'

dotenv.config();

export async function syncData(syncSource: 'aers' | 'local', league: 'WAF' | 'IFA', projectAlias: 'prod' | 'test') {


    let pullerRecords: pullerRecord[];

    if (syncSource == 'aers') {
        //pull data from API call  
        pullerRecords = await pullData(league);
    }
    else {
        //pull data from a local file instead
        //used for testing purposes so not hitting api repeatedly
        const infile: string = "pullerRecords.json"
        const fileContent = await readFile(infile, 'utf-8');

        pullerRecords = JSON.parse(fileContent);
    }

    console.log('Total records to insert: ', pullerRecords.length);

    let dbConfig;
    if (projectAlias == 'prod') {
        dbConfig = {
            host: process.env.PROD_DB_HOST,
            user: process.env.PROD_DB_USER,
            port: parseInt(process.env.PROD_DB_PORT, 10),
            password: process.env.PROD_DB_PASSWORD,
            database: process.env.PROD_DB_DATABASE,
            connectTimeout: parseInt(process.env.PROD_DB_CONNECT_TIMEOUT, 10),
        };
    }else if(projectAlias == 'test') {
        dbConfig = {
            host: process.env.TEST_DB_HOST,
            user: process.env.TEST_DB_USER,
            port: parseInt(process.env.TEST_DB_PORT, 10),
            password: process.env.TEST_DB_PASSWORD,
            database: process.env.TEST_DB_DATABASE,
            connectTimeout: parseInt(process.env.TEST_DB_CONNECT_TIMEOUT, 10),
        };
    }else{
        console.log('Invalid project alias: ', projectAlias);
        return;
    }


    
    //open our connection to begin queries
    const connection = await mysql.createConnection(dbConfig);

    // Prepare the INSERT statement outside the loop
    const insertStatement = await connection.prepare(`
        INSERT INTO PULLER_RECORDS(
            ID,
            AERSID,
            FIRSTNAME,
            LASTNAME,
            ELO,
            LASTMATCH,
            ARM,
            WEIGHT,
            DIVISION,
            LEAGUE
        ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        ) ON DUPLICATE KEY UPDATE
            AERSID = VALUES(AERSID),
            FIRSTNAME = VALUES(FIRSTNAME),
            LASTNAME = VALUES(LASTNAME),
            ELO = VALUES(ELO),
            LASTMATCH = VALUES(LASTMATCH),
            ARM = VALUES(ARM),
            WEIGHT = VALUES(WEIGHT),
            DIVISION = VALUES(DIVISION),
            LEAGUE = VALUES(LEAGUE)
    `);

    // Use Promise.all to wait for all INSERT queries to finish
    await Promise.all(
        pullerRecords.map(async (puller) => {
            await insertStatement.execute([
                (puller.AERSID + puller.ARM + puller.WEIGHT + puller.DIVISION),
                puller.AERSID,
                puller.FIRSTNAME,
                puller.LASTNAME,
                puller.ELO,
                puller.LASTMATCH,
                puller.ARM,
                puller.WEIGHT,
                puller.DIVISION,
                puller.LEAGUE
            ]);
        })
    );

    connection.end(function(err:Error){
        console.log('connection ended');
        if(err){
            console.error(err);
        }
    })

}