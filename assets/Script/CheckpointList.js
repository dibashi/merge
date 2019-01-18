
cc.Class({
    extends: cc.Component,

    properties: {

        dragon: {
            default: null,
            type: cc.Node
        },

        levels: {
            default: [],
            type: cc.Node
        },

        moveTips:{
            default:null,
            type:cc.Node
        },

        nodeCloud:{
            default:null,
            type:cc.Node
        }

    },

    onLoad: function () {


    },


    onEnable: function () {
        this.dragon.scaleX = -1;

       
        this.curCp = cc.dataMgr.getMaxCheckpoint();

        // this.curCp = 1;

        for (var i = 0; i < this.levels.length; i++) {
            if (i >= this.curCp) {
                var c = this.levels[i].children;
                for (var j = 0; j < c.length; j++) {
                    c[j].active = false;
                }
            } else {
                var c = this.levels[i].children;
                for (var j = 0; j < c.length; j++) {
                    c[j].active = true;
                }
            }

        }

        var levelNode = this.levels[this.curCp - 1].getChildByName("levelNode");
        var wpos = levelNode.parent.convertToWorldSpaceAR(levelNode.position);
        var npos = levelNode.parent.parent.convertToNodeSpaceAR(wpos);
        this.dragon.position = npos;

        this.moveToDragon();

        this.cloudEffect();
    },

    dragonFly:function(clickCP) {

        var levelNode = this.levels[clickCP - 1].getChildByName("levelNode");
        var wpos = levelNode.parent.convertToWorldSpaceAR(levelNode.position);
        var npos = levelNode.parent.parent.convertToNodeSpaceAR(wpos);
        

        var pos = npos;
        if(pos.x > this.dragon.x) {
            this.dragon.scaleX  = -1;
        } else {
            this.dragon.scaleX = 1;
        }
        var mt = cc.moveTo(1.5,pos);
        this.dragon.runAction(mt);
    },



    onDisable: function () {

    },




    //画面移动到龙的x位置
    moveToDragon:function() {
        // if(this.curCp == 1) {
        //     this.node.getChildByName("scrollview").getComponent(cc.ScrollView).scrollToTop();
        // } else if(this.curCp == 20) {
        //     this.node.getChildByName("scrollview").getComponent(cc.ScrollView).scrollToBottom();
        // } else {
            
        //     this.node.getChildByName("scrollview").getComponent(cc.ScrollView).scrollToOffset(this.dragon.position,1.0);
        // }
        var pos = cc.pAdd(this.dragon.position,cc.v2(-360,0));
        this.node.getChildByName("scrollview").getComponent(cc.ScrollView).scrollToOffset(pos,1.0);
    },

    //0 代表 不用 移动
    //1 代表 龙在左边
    //2 代表 龙在右边
    dragonWhere:function() {

        var wpos = this.dragon.parent.convertToWorldSpaceAR(this.dragon.position);
        if(wpos.x<-40) {
            return 1;
        } else if(wpos.x>760) {
            return 2;
        } else {
            return 0;
        }
   
    },

    update(dt) {
        var dir = this.dragonWhere();
        if(dir == 0) {
            this.moveTips.active = false;
        } else if(dir == 1) {
            this.moveTips.active = true;
            this.moveTips.position = cc.v2(-300,0);
            this.moveTips.scaleX = 1;
        }  else if(dir == 2) {
            this.moveTips.active = true;
            this.moveTips.position = cc.v2(300,0);
            this.moveTips.scaleX = -1;
        }
    },

    cloudEffect: function () {
        //云特效：上下自动
        for (let i = 0; i < this.nodeCloud.children.length; ++i) {
            let nodeN = this.nodeCloud.children[i];
            let randY = Math.random() * 40 + 15;

            var spawn1 = cc.spawn(cc.moveBy(2.5 + Math.random() * 2, cc.v2(0, randY)), cc.fadeTo(2.5 + Math.random() * 2, 150));
            var spawn2 = cc.spawn(cc.moveBy(1.5 + Math.random() * 2, cc.v2(0, -randY)), cc.fadeTo(1.5 + Math.random() * 2, 80));
            nodeN.runAction(cc.repeatForever(cc.sequence(spawn1, spawn2)));
        }

    },
});