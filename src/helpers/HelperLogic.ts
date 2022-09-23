export const getRandomNumber = (length: number) : number =>
{
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
};

export const randomNumber = ( min:number, max:number) : number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const arrayRemove = (arr : any[], value: any) : any[] => {
    arr.filter(function(ele){
        return ele != value;
    });
    return arr;
}

export const arrayShuffle = ( array: any[])  : any[] => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}
