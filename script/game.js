var stage, canvas, heart, heart_img;

function init(){

    var KEYCODE_LEFT = 37, 
        KEYCODE_RIGHT = 39,
        KEYCODE_UP = 38, 
        KEYCODE_DOWN = 40;

	canvas = document.getElementById("stage");
    stage = new createjs.Stage(canvas);

    //prevent scroll with arrows
    window.addEventListener("keydown", function(e) {
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    var stageDim = {
        height : stage.canvas.height,
        width : stage.canvas.width
    };
    var cloud_img;
    var sky_img;
    var heart_img;
    var terrain_img;    
    var ground;
    var tower;
    var towerVisible = false;
    var clouds = [];
    var cami;
    var heart;
    var gravity = 1.2;
    var movingDelta = 2;
    var yVel = 0;
    var absolutePos = 0;
    var camiGround;
    var groundW;
    var groundH;
    var movingLeft = false, movingRight = false, isJumping = false;

    var manifest = [
        { id:"heart_img", src:'assets/heart.png' },
        { id:"terrain_img", src:'assets/terrain.png' },
        { id:"sky_img", src:"assets/sky.png"},
        { id:"cloud_img", src:"assets/cloud2.png"},
        { id:"cami", src:"assets/cami.png"},
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
    	 document.onkeydown = keyDown;
         document.onkeyup = keyUp;
    }

    function keyDown(event){
        switch(event.keyCode){
            case KEYCODE_LEFT:
                movingLeft = true;
                break;
            case KEYCODE_RIGHT:
                movingRight = true;
                break;
            case KEYCODE_UP: 
                jump();
                break;
            case KEYCODE_DOWN: 
                break;
        }
    } 

    function keyUp(event){
        switch(event.keyCode){
            case KEYCODE_LEFT:
                movingLeft = false;
                break;
            case KEYCODE_RIGHT:
                movingRight = false;
                break;
            case KEYCODE_UP: 
                break;
            case KEYCODE_DOWN: 
                break;
        }
    }

    function jump() {
        if (isJumping == false) {
            yVel = -6;
            isJumping = true;
        }
    }

    function onLoadComplete(){

        heart_img = queue.getResult("heart_img", true);
        terrain_img = queue.getResult("terrain_img", true);
        sky_img = queue.getResult("sky_img", true);
        cloud_img = queue.getResult("cloud_img", true);
        cami_img = queue.getResult("cami", true);

        //Sky
        var sky = new createjs.Shape();
        sky.graphics.beginBitmapFill(sky_img).drawRect(0, 0, stageDim.width, stageDim.height);
        stage.addChild(sky);

        //Ground
        initGround(terrain_img);

        //Clouds
        initClouds(7);

        //Cami
        initCharacter(cami_img);

        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.addEventListener('tick',tick);
        createjs.Ticker.setFPS(45);


        stage.update();
    }

    function initCharacter (character) {

            camiGround = stageDim.height - groundH - cami_img.height;
            cami = new Cami(cami_img);
            console.log(camiGround);
            cami.x = stageDim.width / 2 - 19;
            cami.y = camiGround;
            cami.framerate = 30;

            // Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
            stage.addChild(cami);
            stage.update();
    }

    function initClouds (num) {
        for (var i = 0; i < num; i++) {
            clouds[i] = new Cloud(cloud_img, stageDim);
        }

        clouds.sort(function function_name (a, b) {
            var x = a['z'];
            var y = b['z'];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });

        for (var i = 0; i < clouds.length; i++) {
            stage.addChild(clouds[i]);
        };
    }

    function initGround () {
        groundH = terrain_img.height;
        groundW = terrain_img.width;

        ground = new createjs.Shape();
        ground.graphics.beginBitmapFill(terrain_img).drawRect(-groundW, 0, stageDim.width + groundW*2, groundH);
        
        tower = new createjs.Shape();
        tower.graphics.beginBitmapFill(terrain_img).drawRect(stageDim.width *2, 70, terrain_img.width , groundH*4);
        tower.y = stageDim.height-groundH*6;
        stage.addChild(tower);

        heart = new Heart(heart_img);
        heart.x = 200;
        heart.y = 100;
        stage.addChild(heart);

        
        ground.tileW = groundW;
        ground.tileH = groundH;
        ground.y = stageDim.height-groundH;
        stage.addChild(ground);
    }

	function tick(event) {
        //To make the anmation FPS indipendet
        var deltaS = event.delta/1000*100;
        heart.fall(gravity);
        if(movingLeft){
            if(cami.x >= 70){
                cami.x -= movingDelta * deltaS;
            }else{
                tower.x += movingDelta * deltaS;
                ground.x = (ground.x+10) % ground.tileW;
                Array.prototype.map.call(clouds, function (x) {x.move(5)});
            }
            
        };
        if(movingRight){
            if(cami.x <= stageDim.width - 108){
                cami.x += movingDelta * deltaS;
            }else{
                tower.x -= movingDelta * deltaS;
                ground.x = (ground.x-10) % ground.tileW;
                Array.prototype.map.call(clouds, function (x) {x.move(-5)});
            }
            
        }
        if (isJumping) {
            yVel += gravity;
            cami.y += yVel * deltaS;
        
            if (cami.y > camiGround) {
                cami.y = camiGround;
                yVel = 0;
                isJumping = false;
            }
        }

    	stage.update();
	}



    stage.update();
}








