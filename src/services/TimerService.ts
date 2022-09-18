import {timer} from 'rxjs';
import {takeWhile, tap} from 'rxjs/operators';
import {SEC, TIME} from "../config";
import {startGame} from "./GameService";
import {updateDomTimer} from "../views/HomeView";

export const scheduleGameAndStart = () => {
    let counter = 10;
    timer(SEC, SEC)
        .pipe(
            takeWhile(() => counter > 0),
            tap(() => counter--)
        )
        .subscribe(() => {
            remainingTimeUpdate(counter);
            if (counter <= 0)
                startGame()
        });
}

export const remainingTimeUpdate = (seconds : number) : void => {
    let mins: string = Math.floor(seconds / 60 ).toString();
    let sec: string = (seconds - (parseInt(mins) * 60)).toString();

    if (mins.length <= 1)
        mins = "0"+mins;
    if (sec.length <= 1)
        sec = "0"+sec;
    updateDomTimer(sec,mins);
}


