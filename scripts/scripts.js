   const database = [
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

   const centerContainer = $('.centerContainer');
   const optionsContainer = $('.optionsContainer');
   const counterContainer = $('.counterContainer');
   const counterP = $('.counter');

   const startButton = $('.startButton');

   const instructions = $('.instructions');

   // function checkIfEmpty() {
   //    if (optionsContainer.children().length == 0) {
   //       displayOptions();
   //    }
   // }

   function displayOptions() {
      let index = Math.floor(Math.random() * (database.length));

      database.find(function(currentElement, currentIndex){
         if (index === currentIndex) {
            optionsContainer.html(`
            <div class="right">${currentElement.rightAnswer}</div>
            <div class="wrong">${currentElement.wrongAnswer}</div>
            `)
            database.splice(currentIndex, 1);
            console.log(currentIndex);
         } 
      })
   }

   function deleteOptions() {
      optionsContainer.children().remove();
      // checkIfEmpty();
      if (database.length === 0) {
         console.log('This is the end my only friend');
      } else {
         setTimeout(()=> {
            displayOptions();
   
         }, 200);
      }
   }

   optionsContainer.on('click', 'div', function () {
      if (this.className === 'right') {
         
         counter++;
         counterP.text(counter);

      } else {
         console.log('wrong answer');
      }
      deleteOptions();
   })

   startButton.on('click', function() {
      // instructions.addClass('hide');
      //maybe fade it out also?
      // instructions.remove();
      instructions.fadeOut();
      startButton.fadeTo(300, 0, displayOptions);
      optionsContainer.css('display', 'block');
      counterContainer.css('display', 'flex');
   })
