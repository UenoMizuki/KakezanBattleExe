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
var preload_1 = require("./src/scenes/preload");
var game_1 = require("./src/scenes/game");
// Phaser3のゲームクラスの記述（Phaser.Gameクラスを継承したMainクラスの記述）
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = this;
        // Phaser.Gameのコンフィグ
        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
        };
        _this = _super.call(this, config) || this; // Phaser.Gameクラスにコンフィグを渡す
        // シーンにキーを割り振って登録
        _this.scene.add("preload", preload_1.Preload, false);
        _this.scene.add("game", game_1.Game, false);
        // シーンをスタート
        _this.scene.start("preload");
        return _this;
    }
    return Main;
}(Phaser.Game));
// ブラウザでDOM描写終了直後に呼び出される
window.onload = function () {
    // Mainクラスのインスタンスを生成（ここで初めてゲームが生成）
    var GameApp = new Main();
};
//# sourceMappingURL=index.js.map