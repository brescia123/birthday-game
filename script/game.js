var stage, canvas, heart, img;

function init(){
	canvas = document.getElementById("myCanvas")
    stage = new createjs.Stage(canvas);
    img = new Image();

    img.onload = onImageLoaded;
    img.src = 'assets/heart.png';

    if('ontouchstart' in document.documentElement){
    	canvas.addEventListener('touchstart', function(e){
    		handleKeyDown();
    	},false);
    	 canvas.addEventListener('touchend', function(e) {
			handleKeyUp();
			}, false);	
    }
    else{
    	 document.onkeydown = handleKeyDown;
	     // document.onkeyup = handleKeyUp;
	     // document.onmousedown = handleKeyDown;
	     // document.onmouseup = handleKeyUp;
    }

    function handleKeyDown(e){
    	console.log("keyDown");
    	heart.tick();
    	stage.update();
    }


	function onImageLoaded(e) {
		for (var i = 0; i < 10; i++) {
			heart = new Heart(img);
			heart.x = i * 100;
	    	stage.addChild(heart);

		};
	 
	    createjs.Ticker.setFPS(60);
	    createjs.Ticker.addEventListener('tick',tick);
	}

	function tick() {
    	heart.tick();
    	stage.update();
	}

    stage.update();
}








