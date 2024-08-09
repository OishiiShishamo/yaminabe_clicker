enchant();

var PI = 3.141592653;
var TAU = PI * 2;
var oneang = PI / 180;

var yamip = 0;
var yps = 0;
var value = [
    10,
    100,
    1000,
    10000,
    100000,
    1000000,
    10000000,
    100000000
];
var str = [
    1,
    1,
    10,
    100,
    1000,
    10000,
    100000,
    1000000
];
var buy_num = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
];

var res = [
    "./res/img/nabe/00.png",
    "./res/img/nabe/01.png",
    "./res/img/nabe/02.png",
    "./res/img/nabe/03.png",
    "./res/img/nabe/04.png",
    "./res/img/nabe/05.png",
    "./res/img/nabe/06.png",
    "./res/img/nabe/07.png",
    "./res/img/big_yaminabe.png"
];

function range(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((y1 - y2), 2) + Math.pow((x1 - x2), 2));
}

function yps_update(){
    var tmp = 0;
    for(var i = 1;i < buy_num.length;i++) {
        tmp += buy_num[i] * str[i];
    }
    return tmp;
}

window.onload = function() {
    var game = new Game(1280, 720);
    game.preload(res);
    game.fps = 60;
    game.onload = function() {
        var L_yamip = new Label();
        L_yamip.x = 0;
        L_yamip.y = 0;
        L_yamip.color = "black";
        L_yamip.text = yamip + "闇鍋ポイント";
        L_yamip.on("enterframe", function() {
            L_yamip.text = yamip + "闇鍋ポイント";
        });
        var L_yps = new Label();
        L_yps.x = 0;
        L_yps.y = 20;
        L_yps.color = "black";
        L_yps.text = yps + "yps";
        L_yps.on("enterframe", function() {
            L_yps.text = yps + "yps";
        });
        var L_text = new Array(8);
        for(var i = 0;i < L_text.length;i++) {
            L_text[i] = new Label();
            if(i == 0) {
                L_text[i].text = value[i] + "闇鍋ポイント<br>所持数:" + buy_num[i] + "<br>cpy:" + str[i];
            }
            else {
                L_text[i].text = value[i] + "闇鍋ポイント<br>所持数:" + buy_num[i] + "<br>yps:" + str[i];
            }
            L_text[i].x = 575;
            L_text[i].y = 50 + i * 75;
            game.rootScene.addChild(L_text[i]);
        }
        var S_big = new Sprite(400, 400);
        S_big.image = game.assets[res[8]];
        S_big.x = 0;
        S_big.y = 50;
        S_big.on("enterframe", function() {
            this.rotation = Math.sin(game.frame * oneang * 5) * 25;
            yps = yps_update();
            if(game.frame % game.fps == 0) {
                yamip += yps;
            }
            for(var i = 0;i < L_text.length;i++) {
                if(i == 0) {
                    L_text[i].text = value[i] + "闇鍋ポイント<br>所持数:" + buy_num[i] + "<br>cpy:" + str[i];
                }
                else {
                    L_text[i].text = value[i] + "闇鍋ポイント<br>所持数:" + buy_num[i] + "<br>yps:" + str[i];
                }
            }
        });
        var S_nabe = new Array(8);
        for(var i = 0;i < S_nabe.length;i++) {
            S_nabe[i] = new Sprite(75, 75);
            S_nabe[i].image = game.assets[res[i]];
            S_nabe[i].x = 500;
            S_nabe[i].y = 50 + i * 75;
            game.rootScene.addChild(S_nabe[i]);
        }
        game.rootScene.addEventListener("touchstart", function(e) {
            if(range(200, e.localX, 250, e.localY) <= 200) {
                yamip += buy_num[0] + 1;
            }
            for(var i = 0;i < buy_num.length;i++) {
                if(range(537.5, e.localX, 87.5 + i * 75, e.localY) <= 37.5){
                    if(yamip >= value[i]){
                        yamip -= value[i];
                        value[i] *= 1.1;
                        buy_num[i]++;
                    }
                }
            }
        });
        game.rootScene.addChild(L_yamip);
        game.rootScene.addChild(L_yps);
        game.rootScene.addChild(S_big);
    }
    game.start();
};