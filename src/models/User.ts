export class User{
    Id: number
    resTime : number;
    constructor(resTime: number, Id: number)
    {
        this.Id = Id;
        this.resTime = resTime;
    }
}