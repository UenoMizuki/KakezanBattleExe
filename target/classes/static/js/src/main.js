"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Phaser = __importStar(require("phaser"));
var preload_1 = require("./scenes/preload");
var game_1 = require("./scenes/game");
var gameParameters_1 = require("./gameParameters");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = this;
        var config = {
            type: Phaser.WEBGL,
            width: gameParameters_1.GameFrame.w,
            height: gameParameters_1.GameFrame.h
        };
        _this = _super.call(this, config) || this;
        _this.scene.add("preload", preload_1.Preload, false);
        _this.scene.add("game", game_1.Game, false);
        _this.scene.start("preload");
        return _this;
    }
    return Main;
}(Phaser.Game));
window.onload = function () {
    var GameApp = new Main();
};
//# sourceMappingURL=main.js.map