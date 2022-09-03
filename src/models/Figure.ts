import {max} from "rxjs";
import {getRandomNumber} from "../helpers/HelperLogic";

export class Figure {
    positionX: number;
    positionY: number;
    numOfAngles: number;
    color: string;
    numOfSides: number;

    constructor(posX: number, posY: number, numOfAngles: number, color: string, numOfSides: number) {
        this.positionX = posX;
        this.positionY = posY;
        this.color = color;
        this.numOfAngles = numOfAngles;
        this.numOfSides = numOfSides;
    }

    public printFigure(div: HTMLElement, index: number)
    {
        let fig = document.createElement('div');
        fig.classList.add('figure'+index);
        fig.style.background = "#" + Math.floor(Math.random()*16777215).toString(16);
        fig.style.width = getRandomNumber(2.5)+"px";
        fig.style.height = getRandomNumber(2.5)+"px";
        fig.style.border = "1px solid #" + Math.floor(Math.random()*16777215).toString(16);
        fig.style.borderRadius = getRandomNumber(2)+"%";
        console.log(fig);
        div.appendChild(fig);
    }

}