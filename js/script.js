document.getElementById("startBtn").addEventListener("click", function () {
	var div1 = document.getElementById("game-page");
	var div2 = document.getElementById("instructions");

	div1.style.display = "block";
	div2.style.display = "none";
});

const piles = {
	pile1_e: 3,
	pile2_e: 3,
	pile3_e: 3,
	pile4_m: 5,
	pile5_m: 5,
	pile6_m: 5,
	pile7_h: 6,
	pile8_h: 6,
	pile9_h: 6,
};

//when you click the start button the first time the name and difficulty form should pop up.
//if the names field and difficult have been field then show the game board
//else pop up saying to enter the information.

//once the game board is visible make it possible for the player to take pieces. when they click end turn switch over to the other players turn with the selected pieces gone from the board

const initialPiles = { ...piles }; // Store the initial pile values

let currentPlayer = 1;
let currentMode = null;

function removeObjects(pileId, count) {
	const gamePage = document.getElementById("game-page");
	const instructions = document.getElementById("instructions");
	if (currentMode != null && gamePage.style.display === "block") {
		const pile = piles[pileId];
		if (pile >= count) {
			piles[pileId] -= count;
			updateBoard();
			currentPlayer = currentPlayer === 1 ? 2 : 1;
			checkGameOver();
		} else {
			alert(
				"Invalid move! Please select a valid number of objects to remove. [testing Mode: " +
					currentMode +
					"]"
			);
		}
	} else if (currentMode === null & instructions != block) {
		alert(
			"Please select a game mode first. [testing Mode: " + currentMode + "]"
		);
	}
	//   } else {
	//     alert("Please click the 'Start Game' button to begin the game.");
	//   }
}

function updateBoard() {
	const board = document.querySelector(`.board.${currentMode}`);
	for (const pileId in piles) {
		const pile = piles[pileId];
		const pileElement = board.querySelector(`#${pileId}`);
		const objects = pileElement.getElementsByTagName("div");
		for (let i = 0; i < objects.length; i++) {
			if (i < pile) {
				objects[i].style.visibility = "visible";
			} else {
				objects[i].style.visibility = "hidden";
			}
		}
	}
}

function checkGameOver() {
	const board = document.querySelector(`.board.${currentMode}`);
	const totalObjects = Object.values(piles).reduce((a, b) => a + b, 0);
	if (totalObjects === 0) {
		alert(`Player ${currentPlayer} wins!`);
		resetGame();
	}
}

function resetGame() {
	for (const pileId in piles) {
		piles[pileId] = initialPiles[pileId];
	}
	currentPlayer = 1;
	updateBoard();
}

document.addEventListener("DOMContentLoaded", function () {
	const easyBtn = document.getElementById("easyBtn");
	const mediumBtn = document.getElementById("mediumBtn");
	const hardBtn = document.getElementById("hardBtn");

	const boards = document.querySelectorAll(".board");
	for (const board of boards) {
		board.style.display = "none";
	}

	easyBtn.addEventListener("click", function () {
		currentMode = "easy";
		for (const board of boards) {
			board.style.display = "none";
		}
		document.querySelector(".board.easy").style.display = "flex";
		resetGame();
	});

	mediumBtn.addEventListener("click", function () {
		currentMode = "medium";
		for (const board of boards) {
			board.style.display = "none";
		}
		document.querySelector(".board.medium").style.display = "flex";
		resetGame();
	});

	hardBtn.addEventListener("click", function () {
		currentMode = "hard";
		for (const board of boards) {
			board.style.display = "none";
		}
		document.querySelector(".board.hard").style.display = "flex";
		resetGame();
	});

	const objects = document.getElementsByTagName("div");
	for (let i = 0; i < objects.length; i++) {
		const object = objects[i];
		object.addEventListener("click", function () {
			const pileId = this.parentElement.id;
			const count = Array.from(this.parentElement.children).indexOf(this) + 1;
			removeObjects(pileId, count);
		});
	}
});
