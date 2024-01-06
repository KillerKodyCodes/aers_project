import mysql2 from 'mysql2/promise'


async function main(){

    const connection = await mysql2.createConnection({
        host: 'localhost',
        user: 'kbuser',
        port: '3306',
        password: 'password',
        database: 'AERS_DATA'
    });
    
    
    const myQuery = 'SELECT * FROM PULLER;';
    
    const results = await connection.execute(myQuery);
    // console.log('results[0]: ', results[0]);//this will return all of your results
    // console.log('results[1]: ', results[1]);//this will return the schema definition

    connection.end(function(err){
        console.log('connection ended');
    })
    
}

main();

