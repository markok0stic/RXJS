import {from, Observable} from "rxjs";
import {Ball} from "../models/Ball";
import {SERVER_ADDRESS} from "../config";

export const getBalls = (): Observable<Ball[]> => {
    const promise: Promise<Ball[]> = fetch(`${SERVER_ADDRESS}/ball`)
        .then((res) => {
            if (!res.ok) {
                throw new Error();
            } else {
                return res.json();
                //console.table(res.json());
            }
        })
        .catch((err) => {
            console.error(err);
        });
    return from(promise);
};

export const getFiguresQuery = (query: string): Observable<Ball[]> => {
    const promise: Promise<Ball[]> = fetch(`${SERVER_ADDRESS}/ball?q=${query}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error();
            } else {
                return res.json();
                //console.table(res.json());
            }
        })
        .catch((err) => {
            console.error(err);
        });
    return from(promise);
};