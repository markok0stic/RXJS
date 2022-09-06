import {User} from "../models/User";
import {createDiv, removeAllChildNodes} from "../helpers/HelperViews";
import {Figure} from "../models/Figure";

export const initGame = (host: HTMLElement, numCases: string, difficulty: string) =>{
    console.log(numCases,difficulty);
    removeAllChildNodes(host);
    const div = createDiv(host,"gp-mainContainer");
    switch (difficulty)
    {
        case "1":
            let fig = new Figure(100,100,2,"asd",3);
            fig.printFigure(div,0);
            break;
        case "2":

            break;
        case "3":

            break;
    }






}