/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, firstRoll, finalScore;

init();




/***************************************************************
 * ROLL DICE
 ***************************************************************/

document.querySelector('.btn-roll').addEventListener('click', function(){

    if (gamePlaying){

    //1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
  

    //2.disply result
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice2').style.display = 'block';
 
    document.querySelector('.dice').src = 'dice-' + dice + '.png';
    document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';


    //update round score only if not a 1

    if (dice != 1 && dice2 != 1){
        roundScore += (dice + dice2)
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }

  /* if (dice === 6 && rollMatch === 6){
        scores[activePlayer] = 0;
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = '0';
        document.getElementById('score-' + activePlayer).textContent = '0';

    } else if ( dice != 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
    } else {
            nextPlayer();
    } */

    }
});


/****************************************************
 * HOLD SCORE
*****************************************************/

    document.querySelector('.btn-hold').addEventListener('click', function(){
        if (gamePlaying){
        //add current score to player global score
    
        scores[activePlayer] += roundScore;
    
        var input = document.querySelector('.final-score').value;
        var winningScore;

        if (input){
            var winningScore = input;
        } else {
            winningScore = 100;
        }
    
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        //Check if player won the game
    
        if (scores[activePlayer] >= winningScore){
            gamePlaying = false;
    
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
        }else{
            nextPlayer();
            
        }
     }
});







/************************************************************
 * NEXT PLAYER FUNCTION
 ***********************************************************/

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
     document.querySelector('.dice').style.display = 'none';
     document.querySelector('.dice2').style.display = 'none';
}


/************************************************************
 * NEW GAME
 ***********************************************************/

document.querySelector('.btn-new').addEventListener('click', init);


/************************************************************
 * INITALIZE FUNCTION
 ***********************************************************/

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    rollMatch = [0,0];
    gamePlaying = true;

document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.getElementById('name-0').textContent = 'PLAYER 1';
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');



};


