var canvas = document.getElementById("example");
var context = canvas.getContext("2d");

function ship()
{
	context.beginPath();
	context.moveto(80, 40);
	context.lineto(120, 40);
	context.lineto(100, 50);
	context.closePath();
	context.fillStyle = "#20B19C";
    context.fill();
    context.strokeStyle = "#20B19C";
    context.stroke();
}