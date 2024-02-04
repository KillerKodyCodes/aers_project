import { syncData } from './lib/syncData.js';


async function main(projectAlias: 'test' | 'prod'){

    //WAF sync
    console.log('Starting sync on ', projectAlias, ' database.');
    await syncData('local', 'WAF', projectAlias);
    

}

// Parse command line arguments to determine the alias
const args = process.argv.slice(2);
if(args.includes('--TEST')){
    main('test');
}
else if(args.includes('--PROD')){
    main('prod');
}