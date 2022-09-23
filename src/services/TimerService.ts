import {map, Observable, of, take, timer, zip} from 'rxjs';
import {takeWhile, tap} from 'rxjs/operators';
import {SEC} from "../config";
import {disableInterfaceAndPrepareTickets, startGame} from "./GameService";
import {updateDomTimer} from "../views/HomeView";


export const remainingTimeUpdate = (seconds: number): void => {
    const mins$ = of(Math.floor(seconds / 60).toString()).pipe(
        map(x=>x as string),
        map(mins=>{
            if (mins.length <= 1) {
                mins = "0" + mins;
            }
            return mins
        }),
        take(1));

    const sec$ = of((seconds - (Math.floor(seconds / 60) * 60)).toString()).pipe(
        map(x=>x as string),
        map(secs=>{
            if (secs.length <= 1){
                secs = "0" + secs;
            }
            return secs
        }),
        take(1));

    zip(mins$,of(':'),sec$).subscribe(updateDomTimer);
}

export const scheduleGameAndStart = (): void => {
    startTimer(10).subscribe(x => {
        if (x == 5) {
            disableInterfaceAndPrepareTickets()
        }
        if (x <= 0) {
            startGame()
        }
    });
}


export const startTimer = (time: number): Observable<number> => {
    let counter = time;
    return timer(0, SEC)
        .pipe(
            takeWhile(() => counter > 0),
            tap(() => counter--),
            tap(() => {
                remainingTimeUpdate(counter)
            }),
            map(() => counter)
        )
}
