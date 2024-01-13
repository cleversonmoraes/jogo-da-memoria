let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    techs: ['bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: null,

    // 10 - identifica se a carta foi selecionada ou não
    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0]

        if (card.flipped || this.lockMode) {
            return false
        }

        if (!this.firstCard) {
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        } else {
            this.secondCard = card
            this.lockMode = true
            this.secondCard.flipped = true
            return true
        }
    },

    // 11 - verifica se as cartas selecionadas são iguais
    checkMatch: function () {

        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon === this.secondCard.icon


    },

    // 12 - libera as cartas pra próxima jogada
    clearCards: function () {
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    // 13 - garante que as cartas poderao ser clicadas novamente
    unflipCards: function () {
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    // 14 - verifica se houve um game Over
    checkGameOver: function () {

        return this.cards.filter(card => !card.flipped).length == 0
    },



    // 1 - função que cria um array com as tecnologias presentes no game
    createCardsFromTechs: function () {

        this.cards = []

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTechs(tech))
        })

        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards()

        return this.cards
    },


    // 2 - função que cria pares de cartas para o jogo da memória
    createPairFromTechs: function (tech) {

        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }]
    },

    // 3 - função que cria um ID randomico
    createIdWithTech: function (tech) {

        return tech + parseInt(Math.random() * 1000)
    },

    // 5 - função que mistura as cartas
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length
        let randomIndex = 0

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
}

function restart() {
    game.clearCards()
    starGame()
    let gameOverLayer = document.getElementById('gameOver')
    gameOverLayer.style.display = 'none'
}