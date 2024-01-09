import axios from "axios";
import { BracketPuller, Division, PullerModel, pullerRecord } from "./interfaces.js";
import { fstat, writeFileSync } from "fs";
import { writeFile } from "fs/promises";

//this function will need to pull data from AERS' api https://aersarm.com/api/Elosnapshot/GetCombinedResults/?weightClassType=WAF
export async function pullData(weightClassType: 'WAF' | 'IFA') {
    const apiUrl = `https://aersarm.com/api/Elosnapshot/GetCombinedResults/?weightClassType=${weightClassType}`;

    try {
        const response = await axios.get<BracketPuller>(apiUrl);

        const bracketPullers: BracketPuller = response.data;
        const divisions: Division[] = bracketPullers.bracketPullers;//this pulls the individual classes out of the returned object

        //array to hold data to insert into AERS_DATA database
        const pullerRecords: pullerRecord[] = [];

        //iterate through the object and push a pullerRecord to pullerRecords[]
        divisions.forEach(div => {
            let arm: string = div.arm;
            let division: string = div.division;
            let weight: string = div.weight;
            let pullerModels: PullerModel[] = div.pullerModels;

            if(pullerModels){
                pullerModels.forEach(puller => {
                    let id: number = puller.id;
                    let firstName: string = puller.firstName;
                    let lastName: string = puller.lastName;
                    let elo: number = puller.elo;
                    let dayOfMatch: string = puller.dayOfMatch;
                    
                    let pullerRecord = {
                        AERSID: puller.id,
                        FIRSTNAME: puller.firstName,
                        LASTNAME: puller.lastName,
                        ELO: puller.elo,
                        LASTMATCH: puller.dayOfMatch.replace('T00:00:00', ''),//Trim off the time
                        ARM: div.arm,
                        WEIGHT: div.weight,
                        DIVISION: div.division,
                        LEAGUE: weightClassType
                    }
                    pullerRecords.push(pullerRecord);//push the puller record 
                });
            }else{
                console.log('Puller object is undefined for: ', division);
            }
        });

        
        const jsonData = JSON.stringify(pullerRecords, null,1);
        
        const outFile = 'pullerRecords.json';
        
        await writeFile(outFile, jsonData);

        return pullerRecords;
    } catch (error) {
        console.error(`Error fetching data from ${apiUrl}: ${error}`);
        throw error;
    }
}