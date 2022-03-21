/*
const startGame = () => {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';
    let scoreDiv = document.getElementById('score');
    const level = document.getElementById('level').value;
    let score = 0, difficulty;

    if(level == 'easy') difficulty = 4;
    else if(level == 'medium') difficulty = 6;
    else if(level == 'hard') difficulty = 8;
    else if(level == 'expert') difficulty = 10;

    let randomFrontFace = [];
    let reader = new FileReader();
    reader.onload = function() {
      randomFrontFace.innerText = reader.result;
    };
    reader.readAsText(file, "UTF-8")
    let selectedFrontFace= [];

    for(let i=(difficulty*difficulty)/2; i>0; --i) {
      let usedRandomFrontFace = brands2.splice(Math.floor(randomFrontFace.random() * randomFrontFace.length), 1);

        selectedFrontFace.push(usedRandomFrontFace);
        selectedFrontFace.push(usedRandomFrontFace);
    }

    let section = document.createElement('section');
    section.classList.add('memory-game');


    for (let i=difficulty; i>0; --i) {
        let row = document.createElement('div');
        row.setAttribute('class', 'memory-card');
        row.setAttribute('name', `${selectedFrontFace[i]}`)

        let backFace = document.createElement('img');
        backFace.setAttribute('class', 'back-face');
        backFace.setAttribute('src', 'img/cat.svg');
        backFace.setAttribute('alt', 'BackCat')

        for(let j=difficulty; j>0; --j) {
            let card = document.createElement('img');
            card.setAttribute('class', 'front-face');
            let imgSrc = `${selectedFrontFace[i]}`
            card.setAttribute('src', `${imgSrc}`)
            card.setAttribute('alt', `${imgSrc}`)

            card.classList.add('fa-' + selectedFrontFace.splice(Math.floor(Math.random() * selectedBrand.length), 1));

            card.addEventListener('click', function(event) {
                let revealed = document.querySelectorAll('.isShown');

                if(revealed.length == 2) {
                    if(revealed[0].getAttribute('class') == revealed[1].getAttribute('class')) {
                        revealed[0].classList.add('isMatched');
                        revealed[1].classList.add('isMatched');
                    }
                    revealed[0].classList.remove('isShown');
                    revealed[1].classList.remove('isShown');
                }
                event.currentTarget.classList.add('isShown');

                if(revealed.length == 1) {
                    if(revealed[0].getAttribute('class') == event.currentTarget.getAttribute('class'))
                        ++score;
                }

                scoreDiv.innerHTML = `Score ${score}`;

                if(score == (difficulty*difficulty)/2) {
                    alert('Congrats!! You Win!!');
                    window.location.reload();
                }
            })

            row.append(col);
        }
        gameContainer.append(row);
    }

    return false;
}



*/






const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));