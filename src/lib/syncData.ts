import * as mysql from 'mysql2/promise';
import { pullData } from './pullData.js';
import { readFile } from 'fs/promises';
import { pullerRecord } from './interfaces.js';


export async function syncData(syncSource: 'aers' | 'local', league: 'WAF' | 'IFA', connection: mysql.Connection){

        //use this flag to switch the actual API call
        let pullerRecords: pullerRecord[];
        
        if(syncSource == 'aers'){
            //pull data from API call  
            pullerRecords = await pullData(league);
        }
        else{
            //pull data from a local file instead
            //used for testing purposes so not hitting api repeatedly
            const infile: string = "pullerRecords.json"
            const fileContent = await readFile(infile,'utf-8');
    
            pullerRecords = JSON.parse(fileContent);
        }
    
        console.log('Total records to insert: ',pullerRecords.length);
    
                // Prepare the INSERT statement outside the loop
                const insertStatement = await connection.prepare(`
                INSERT INTO PULLER_RECORDS(
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
                    ?
                )
            `);
    
            // Use Promise.all to wait for all INSERT queries to finish
            await Promise.all(
                pullerRecords.map(async (puller) => {
                    await insertStatement.execute([
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
    
}