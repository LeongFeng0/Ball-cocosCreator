// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       game:{
           default: null,
           serializable: false
       },
       speed:0
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.isFristTouch = true;
     },

    start () {

    },
     onBeginContact: function (contact, selfCollider, otherCollider) {
        cc.log('addScore')
        //碰撞接触时调用game addscore 方法加分
       
        if(contact.colliderA!=null && contact.colliderB!=null){
            if (this.isFristTouch == true) {
                this.game.addScore();
                console.log(contact)
                this.isFristTouch = false;
            }
            
        }
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
        //cc.log('end')
    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, otherCollider) {
       // cc.log('pre')
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
       // cc.log('post')
    },

     update (dt) {
        this.node.y+=this.speed;
        if(this.node.y > this.game.node.height/2){
            this.node.destroy();
        }
    
     },
});
