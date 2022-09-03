import {createButton, createCustomElement, createDiv, createInput, createLabel} from "../helpers/HelperViews";
import {initGame} from "./GameView";
import {animateBG} from "../helpers/HelperBg";
import {interval} from "rxjs";

export const initHome = (host : HTMLElement):void => {
    animateBG();
    const div = createDiv(host,"hp-heroDiv");

    const label = createLabel(div,"hp_h")
    label.innerText = "THE GAME";
    const input = createInput(div,"hp-numCases");
    input.type = "number";
    input.placeholder = "Number of cases";

    const divsel = createDiv(div,"hp_divsel");
    const sel = document.createElement("select");
    const op1 = document.createElement('option');
    op1.text = "1"
    const op2 = document.createElement('option');
    op1.text = "2"
    const op3 = document.createElement('option');
    op1.text = "3"
    const diff = createLabel(div,"hp_diff")
    diff.innerText = "Difficulty";
    sel.add(op1);
    divsel.appendChild(diff);
    divsel.appendChild(sel);

    const btn = createButton(div,"hp-btnplay");
    btn.innerText = "Play"


    host.appendChild(div);
    btn.onclick = () => {  initGame(host); }
}

