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
var gameLayers_1 = require("../gameLayers");
var player_1 = require("../objects/player");
var gameParameters_1 = require("../gameParameters");
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Game.prototype.init = function () {
        this.player = new player_1.Player(this, { tx: 10, ty: 10 });
    };
    Game.prototype.preload = function () {
        this.load.spritesheet('map_1', '../assets/extruded/map_1.png', { frameWidth: gameParameters_1.SpriteFrame.w + 2, frameHeight: gameParameters_1.SpriteFrame.h + 2 });
        this.player.preload();
    };
    Game.prototype.create = function () {
        for (var row in gameLayers_1.groundLayer) {
            for (var col in gameLayers_1.groundLayer[row]) {
                this.add.sprite(parseInt(col) * gameParameters_1.SpriteFrame.w, parseInt(row) * gameParameters_1.SpriteFrame.h, 'map_1', gameLayers_1.groundLayer[row][col])
                    .setOrigin(0, 0);
            }
        }
        this.player.create();
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player.gameObject());
    };
    Game.prototype.update = function () {
        this.player.update();
    };
    return Game;
}(Phaser.Scene));
exports.Game = Game;
//# sourceMappingURL=game.js.map