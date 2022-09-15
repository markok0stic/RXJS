import {createDiv, createLabel} from "../helpers/HelperViews";
import {getBalls} from "../controllers/BallController";
import {drawBalls} from "./GameView";
import {getUsers} from "../controllers/UserController";
import {User} from "../models/User";

export const initHome = (host : HTMLElement):void => {
    const sector1 = createDiv(host,'sector1');
    const sector2 = createDiv(host,'sector2');
    let usr = getUsers().subscribe((user) =>{
        initUi(sector2,user[0]);
    })
    const title = createDiv(sector1,'divTitle');
    createLabel(title,'title').innerText = 'Lucky Six';
    createLabel(title,'r-title').innerText = '#';
    const db = createDiv(sector1,'divBalls');
    let balls = getBalls().subscribe((balls) => {
        balls.forEach(el => {
            const d = createDiv(db,'ballHandler');
            d.setAttribute('id',el.id.toString());
            drawBalls(el,d);
        })
    });
}


export const initUi = (host: HTMLElement, user: User) : void => {
    const uiDiv = createDiv(host,'u-div');
    createLabel(uiDiv,'u-name').innerText = 'Balance: '+user.balance;
    createLabel(uiDiv,'u-bal').innerText = 'Hello '+ user.name;
    const tickets = createDiv(host,'u-main-tickets');
}

