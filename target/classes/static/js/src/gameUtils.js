"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameParameters_1 = require("./gameParameters");
function getTileToPos(tilePos) {
    return { x: tilePos.tx * gameParameters_1.SpriteFrame.w, y: tilePos.ty * gameParameters_1.SpriteFrame.h };
}
exports.getTileToPos = getTileToPos;
function increaseTilePos(tilePos, itx, ity) {
    return { tx: tilePos.tx + itx, ty: tilePos.ty + ity };
}
exports.increaseTilePos = increaseTilePos;
function addSprite(scene, pos, texture, frame) {
    return scene.add.sprite(pos.x, pos.y, texture, frame);
}
exports.addSprite = addSprite;
function getMoveKeyboard(scene, front, back, left, right) {
    return {
        front: scene.input.keyboard.addKey(front[0]),
        back: scene.input.keyboard.addKey(back[0]),
        left: scene.input.keyboard.addKey(left[0]),
        right: scene.input.keyboard.addKey(right[0]),
    };
}
exports.getMoveKeyboard = getMoveKeyboard;
function addGridWalkTween(scene, target, moveDistance, moveState, onComplete) {
    if (target.x === false)
        return;
    if (target.y === false)
        return;
    var tween = scene.add.tween({
        targets: [target],
        x: {
            getStart: function () { return target.x; },
            getEnd: function () { return target.x + (moveDistance * moveState.x); }
        },
        y: {
            getStart: function () { return target.y; },
            getEnd: function () { return target.y + (moveDistance * moveState.y); }
        },
        duration: 200,
        onComplete: function () {
            tween.stop();
            onComplete();
        }
    });
}
exports.addGridWalkTween = addGridWalkTween;
//# sourceMappingURL=gameUtils.js.map