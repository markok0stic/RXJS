import {ReactionTime} from "./ReactionTime";

export interface User{
    Id: number
    resTime : number
    name : string
    score : number
    difficulty:number
    numOfCases:number
    reactionTimes: ReactionTime[]
}