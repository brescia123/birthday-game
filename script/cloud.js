(function (window) {
	function Cloud(image, stageDim) {
		this.initialize(image, stageDim);
	}

	this.z;
	this.dim;

	Cloud.prototype = new createjs.Bitmap();

	// save the original initialize-method so it won't be gone after
	// overwriting it
	Cloud.prototype.Bitmap_initialize = Cloud.prototype.initialize;

	// initialize the object
	Cloud.prototype.initialize = function (image, stageDim) {
		this.Bitmap_initialize(image);
		this.name = 'Cloud';
		this.snapToPixel = true;
		this.z = getRandomArbitrary(0.1, 0.9);
		this.dim = getRandomArbitrary(0.2, 0.8);
		this.setTransform(stageDim.width * Math.random(), stageDim.height/4 * Math.random(), this.dim, this.dim);
		this.shadow = new createjs.Shadow("#000000", 4, 4, 500);

	}

	// move the cloud 
	Cloud.prototype.move = function (deltaX) {
		this.x += deltaX * this.z;
	}

	// this will reset the position of the Cloud
	// we can call this e.g. whenever a key is pressed
	Cloud.prototype.reset = function() {
		this.y = 0;
	}

	function getRandomArbitrary(min, max) {
    	return Math.random() * (max - min) + min;
	}

	window.Cloud = Cloud;
} (window));