let img1=document.querySelector("#rock");
let img2=document.querySelector("#paper");
let img3=document.querySelector("#scissors");
let img4=document.querySelector("#imagerandom");
let para=document.querySelector("#icons");
let play=document.querySelector("#play");
let random=document.querySelector("#random");
let text1=document.querySelector("#choose");
let text2=document.querySelector("#opponentText");
let ontop=document.querySelector("#ontop");
let result=document.querySelector("#result");
let score=document.querySelector("#score");
let reroll=document.querySelector("#reroll");
let playerscore=document.querySelector("#playerscore");
let opponentscore=document.querySelector("#opponentscore");
let final=document.querySelector("#final");
let finaltxt=document.querySelector("#finaltxt");
let finalbtn=document.querySelector("#finalbtn");
 
play.addEventListener("click",start);
reroll.addEventListener("click",nextroll);
reroll.addEventListener("mouseover",nexthover);
reroll.addEventListener("mouseout",nextout);
let rolls=["img/Rock.png","img/Paper.png","img/Scissors.png"]
let index=0;
let myInterval;
let date;
let hasstarted=false;

//Declare global variables for score tracking
let playerScore = 0;
let opponentScore = 0;
let currentChoice = '';
let maxScore=3;


//-----------------------
function displayFinal() {
    final.style.display="flex";
    img4.src="";
    random.style.backgroundColor="rgb(60,60,60)";
    if(playerScore==maxScore) finaltxt.innerHTML=`${playerScore} - ${opponentScore} <br>Nice, you won the game!!`;
    else finaltxt.innerHTML=`${playerScore} - ${opponentScore} <br>Sorry, you lost the game...`;
    if(playerScore>opponentScore)final.style.border="3px solid lime";
    else final.style.border="3px solid red";
    finalbtn.textContent="OK";
    finalbtn.addEventListener("mouseover",()=>{finalbtn.style.border="3px solid lime";finalbtn.style.backgroundColor="white";});
    finalbtn.addEventListener("mouseout",()=>{finalbtn.style.border="3px solid transparent";finalbtn.style.backgroundColor="rgb(160,160,160)";});
    finalbtn.addEventListener("click",reset);
}

function reset() {
    final.style.display="none";
    playerScore=0;
    opponentScore=0;
    hasstarted=false;
    para.style.opacity=0.1;
    result.textContent="";
    text1.style.color="transparent";
    text2.style.color="transparent";
    play.style.cursor="pointer";
    ontop.style.zIndex=-1;
    }

function nextroll() {
    if(!hasstarted)return;
    myInterval=setInterval(changeme,150);
    hideScore();
}
function nexthover() {
    if(!hasstarted)return;
    reroll.style.border="3px solid yellow";
    reroll.style.backgroundColor="white";
}
function nextout() {
    if(!hasstarted)return;
    reroll.style.border="3px solid transparent";
    reroll.style.backgroundColor='rgb(160,150,140)';
}
function roll() {
    if(!hasstarted)return;
    clearInterval(myInterval);
    let currentRoll=getComputerChoice();
    switch (currentRoll) {
        case 'rock':
            img4.src=rolls[0];
            break;
        case 'paper':
            img4.src=rolls[1];
            break;
        default:
            img4.src=rolls[2];
    }
    
    let getText=playGame(currentChoice,currentRoll);
    result.textContent=getText;
    if(playerScore==maxScore || opponentScore==maxScore)displayFinal();
    else {
        showScore();
    }
                                     
}
function showScore() {
    ontop.style.zIndex=1;
    score.innerHTML="Score:";
    playerscore.textContent="You: " + playerScore;
    opponentscore.textContent="Opponent: " + opponentScore;
    reroll.style.display="flex";
    reroll.style.justifyContent="center";
    reroll.style.alignItems="center";
    reroll.style.backgroundColor='rgb(160,150,140)';
    reroll.style.borderRadius="10px";
}
function hideScore() {
    ontop.style.zIndex=-1;
    score.innerHTML="";
    playerscore.textContent="" ;
    opponentscore.textContent="";
    reroll.style.display="none";
}

function hoverRock() {
    if(!hasstarted)return;
    img2.className="hoverno";
    img3.className="hoverno";
    currentChoice="rock";
}
function hoverPaper() {
    if(!hasstarted)return;
    img1.className="hoverno";
    img3.className="hoverno";
    currentChoice="paper";
}
function hoverScissors() {
    if(!hasstarted)return;
    img1.className="hoverno";
    img2.className="hoverno";
    currentChoice="scissors";
}
function outRock() {
    if(!hasstarted)return;
    img2.className="hoveroff";
    img3.className="hoveroff";
}
function outPaper() {
    if(!hasstarted)return;
    img1.className="hoveroff";
    img3.className="hoveroff";
}
function outScissors() {
    if(!hasstarted)return;
    img1.className="hoveroff";
    img2.className="hoveroff";
}
function start() {
    if(hasstarted)return;
    hasstarted=true;
    para.style.opacity=1;
    play.style.cursor="progress";
    random.style.backgroundColor='white';    
    random.style.color="white";
    text1.style.color="cyan";
    text2.style.color="cyan";
    myInterval=setInterval(changeme,150);
    img1.addEventListener('mouseover',()=>hoverRock());
    img1.addEventListener('mouseout',()=>outRock());
    img2.addEventListener('mouseover',()=>hoverPaper());
    img2.addEventListener('mouseout',()=>outPaper());
    img3.addEventListener('mouseover',()=>hoverScissors());
    img3.addEventListener('mouseout',()=>outScissors());
    para.addEventListener("click",roll);
}
function changeme() {
    img4.src=rolls[index];
    index > 1 ? index = 0 : index++;
}

function getComputerChoice() {
    if(!hasstarted)return;
    let choice=["rock","paper","scissors"];
    return choice[Math.floor(Math.random()*3)];
}

function playGame(choice="rock", opponent=getComputerChoice()) {
    if(!hasstarted)return;
    switch (choice) {
        case 'rock' : 
            switch (opponent) {
                case "rock":
                    return(`It's a tie`);
                    break;
                case "paper":
                    opponentScore++;
                    return(`You lose, ${opponent} beats ${choice}`);
                    break;
                default:
                    playerScore++;
                    return(`You win, ${choice} beats ${opponent}`);
                    break;
            }
            break;
        case 'paper':
            switch (opponent) {
                case "paper":
                    return(`It's a tie`);
                    break;
                case "scissors":
                    opponentScore++;
                    return(`You lose, ${opponent} beats ${choice}`);
                    break;
                default:
                    playerScore++;
                    return(`You win, ${choice} beats ${opponent}`);
                    break;
            }
            break;
        case 'scissors':
            switch (opponent) {
                case "scissors":
                    return(`It's a tie`);
                    break;
                case "rock":
                    opponentScore++;
                    return(`You lose, ${opponent} beats ${choice}`);
                    break;
                default:
                    playerScore++;
                    return(`You win, ${choice} beats ${opponent}`);
                    break;
            }
            break;
        default:
            return("Wrong input. Try again.");        
    }
}
