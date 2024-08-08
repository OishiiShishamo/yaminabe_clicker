enchant();

var PI = 3.141592653;
var TAU = PI * 2;
var oneang = PI / 180;

var yamip = 0;
var yps = 0;

var res = [
    "./res/img/big_yaminabe.png"
];

var nabe = [
    "./res/img/nabe/00_yaminabe.png"
];

window.onload = function() {
    var core = new Core(640, 480);
    core.preload(res);
    core.fps = 60;
    core.onload = function() {
        var L_yamip = new Label();
        L_yamip.x = 0;
        L_yamip.y = 0;
        L_yamip.color = "black";
        L_yamip.text = yamip;
        var S_big = new Sprite(400, 400);
        S_big.image = core.assets[res[0]];
        S_big.x = 0;
        S_big.y = 50;
        S_big.on("enterframe", function() {
            this.rotation = Math.sin(core.frame * oneang * 5) * 25;
        });
        core.rootScene.addChild(L_yamip);
        core.rootScene.addChild(S_big);
    }
    core.start();
};