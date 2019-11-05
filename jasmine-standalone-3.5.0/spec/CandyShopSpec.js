describe("CandyShop", function(){
    let gumball;
    let runt;

    beforeEach(function() {
        gumball = new Candy();
        runt = new Candy();
    });

    it("should properly calculate candy removal", function() {
        // gumball.removeCandy(20);
        expect(gumball.removeCandy(20)).toEqual(490);

    });

    it("should properly calculate candy addition", function() {
        // runt.addCandy(600);
        expect(runt.addCandy(600)).toEqual(604);
    });

    it("should ensure removal of one type of candy doesn't affect the other", function(){
        let removingGumball = gumball.removeCandy(20);
        if(removingGumball){
            expect(runt.totalRunt()).toEqual(4);
            expect(removingGumball).toEqual(490);
        }
        
        let addingRunt = runt.addCandy(600);
        if(addingRunt){
            expect(gumball.totalGumball()).toEqual(510);
            expect(addingRunt).toEqual(604);
        }

    });
});