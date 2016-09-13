/*This simple state loads the images and assets used in the acrual gameplay*/
var LoadState = {
    preload: function () { 
        game.stage.backgroundColor = "#000000" //Set background color
        var loadingLabel = game.add.text(game.canvas.width / 2, game.canvas.height / 2, 'loading. . .', { font: "" + (30 * game.canvas.width / 360) + 'px Courier', fill: '#ffffff' }); //Text
        loadingLabel.anchor.setTo(0.5, 0.5);
        // Load ball asset
        game.load.image('ball', 'assets/images/ball.png');
    },

    create: function () { 
        game.state.start('play'); //Go to play state
    }
}