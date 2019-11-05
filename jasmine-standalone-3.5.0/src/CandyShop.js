function Candy (){
};

Candy.prototype.totalGumball = () =>{
    this.pack = { Gumball: 510 };
    return pack.Gumball;
}

Candy.prototype.totalRunt = () =>{
    this.pack = { Runt: 4 };
    return pack.Runt;
}

Candy.prototype.removeCandy = (candy) => {
    this.pack = { Gumball: 510 };
    this.arrayOperation = Object.values(pack);
    this.removeGumball = arrayOperation[0] - candy;
    return removeGumball;
}

Candy.prototype.addCandy = (candy) => {
    this.pack = { Runt: 4 };
    this.arrayOperation = Object.values(pack);
    this.addRunt = arrayOperation[0] + candy;
    return addRunt;
}