document.getElementById("startBtn").addEventListener("click", function () {
	var div1 = document.getElementById("game-page");
	var div2 = document.getElementById("instructions");
  
	div1.style.display = "block";
	div2.style.display = "none";
  });
  
  const piles = {
	pile1_e: [3, 5, 6], // Easy, Medium, Hard
	pile2_e: [3, 5, 6], // Easy, Medium, Hard
	pile3_e: [3, 5, 6], // Easy, Medium, Hard
  };
  
  
  const initialPiles = { ...piles }; // Store the initial pile values
  
  let currentPlayer = 1;
  let currentMode = null;
  
  function removeObjects(pileId, count) {
	const gamePage = document.getElementById("game-page");
	const instructions = document.getElementById("instructions");
	if (gamePage.style.display === "block") {
	  if (currentMode === null) {
		alert(
		  "Please select a game mode first. [testing Mode: " + currentMode + "]"
		);
	  } else {
		const pile = piles[pileId];
		if (pile && pile[currentMode] >= count) {
		  pile[currentMode] -= count;
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
	  }
	}
  }
  
  function updateBoard() {
	const board = document.querySelector(`.board.${currentMode}`);
	for (const pileId in piles) {
	  const pileCount = piles[pileId][currentMode];
	  const pileElement = board.querySelector(`#${pileId}`);
	  if (pileElement) {
		const objects = pileElement.getElementsByTagName("img");
		const defaultImage = "./css/imgs/2.png"; // Replace with the path to the default image
  
		for (let i = 0; i < objects.length; i++) {
		  if (i < pileCount) {
			objects[i].src = "./css/imgs/1.png"; // Replace with the path to the desired image
		  } else {
			objects[i].src = defaultImage;
		  }
		}
	  }
	}
  }
  
  function checkGameOver() {
	const board = document.querySelector(`.board.${currentMode}`);
	const totalObjects = Object.values(piles).reduce(
	  (total, pile) => total + pile[currentMode],
	  0
	);
	if (totalObjects === 0) {
	  alert(`Player ${currentPlayer} wins!`);
	  resetGame();
	}
  }
  
  function resetGame() {
	for (const pileId in piles) {
	  piles[pileId] = [...initialPiles[pileId]];
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
  
	function switchMode(mode) {
	  currentMode = mode;
	  for (const board of boards) {
		board.style.display = "none";
	  }
	  document.querySelector(`.board.${mode}`).style.display = "flex";
	  resetGame();
	}
  
	easyBtn.addEventListener("click", function (event) {
	  event.preventDefault();
	  switchMode("easy");
	});
  
	mediumBtn.addEventListener("click", function (event) {
	  event.preventDefault();
	  switchMode("medium");
	});
  
	hardBtn.addEventListener("click", function (event) {
	  event.preventDefault();
	  switchMode("hard");
	});
  
	const objects = document.getElementsByTagName("img");
	for (let i = 0; i < objects.length; i++) {
	  const object = objects[i];
	  object.addEventListener("click", function () {
		const pileId = this.parentElement.id;
		const count = Array.from(this.parentElement.children).indexOf(this) + 1;
		removeObjects(pileId, count);
	  });
	}
  });
  