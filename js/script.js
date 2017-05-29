var canvas = document.getElementById("example");
var context = canvas.getContext("2d");

//var ship = new Array(190, 710, 190, 780, 200, 770, 200, 755, 210, 750, 210, 780, 220, 780, 220, 785, 230, 785, 230, 780, 240, 780, 240, 750, 250, 755, 250, 770, 260, 780, 260, 710, 
//250, 710, 250, 740, 240, 730, 230, 710, 230, 690, 220, 690, 220, 710, 210, 730, 200, 740, 200, 710, 190, 710);
var ship_x = new Array(190, 190, 200, 200, 210, 210, 220, 220, 230, 230, 240, 240, 250, 250, 260, 260, 250, 250, 240, 230, 230, 220, 220, 210, 200, 200, 190);

var ship_y = new Array(710, 780, 770, 755, 750, 780, 780, 785, 785, 780, 780, 750, 755, 770, 780, 710, 710, 740, 730, 710, 690, 690, 710, 730, 740, 710, 710);

//var monster = new Array(190, 100, 205, 80, 220, 80, 235, 100, 230, 105, 195, 105, 190, 100);

//var bullet = new Array(225, 686, 225, 660);

function ship() {
    this.dx = 190;
    this.dy = 0;
    this.health = 100;

    if(typeof this.draw != "function") {
    	ship.prototype.draw = function(x, y, c, cc) {
    		var i = 0;
			var l = ship_x.length;
			context.clearRect(0,689, window.innerWidth,window.innerHeight - 689);
			context.fillStyle = c;
			context.strokeStyle = cc;
			context.lineWidth = 2;
			context.beginPath();
			context.moveTo(x[i], y[i]);
			i = 1;
			while (i < l) {
				context.lineTo(x[i] , y[i]);
				i = i + 1;
			}
			context.closePath();
			context.fill();
			context.stroke();
    	}
    }
}

function bullets() {
	this.bullet = new Array(225, 686, 225, 660);
	
	if(typeof this.draw != "function") {
		bullets.prototype.draw = function(po, c, cc){
			var i = 0;
			var l = po.length;
			context.fillStyle = c;
			context.strokeStyle = cc;
			context.lineWidth = 3;
			context.beginPath();
			context.moveTo(po[i], po[i + 1]);
			i = 2;
			while (i < l) {
				context.lineTo(po[i] , po[i + 1]);
				i = i + 2;
			}
			context.closePath();
			context.fill();
			context.stroke();
		}
	}

	if(typeof this.move_bullet != "function") {
		bullets.prototype.move_bullet = function(p){
			context.clearRect(p[2] - 2, p[3], 5, 27);
			p[1] -= 10;
			p[3] -= 10;
			this.draw(p, "#B80F0F", "#B80F0F")
		}
	}
}

function monsters() {
	this.health = 100;
	this.monster = new Array(190, 100, 205, 80, 220, 80, 235, 100, 230, 105, 195, 105, 190, 100);
	this.l = this.monster.length;
	this.x = 1; 
	this.y = 1;
	
	if(typeof this.draw != "function") {
		monsters.prototype.draw = function(po, c, cc){
			var i = 0;
			context.fillStyle = c;
			context.strokeStyle = cc;
			context.lineWidth = 3;
			context.beginPath();
			context.moveTo(po[i], po[i + 1]);
			i = 2;
			while (i < this.l) {
				context.lineTo(po[i] , po[i + 1]);
				i = i + 2;
			}
			context.closePath();
			context.fill();
			context.stroke();
		}
	}

	if(typeof this.move_monster != "function") { 
		monsters.prototype.move_monster = function (p) {
			context.clearRect(p[0], p[1] - 20, 45, 25);
			if (p[0] < 0 || p[6] > 600) {
				this.x *= -1;
			}

			if (p[3] < 0 || p[9] > 800) {
				this.y *= -1;
			}

			for (var j = 0; j < this.l; j++) {
				p[j] += 10 * this.x;
				p[j + 1] += 10 * this.y;
			}

			this.draw(p, "#00036B", "#960EB9");
		}
	}

	if(typeof this.kill_monster != "function") {
		monsters.prototype.kill_monster = function (p) {
			context.clearRect(p[0], p[1] - 20, 45, 25);
		}
	}
}

var k = new ship();
var b = new Array ();
var m = new Array ();
k.draw(ship_x, ship_y, "#21375F", "#FFB200");

var b_l, b_2;
var m_1, m_2;
u = ship_x.length;

onkeypress = function() {
	if(event.keyCode == 100 || event.keyCode == 1074) {//right
		if(k.dx < 500) {
			k.dx += 10;
			for (var t = 0; t < u; ++t) {
				ship_x[t] += 10;
			}
			k.draw(ship_x, ship_y, "#21375F", "#FFB200");
		}
	}
	if(event.keyCode == 97 || event.keyCode == 1092) {//left
		if(k.dx > 35) {
			k.dx -= 10;
			for (t = 0; t < u; ++t) {
				ship_x[t] -= 10;
			}
			k.draw(ship_x, ship_y, "#21375F", "#FFB200");
		}
	}

	if (event.keyCode == 32) {
		b.unshift(new bullets());
		b[0].bullet[0] = ship_x[6] + 5;
		b[0].bullet[2] = ship_x[6] + 5;
	}
}

/*function creat_monsters()
{
	var i = m.length;
	//if (i < 5) {
		while (i != 5) {
			m.unshift(new monsters());
			i++;
		}
	//}
}*/

/*setTimeout(function () {
	m.push(new monsters());
	m[0].draw(m[0].monster, "#00036B", "#960EB9");
}, 2000);*/

setInterval(function() {
	b_l = b.length - 1;
	while (b_l != -1) {
		if (b[b_l].bullet[3] < 800){
			b[b_l].move_bullet(b[b_l].bullet);
		} else {
			 b.splice(b_l, 1);
		}
		b_l--;
	}
}, 50);

/*setInterval(function () {
	b_2 = b.length;
	m_2 = m.length;
	var y_b, y_m;
	while (b_2 != -1) {
		y_b = b[b_2].bullet[3];
		while (m_2 != -1) {
			y_m = m[m_2].monster[9];
			if (y_m == y_b) {
				m[m_2].kill_monster(m[m_2].monster);
				m.splice(m_2, 1)
			}
			m_2--;
		}
		b_2--;
	}
}, 50);*/

/*setInterval(function () {
	//creat_monsters();
	m_1 = m.length;
	while (m_1 != -1){
		m[m_1].move_monster(m[m_1].monster);
		m_1--;
	}
}, 100);*/

/*function Clear(dx, dy) {
  context.clearRect(0,0,window.innerWidth,window.innerHeight);
}*/