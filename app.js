document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div")
    const scoreDisplay = document.querySelector("span")
    const startBtn = document.querySelector(".start")

    const width = 10
    let currentIndex = 0 //first div in grid
    let appleIndex = 0 //first div in grid
    let currentSnake = [2,1,0] //2 is the head, 0 is the tail
    let direction = 1
    let score = 0
    let speed = 1.1
    let intervalTime = 0
    let interval = 0

    //to start and restart the game
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove("snake"))
        squares[appleIndex].classList.remove("apple")
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add("snake"))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //function that deals with all of the outcomes of the snake 
    function moveOutcomes(){

    
    //snake's hitting border and snake's hitting self
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) || //snake hits bottom wall
            (currentSnake[0] % width === width -1 && direction === 1) || //snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //snake hits top wall
            squares[currentSnake[0] + direction].classList.contains("snake") //snake goes into itself
        ){
            alert("Game over!")
            return clearInterval(interval)
        }

        const tail = currentSnake.pop() //removes last iteration of the array and shows it 
        squares[tail].classList.remove("snake") //removes class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
    
        //snake getting apple
        if(squares[currentSnake[0]].classList.contains("apple")){
            squares[currentSnake[0]].classList.remove("apple")
            squares[tail].classList.add("snake")
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add("snake")
    }

    //generate new apple once apple is eaten
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        }
        while(squares[appleIndex].classList.contains("snake"))
        squares[appleIndex].classList.add("apple")

    }




    //assign functions to keycodes
    function control(e){
        squares[currentIndex].classList.remove("snake") //class of snake removed from all the squares

        if(e.keyCode === 39){
            direction = 1 //right arrow
        }else if(e.keyCode === 38){
            direction = -width //up arrow
        }else if(e.keyCode === 37){
            direction = -1 //left arrow
        }else if(e.keyCode === 40){
            direction = +width //down arrow
        }
    }

    document.addEventListener("keyup", control)
    startBtn.addEventListener("click", startGame)
})