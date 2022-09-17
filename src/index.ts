import {initHome} from "./views/HomeView";
import {startGame} from "./services/GameService";
import {ROUND_TIME} from "./config";

initHome(document.querySelector('.mainContainer'));

setTimeout(startGame,5000);
