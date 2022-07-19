import {interval, map, take} from "rxjs";

let startDateTime : string;




function startGame(numberOfCases : number)
{
    console.log(numberOfCases);
    initCasePage();
}

function initCasePage() {
    document.body.innerHTML = ""
}

function initStartPage() : void {
    const button = document.createElement("button");
    button.classList.add('btnStart');
    button.innerText = "Play";
    const h1 = document.createElement("h1");
    h1.classList.add("h1Start");
    h1.innerText = "THE GAME";
    document.body.appendChild(h1);


    const input = document.createElement("input");
    input.placeholder = "Number of cases";
    input.type = "number";

    const div = document.createElement("div");
    div.appendChild(button);
    div.appendChild(input);
    document.body.appendChild(div);

    button.onclick = () => {  startGame(parseInt(input.value)); }
}

initStartPage();