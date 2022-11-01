// ['question', ['a', 'b', 'c', 'd'], 'x'],

function selectAnswer(but1, but2, but3, but4, ans1, ans2, ans3, ans4){
    if(newQuiz[ans1] == true){
        for(let w of answerButtons){
            w.disabled = true;
        }
        console.log('correct');
    newQuiz.guessedCorrectly++;
    newQuiz.currentScoreNumber = newQuiz.calculateCurrentScore();
    score.innerHTML = `Current Score: ${newQuiz.currentScoreNumber}%`;
    but1.style.cursor = 'default';
    but1.style.color = 'green';
    but2.style.color = 'red';
    but3.style.color = 'red';
    but4.style.color = 'red';
    next.disabled = false;
    next.style.color = "black";
    next.style.backgroundColor = "white";
    next.focus();
}
else{
    for(let w of answerButtons){
        w.disabled = true;
    }
    console.log('wrong');
    newQuiz.guessedIncorrectly++;
    newQuiz.currentScoreNumber = newQuiz.calculateCurrentScore();
    score.innerHTML = `Current Score: ${newQuiz.currentScoreNumber}%`;
    but1.style.cursor = 'default';
    but1.style.color = 'red';
    newQuiz[ans2] == true ? but2.style.color = 'green' : but2.style.color = 'red';
    newQuiz[ans3] == true ? but3.style.color = 'green' : but3.style.color = 'red';
    newQuiz[ans4] == true ? but4.style.color = 'green' : but4.style.color = 'red';
    next.disabled = false;
    next.style.color = "black";
    next.style.backgroundColor = "white";
    next.focus();
    }
if(newQuiz.questionCount > 0 && newQuiz.questionCount < newQuiz.totalQuestions - 1){
    next.innerHTML = 'Next Question';};
    if(newQuiz.questionCount == newQuiz.totalQuestions){next.innerHTML = "View Final Score";};
}



class SpaceQuiz{
    constructor(){
        this.guessedCorrectly = 0;
        this.guessedIncorrectly = 0;
        this.currentScoreNumber = 0;
        this.calculateCurrentScore = function(){
           return Math.round((this.guessedCorrectly / (this.guessedCorrectly + this.guessedIncorrectly)) * 100)
        }
        this.questions = {
        1: ['Como se llama el planeta en el que vivimos ?', ['Luna', 'Marte', 'Tierra', 'Sol'], 'c'],
        2: ['Cuantos planetas tiene el sistema solar: ', ['7', '8', '9', '6'], 'b'],
        3: ['Nuestro satelite es: ', ['Luna', 'Sol', 'Titan', 'Saturno'], 'a'],
        4: ['como se llama el sexto planeta del sistema solar?', ['Plutón', 'Saturno', 'Urano', 'Marte'],'b'],
        5: ['Como se llama nuestra galaxia?', ['andromeda', 'lactosa', 'via lactea', 'tierra'], 'c'],
        6: ['el evento mas grande producido por una estrella se le conoce como:',['supernova', 'estrella enana', 'Colision', 'Agujero negro'], 'a'],
        7: ['Cuanto tarda de llegar la luz del sol a la tierra:', ['6min', '8min', '7min', '10min'], 'b'],
        8: ['A que velocidad viaja la luz:', ['280.000km/s', '300.000km/s', '310.000km/s', '320.000km/s'], 'b'],
        9: ['Cual es el planeta mas grande del sistema solar:', ['Saturno', 'La tierra', 'Jupiter', 'Neptuno'], 'c'],
        10: ['De que esta hecho los anillos de saturno', ['Gas', 'Partes del planeta', 'polvos', 'Asteroides y meteoros'], 'd'],
        11: ['Como se llama el telescopio actualmente (2022):', ['Keppler', 'Brigdestone', 'James Webb', 'Hubble'], 'c'],
        12: ['Como se llama la estrella mas grande del universo:', ['UY es cute', 'Stephenson', 'Arcturus', 'El sol'], 'b'],
        13: ['Comose llama el agujero negro mas grande de el universo:', ['TON618', 'Sagitario A', 'IC-19369', 'Nebulosa'], 'a'],
        14: ['Cuales son las particulas responsables de la luz', ['higgs', 'taquiones', 'fotones', 'luminicas'], 'c'],
        15: ['Como se le dicen a los planetas potencialmente habitables', ['Planetas rocosos', 'planetas habitables', 'planetas orbitables', 'exoplanetas'], 'd'],
    }
        this.totalQuestions = Object.keys(this.questions).length;
        this.questionCount = 0;
        this.answerA = false;
        this.answerB = false;
        this.answerC = false;
        this.answerD = false;
        this.nextQuestion = function(){
            this.questionCount++;
            for(let w of answerButtons){
                w.disabled = false;
            }
            for(let w of answerButtons){
                w.style.color = 'white';
            }
            this.answerA = false;
            this.answerB = false;
            this.answerC = false;
            this.answerD = false;
            if(this.questions[this.questionCount][2] == 'a'){this.answerA = true}
            if(this.questions[this.questionCount][2] == 'b'){this.answerB = true}
            if(this.questions[this.questionCount][2] == 'c'){this.answerC = true}
            if(this.questions[this.questionCount][2] == 'd'){this.answerD = true}
            question.innerHTML = this.questions[this.questionCount][0];
            buttonA.innerHTML = this.questions[this.questionCount][1][0];
            buttonB.innerHTML = this.questions[this.questionCount][1][1];
            buttonC.innerHTML = this.questions[this.questionCount][1][2];
            buttonD.innerHTML = this.questions[this.questionCount][1][3];
        }
    }
}

let newQuiz = new SpaceQuiz();

const header = document.getElementById('header');
const buttonA = document.getElementById('a');
const buttonB = document.getElementById('b');
const buttonC = document.getElementById('c');
const buttonD = document.getElementById('d');
const question = document.getElementById('question');
const answerButtons = document.getElementsByClassName('answerButtons');
const score = document.getElementById('score');
const questionQue = document.getElementById('questionQue');
const next = document.getElementById('next');
const whiteLine = document.getElementById('whiteLine');

window.onload = function() {
    next.focus();};

next.addEventListener("click", function(){
if(newQuiz.questionCount == newQuiz.totalQuestions + 1){
console.log('e', newQuiz.questionCount);
newQuiz = new SpaceQuiz();
newQuiz.nextQuestion();
questionQue.innerHTML = `Question ${newQuiz.questionCount} of ${newQuiz.totalQuestions}`;
score.innerHTML = `Current Score: ${newQuiz.currentScoreNumber}%`;
score.style.color = "white";
questionQue.style.color = "white";
next.style.color = "rgba(0, 0, 0, 0)";
next.style.backgroundColor = "rgba(0, 0, 0, 0)";
next.style.cursor = 'default';
    }
else if(newQuiz.questionCount == newQuiz.totalQuestions){
console.log('d', newQuiz.questionCount);
newQuiz.questionCount++;
next.innerHTML = "Play Again?";
question.innerHTML = `Your Score Is ${newQuiz.currentScoreNumber}%`
whiteLine.style.borderColor = "rgba(0, 0, 0, 0)";
score.style.color = "rgba(0, 0, 0, 0)";
questionQue.style.color = "rgba(0, 0, 0, 0)";
for(let w of answerButtons){
    w.disabled = true;
    w.style.backgroundColor = "rgba(0, 0, 0, 0)";
w.style.color = "rgba(0, 0, 0, 0)";
        }}
else if(newQuiz.questionCount == newQuiz.totalQuestions - 1){
console.log('c', newQuiz.questionCount);
newQuiz.nextQuestion();
questionQue.innerHTML = `Question ${newQuiz.questionCount} of ${newQuiz.totalQuestions}`
next.disabled = true;
next.style.color = "rgba(0, 0, 0, 0)";
next.style.backgroundColor = "rgba(0, 0, 0, 0)";
next.style.cursor = 'default';
}
else if(newQuiz.questionCount > 0 && newQuiz.questionCount < newQuiz.totalQuestions - 1){
    console.log('b', newQuiz.questionCount);
newQuiz.nextQuestion();
questionQue.innerHTML = `Question ${newQuiz.questionCount} of ${newQuiz.totalQuestions}`;
next.disabled = true;
next.style.color = "rgba(0, 0, 0, 0)";
next.style.backgroundColor = "rgba(0, 0, 0, 0)";
next.style.cursor = 'default';}
else if(newQuiz.questionCount == 0){
    console.log('a', newQuiz.questionCount);
newQuiz.nextQuestion();
questionQue.innerHTML = `Question ${newQuiz.questionCount} of ${newQuiz.totalQuestions}`;
score.style.color = 'white';
questionQue.style.color = 'white';
whiteLine.style.borderColor = 'white';
next.disabled = true;
next.style.color = "rgba(0, 0, 0, 0)";
next.style.backgroundColor = "rgba(0, 0, 0, 0)";
for(let w of answerButtons){
    w.style.color = 'white';
}}})

next.addEventListener("mouseover", function(){
    next.style.color = 'white';
    next.style.backgroundColor = 'rgba(0, 0, 0, 0.90)';
    if(next.disabled == false){
    next.style.cursor = 'pointer';}
})

next.addEventListener("mouseout", function(){
    next.style.color = 'black';
    next.style.backgroundColor = 'white';
    next.style.cursor = 'default';
})

// next.addEventListener("keyup", function(event) {
//     if (event.code === 'Enter') {
//       next.click();
//     }
//   });

buttonA.addEventListener("click", function(){
    selectAnswer(buttonA, buttonB, buttonC, buttonD, 'answerA', 'answerB', 'answerC', 'answerD');
    });

buttonB.addEventListener("click", function(){
    selectAnswer(buttonB, buttonA, buttonC, buttonD, 'answerB', 'answerA', 'answerC', 'answerD');
    });

buttonC.addEventListener("click", function(){
    selectAnswer(buttonC, buttonA, buttonB, buttonD, 'answerC', 'answerA', 'answerB', 'answerD');
    });

buttonD.addEventListener("click", function(){
    selectAnswer(buttonD, buttonA, buttonB, buttonC, 'answerD', 'answerA', 'answerB', 'answerC');
    });

buttonA.addEventListener("mouseover", function(){
    buttonA.style.color = 'paleturquoise';
    if(buttonA.disabled == false){
    buttonA.style.cursor = 'pointer';}
})

buttonA.addEventListener("mouseout", function(){
    buttonA.style.color = 'white';
    buttonA.style.cursor = 'default';
})

buttonB.addEventListener("mouseover", function(){
    buttonB.style.color = 'paleturquoise';
    if(buttonB.disabled == false){
    buttonB.style.cursor = 'pointer';}
})

buttonB.addEventListener("mouseout", function(){
    buttonB.style.color = 'white';
    buttonB.style.cursor = 'default';
})

buttonC.addEventListener("mouseover", function(){
    buttonC.style.color = 'paleturquoise';
    if(buttonC.disabled == false){
    buttonC.style.cursor = 'pointer';}
})

buttonC.addEventListener("mouseout", function(){
    buttonC.style.color = 'white';
    buttonC.style.cursor = 'default';
})

buttonD.addEventListener("mouseover", function(){
    buttonD.style.color = 'paleturquoise';
    if(buttonD.disabled == false){
    buttonD.style.cursor = 'pointer';}
})

buttonD.addEventListener("mouseout", function(){
    buttonD.style.color = 'white';
    buttonD.style.cursor = 'default';
})