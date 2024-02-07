let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let messageContainer = document.querySelector(".message-container");
let msg = document.querySelector("#msg");
const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');
const playerNameInput = document.getElementById('Pname');
const startButton = document.getElementById('start-btn');

startButton.addEventListener('click', function(event)   // Creating a condition so that user can click the "start" button only if they put a name in the input field.
{
    event.preventDefault();
    const playerName = playerNameInput.value.trim();    // taking the input value from user removing any extra spaces and storing in playerName
        if(playerName !== "")                           // checking if the playerName is not empty, and when it's not empty div with class page1 gets hidden and page2 is unhidden 
        {
            page1.classList.add('hide');
            page2.classList.remove('hide');
        } else {
            alert('Please Enter Your Name');            //if playerName is empty, then alerting the user to please enter their name
        }

});

let turnX = true;                                       //setting the turnX (human) value to true at the beggining of the game
let count = 0;                                          //setting the count for the moves to 0 at the beggining of the program    

//creating and storing the winning pattern in the form of array for checking for the win when player and computer are playing
const winPatterns = [
   [0,1,2],
   [0,3,6],
   [0,4,8],
   [1,4,7],
   [2,5,8],
   [2,4,6],
   [3,4,5],
   [6,7,8]
];

//creating the reset game function which works only when user clicks reset button in the page
const resetGame = () =>                                 
{
    turnX = true;                                       //setting back the values of turnX and count to default as the game is reset
    count = 0;
   enableButtons();                                     //using the enable button function the bring back the buttons so that they can be playable again.
   messageContainer.classList.add("hide");              //Hiding the win,loss,draw message as the game is restarted to the beggining
};

//creating the computermove to generate moves for the computer side after the human player played their move
const ComputerMove = () =>                              
{
    const boxesArray = Array.from(boxes);               //converting all the 9 boxes in the form of array and storing in boxesArray
    const emptyBoxes = boxesArray.filter(box => box.innerText === "");  //removing empty boxes from the boxesarray into emptyBoxes varriable

    if(emptyBoxes.length > 0)                           //running a if condition if the length of empty box is greater than 0
    {
        let randomNumber = Math.floor(Math.random() * emptyBoxes.length);       //generating a random number 
        let box = emptyBoxes[randomNumber];                                     //and choosing the box equal to the number generated and stored in the randomnumber
        box.innerText = "O";                                                    //fillinf the selected box with O as a move for the computer
        box.disabled = true;                                                    //disabling that specific box so that it is not used again by any player
        count++;                                                                //counting the total number of moves played
        
        let finalWinner = checkWinner();                                        //checking if the recent move of computer led to it's win

        if (count === 9 && !finalWinner)                                        //checking the condition for draw where if the count is greater than 9 and final winner is still not yet found
        {
            gameDraw();
        }


    }

}

//working on the specific box that is clicked by the user
boxes.forEach((box) => 
{
   box.addEventListener("click",() => 
   {
       if(turnX)                                                                //checking if it's the turn of human player
       {
           box.innerText = "X";                                                 //filling the box selected by the user with letter X
           box.disabled = true;                                                 //disabling the box clicked by the user and already used
            count++;                                                            //counting for total number of moves


            let finalWinner = checkWinner();                                    //checking if the recent move of computer led to it's win

            if (count === 9 && !finalWinner)                                    //checking the condition for draw where if the count is greater than 9 and final winner is still not yet found
            {
                gameDraw();
            } else                                                              //getting computer's move if the condition for win and draw are not yet met
            {
                ComputerMove(); 
            }
        }
    });
});

//creating the function for checking if the game is draw and printing it in the message container
const gameDraw = () => 
{
    const playerName = playerNameInput.value.trim();

   msg.innerText = playerName + " DRAW ";                                        //Printing DRAW when no one won the game
   messageContainer.classList.remove("hide");                                   //making the messagecontainer unhidden when printing the text of DRAW
   disableButtons();                                                            //disabling all the buttons so that players cannot play the game after the game is finished
}

//function for disabling all the buttons one by one by creating a loop
const disableButtons = () => 
{
   for(let box of boxes) {
       box.disabled = true;
   }
};

//function for enabling all the buttons one by one by creating a loop
const enableButtons = () => {
   for(let box of boxes) {
       box.disabled = false;
       box.innerText = "";
   }
};

//function to print if the player won or lost against the computer
const showWinner = (winner) => {
    const playerName = playerNameInput.value.trim();
    
        if(winner == 'X')                                                   //if the winner.value is equal to X then printing human as the winner
        {
            msg.innerText = playerName + " Won";
        } else                                                              //if winner.value is not equal to X then printing human as loser
        {
            msg.innerText = playerName + " Lost";
        }
    
   messageContainer.classList.remove("hide");                               //making the message container box unhidden to show the printed elements.
   disableButtons();                                                        //disabling all the buttons so that no one can play their next move after the game is finished
};

//function for cheking if the winning conditions are met
const checkWinner = () => {
   for( let pattern of winPatterns)                                         //creating a pattern var of the total winpatterns.
   {
       let position1 = boxes[pattern[0]].innerText;                         //taking the respective next 3 elements and checking if they are equal
       let position2 = boxes[pattern[1]].innerText;
       let position3 = boxes[pattern[2]].innerText;


       if(position1 != "" && position2 != "" && position3 != "")            //condition to check if the box is not empty
       {
           if(position1 === position2 && position2 === position3)           //condition to check if all the boxes are equal
           {
               showWinner(position1);                                       //printing if the human won or lost the game using showwinner function
               return true;
           }
       }
   }
};


newGamebtn.addEventListener("click", resetGame);                            //when new game button clicked resetting the game to the beggining
resetBtn.addEventListener("click", resetGame);                              //when reset button is clicked resetting the game to the beggining.