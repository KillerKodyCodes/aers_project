//interfaces used throughout the project


export interface PullerModel {
    id: number;
    firstName: string;
    lastName: string;
    elo: number;
    dayOfMatch: string;
}

export interface Division {
    arm: string;
    weight: string;
    division: string;
    pullerModels: PullerModel[];
}

export interface BracketPuller {
    bracketPullers: Division[];
}

//this is the interface for what I want the inserted data to look like for AERS_DATA
export interface pullerRecord{
    AERSID: number;
    FIRSTNAME: string;
    LASTNAME: string;
    ELO: number;
    LASTMATCH: string;
    ARM: string;
    WEIGHT: string;
    DIVISION: string;
    LEAGUE: 'IFA' | 'WAF';
}