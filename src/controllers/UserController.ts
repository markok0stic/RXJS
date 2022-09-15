import {from, Observable} from "rxjs";
import {User} from "../models/User";
import {SERVER_ADDRESS} from "../config";

export const getUsers = (): Observable<User[]> => {
    const promise: Promise<User[]> = fetch(`${SERVER_ADDRESS}/user`)
        .then((res) => {
            if (!res.ok) {
                throw new Error();
            } else {
                return res.json();
            }
        })
        .catch((err) => {
            console.error(err);
        });
    return from(promise).pipe();
};

export const getUsersQuery = (query: string): Observable<User[]> => {
    const promise: Promise<User[]> = fetch(`${SERVER_ADDRESS}/user?q=${query}`)
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