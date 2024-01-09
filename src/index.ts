import * as mysql from 'mysql2/promise';
import { pullData } from './lib/pullData.js';
import { pullerRecord } from './lib/interfaces.js';
import { readFile } from 'fs/promises';
import { syncData } from './lib/syncData.js';

async function main(){

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'kbuser',
        port: 3306,
        password: 'password',
        database: 'AERS_DATA',
        connectTimeout: 60000 * 60
    });

    //IFA sync
    // syncData('aers', 'IFA', connection);
    //WAF sync
    await syncData('aers', 'WAF', connection);




    
    connection.end(function(err:Error){
        console.log('connection ended');
        if(err){
            console.error(err);
        }
    })
    
}

main();




