// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const info = document.getElementById("info");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const feedback = document.getElementById("Correct");
const wrongFeedback = document.getElementById("Wrong");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const qFeedback = document.getElementById("scoreContainer");
const feedbackModal = document.getElementById("feedbackModal")
const closeButton = document.getElementById("closeButton")
var modal = document.getElementById("modal");
var modalbody = document.getElementById("mb");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// the questions
let questions = [
    {
        question: "What makes a strong password?",
        imgSrc: "img/pword.jpg",
        choiceA: "Mother's maiden name",
        choiceB: "3 words joined together",
        choiceC: "Your favourite sports team",
        choiceD: "Your pet's name",
        feedback: "Excellent work! The NCSC recommend using 3 random words together",
        wrongFeedback: "Sorry, this is wrong. The NCSC recommend using 3 random words together",
        correct: "B"

    }, {
        question: "What could make you more vulnerable to social engineering?",
        imgSrc: "img/you.jpg",
        choiceA: "Always using two factor authentication",
        choiceB: "Not activating authentication methods on your devices",
        choiceC: "A new life situation, such as buying a house",
        choiceD: "Having a weak password, such as <br/> 'I love you'",
        feedback: "This is true! Give yourself more time to respond to enquiries and phone calls when you find yourself in a new life situation \
i.e. a divorce, an exciting new business, a new baby or a bereavement.",
        wrongFeedback: "'New life situation' is the correct answer. This has a significant impact on the success of social engineering attacks. \
Give yourself more time to respond to requests when you find yourself in a new life situation, such as a divorce, an exciting new business, \
or a bereavement.",
        correct: "C"
    }, {

        question: "Why is installing updates essential to security?",
        imgSrc: "img/update.jpg",
        choiceA: "They ensure your system runs fast",
        choiceB: "They provide the newest features to make everything state of the art",
        choiceC: "Software has flaws. Updates provide fixes to stop hackers exploting them",
        choiceD: "It isn't. It's best to delay updates for as long as possible",
        feedback: "Correct! Security updates usually mean the manufacturer has become aware of a hackable flaw in your software. Installing updates provides a \
'patch' to fix the problem and protect your system. ",
        wrongFeedback: "Wrong! The correct answer is 'Software has flaws which hackers exploit. Updates provide fixes to stop them' Security updates \
usually mean the maunfacturer has become aware of a hackable flaw in your software. Installing updates provides a 'patch' to fix the problem and protect your system",
        correct: "C"
    },
    {
        question: "What are some clues that you might be talking to a scammer on the phone?",
        imgSrc: "img/phone.jpg",
        choiceA: "They want you to make a quick decision",
        choiceB: "They tell you they are from somewhere you'd usually trust i.e. police, HMRC",
        choiceC: "Their proposition sounds like it could make you some quick money",
        choiceD: "All of the above",
        feedback: "Correct! If unsure, hang up the phone, look up their legitimate number online. Wait 10 minutes before calling back in case your're still \
connected, or call with a different phone. ",
        wrongFeedback: "Sorry, this is wrong. If unsure of who you're talking to, hang up the phone, look up their legitimate number online. Wait 10 minutes \
before calling back in case your're still connected, or call with a different phone. ",
        correct: "D"
    }, {
        question: "Who should you contact to report internet or telephone fraud?",
        imgSrc: "img/police.jpg",
        choiceA: "Fraud Reporters  . ",
        choiceB: "Action Fraudsters",
        choiceC: "Assess Fraud",
        choiceD: "Action Fraud",
        feedback: "Good thinking! Reporting to Action Fraud helps protect others and catch criminals.",
        wrongFeedback: "The correct answer is 'Action Fraud'. Reporting fraud helps protect others and catch criminals.",
        correct: "D"
    },




];

// variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 100; // 100s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}



// checkAnwer

function checkAnswer(answer) {

    let q = questions[runningQuestion];

    if (answer == q.correct) {
        // answer is correct
        score++;



        // When the user clicks on the button, open the modal 

        /* modal.style.display = "block";
         //('.modal-body').innerHTML += "<p>" + q.feedback + "</p>";
         //modal.find('.modal-content.modal-body').innerHTML += "<p>" + q.feedback + "</p>";
         //modal.modal('show');
         //modal.find('.modal-content').innerHTML += "<p>" + q.feedback + "</p>";
         modalbody.innerHTML = "<p>" + q.feedback + "</p>" ;*/

        displayModal("correct", q.feedback);


        // change progress color to green

        answerIsCorrect();

        // display feedback
        //alert(q.feedback);

    }

    else {
        // display the feedback for the getting the question wrong 
        // alert(q.wrongFeedback);
        // answer is wrong
        // change progress color to red
        // When the user clicks on the button, open the modal 

        /*wrongModal.style.display = "block";
        wrongModalbody.innerHTML +"<p>" + q.wrongFeedback + "</p>";

        wrongModal.onclick = function () {
            
            wrongModal.style.display = "none";
            
        }


        //When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            wrongModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == wrongModal) {
                wrongModal.style.display = "none";
            }
        }*/
        displayModal("wrong", q.wrongFeedback);

        answerIsWrong();

    }


    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

function displayModal(disclass, message) {
    if (disclass == "correct") {
        modal.classList.remove("wrong");
        modal.classList.add("correct");
    } else {
        modal.classList.add("wrong");
        modal.classList.remove("correct");
    }
    modalbody.innerHTML = message;
    modal.style.display = "block";

    modal.onclick = function () {
        // This is possibly useful ->       
        //modal.innerHTML = "";


        modal.style.display = "none";
    }

    //When the user clicks on <span> (x), close the modal
    span.onclick = function () {

        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        // modal.innerHTML = "";

        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "lightgreen";

    //window.alert("your answer is correct");


}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(score);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 5) ? "img/5.png" :
        (scorePerCent >= 4) ? "img/4.png" :
            (scorePerCent >= 3) ? "img/3.png" :
                (scorePerCent >= 2) ? "img/2.png" :
                    "img/1.png";

    // choose the feedback based on the scorePerCent
    let feedback = (scorePerCent >= 5) ? "Well done, you really know your stuff!</br></br>It's important \
for the research that you now complete the survey, if you didn't complete one at the start. Thank you!" :
        (scorePerCent >= 4) ? "Pretty good! You're well on your way to staying safe </br></br>It's important \
for the research that you now complete the survey, if you didn't complete one at the start. Thank you!" :
            (scorePerCent >= 3) ? "Good effort!.</br></br>It's important \
for the research that you now complete the survey, if you didn't complete one at the start. Thank you!" :
                (scorePerCent >= 2) ? "Good effort!</br></br>It's important \
for the research that you now complete the survey, if you didn't complete one at the start. Thank you!" :
                    "Well done for trying.</br></br>It's important for the research that you now complete the survey if you didn't complete one at the start. Thank you!";




    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + "<br>" + "You scored " + scorePerCent + "/" + questions.length + "<br>" + feedback + "</p>";
    scoreDiv.innerHTML += "<a href='https://survey.sogosurvey.com/r/H3LIti' class='btn btn-info btn-lg' role='button'>Take me to the survey</a>";
;


}





















