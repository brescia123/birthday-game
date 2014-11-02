(function (window) {
	function Cami(image) {
		this.initialize(image);
	}

	this.points;

	Cami.prototype = new createjs.Bitmap();

	// save the original initialize-method so it won't be gone after
	// overwriting it
	Cami.prototype.Bitmap_initialize = Cami.prototype.initialize;

	// initialize the object
	Cami.prototype.initialize = function (image) {
		this.Bitmap_initialize(image);
		this.name = 'Cami';
		this.snapToPixel = true;
		this.points = 0;
	}

	// we will call this function every frame to 
	Cami.prototype.increasePoints = function () {
		if(this.points < 850){
			this.points += 20;
		}
	}	

	// this will reset the position of the Cami
	// we can call this e.g. whenever a key is pressed
	Cami.prototype.reset = function() {
		this.y = 0;
	}

	window.Cami = Cami;
} (window));