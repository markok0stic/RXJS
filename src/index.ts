import {initHome} from "./views/HomeView";
import {startGame} from "./services/GameService";
import {ROUND_TIME} from "./config";
import {timer} from "rxjs";

initHome(document.querySelector('.mainContainer'));


