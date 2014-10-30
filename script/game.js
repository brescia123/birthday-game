var stage, canvas, heart, heart_img;

function init(){

    var stageHeight = 500;
    var stageWidth = 700;
    var blockHeight = 70



	canvas = document.getElementById("stage")
    stage = new createjs.Stage(canvas);
    heart_img = new Image();
    terrain_img = new Image();

  
    terrain_img.onload = onTerrainImgLoaded;
    heart_img.onload = onHeartImgLoaded;
    terrain_img.src = 'assets/terrain.png'
    heart_img.src = 'assets/heart.png';

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


	function onHeartImgLoaded(e) {
        heart = new createjs.Bitmap(heart_img);
		for (var i = 1; i <= 7; i++) {
            var tempBitMap = heart.clone();
			heart.y = 0;
            heart.x = i * 100;
	    	stage.addChild(tempBitMap);
		};
	 
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
	    createjs.Ticker.setFPS(30);
	    createjs.Ticker.addEventListener('tick',tick);
	}

    function onTerrainImgLoaded(e) {
        ground = new createjs.Bitmap(terrain_img);
        for (i = 0; i < 10; i++) {
            var tempBitMap = ground.clone();
            tempBitMap.x = i * 70;
            tempBitMap.y = stageHeight - blockHeight;
            stage.addChild(tempBitMap);
        };
    };

	function tick(event) {
        
    	stage.update();
	}

    stage.update();
}








