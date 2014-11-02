(function (window) {
	function Heart(image) {
		this.initialize(image);
	}
	
	var delta = 2;
	this.falling;

	Heart.prototype = new createjs.Bitmap();

	// save the original initialize-method so it won't be gone after
	// overwriting it
	Heart.prototype.Bitmap_initialize = Heart.prototype.initialize;

	// initialize the object
	Heart.prototype.initialize = function (image) {
		this.Bitmap_initialize(image);
		this.name = 'Heart';
		this.snapToPixel = true;
		this.falling = false;
	}

	// we will call this function every frame to 
	Heart.prototype.fall = function (gravity) {
		this.falling = true;
		if(delta < 40){
			delta += gravity;
		}
		this.y += delta/1000*100;		
	}

	// this will reset the position of the Heart
	// we can call this e.g. whenever a key is pressed
	Heart.prototype.reset = function() {
		this.falling = false;
		this.y = -this.image.height;
	}

	window.Heart = Heart;
} (window));