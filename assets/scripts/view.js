const FRONT = 'card-front'
const BACK = 'card-back'
const CARD = 'card'
const ICON = 'icon'



starGame()

// 4 -  parametros para iniciar o jogo
function starGame() {

    initializeCards(game.createCardsFromTechs())
}

// 6 - função que cria o tabuleiro do jogo
function initializeCards(cards) {
    let gameBoard = document.querySelector('.gameBoard')
    gameBoard.innerHTML = ''

    game.cards.forEach(card => {

        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)

    });
}

// 7 - função que cria o conteudo da carta, baseado no front ou back da mesma
function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)

}

// 8 - função que cria o lado especifico da carta, front ou back
function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)

    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = './assets/imagens/' + card.icon + '.png'
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = '&lt/&gt'
    }

    element.appendChild(cardElementFace)
}



// 9 - função que vira a carta ao clicar nela
function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add('flip')
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById('gameOver')
                    gameOverLayer.style.display = 'flex'
                }
            } else {

                setTimeout(() => {
                    let firsCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firsCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 1000)
            }
        }
    }
}