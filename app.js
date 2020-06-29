//DOM ELEMENTS
const form = document.querySelector('.form')
const number = document.querySelector('.math')
const currentScore = document.querySelector('.score')
const input = document.querySelector('#input')
const highScore = document.querySelector('.highscore');
const status = document.querySelector('.status')
const lvlDisplay = document.querySelector('.lvlValue');
const btn = document.querySelector('#btn');
const container = document.querySelector('.container');
const start = document.querySelector('.start');
const startBtn = document.querySelector('#start-btn');
const restart = document.querySelector('.result-container');
const restartBtn = document.querySelector('#restart-btn');
const finalHs =document.querySelector('.result-hS');
const finalS = document.querySelector('.final-score-value');
const finalLvl =document.querySelector('.finalLvl');

var lifeV = 3;


var timeDisplay= document.querySelector('.timeValue');
var time = 5;
timeDisplay.innerHTML = time;


function myFn() {
   
    if(time > 0) {
        time--;
    } if(time <= 0){
        clearInterval(myTimer);
        container.classList.add('hide');
        restart.classList.remove('hide');
       
        
    }
    //ENDGAME
  
    if(!localStorage.getItem('top')) {
        finalHs.innerHTML = `Personal Best : 0`;
    }else {
        finalHs.innerHTML = `Personal Best: ${localStorage.top}`;
    }
    finalS.innerHTML = point;
    timeDisplay.innerHTML = time;
    finalLvl.innerHTML = `Level : ${lvlvalue}`;
}


const stop = () => {
    clearInterval(myFn);
    }
 
startBtn.addEventListener('click' , () => {
    container.classList.remove('hide');
    start.classList.add('hide');
    
    myTimer = setInterval(myFn, 1000);

});

restartBtn.addEventListener('click' , e=> {
    window.location.reload();
})


//Audios
const correctA = new Audio('correct.mp3');
const wrongA = new Audio('wrong.mp3');


//stats
var point = 0;
var ans;
var topScore;
var lvl = 10;
var lvlvalue = +lvlDisplay.innerText;
var correctAnsArray = [];
var wrongAnsArray = [];
var question;

// init life 
const life = document.querySelector('.life');
const lifePic = '&#x2764';
life.innerHTML = `${lifePic} ${lifePic} ${lifePic}`;



//HIGH SCORE


 if(!localStorage.getItem('top')) {
     hS =0 ;
    highScore.style.display = 'none';
    highScore.innerHTML = `Personal Best: 0`;
  

}else {
     hS = +localStorage.top;
    highScore.innerHTML = `Personal Best: ${localStorage.top}`;

} 





//OPERATORS OBJECTS
const plus = {
    'name' : '+',
    '+' : function(a,b) { return a + b }
}
const minus = {
    'name' : '-',
    '-' : function(a,b) { return a - b}
}
const multi= {
    'name' : 'x',
    '*' : function(a,b) {return a * b}
}

const add = '+';
const subtract = '-';
const multiply = '*';

const opArrayobj = [plus , minus , multi];
const opArrayfunc = [plus[add] , minus[subtract] ,multi[multiply]];

//generate number FUCTION 
const generateNumber = () => {
    const random = Math.floor(Math.random() * lvl);
    const random2 = Math.floor(Math.random() * lvl);
    const randomOp = Math.floor(Math.random() * opArrayfunc.length);
    ans = opArrayfunc[randomOp](random , random2);
    question = `${random} ${opArrayobj[randomOp].name} ${random2}`;
    number.innerHTML = `${question} = `;
  
}

generateNumber();




const checking =  () => {
    // LEVELS 
    if(input.value !== "") {
    //checking (correct ans)

         if(+input.value === ans) {

            stop();
            time = 6;
            myTimer = setInterval(myTimer, 1000);

            correctAnsArray.push(question);
            

            if(correctAnsArray.length === 20) {lvl += 10; lvlvalue += 1;}
            if(correctAnsArray.length === 10) {lvl += 10; lvlvalue += 1;}
            if(correctAnsArray.length === 30) {lvl += 10; lvlvalue += 1;}
            if(correctAnsArray.length === 40) {lvl += 10; lvlvalue += 1;}
            lvlDisplay.innerHTML = lvlvalue;


            correctA.currentTime = 0;
            correctA.play();
            status.innerHTML = `<span class="correct">correct!</span>`;
            generateNumber();
            point += 1;
            //console.log(lvl , point)
            currentScore.innerHTML = `Score : ${point}`;

    }   //checking (wrong ans)
        else {
               lifeV -= 1;
               if(lifeV === 2) {life.innerHTML = `${lifePic} ${lifePic}`;}
               if(lifeV === 1) {life.innerHTML = `${lifePic}`;}
               if(lifeV <= 0 ) {
                    container.classList.add('hide');
                    restart.classList.remove('hide');
                    //ENDGAME HIGHSCORE
                    if(!localStorage.getItem('top')) {
                        finalHs.innerHTML = `Personal Best : 0`;
                    }else {
                        finalHs.innerHTML = `Personal Best: ${localStorage.top}`;
                    }
                    finalS.innerHTML = point;
                    timeDisplay.innerHTML = time;
               }
            wrongAnsArray.push(question);
          
            
            wrongA.currentTime = 0;
            wrongA.play();
/*             if(point > 0) {
                point -= 1;
            } */
            generateNumber();
            status.innerHTML = `<span class="incorrect">incorrect!</span>`;
            currentScore.innerHTML = `Score : ${point}`;

    }

        if(point > hS) {
            highScore.style.display = "";
            hS = point;
            localStorage.setItem('top' , hS);
            highScore.innerHTML = `Personal Best: ${localStorage.getItem('top')}`;
        }
    }
};


    form.addEventListener('submit' ,e=> {
        e.preventDefault();
        checking();
        form.reset();
    });
    btn.addEventListener('click' , e=> {
        checking();
        form.reset();
    })
 

