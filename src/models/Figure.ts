import {max} from "rxjs";

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

    public printFigure(div: HTMLDivElement, index: number)
    {
        let fig = document.createElement('div');
        fig.classList.add('figure'+index);
        fig.style.background = "#" + Math.floor(Math.random()*16777215).toString(16);
        fig.style.width = this.RandomNumber(2.5)+"px";
        fig.style.height = this.RandomNumber(2.5)+"px";
        fig.style.border = "1px solid #" + Math.floor(Math.random()*16777215).toString(16);
        fig.style.borderRadius = this.RandomNumber(2)+"%";
        console.log(fig);
        div.appendChild(fig);
    }

    private RandomNumber(length: number) : number
    {
        return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
    }
}