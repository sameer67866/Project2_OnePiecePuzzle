var downloadTimer;
var timeleft = 300;
function timer() {
  if (timeleft <= -1) {
    clearInterval(downloadTimer);
    
    

  } else {
    document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}

  var audio = new Audio('music1.mp3');
  audio.loop = true;
  audio.play();
  document.onreadystatechange = function () {
    window.onload = function () {
      newShuffle(shuffleTrack);
      downloadTimer = setInterval(timer, 1000);

      const buttons = document.querySelectorAll("button");

      buttons.forEach(button => {
        button.addEventListener("click", () => {
          audio.play();
        });
      });
    };


  if (document.readyState == "complete") {
    var grid = [[0, 0, false], [100, 0, false], [200, 0, false], [300, 0, false],
    [0, 100, false], [100, 100, false], [200, 100, false], [300, 100, false],
    [0, 200, false], [100, 200, false], [200, 200, false], [300, 200, false],
    [0, 300, false], [100, 300, false], [200, 300, false], [300, 300, true]];

    var areaContents = document.getElementById("puzzlearea").children;
    var shuffleTrack = 0;
    var numberCount = 0;
    document.getElementById("overall").insertAdjacentHTML('beforeend', "Number of moves: <span id='numberCount'>0</span>");

    function checkEnd() {
      var check = ""
      var arr = document.getElementById("puzzlearea").children;
      for (i = 0; i < arr.length-1; i++) {
        check = check + arr[i].innerHTML
      };
      if (check == "123456789101112131415" && numberCount > 20) {
        gameWon()
        return true;
      }else if(timeleft <= -1 ) {
        gameLost()
        return false;


      }
    }

    function reload() {
      alert("hey")
    }

    function newShuffle(shuffleTrack) {
      timeleft = 300;
      timer();
      var rand = getElement();
      shiftPiece.call(areaContents[rand]);
      if (shuffleTrack < 199) {
        shuffleTrack = shuffleTrack + 1;
        newShuffle(shuffleTrack)
      }
      else {
        shuffleTrack = 0;
        numberCount = 0;
        document.getElementById("numberCount").innerHTML = numberCount;
      }
    }
	
	function gameWon() {
      alert("Congratulations! You have solved the puzzle!");
	  document.getElementById("overall").outerHTML= "";
      document.getElementById("gameWon").innerHTML = "<div>" +
        "<img onClick='location.reload();' src='puzzlePic.png'/></div><br/><h1 class='gameWon' onClick='location.reload();'>Congratulation! You WON!</h1><br/><img src='won.gif'/>";
    }
  
	function gameLost() {
      alert("You ran out of time please try again.");
    document.getElementById("overall").outerHTML= "";
      document.getElementById("gameLost").innerHTML = "<div>" +
        "<img onClick='location.reload();' src='puzzlePic.png'/></div><br/><h1 class='gameLost' onClick='location.reload();'>You ran out of time please try again </h1><br/><img src='defeat.gif'/>";
    }
  
  
	document.getElementById("solvePuzzle").onclick = function () {
    gameWon();
    }
	

    function getElement() {
      var movablePieces = getActiveCells();
      return movablePieces[Math.floor(Math.random() * movablePieces.length)];
    }

    function openBlock() {
      for (i = 0; i < grid.length; i++) {
        if (grid[i][2] == true) {
          return i;
        }
      }
    }

    function getActiveCells() {
      var open = openBlock()
      var movablePieces = [open - 4, open - 1, open + 1, open + 4]
      var count = movablePieces.length;
      for (i = 0; i < count; i++) {
        if (movablePieces[i] < 0) { movablePieces[i] = null }
        if (movablePieces[i] > 15) { movablePieces[i] = null }
        if (open == 3 || open == 7 || open == 11) { movablePieces[movablePieces.indexOf(open + 1)] = null }
        if (open == 4 || open == 8 || open == 12) { movablePieces[movablePieces.indexOf(open - 1)] = null }
      }
      movablePieces = movablePieces.filter(function (val) { return val !== null; })
      return movablePieces;
    }

    function addHover() {
      this.className = this.className + " puzzlepiecehover";
    }

    function removeHover() {
      this.className = "puzzlepiece";
    }

    function shiftPiece() {
      numberCount = numberCount + 1;
      document.getElementById("numberCount").innerHTML = numberCount;
      this.style.left = grid[openBlock()][0] + "px";
      this.style.top = grid[openBlock()][1] + "px";
      this.className = "puzzlepiece";
      var collection = Array.prototype.slice.call(areaContents)
      var movedBlock = collection.indexOf(this)
      var openBlockIndex = collection.indexOf(areaContents[openBlock()])

      var switchVariable = collection[movedBlock];
      collection[movedBlock] = collection[openBlockIndex];
      collection[openBlockIndex] = switchVariable;

      document.getElementById("puzzlearea").innerHTML = ""
      for (i = 0; i < collection.length; i++) {
        document.getElementById("puzzlearea").innerHTML = document.getElementById("puzzlearea").innerHTML + collection[i].outerHTML;
      }
      grid[openBlock()][2] = false;
      grid[movedBlock][2] = true;
      removeEventListeners(getActiveCells());
      if (checkEnd() == true) { return }
      addEventListeners(getActiveCells());
    }

    function addEventListeners(movablePieces) {
      for (i = 0; i < movablePieces.length; i++) {
        areaContents[movablePieces[i]].addEventListener("mouseover", addHover, false);
        areaContents[movablePieces[i]].addEventListener("mouseout", removeHover, false);
        areaContents[movablePieces[i]].addEventListener("click", shiftPiece);
      }
    }

    function removeEventListeners(movablePieces) {
      for (i = 0; i < movablePieces.length; i++) {
        areaContents[movablePieces[i]].removeEventListener("mouseover", addHover, false);
        areaContents[movablePieces[i]].removeEventListener("mouseout", removeHover, false);
        areaContents[movablePieces[i]].removeEventListener("click", shiftPiece, false);
      }
    }

    function setArea() {
      var x = 0;
      var y = 0;
      for (i = 0; i < areaContents.length; i++) {
        areaContents[i].setAttribute("class", "puzzlepiece");
        areaContents[i].style.top = y + "px";
        areaContents[i].style.left = x + "px";
        areaContents[i].style.backgroundPosition = "-" + x + "px " + "-" + y + "px";
        if (x == 300) {
          var y = y + 100;
          var x = 0;
        }
        else { var x = x + 100; }
      }
      document.getElementById("puzzlearea").innerHTML = document.getElementById("puzzlearea").innerHTML + "<div class='empty'></div>"
      addEventListeners(getActiveCells());

    }
	
    document.getElementById("shufflebutton").onclick = function () {
      newShuffle(shuffleTrack);
    }
    setArea();

  }
}