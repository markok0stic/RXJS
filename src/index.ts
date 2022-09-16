import {initHome} from "./views/HomeView";
import {startGame} from "./services/GameService";
import {roundTime} from "./config";

initHome(document.querySelector('.mainContainer'));
startGame()
//setInterval(startGame,roundTime + 1000);