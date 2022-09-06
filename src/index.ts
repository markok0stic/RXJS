import {initHome} from "./views/HomeView";
import {scoreboardView} from "./views/ScoreboardView";
import {getUsers} from "./controllers/UsersController";

let useras = null;
getUsers().subscribe((users)=>{
 useras = users;
})
scoreboardView(document.body,useras);