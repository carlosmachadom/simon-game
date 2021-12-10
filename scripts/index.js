"use strict"

/* Adquiriendo tablero de juego */
const gameBoard = document.getElementById('game-board');

/* Adquiriendo botón de inicio Simon */
const startButton = document.getElementById('start-button');

/* Adquiriendo botones de juego Simon HTML */
const blueButton = document.getElementById('blue-button');
const redButton = document.getElementById('red-button');
const yellowButton = document.getElementById('yellow-button');
const greenButton = document.getElementById('green-button');

class simonGame {
    constructor() {
        this.start();
        this.generatingSecuence();
        this.nextLevel();
    }

    start() {
        startButton.style.display = 'none';
        this.level = 1;
        this.colors = {
            blueButton,
            redButton,
            yellowButton,
            greenButton,
        }
    }

    generatingSecuence() {
        this.secuence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    nextLevel() {
        this.illuminateSecuence();
    }

    /* Asociando cada boton con un número */
    transformingNumberToColor(number) {
        switch (number) {
            case 0:
                return 'blueButton';
            case 1:
                return 'redButton';
            case 2:
                return 'yellowButton';
            case 3:
                return 'greenButton';
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
}


function startGame() {
    window.game = new simonGame();
}