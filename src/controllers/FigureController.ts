import {from, Observable} from "rxjs";
import {Figure} from "../models/Figure";
import {SERVER_ADDRESS} from "../config";



export const getFigures = (): Observable<Figure[]> => {
    const promise: Promise<Figure[]> = fetch(`${SERVER_ADDRESS}/figures`)
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

export const getFiguresQuery = (query: string): Observable<Figure[]> => {
    const promise: Promise<Figure[]> = fetch(`${SERVER_ADDRESS}/users?q=${query}`)
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