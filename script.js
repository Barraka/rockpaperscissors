let rock=document.querySelector("#rock");
let paper=document.querySelector("#paper");
let scissors=document.querySelector("#scissors");
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

//Removing future pop-up windows
document.body.removeChild(ontop);
document.body.removeChild(final);
 
play.addEventListener("click",start);
reroll.addEventListener("click",nextroll);

let rolls=["img/Rock.png","img/Paper.png","img/Scissors.png"]
let index=0;
let myInterval;
let date;
let hasstarted=false;
//Create placeholder for start button that will dissapear during a game
let replace=document.createElement('div');
replace.id="tempID";
replace.style.cssText='width:100px; height:100px; background-color: transparent; display:flex; margin:13px';

//Declare global variables for score tracking
let playerScore = 0;
let opponentScore = 0;
let currentChoice = '';
let maxScore=5;

//----
rock.addEventListener('mouseover',e=>{iconsHoverOver(e)});
rock.addEventListener('mouseout',e=>{iconsHoverOut(e)});
rock.addEventListener('click',e=>{roll(e)});
paper.addEventListener('mouseover',e=>{iconsHoverOver(e)});
paper.addEventListener('mouseout',e=>{iconsHoverOut(e)});
paper.addEventListener('click',e=>{roll(e)});
scissors.addEventListener('mouseover',e=>{iconsHoverOver(e)});
scissors.addEventListener('mouseout',e=>{iconsHoverOut(e)});
scissors.addEventListener('click',e=>{roll(e)});
finalbtn.addEventListener("click",reset);
final.addEventListener('transitionstart',()=> console.log('started transitioning'));

function iconsHoverOver(e) {
    if(!hasstarted)return;
    let target=e.target.id;
    if(target==='imagerock')manageHover('hoverno',paper,scissors);
    if(target==='imagepaper')manageHover('hoverno',rock,scissors);
    if(target==='imagescissors')manageHover('hoverno',rock,paper);
}
function iconsHoverOut(e) {
    if(!hasstarted)return;
    let target=e.target.id;
    if(target==='imagerock')manageHover('hoveroff',paper,scissors);
    if(target==='imagepaper')manageHover('hoveroff',rock,scissors);
    if(target==='imagescissors')manageHover('hoveroff',rock,paper);
}
function manageHover(applyclass,...icons) {
    icons.forEach(x=>x.className=applyclass);
}

//-----------------------
function displayFinal() {
    document.body.appendChild(final);
    img4.src="";
    random.style.backgroundColor="rgb(60,60,60)";
    if(playerScore==maxScore) finaltxt.innerHTML=`${playerScore} - ${opponentScore} <br>Nice, you won the game!!`;
    else finaltxt.innerHTML=`${playerScore} - ${opponentScore} <br>Sorry, you lost the game...`;
    if(playerScore>opponentScore)final.style.border="3px solid lime";
    else final.style.border="3px solid red";
}

function reset() {
    document.body.removeChild(final);
    replace.parentElement.replaceChild(play,replace);
    playerScore=0;
    opponentScore=0;
    hasstarted=false;
    para.style.opacity=0.1;
    result.textContent="";
    text1.style.color="transparent";
    text2.style.color="transparent";
    }

function nextroll() {
    if(!hasstarted)return;
    reroll.classList.remove('reroll-hover')
    document.body.removeChild(ontop);
    myInterval=setInterval(changeme,150);
}

function roll(e) {
    if(!hasstarted)return;
    clearInterval(myInterval);
    let currentRoll=getComputerChoice();
    switch (currentRoll) {
        case "rock":
            img4.src=rolls[0];
            break;
        case "paper":
            img4.src=rolls[1];
            break;
        default:
            img4.src=rolls[2];
    }
    switch (e.target.id) {
        case 'imagerock':
            currentChoice='rock';
            break;
        case 'imagepaper':
            currentChoice='paper';
            break;
        default:
            currentChoice='scissors';
    }
    
    let getText=playGame(currentChoice,currentRoll);
    result.textContent=getText;
    if(playerScore==maxScore || opponentScore==maxScore)displayFinal();
    else {
        showScore();
    }
                                     
}
function showScore() {
    document.body.appendChild(ontop);
    playerscore.textContent="You: " + playerScore;
    opponentscore.textContent="Opponent: " + opponentScore;
}

function start() {    
    play.parentElement.replaceChild(replace,play);
    play.classList.remove('play-hover')
    hasstarted=true;
    para.style.opacity=1;
    random.style.backgroundColor='white';    
    random.style.color="white";
    text1.style.color="cyan";
    text2.style.color="cyan";
    myInterval=setInterval(changeme,150);

}
function changeme() {
    img4.src=rolls[index];
    index > 1 ? index = 0 : index++;
}

function getComputerChoice() {
    let choice=["rock","paper","scissors"];
    return choice[Math.floor(Math.random()*3)];
}

function playGame(choice="rock", opponent=getComputerChoice()) {
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