const moves = document.getElementById("moves-count");
const time = document.getElementById("time");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Images array
const images = [
    { name: "c++", image: "../img/c++.png" },
    { name: "c", image: "../img/c.png" },
    { name: "js", image: "../img/js.png" },
    { name: "node_js", image: "../img/node_js.png" },
    { name: "python", image: "../img/python.png" },  
    { name: "java", image: "../img/java.png" },
    { name: "swift", image: "../img/swift.png" },
    { name: "go", image: "../img/go.png" },
    { name: "dart", image: "../img/dart.png" },
    { name: "django", image: "../img/django.png" },
    { name: "ruby", image: "../img/ruby.png" },
    { name: "php", image: "../img/php.png" },
];

//Time
    let seconds = 0;
//Move
    let winCount = 0;

//Timer
const timer = () => {
    seconds -= 1;
    if (seconds === 0) {
        result.innerHTML = `<h4>time is up </h4>`;
        stopGame();
    }
    let secondsVal = seconds < 10 ? `0${seconds}` : seconds;
    time.innerHTML = `<span>Time:</span>${secondsVal}`;
};

const Random = (size = 4) => {
    let tmp = [...images];
    let cards = [];
    size = (size * size) / 2;

    for (let i = 0; i < size; ++i) {
        const index = Math.floor(Math.random() * tmp.length);
        cards.push(tmp[index]);
        tmp.splice(index, 1);
    }
    return cards;
};

const matrix = (cardval, size = 4) => {
    gameContainer.innerHTML = "";
    cardval = [...cardval, ...cardval];


    cardval.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; ++i) {
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardval[i].name}">
            <div class="card-before"></div>
            <div class="card-after">
            <img src="${cardval[i].image}"             
            class="image" width="80px" height="80px"/></div>
        </div>`;

    }

    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    cards = document.querySelectorAll(".card-container");

    
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                } 
                else {
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        winCount += 1;
                        if (winCount == Math.floor(cardval.length / 2)) {
                            result.innerHTML = `<h4>You Won</h4>`;
                            stopGame();
                        }
                    }
                    else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);
                    }
                }
            }
        });
    });
};

//start
start.addEventListener("click", () => {
    seconds = 60;
    controls.classList.add("hide");
    stop.classList.remove("hide");
    start.classList.add("hide");
    interval = setInterval(timer, 1000);
    initializer();
});

//stop
stop.addEventListener(
    "click",
    (stopGame = () => {
        controls.classList.remove("hide");
        stop.classList.add("hide");
        start.classList.remove("hide");
        clearInterval(interval);
    })
);

const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cards = Random();
    matrix(cards);
};