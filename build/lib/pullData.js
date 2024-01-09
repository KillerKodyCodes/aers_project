import axios from "axios";
import { writeFile } from "fs/promises";
//this function will need to pull data from AERS' api https://aersarm.com/api/Elosnapshot/GetCombinedResults/?weightClassType=WAF
export async function pullData(weightClassType) {
    const apiUrl = `https://aersarm.com/api/Elosnapshot/GetCombinedResults/?weightClassType=${weightClassType}`;
    try {
        const response = await axios.get(apiUrl);
        const bracketPullers = response.data;
        const divisions = bracketPullers.bracketPullers; //this pulls the individual classes out of the returned object
        //array to hold data to insert into AERS_DATA database
        const pullerRecords = [];
        //iterate through the object and push a pullerRecord to pullerRecords[]
        divisions.forEach(div => {
            let arm = div.arm;
            let division = div.division;
            let weight = div.weight;
            let pullerModels = div.pullerModels;
            if (pullerModels) {
                pullerModels.forEach(puller => {
                    let id = puller.id;
                    let firstName = puller.firstName;
                    let lastName = puller.lastName;
                    let elo = puller.elo;
                    let dayOfMatch = puller.dayOfMatch;
                    let pullerRecord = {
                        AERSID: puller.id,
                        FIRSTNAME: puller.firstName,
                        LASTNAME: puller.lastName,
                        ELO: puller.elo,
                        LASTMATCH: puller.dayOfMatch.replace('T00:00:00', ''), //Trim off the time
                        ARM: div.arm,
                        WEIGHT: div.weight,
                        DIVISION: div.division,
                        LEAGUE: weightClassType
                    };
                    pullerRecords.push(pullerRecord); //push the puller record 
                });
            }
            else {
                console.log('Puller object is undefined for: ', division);
            }
        });
        const jsonData = JSON.stringify(pullerRecords, null, 1);
        const outFile = 'pullerRecords.json';
        await writeFile(outFile, jsonData);
        return pullerRecords;
    }
    catch (error) {
        console.error(`Error fetching data from ${apiUrl}: ${error}`);
        throw error;
    }
}
//# sourceMappingURL=pullData.js.map