import {createButton, createCustomElement, createDiv, createInput, createLabel} from "../helpers/HelperViews";
import {initGame} from "./GameView";
import {animateBG} from "../helpers/HelperBg";
import {interval} from "rxjs";

export const initHome = (host : HTMLElement):void => {
    animateBG();
    const div = createDiv(host,"hp-heroDiv");

    const label = createLabel(div,"hp-h")
    label.innerText = "THE GAME";
    const input = createInput(div,"hp-numCases");
    input.type = "number";
    input.placeholder = "Number of cases";

    const divsel = createDiv(div,"hp-divsel");
    const sel = document.createElement("select");
    var array = ["1","2","3"];
    for (let i = 0; i < array.length; i++) {
        let option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        sel.appendChild(option);
    }
    const diff = createLabel(div,"hp-diff")
    diff.innerText = "Difficulty";
    divsel.appendChild(diff);
    divsel.appendChild(sel);

    const btn = createButton(div,"hp-btnplay");
    btn.innerText = "Play"


    host.appendChild(div);
    btn.onclick = () => {  initGame(host,input.value,sel.value); }
}

