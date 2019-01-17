import UIMgr from 'UIMgr';
import Tools from 'Tools';
const {
    ccclass,
    property
} = cc._decorator;

@ccclass
export default class Notification extends cc.Component {
    onLoad(){
        //console.log("onLoad")
        // 全局通知
        window.Notification = {
            _eventMap: [],

            on: function(type, callback, target) {
                if (this._eventMap[type] === undefined) {
                    this._eventMap[type] = [];
                }
                this._eventMap[type].push({ callback: callback, target: target });
            },

            emit: function(type, parameter) {
                var array = this._eventMap[type];
                if (array === undefined) return;
                
                for (var i = 0; i < array.length; i++) {
                    var element = array[i];
                    if (element) element.callback.call(element.target, parameter);
                }
            },

            off: function(type, callback) {
                var array = this._eventMap[type];
                if (array === undefined) return;

                for (var i = 0; i < array.length; i++) {
                    var element = array[i];
                    if (element && element.callback === callback) {
                        array[i] = undefined;
                        break;
                    }
                }
            },


            //李浩添加：用于取消某个对象身上的某个事件派发
            off_target: function(type, target) {
                var array = this._eventMap[type];
                if (array === undefined) return;

                for (var i = 0; i < array.length; i++) {
                    var element = array[i];
                    if (element && element.target === target) {
                        array[i] = undefined;
                        break;
                    }
                }
            },

            offType: function(type) {
                this._eventMap[type] = undefined;
            },
        };
	}

    update(){}
}