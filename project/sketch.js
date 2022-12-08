// we should declare functions and variables outside 
// the scope of the main setup() and draw() functions here

// CONSTANTS
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const FR = 60; // Framerate of our app, the higher the smoother our drawing

let CANVAS; // predefining our canvas var

// Game mode variables
var gameMode = 0;	//determines the game mode and different screens 0->home, 1->game, 2->practice, 3->prompt
let gameStart = false; // determines if start button has been pressed
//let practiceStart = false; // determines if practice button was pressed
let timer = 31; // time given to draw a picture (30 seconds, +1 to account for beginning second of timer when game start)
let timerStarted = false;

// Drawing tool variables
let currentOpacity = 100; // Tracks current opacity; initialized to 100%
let currentColor = "black"; // Tracks current brush color; initialized to black
let lineSize = 15; // Tracks current line size in pixels; initialized to 15

// Word list variables
let word = []; // list of words from the given text file
let index; // tracks index of currently selected word

// Player variables
let numPlayers = 2; // current number of players
let playerScores = [0, 0]; // tracks the scores of all players in an array
let playerTurn = 1; // tracks which player is currently drawing
let totalRounds = 3*numPlayers; // total number of drawing rounds
let currentRound = 0; // tracks the current round
let guessedCorrect = false; // tracks if a player correctly guessed the word drawn within the time limit
let pointsEarned = 0; // number of points granted for a correct guess (based on time remaining)

/* Takes in the text file data and stores it in an array */
function doText(data) {
	word = data;
}

function preload() {
	// preload() is called before the start of the script,
	// in order to load things in advance

	home_background = loadImage('https://heskitgel.github.io/project/assets/home_background.jpg'); // preload the background image
}

function setup() {
	// setup() is called once at the start of the script, 
	// or when the webpage/client loads
	CANVAS = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(FR);
	background(173, 216, 230);// draws background of hex code #ADD8E6

	loadStrings('https://heskitgel.github.io/project/words.txt', doText); // calls the doText function

	/* home screen buttons */
	// play drawing game
	gameButton = new Clickable(); // create button
	gameButton.resize(150, 75);
	gameButton.locate(CANVAS_WIDTH * 0.3, CANVAS_HEIGHT * 0.6); // position button
	gameButton.text = "Play Game"; // text on the button
	gameButton.textSize = 20;

	// set normal button color
	gameButton.onOutside = function () {
		gameButton.color = "#DBDBDB";
	}

	// change button color when hovered over
	gameButton.onHover = function () {
		gameButton.color = "#B5B5B5";
	}

	// when button is pressed, hide it and bring up the drawing canvas
	gameButton.onRelease = function () {
		// gameStart = true;
		gameMode = 3;
		background(173, 216, 230);
		// randomly selects index of word to draw
		index = [Math.floor(Math.random() * word.length)];
	}

	// practice drawing mode
	practiceButton = new Clickable(); // create button
	practiceButton.resize(150, 75);
	practiceButton.locate(CANVAS_WIDTH * 0.55, CANVAS_HEIGHT * 0.6); // position button
	practiceButton.text = "Practice"; // text on the button
	practiceButton.textSize = 20;

	// set normal button color
	practiceButton.onOutside = function () {
		practiceButton.color = "#DBDBDB";
	}

	// change button color when hovered over
	practiceButton.onHover = function () {
		practiceButton.color = "#B5B5B5";
	}

	// when button is pressed, hide it and bring up the drawing canvas
	practiceButton.onRelease = function () {
		practiceStart = true;
		gameMode = 2
		background(173, 216, 230);
	}

	opacityIncrease = new Clickable();
	opacityIncrease.resize(50, 40);
	opacityIncrease.locate(((CANVAS_WIDTH / 5) + 200), 10);
	opacityIncrease.text = "↑";
	opacityIncrease.textSize = 20;
	opacityIncrease.onPress = function () {
		if (currentOpacity < 100) {
			currentOpacity += 5;
			displayOpacity.text = currentOpacity + "%";
			currentColor = setOpacity(currentColor, currentOpacity);
		}
	}

	opacityIncrease.onOutside = function () {
		opacityIncrease.color = "#DBDBDB";
	}

	opacityIncrease.onHover = function () {
		opacityIncrease.color = "#B5B5B5";
	}

	// button that decreases color opacity when clicked
	opacityDecrease = new Clickable();
	opacityDecrease.resize(50, 40);
	opacityDecrease.locate(((CANVAS_WIDTH / 5) + 200), 50);
	opacityDecrease.text = "↓";
	opacityDecrease.textSize = 20;
	opacityDecrease.onPress = function () {
		if (currentOpacity > 5) // prevents opacity from going below 5
		{
			currentOpacity -= 5;
			displayOpacity.text = currentOpacity + "%";
			currentColor = setOpacity(currentColor, currentOpacity);
		}
	}

	// set normal button color
	opacityDecrease.onOutside = function () {
		opacityDecrease.color = "#DBDBDB";
	}
	// change color when hovered over
	opacityDecrease.onHover = function () {
		opacityDecrease.color = "#B5B5B5";
	}

	// text box diplaying current opacity
	displayOpacity = new Clickable();
	displayOpacity.resize(100, 100);
	displayOpacity.locate((CANVAS_WIDTH / 5) + 100, 0);
	displayOpacity.textSize = 30;
	displayOpacity.text = currentOpacity + "%";


	// increase line size by pressing button
	sizeIncrease = new Clickable();
	sizeIncrease.resize(50, 40);
	sizeIncrease.locate(CANVAS_WIDTH - 600, 10);
	sizeIncrease.text = "↑";
	sizeIncrease.textSize = 20;
	sizeIncrease.onPress = function () {
		if (lineSize < 100) {
			lineSize += 5;
			displaySize.text = lineSize + "px";
		}
	}
	// set normal button color
	sizeIncrease.onOutside = function () {
		sizeIncrease.color = "#DBDBDB";
	}
	// change color when hovered over
	sizeIncrease.onHover = function () {
		sizeIncrease.color = "#B5B5B5";
	}

	// decrease line size by pressing button
	sizeDecrease = new Clickable();
	sizeDecrease.resize(50, 40);
	sizeDecrease.locate(CANVAS_WIDTH - 600, 50);
	sizeDecrease.text = "↓";
	sizeDecrease.textSize = 20;
	sizeDecrease.onPress = function () {
		if (lineSize > 5) {
			lineSize -= 5;
			displaySize.text = lineSize + "px";
		}
	}
	// set normal button color
	sizeDecrease.onOutside = function () {
		sizeDecrease.color = "#DBDBDB";
	}
	// change color when hovered over
	sizeDecrease.onHover = function () {
		sizeDecrease.color = "#B5B5B5";
	}

	// box displaying the current line weight
	displaySize = new Clickable();
	displaySize.resize(100, 100);
	displaySize.locate(CANVAS_WIDTH - 700, 0);
	displaySize.textSize = 30;
	displaySize.text = lineSize + "px";

	// color buttons
	whiteButton = new Clickable(); //white
	whiteButton.resize(50, 50);
	whiteButton.locate(CANVAS_WIDTH - 400, 0);
	whiteButton.text = "";
	whiteButton.color = "white";
	whiteButton.onPress = function () {
		currentColor = "white"; //change brush color to white
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	grayButton = new Clickable(); //gray
	grayButton.resize(50, 50);
	grayButton.locate(CANVAS_WIDTH - 350, 0);
	grayButton.text = "";
	grayButton.color = "gray";
	grayButton.onPress = function () {
		currentColor = "gray"; //change brush color to gary
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	blackButton = new Clickable(); //black
	blackButton.resize(50, 50);
	blackButton.locate(CANVAS_WIDTH - 300, 0);
	blackButton.text = "";
	blackButton.color = "black";
	blackButton.onPress = function () {
		currentColor = "black"; //change brush color to black
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	maroonButton = new Clickable(); //maroon
	maroonButton.resize(50, 50);
	maroonButton.locate(CANVAS_WIDTH - 250, 0);
	maroonButton.text = "";
	maroonButton.color = "maroon";
	maroonButton.onPress = function () {
		currentColor = "maroon"; //change brush color to maroon
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	redButton = new Clickable(); //red
	redButton.resize(50, 50);
	redButton.locate(CANVAS_WIDTH - 200, 0);
	redButton.text = "";
	redButton.color = "red";
	redButton.onPress = function () {
		currentColor = "red"; //change brush color to red
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	orangeButton = new Clickable(); //orange
	orangeButton.resize(50, 50);
	orangeButton.locate(CANVAS_WIDTH - 150, 0);
	orangeButton.text = "";
	orangeButton.color = "orange";
	orangeButton.onPress = function () {
		currentColor = "orange"; //change brush color to orange
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	yellowButton = new Clickable(); //yellow
	yellowButton.resize(50, 50);
	yellowButton.locate(CANVAS_WIDTH - 100, 0);
	yellowButton.text = "";
	yellowButton.color = "yellow";
	yellowButton.onPress = function () {
		currentColor = "yellow"; //change brush color to yellow
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	limeButton = new Clickable(); //light green or lime
	limeButton.resize(50, 50);
	limeButton.locate(CANVAS_WIDTH - 50, 0);
	limeButton.text = "";
	limeButton.color = "lime";
	limeButton.onPress = function () {
		currentColor = "lime"; //change brush color to lime
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	greenButton = new Clickable(); //green
	greenButton.resize(50, 50);
	greenButton.locate(CANVAS_WIDTH - 400, 50);
	greenButton.text = "";
	greenButton.color = "green";
	greenButton.onPress = function () {
		currentColor = "green"; //change brush color to green
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	cyanButton = new Clickable(); //cyan
	cyanButton.resize(50, 50);
	cyanButton.locate(CANVAS_WIDTH - 350, 50);
	cyanButton.text = "";
	cyanButton.color = "cyan";
	cyanButton.onPress = function () {
		currentColor = "cyan"; //change brush color to cyan
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	blueButton = new Clickable(); //blue
	blueButton.resize(50, 50);
	blueButton.locate(CANVAS_WIDTH - 300, 50);
	blueButton.text = "";
	blueButton.color = "blue";
	blueButton.onPress = function () {
		currentColor = "blue"; //change brush color to blue
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	navyButton = new Clickable(); //navy
	navyButton.resize(50, 50);
	navyButton.locate(CANVAS_WIDTH - 250, 50);
	navyButton.text = "";
	navyButton.color = "navy";
	navyButton.onPress = function () {
		currentColor = "navy"; //change brush color to navy
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	purpleButton = new Clickable(); //purple
	purpleButton.resize(50, 50);
	purpleButton.locate(CANVAS_WIDTH - 200, 50);
	purpleButton.text = "";
	purpleButton.color = "purple";
	purpleButton.onPress = function () {
		currentColor = "purple"; //change brush color to purple
		currentColor = setOpacity(currentColor, currentOpacity);

	}

	lightpinkButton = new Clickable(); //light pink
	lightpinkButton.resize(50, 50);
	lightpinkButton.locate(CANVAS_WIDTH - 150, 50);
	lightpinkButton.text = "";
	lightpinkButton.color = "lightpink";
	lightpinkButton.onPress = function () {
		currentColor = "lightpink"; //change brush color to light pink
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	fuchsiaButton = new Clickable(); //fuschsia or dark pink
	fuchsiaButton.resize(50, 50);
	fuchsiaButton.locate(CANVAS_WIDTH - 100, 50);
	fuchsiaButton.text = "";
	fuchsiaButton.color = "fuchsia";
	fuchsiaButton.onPress = function () {
		currentColor = "fuchsia"; //change brush color to fuchsia
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	brownButton = new Clickable(); //brown
	brownButton.resize(50, 50);
	brownButton.locate(CANVAS_WIDTH - 50, 50);
	brownButton.text = "";
	brownButton.color = "brown";
	brownButton.onPress = function () {
		currentColor = "brown"; //change brush color to brown
		currentColor = setOpacity(currentColor, currentOpacity);
	}

	eraserButton = new Clickable(); //Eraser
	eraserButton.resize(100, 100);
	eraserButton.locate(CANVAS_WIDTH - 500, 0);
	eraserButton.text = "⌫";
	eraserButton.textSize = 20;
	eraserButton.color = "white";
	eraserButton.onPress = function () {
		currentColor = "#ADD8E6"; //change brush color to background
		currentColor = setOpacity(currentColor, 100);
	}

	/* Back button */
	backButton = new Clickable(); // back button to return back to main menu
	backButton.resize(CANVAS_WIDTH / 10, CANVAS_HEIGHT / 8);
	backButton.locate(((CANVAS_WIDTH / 10)), 0); // position it next to our temporary timer 
	backButton.text = "Back";
	backButton.textSize = 20;

	backButton.onOutside = function () {
		backButton.color = "#DBDBDB";
	}

	backButton.onHover = function () {
		backButton.color = "#B5B5B5";
	}

	backButton.onRelease = function () {
		// reset tool and game variables
		gameStart = false;
		practiceStart = false;
		gameMode = 0;
		timer = 30;
		currentColor = "black";
		currentOpacity = 100;
		displayOpacity.text = currentOpacity + "%";
		lineSize = 15;
		displaySize.text = lineSize + "px";
		
		// reset scores and round number
		playerScores[0] = 0;
		playerScores[1] = 0;
		currentRound = 0;
		playerTurn = 1;
		guessedCorrect = false;
	}

	/* Start game button */
	startButton = new Clickable();	//For prompt
	startButton.resize(CANVAS_WIDTH / 10, CANVAS_HEIGHT / 8);
	startButton.locate((CANVAS_WIDTH * 0.57), (CANVAS_HEIGHT * 0.7)); // position it next to our temporary timer 
	startButton.text = "Start";
	startButton.textSize = 20;

	startButton.onOutside = function () {
		startButton.color = "#DBDBDB";
	}

	startButton.onHover = function () {
		startButton.color = "#B5B5B5";
	}

	startButton.onRelease = function (){
		gameStart = true;
		gameMode = 1;
		fill(173, 216, 230);
		rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		// reset tool and game variables
		timer = 30;
		currentColor = "black";
		currentOpacity = 100;
		displayOpacity.text = currentOpacity + "%";
		lineSize = 15;
		displaySize.text = lineSize + "px";
	}

	/* Save drawing button */
	saveButton = new Clickable();
	saveButton.resize(CANVAS_WIDTH / 10, CANVAS_HEIGHT / 8);
	saveButton.locate((CANVAS_WIDTH - (CANVAS_WIDTH / 10)), (CANVAS_HEIGHT - (CANVAS_HEIGHT / 8)));
	saveButton.text = "Save";
	saveButton.textSize = 20;

	saveButton.onOutside = function () {
		saveButton.color = "#DBDBDB";
	}

	saveButton.onHover = function () {
		saveButton.color = "#B5B5B5";
	}

	saveButton.onRelease = function () {
		save(CANVAS, word[index], "png");
	}
	
	/* Continue game button */
	continueButton = new Clickable(); // takes you back to the prompt screen
	continueButton.resize(CANVAS_WIDTH / 10, CANVAS_HEIGHT / 8);
	continueButton.locate(0, (CANVAS_HEIGHT - (CANVAS_HEIGHT / 8)));
	continueButton.text = "Continue";
	continueButton.textSize = 20;
	
	continueButton.onOutside = function () {
		continueButton.color = "#DBDBDB";
	}

	continueButton.onHover = function () {
		continueButton.color = "#B5B5B5";
	}

	continueButton.onRelease = function () {
		// gameStart = true;
		
		currentRound++;
		if (currentRound >= totalRounds)
		{
			gameMode = 4; // results
		}
		else 
		{
			gameMode = 3;
		}
		
		background(173, 216, 230);
		
		// randomly selects index of word to draw
		index = [Math.floor(Math.random() * word.length)];
		
		if (guessedCorrect) // increment player score if guessed correctly
		{
			playerScores[playerTurn - 1] += pointsEarned; // tracks the scores of all players in an array
		}
		
		playerTurn++; // tracks which player is currently drawing
		if (playerTurn > numPlayers) // loops between player 1 and 2
		{
			playerTurn = 1;
		}
		
		guessedCorrect = false;
	}
	
}

/* Draws Home Page */
function home() {
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
	text('Quick Draw ✏️', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
}

/* Draws Game Page */
function game() {
	if (gameStart){
		// Calculates current time based on time
		if(timerStarted){
			if((millis() - currentTime) > 1000){
				timer--;
				currentTime = millis();
			}
		}else if(!timerStarted){
			currentTime = millis();
			timerStarted = true;
			console.log("started timer");
		}
		if (timer == 0) { //Time runs out, can implement different actions
			stroke('black');
			strokeWeight(1);
			fill('red');
			textSize(30);
			textAlign(CENTER, CENTER);
			text("Time's Up", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50);
			timerStarted = false;
		}
	}
	
	// Create rectangle to hide old text and format timer
	stroke('black');
	strokeWeight(1);
	fill(255, 255, 255)
	rect(0, 0, CANVAS_WIDTH / 10, CANVAS_HEIGHT / 8, 10)

	// Displays number of seconds left 
	stroke('black');
	strokeWeight(1);
	fill(0, 0, 0)
	textSize(20);
	textFont("helvetica");
	textAlign(CENTER, CENTER);
	text(timer, 0, 0, (CANVAS_WIDTH / 10), (CANVAS_HEIGHT / 8));
}

/* Draws User Prompt */
function prompt() {
	// Displays the randomly selected word
	stroke('black');
	strokeWeight(1);
	fill('red');
	textSize(40);
	textAlign(CENTER, CENTER);
	text("Player " + playerTurn + "'s turn!", (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 3));
	text("Your word is: " + word[index], (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2)); // display the drawing prompt

	// add in back button
	backButton.locate((CANVAS_WIDTH / 3), (CANVAS_HEIGHT * 0.7));
	backButton.draw();
	// add in start button
	startButton.draw();
}

/* Draws Results Page showing each user's scores */
function results() {
	// Displays the player scores
	stroke('black');
	strokeWeight(1);
	fill('red');
	textSize(40);
	textAlign(LEFT, CENTER);
	text("Player 1 score: " + playerScores[0], (CANVAS_WIDTH / 3) + 50, (CANVAS_HEIGHT / 3) + 50);
	text("Player 2 score: " + playerScores[1], (CANVAS_WIDTH / 3) + 50, (CANVAS_HEIGHT / 3) + 100);
	
	// add in back button
	backButton.locate((CANVAS_WIDTH / 2) - 50, (CANVAS_HEIGHT * 0.7));
	backButton.draw();
}

/* Ends the drawing game session and calculates points earned if a player correctly the word prompt */
function keyPressed() {
	if (keyCode === ENTER && gameMode === 1 && timer > 0 && guessedCorrect === false)
	{
		guessedCorrect = true;
		pointsEarned = Math.ceil((timer / 30) * 100);
		timer = 0;
	}
}

// draw() is called every frame, think of it as our main() method
// order matters!
function draw() {
	// draws the main menu screen
	if (gameMode == 0) {
		home();
	}

	// draws the gamemode screens
	else if (gameMode === 1 || gameMode === 2) {
		// drawing code
		// can't draw on the tool bar regions or after time runs out
		if ((mouseIsPressed === true) && (mouseY >= 100) && (mouseY <= CANVAS_HEIGHT-100) && (pmouseY >= 100) && (pmouseY <= CANVAS_HEIGHT-100) && (timer > 0))
		{
			stroke(currentColor); //sets color of the line to the current color
			strokeWeight(lineSize); //width of the line drawn
			line(mouseX, mouseY, pmouseX, pmouseY);
		}

		if (gameMode === 1) //starting the game mode
		{
			game();
			//keyPressed();
			if (guessedCorrect)
			{
				stroke('black');
				strokeWeight(1);
				fill('black');
				textSize(20);
				textAlign(CENTER, CENTER);
				text("Player " + playerTurn + " earned " + pointsEarned + " points!", (CANVAS_WIDTH / 4), CANVAS_HEIGHT - 50);
			}
			continueButton.draw();
		}

		// add in back button
		backButton.locate(((CANVAS_WIDTH / 10)), 0);
		backButton.draw();

		// add in save button
		saveButton.draw();

		// add line size buttons
		sizeIncrease.draw();
		sizeDecrease.draw();
		displaySize.draw();

		// add in opacity buttons
		displayOpacity.draw();
		opacityIncrease.draw();
		opacityDecrease.draw();

		// add in eraser button
		eraserButton.draw();

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
	// Draws the word prompt screen
	else if (gameMode === 3) {
		prompt(); 
	}
	// Draws the results / score screen
	else if (gameMode === 4) {
		results();
	}
}

function setOpacity(inputColor, opacityPercent) {
	console.log("setting " + opacityPercent + " opacity for " + inputColor);
	let r = red(inputColor);
	let g = green(inputColor);
	let b = blue(inputColor);
	let a = (opacityPercent * 2.55);
	console.log("a = " + a);
	let returnColor = color(r, g, b, a);
	return returnColor;
}