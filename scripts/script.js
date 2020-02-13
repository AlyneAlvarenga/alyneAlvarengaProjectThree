const myApp = {};

myApp.database = [
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
   {
      rightAnswer: 'parliament',
      wrongAnswer: 'parliment'
   },
   {
      rightAnswer: 'repetition',
      wrongAnswer: 'repitition'
   },
   {
      rightAnswer: 'recommend',
      wrongAnswer: 'recomend'
   },
   {
      rightAnswer: 'maintenance',
      wrongAnswer: 'maintainance'
   },
   {
      rightAnswer: 'necessary',
      wrongAnswer: 'necessery'
   },
   {
      rightAnswer: 'vacuum',
      wrongAnswer: 'vaccum'
   },
   {
      rightAnswer: 'beginning',
      wrongAnswer: 'begining'
   },
   {
      rightAnswer: 'achieve',
      wrongAnswer: 'acheive'
   },
   {
      rightAnswer: 'almost',
      wrongAnswer: 'allmost'
   },
   {
      rightAnswer: 'changeable',
      wrongAnswer: 'changable'
   },
]

myApp.splicedArray = [];
myApp.counter = 0;

myApp.generateRandomIndex = function (array) {
   return Math.floor(Math.random() * array.length);
}

//remove the options from the dom; check if we've reached the end of the array. If we have, display the results and the option to try again. If we have not, call the function to display more options.
myApp.deleteOptions = function () {
   myApp.optionsContainer.children().remove();
   if (myApp.timePassed === myApp.timeLimit) {
      myApp.resultContainer.css('display', 'block');
      myApp.resetContainer.css('display', 'block');
      myApp.counterContainer.css('display', 'none');
      myApp.optionsContainer.css('display', 'none')
   } else {
      setTimeout(() => {
         myApp.displayOptions();

      }, 200);
   }
}

//remove items that were shown on the dom so they won't repeat. store the removed items, so that they can be used again when the game resets
myApp.storeNewArray = function (array, index) {
   let newArray = array.splice(index, 1);
   myApp.splicedArray = [...myApp.splicedArray, ...newArray]
   //*idea for spreading + code provided by Jonathan Wong
}

//generate a random number to access a random item on the database array; get the object, and separate it into two arrays to access the key value pair and display them on the dom in a random order; call a function to remove that item and store it.
myApp.displayOptions = function () {
   const arrayIndex = myApp.generateRandomIndex(myApp.database);

   myApp.database.find(function (currentElement, currentIndex) {

      let arrayOfEntries = Object.entries(currentElement || {});
      const randomValueInObj1 = myApp.generateRandomIndex(arrayOfEntries);
      let randomValueInObj2;

      if (randomValueInObj1 === 0) {
         randomValueInObj2 = 1;
      } else {
         randomValueInObj2 = 0;
      }

      if (arrayIndex === currentIndex) {
         myApp.optionsContainer.html(`
         <button tabindex="0" class="${arrayOfEntries[randomValueInObj1][0]}">${arrayOfEntries[randomValueInObj1][1]}</button>
         <button tabindex="0" class="${arrayOfEntries[randomValueInObj2][0]}">${arrayOfEntries[randomValueInObj2][1]}</button>
         `)
         myApp.storeNewArray(myApp.database, currentIndex);
      }
   })
}

//* code for timer functionality by Mateusz Rybczonek at https://itnext.io/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript-d0171d1fb6f7
//* code for clearing the timer by Norman Hussey

myApp.timeLimit = 10;
myApp.timePassed = 0;
myApp.timeLeft = myApp.timeLimit;
myApp.timerInterval = null;

myApp.formatTime = function(time) {
   const minutes = Math.floor(time / 60);
   let seconds = time % 60;

   if (seconds < 10) {
      seconds = `0${seconds}`;
   }
   return `${minutes}:${seconds}`;
};

myApp.displayTime = function() {
   myApp.timer.css('display', 'block');
   myApp.timer.html(`${this.formatTime(myApp.timeLimit)}`);
};

myApp.startCountdown = function() {
   this.timerInterval = setInterval(()=>{
      myApp.timePassed += 1;
      this.timeLeft = this.timeLimit - this.timePassed;
      myApp.timer.html(`${myApp.formatTime(this.timeLeft)}`)

      if (myApp.timeLeft <= 0) {
         clearInterval(this.timerInterval);
         myApp.deleteOptions();
      }
   }, 1000)
}

myApp.events = function() {
   //when user is ready to start, hide the instructions and the button, show the first set of options and the counter.
   myApp.startButton.on('click', function () {
      // myApp.instructions.fadeOut();
      myApp.instructions.css('display', 'none');
      // myApp.startButton.fadeTo(300, 0, myApp.displayOptions);
      myApp.startButton.css('display', 'none');
      myApp.displayOptions();
      myApp.optionsContainer.css('display', 'grid');
      myApp.counterContainer.css('display', 'flex');
      myApp.displayTime();
      myApp.startCountdown();
   })

   //listen for a click on one of the options; update counter; call the function to delete what's on the screen
   myApp.optionsContainer.on('click', 'button', function () {
      if (this.className === 'rightAnswer') {
         myApp.counter++;
         myApp.counterP.text(myApp.counter);
      }
      myApp.deleteOptions();
   })

   //reset the database to have all items, show the instructions and start button again, hide the rest, reset counter, reset spliced array, reset timer
   myApp.resetContainer.on('click', myApp.resetButton, function () {
      myApp.database = myApp.database.concat(myApp.splicedArray);
      myApp.splicedArray = [];
      myApp.resultContainer.css('display', 'none');
      myApp.counterContainer.css('display', 'none');
      myApp.instructions.css('display', 'block');
      myApp.counter = 0;
      myApp.counterP.text(myApp.counter);
      // myApp.startButton.fadeTo(300, 1);
      myApp.startButton.css('display', 'inline-block');
      myApp.resetContainer.css('display', 'none');
      myApp.timeLimit = 10;
      myApp.timePassed = 0;
      myApp.timeLeft = myApp.timeLimit;
      myApp.timerInterval = null;
      myApp.timer.css('display', 'none');
   })
}

myApp.init = function () {
   //DOM elements
   myApp.centerContainer = $('.centerContainer');
   myApp.optionsContainer = $('.optionsContainer');
   myApp.counterContainer = $('.counterContainer');
   myApp.resultContainer = $('.resultContainer');
   myApp.resetContainer = $('.resetContainer');
   myApp.counterP = $('.counter');
   myApp.startButton = $('.startButton');
   myApp.resetButton = $('.resetButton');
   myApp.instructions = $('.instructions');
   myApp.timer = $('.timer');
   myApp.events();
}

$(function () {
   
   myApp.init();

});