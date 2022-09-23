import {createDiv, createLabel} from "../helpers/HelperViews";
import {ARRAY_IDS, MULTIPLIERS, SUBJECT, TICKETS, USER} from "../config";
import {Ball} from "../models/Ball";
import {listenBigBall} from "../services/GameService";

export const initGameView = (host: HTMLElement): void => {
    host.innerHTML = ``
    createSector1(host);
    createSector2(host);
}

export const drawTickets = (host: HTMLElement) => {
    TICKETS.forEach(el => {
        let ticket = createDiv(host, 'u-ticket');
        ticket.setAttribute('t-id', el.num.toString());
        ticket.style.flexDirection = 'column';
        ticket.style.width = '95%';
        let nums = createDiv(ticket, 't-numbers');
        el.numbers.forEach(num => {
            createDiv(nums, 't-nums').innerHTML = num.toString();
        })
        createDiv(ticket, 't-bet').innerHTML = 'Bet: ' + el.bet.toString();
    })
}

export const createSector2 = (host: HTMLElement): void => {
    const sector2 = createDiv(host, 'g-sector2');
    let roundInfo = createDiv(sector2, 'timer')
    roundInfo.innerHTML = `
    <div>
    <span class="minutes"></span>
    <span>:</span>
    <span class="seconds"></span>
    </div>`;
    createLabel(roundInfo, 'lbl')
    let divT = createDiv(sector2, 'u-div');
    drawTickets(sector2);
    createLabel(divT, 'r-title').innerHTML = 'Balance: ' + USER.balance
}

export const createSector1 = (host: HTMLElement): void => {
    const sector1 = createDiv(host, 'g-sector1');
    let gDivPlcL = createDiv(sector1, 'g-div-plc');
    let gDivPlcM = createDiv(sector1, 'g-div-plc-m');
    let gDivPlcR = createDiv(sector1, 'g-div-plc');

    drawBallHoldersWithMultiplier(createDiv(gDivPlcL, 'g-ph-1'), [10000, 7500, 5000, 2500, 1000, 500, 300, 200], 0);
    drawBallHoldersWithMultiplier(createDiv(gDivPlcL, 'g-ph-2'), [150, 100, 90, 80], 1);

    drawMiddleBall(createDiv(gDivPlcM, 'g-bb-ph-big'), 500)
    let gBDiv = createDiv(gDivPlcM, 'g-bb-ph')
    drawBallHoldersWithMultiplier(createDiv(gBDiv, 'g-ph-3'), [70, 60, 50], 2)
    drawBallHoldersWithMultiplier(createDiv(gBDiv, 'g-ph-3'), [40, 30, 25], 3)

    drawBallHoldersWithMultiplier(createDiv(gDivPlcR, 'g-ph-2'), [20, 15, 10, 9], 4);
    drawBallHoldersWithMultiplier(createDiv(gDivPlcR, 'g-ph-1'), [8, 7, 6, 5, 4, 3, 2, 1], 5);
}

export const drawBallHoldersWithMultiplier = (host: HTMLElement, multipliers: number[], arrayx: number): void => {
    let h: number = Math.floor(100 / multipliers.length);
    let offset: number = 5
    multipliers.forEach(el => {
        let bHolder = createDiv(host, 'g-b-holder')
        bHolder.style.height = h.toString() + '%'
        let dibBall = createDiv(bHolder, 'g-bhl')
        dibBall.setAttribute('ball-id', (ARRAY_IDS[arrayx][multipliers.indexOf(el)] + offset).toString())
        dibBall.setAttribute('mult', el.toString())
        createDiv(bHolder, 'g-mul-l').innerHTML = el.toString()
    })
}

export const drawMiddleBall = (host: HTMLElement, multiplier: number): void => {
    createDiv(host, 'g-bb-big-ball')
    let divBalls = createDiv(host, 'g-div-bb-balls')
    for (let i = 1; i < 6; i++) {
        createDiv(divBalls, 'g-bhl').setAttribute('ball-id', i.toString());
    }
    listenBigBall()
}

export const drawBallInBigBall = (ball: Ball): void => {
    let bigBall = document.querySelector('.g-bb-big-ball') as HTMLElement;
    bigBall.innerHTML = `<div class="centerBall"> ${ball.id.toString()} </div>`;
    SUBJECT.next(ball);
    bigBall.style.background = ball.color;
    bigBall.style.boxShadow = `0px 5px 12px #0000001F`;
    setTimeout(clearBigBall, 2000);
}

export const clearBigBall = (): void => {
    let bigBall = document.querySelector('.g-bb-big-ball') as HTMLElement;
    bigBall.innerHTML = ``;
    bigBall.style.background = '#f8f8f8';
}

export const drawIntoBallHolder = (ball: Ball, phIndex: number): void => {
    let bh = document.querySelectorAll('div[ball-id]')
    bh.forEach(el => {
        if (parseInt(el.getAttribute('ball-id')) == phIndex) {
            let bel = el as HTMLElement;
            bel.innerHTML = `<div class="bh-b-placed">${ball.id.toString()}</div>`
            bel.style.background = ball.color;
        }
    })
}
export const markNumberOnTicket = (numberToMark: number): void => {
    let tickets = document.querySelectorAll('div[t-id]')
    tickets.forEach(el => {
        el.querySelectorAll('.t-nums').forEach(num => {
            if (parseInt(num.innerHTML) == numberToMark) {
                let div = num as HTMLElement
                div.classList.add('t-marked-num');
            }
        })
    })
}

export const checkIfPassedTicket = (multip: number): void => {
    let tickets = document.querySelectorAll('div[t-id]')
    tickets.forEach(el => {
        let t = el as HTMLElement
        let id = parseInt(t.getAttribute('t-id'))
        if (el.querySelectorAll('.t-marked-num').length == 6 && !el.classList.contains('t-passed')) {
            t.classList.add('t-passed');
            TICKETS.forEach(ticket => {
                if (ticket.num == id) {
                    ticket.passed = true;
                    updateUserBalance(ticket.bet * MULTIPLIERS[multip])
                }
            })
        }
    })
}

export const setTicketNotPassed = (): void => {
    let tickets = document.querySelectorAll('.u-ticket')
    tickets.forEach(el => {
        if (el.classList.length < 2) {
            el.classList.add('t-failed');
        }
    })
}

export const updateUserBalance = (won: number): void => {
    let bal = document.querySelector('.r-title') as HTMLElement
    bal.innerHTML = 'Balance: ' + (USER.balance + won).toString();
    USER.balance += won
}

export const disableInterface = (): void => {
    createDiv((document.body.querySelector('.mainContainer')) as HTMLElement, 'bigTimer')
}
