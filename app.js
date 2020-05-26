document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid')
    let squares = (document.querySelectorAll(".grid div"))
    const ScoreDisplay = document.querySelector("#score")
    const StartBtn = document.querySelector("#start-button")
    const width = 10
 
    //Shapes of Terominoes

    const LTerominoes = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width*2, width*2+2], 
        [1, width+1, width*2+1, width+2]
        [width, width+2, width*2+1, width*2+2]
    ]

    const ITerominoes = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const ZTerominoes = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const TTerominoes = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const SQTerominoes =  [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
    ]

    const theTerominoes = [SQTerominoes, TTerominoes, ZTerominoes, ITerominoes, LTerominoes]

    let currentPosition = 4
    

    //selecting random terminoes
    let randomS = Math.floor(Math.random() *theTerominoes.length)
    let current = theTerominoes[randomS][0];



    //drawing tetrominoes 
    function draw() {
        current.forEach( index => {
            squares[currentPosition + index].classList.add("tetromino")
        })
    }
    
    draw()

    function undraw() {
        current.forEach( index => {
            squares[currentPosition + index].classList.remove("tetromino")
        })
    } 
    
    //moving tetrominoes down
    timerId = setInterval(moveDown, 100)

    function moveDown () {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //freeze tetrominoes
    function freeze() {
        if (current.some (index => squares[currentPosition + index + width].classList.contains("taken"))) {
            current.forEach(index => squares[currentPosition + index].classList.add("taken"))
            randomS = Math.floor(Math.random() *theTerominoes.length)
            current = theTerominoes[randomS][0]
            currentPosition = 4
            draw()
        }
    }
})

