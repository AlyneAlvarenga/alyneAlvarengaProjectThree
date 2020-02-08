$(function () {

   let counter = 0;

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

   const centerContainer = $('.centerContainer');

   const startButton = $('.startButton');

   const instructions = $('.instructions');

   function displayOptions() {
   
      if (centerContainer.children().css('display', 'none')) {
         // console.log(database[0].rightAnswer);
         centerContainer.html('<p>What</p>');
      }

      // database.forEach(function() {
         
      // })
      // centerContainer.html()
      
   }

   startButton.on('click', function() {
      // instructions.addClass('hide');
      //maybe fade it out also?
      // instructions.remove();
      instructions.fadeOut();

      startButton.fadeTo(300, 0, displayOptions);
   })

})