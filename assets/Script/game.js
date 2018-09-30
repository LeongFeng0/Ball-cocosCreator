cc.Class({
    extends: cc.Component,

    properties: {
        ball: {
            default: null,
            type: cc.Node
        },
    	ground: {
    		default:null,
    		type: cc.Prefab
        },
        spawnDuration: 0,
        scoreString: {
            default: null,
            type: cc.Label
        },
        gameOverNode: {
            default: null,
            type: cc.Node
        },
        theOrginGround: {
            default: null,
            type: cc.Node
        },
        theOrginGround2:{
            default:null,
            type: cc.Node
        },
        playBtn: {
            default: null,
            type: cc.Node
        },
        playAgainBtn: {
            default: null,
            type: cc.Node
        },
        gameOverScore: {
            default: null,
            type: cc.Node
        }
    },
    //加分
    addScore: function () {
        this.score+=1;
        this.scoreString.getComponent(cc.Label).string ='score:'+ this.score;
    },
    // use this for initialization
    onLoad: function () {
        this.isRunning = false;
    },
    playAgain:function(){
        cc.director.loadScene("game");
    },
    startGame: function(){
        //初始化ball对象
        this.ball.getComponent('ball').game = this;
        this.theOrginGround2.active = false;
        this.playAgainBtn.active  = false;
        this.gameOverScore.active = false;
        this.playBtn.active = false;
        //初始化分数
        this.score = 0;
        this.currentGroundWidth = 0;
        
        this.isRunning = true;
        var that = this;
        //创建ground 频率
        this.schedule(function() {
            that.spawnNewGround();
        }, this.spawnDuration);
    },
    spawnNewGround: function (){
        var newGround = cc.instantiate(this.ground);
        this.node.addChild(newGround);
        this.currentGroundWidth = newGround.width;
        newGround.getComponent('ground').game = this;
        newGround.setPosition(this.getNewStarPosition());

    },
    getNewStarPosition: function () {
        var randX = 0;
        var randY = -this.node.height/2;
        var maxX = this.node.width/2;
        randX = cc.randomMinus1To1() * maxX;
        return cc.p(randX, randY);
    },
    // called every frame
    update: function (dt) {
        if (!this.isRunning) return;
        if (this.ball.y < -this.node.height/2) {
            this.gameOver();
            return;
        }
        this.theOrginGround.y +=5;
        if (this.theOrginGround.y > this.node.height/2) {
            this.theOrginGround.y = this.node.height/2+100;
        }
    },
    gameOver: function () {
        cc.log('gameOver')
        this.ball.enabled = false;
        this.isRunning = false;
        this.gameOverScore.active = true;
        this.gameOverScore.getComponent(cc.Label).string = '本局得分:'+this.score;
        this.gameOverNode.active = true;
        this.playAgainBtn.active = true;
        //取消计时器
        this.unscheduleAllCallbacks();
     }
});
