import {createDiv, createInput, createLabel, removeAllChildNodes} from "../helpers/HelperViews";
import {getBalls} from "../controllers/BallController";
import {User} from "../models/User";
import {Ball} from "../models/Ball";
import {MIN_BET, TICKET_TO_BE_POPULATED, TICKETS, USER} from "../config";
import {listenClickOnBall} from "../services/TicketService";
import {scheduleGameAndStart} from "../services/TimerService";

export const initHome = (host : HTMLElement):void => {
    removeAllChildNodes(host).then(()=>{
       /*while (TICKETS.length > 0)
            TICKETS.pop();*/
        TICKET_TO_BE_POPULATED.numbers = [];

        const sector1 = createDiv(host,'sector1');
        const sector2 = createDiv(host,'sector2');

        initUi(sector2,USER);

        const title = createDiv(sector1,'divTitle');
        createLabel(title,'title').innerText = 'Place Bet';
        createLabel(title,'lblTimer').innerHTML = `
    <span class="minutes"></span>
    <span>:</span>
    <span class="seconds"></span>`;
        createLabel(title,'r-title')

        const db = createDiv(sector1,'divBalls');

        getBalls().subscribe((balls) => {
            drawBallHandlerWithBall(db, balls).then(listenClickOnBall);
        });

        setTimeout(scheduleGameAndStart,200);
    })
}
export const drawBallHandlerWithBall = (host: HTMLElement,balls:Ball[]) : Promise<void> =>{
    return new Promise ( (resolve) => {
        balls.forEach(el => {
        drawBalls(el,
            createDiv(host,'ballHandler'));
    })
    resolve();
    });
}

export const initUi = (host: HTMLElement, user: User) : void => {
    const uiDiv = createDiv(host,'u-div');
    createLabel(uiDiv,'u-name').innerText = 'Balance: '+user.balance;
    createLabel(uiDiv,'u-bal').innerText = 'Hello '+ user.name;
    const tickets = createDiv(host,'u-main-tickets');
}

export const drawBalls = (ball : Ball, host: HTMLElement) : void =>{
    const b = createDiv(host,'ball');
    b.setAttribute('id',ball.id.toString());
    b.innerText = ball.id.toString();
    b.style.background = ball.color;
    b.addEventListener('click',(ev)=>{
        activateBall(ball.id);
    },true);
}

export const activateBall = (ballId: number) :void =>{
    let ball =  document.querySelectorAll('div[id]')
        .item(ballId - 1).parentElement;
    if (ball.classList.contains('active'))
        ball.classList.remove('active')
    else
        ball.classList.add('active');
}
export const activateTicket = (ticketId: number) :void =>{
    resetActiveTickets();
    let ticket =  document.querySelectorAll('div[t-id]')
    ticket.forEach(el=>{
        if(parseInt(el.getAttribute('t-id')) === ticketId)
        if (el.classList.contains('t-active'))
            el.classList.remove('t-active')
        else
            el.classList.add('t-active');
    })
}

export const drawTicket = () : void => {
    resetActiveTickets();
    let tArea = document.querySelector('.u-main-tickets') as HTMLElement

    let ticket = createDiv(tArea,'u-ticket');
    ticket.classList.add('t-active')
    ticket.setAttribute('t-id',TICKET_TO_BE_POPULATED.num.toString());
    ticket.addEventListener('click',()=>{activateTicket(parseInt(ticket.getAttribute('t-id')))},false);



    createLabel(ticket,'lbl').innerText = "Ticket #" + TICKET_TO_BE_POPULATED.num.toString();
    createDiv(ticket,'t-numbers');
    let tBet = createDiv(ticket,'t-bet');

    let betInput = createInput(tBet,'t-bet-input');
    betInput.type = 'number';
    betInput.value = MIN_BET.toString();
    createDiv(ticket,'btnConf').innerHTML = `<svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;
    resetActiveBalls();
}

export const updateTicketNumbers = (num:number, reset? : boolean) => {
    let divTickets = document.querySelectorAll('div[t-id]')
    let ticket : HTMLElement;
    divTickets.forEach(el=>{
        if(el.classList.contains('t-active'))
            ticket = el as HTMLElement;
        });
    let numbersDiv = ticket.querySelector('.t-numbers') as HTMLElement;
    if (reset)
    {
        let nums = numbersDiv.querySelectorAll('.num')
        nums.forEach(el=>{
            if(el.innerHTML == num.toString())
            {
                numbersDiv.removeChild(el);
            }
        })
    }
    else
    {
        createDiv(numbersDiv, 'num').innerText = num.toString();
    }
    let btnCnf = ticket.querySelector('.btnConf');
    if(numbersDiv.children.length === 6)
    {
        btnCnf.classList.add('b-conf-active')
    }
    else
    {
        if (btnCnf.classList.contains('b-conf-active'))
        {
            btnCnf.classList.remove('b-conf-active')
        }
    }
}

export const resetActiveBalls = () : void => {
    let ball =  document.querySelectorAll('.active')
    ball.forEach(el=>{
        el.classList.remove('active');
    })
}

export const resetActiveTickets = () : void => {
    let tickets = document.querySelectorAll('.t-active');
    tickets.forEach(el=>{
        el.classList.remove('t-active');
    });
}

export const removeEmptyTickets = () : void => {
    let mainDiv = document.querySelector('.u-main-tickets');
    let tickets = document.querySelectorAll('.u-ticket')
    tickets.forEach(el=>{
        if(el.querySelector('.t-numbers').children.length <= 0)
            mainDiv.removeChild(el);
    });
}

export const updateDomTimer = (sec: string, mins: string) : void =>{
    document.querySelector('.minutes').innerHTML = mins;
    document.querySelector('.seconds').innerHTML = sec;
}
