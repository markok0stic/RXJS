import {
    filter,
    fromEvent,
    map,
    switchMap} from "rxjs";
import {MIN_BET, TICKET_TO_BE_POPULATED} from "../config";
import {activateBall, drawTicket, resetActiveBalls, updateTicketNumbers} from "../views/HomeView";


export const updateTickets = (number : number) : void => {
    if (TICKET_TO_BE_POPULATED.numbers.length >= 6) {
        TICKET_TO_BE_POPULATED.numbers = [];
        TICKET_TO_BE_POPULATED.num++;
        TICKET_TO_BE_POPULATED.bet = MIN_BET;
        drawTicket();
        OnTicketActive();
    }
    else {
        TICKET_TO_BE_POPULATED.numbers.push(number);
        updateTicketNumbers(number);
    }
}

export const listenClickOnBall = () : void =>{
    drawTicket();
    fromEvent(document.querySelectorAll('.ballHandler'),'click')
        .pipe(
            map(ev => parseInt((<HTMLDivElement>ev.target).getAttribute('id'))),
            filter(el => el != undefined && !isNaN(el)),
            map(id => {
                if (TICKET_TO_BE_POPULATED.numbers.includes(id)) {
                    TICKET_TO_BE_POPULATED.numbers.splice(TICKET_TO_BE_POPULATED.numbers.indexOf(id),1);
                    updateTicketNumbers(id, true);
                    return 0
                }
                else return id}),
            filter( val => val != 0 && val != undefined)
        ).subscribe(x=>  updateTickets(x));
}

export const OnTicketActive = () : void =>{
    fromEvent(document.querySelectorAll('.u-ticket'),'click')
        .pipe(
            map(ev=> {
                TICKET_TO_BE_POPULATED.numbers = [];
                resetActiveBalls();
                return <HTMLDivElement> ev.target;
            }),
            filter(el => el != undefined),
            switchMap(el=> el.querySelectorAll('.num')),
            filter(nums => nums != undefined)
        ).subscribe(nums => {
        activateBall(parseInt(nums.innerHTML));
        TICKET_TO_BE_POPULATED.numbers.push(parseInt(nums.innerHTML));
    })
}
