import {createDiv, createInput, createLabel, removeAllChildNodes} from "../helpers/HelperViews";
import {MIN_BET, ROUND_NUMBER, TICKET_TO_BE_POPULATED, TICKETS, USER} from "../config";

export const initGameView = (host: HTMLElement) : void =>{
    removeAllChildNodes(host);
    const sector1 = createDiv(host,'g-sector1');
    const sector2 = createDiv(host,'g-sector2');
    let roundInfo = createDiv(sector2,'timer')
    roundInfo.innerHTML = `
    <div>
    <span class="minutes"></span>
    <span>:</span>
    <span class="seconds"></span>
    </div>`;
    createLabel(roundInfo,'lbl').innerHTML = '#' + ROUND_NUMBER
    let divT = createDiv(sector2,'u-div');
    drawTickets(sector2);
    createLabel(divT,'r-title').innerHTML = 'Balance: ' + USER.balance
}

export const drawTickets = (host:HTMLElement) => {
    TICKETS.forEach(el=>{
        let ticket = createDiv(host,'u-ticket');
        ticket.setAttribute('t-id',el.num.toString());
        ticket.style.flexDirection = 'column';
        ticket.style.width = '95%';
        let nums =  createDiv(ticket,'t-numbers');
        el.numbers.forEach(num => {
            createDiv(nums,'t-nums').innerHTML = num.toString();
        })
        createDiv(ticket,'t-bet').innerHTML = 'Bet: ' + el.bet.toString();
    })
}