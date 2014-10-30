var stage, canvas, heart, heart_img;

function init(){

   
    var blockHeight = 70;
    var heart_img;
    var terrain_img;



	canvas = document.getElementById("stage");
    stage = new createjs.Stage(canvas);


    var stageHeight = stage.canvas.height;
    var stageWidth = stage.canvas.width;

    var manifest = [
        { id:"heart_img", src:'assets/heart.png' },
        { id:"terrain_img", src:'assets/terrain.png' },
        { id:"sky_img", src:"assets/sky.png"},

    ];

    var queue = new createjs.LoadQueue(false);
    queue.on("complete", onLoadComplete, this);
    queue.loadManifest(manifest);


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

    function onLoadComplete(){

        heart_img = queue.getResult("heart_img", true);
        terrain_img = queue.getResult("terrain_img", true);
        sky_img = queue.getResult("sky_img", true);

        //Sky
        sky = new createjs.Shape();
        sky.graphics.beginBitmapFill(sky_img).drawRect(0,0,stageWidth,stageHeight);
        stage.addChild(sky);


        
        heart = new createjs.Bitmap(heart_img);
        for (var i = 1; i <= 7; i++) {
            var tempBitMap = heart.clone();
            heart.y = 0;
            heart.x = i * 100;
            stage.addChild(tempBitMap);
        };
        ground = new createjs.Bitmap(terrain_img);
        for (i = 0; i < 10; i++) {
            var tempBitMap = ground.clone();
            tempBitMap.x = i * 70;
            tempBitMap.y = stageHeight - blockHeight;
            stage.addChild(tempBitMap);
        };
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
	 
     //    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
	    // createjs.Ticker.setFPS(30);
	    // createjs.Ticker.addEventListener('tick',tick);
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








