import * as mysql from 'mysql2/promise';
import { hey } from './lib/helper.js';
import { pullData } from './lib/pullData.js';
import { pullerRecord } from './lib/interfaces.js';

async function main(){

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'kbuser',
        port: 3306,
        password: 'password',
        database: 'AERS_DATA',
        connectTimeout: 60000 * 60
    });
    
    
    //testing query
    // const myQuery = 'SELECT * FROM PULLER;';
     
    // const results = await connection.execute(myQuery);
    // console.log('results[0]: ', results[0]);//this will return all of your results
    // console.log('results[1]: ', results[1]);//this will return the schema definition

    const returnedData: pullerRecord[] = await pullData('IFA');

    let query: string;
    returnedData.forEach(puller => {
        query = `INSERT INTO PULLER_RECORDS(
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
            ${puller.AERSID},
            "${puller.FIRSTNAME}",
            "${puller.LASTNAME}",
            ${puller.ELO},
            "${puller.LASTMATCH}",
            "${puller.ARM}",
            "${puller.WEIGHT}",
            "${puller.DIVISION}",
            "${puller.LEAGUE}"
        );
        `
        connection.execute(query);
    });
    
    connection.end(function(err:Error){
        console.log('connection ended');
        if(err){
            console.error(err);
        }
    })
    
}

main();

