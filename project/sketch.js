// we should declare functions and variables outside 
// the scope of the main setup() and draw() functions here

// CONSTANTS
let CANVAS_WIDTH = 1280;
let CANVAS_HEIGHT = 720;
let FR = 200; // Framerate of our app, the higher the smoother our drawing
let gameStart = false; // determines if home menu buttons have been pressed
let practiceStart = false; // determines if practice button was pressed

// Tracks current brush color; initialized to black
var currentColor = "black";

function preload(){
	// preload() is called before the start of the script,
	// in order to load things in advance

	// temporary UI bar asset is loaded on the website repository
	// this is where we would preload all image assets
	
	ui_timer = loadImage('https://heskitgel.github.io/project/assets/timer.jpg');
	ui_toolbar = loadImage('https://heskitgel.github.io/project/assets/tools.jpg');
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
	gameButton.locate(CANVAS_WIDTH/4, (CANVAS_HEIGHT*2)/3); // position button
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
	practiceButton.locate(CANVAS_WIDTH*0.60, (CANVAS_HEIGHT*2)/3); // position button
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
	
	// color buttons
	whiteButton = new Clickable(); //white
	whiteButton.resize(50, 50);
	whiteButton.locate(CANVAS_WIDTH-400, 0);
	whiteButton.text = "";
	whiteButton.color = "white";
	whiteButton.onPress = function(){
		currentColor = "white"; //change brush color to white
	}

	grayButton = new Clickable(); //gray
	grayButton.resize(50, 50);
	grayButton.locate(CANVAS_WIDTH-350, 0);
	grayButton.text = "";
	grayButton.color = "gray";
	grayButton.onPress = function(){
		currentColor = "gray"; //change brush color to gary
	}
	
	blackButton = new Clickable(); //black
	blackButton.resize(50, 50);
	blackButton.locate(CANVAS_WIDTH-300, 0);
	blackButton.text = "";
	blackButton.color = "black";
	blackButton.onPress = function(){
		currentColor = "black"; //change brush color to black
	}
	
	maroonButton = new Clickable(); //maroon
	maroonButton.resize(50, 50);
	maroonButton.locate(CANVAS_WIDTH-250, 0);
	maroonButton.text = "";
	maroonButton.color = "maroon";
	maroonButton.onPress = function(){
		currentColor = "maroon"; //change brush color to maroon
	}
	
	redButton = new Clickable(); //red
	redButton.resize(50, 50);
	redButton.locate(CANVAS_WIDTH-200, 0);
	redButton.text = "";
	redButton.color = "red";
	redButton.onPress = function(){
		currentColor = "red"; //change brush color to red
	}
	
	orangeButton = new Clickable(); //orange
	orangeButton.resize(50, 50);
	orangeButton.locate(CANVAS_WIDTH-150, 0);
	orangeButton.text = "";
	orangeButton.color = "orange";
	orangeButton.onPress = function(){
		currentColor = "orange"; //change brush color to orange
	}
	
	yellowButton = new Clickable(); //yellow
	yellowButton.resize(50, 50);
	yellowButton.locate(CANVAS_WIDTH-100, 0);
	yellowButton.text = "";
	yellowButton.color = "yellow";
	yellowButton.onPress = function(){
		currentColor = "yellow"; //change brush color to yellow
	}
	
	limeButton = new Clickable(); //light green or lime
	limeButton.resize(50, 50);
	limeButton.locate(CANVAS_WIDTH-50, 0);
	limeButton.text = "";
	limeButton.color = "lime";
	limeButton.onPress = function(){
		currentColor = "lime"; //change brush color to lime
	}
	
	greenButton = new Clickable(); //green
	greenButton.resize(50, 50);
	greenButton.locate(CANVAS_WIDTH-400, 50);
	greenButton.text = "";
	greenButton.color = "green";
	greenButton.onPress = function(){
		currentColor = "green"; //change brush color to green
	}
	
	cyanButton = new Clickable(); //cyan
	cyanButton.resize(50, 50);
	cyanButton.locate(CANVAS_WIDTH-350, 50);
	cyanButton.text = "";
	cyanButton.color = "cyan";
	cyanButton.onPress = function(){
		currentColor = "cyan"; //change brush color to cyan
	}
	
	blueButton = new Clickable(); //blue
	blueButton.resize(50, 50);
	blueButton.locate(CANVAS_WIDTH-300, 50);
	blueButton.text = "";
	blueButton.color = "blue";
	blueButton.onPress = function(){
		currentColor = "blue"; //change brush color to blue
	}
	
	navyButton = new Clickable(); //navy
	navyButton.resize(50, 50);
	navyButton.locate(CANVAS_WIDTH-250, 50);
	navyButton.text = "";
	navyButton.color = "navy";
	navyButton.onPress = function(){
		currentColor = "navy"; //change brush color to navy
	}
	
	purpleButton = new Clickable(); //purple
	purpleButton.resize(50, 50);
	purpleButton.locate(CANVAS_WIDTH-200, 50);
	purpleButton.text = "";
	purpleButton.color = "purple";
	purpleButton.onPress = function(){
		currentColor = "purple"; //change brush color to purple
	}
	
	lightpinkButton = new Clickable(); //light pink
	lightpinkButton.resize(50, 50);
	lightpinkButton.locate(CANVAS_WIDTH-150, 50);
	lightpinkButton.text = "";
	lightpinkButton.color = "lightpink";
	lightpinkButton.onPress = function(){
		currentColor = "lightpink"; //change brush color to light pink
	}
	
	fuchsiaButton = new Clickable(); //fuschsia or dark pink
	fuchsiaButton.resize(50, 50);
	fuchsiaButton.locate(CANVAS_WIDTH-100, 50);
	fuchsiaButton.text = "";
	fuchsiaButton.color = "fuchsia";
	fuchsiaButton.onPress = function(){
		currentColor = "fuchsia"; //change brush color to fuchsia
	}
	
	brownButton = new Clickable(); //brown
	brownButton.resize(50, 50);
	brownButton.locate(CANVAS_WIDTH-50, 50);
	brownButton.text = "";
	brownButton.color = "brown";
	brownButton.onPress = function(){
		currentColor = "brown"; //change brush color to brown
	}
}

function draw() {
	// don't want users to be able to draw on the home page
	if (gameStart === false && practiceStart === false)
	{
		// add buttons to the canvas
		gameButton.draw();
		practiceButton.draw();
		
		// add text to home page displaying the name of the game
		textSize(100);
		textFont("helvetica");
		textAlign(CENTER);
		text('Quick Draw ✏️', CANVAS_WIDTH/2, CANVAS_HEIGHT/3);
	}
	
	// draw() is called every frame, think of it as our main() method
	// order matters!
	// no longer on the home page; add drawing elements
	else
	{	
		if (gameStart === true)
		{
			image(ui_timer, 0, 0, (CANVAS_WIDTH/10), (CANVAS_HEIGHT/8));
		}

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
		
		// displays our temporary UI art for our color selection bar
		// first is the image variable, then the x position, y position,
		// and then the width and height
		image(ui_toolbar, (CANVAS_WIDTH/4), 0, (CANVAS_WIDTH/5), (CANVAS_HEIGHT/8));
		
		// places our color UI halfway across the X and 1/8th across the Y
		
		// sample drawing code
		if (mouseIsPressed === true && mouseY >= 100 && pmouseY >= 100){ //can't draw above the tool bars
			stroke(currentColor); //sets radius of dot to the current color
			//fill(currentColor); //sets inside of dot to the current color
			strokeWeight(15);
			line(mouseX, mouseY, pmouseX, pmouseY);
		}else{
			fill(255);
		}
	}
}