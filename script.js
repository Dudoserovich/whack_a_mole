let press_play = document.querySelector('.buttons .play');
let press_stop = document.querySelector('.buttons .stop');
let press_replay = document.querySelector('.buttons .replay');

let holes = document.querySelectorAll('.hole');

let time = 5;
let points = 0;
let timerId;

let time_html = document.querySelector('.time div');
let points_html = document.querySelector('.points div');

let mole = document.querySelector('img');

function play() {
    press_play.classList.add('hidden');
    press_stop.classList.remove('hidden');

    let hole;
    let is_focus = 1;

    start_timer();

    const startGame = setInterval(() => {
        if (is_focus === 1) {
            let arrayNo = Math.floor(Math.random() * 11);

            hole = holes[arrayNo];

            let image = document.createElement("img");
            image.setAttribute("src", "img/mole.png");
            image.setAttribute("class", "mole");

            hole.appendChild(image);

            // удаление mole
            let timer_mole = setTimeout(() => {
                hole.removeChild(image);
            }, 700);

            // остановка появления mole
            if (time <= 1) {
                clearInterval(startGame);
            }
        }
        /*console.log(hole);*/
    }, 800);

    window.onfocus = function()
    {
        is_focus = 1;
    }

    window.onblur = function()
    {
        is_focus = 0;
    }

    press_stop.addEventListener("click", () => {
        clearInterval(startGame);
    });
}

window.addEventListener("click", (e) => {
    if (e.target === document.querySelector('.hole img')) {
        points++;
        points_html.innerHTML = points;
    }
}, false)

function start_timer() {
    time--;
    time_html.innerHTML = time;
    timerId = setTimeout(start_timer, 1000);

    // если время вышло, таймер останавливается
    if (time === 0) {
        stop_timer();
        press_replay.classList.remove('hidden');
        press_play.classList.add('hidden');
        press_stop.classList.add('hidden');
    }
}

function stop() {
    press_stop.classList.add('hidden');
    press_play.classList.remove('hidden');
    time_html.innerHTML = time;
    stop_timer();
}

function stop_timer() {
    clearTimeout(timerId);
}

function replay() {
    time = 60;
    time_html.innerHTML = time;
    points = 0;
    points_html.innerHTML = points;

    press_replay.classList.add('hidden');
    play();
}