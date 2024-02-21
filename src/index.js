

window.addEventListener('load', (event) => {
//variables:
let nextButton;
let lastElementClicked; ///DO NO DELETE VERY IMPORTANT!!!!


const memoryGame = new Memory();


//Calling functions:
startGame();
setRound();
showPattern();
playersTurn();




//eventslisteners:
nextButton.addEventListener('click', nextButtonHandler);





    //Functions:

    function startGame() {

        let html = '';

        for  (let i = 0; i < 24; i++) {
            html += `
            <div class="card" id="b${i+1}">
            <div class="back"></div>
            <div class="front"></div>
            </div>
            `;
    
        document.querySelector('#memory-board').innerHTML = html;
        }
       
        document.querySelector('#nextLevelBtnDiv').innerHTML =  `<button id="nextLevelBtn">Next Level</button>`;
        document.querySelector('#levels-completed').innerHTML = `${memoryGame.level}`;
        document.querySelector('#remaining-lives').innerHTML = `${memoryGame.lives}`;
        nextButton= document.querySelector("#nextLevelBtn");


    }


    function setRound() {
        // Calls the setCardsWithPatterns method to get an array of box IDs
        let boxes = memoryGame.setCardsWithPatterns();
    
        // Iterates over each box ID
        for (let i = 0; i < boxes.length; i++) {
           
            document.querySelector(`#${boxes[i]} .front`).style.backgroundImage = "url('img/batman.jpg')";
        }

    }
    

    function showPattern() {
        memoryGame.revealPatterns();
    }


    function playersTurn() {
        
        nextButton.removeEventListener('click', nextButtonHandler);
    
       
        const boxes = document.querySelectorAll('.card');
        
        boxes.forEach(box => {
            box.addEventListener('click', playersChoiceHandler);
        });
    }

    function checkLevelCompletion() {
        // Check if the completed level is 10
        if (memoryGame.level === 3) {
            // Hide the memoryscore div
            document.querySelector('#memory-board').style.display = 'none';

            //Hide the button div:
            document.querySelector('#nextLevelBtnDiv').style.display = 'none';
            // Show the winningMessage div
            document.querySelector('#winningMessage').style.display = 'block';
            memoryGame.level--;
        }
    }

    function checkLives() {
        // Check if the completed level is 10
        if (memoryGame.lives === 0) {
            // Hide the memoryscore div
            document.querySelector('#memory-board').style.display = 'none';

            //Hide the button div:
            document.querySelector('#nextLevelBtnDiv').style.display = 'none';
            // Show the winningMessage div
            document.querySelector('#losingMessage').style.display = 'block';
            
        }
    }
    


    //Handlers:

    function nextButtonHandler() {
        //reset and move on to next level.
        // Check for game completion after updating the level
        checkLevelCompletion();
        memoryGame.level++;
        lastElementClicked.classList.toggle('turned');
        memoryGame.resetPatterns();
        setRound();
        showPattern();
        playersTurn();

        // Update the level display
        document.querySelector('#levels-completed').innerHTML = `${memoryGame.level}`;

    }

    function playersChoiceHandler(event) {
        const playerChoiceId = event.currentTarget.id;
        const cardElement = document.querySelector(`#${playerChoiceId}`);
    
        // Check if the card hasn't been clicked before and is part of the pattern
        if (!memoryGame.playerChoices.includes(playerChoiceId) && memoryGame.pattern.includes(playerChoiceId)) {
            cardElement.classList.toggle('turned');
            memoryGame.playerChoices.push(playerChoiceId);
            console.log('Player clicked on div with ID:', playerChoiceId);
        } else if (!memoryGame.pattern.includes(playerChoiceId)) {
            
            console.log('Player clicked on the wrong div with ID:', playerChoiceId);
            alert('You chose the wrong card and lost a life. The level will be reset.');
            
            memoryGame.lives--;
            document.querySelector('#remaining-lives').innerHTML = `${memoryGame.lives}`;
            
            // Reset the level
            memoryGame.playerChoices.forEach((choice) => {
                console.log('here is the choice',choice);
                const cardElement = document.querySelector(`#${choice}`);
                cardElement.classList.toggle('turned');
            });
            checkLives();
            setRound();
            showPattern();
            return; // Early return since the level is reset
        }
    

        if (memoryGame.playerChoices.length === memoryGame.pattern.length) {
            // Check if all selected choices are in the pattern
            if (memoryGame.playerChoices.every(choice => memoryGame.pattern.includes(choice))) {
                // cardElement.classList.toggle('turned');
                memoryGame.playerChoices.forEach((choice, index, array) => {
                    console.log('here is the choice',choice);
                    const cardElement = document.querySelector(`#${choice}`);
                    cardElement.classList.toggle('turned');
                });
                cardElement.classList.toggle('turned');
                // Delay the alert to allow the UI to update
                setTimeout(() => {
                    alert('Level cleared! Press the Next Level button.');

                    // Cancel all event listeners for the cards
                    const boxes = document.querySelectorAll('.card');
                    boxes.forEach(box => {
                        box.removeEventListener('click', playersChoiceHandler);
                    });
                    
                    nextButton.addEventListener('click', nextButtonHandler);
                }, 1000); // Delay of 300 milliseconds
                lastElementClicked = document.querySelector(`#${playerChoiceId}`);
                memoryGame.playerChoices = [];
            }
        
        }
    
    }




});