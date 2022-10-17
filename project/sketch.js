// we should declare functions and variables outside 
// the scope of the main setup() and draw() functions here

// CONSTANTS
let CANVAS_WIDTH = 1280;
let CANVAS_HEIGHT = 720;
let drawStart = false; // determines if home menu buttons have been pressed
let FR = 200; // Framerate of our app, the higher the smoother our drawing
let gameButton;
let practiceButton;

// variables
let ui_colorbar;

function preload(){
	// preload() is called before the start of the script,
	// in order to load things in advance

	// temporary UI bar asset is loaded on the website repository
	// this is where we would preload all image assets
	ui_colorbar = loadImage('https://heskitgel.github.io/project/assets/colorBar.jpg');
}

function setup(){
	// setup() is called once at the start of the script, 
	// or when the webpage/client loads
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(FR);
	// draws background of hex code #ADD8E6
	background(173, 216, 230);
	
	// home screen buttons
	// play drawing game
	gameButton = new Clickable(); // create button
	gameButton.locate(CANVAS_WIDTH/4, CANVAS_HEIGHT/2); // position button
	gameButton.text = "Play Game"; // text on the button
	// when button is pressed, hide it and bring up the drawing canvas
	gameButton.onRelease = function(){
		drawStart = true;
		//buttonHide();
	}
	
	// go to practice mode
	practiceButton = new Clickable(); // create button
	practiceButton.locate((CANVAS_WIDTH*2)/3, CANVAS_HEIGHT/2); // position button
	practiceButton.text = "Practice"; // text on the button
	// when button is pressed, hide it and bring up the drawing canvas
	practiceButton.onRelease = function(){
		drawStart = true;
		//buttonHide();
	}
}

function buttonHide() {
	// remove buttons from the canvas
	gameButton.hide();
	practiceButton.hide();
}

function draw() {
	// don't want users to be able to draw on the home page
	if (drawStart === false)
	{
		// add buttons to the canvas
		gameButton.draw();
		practiceButton.draw();
	}
	
	// draw() is called every frame, think of it as our main() method
	// order matters!

	// no longer on the home page; add drawing elements
	else if (drawStart)
	{
		// displays our temporary UI art for our color selection bar
		// first is the image variable, then the x position, y position,
		// and then the width and height
		image(ui_colorbar, (CANVAS_WIDTH/2), 0, (CANVAS_WIDTH/2), (CANVAS_HEIGHT/8));

		// places our color UI halfway across the X and 1/8th across the Y
		
		// sample drawing code
		if (mouseIsPressed){
			fill(0);
			ellipse(mouseX, mouseY, 10, 10);
		}else{
			fill(255);
		}
	}
}