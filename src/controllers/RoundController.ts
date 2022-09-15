import {from, Observable} from "rxjs";
import {SERVER_ADDRESS} from "../config";
import {Round} from "../models/Round";

export const getBalls = (): Observable<Round[]> => {
    const promise: Promise<Round[]> = fetch(`${SERVER_ADDRESS}/round`)
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

export const getFiguresQuery = (query: string): Observable<Round[]> => {
    const promise: Promise<Round[]> = fetch(`${SERVER_ADDRESS}/round?q=${query}`)
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