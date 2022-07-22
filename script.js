const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
var glimit = 0;
var gpontos = 10;
var gjogada = 0;
var gfinal = false;
var gfase = 1;
var gvida = 3;
var ggameover = false;



//função para virar carta
function flipCard() {
	
	
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
		playv();
        return;
		
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
	
	
	
}



//função que checa se as cartas são iguais
function checkForMatch() {
	playv();
	
	gjogada = gjogada+1; 
	document.getElementById("jogadas").innerHTML = "Jogadas : " + gjogada;
	
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
		
		setTimeout(() => {
        playa();
        }, 1000);
		
		
        return;
		
    }

    unflipCards();
}



//função que desabilita as cartas
function disableCards() {
	   
	firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
		
    resetBoard();
	
	
	glimit = glimit+1;
	
	// pontos 
	document.getElementById("acertos").innerHTML = "Acertos : " + glimit;
	document.getElementById("pontos").innerHTML = "Pontos : " + (glimit * gpontos);
	
	
	if (glimit == 6){		
		setTimeout(() => {
			playw();
			gfinal = true;
		}, 1000);
		
		setTimeout(() => {
			shuffle();
		}, 10000);
			
		
	}
	
	
	
	
}



//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
		playf();
        resetBoard();
    }, 1500);
}



//função que reseta o tabuleiro
function resetBoard() {
	
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}




//função que embaralha as cartas
(function shuffle() {
		
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
		
    })
})();



if (ggameover == false) {
	//adiciona evento de clique na carta
	cards.forEach((card) => {
		card.addEventListener('click', flipCard)
	});
}



// aplicar sistema de fases 
// contador reverso de tentativas 
// sistema de vidas 
// powerup 

