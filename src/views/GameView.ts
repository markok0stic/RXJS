import {createDiv, createInput, createLabel, removeAllChildNodes} from "../helpers/HelperViews";
import {ARRAYIDS, MIN_BET, ROUND_NUMBER, TICKET_TO_BE_POPULATED, TICKETS, USER} from "../config";

export const initGameView = (host: HTMLElement) : void =>{
    removeAllChildNodes(host).then(()=>{
        createSector1(host);
        createSector2(host);
    });
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

export const createSector2 = (host: HTMLElement) : void => {
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

export const createSector1 = (host: HTMLElement) : void => {
    const sector1 = createDiv(host,'g-sector1');
    let gDivPlcL = createDiv(sector1,'g-div-plc');
    let gDivPlcM = createDiv(sector1,'g-div-plc-m');
    let gDivPlcR = createDiv(sector1,'g-div-plc');

    drawBallHoldersWithMultiplier(createDiv(gDivPlcL,'g-ph-1'),[10000,7500,5000,2500,1000,500,300,200],0);
    drawBallHoldersWithMultiplier(createDiv(gDivPlcL,'g-ph-2'),[150,100,90,80],1);

    drawMiddleBall(createDiv(gDivPlcM,'g-bb-ph-big'),500)
    let gBDiv = createDiv(gDivPlcM,'g-bb-ph')
    drawBallHoldersWithMultiplier( createDiv(gBDiv,'g-ph-3'),[70,60,50],2)
    drawBallHoldersWithMultiplier( createDiv(gBDiv,'g-ph-3'),[40,30,25],3)

    drawBallHoldersWithMultiplier(createDiv(gDivPlcR,'g-ph-2'),[20,15,10,9],4);
    drawBallHoldersWithMultiplier(createDiv(gDivPlcR,'g-ph-1'),[8,7,6,5,4,3,2,1],5);
}

export const drawBallHoldersWithMultiplier = (host:HTMLElement, multipliers: number[], arrayx : number) : void =>{
    let h:number = Math.floor(100/multipliers.length);
    let offset: number = 5
    multipliers.forEach(el=>{
        let bHolder = createDiv(host,'g-b-holder')
        bHolder.style.height = h.toString() + '%'
        let dibBall = createDiv(bHolder,'g-bhl')
        dibBall.setAttribute('ball-id', (ARRAYIDS[arrayx][multipliers.indexOf(el)] + offset).toString())
        dibBall.setAttribute('mult', el.toString())
        createDiv(bHolder,'g-mul-l').innerHTML = el.toString()
    })
}

export const drawMiddleBall = (host:HTMLElement, multiplier:number) : void =>{
    createDiv(host,'g-bb-big-ball')
    let divBalls = createDiv(host,'g-div-bb-balls')
    for(let i=1;i<6;i++)
    {
        createDiv(divBalls,'g-bhl').setAttribute('ball-id',i.toString());
    }
}

export const drawBallInBigBall = (num:number) : void
