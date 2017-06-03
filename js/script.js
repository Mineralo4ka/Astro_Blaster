var canvas = document.getElementById("example");
var context = canvas.getContext("2d");

var ship_x = new Array(190, 190, 200, 200, 210, 210, 220, 220, 230, 230, 240, 240, 250, 250, 260, 260, 250, 250, 240, 230, 230, 220, 220, 210, 200, 200, 190);

var ship_y = new Array(710, 780, 770, 755, 750, 780, 780, 785, 785, 780, 780, 750, 755, 770, 780, 710, 710, 740, 730, 710, 690, 690, 710, 730, 740, 710, 710);

var status = "menu", status_fire = "fire", counter = 0, score = 0, fail = 0, overload = 0, time = 0;

var k = new ship();

window.onload = function() {
    menu();
    canvas.onmousedown = canvasClick;
    if (status == "play") {
    	k.draw(ship_x, ship_y, "#21375F", "#FF0B20");
    }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function ship() {
    this.dx = 190;
    this.dy = 0;
    this.health = 100;

    if(typeof this.draw != "function") {
    	ship.prototype.draw = function(x, y, c, cc) {
    		var i = 0;
			var l = ship_x.length;
			context.clearRect(0,689, 600, 111);
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
	this.l = this.bullet.length;

	if(typeof this.draw != "function") {
		bullets.prototype.draw = function(po, c, cc){
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

	if(typeof this.move_bullet != "function") {
		bullets.prototype.move_bullet = function(p){
			context.clearRect(p[2] - 2, p[3], 5, 27);
			p[1] -= 10;
			p[3] -= 10;
			this.draw(p, "#B80F0F", "#B80F0F");
		}
	}

	if(typeof this.clear_bullet != "function") {
		bullets.prototype.clear_bullet = function (p){
			context.clearRect(p[2] - 2, p[3], 5, 28);
		}
	}
}

function monsters() {
	this.monster = new Array(190, 100, 205, 80, 220, 80, 235, 100, 230, 105, 195, 105, 190, 100);
	this.l = this.monster.length;
	this.x = getRandomInt(-3, 4); 
	this.y = getRandomInt(-3, 4);
	
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
			var j = 0;
			context.clearRect(p[0] - 2, p[3] - 2, 49, 29);
			if (p[0] < 0 || p[6] > 600) {
				this.x *= -1;
			}

			if (p[3] < 70 || p[9] > 680) {
				this.y *= -1;
			}

			if (p[9] > 680) {
				fail++;
			}
			
			while (j < this.l) {
				p[j] += (1 * this.x);
				p[j + 1] += (1 * this.y);
				j += 2;
			}

			this.draw(p, "#00036B", "#960EB9");
		}
	}

	if(typeof this.kill_monster != "function") {
		monsters.prototype.kill_monster = function (p) {
			context.clearRect(p[0] - 2, p[3] - 2, 49, 29);
		}
	}
}

function menu() {
    context.beginPath();
    context.fillStyle = "blue";
    context.rect(100, 400,400,100);
    context.fill();
    context.beginPath();
    context.fillStyle = "white";
    context.font = "70px Calibri";
    context.fillText("Play", 250,  470);
    context.fill();
}

function clear_menu() {
	context.clearRect(100, 300, 400, 300);
}

var b = new Array ();
var m = new Array ();

var b_1, b_2;
var m_1, m_2;
u = ship_x.length;

onkeypress = function() {
	if (status == "play") {
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
		
		if (status_fire == "fire") {
			if (event.keyCode == 32) {
				b.unshift(new bullets());
				b[0].bullet[0] = ship_x[6] + 5;
				b[0].bullet[2] = ship_x[6] + 5;
				if (overload < 50) {
					++overload;
				}

				if (overload == 50) {
					status_fire = "no_fire";
				}
			}
		}
	}
}

function canvasClick(event) {
	var clickX = event.pageX - canvas.offsetLeft;
    var clickY = event.pageY - canvas.offsetTop;

    if (clickX >= 100 && clickX <= 500) {
    	if (clickY >= 400 && clickY <= 500) {
    		status = "play";
    		clear_menu();
    	}
    }
}

function bar() {

	context.strokeStyle = "#FF0B20";
	context.lineWidth = 3;
	context.beginPath();
	context.rect(9, 830, 572, 30);
	context.stroke();
	context.closePath();
}

function in_bar_move() {
	context.clearRect(11, 830, 570, 30);
	context.fillStyle = "#00FF00";
	context.beginPath();
	context.rect(10, 832, overload * (570 / 50), 26);
	context.closePath();
	context.fill();
}

setInterval(function() {
	if (status == "play") {
		time++;
	}
},1000);

setInterval(function() {
	if (status == "play") {
	    context.clearRect(0, 0, 200, 40);
	    context.beginPath();
    	    context.fillStyle = "white";
    	    context.font = "40px Calibri";
	    context.fillText("Score - " + score, 10, 29);
	    context.fill();

	    context.clearRect(250, 0, 200, 40);
	    context.beginPath();
    	    context.fillStyle = "red";
    	    context.font = "40px Calibri";
	    context.fillText("Fail - " + fail, 250, 29);
	    context.fill();

	    context.clearRect(440, 0, 200, 40);
	    context.beginPath();
    	    context.fillStyle = "white";
    	    context.font = "40px Calibri";
	    context.fillText("Time: " + time, 440, 29);
	    context.fill();
	}
},50);


setInterval(function() {
	if (status == "play") {
		if (overload != 0 && status_fire == "fire") {
			overload--;
		}
	}
},500);

setInterval(function() {
	if (status == "play") {
		bar();
		in_bar_move();
	}
}, 50);

setInterval(function () {
	if (status_fire == "no_fire") {
		overload--;
	}

	if (overload == 0) {
		status_fire = "fire";
	}
},2000);

setInterval(function () {
	if (status == "play") {
		if (m.length < 10) {
			m.push(new monsters());
		}
	}
}, 2000);

setInterval(function () {
	if (status == "play") {
		var i = 0;
		m_1 = m.length - 1;
			while (i <= m_1) {
				m[i].move_monster(m[i].monster);
				i++;
			}
		i = 0;
	}
},50);

setInterval(function() {
	if (status == "play") {
		b_1 = b.length - 1;
		while (b_1 != -1) {
			if (b[b_1].bullet[3] > 30){
				b[b_1].move_bullet(b[b_1].bullet);
			}
			if (b[b_1].bullet[3] == 30) {
				context.clearRect(0, 29, 600, 30);
			}
			b_1--;
		}
		b_1 = 0;
	}
}, 50);

setInterval(function () {
	if (status == "play") {
		b_2 = b.length - 1;
		m_2 = m.length - 1;

		while (b_2 != -1) {
			while (m_2 != -1) {
				if ((b[b_2].bullet[3] >= m[m_2].monster[9] && b[b_2].bullet[3] <= m[m_2].monster[9] + 27) || (b[b_2].bullet[1] >= m[m_2].monster[9] && b[b_2].bullet[1] <= m[m_2].monster[9] + 27)) {
					if (b[b_2].bullet[0] >= m[m_2].monster[0] && b[b_2].bullet[0] <= m[m_2].monster[6]) {
						m[m_2].kill_monster(m[m_2].monster);
						b[b_2].clear_bullet(b[b_2].bullet);
						m.splice(m_2, 1);
						b.splice(b_2, 1);
						score++;
					}
				}
				m_2--;
			}
			m_2 = m.length - 1;
			b_2--;
		}
	}
}, 50);

setInterval(function () { 
	if (status == "win") {
		status = "lose";
	} else if(fail >= 1){
      status = "lose";
      fail = 0;
      m = [];
      b = [];
      time = 0;
    }
    if(status == "lose"){
    Clear();
    menu();
    context.fillStyle = "white";
    context.font = "30px Calibri";
    context.fillText("Game over!", 240, 390);
    context.fill();
    context.beginPath();
    context.fillStyle = "white";
    context.font = "30px Calibri";
    context.fillText("Score - " + score,  255, 530);
    context.fill();
    status = "menu";
    }

    if (status == "menu") {
		score = 0;
		overload = 0;
		status_fire = "fire";
    }
}, 50);

function Clear() {
  context.clearRect(0,0,window.innerWidth,window.innerHeight);
}