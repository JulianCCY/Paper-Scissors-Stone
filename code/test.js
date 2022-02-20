//Javascript Assignment 2 
//Rock Paper Scissors
//By Chan Chung Yin, Julian


const game = () => {
    let pScore = 0; //player's score
    let cScore = 0; //computer's score
    let gamecount = 0; //count no.Of rounds
    const gamehistory = []; // save game record
  
    //Click to start / Start page
    const startGame = () => {
      const playBtn = document.querySelector(".intro button");
      const introScreen = document.querySelector(".intro");
      const match = document.querySelector(".match");

      
      // click start button to start the game
      playBtn.addEventListener("click", () => {
        PlaySound1();
        introScreen.classList.add("fadeOut");
        match.classList.add("fadeIn");
        PlaySound2();
      });
    };



    //Play 
    const playMatch = () => {
      const options = document.querySelectorAll(".options button");
      const playerHand = document.querySelector(".player-hand");
      const computerHand = document.querySelector(".computer-hand");
      const hands = document.querySelectorAll(".hands img");
      const restartbutton = document.querySelector(".restart");
      const message = document.querySelector(".winner");
  
      hands.forEach(hand => {
        hand.addEventListener("animationend", function() {
          this.style.animation = "";
        });
      });

      //Computer Option List
      const computerOptions = ["rock", "paper", "scissors"];

      //Player clicks to choose
      for(const option of options){
        option.addEventListener("click",() => {
          PlaySound3();
        
          //hold fist while shaking
          playerHand.src = 'rock.png';
          computerHand.src = 'rock.png'; 
          //Computer choose option by random
          const computerNumber = Math.floor(Math.random() * 3);
          const computerChoice = computerOptions[computerNumber];
          gamecount++;
          console.log("Round ", gamecount);
          console.log("player uses", option.textContent);
          console.log("computer uses", computerChoice);


          //disable the options while shaking hands
            document.getElementById("button1").disabled = true;
            document.getElementById("button2").disabled = true; 
            document.getElementById("button3").disabled = true;
            document.getElementById("restartbutton").disabled = true; 
          //update the screen and show hands
          setTimeout(() => {
            document.getElementById("button1").disabled = false;
            document.getElementById("button2").disabled = false;
            document.getElementById("button3").disabled = false;
            document.getElementById("restartbutton").disabled = false;
            //call compare hands funcation
            compareHands(option.textContent, computerChoice);
            //Update Images
            playerHand.src = option.textContent + '.png';
            computerHand.src = computerChoice + '.png';
          }, 2000);
            //Animation shaking hands
            playerHand.style.animation = "shakePlayer 2s ease";
            computerHand.style.animation = "shakeComputer 2s ease";
  
        });
      }
      
      //restart the game(score, display, and music)
      restartbutton.addEventListener("click", () => {
        PlaySound3();
        console.log("restarting....");
        pScore=0;
        cScore=0;
        gamecount=0;
        updateScore();
        document.getElementById("button1").style.display = "block";
        document.getElementById("button2").style.display = "block";
        document.getElementById("button3").style.display = "block";
        document.getElementById("hands").style.visibility = "visible";
        gamehistory.length = 0;
        message.textContent = "Choose an option";
        playerHand.src = 'rock.png';
        computerHand.src = 'rock.png'; 
        PlaySound2();
      });

    };

    //Check end game
    function check(){
        const gg = document.querySelector(".winner");
        console.log("player gets ", pScore ," point(s)");
        console.log("computer gets ", cScore, " point(s)");
        console.log(gamehistory);
        console.log(" ");
        
        //10 times to win
        if((pScore === 10)&&(cScore < 10)){
            stopPlaySound2();
            PlaySound4();
            playSound6();
            removeElement();
            gg.textContent = "KO! You win!";
            console.log("KO! Players Win");
            console.log("End Game");
  
        }else if((cScore === 10)&&(pScore < 10)){
            stopPlaySound2();
            PlaySound5();
            removeElement();
            gg.textContent = "GGWP...go home and practise again";
            console.log("KO! Computer Win");
            console.log("End Game");
        }

        //three times in a row to win
        //tie game is not counted
        if(gamecount >= 3){ // check starts after 3 rounds
            for(let i=0; i < gamehistory.length; i++){
               if((gamehistory[i] === gamehistory[i+1]) && (gamehistory[i+1] === gamehistory[i+2])){
                 
                   if (gamehistory[i] === "p"){
                    stopPlaySound2();
                    PlaySound4();
                    playSound6();
                    removeElement();
                    gg.textContent = "KO! You win!";
                    console.log("KO! Players Win");
                    console.log("End Game");
                    
                   }else{
                    stopPlaySound2();
                    PlaySound5();
                    removeElement();
                    gg.textContent = "GGWP...go home and practise again";
                    console.log("KO! Computer Win");
                    console.log("End Game");
                   }
               }
            }
        }

    }
    
    //update the scoreboard
    const updateScore = () => {
      const playerScore = document.querySelector(".player-score p");
      const computerScore = document.querySelector(".computer-score p");
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
    };



    //Win, lose or tie? Check Result 
    const compareHands = (playerChoice, computerChoice) => {
      //Update Text
      const winner = document.querySelector(".winner");

      //Checking for a Tie case
      if (playerChoice === computerChoice) {
        winner.textContent = "It is a tie";
        check();
        return;
      }
      //Check for Rock case
      if (playerChoice === "rock") {
        if (computerChoice === "scissors") {
          winner.textContent = "Player Wins";
          pScore++;
          gamehistory.push("p");
          updateScore();
          check();
          return;

        } else {
          winner.textContent = "Computer Wins";
          cScore++;
          gamehistory.push("c");
          updateScore();
          check();
          return;
        }
      
      }

      //Check for Paper case
      if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
          winner.textContent = "Computer Wins";
          cScore++;
          gamehistory.push("c");
          updateScore();
          check();
          return;

        } else {
          winner.textContent = "Player Wins";
          pScore++;
          gamehistory.push("p");
          updateScore();
          check();
          return;
        }
      }

      //Check for Scissors case
      if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
          winner.textContent = "Computer Wins";
          cScore++;
          gamehistory.push("c");
          updateScore();
          check();
          return;

        } else {
          winner.textContent = "Player Wins";
          pScore++;
          gamehistory.push("p");
          updateScore();
          check();
          return;
        }
      }

    };

    function removeElement(){
      //remove button
      document.getElementById("button1").style.display = "none";
      document.getElementById("button2").style.display = "none";
      document.getElementById("button3").style.display = "none";
      
      setTimeout(() => {
      //remove hands images
      document.getElementById("hands").style.visibility = "hidden";
      }, 1500);
      
    }

    //sound effect function
    // sound for home button
    function PlaySound1() {
      const sound1 = document.getElementById("audio");
      sound1.volume = 0.5;
      sound1.play();
    }

    // sound for background music
    function PlaySound2(){
      const sound2 = document.getElementById("audio2");
      sound2.volume = 0.2;
      sound2.loop = true;
      sound2.play();
    }
    
    // stop the background music
    function stopPlaySound2(){
      const stopsound2 = document.getElementById("audio2");
      stopsound2.pause();
    }

    // sound for rock paper and scissors
    function PlaySound3(){
      const sound3 = document.getElementById("audio3");
      sound3.play();
    }

    function PlaySound4(){
      const sound4 = document.getElementById("audio4");
      sound4.volume = 0.4;
      sound4.play();
    }
    
    function PlaySound5(){
      const sound5 = document.getElementById("audio5");
      sound5.play();
    }

    function playSound6(){
      const sound6 = document.getElementById("audio6");
      sound6.play();
    }

    //Is call all the inner function
    startGame();
    playMatch();
  };
  
  //start the game function
  game();