//constractor for the fishTank

var FishTank = function($fishTank){

    var self = this;

    this.$fishTank = $fishTank;
    this.$fishAmountInput =$("#fishAmaunt");
    this.$cleanersAmauntInput =$("#cleanersAmaunt")
    this.$DirtAmauntInput =$("#DirtAmaunt")

    this.dirt = 0;
    this.fishArr = [];
    this.cleanerArr =[];

    // adding new fish to the tank using the Fish constractor
    this.addFish = function(){

        var yellowFish = "Pics/yellowFish.gif"
        var greenFish = "Pics/greenFishgif.gif" 
        var stripedFish = "Pics/stripedFish.gif" 

        var fishType = getRandomInt(1,3)
        if(fishType === 1 ){
             self.fish = new Fish(yellowFish,$fishTank);
        } else if (fishType === 2 ) { 
            self.fish = new Fish(greenFish,$fishTank);
        } else {
            self.fish = new Fish(stripedFish,$fishTank);
        }

       self.fishArr.push(self.fish);
       this.$fishAmountInput.val(self.fishArr.length);
    }

    // adding new cleaner to the tank using the CleaningFish constractor
    this.addCleaner = function(){

        var cleanerURL = "Pics/CleaningFish.gif"
        self.cleaner = new Cleaner(cleanerURL,$fishTank);
        this.cleanerArr.push(self.cleaner);
        this.$cleanersAmauntInput.val(self.cleanerArr.length);

    }
    // feeding the fish using "eat" function from the fish/cleaningfish constractor
    this.feed = function(){
        for(var fish of self.fishArr){
            self.fish.eat(fish);    
        }
        for(var cleaner of self.cleanerArr){
            self.cleaner.eat(cleaner);
        }
    }

    //delaing with the dirt in the tank 
    this.tankDirt = (function(){
        var dirtInterval = setInterval(function(){
            if(self.dirt<0){
                self.dirt = 0;
                self.$DirtAmauntInput.val(Math.round(self.dirt));
                self.$fishTank.css("opacity", "1");
            } else if (self.dirt < 100){
                self.dirt += (self.fishArr.length)/6;
                self.dirt -= (self.cleanerArr.length)*1.5/6;
                self.$DirtAmauntInput.val(Math.round(self.dirt));
                self.tankOpacity();
            }else{
                alert('Game Over\Your Fish Tank is to dirty!\Try again');
                location.reload();
            }
        },500);    
    })();       

    // removing fish that is dead
    this.fishKill = function(fish){
        var index = this.fishArr.indexOf(fish);
        this.fishArr.splice(index,1);
        console.log(this.fishArr);
        this.$fishAmountInput.val(self.fishArr.length);
    }

    // removing Cleaner that is dead
     this.cleanerKill = function(fish){
        var index = this.cleanerArr.indexOf(fish);
        this.cleanerArr.splice(index,1);
        console.log(this.cleanerArr);
        this.$cleanersAmauntInput.val(self.cleanerArr.length);
    }
    //deales with tank opasity according to the dirt in the tank
    this.tankOpacity = function(){
        if(self.dirt<40&&self.dirt>=20)
            self.$fishTank.css("opacity", "0.8");
        if(self.dirt<60&&self.dirt>=40)
            self.$fishTank.css("opacity", "0.6");
        if(self.dirt<80&&self.dirt>=60)
            self.$fishTank.css("opacity", "0.4");
        if(self.dirt<100&&self.dirt>=80)
            self.$fishTank.css("opacity", "0.1");
    }
    
} 