import {createButton, createCustomElement, createDiv, createInput} from "../helpers/HelperViews";

export const initHome = (host : HTMLElement) =>
{
    const btn = createButton(host,"hp-btnplay");
    const input = createInput(host,"hp-numCases");
    const div = createDiv(host,"hp-heroDiv");
    host.appendChild(div);
    btn.onclick = () => {  startGame(parseInt(input.value)); }
}

function startGame(numCases: number,)
{

}