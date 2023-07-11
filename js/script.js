document.getElementById("startBtn").addEventListener("click", function() {
    var div1 = document.getElementById("game-page");
    var div2 = document.getElementById("instructions");
  
    if (div1.style.display === "none") {
      div1.style.display = "block";
      div2.style.display = "none";
    } else {
      div1.style.display = "none";
      div2.style.display = "block";
    }
  });

  const piles = {
    pile1: 3,
    pile2: 3,
    pile3: 3,
    pile4: 5,
    pile5: 5,
    pile6: 5,
    pile7: 6,
    pile8: 6,
    pile9: 6
  };

  let currentPlayer = 1;
  let currentMode = null;

  function removeObjects(pileId, count) {
    const pile = piles[pileId];
    if (pile >= count) {
      piles[pileId] -= count;
      updateBoard();
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      checkGameOver();
    } else {
      alert("Invalid move! Please select a valid number of objects to remove.");
    }
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

  document.addEventListener("DOMContentLoaded", function() {
    const easyBtn = document.getElementById("easyBtn");
    const mediumBtn = document.getElementById("mediumBtn");
    const hardBtn = document.getElementById("hardBtn");

    const boards = document.querySelectorAll(".board");
    for (const board of boards) {
      board.style.display = "none";
    }

    easyBtn.addEventListener("click", function() {
      currentMode = "easy";
      for (const board of boards) {
        board.style.display = "none";
      }
      document.querySelector(".board.easy").style.display = "flex";
      resetGame();
    });

    mediumBtn.addEventListener("click", function() {
      currentMode = "medium";
      for (const board of boards) {
        board.style.display = "none";
      }
      document.querySelector(".board.medium").style.display = "flex";
      resetGame();
    });

    hardBtn.addEventListener("click", function() {
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
      object.addEventListener("click", function() {
        const pileId = this.parentElement.id;
        const count = Array.from(this.parentElement.children).indexOf(this) + 1;
        removeObjects(pileId, count);
      });
    }
  });