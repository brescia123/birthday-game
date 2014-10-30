var stage, canvas, heart, heart_img;

function init(){

	canvas = document.getElementById("stage");
    stage = new createjs.Stage(canvas);


    var stageH = stage.canvas.height;
    var stageW = stage.canvas.width;

    var manifest = [
        { id:"heart_img", src:'assets/heart.png' },
        { id:"terrain_img", src:'assets/terrain.png' },
        { id:"sky_img", src:"assets/sky.png"},
        { id:"cloud_img", src:"assets/cloud.png"},
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

        var heart_img = queue.getResult("heart_img", true);
        var terrain_img = queue.getResult("terrain_img", true);
        var sky_img = queue.getResult("sky_img", true);
        var cloud_img = queue.getResult("cloud_img", true);

        var groundH = terrain_img.height;
        var groundW = terrain_img.width;

        //Sky
        var sky = new createjs.Shape();
        sky.graphics.beginBitmapFill(sky_img).drawRect(0,0,stageW,stageH);
        stage.addChild(sky);

        //Ground
        var ground = new createjs.Shape();
        ground.graphics.beginBitmapFill(terrain_img).drawRect(0,0,stageW+groundW, groundH);
        ground.tileW = groundW;
        ground.y = stageH-groundH;
        stage.addChild(ground);

        //Clouds
        var cloud = new createjs.Bitmap(cloud_img);
        var cloudHCenter = cloud.image.height / 2;
        var cloudWCenter = cloud.image.width / 2;
        for (var i = 0; i <= 3; i++) {
            var tempCloud = cloud.clone();
            tempCloud.setTransform(stageW * Math.random(), stageH/6 * Math.random(), 0.5, 0.5);
            tempCloud.shadow = new createjs.Shadow("#000000", 2, 2, 1000)
            stage.addChild(tempCloud);
        }
        
//      for (var i = 1; i <= 7; i++) {
  //          var tempBitMap = heart.clone();
    //        heart.y = 0;
      //      heart.x = i * 100;
        //    stage.addChild(tempBitMap);
        //};


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
            tempBitMap.y = stageH - groundH;
            stage.addChild(tempBitMap);
        };
    };

	function tick(event) {

    	stage.update();
	}

    stage.update();
}








