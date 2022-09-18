import {Ticket} from "./models/Ticket";
import {User} from "./models/User";

export const SERVER_ADDRESS = "http://localhost:3000";


export const BALL_INTERVAL = 200;
export const ROUND_TIME = 35 *BALL_INTERVAL/1000 + 2;
export const ROUND_NUMBER = 0;

export const MIN_BET = 20

export const TICKET_TO_BE_POPULATED : Ticket = {
    numbers: [],
    bet: MIN_BET,
    num: 0
};
export const TICKETS : Ticket[] = []

export const USER : User = {
    id : 1,
    balance: 1000,
    name: "Marko"
}

export const SEC: number = 1000;
export const MINUTES: number = 0.1;
export const TIME:number = MINUTES * 60;

export const ARRAYIDS: number[][] = [[1,2,3,4,5,6,7,8],[9,10,11,12],[13,14,15],[16,17,18],[19,20,21,22],[23,24,25,26,27,28,29,30]]


