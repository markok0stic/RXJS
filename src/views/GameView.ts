import {Ball} from "../models/Ball";
import {createDiv} from "../helpers/HelperViews";

export const drawBalls = (ball : Ball, host: HTMLElement) : void =>{
    const b = createDiv(host,'ball');
    b.innerText = ball.id.toString();
    b.style.background = ball.color;
}

export const drawRound = (host:HTMLElement,value:number) : void => {

}

export const activateBall = (ballId: number) :void =>{
    console.log(ballId);
   document.querySelectorAll('div[id]')
       .item(ballId - 1)
       .classList.add('active');
}