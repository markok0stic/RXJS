import {removeAllChildNodes} from "../helpers/HelperViews";
import {User} from "../models/User";

export const scoreboardView = (host: HTMLElement) => {
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
    tb.classList.add('sc-table-body');
    table.appendChild(tb);
    table.appendChild(th);
    host.appendChild(table);
}
export const drawUsers = (user: User, index: number) : void => {
    const tb:HTMLElement = document.querySelector('.sc-table-body');
        const tre = document.createElement('tr');
        const dataArr = [index,user.name,user.score,user.difficulty,user.numberOfCases]
        dataArr.forEach(el=>{
            const tdnum = document.createElement('td');
            tdnum.innerText = ""+ el;
            tre.appendChild(tdnum);
        tb.appendChild(tre);
    })
}