import {initHome} from "./views/HomeView";
import {scheduleGameAndStart} from "./services/TimerService";
import {initGameView} from "./views/GameView";
import {startDraw} from "./services/GameService";

initHome(document.querySelector('.mainContainer'));
setTimeout(scheduleGameAndStart,5000);
