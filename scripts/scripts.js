   let database = [
      { 
         rightAnswer: 'absence',
         wrongAnswer: 'abcense'
      },
      {
         rightAnswer: 'acquire',
         wrongAnswer: 'aquire'
      },
      {
         rightAnswer: 'apparent',
         wrongAnswer: 'apparant'
      },
      {
         rightAnswer: 'calendar',
         wrongAnswer: 'calender'
      },
      {
         rightAnswer: 'controversy',
         wrongAnswer: 'contraversy'
      },
      {
         rightAnswer: 'definitely',
         wrongAnswer: 'definitly'
      },
      {
         rightAnswer: 'disappoint',
         wrongAnswer: 'dissapoint'
      },
      {
         rightAnswer: 'equipment',
         wrongAnswer: 'equiptment'
      },
      {
         rightAnswer: 'immediately',
         wrongAnswer: 'imediately'
      },
      {
         rightAnswer: 'successful',
         wrongAnswer: 'succesful'
      },
   ]

   let counter = 0;
   let splicedArray = [];

   const centerContainer = $('.centerContainer');
   const optionsContainer = $('.optionsContainer');
   const counterContainer = $('.counterContainer');
   const resultContainer = $('.resultContainer');
   const resetContainer = $('.resetContainer');
   const counterP = $('.counter');

   const startButton = $('.startButton');
   const resetButton = $('.resetButton');

   const instructions = $('.instructions');


   //when user is ready to start, hide the instructions and the button, show the first set of options and the counter.
startButton.on('click', function () {
   // instructions.addClass('hide');
   //maybe fade it out also?
   // instructions.remove();
   instructions.fadeOut();
   startButton.fadeTo(300, 0, displayOptions);
   optionsContainer.css('display', 'block');
   counterContainer.css('display', 'flex');
})

//listen for a click on one of the options; update counter; call the function to delete what's on the screen
optionsContainer.on('click', 'div', function () {
   if (this.className === 'right') {
      counter++;
      counterP.text(counter);
   } 
   deleteOptions();
})

//remove the options from the dom; check if we've reached the end of the array. If we have, display the results and the option to try again. If we have not, call the function to display more options.
function deleteOptions() {
   optionsContainer.children().remove();
   // checkIfEmpty();
   if (database.length === 0) {
      resultContainer.css('display', 'block');
      resetContainer.css('display', 'block');
      counterContainer.css('display', 'none');
      optionsContainer.css('display', 'none')
   } else {
      setTimeout(() => {
         displayOptions();

      }, 200);
   }
}

//generate a random number to access a random item on the array; display that item on the dom; call a function to remove that item and store it.
function displayOptions() {
   let index = Math.floor(Math.random() * (database.length));

   database.find(function(currentElement, currentIndex){
      if (index === currentIndex) {
         optionsContainer.html(`
         <div class="right"><p>${currentElement.rightAnswer}</p></div>
         <div class="wrong"><p>${currentElement.wrongAnswer}</p></div>
         `)
         storeNewArray(database, currentIndex);
      } 
   })
}

//remove items that were shown on the dom so they won't repeat. store the removed items, so that they can be used again when the game resets
function storeNewArray(array, index) {
   let newArray = array.splice(index, 1);
   splicedArray = [...splicedArray, ...newArray]
   //idea for spreading + code provided by Jonathan Wong
}

//reset the database to have all items, show the instructions and start button again, hide the rest, reset counter, reset spliced array
resetContainer.on('click', resetButton, function() {
   
   database = database.concat(splicedArray);
   splicedArray = [];
   resultContainer.css('display', 'none');
   instructions.css('display', 'block');
   counter = 0;
   counterP.text(counter);
   startButton.fadeTo(300, 1);
   resetContainer.css('display', 'none');
})
