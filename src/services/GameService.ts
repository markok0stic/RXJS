import {debounceTime, from, interval, map, Observable, Subscription, take} from "rxjs";
import {ballInterval} from "../config";
import {arrayRemove, arrayShuffle, getRandomNumber, randomNumber} from "../helpers/HelperLogic";
import {activateBall} from "../views/GameView";

export const prepareGame = () : Observable<any> => {
    let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];
   return new Observable( (gen) =>{
       setInterval( () => {
           gen.next(
               arr.splice(
                   arrayShuffle(arr).indexOf(
                       randomNumber(1,arr.length)
                   ),1)
                   [0]
           );
       }, ballInterval)
   }).pipe(take(35));
}
export const startGame = () : void => {
    prepareGame().subscribe(x=>activateBall(x));
}

