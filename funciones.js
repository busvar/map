// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

//posició

function Pos(x, y) {
	this.x = x;
	this.y = y;
}
Pos.prototype.getIndex = function() {
	return "(" + this.x + " , "+this.y+")";
}
Pos.prototype.toString = function() {
	return this.getIndex(x, y);
}
Pos.prototype.clone = function() {
	return new Pos(this.x, this.y);
}


//cámara

function Camara(x, y) {
	this.pos = new Pos(x||0, y||0);
	this.actualPos = this.pos.clone(); 
}

Camara.prototype = {
	logic : function(dt) {
		this.pos.x += (this.actualPos.x - this.pos.x)/(dt);
		this.pos.y += (this.actualPos.y - this.pos.y)/(dt);
	},
	focus : function(ctx) {
		ctx.translate(-(this.pos.x-canvas.width/2),
		 -(this.pos.y-canvas.height/2));
	}
}

//Cell

var CELL_EDGE = 50;

function Cell () {
	this.color = this.cellColors[Math.floor 
	(Math.random()*this.cellColors.length)];
	this.genBuffer();
}
Cell.prototype = {
	playerId : undefined,
	cellColors : ["#524323", "#F04323", "#1DC200"],
	color : undefined
}
Cell.prototype.genBuffer = function (ctx) {
	var buffer = document.createElement('canvas');
	buffer.width = CELL_EDGE;
	buffer.height = CELL_EDGE;
	var bufferCtx = buffer.getContext('2d');
	bufferCtx.fillStyle = this.color;
	bufferCtx.fillRect(0,0,CELL_EDGE,CELL_EDGE);

	this.buff = buffer;

}

// mapa

function Map() {
	this.cells = {};
}

Map.prototype.getCellAtPos = function(pos) {
	var index = pos.getIndex();
	var cell = this.cells[index];
	if(cell === undefined) {
		cell = new Cell();
		this.cells[index] = cell; 
	}
	return cell;
}