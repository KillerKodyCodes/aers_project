import * as mysql from 'mysql2/promise';
import { syncData } from './lib/syncData.js';
async function main() {
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
    connection.end(function (err) {
        console.log('connection ended');
        if (err) {
            console.error(err);
        }
    });
}
main();
//# sourceMappingURL=index.js.map