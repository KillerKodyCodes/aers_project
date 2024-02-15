import { syncData } from './lib/syncData.js';


async function main(projectAlias: 'test' | 'prod'){

    //WAF sync
    console.log('Starting sync on ', projectAlias, ' database with local WAF');
    await syncData('local', 'WAF', projectAlias);

    console.log('Starting sync on ', projectAlias, ' database with aers IFA');
    await syncData('aers', 'IFA', projectAlias);
    

}

// Parse command line arguments to determine the alias
const args = process.argv.slice(2);
if(args.includes('--TEST')){
    main('test');
}
else if(args.includes('--PROD')){
    main('prod');
}