var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pxt = 50;
var xLength = 8;
var iLength = xLength * 9;
var speedLog = 2;
var speedX = 5;
var physicsEmulation = 3;
var dev = false;
var word = {
	"4_2" : "wall",
	"4_1" : "wall",
	"4_3" : "wall",
	"4_4" : "wall",
};	
var control = {
	32 : "up",
	68 : "right",
	87 : "up",
	83 : 'down',
	65 : "left",
}
var enemy = function (x, y, color) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.coliderX1 = 0; // +1X
	this.coliderX2 = 0;	// +0.1X
	this.coliderX3 = 0;	// +0.9X
	this.coliderY1 = 0; // +1Y
	this.coliderY2 = 0;	// +0.1Y
	this.coliderY3 = 0;	// +0.9Y
	this.jump = false;
};
var bulet = function (x, y, color, speed) {
	this.x = x;
	this.y = y + (pxt / 2);
	this.color = color;
	this.speed = speed;
	this.fallSpeed = 0;
	this.arc = pxt / 100 * 23;
	this.shot = false;
	this.length = 0;
};
enemy.prototype.draw = function () {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, pxt, pxt);
};
bulet.prototype.draw = function () {
	if (this.length > 0) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x,this.y, this.arc, 0, Math.PI * 2, false);
		ctx.fill();
	};
};
var grafic = function () {
	ctx.fillStyle = "Red";
	ctx.fillRect(10 * pxt, 5 * pxt, pxt, player[this.ySpeed]);
};
enemy.prototype.blockDowm = function () {
	this.ySpeed = 0;
	this.y += (Math.floor(this.y / pxt) * pxt) - this.y;
};
enemy.prototype.blockUP = function () {
	this.ySpeed = 0;
	this.y += (this.coliderY1 * pxt) - this.y;
};
enemy.prototype.blockLeft = function () {
	this.xSpeed = 0;
	this.x += (Math.floor(this.x / pxt) * pxt + pxt) - this.x;
	// console.log("LEFT");
};
enemy.prototype.blockRight = function () {
	this.xSpeed = 0;
	this.x += (Math.floor(this.x / pxt) * pxt) - this.x;
};
enemy.prototype.coliderTest = function (name) {
	if (word[String(this.coliderY1) + "_" + String(Math.floor(this.x / pxt))] === name && word[String(this.coliderY1) + "_" + String(this.coliderX2)]) {
		// console.log("down");
		return "down";
	}
	else if (word[String(this.coliderY1) + "_" + String(Math.floor(this.coliderX2))] === "wall" && word[String(this.coliderY1) + "_" + String(this.coliderX3)]) {
		// console.log("down1");
		return "down";
	}
	else if (word[String(this.coliderY1) + "_" + String(Math.floor(this.coliderX3))] === "wall" && word[String(this.coliderY1) + "_" + String(this.coliderX1)]) {
		// console.log("down2");
		return "down";
	}
	else if (word[String(Math.floor(this.y / pxt)) + "_" + String(Math.floor(this.x / pxt))] === "wall" && word[String(Math.floor(this.y / pxt)) + "_" + String(this.coliderX2)]) {
		// console.log("up");
		return "up";
	}
	else if (word[String(Math.floor(this.y / pxt)) + "_" + String(Math.floor(this.coliderX2))] === "wall" && word[String(Math.floor(this.y / pxt)) + "_" + String(this.coliderX3)]) {
		// console.log("up1");
		return "up";
	}
	else if (word[String(Math.floor(this.y / pxt)) + "_" + String(Math.floor(this.coliderX3))] === "wall" && word[String(Math.floor(this.y / pxt)) + "_" + String(this.coliderX1)]) {
		// console.log("up2");
		return "up";
	}
	else if (word[String(Math.floor(this.y / pxt)) + "_" + String(Math.floor(this.x / pxt))] === "wall" && word[String(this.coliderY2) + "_" + String(Math.floor(this.x / pxt))] === "wall") {
		// console.log("LEFT");
		return "left";
	}
	else if (word[String(this.coliderY2) + "_" + String(Math.floor(this.x / pxt))] === "wall" && word[String(this.coliderY3) + "_" + String(Math.floor(this.x / pxt))] === "wall") {
		// console.log("LEFT1");
		return "left";
	}
	else if (word[String(this.coliderY3) + "_" + String(Math.floor(this.x / pxt))] === "wall" && word[String(this.coliderY1) + "_" + String(Math.floor(this.x / pxt))] === "wall") {
		// console.log("LEFT2");
		return "left";
	}
	else if (word[String(Math.floor(this.y / pxt)) + "_" + String(this.coliderX1)] === "wall" && word[String(this.coliderY2) + "_" + String(this.coliderX1)] === "wall") {
		// console.log("RIGHT");
		return "right";
	}
	else if (word[String(this.coliderY2) + "_" + String(this.coliderX1)] === "wall" && word[String(this.coliderY3) + "_" + String(this.coliderX1)] === "wall") {
		// console.log("RIGHT1");
		return "right";
	}
	else if (word[String(this.coliderY3) + "_" + String(this.coliderX1)] === "wall" && word[String(this.coliderY1) + "_" + String(this.coliderX1)] === "wall") {
		// console.log("RIGHT2");
		return "right";
	};
};
enemy.prototype.colider = function () {
	this.coliderX1 = this.x + (pxt - 1); // +1X
	this.coliderX2 = this.x + (pxt / 100 * 10);	// +0.1X
	this.coliderX3 = this.x + (pxt / 100 * 90);	// +0.9X
	this.coliderY1 = this.y + (pxt - 1); // +1Y
	this.coliderY2 = this.y + (pxt / 100 * 10);	// +0.1Y
	this.coliderY3 = this.y + (pxt / 100 * 90);	// +0.9Y
	// console.log(this.coliderX1 + "X " + this.coliderY1 + "Y ");
	ctx.fillStyle = "Red";
	ctx.fillRect(this.x, this.y, pxt / 100 * 2, pxt / 100 * 2,);
	ctx.fillRect(this.coliderX1, this.y, pxt / 100 * 2, pxt / 100 * 2,);

	ctx.fillRect(this.coliderX2, this.y, pxt / 100 * 2, pxt / 100 * 2,);
	ctx.fillRect(this.coliderX2, this.coliderY1, pxt / 100 * 2, pxt / 100 * 2,);

	ctx.fillRect(this.coliderX3, this.y, pxt / 100 * 2, pxt / 100 * 2,);
	ctx.fillRect(this.coliderX3, this.coliderY1, pxt / 100 * 2, pxt / 100 * 2,);

	ctx.fillRect(this.coliderX1, this.coliderY1, pxt / 100 * 2, pxt / 100 * 2,);
	ctx.fillRect(this.x, this.coliderY1, pxt / 100 * 2, pxt / 100 * 2,);

	ctx.fillRect(this.x, this.coliderY2, pxt / 100 * 2, pxt / 100 * 2,);
	ctx.fillRect(this.coliderX1, this.coliderY2, pxt / 100 * 2, pxt / 100 * 2,);

	ctx.fillRect(this.x, this.coliderY3, pxt / 100 * 2, pxt / 100 * 2,);
	ctx.fillRect(this.coliderX1, this.coliderY3, pxt / 100 * 2, pxt / 100 * 2,);
	this.coliderX1 = Math.floor(this.coliderX1 / pxt);
	this.coliderX2 = Math.floor(this.coliderX2 / pxt);
	this.coliderX3 = Math.floor(this.coliderX3 / pxt);
	this.coliderY1 = Math.floor(this.coliderY1 / pxt);
	this.coliderY2 = Math.floor(this.coliderY2 / pxt);
	this.coliderY3 = Math.floor(this.coliderY3 / pxt);
	// console.log(this.coliderX1 + "X1 " + this.coliderX2 + "X2 " + this.coliderX3 + "X3 ");
	if (word[String(this.coliderY1) + "_" + String(Math.floor(this.x / pxt))] === "wall" && word[String(this.coliderY1) + "_" + String(this.coliderX2)] === "wall") {
		// console.log("down");
		this.jump = true;
		this.blockDowm();
	}
	else if (word[String(this.coliderY1) + "_" + String(Math.floor(this.coliderX2))] === "wall" && word[String(this.coliderY1) + "_" + String(this.coliderX3)] === "wall") {
		// console.log("down1");
		this.blockDowm();
		this.jump = true;
	}
	else if (word[String(this.coliderY1) + "_" + String(Math.floor(this.coliderX3))] === "wall" && word[String(this.coliderY1) + "_" + String(this.coliderX1)] === "wall") {
		// console.log("down2");
		this.blockDowm();
		this.jump = true;
	}
	else if (word[String(Math.floor(this.y / pxt)) + "_" + String(Math.floor(this.x / pxt))] === "wall" && word[String(Math.floor(this.y / pxt)) + "_" + String(this.coliderX2)] === "wall") {
		// console.log("up");
		this.blockUP();
	}
	else if (word[String(Math.floor(this.y / pxt)) + "_" + String(Math.floor(this.coliderX2))] === "wall" && word[String(Math.floor(this.y / pxt)) + "_" + String(this.coliderX3)] === "wall") {
		// console.log("up1");
		this.blockUP();
	}
	else if (word[String(Math.floor(this.y / pxt)) + "_" + String(Math.floor(this.coliderX3))] === "wall" && word[String(Math.floor(this.y / pxt)) + "_" + String(this.coliderX1)] === "wall") {
		// console.log("up2");
		this.blockUP();
	}
	else if (word[String(Math.floor(this.y / pxt)) + "_" + String(Math.floor(this.x / pxt))] === "wall" && word[String(this.coliderY2) + "_" + String(Math.floor(this.x / pxt))] === "wall") {
		// console.log("LEFT");
		this.blockLeft();
		this.jump = true;
	}
	else if (word[String(this.coliderY2) + "_" + String(Math.floor(this.x / pxt))] === "wall" && word[String(this.coliderY3) + "_" + String(Math.floor(this.x / pxt))] === "wall") {
		// console.log("LEFT1");
		this.blockLeft();
		this.jump = true;
	}
	else if (word[String(this.coliderY3) + "_" + String(Math.floor(this.x / pxt))] === "wall" && word[String(this.coliderY1) + "_" + String(Math.floor(this.x / pxt))] === "wall") {
		// console.log("LEFT2");
		this.blockLeft();
		this.jump = true;
	}
	else if (word[String(Math.floor(this.y / pxt)) + "_" + String(this.coliderX1)] === "wall" && word[String(this.coliderY2) + "_" + String(this.coliderX1)] === "wall") {
		// console.log("RIGHT");
		this.blockRight();
		this.jump = true;
	}
	else if (word[String(this.coliderY2) + "_" + String(this.coliderX1)] === "wall" && word[String(this.coliderY3) + "_" + String(this.coliderX1)] === "wall") {
		// console.log("RIGHT1");
		this.blockRight();
		this.jump = true;
	}
	else if (word[String(this.coliderY3) + "_" + String(this.coliderX1)] === "wall" && word[String(this.coliderY1) + "_" + String(this.coliderX1)] === "wall") {
		// console.log("RIGHT2");
		this.blockRight();
		this.jump = true;
	};
};
var player = new enemy(pxt * 2, pxt * 2, "BlueViolet");
var bulet1 = new bulet(pxt * 5, pxt * 3, "Green", pxt / 100 * 15);
var gameRender = function () {
	ctx.clearRect(0, 0, 900, 900);
	renderX = 0;
	renderY = 0;
	renderCordinate = "0"; //String(renderY)  + String(renderX);
	for (var i = 0; i < iLength; i++) {
		if (word[renderCordinate] === "wall") {
			ctx.fillStyle = "Black";
			ctx.fillRect(renderX * pxt, renderY * pxt, pxt, pxt);
		};
		if (renderX > xLength) {
			renderY++;
			renderX = 0;
		}
		else {
			renderX++;
		}
		if (renderY === 0) {
			renderCordinate = String(renderX);
		}
		else {
			renderCordinate = String(renderY) + "_" + String(renderX);
		}
	};
	// grafic();
	player.draw();
};
enemy.prototype.maveRight = function () {
	if (player.coliderTest("wall") === undefined) {
		this.x += 2;
		this.xSpeed += speedX;
	};
};
enemy.prototype.maveLeft = function () {
	if (player.coliderTest("wall") === undefined) {
		this.x -= 2;
		this.xSpeed -= speedX;
	};
};
enemy.prototype.maveUp = function () {
	if (player.coliderTest("wall") === undefined) {
		// this.y -= pxt / 1.5;
		this.ySpeed -= 30;
		// console.log("WELL");
	};
};
enemy.prototype.maveDown = function () {
	if (player.coliderTest("wall") === undefined) {
		this.y += 3;
		this.ySpeed += 3;
	};
};
gameRender();

$("body").keydown(function (event) {
	var keyDown = control[event.keyCode];
	// console.log(keyDown);
	if (player.coliderTest("wall") === undefined) {
		if (keyDown === "right") {
			player.maveRight();
		};
		if (keyDown === "left") {
			console.log("LEFT");
			player.maveLeft();
		};
		if (keyDown === "down" && dev === true) {
			player.maveDown();
		};
		if (keyDown === "up" && player.jump === true) {
			player.maveUp();
			player.jump = false;
			// console.log(false);
			bulet1.x = player.x;
			bulet1.y = player.y + (pxt / 2);
			bulet1.fallSpeed = 0;
			if (player.xSpeed > 0) {
				// bulet1.physics("right", true);
				bulet1.length = 100;
				// console.log("RIGHT2");
			}
			else if (player.xSpeed < 0) {
				bulet1.length = -100;
				// console.log("LEFT");
			};
		};
	};
});
$("body").keyup(function (event) {
	// console.log(event.keyCode + 'Up');
});
bulet.prototype.physics = function (xRotetion, balistic) {
	if (xRotetion === "right") {
		this.x += this.speed;
	};
	if (xRotetion === "left") {
		this.x -= this.speed;
	};
	if (balistic === true) {
		this.y += this.fallSpeed / 25;
		this.fallSpeed++;
	};
};
enemy.prototype.physics = function () {
	if (this.xSpeed > 0) { //X+
		this.xSpeed = Math.floor(this.xSpeed) - speedLog;
		this.x += this.xSpeed;
		if (this.xSpeed < 0) {
			// console.log("LEFT.physics.FIX");
			this.xSpeed = 0;
		};
	}
	if (this.xSpeed < 0) { //X-
		// console.log("LEFT.physics");
		this.xSpeed = Math.floor(this.xSpeed) + speedLog;
		this.x += this.xSpeed;
		if (this.xSpeed > 0) {
			this.xSpeed = 0;
		};
	};
	if (this.ySpeed < 0) { //Y graviti
		this.ySpeed = Math.floor(this.ySpeed) - 2;
	};
	this.ySpeed += 3;
	this.y += Math.floor(this.ySpeed / 5);
	if (this.ySpeed > 25) {
		this.ySpeed = 23;
	}
	else if (-this.ySpeed > 40) {
		this.ySpeed = -38;
	};
	if (this.xSpeed > 50) {
		this.xSpeed = 48;
	}
	else if (-this.xSpeed > 50) {
		this.xSpeed = -48;
	}
	// console.log(this.ySpeed + "Y");
	// console.log(this.xSpeed + "X");
};
setInterval(function () {
	if (player.coliderTest("wall") === undefined) {
		player.physics();
		// console.log("NOTWALL")
	}
	else {
		// console.log("WALL");
	};
	player.colider();
	gameRender();
	if (dev === true) {
		player.colider();
		if (bulet1.length !== 0) {
			bulet1.draw();
			if (bulet1.length > 0) {
				bulet1.physics("right", true);
				bulet1.length--;
			};
			if (bulet1.length < 0) {
				console.log("left");
				bulet1.physics("left", true);
				bulet1.length++;
			};
			if (bulet1.length === 0) {
				bulet1.x = -10;
				bulet1.y = -10 + (pxt / 2);
			};
		};
		// grafic();
	}
}, 15);