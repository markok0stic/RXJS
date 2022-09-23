import {from, map, Observable, Subscription, take} from "rxjs";
import {BALL_INTERVAL, ROUND_TIME, SUBJECT, TICKETS, USER} from "../config";
import {arrayShuffle, randomNumber} from "../helpers/HelperLogic";
import {Ticket} from "../models/Ticket";
import {
    checkIfPassedTicket,
    disableInterface,
    drawBallInBigBall,
    drawIntoBallHolder,
    initGameView,
    markNumberOnTicket,
    setTicketNotPassed
} from "../views/GameView";
import {initHome, updateDomTimer} from "../views/HomeView";
import {startTimer} from "./TimerService";
import {getBalls} from "../controllers/BallController";
import {Ball} from "../models/Ball";

export const startDraw = (): Subscription => {
    let array: Ball[]
    getBalls().subscribe((balls) => {
        array = balls
    });

    return new Observable((gen) => {
        setInterval(() => {
            gen.next(
                array.splice(
                    arrayShuffle(array).indexOf(
                        randomNumber(1, array.length)
                    ), 1)
                    [0]
            );
        }, BALL_INTERVAL)
    }).pipe(
        take(35),
        map(x => x as Ball))
        .subscribe((x) => {
            drawBallInBigBall(x)
            if (array.length === 13) {
                setTicketNotPassed();
                setTimeout(() => {
                    initHome(document.querySelector('.mainContainer'))
                }, 5000)
            }
        });
}

export const prepareUserData = (el: HTMLElement): Promise<Ticket> => {
    return new Promise((res) => {
        let t: Ticket = {
            numbers: [],
            bet: 0,
            num: 0,
            passed: false
        };
        from(el.parentElement.querySelectorAll('.num')).pipe(map(el => parseInt(el.innerHTML))).subscribe(el => t.numbers.push(el));
        t.bet = parseInt((el.parentElement.querySelector('.t-bet-input') as HTMLInputElement).value)
        t.num = parseInt((el.parentElement.getAttribute('t-id')))
        USER.balance -= t.bet;
        res(t);
    })
}

export const prepareTickets = (): void => {
    let divs = document.querySelectorAll('.b-conf-active')

    divs.forEach(el => {
        prepareUserData(el as HTMLElement).then(t => {
            TICKETS.push(t)
        })
    });
}

export const startGame = (): void => {
    initGameView(document.querySelector('.mainContainer'));
    startDraw()
    startTimer(ROUND_TIME).subscribe();
}

export const listenBigBall = (): void => {
    let phIndex: number = 0;
    SUBJECT.subscribe(ball => {
        phIndex++;
        ball.num = phIndex;
        drawIntoBallHolder(ball, phIndex);
        markNumberOnTicket(ball.id)
        checkIfPassedTicket(ball.num);
    })
}

export const disableInterfaceAndPrepareTickets = (): void => {
    disableInterface()
    prepareTickets()
}

