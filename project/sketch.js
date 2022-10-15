// we should declare functions and variables outside 
// the scope of the main setup() and draw() functions here

// CONSTANTS
let CANVAS_WIDTH = 1280;
let CANVAS_HEIGHT = 720;

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

	// draws background of hex code #ADD8E6
	background(173, 216, 230);
}

function draw() {
	// draw() is called every frame, think of it as our main() method
	// order matters!

	// displays our temporary UI art for our color selection bar
	// first is the image variable, then the x position, y position,
	// and then the width and height
	image(ui_colorbar, (CANVAS_WIDTH/2), 0, (CANVAS_WIDTH/2), (CANVAS_HEIGHT/8));

	// places our color UI halfway across the X and 1/8th across the Y
	
	// sample drawing code
	if (mouseIsPressed){
    	fill(0);
    	ellipse(mouseX, mouseY, 80, 80);
    }else{
    	fill(255);
    }
}