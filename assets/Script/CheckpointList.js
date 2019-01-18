
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
        }

    },

    onLoad: function () {


    },


    onEnable: function () {
        this.dragon.scaleX = -1;

       
        var curCp = cc.dataMgr.getMaxCheckpoint();

        // var curCp = 5;

        for (var i = 0; i < this.levels.length; i++) {
            if (i >= curCp) {
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

        var levelNode = this.levels[curCp - 1].getChildByName("levelNode");
        var wpos = levelNode.parent.convertToWorldSpaceAR(levelNode.position);
        var npos = levelNode.parent.parent.convertToNodeSpaceAR(wpos);
        this.dragon.position = npos;
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







});