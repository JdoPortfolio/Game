class Memory {
    constructor() {
        this.cards = [
            { name: 'peanuts', img: 'peaunuts.png' },
            { name: 'wrongcard', img: 'wrongcard.png' },
            ]
        this.pattern = [],
        this.boxes = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12', 'b13', 'b14', 'b15', 'b16', 'b17', 'b18', 'b19', 'b20', 'b21', 'b22', 'b23', 'b24'],
        this.level = 1;
    }
    //Methods:
    setCardsWithPatterns() {
        console.log('Setting cards with patterns, level:', this.level); // Check method call and level
        let availableBoxes = [...this.boxes]; 
        for(let i = 0; i < this.level; i++) {
            const randomIndex = Math.floor(Math.random() * availableBoxes.length);
            const selectedBox = this.boxes[randomIndex];
            console.log('Selected box:', selectedBox); // Which box is selected?
            this.pattern.push(selectedBox);
            availableBoxes.splice(randomIndex, 1);
        }
        console.log('Final pattern:', this.pattern); // What does the pattern look like at the end?
        return this.pattern;
    }

    increaseLevel() {
        this.level ++;
    }


    revealPatterns() {
    this.pattern.forEach((patternId) => {
        const cardElement = document.querySelector(`#${patternId}`);
        // const backElement = document.querySelector(`#${patternId}`);
        cardElement.classList.toggle('turned');
        console.log(cardElement);

        setTimeout(() => {
            cardElement.classList.toggle('turned');
            // backElement.classList.toggle('turned')
        }, 1500)
 

        });
    }

    hidePatterns() {
        console.log("HI from patternsv====>", this.pattern)
        // this.pattern.forEach((patternId) => {
        //     const cardElement = document.querySelector(`#${patternId} .front`);
        //     const backElement = document.querySelector(`#${patternId} .back`);
        //     cardElement.classList.toggle('turned');
        //     console.log(cardElement);
        //     setTimeout(() => {
        //         cardElement.classList.toggle('turned');
        //         backElement.classList.toggle('turned')
        //     }, 500)
        //     });
    }

    resetPatterns() {
        this.pattern.forEach((patternId) => {
            const cardElement = document.querySelector(`#${patternId} .back`);
            const frontElement = document.querySelector(`#${patternId} .front`);
            cardElement.classList.toggle('turned');
            cardElement.style.backgroundImage = 'none';
            console.log(cardElement);
            setTimeout(() => {
                cardElement.classList.toggle('turned');
                frontElement.classList.toggle('turned')
            }, 500)
            });

        this.pattern = [];
    }



}