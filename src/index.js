

window.addEventListener('load', (event) => {
//variables:
let nextButton;
const memoryGame = new Memory();


//Calling functions:
startGame();
setRound();
showPattern();
hidePatterns();

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
        nextButton= document.querySelector("#nextLevelBtn");

    }


    function setRound() {
        // Calls the setCardsWithPatterns method to get an array of box IDs
        let boxes = memoryGame.setCardsWithPatterns();
        //let cards = [];
    
        // Iterates over each box ID
        for (let i = 0; i < boxes.length; i++) {
           
            document.querySelector(`#${boxes[i]} .front`).style.backgroundImage = "url('img/batman.jpg')";
        }

    }
    

    function showPattern() {
        memoryGame.revealPatterns();
    }

    function hidePatterns() {
        memoryGame.hidePatterns();
    }


    //Handlers:

    function nextButtonHandler() {
        //reset and move on to next level.
        memoryGame.increaseLevel();
        memoryGame.resetPatterns();
        setRound();
        showPattern();
        hidePatterns();
    }




    
});