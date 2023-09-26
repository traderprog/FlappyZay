

let board;
let boardWidth = 640;
let boardHeight = 1280;
let context;

let birdWidth = 130; 
let birdHeight = 150;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}


let pipeArray = [];
let pipeWidth = 120; 
let pipeHeight = 800;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;


let velocityX = -3; 
let velocityY = 0; 
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); 

   

   

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";
  
    requestAnimationFrame(update);
    setInterval(placePipes, 3000); 
    document.addEventListener("keydown", moveBird);
}


setInterval(imgChange,500);
let i=1;


function imgChange(){
    if (i==1){
        birdImg = new Image();
        birdImg.src = "asd1.png";
        birdImg.onkeydown = function() {
            context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        }
        console.log(i);
        i= i+1;
    
    
    }
    else if ( i == 3){
        birdImg = new Image();
        birdImg.src = "asd3.png";
        birdImg.onkeydown = function() {
            context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        }
        console.log(i);
        i= 1;

    }

    else{
 
       
        console.log(i);
        i++;
    }
    
}
function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);
    
   
    velocityY += gravity;

    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

  
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; 
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }


    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); 
    }


    context.fillStyle = "white";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("Játék Vége", 5, 90);
    }
}

function placePipes() {
    if (gameOver) {
        return;
    }

   
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
 
        velocityY = -6;

   
        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
}