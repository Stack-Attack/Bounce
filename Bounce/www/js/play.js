
var score; //Global variable to save your score
/*This is the main state where the gameplay happens*/
var PlayState = {
  //load the game assets before the game starts
  preload: function() {
      game.physics.startSystem(Phaser.Physics.P2JS); //Start the physics engine
      score = 0; //Initialize score to 0
      //These are used for scaling
      lampSize = game.canvas.height*0.625;
      ballSize = 0.019 * game.canvas.width;
      bumperSize = 0.138 * game.canvas.width;
      //Sounds
      music = game.add.audio('music');
      wall = game.add.audio('wall');
      bounceNoise = game.add.audio('bounce');
      boom = game.add.audio('boom');
  },
  //executed after everything is loaded
  create: function () {
      //loop music
      music.loop = true;
      music.play();

      game.stage.backgroundColor = "#262626"
      //Physics constants
      game.physics.p2.restitution = 1;
      game.physics.p2.gravity.y = 300 * game.canvas.width / 360;;
      game.physics.p2.applyDamping = false;
      //Lighting plugin
      game.plugins.add(Phaser.Plugin.PhaserIlluminated);

      //Display the score
      scoreLabel = game.add.text(game.canvas.width / 2, 40* game.canvas.height / 360, "" + score, { font: ""+(40*game.canvas.width / 360)+'px Courier', fill: '#ffffff' });
      scoreLabel.anchor.setTo(0.5, 0.5);
      //scaling options
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
      //have the game centered horizontally
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      //screen size will be set automatically
      this.scale.setScreenSize(true);

      //Create the light source
      myLamp1 = game.add.illuminated.lamp(game.canvas.width / 2 - lampSize, game.canvas.height - lampSize - (bumperSize * 2), { distance: lampSize, samples: 5, color: '#ffeee6', radius: 10 });

      //Create the ball and a shadow. The ball is set to invisible so only the shadow is seen
      ball = game.add.sprite(game.canvas.width/2, ballSize, 'ball');
      ball.scale.setTo(0.0000138*game.canvas.width, 0.0000138*game.canvas.width);
      game.physics.p2.enable(ball);
      ball.body.setCircle(ballSize);
      ball.body.fixedRotation = true;
      ball.visible = false; //Ball made invisible
      //This is the balls shadow
      ballShadow = game.add.illuminated.discObject(ball.x, ball.y, ballSize);

      //Create the bumper that the player wil control. Set its body to a circle
      bumper = game.add.sprite(game.canvas.width / 2-100, game.canvas.height -(bumperSize*2),'bumper');
      bumper.scale.setTo(0.00016*game.canvas.width, 0.00016*game.canvas.width);
      game.physics.p2.enable(bumper);
      bumper.smoothed = false;
      bumper.body.fixedRotation = true;
      bumper.body.kinematic = true;
      bumper.body.clearShapes();
      bumper.body.setCircle(bumperSize);
      bumper.body.visible

      //Call bounce function if bumper hits ball
      ball.body.onBeginContact.add(this.bounce, this);
      
      //setup lighting 
      lightObjs = [ballShadow];
      myLamp1.createLighting(lightObjs);
      
  },


  //game loop, executed many times per second
  update: function () {
      //Keep lamp centered on bumper
      myLamp1.x = bumper.x - lampSize;
      //Completely delete and recreate the ball's shadow at balls updated location
      delete ballShadow;
      ballShadow = game.add.illuminated.discObject(ball.x, ball.y, ballSize);
      lightObjs = [ballShadow];
      //Recreate lighting
      myLamp1.createLighting(lightObjs);
      //Refresh lighting
      myLamp1.refresh();
      //These statements move the bumper to the last input position. By using move the physics engine does not glitch out if placed over the ball
      if (game.input.activePointer.x > bumper.body.x) {
          bumper.body.x += (game.input.activePointer.x - bumper.body.x);
      }
      else if (game.input.activePointer.x<bumper.body.x) {
          bumper.body.x -= (bumper.x - game.input.activePointer.x);
      }
      //If ball touches bottom go to gameover
      if (ball.y > game.canvas.height - bumperSize) {
          boom.play();
          this.gameOver();

      }

      //Old method of moving bumper. More glitchy
     // bumper.body.x = game.input.activePointer.x;
      
  },
  bounce: function (body, bodyB, shapeA, shapeB, equation) {
      //Add score, refresh score, and play sounds based on what weas hit
      if (body) {
              score += 1;
              scoreLabel.setText("" + score);
              bounceNoise.play();
          }
     else wall.play();
  },

  gameOver: function () {
      //Go to gameover state
      game.state.start('over', Phaser.Plugin.StateTransition.Out.ScaleUp);
  },
};

//initiate the Phaser framework
