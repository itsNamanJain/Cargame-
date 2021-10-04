const score= document.querySelector(".score");
const popup= document.querySelector(".popup");
const gameboard= document.querySelector(".gameboard");


document.addEventListener("keydown",KeyDown); // Which key presses
document.addEventListener("keyup",KeyUp);  // Which key released
// Object for keys
let keys = { ArrowUp :false, ArrowDown :false, ArrowLeft :false, ArrowRight :false}
let player = {speed:5,scores:0}; 

popup.addEventListener("click",start); // Start the Game

function PlayGame(){  // Playing Game
    if(player.start){
        
        if(player.scores%1000===0){
            player.speed+=2;
        }

        let car = document.querySelector(".car");
        let road = gameboard.getBoundingClientRect(); // Getting all info about gameBoard

        moveLines();
        moveEnemyCar(car);
        // Moving the Car

        if(keys.ArrowUp && player.y>(road.top+180)){ player.y-=player.speed}
        if(keys.ArrowDown && player.y<(road.bottom-85)){ player.y+=player.speed}
        if(keys.ArrowLeft && player.x>0){ player.x-=player.speed}
        if(keys.ArrowRight && player.x <(road.width-60)){ player.x+=player.speed}

        car.style.top = player.y+"px";
        car.style.left=player.x+"px";
    window.requestAnimationFrame(PlayGame);
    player.scores++;
    score.innerHTML="<h2> Score : "+player.scores+"</h2>";
}
}

 // Moving lines
function moveLines(){  
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function(item){
        if(item.y>700){
            item.y-=750;
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}

// Check for collision
function isCollide(a,b){
    let aCar = a.getBoundingClientRect();
    let bCar = b.getBoundingClientRect();

    return !((aCar.bottom<bCar.top)||(aCar.top>bCar.bottom)||((aCar.right-10)<(bCar.left+20))||((aCar.left+20)>(bCar.right-10)))
}

// End Game
function endGame(){
    player.start=false;
    popup.innerHTML="<p> Game Over <br> Your Last Score Was "+(player.scores+1)+" <br> Press Here to Play Again";
    player.scores=0;
    player.speed=5;
    popup.classList.remove("hide");


}

 // Moving EnemyCars
function moveEnemyCar(car){
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function(item){
        if(isCollide(car,item)){
            endGame();
        }
        if(item.y>750){
            item.y=-350;
            item.style.left=Math.floor(Math.random()*300)+"px";
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}

// Function to start the game
function start(){
    gameboard.classList.remove("hide");   // Show gameboard
    score.classList.remove("hide");
    popup.classList.add("hide");  // Hide popup
    gameboard.innerHTML="";
    player.start=true;   // Setting Player is ready
    player.scores =0; // Setting initial value of Score
    player.speed=5;
    window.requestAnimationFrame(PlayGame);

    // Creating the road Lines

    for(var x=0;x<5;x++){
        let roadLine= document.createElement("div");
    roadLine.setAttribute("class","lines");
    roadLine.y =x*150;
    roadLine.style.top = (roadLine.y)+"px";
    gameboard.appendChild(roadLine);
    }


    // Creating the Car

    let car= document.createElement("div");
    car.setAttribute("class","car");
    gameboard.appendChild(car);

    // Creating Enemy Car

    for(var x=0;x<3;x++){
    let enemyCar= document.createElement("div");
    enemyCar.setAttribute("class","enemy");
    enemyCar.y =((x+1)*350)*-1;
    enemyCar.style.top = (enemyCar.y)+"px";
    let col = Math.ceil(Math.random()*4);
    enemyCar.style.left=Math.floor(Math.random()*300)+"px";
    gameboard.appendChild(enemyCar);
    }

    // Sets default position of Car

    player.x = car.offsetLeft;
    player.y= car.offsetTop;
}

function KeyDown(e){      // Set true for key presses
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
}
function KeyUp(e){      // Set false for key presses
    e.preventDefault();
    keys[e.key] = false;
}
