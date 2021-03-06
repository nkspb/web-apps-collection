let numColors = 6;
let colors = [];
// color to guess
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector(".colorDisplay");
let messageDisplay = document.querySelector(".message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector(".reset");
let modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setupModeButtons();
	setupSquares();
	reset();

	resetButton.addEventListener("click", function() {
		reset();
	});
}

function setupModeButtons() {
	// mode buttons event listeners
	for (let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numColors = 3 : numColors = 6;
			reset();
		});
	}
}

function setupSquares() {
	for (let i = 0; i < squares.length; i++) {
	// add click listeners to squares
		squares[i].addEventListener("click", function() {
			// get color of clicked square
			let clickedColor = this.style.backgroundColor;

			// compare color of square with pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct";
				changeColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again?";
			} else {
				// fade square
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}		
}

function reset() {
	// Generate new colors
	colors = generateRandomColors(numColors);
	// Pick a new random color
	pickedColor = pickColor();
	// Update colorDisplay to pickedColor
	colorDisplay.textContent = pickedColor;
	// clear message display
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	// Update color of squares
	for (let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];	
		} else {
			squares[i].style.display = "none";
		}
		
	}
	h1.style.backgroundColor = "steelblue";
}

function changeColors(color) {
	for(let i = 0; i < squares.length; i++) {
		// fill each square with color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	let random = Math.floor(Math.random() * colors.length);
	// return random color from colors
	return colors[random];
}

function generateRandomColors(num) {
	let arr = [];
	// repeat num times
	for (let i = 0; i < num; i++) {
		// push random color into arr
		arr.push(randomColor());
	}

	return arr;
}

function randomColor() {
	// generate 3 random rgb components
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}