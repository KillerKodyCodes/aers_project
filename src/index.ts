import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv'
import { syncData } from './lib/syncData.js';

dotenv.config();

async function main(projectAlias: 'test' | 'prod'){

    var dbConfig;
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

    const connection = await mysql.createConnection(dbConfig);

    //WAF sync
    console.log('Starting sync on ', projectAlias, ' database.');
    await syncData('local', 'WAF', connection);
    
    connection.end(function(err:Error){
        console.log('connection ended');
        if(err){
            console.error(err);
        }
    })
    
}

// Parse command line arguments to determine the alias
const args = process.argv.slice(2);
if(args.includes('--TEST')){
    main('test');
}
else if(args.includes('--PROD')){
    main('prod');
}