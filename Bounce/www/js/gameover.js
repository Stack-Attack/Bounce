/*This state is called when the user loses. It shows the users score and asks if they would like to play again*/
var OverState = {

    preload: function () {
        buttonSize = 0.138 * game.canvas.width; //
        scale = game.canvas.width / 360;
    },
    create: function () {
        //Set background colour
        game.stage.backgroundColor = "#000000"

        //Display score
        var scoreLabel = game.add.text(game.canvas.width / 2 - 10, 40 * game.canvas.width / 180, "Score:" + score, { font: "" + (40 * game.canvas.width / 360) + 'px Courier', fill: '#ffffff' });
        scoreLabel.anchor.setTo(0.5, 0.5);

        //make button
        button = game.add.button(game.canvas.width / 2 - (buttonSize), game.canvas.height - (buttonSize * 4), 'bumper', this.start, this);
        button.scale.setTo(0.00016 * game.canvas.width, 0.00016 * game.canvas.width);

        //Add again text
        var playLabel = game.add.text(button.x + buttonSize, button.y + buttonSize, "Again", { font: "" + (20 * game.canvas.width / 360) + 'px Courier', fill: '#ffffff' });
        playLabel.anchor.setTo(0.5, 0.5);
    },

    update: function () {
        //Refresh lighting
        //  myLamp1.refresh();
        // myLamp2.refresh();
        myLamp3.refresh();
        myLamp4.refresh();
    },
    start: function () {
        //Go to load state again
        game.state.start('load');
    }
}