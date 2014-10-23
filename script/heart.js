(function (window) {
	function Heart(image) {
		this.initialize(image);
	}
	Heart.prototype = new createjs.Bitmap();

	// save the original initialize-method so it won't be gone after
	// overwriting it
	Heart.prototype.Bitmap_initialize = Heart.prototype.initialize;

	// initialize the object
	Heart.prototype.initialize = function (image) {
		this.Bitmap_initialize(image);
		this.name = 'Heart';
		this.snapToPixel = true;
	}

	// we will call this function every frame to 
	Heart.prototype.tick = function () {
		this.y += 2;
	}

	// this will reset the position of the Heart
	// we can call this e.g. whenever a key is pressed
	Heart.prototype.reset = function() {
		this.y = 0;
	}

	window.Heart = Heart;
} (window));