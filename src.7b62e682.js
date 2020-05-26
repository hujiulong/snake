parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"zzHi":[function(require,module,exports) {
"use strict";var t;Object.defineProperty(exports,"__esModule",{value:!0}),exports.DirectionTypes=void 0,function(t){t[t.UP=0]="UP",t[t.DOWN=1]="DOWN",t[t.LEFT=2]="LEFT",t[t.RIGHT=3]="RIGHT"}(t=exports.DirectionTypes||(exports.DirectionTypes={}));var e=function(){function e(t,e,i){this.size=t,this.segments=e,this.direction=i}return Object.defineProperty(e.prototype,"head",{get:function(){return this.segments[0]},enumerable:!1,configurable:!0}),e.prototype.turnUpward=function(){[t.UP,t.DOWN].includes(this.direction)||(this.direction=t.UP)},e.prototype.turnDownward=function(){[t.UP,t.DOWN].includes(this.direction)||(this.direction=t.DOWN)},e.prototype.turnLeft=function(){[t.LEFT,t.RIGHT].includes(this.direction)||(this.direction=t.LEFT)},e.prototype.turnRight=function(){[t.LEFT,t.RIGHT].includes(this.direction)||(this.direction=t.RIGHT)},e.prototype.update=function(e){var i=this.head,s=this.direction,n=this.segments,r=i.x,o=i.y;switch(s){case t.UP:o-=1;break;case t.DOWN:o+=1;break;case t.LEFT:r-=1;break;case t.RIGHT:r+=1}return r<0||r>=this.size||(o<0||o>=this.size||(e.x===r&&e.y===o||this.segments.pop(),!!n.some(function(t){return t.x===r&&t.y===o})||(this.segments.unshift({x:r,y:o}),this.segments.length===Math.pow(this.size,2))))},e}();exports.default=e;
},{}],"mGrQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./snake"),e=25,i=function(){function i(t,i){this._convertCoord=function(t){return[t.x*e+e/2,t.y*e+e/2]},this.container=t,this.size=i,this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.canvas.style.width=this.size*e+"px",this.canvas.style.height=this.size*e+"px",this.canvas.width=this.size*e,this.canvas.height=this.size*e,this.container.appendChild(this.canvas)}return i.prototype.drawGrid=function(){for(var t=0;t<this.size;t++)for(var i=0;i<this.size;i++){var s=(t+i)%2==0?"rgb(171, 213, 90)":"rgb(163, 207, 83)";this.context.fillStyle=s,this.context.beginPath(),this.context.rect(t*e,i*e,e,e),this.context.closePath(),this.context.fill()}},i.prototype.drawApple=function(t){var e=this._convertCoord(t),i=e[0],s=e[1];this.context.save(),this.context.shadowColor="rgba(50, 50, 50, .2)",this.context.shadowBlur=10,this.context.beginPath(),this.context.arc(i,s,8,0,2*Math.PI),this.context.fillStyle="#f5222d",this.context.fill(),this.context.restore()},i.prototype.drawSnake=function(i){var s=this,o=i.segments,n=i.head,h=i.direction,c=new Path2D;o.forEach(function(t,e){var i=s._convertCoord(t),o=i[0],n=i[1];0===e?c.moveTo(o,n):c.lineTo(o,n)}),this.context.save(),this.context.shadowColor="rgba(50, 50, 50, .2)",this.context.shadowBlur=10,this.context.lineCap="round",this.context.lineJoin="round",this.context.lineWidth=.8*e,this.context.strokeStyle="#40a9ff",this.context.stroke(c),this.context.restore();var a=this._convertCoord(n),r=a[0],x=a[1],l={x:0,y:0},d={x:0,y:0};switch(h){case t.DirectionTypes.UP:l.x=7,d.y=-2;break;case t.DirectionTypes.DOWN:l.x=7,d.y=2;break;case t.DirectionTypes.LEFT:l.y=7,d.x=-2;break;case t.DirectionTypes.RIGHT:l.y=7,d.x=2}this.context.save(),this.context.beginPath(),this.context.arc(r-l.x,x-l.y,5,0,2*Math.PI),this.context.closePath(),this.context.arc(r+l.x,x+l.y,5,0,2*Math.PI),this.context.closePath(),this.context.lineWidth=4,this.context.strokeStyle="#40a9ff",this.context.fillStyle="#fff",this.context.stroke(),this.context.fill(),this.context.beginPath(),this.context.arc(r-l.x+d.x,x-l.y+d.y,3,0,2*Math.PI),this.context.closePath(),this.context.arc(r+l.x+d.x,x+l.y+d.y,3,0,2*Math.PI),this.context.closePath(),this.context.fillStyle="#000",this.context.fill(),this.context.restore()},i.prototype.drawGameOver=function(){this.context.font="bold 48px YaHei",this.context.fillStyle="red";var t=this.context.measureText("GAME OVER");this.context.fillText("GAME OVER",(this.canvas.width-t.width)/2,(this.canvas.height-48)/2)},i}();exports.default=i;
},{"./snake":"zzHi"}],"dgAm":[function(require,module,exports) {
"use strict";var e=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r),Object.defineProperty(e,a,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),t=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(r){if(r&&r.__esModule)return r;var a={};if(null!=r)for(var n in r)Object.hasOwnProperty.call(r,n)&&e(a,r,n);return t(a,r),a},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var n=r(require("./snake")),i=a(require("./painter")),s=21,o=function(){return function(e,t){var r=this;void 0===t&&(t=s),this._apple={x:0,y:0},this._start=!1,this._placeApple=function(){var e=r.snake.segments,t=new Array(Math.pow(r.size,2)).fill(0).map(function(e,t){return{x:t%r.size,y:Math.floor(t/r.size)}}).filter(function(t){return e.every(function(e){var r=e.x,a=e.y;return t.x!==r&&t.y!==a})});if(0!==t.length){var a=Math.floor(t.length*Math.random());r._apple=t[a]}},this._update=function(){if(r.snake.update(r._apple))return clearInterval(r._timer),void r.painter.drawGameOver();r._apple.x===r.snake.head.x&&r._apple.y===r.snake.head.y&&r._placeApple(),r.painter.drawGrid(),r.painter.drawApple(r._apple),r.painter.drawSnake(r.snake)},this._handleKeydown=function(e){switch(r._start||(r._timer=setInterval(r._update,200),r._start=!0),e.key){case"ArrowUp":r.snake.turnUpward();break;case"ArrowDown":r.snake.turnDownward();break;case"ArrowLeft":r.snake.turnLeft();break;case"ArrowRight":r.snake.turnRight()}},this.size=t;var a={x:Math.floor(this.size/2),y:Math.floor(this.size/2)};this.snake=new n.default(this.size,[a,{x:a.x,y:a.y+1},{x:a.x,y:a.y+2}],n.DirectionTypes.UP),this.painter=new i.default(e,t),window.addEventListener("keydown",this._handleKeydown,!1),this._placeApple(),this._update()}}();exports.default=o;
},{"./snake":"zzHi","./painter":"mGrQ"}],"B6dB":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./game")),r=document.getElementById("root");new t.default(r);
},{"./game":"dgAm"}]},{},["B6dB"], null)
//# sourceMappingURL=/snake/src.7b62e682.js.map