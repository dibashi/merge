

cc.Class({
    extends: cc.Component,

    // properties: {
    //     canvas: cc.Node,
    //     target: cc.Node
    // },

    start: function () {
        var self = this, parent = this.node.parent;
        var c = cc.find("Canvas").getComponent('Game').camera.getComponent(cc.Camera);
        
        
        // self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            
        //     var touches = event.getTouches();
        //     console.log("gamelayer touch start");
        //     console.log(touches.length);
        //     if(touches.length>1) {
        //         this.isMutiPoint = true;
        //     } else {
        //         this.isMutiPoint = false;
        //     }

        // }, self.node);
        self.isStopDispatche = false;
        self.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            if(self.isStopDispatche) {
                event.stopPropagation();
            }
            if (touches.length >= 2) {
                self.isStopDispatche = true;
              
                console.log("hoho处理多点逻辑");
                var touch1 = touches[0], touch2 = touches[1];
                var delta1 = touch1.getDelta(), delta2 = touch2.getDelta();

                var touchPoint1 = parent.convertToNodeSpaceAR(touch1.getLocation());
                var touchPoint2 = parent.convertToNodeSpaceAR(touch2.getLocation());
                //缩放
                var distance = cc.pSub(touchPoint1, touchPoint2);
                var delta = cc.pSub(delta1, delta2);
                var scale = 1;
                if (Math.abs(distance.x) > Math.abs(distance.y)) {
                    scale = (distance.x + delta.x) / distance.x * c.zoomRatio;
                }
                else {
                    scale = (distance.y + delta.y) / distance.y * c.zoomRatio;
                }
                //self.target.scale = scale < 0.1 ? 0.1 : scale;
                c.zoomRatio = cc.clampf(scale, 0.3, 1.0);

            }
        }, self.node);

        self.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            console.log("hoho end!!!");
            self.isStopDispatche = false;
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            
            console.log("hoho cancel!!!");
            self.isStopDispatche = false;
        }, self.node);
    }
});



