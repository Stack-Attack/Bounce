/*This state is used as the home menu. It only has one button but includes lighting effects and objects 
to write out the title of the game: 'Bounce'*/
var MenuState = {
 
    preload: function () { //Loaded first   
        //Load Sounds
        game.load.audio('ambient', 'assets/audio/main.ogg');
        game.load.audio('music', 'assets/audio/playing.ogg');
        game.load.audio('wall', 'assets/audio/Sword_hit_loud.ogg');
        game.load.audio('bounce', 'assets/audio/hammer_stone_3.ogg');
        game.load.audio('boom', 'assets/audio/boom.ogg');

        game.load.image('bumper', 'assets/images/bumper.png'); //Circle image
        //These are some variables to help in scaling
        buttonSize = 0.138* game.canvas.width; 
        lampSize = game.canvas.height ;
        scale = game.canvas.width / 360;
    },
    create: function () { //Creates the graphics
        //Play ambience
        ambient = game.add.audio('ambient');
     
        ambient.play();

        game.stage.backgroundColor = "#262626" //Set background
        game.plugins.add(Phaser.Plugin.PhaserIlluminated); //Add illumination plugin
        //scaling options
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //screen size will be set automatically
        this.scale.setScreenSize(true);

        //Create light sources to be show the otherwise invisible title
       // myLamp1 = game.add.illuminated.lamp(game.canvas.width / 2 - 250,-250, { distance: 250, samples: 10, color: '#ffeee6', radius: 10 });
       // myLamp2 = game.add.illuminated.lamp(-375, -175, { distance: 250, samples: 10, color: '#ffeee6', radius: 10 });
        myLamp3 = game.add.illuminated.lamp(game.canvas.width/2-(lampSize/2)+2000, game.canvas.height - (lampSize/2) - (buttonSize*3), { distance: lampSize/2, samples: 50, color: '#ffeee6', radius: 10 });
        myLamp4 = game.add.illuminated.lamp(game.canvas.width / 2 - lampSize, game.canvas.height - lampSize- (buttonSize * 3), { distance: lampSize, samples: 50, color: '#ffeee6', radius: 10 });

        //Create objects that create shadows. These spell out 'BOUNCE'
        bShadow = game.add.illuminated.polygonObject([{ x: 10 * scale, y: 100 * scale }, { x: 10 * scale, y: 300 * scale }, { x: 60 * scale, y: 250 * scale }, {x:20*scale,y:200*scale}, {x:60*scale,y:150*scale}, {x:10*scale,y:100*scale}]);
        oShadow = game.add.illuminated.polygonObject([{ x: 70*scale, y: 200*scale }, { x: 95*scale, y: 300*scale }, { x: 120*scale, y: 200*scale }, { x: 95*scale, y: 100*scale }]);
        uShadow = game.add.illuminated.polygonObject([{ x: 130 * scale, y: 100 * scale }, { x: 130 * scale, y: 250 * scale }, { x: 155 * scale, y: 300 * scale }, { x: 180 * scale, y: 250 * scale }, { x: 180 * scale, y: 100 * scale }, { x: 155 * scale, y: 250 * scale }]);
        nShadow = game.add.illuminated.polygonObject([{ x: 190 * scale, y: 300 * scale }, { x: 190 * scale, y: 100 * scale }, { x: 240 * scale, y: 300 * scale }, { x: 240 * scale, y: 100*scale }]);
        cShadow = game.add.illuminated.polygonObject([{ x: 300 * scale, y: 100 * scale }, { x: 250 * scale, y: 200 * scale }, { x: 300 * scale, y: 300 * scale }, { x: 275 * scale, y: 200 * scale }]);
        eShadow = game.add.illuminated.polygonObject([{ x: 310 * scale, y: 100 * scale }, { x: 310 * scale, y: 300 * scale }, { x: 360 * scale, y: 300 * scale }, { x: 320 * scale, y: 250 * scale }, { x: 360 * scale, y: 200 * scale }, { x: 320 * scale, y: 150 * scale }, { x: 360 * scale, y: 100 * scale }]);

        //Add objects to lighting group
        lightObjs = [bShadow, oShadow, uShadow, nShadow, cShadow, eShadow];

        //Crreate lighting
       // myLamp1.createLighting(lightObjs);
      //  myLamp2.createLighting(lightObjs);
        myLamp3.createLighting(lightObjs);
        myLamp4.createLighting(lightObjs);

        // Add the play button with some effects
        button = game.add.button(game.canvas.width / 2-(buttonSize), game.canvas.height - (buttonSize*4), 'bumper',this.start,this);
        button.scale.setTo(0.00016*game.canvas.width, 0.00016*game.canvas.width);

        var playLabel = game.add.text(button.x+(buttonSize), button.y+(buttonSize), "Play", { font: ""+(20*scale)+'px Courier', fill: '#000000' });
        playLabel.anchor.setTo(0.5, 0.5);
        button.onInputDown.add(this.down, this);

    },

    update: function () { //Updates every frame
        //Refreshes lighting
      //  myLamp1.refresh();
       // myLamp2.refresh();
        myLamp3.refresh();
        myLamp4.refresh();
    },
    down: function () { //Called when button is 'down'
        //decrease the light size for visual effect
        myLamp4.x += 2000;
        myLamp3.x = game.canvas.width / 2 - (lampSize/2);
    },
    start: function(){ //Called when button is pressed
        game.state.start('load'); //Load the loading state
    }
}