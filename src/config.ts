import {Ticket} from "./models/Ticket";
import {User} from "./models/User";

export const SERVER_ADDRESS = "http://localhost:3000";


export const BALL_INTERVAL = 2500;
export const ROUND_TIME = 35 * BALL_INTERVAL;
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
export const INTERVAL:number = SEC;
export const MINUTES: number = 1.5;
export const TIME:number = MINUTES * SEC * 60;


export const CURRENT: number = 0;
export const TIMER: number = TIME;
