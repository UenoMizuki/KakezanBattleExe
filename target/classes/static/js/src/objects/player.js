"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("phaser");
var gameParameters_1 = require("../gameParameters");
var gameUtils_1 = require("../gameUtils");
var gameLayers_1 = require("../gameLayers");
var Player = /** @class */ (function () {
    function Player(scene, tilePos) {
        this.walkSpeed = 32;
        this.anims = [
            { key: 'walk_front', frameStart: 0, frameEnd: 2, spriteKey: 'player' },
            { key: 'walk_back', frameStart: 9, frameEnd: 11, spriteKey: 'player' },
            { key: 'walk_left', frameStart: 3, frameEnd: 5, spriteKey: 'player' },
            { key: 'walk_right', frameStart: 6, frameEnd: 8, spriteKey: 'player' },
        ];
        this.scene = scene;
        this.pos = gameUtils_1.getTileToPos(tilePos);
        this.tilePos = tilePos;
        this.moveKey = gameUtils_1.getMoveKeyboard(this.scene, 's', 'w', 'a', 'd');
        this.moveState = { x: 0, y: 0 };
        this.animState = '';
        this.isMoving = false;
    }
    Player.prototype.preload = function () {
        this.scene.load.spritesheet('player', '../assets/sprites/hero.png', { frameWidth: gameParameters_1.SpriteFrame.w, frameHeight: gameParameters_1.SpriteFrame.h });
    };
    Player.prototype.create = function () {
        this.player = gameUtils_1.addSprite(this.scene, this.pos, 'player', 0);
        this.player.setOrigin(0);
        for (var _i = 0, _a = this.anims; _i < _a.length; _i++) {
            var a = _a[_i];
            if (this.scene.anims.create(this.animConfig(a)) === false)
                continue;
            this.player.anims.load(a.key);
        }
    };
    Player.prototype.update = function () {
        var _this = this;
        if (this.isMoving)
            return;
        this.isMoving = true;
        var animState = '';
        var movedTilePos = { tx: 0, ty: 0 };
        this.moveState.x = 0;
        this.moveState.y = 0;
        if (this.moveKey.front.isDown) {
            this.moveState.y = 1;
            animState = 'walk_front';
        }
        else if (this.moveKey.back.isDown) {
            this.moveState.y = -1;
            animState = 'walk_back';
        }
        else if (this.moveKey.left.isDown) {
            this.moveState.x = -1;
            animState = 'walk_left';
        }
        else if (this.moveKey.right.isDown) {
            this.moveState.x = 1;
            animState = 'walk_right';
        }
        else {
            this.isMoving = false;
            this.moveState.x = 0;
            this.moveState.y = 0;
            if (this.animState == 'walk_front')
                this.player.setFrame(1);
            else if (this.animState == 'walk_back')
                this.player.setFrame(10);
            else if (this.animState == 'walk_left')
                this.player.setFrame(4);
            else if (this.animState == 'walk_right')
                this.player.setFrame(7);
            animState = '';
        }
        if (this.animState != animState) {
            if (animState == '')
                this.player.anims.stop();
            else
                this.player.anims.play(animState);
            this.animState = animState;
        }
        movedTilePos = gameUtils_1.increaseTilePos(this.tilePos, this.moveState.x, this.moveState.y);
        if (movedTilePos.tx < 0 || movedTilePos.ty < 0) {
            this.isMoving = false;
            return;
        }
        if (gameLayers_1.collideLayer[movedTilePos.ty][movedTilePos.tx] == 1 || gameLayers_1.collideLayer[movedTilePos.ty][movedTilePos.tx] == undefined) {
            this.isMoving = false;
            return;
        }
        this.tilePos = movedTilePos;
        if (animState != '')
            gameUtils_1.addGridWalkTween(this.scene, this.player, this.walkSpeed, this.moveState, function () { _this.isMoving = false; console.log('hoge'); });
    };
    Player.prototype.animConfig = function (config) {
        return {
            key: config.key,
            frames: this.scene.anims.generateFrameNumbers(config.spriteKey, {
                start: config.frameStart,
                end: config.frameEnd
            }),
            frameRate: 8,
            repeat: -1
        };
    };
    Player.prototype.gameObject = function () {
        return this.player;
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map