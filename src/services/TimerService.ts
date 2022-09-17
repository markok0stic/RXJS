import {INTERVAL, SEC, TIMER} from "../config";
import {BehaviorSubject, map, NEVER, startWith, switchMap, takeWhile, tap, timer} from "rxjs";

export const toMinutes = (ms: number) =>
    Math.floor(ms / SEC / 60);

const toSeconds = (ms: number) =>
    Math.floor(ms / SEC) % 60;

const toSecondsString = (ms: number) => {
    const seconds = toSeconds(ms);
    return seconds < 10 ? `0${seconds}` : seconds.toString();
}

const toMs = (t: number) => t * INTERVAL;

const currentInterval = () => TIMER / INTERVAL;

const toRemainingSeconds = (t: number) => currentInterval() - t;

export const toggle = new BehaviorSubject(true);
export const remainingSeconds = toggle.pipe(
    switchMap((running: boolean) => {
        return running ? timer(0, INTERVAL) : NEVER;
    }),
    map(toRemainingSeconds),
    takeWhile(t => t >= 0)
);

let current;
const ms$ = TIMER.pipe(
    map(toMs),
    tap(t => current = t)
);


export const minutes = ms$.pipe(
    map(toMinutesDisplay),
    map(s => s.toString()),
    startWith(toMinutesDisplay(time).toString())
);

const seconds$ = ms$.pipe(
    map(toSecondsDisplayString),
    startWith(toSecondsDisplayString(time).toString())
);

