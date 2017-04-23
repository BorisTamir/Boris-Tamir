//constractor for regular fish elements.
var Fish = function(imageUrl, $container){

    var self = this;
    var move,
        powerInterval,
        imgURL = imageUrl;
    this.power = 15; 
    
    this.$fish = $('<img class="fish">').attr('src', imgURL).appendTo($container); // set img and append to the tank
    this.fishPosX = getRandomInt(2, (tankRightEdge)); // set&save X position
    this.$fish.css({top: getRandomInt(20, tankMaxHeight), left: this.fishPosX }); // set  position in the tank
    this.fishDirect = (getRandomInt(1,2) === 1 ? 'right' : 'left');  // set direction 
    if(this.fishDirect ==='left') this.$fish.toggleClass("rotate-180");  // deals with wrang direction
    this.width = this.$fish.width(); 
    this.height = this.$fish.height();

    //deals with the fish size in deferent situations duaring the game. 
    this.fishSize = function(fish){
        if(fish.power > 20) {
            if(fish.power<35){
                fish.width = 100;
                fish.height = 100;
                fish.$fish.css("width", "100px");
		        fish.$fish.css("height", "100px");
            }else{  
                fish.width = 140;
                fish.height = 140; 
                fish.$fish.css("width", "140px");
		        fish.$fish.css("height", "140px");   
            }
        }else{
            fish.$fish.css("width", "70px");
		    fish.$fish.css("width", "70px");  
        }   
    }

    // deals with fish power & size to the fish when fed 
    this.eat = function(fish){
        fish.power++;
        this.fishSize(fish);
    }
    //interval that drains power from the fish untill it's dead and updates it size
    this.fishPower = (function(){

        powerInterval = setInterval(function() {
            self.power -- ;
            self.fishSize(self)
            if(self.power<1){
                self.$fish.remove();
                fishTank.fishKill(self);
                clearInterval(move);
                clearInterval(powerInterval);
            }
        },2000);

    }());


    this.swim = ( function(){

         move = setInterval(function(){
            if (self.fishDirect === 'right'){
                self.$fish.css({left : self.fishPosX});
                self.fishPosX++; 
                if(self.fishPosX >= tankRightEdge){
                    self.fishDirect = 'left';
                    self.$fish.toggleClass("rotate-180");
                }
            } else {
                self.$fish.css({left : self.fishPosX});
                self.fishPosX--;     
                if(self.fishPosX <= tankLeftEdge){
                    self.fishDirect = 'right';
                    self.$fish.toggleClass("rotate-180");    
                }
            }
        },100);    
    }());

}
