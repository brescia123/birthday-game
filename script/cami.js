(function (window) {
	function Cami(image) {
		this.initialize(image);
	}
	Cami.prototype = new createjs.Bitmap();

	// save the original initialize-method so it won't be gone after
	// overwriting it
	Cami.prototype.Bitmap_initialize = Cami.prototype.initialize;

	// initialize the object
	Cami.prototype.initialize = function (image) {
		this.Bitmap_initialize(image);
		this.name = 'Cami';
		this.snapToPixel = true;
	}

	// we will call this function every frame to 
	Cami.prototype.fall = function (delta) {
		this.y -= delta/1000*100;
	}

	// this will reset the position of the Cami
	// we can call this e.g. whenever a key is pressed
	Cami.prototype.reset = function() {
		this.y = 0;
	}

	window.Cami = Cami;
} (window));