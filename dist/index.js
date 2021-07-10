const BOARD = document.querySelector('#board')
const SPOTS = document.querySelectorAll('.spot')
const MESSAGE = document.querySelector('#message')
const BUTTON = document.querySelector('button')

const PLAYER = 'X'
const COMPUTER = 'O'

let isPlaying = true

const checkResult = () => {
    if (SPOTS[0].textContent === PLAYER && SPOTS[1].textContent === PLAYER && SPOTS[2].textContent === PLAYER || SPOTS[3].textContent === PLAYER && SPOTS[4].textContent === PLAYER && SPOTS[5].textContent === PLAYER || SPOTS[6].textContent === PLAYER && SPOTS[7].textContent === PLAYER && SPOTS[8].textContent === PLAYER || SPOTS[0].textContent === PLAYER && SPOTS[3].textContent === PLAYER && SPOTS[6].textContent === PLAYER || SPOTS[1].textContent === PLAYER && SPOTS[4].textContent === PLAYER && SPOTS[7].textContent === PLAYER || SPOTS[2].textContent === PLAYER && SPOTS[5].textContent === PLAYER && SPOTS[8].textContent === PLAYER || SPOTS[0].textContent === PLAYER && SPOTS[4].textContent === PLAYER && SPOTS[8].textContent === PLAYER || SPOTS[2].textContent === PLAYER && SPOTS[4].textContent === PLAYER && SPOTS[6].textContent === PLAYER) {
        MESSAGE.textContent = 'You Won!'
        BUTTON.style.display = 'block'
        isPlaying = false
    } else if (SPOTS[0].textContent === COMPUTER && SPOTS[1].textContent === COMPUTER && SPOTS[2].textContent === COMPUTER || SPOTS[3].textContent === COMPUTER && SPOTS[4].textContent === COMPUTER && SPOTS[5].textContent === COMPUTER || SPOTS[6].textContent === COMPUTER && SPOTS[7].textContent === COMPUTER && SPOTS[8].textContent === COMPUTER || SPOTS[0].textContent === COMPUTER && SPOTS[3].textContent === COMPUTER && SPOTS[6].textContent === COMPUTER || SPOTS[1].textContent === COMPUTER && SPOTS[4].textContent === COMPUTER && SPOTS[7].textContent === COMPUTER || SPOTS[2].textContent === COMPUTER && SPOTS[5].textContent === COMPUTER && SPOTS[8].textContent === COMPUTER || SPOTS[0].textContent === COMPUTER && SPOTS[4].textContent === COMPUTER && SPOTS[8].textContent === COMPUTER || SPOTS[2].textContent === COMPUTER && SPOTS[4].textContent === COMPUTER && SPOTS[6].textContent === COMPUTER) {
        MESSAGE.textContent = 'Computer Won!'
        BUTTON.style.display = 'block'
        isPlaying = false
    } else if (SPOTS[0].textContent !== '' && SPOTS[1].textContent !== '' && SPOTS[2].textContent !== '' && SPOTS[3].textContent !== '' && SPOTS[4].textContent !== '' && SPOTS[5].textContent !== '' && SPOTS[6].textContent !== '' && SPOTS[7].textContent !== '' && SPOTS[8].textContent !== '' && SPOTS[0].textContent !== '' && SPOTS[3].textContent !== '' && SPOTS[6].textContent !== '' && SPOTS[1].textContent !== '' && SPOTS[4].textContent !== '' && SPOTS[7].textContent !== '' && SPOTS[2].textContent !== '' && SPOTS[5].textContent !== '' && SPOTS[8].textContent !== '' && SPOTS[0].textContent !== '' && SPOTS[4].textContent !== '' && SPOTS[8].textContent !== '' && SPOTS[2].textContent !== '' && SPOTS[4].textContent !== '' && SPOTS[6].textContent !== '') {
        MESSAGE.textContent = 'Its A Draw!'
        BUTTON.style.display = 'block'
        isPlaying = false
    }
}

BOARD.addEventListener('click', e => {
    if (e.target.classList.contains('spot') && e.target.textContent === '' && isPlaying) {
        e.target.textContent = PLAYER

        checkResult()

        if (MESSAGE.textContent === '') {
            let randomIndex = Math.round(Math.random() * (SPOTS.length - 1))

            if (SPOTS[randomIndex].textContent === '') {
                SPOTS[randomIndex].textContent = COMPUTER
            } else {
                for (let i = 0; i < 1000; i++) {
                    randomIndex = Math.round(Math.random() * (SPOTS.length - 1))

                    if (SPOTS[randomIndex].textContent === '') {
                        SPOTS[randomIndex].textContent = COMPUTER
                        break
                    }
                }
            }
        }

        checkResult()
    }
})

BUTTON.addEventListener('click', () => {
    SPOTS.forEach(spot => spot.textContent = '')
    MESSAGE.textContent = ''
    BUTTON.style.display = 'none'
    isPlaying = true
})
