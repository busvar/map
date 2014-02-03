// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
//stats

function Stats(){var l=Date.now(),m=l,g=0,n=Infinity,o=0,h=0,p=Infinity,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:11,domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};


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