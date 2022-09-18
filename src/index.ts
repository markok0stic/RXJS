import {initHome} from "./views/HomeView";
import {scheduleGameAndStart} from "./services/TimerService";
import {initGameView} from "./views/GameView";
import {startDraw} from "./services/GameService";
import {TIME} from "./config";

initHome(document.querySelector('.mainContainer'));
setTimeout(scheduleGameAndStart,200);
//initGameView(document.querySelector('.mainContainer'));