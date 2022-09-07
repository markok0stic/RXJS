import {getUsers} from "../controllers/UsersController";
import {drawUsers, scoreboardView} from "../views/ScoreboardView";

export const loadUsers = () =>{
    scoreboardView(document.body);
    let users = getUsers().subscribe((users)=>{
        let i:number = 1;
        users.forEach(el=>{
            drawUsers(el,i);
            i++;
        })
    })
}