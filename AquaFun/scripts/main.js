
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var fishTank = new FishTank($(".fishTank"));
var tankRightEdge = $(".fishTank").width()-120;
var tankMaxHeight = $(".fishTank").height()-150;
var tankLeftEdge = 2;

$(".addGoldFish").on("click", function() {
    fishTank.addFish();
});

$(".addCleaningFish").on("click", function() {
    fishTank.addCleaner();
});

$(".feedTheFish").on("click", function() {
    // fish.eat();
    fishTank.feed();
});
