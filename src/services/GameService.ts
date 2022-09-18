import {debounceTime, from, interval, map, Observable, Subscription, take} from "rxjs";
import {BALL_INTERVAL, TICKETS, USER} from "../config";
import {arrayRemove, arrayShuffle, getRandomNumber, randomNumber} from "../helpers/HelperLogic";
import {Ticket} from "../models/Ticket";
import {initGameView} from "../views/GameView";

export const startDraw = () : Subscription => {
    let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];
   return new Observable( (gen) =>{
       setInterval( () => {
           gen.next(
               arr.splice(
                   arrayShuffle(arr).indexOf(
                       randomNumber(1,arr.length)
                   ),1)
                   [0]
           );
       }, BALL_INTERVAL)
   }).pipe(take(35)).subscribe(x=>console.log(x));
}

export const prepareUserData = (el: HTMLElement) : Promise<Ticket> => {
    return new Promise(  (res) => {
        let t : Ticket= {
            numbers: [],
            bet: 0,
            num: 0
        };
        from(el.parentElement.querySelectorAll('.num')).pipe(map(el=>parseInt(el.innerHTML))).subscribe(el=>t.numbers.push(el));
        t.bet = parseInt((el.parentElement.querySelector('.t-bet-input') as HTMLInputElement).value)
        t.num = parseInt((el.parentElement.getAttribute('t-id')))
        res(t);
        USER.balance -= t.bet;
    })
}

export const prepareTickets = () :Promise<void> =>{
    return new Promise ((res)=>{
        let divs = document.querySelectorAll('.b-conf-active')

        divs.forEach(el=>{
            prepareUserData(el as HTMLElement).then(t=>{
                TICKETS.push(t)
                console.log(TICKETS);
            })
        });
        res()})
}

export const startGame = () : void => {
    prepareTickets().then(()=>{
        initGameView(document.querySelector('.mainContainer'));
        setTimeout(startDraw,2500)
    });
}

