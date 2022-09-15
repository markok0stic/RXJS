import {Ball} from "../models/Ball";
import {createDiv} from "../helpers/HelperViews";

export const drawBalls = (ball : Ball, host: HTMLElement) : void =>{
    const b = createDiv(host,'ball');
    b.innerText = ball.id.toString();
    b.style.background = ball.color;
}

export const drawRound = (host:HTMLElement,value:number) : void => {

}