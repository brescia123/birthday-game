var hearts = [];
this.stage;
this.stageDim;
this.heartsContainer;
this.istants = 0;
this.pointsText;
var rate


function initHearts (heartsNum, heart_img, stageDim, pointsText) {
	this.stage = stage;
	this.stageDim = stageDim;
	this.pointsText = pointsText;
	heartsContainer = new createjs.Container();
	for (var i = 0; i < heartsNum; i++) {
		hearts[i] = new Heart(heart_img);
		hearts[i].y = -heart_img.height;
		hearts[i].x = this.stageDim.width * Math.random();
		heartsContainer.addChild(hearts[i])
	}
	rate = getRandomInt(20,50);
	return heartsContainer;
}

function animateHearts (gravity, tickCount, cami) {
	if (tickCount % rate == 0){
		rate = getRandomInt(20,50);
		this.istants++;
		if(this.istants == hearts.length){
			this.istants = 0;
		}
		hearts[this.istants].falling = true;
	}
	var increasedPoints = false;
	for (var i = 0; i < hearts.length; i++) {
		if(hearts[i].falling){
			hearts[i].fall(gravity);
			if(ndgmr.checkRectCollision(hearts[i],cami)){
				hearts[i].reset();
				cami.increasePoints();
				increasedPoints = true;
			}
			if(hearts[i].y > this.stageDim.height){
				hearts[i].reset();				
			}
		}
	};
	return increasedPoints;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}