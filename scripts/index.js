"use strict"

/* Adquiriendo tablero de juego */
const gameBoard = document.getElementById('game-board');

/* Adquiriendo botón de inicio Simon */
const startButton = document.getElementById('start-button');

/* Adquiriendo botones de juego Simon HTML */
const blue = document.getElementById('blue');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const green = document.getElementById('green');

/* Determinando el último nivel */
const lastlevel = 10;

/* Creando la clase simonGame para crear toda la lógica del juego */
class simonGame {
    /* el constructor almacena los metodos más importantes o principales del juego */
    constructor() {
        this.start = this.start.bind(this);
        this.start();
        this.generatingSecuence();
        setTimeout(() => {
            this.nextLevel();
        }, 1500);
    }

    start() {
        this.nextLevel = this.nextLevel.bind(this);
        this.chooseColor = this.chooseColor.bind(this);
        this.restoreStartButton();
        this.level = 1;
        this.colors = {
            blue,
            red,
            yellow,
            green,
        }
    }

    restoreStartButton() {
        if(startButton.classList.contains('hide')) {
            startButton.classList.remove('hide');
        } else {
            startButton.classList.add('hide');
        }
    }

    generatingSecuence() {
        this.secuence = new Array(lastlevel).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    nextLevel() {
        this.subLevel = 0;
        this.illuminateSecuence();
        this.addClickEvents();
    }

    /* Asociando cada boton con un número */
    transformingNumberToColor(number) {
        switch (number) {
            case 0:
                return 'blue';
            case 1:
                return 'red';
            case 2:
                return 'yellow';
            case 3:
                return 'green';
        }
    }

    transformingColorToNumber(color) {
        switch (color) {
            case 'blue':
                return 0;
            case 'red':
                return 1;
            case 'yellow':
                return 2;
            case 'green':
                return 3;
        }
    }

    illuminateSecuence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.transformingNumberToColor(this.secuence[i]);

            setTimeout(() => this.illuminateColor(color), 1000 * i);
        }
    }

    illuminateColor(color) {
        
        this.colors[color].classList.add('light');

        setTimeout(() => this.offColor(color), 350);
    }

    offColor(color) {
        this.colors[color].classList.remove('light');
    }

    addClickEvents() {
        this.colors.blue.addEventListener('click', this.chooseColor);
        this.colors.red.addEventListener('click', this.chooseColor);
        this.colors.yellow.addEventListener('click', this.chooseColor);
        this.colors.green.addEventListener('click', this.chooseColor);
    }

    deleteClickEvents() {
        this.colors.blue.removeEventListener('click', this.chooseColor);
        this.colors.red.removeEventListener('click', this.chooseColor);
        this.colors.yellow.removeEventListener('click', this.chooseColor);
        this.colors.green.removeEventListener('click', this.chooseColor);
    }

    chooseColor(event) {
        const colorName = event.target.dataset.color;
        const numberColor = this.transformingColorToNumber(colorName);

        this.illuminateColor(colorName);
        if (numberColor === this.secuence[this.subLevel]) {
            this.subLevel++;
            if (this.subLevel === this.level) {
                this.level++;
                this.deleteClickEvents();

                if (this.level === (lastlevel + 1)) {
                    this.youWon();
                } else {
                    setTimeout(this.nextLevel, 2000);
                }
            }
        } else {
            this.youLose();
        }
    }

    youWon() {
        swal('Friend', 'Congratulations!, you Won', 'success')
            .then(() => {
                this.start();
            });
    }

    youLose() {
        swal('Friend', 'Sorry, you lose :\'(', 'error')
            .then(() => {
                this.deleteClickEvents();
                this.start();
            });
    }
}


function startGame() {
    window.game = new simonGame();
}