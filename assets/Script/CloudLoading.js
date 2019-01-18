
cc.Class({
    extends: cc.Component,

    properties: {


      

       
    },

    onLoad: function () {

        //cc.dataMgr.
        this.game = cc.find("Canvas").getComponent('Game');
        this.ui =  cc.find("Canvas/uiLayer").getComponent('UI');
    },

   
    
    clearCPAndLoadGame:function() {
        // console.log("顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶");
    
        this.game.clearGame();
        this.game.loadGame(null);
    },

    clearGameAndLoadHall:function() {
        // console.log("顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶");
    
        this.game.clearGame();
        this.game.loadGame(this.ui.curCheckpoint);
    },


   
});