import {User} from "../models/User";
import {createDiv, removeAllChildNodes} from "../helpers/HelperViews";
import {Figure} from "../models/Figure";

export const initGame = (host: HTMLElement) =>{
    removeAllChildNodes(host);
    const div = createDiv(host,"gp-mainContainer");
    let fig = new Figure(100,100,2,"asd",3);
    fig.printFigure(div,0);
}