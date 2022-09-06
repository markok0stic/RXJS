import {removeAllChildNodes} from "../helpers/HelperViews";
import {User} from "../models/User";

export const scoreboardView = (host: HTMLElement, users :User[]) => {
    removeAllChildNodes(host);
    const table = document.createElement('table');
    table.classList.add('sb-table');
    const th = document.createElement('thead');
    const tr = document.createElement('tr');
    const thd = ["Num","Name","Score","Difficulty","Number of cases"]

    thd.forEach(el=>{
        const td = document.createElement('td');
        td.innerText = el;
        tr.appendChild(td);
    })
    th.appendChild(tr);

    const tb = document.createElement('tbody');
    let i:number = 1;

    users.forEach(el=>{
        const tre = document.createElement('tr');
        const dataArr = [i,el.name,el.score,el.difficulty,el.numOfCases]
        dataArr.forEach(el=>{
            const tdnum = document.createElement('td');
            tdnum.innerText = ""+ el;
            tre.appendChild(tdnum);
        })
        i++;
        tb.appendChild(tre);
        })
    table.appendChild(tb);
    table.appendChild(th);
    host.appendChild(table);
}