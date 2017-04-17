var canvas = document.getElementById("example");
var context = canvas.getContext("2d");

//var ship = new Array(190, 710, 190, 780, 200, 770, 200, 755, 210, 750, 210, 780, 220, 780, 220, 785, 230, 785, 230, 780, 240, 780, 240, 750, 250, 755, 250, 770, 260, 780, 260, 710, 
//250, 710, 250, 740, 240, 730, 230, 710, 230, 690, 220, 690, 220, 710, 210, 730, 200, 740, 200, 710, 190, 710);
var ship_x = new Array(190, 190, 200, 200, 210, 210, 220, 220, 230, 230, 240, 240, 250, 250, 260, 260, 250, 250, 240, 230, 230, 220, 220, 210, 200, 200, 190);

var ship_y = new Array(710, 780, 770, 755, 750, 780, 780, 785, 785, 780, 780, 750, 755, 770, 780, 710, 710, 740, 730, 710, 690, 690, 710, 730, 740, 710, 710);

var monster = new Array(190, 100, 205, 80, 220, 80, 235, 100, 230, 105, 195, 105, 190, 100);

function ship() {
		this.dx = 190;
    	this.dy = 0;
    	this.health = 100;
    	this.draw = function(x, y, c, cc) {
    		var i = 0;
			var l = ship_x.length;
			context.clearRect(0,0,window.innerWidth,window.innerHeight);
			context.fillStyle = c;
			context.strokeStyle = cc;
			context.beginPath();
			context.moveTo(x[i], y[i]);
			i = 2;
			while (i < l) {
				context.lineTo(x[i] , y[i]);
				i = i + 1;
			}
			context.closePath();
			context.fill();
			context.stroke();
    	}
}

k = new ship();
k.draw(ship_x, ship_y, "#21375F", "#FFB200");

u = ship_x.length;

onkeypress = function() {
		if(event.keyCode == 100) {//right
			if(k.dx < 500) {
				k.dx += 35;
				for (var t = 0; t < u; ++t) {
					ship_x[t] += 35;
				}
				k.draw(ship_x, ship_y, "#21375F", "#FFB200");
			}
		}
		if(event.keyCode == 97) {//left
			if(k.dx > 35) {
				k.dx-=35;
				for (t = 0; t < u; ++t) {
					ship_x[t] -= 35;
				}
				k.draw(ship_x, ship_y, "#21375F", "#FFB200");
			}
		}
		k.draw(ship_x, ship_y, "#21375F", "#FFB200");
}

setInterval(function() {
}, 50);

/*function Clear(dx, dy) {
  context.clearRect(0,0,window.innerWidth,window.innerHeight);
}*/