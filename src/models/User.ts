import {ReactionTime} from "./ReactionTime";

export interface User{
    Id: number
    name : string
    score : number
    difficulty:number
    numberOfCases:number
    reactionTimes: ReactionTime[]
}