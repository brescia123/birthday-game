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
    var tickCount = 0;
    var cloud_img;
    var sky_img;
    var heart_img;
    var terrain_img;    
    var gift_img;  
    var sun_img  
    var ground;
    var heartsConteiner;
    var clouds = [];
    var sunn;
    var cami;
    var heart;
    var gift;
    var pointsText;
    var gravity = 1;
    var movingDelta = 2;
    var yVel = 0;
    var absolutePos = 0;
    var camiGround;
    var groundW;
    var groundH;
    var world = 0;
    var movingLeft = false, movingRight = false, isJumping = false;

    var manifest = [
        { id:"heart_img", src:'assets/heart.png' },
        { id:"terrain_img", src:'assets/terrain.png' },
        { id:"sky_img", src:"assets/sky.png"},
        { id:"cloud_img", src:"assets/cloud2.png"},
        { id:"cami", src:"assets/cami.png"},
        { id:"gift_img", src:"assets/gift.png"},
        { id:"sun_img", src:"assets/sun.png"},
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
        gift_img = queue.getResult("gift_img", true);
        sun_img = queue.getResult("sun_img", true);

        //Sky
        var sky = new createjs.Shape();
        sky.graphics.beginBitmapFill(sky_img).drawRect(0, 0, stageDim.width, stageDim.height);
        stage.addChild(sky);

        //Ground
        initGround(terrain_img);

        //sun
        var sunn = new createjs.Bitmap(sun_img);
        sunn.x = 400;
        sunn.y = 10;
        stage.addChild(sunn);
        
        //Clouds
        initClouds(7);

        //Cami
        initCharacter("assets/cami.png");

        heartsConteiner = initHearts(7, heart_img, stageDim, stage,pointsText);
        stage.addChild(heartsConteiner);

        //Gift
        initGift(gift_img);

        //points
        initPointsText();


        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.addEventListener('tick',tick);
        createjs.Ticker.setFPS(45);


        stage.update();
    }

    function initPointsText () {
        pointsText = new createjs.Text(cami.points,"40px Impact", "#006FF6")
        pointsText.shadow = new createjs.Shadow("#000000", 1, 1, 500); 
        pointsText.x = 10;
        pointsText.y = 10;
        stage.addChild(pointsText);
    }


    function initGift (gift_img) {
        gift = new createjs.Bitmap(gift_img);
        gift.x = 700;
        gift.y = 10;
        heartsConteiner.addChild(gift); 

    }

    function initCharacter (character) {
        camiGround = stageDim.height - groundH - cami_img.height;
        cami = new Cami(character);
        cami.x = stageDim.width / 2 - 19;
        cami.y = camiGround;
        cami.framerate = 30;
        cami.setBounds(10,10,50,70);

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
        

        
        ground.tileW = groundW;
        ground.tileH = groundH;
        ground.y = stageDim.height-groundH;
        stage.addChild(ground);
    }

	function tick(event) {
        tickCount++;
        //To make the anmation FPS indipendet
        var deltaS = event.delta/1000*100;


        if(animateHearts(gravity, tickCount, cami)){
            pointsText.text = cami.points;
        };

        if(movingLeft){
            if(cami.x >= 70){
                cami.x -= movingDelta * deltaS;
            }else if(world >= 0){
                world--;
                ground.x = (ground.x+10) % ground.tileW;
                heartsConteiner.x = (heartsConteiner.x + 10);
                Array.prototype.map.call(clouds, function (x) {x.move(5)});
            }
            
        };
        if(movingRight){
            if(cami.x <= stageDim.width - 108){
                cami.x += movingDelta * deltaS;
            }else if(world <= 20){
                world++;
                ground.x = (ground.x-10) % ground.tileW;
                heartsConteiner.x = (heartsConteiner.x - 10);
                Array.prototype.map.call(clouds, function (x) {x.move(-5)});
            }
            
        }
        if (isJumping) {
            yVel += gravity;
            yVel -= cami.points/1000;
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








