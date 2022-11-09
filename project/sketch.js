// we should declare functions and variables outside 
// the scope of the main setup() and draw() functions here

//import { WORDS } from "./words.js"; //array of word prompts to draw
//let word = WORDS[Math.floor(Math.random() * WORDS.length]; // randomly chooses a prompt

// CONSTANTS
let CANVAS_WIDTH = 1280;
let CANVAS_HEIGHT = 720;
let FR = 200; // Framerate of our app, the higher the smoother our drawing
let gameStart = false; // determines if home menu buttons have been pressed
let practiceStart = false; // determines if practice button was pressed
let currentOpacity = 100;
let timer = 120;


// Tracks current brush color; initialized to black
var currentColor = "black";

// Tracks current line size in pixels; initialized to 15
var lineSize = 15;

function preload(){
	// preload() is called before the start of the script,
	// in order to load things in advance

	// this is where we would preload all image assets	
	//ui_timer = loadImage('https://heskitgel.github.io/project/assets/timer.jpg');
	home_background = loadImage('https://heskitgel.github.io/project/assets/home_background.jpg');

}

function setup(){
	// setup() is called once at the start of the script, 
	// or when the webpage/client loads
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(FR);
	// draws background of hex code #ADD8E6
	background(173, 216, 230);
	
	/* home screen buttons */
	// play drawing game
	gameButton = new Clickable(); // create button
	gameButton.resize(150, 75);
	gameButton.locate(CANVAS_WIDTH*0.3, CANVAS_HEIGHT*0.6); // position button
	gameButton.text = "Play Game"; // text on the button
	gameButton.textSize = 20;
	
	// set normal button color
	gameButton.onOutside = function(){
		gameButton.color = "#DBDBDB";
	}
	
	// change button color when hovered over
	gameButton.onHover = function(){
		gameButton.color = "#B5B5B5";
	}
	
	// when button is pressed, hide it and bring up the drawing canvas
	gameButton.onRelease = function(){
		gameStart = true;
		background(173, 216, 230);
	}
	
	// practice drawing mode
	practiceButton = new Clickable(); // create button
	practiceButton.resize(150, 75);
	practiceButton.locate(CANVAS_WIDTH*0.55, CANVAS_HEIGHT*0.6); // position button
	practiceButton.text = "Practice"; // text on the button
	practiceButton.textSize = 20;
	
	// set normal button color
	practiceButton.onOutside = function(){
		practiceButton.color = "#DBDBDB";
	}
	
	// change button color when hovered over
	practiceButton.onHover = function(){
		practiceButton.color = "#B5B5B5";
	}
	
	// when button is pressed, hide it and bring up the drawing canvas
	practiceButton.onRelease = function(){
		practiceStart = true;
		background(173, 216, 230);
	}
	
	opacityIncrease = new Clickable();
	opacityIncrease.resize(50, 40);
	opacityIncrease.locate(((CANVAS_WIDTH/5) + 200), 10);
	opacityIncrease.text = "↑";
	opacityIncrease.textSize = 20;
	opacityIncrease.onPress = function() {
		if (currentOpacity < 100){
			currentOpacity+=5;
			displayOpacity.text = currentOpacity + "%";
			currentColor = setOpacity(currentColor, currentOpacity);
		}
	}

	opacityIncrease.onOutside = function() {
		opacityIncrease.color = "#DBDBDB";
	}

	opacityIncrease.onHover = function(){
		opacityIncrease.color = "#B5B5B5";
	}

	displayOpacity = new Clickable();
	displayOpacity.resize(100, 100);
	displayOpacity.locate((CANVAS_WIDTH/5) + 100, 0);
	displayOpacity.textSize = 30;
	displayOpacity.text = currentOpacity + "%";

	opacityDecrease = new Clickable();
	opacityDecrease.resize(50, 40);
	opacityDecrease.locate(((CANVAS_WIDTH/5) + 200), 50);
	opacityDecrease.text = "↓";
	opacityDecrease.textSize = 20;
	opacityDecrease.onPress = function(){
		if (currentOpacity > 5)
		{
			currentOpacity-=5;
			displayOpacity.text = currentOpacity + "%";
			currentColor = setOpacity(currentColor, currentOpacity);
		}
	}
	// set normal button color
	opacityDecrease.onOutside = function(){
		opacityDecrease.color = "#DBDBDB";
	}
	// change color when hovered over
	opacityDecrease.onHover = function(){
		opacityDecrease.color = "#B5B5B5";
	}

	// increase line size by pressing button
	sizeIncrease = new Clickable();
	sizeIncrease.resize(50, 40);
	sizeIncrease.locate(CANVAS_WIDTH-500, 10);
	sizeIncrease.text = "↑";
	sizeIncrease.textSize = 20;
	sizeIncrease.onPress = function(){
		if (lineSize < 100)
		{
			lineSize+=5;
			displaySize.text = lineSize + "px";
		}
	}
	// set normal button color
	sizeIncrease.onOutside = function(){
		sizeIncrease.color = "#DBDBDB";
	}
	// change color when hovered over
	sizeIncrease.onHover = function(){
		sizeIncrease.color = "#B5B5B5";
	}
	
	// decrease line size by pressing button
	sizeDecrease = new Clickable();
	sizeDecrease.resize(50, 40);
	sizeDecrease.locate(CANVAS_WIDTH-500, 50);
	sizeDecrease.text = "↓";
	sizeDecrease.textSize = 20;
	sizeDecrease.onPress = function(){
		if (lineSize > 5)
		{
			lineSize-=5;
			displaySize.text = lineSize + "px";
		}
	}
	// set normal button color
	sizeDecrease.onOutside = function(){
		sizeDecrease.color = "#DBDBDB";
	}
	// change color when hovered over
	sizeDecrease.onHover = function(){
		sizeDecrease.color = "#B5B5B5";
	}
	
	// box displaying the current line weight
	displaySize = new Clickable();
	displaySize.resize(100, 100);
	displaySize.locate(CANVAS_WIDTH-600, 0);
	displaySize.textSize = 30;
	displaySize.text = lineSize + "px";
	
	// color buttons
	whiteButton = new Clickable(); //white
	whiteButton.resize(50, 50);
	whiteButton.locate(CANVAS_WIDTH-400, 0);
	whiteButton.text = "";
	whiteButton.color = "white";
	whiteButton.onPress = function(){
		currentColor = "white"; //change brush color to white
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	grayButton = new Clickable(); //gray
	grayButton.resize(50, 50);
	grayButton.locate(CANVAS_WIDTH-350, 0);
	grayButton.text = "";
	grayButton.color = "gray";
	grayButton.onPress = function(){
		currentColor = "gray"; //change brush color to gary
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	blackButton = new Clickable(); //black
	blackButton.resize(50, 50);
	blackButton.locate(CANVAS_WIDTH-300, 0);
	blackButton.text = "";
	blackButton.color = "black";
	blackButton.onPress = function(){
		currentColor = "black"; //change brush color to black
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	maroonButton = new Clickable(); //maroon
	maroonButton.resize(50, 50);
	maroonButton.locate(CANVAS_WIDTH-250, 0);
	maroonButton.text = "";
	maroonButton.color = "maroon";
	maroonButton.onPress = function(){
		currentColor = "maroon"; //change brush color to maroon
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	redButton = new Clickable(); //red
	redButton.resize(50, 50);
	redButton.locate(CANVAS_WIDTH-200, 0);
	redButton.text = "";
	redButton.color = "red";
	redButton.onPress = function(){
		currentColor = "red"; //change brush color to red
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	orangeButton = new Clickable(); //orange
	orangeButton.resize(50, 50);
	orangeButton.locate(CANVAS_WIDTH-150, 0);
	orangeButton.text = "";
	orangeButton.color = "orange";
	orangeButton.onPress = function(){
		currentColor = "orange"; //change brush color to orange
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	yellowButton = new Clickable(); //yellow
	yellowButton.resize(50, 50);
	yellowButton.locate(CANVAS_WIDTH-100, 0);
	yellowButton.text = "";
	yellowButton.color = "yellow";
	yellowButton.onPress = function(){
		currentColor = "yellow"; //change brush color to yellow
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	limeButton = new Clickable(); //light green or lime
	limeButton.resize(50, 50);
	limeButton.locate(CANVAS_WIDTH-50, 0);
	limeButton.text = "";
	limeButton.color = "lime";
	limeButton.onPress = function(){
		currentColor = "lime"; //change brush color to lime
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	greenButton = new Clickable(); //green
	greenButton.resize(50, 50);
	greenButton.locate(CANVAS_WIDTH-400, 50);
	greenButton.text = "";
	greenButton.color = "green";
	greenButton.onPress = function(){
		currentColor = "green"; //change brush color to green
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	cyanButton = new Clickable(); //cyan
	cyanButton.resize(50, 50);
	cyanButton.locate(CANVAS_WIDTH-350, 50);
	cyanButton.text = "";
	cyanButton.color = "cyan";
	cyanButton.onPress = function(){
		currentColor = "cyan"; //change brush color to cyan
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	blueButton = new Clickable(); //blue
	blueButton.resize(50, 50);
	blueButton.locate(CANVAS_WIDTH-300, 50);
	blueButton.text = "";
	blueButton.color = "blue";
	blueButton.onPress = function(){
		currentColor = "blue"; //change brush color to blue
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	navyButton = new Clickable(); //navy
	navyButton.resize(50, 50);
	navyButton.locate(CANVAS_WIDTH-250, 50);
	navyButton.text = "";
	navyButton.color = "navy";
	navyButton.onPress = function(){
		currentColor = "navy"; //change brush color to navy
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	purpleButton = new Clickable(); //purple
	purpleButton.resize(50, 50);
	purpleButton.locate(CANVAS_WIDTH-200, 50);
	purpleButton.text = "";
	purpleButton.color = "purple";
	purpleButton.onPress = function(){
		currentColor = "purple"; //change brush color to purple
		currentColor = setOpacity(currentColor, currentOpacity);

	}
	
	lightpinkButton = new Clickable(); //light pink
	lightpinkButton.resize(50, 50);
	lightpinkButton.locate(CANVAS_WIDTH-150, 50);
	lightpinkButton.text = "";
	lightpinkButton.color = "lightpink";
	lightpinkButton.onPress = function(){
		currentColor = "lightpink"; //change brush color to light pink
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	fuchsiaButton = new Clickable(); //fuschsia or dark pink
	fuchsiaButton.resize(50, 50);
	fuchsiaButton.locate(CANVAS_WIDTH-100, 50);
	fuchsiaButton.text = "";
	fuchsiaButton.color = "fuchsia";
	fuchsiaButton.onPress = function(){
		currentColor = "fuchsia"; //change brush color to fuchsia
		currentColor = setOpacity(currentColor, currentOpacity);
	}
	
	brownButton = new Clickable(); //brown
	brownButton.resize(50, 50);
	brownButton.locate(CANVAS_WIDTH-50, 50);
	brownButton.text = "";
	brownButton.color = "brown";
	brownButton.onPress = function(){
		currentColor = "brown"; //change brush color to brown
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	backButton = new Clickable(); // back button to return back to main menu
	backButton.resize(CANVAS_WIDTH/10, CANVAS_HEIGHT/8);
	backButton.locate(((CANVAS_WIDTH/10)), 0) // position it next to our temporary timer 
	backButton.text = "Back";
	backButton.textSize = 20;

	backButton.onOutside = function(){
		backButton.color = "#DBDBDB";
	}

	backButton.onHover = function(){
		backButton.color = "#B5B5B5";
	}

	backButton.onRelease = function(){
		gameStart = false;
		practiceStart = false;
	}
}

function draw() {
	// don't want users to be able to draw on the home page
	if (gameStart === false && practiceStart === false)
	{
		image(home_background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //adds background image to home page
		
		// add buttons to the canvas
		gameButton.draw();
		practiceButton.draw();
		
		// add text to home page displaying the name of the game
		stroke("black");
		strokeWeight(1);
		fill(0, 0, 0)
		textSize(100);
		textFont("helvetica");
		textAlign(CENTER);
		text('Quick Draw ✏️', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 30);
	}
	
	// draw() is called every frame, think of it as our main() method
	// order matters!
	// no longer on the home page; add drawing elements
	else
	{
		// drawing code
		if (mouseIsPressed === true && mouseY >= 100 && pmouseY >= 100){ //can't draw above the tool bars
			stroke(currentColor); //sets color of the line to the current color
			strokeWeight(lineSize); //width of the line drawn
			line(mouseX, mouseY, pmouseX, pmouseY);
		}else{
			fill(255);
		}
		
		if (gameStart === true) //starting the game mode adds in a timer
		{
			if (frameCount % 60 == 0 && timer > 0) {	// if the frameCount is divisible by 60, then a second has passed. it will stop at 0
				timer--;
			}
			if (timer == 0) {	//Time runs out, can implement different actions
				text("Time Done", CANVAS_WIDTH/2, CANVAS_HEIGHT*0.7);
			}
			//Create rectangle to hide old text and organize timer
			stroke('black');
			strokeWeight(1);
			fill(255, 255, 255)
			rect(0, 0, CANVAS_WIDTH/10, CANVAS_HEIGHT/8, 10)

			//Displays number of seconds left 
			stroke('black');
			strokeWeight(1);
			fill(0, 0, 0)
			textSize(20);
			textFont("helvetica");
			textAlign(CENTER, CENTER);
			text(timer , 0, 0, (CANVAS_WIDTH/10), (CANVAS_HEIGHT/8));
		}

		// add in back button
		backButton.draw();

		// add line size buttons
		sizeIncrease.draw();
		sizeDecrease.draw();
		displaySize.draw();

		// add in opacity buttons
		displayOpacity.draw();
		opacityIncrease.draw();
		opacityDecrease.draw();

		// add first row of color buttons
		whiteButton.draw();
		grayButton.draw();
		blackButton.draw();
		maroonButton.draw();
		redButton.draw();
		orangeButton.draw();
		yellowButton.draw();
		limeButton.draw();
		//add second row of color buttons
		greenButton.draw();
		cyanButton.draw();
		blueButton.draw(); 
		navyButton.draw();
		purpleButton.draw();
		lightpinkButton.draw();
		fuchsiaButton.draw();
		brownButton.draw();
	}
}

function setOpacity(inputColor, opacityPercent){
	console.log("setting " + opacityPercent + " opacity for " + inputColor);
	let r = red(inputColor);
	let g = green(inputColor);
	let b = blue(inputColor);
	let a = (opacityPercent * 2.55);
	console.log("a = " + a);
	let returnColor = color(r, g, b, a);
	return returnColor;
}