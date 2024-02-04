import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { syncData } from './lib/syncData.js';
dotenv.config();
async function main(projectAlias) {
    var dbConfig;
    if (projectAlias == 'prod') {
        dbConfig = {
            user: process.env.PROD_DB_USER,
            port: parseInt(process.env.PROD_DB_PORT, 10),
            password: process.env.PROD_DB_PASSWORD,
            database: process.env.PROD_DB_DATABASE,
            connectTimeout: parseInt(process.env.PROD_DB_CONNECT_TIMEOUT, 10),
        };
    }
    else if (projectAlias == 'test') {
        dbConfig = {
            host: process.env.TEST_DB_HOST,
            user: process.env.TEST_DB_USER,
            port: parseInt(process.env.TEST_DB_PORT, 10),
            password: process.env.TEST_DB_PASSWORD,
            database: process.env.TEST_DB_DATABASE,
            connectTimeout: parseInt(process.env.TEST_DB_CONNECT_TIMEOUT, 10),
        };
    }
    else {
        console.log('Invalid project alias: ', projectAlias);
        return;
    }
    const connection = await mysql.createConnection(dbConfig);
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'kbuser',
    //     port: 3306,
    //     password: 'password',
    //     database: 'AERS_DATA',
    //     connectTimeout: 60000 * 60
    // });
    // const connection = await mysql.createConnection({
    //     host: '191.101.79.205',
    //     user: 'u258074489_kbuser',
    //     port: 3306,
    //     password: '120700!Lmao',
    //     database: 'u258074489_AERSDATA',
    //     connectTimeout: 60000 * 60
    // })
    // const connection = await mysql.createConnection({
    //     host: process.env.DB_HOST || 'localhost',
    //     user: process.env.DB_USER || 'default_user',
    //     port: parseInt(process.env.DB_PORT, 10) || 3306,
    //     password: process.env.DB_PASSWORD || 'default_password',
    //     database: process.env.DB_DATABASE || 'default_database',
    //     connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT, 10) || 60000 * 60,
    // });
    //WAF sync
    console.log('Starting sync on ', projectAlias, ' database.');
    await syncData('local', 'WAF', connection);
    connection.end(function (err) {
        console.log('connection ended');
        if (err) {
            console.error(err);
        }
    });
}
// Parse command line arguments to determine the mode
const args = process.argv.slice(2);
if (args.includes('--TEST')) {
    main('test');
}
else if (args.includes('--PROD')) {
    main('prod');
}
//# sourceMappingURL=index.js.map