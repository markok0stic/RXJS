import {Ticket} from "./models/Ticket";
import {User} from "./models/User";
import {Ball} from "./models/Ball";
import {Subject} from "rxjs";

export const SERVER_ADDRESS = "http://localhost:3000";
export const BALL_INTERVAL = 3000;
export const ROUND_TIME = 35 * BALL_INTERVAL/1000 + 2;

export const MIN_BET = 20

export const TICKET_TO_BE_POPULATED : Ticket = {
    numbers: [],
    bet: MIN_BET,
    num: 0,
    passed: false
};
export const TICKETS : Ticket[] = []

export const USER : User = {
    id : 1,
    balance: 10000,
    name: "Marko"
}

export const SEC: number = 1000;
export const MINUTES: number = 0.5;
export const TIME:number = MINUTES * 60;

export const ARRAY_IDS: number[][] = [[1,2,3,4,5,6,7,8],[9,10,11,12],[13,14,15],[16,17,18],[19,20,21,22],[23,24,25,26,27,28,29,30]]
export const MULTIPLIERS: number[] = [10000,7500,5000,2500,1000,500,300,200,150,100,90,80,70,60,50,40,30,25,20,15,10,9,8,7,6,5,4,3,2,1];
export const SUBJECT: Subject<Ball> = new Subject<Ball>();
export const SUBJECT_TICKET : Subject<Ball> = new Subject<Ball>()