import {debounceTime, filter, from, fromEvent, interval, map, Observable, Subscription, take, zip} from "rxjs";
import {BALL_INTERVAL, MULTIPLIERS, ROUND_TIME, SUBJECT, SUBJECT_TICKET, TICKETS, USER} from "../config";
import {arrayRemove, arrayShuffle, getRandomNumber, randomNumber} from "../helpers/HelperLogic";
import {Ticket} from "../models/Ticket";
import {
    checkIfPassedTicket,
    drawBallInBigBall,
    drawIntoBallHolder,
    initGameView,
    markNumberOnTicket, setTicketNotPassed, updateUserBalance
} from "../views/GameView";
import {initHome, updateDomTimer} from "../views/HomeView";
import {startTimer} from "./TimerService";
import {getBalls} from "../controllers/BallController";
import {Ball} from "../models/Ball";
import {tap} from "rxjs/operators";

export const startDraw = () : Subscription => {
    let array : Ball[]
    getBalls().subscribe((balls) =>{array = balls});

   return new Observable( (gen) =>{
       setInterval( () => {
           gen.next(
               array.splice(
                   arrayShuffle(array).indexOf(
                       randomNumber(1,array.length)
                   ),1)
                   [0]
           );
       }, BALL_INTERVAL)
   }).pipe(
       take(35),
       map(x=>x as Ball)
   )
       .subscribe((x)=>{
           drawBallInBigBall(x)
           if (array.length  === 13)
           {
               setTicketNotPassed();
               setTimeout(()=>{initHome(document.querySelector('.mainContainer'))},5000)
           }
   });
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
            })
        });
        res()})
}

export const startGame = () : void => {
    prepareTickets().then(()=>{
        initGameView(document.querySelector('.mainContainer'));
        setTimeout(()=>{
            startDraw()
            startTimer(ROUND_TIME).subscribe();
        },1000)
    });
}

export const listenBigBall = ()  : void => {
    let phIndex: number = 0;
    SUBJECT.subscribe(ball=>{
        phIndex++;
        ball.num = phIndex;
        SUBJECT_TICKET.next(ball)
        drawIntoBallHolder(ball,phIndex);
    })
}

export const listenTicket = (): void => {
    SUBJECT_TICKET.subscribe(ball=>{
            TICKETS.forEach(el => {
                if (el.numbers.includes(ball.id)) {
                    markNumberOnTicket(ball.id).then(()=>{
                        if(checkIfPassedTicket(el.num))
                        {
                            USER.balance += el.bet * MULTIPLIERS[ball.num]
                        }
                    })
                }
            })
    })
}
