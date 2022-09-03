import {interval, map, take} from "rxjs";
import {Figure} from "./models/Figure";

let startDateTime : string;

let mainDiv = document.createElement('div');
    mainDiv.classList.add('hero');
    document.body.appendChild(mainDiv);

    let fig = new Figure(100,100,2,"asd",3);
    fig.printFigure(mainDiv,0);

