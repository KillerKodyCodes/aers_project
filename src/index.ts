import * as mysql from 'mysql2/promise';
import { pullData } from './lib/pullData.js';
import { pullerRecord } from './lib/interfaces.js';
import { readFile } from 'fs/promises';

async function main(){

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'kbuser',
        port: 3306,
        password: 'password',
        database: 'AERS_DATA',
        connectTimeout: 60000 * 60
    });
    

    //use this flag to switch the actual API call
    let pullerRecords: pullerRecord[];
    const pullDataFlag: boolean = false;
    if(pullDataFlag){

        pullerRecords = await pullData('IFA');
        // console.log(pullerRecords[0]);
    }
    else{
        //use data from output.json instead
        const infile: string = "pullerRecords.json"
        const fileContent = await readFile(infile,'utf-8');

        pullerRecords = JSON.parse(fileContent);

        // console.log(pullerRecords[0]);

    }

    console.log(pullerRecords.length);

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


    
    connection.end(function(err:Error){
        console.log('connection ended');
        if(err){
            console.error(err);
        }
    })
    
}

main();




