import {ReactionTime} from "./ReactionTime";

export interface User{
    Id: number
    name : string
    score : number
    difficulty:number
    numOfCases:number
    reactionTimes: ReactionTime[]
}