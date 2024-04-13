var slot;
var minDuration = 100;
var wheels = [];
var radLijst = [];

var winSound = new Audio('sounds/winning_sound_SweetShots.aac');
var leverSound = new Audio('sounds/lever_pull_casino.aac');
var bomSound = new Audio('sounds/bomb_sound.aac');
var multiSound = new Audio('sounds/Plop_Sound.mp3');
var radWinSound = new Audio('sounds/radWinSound.mp3');

radLijst.push({bom: 3, shot: 7, rad: 4});
radLijst.push({bom: 3, shot: 7, rad: 4});
radLijst.push({bom: 2, shot: 2, rad: 3, jesse: 5, luuk: 5});

function makeWheels() {
    let wheels = [];
    radLijst.forEach(rad => {
        let wheel = [];
        for (let i = 0; i < rad.bom; i ++){
            wheel.push("bom");
        }
        for (let i = 0; i < rad.shot; i ++){
            wheel.push("shot");
        }
        for (let i = 0; i < rad.rad; i ++){
            wheel.push("rad");
        }
        for (let i = 0; i < rad.jesse; i ++){
            wheel.push("jesse");
        }
        for (let i = 0; i < rad.luuk; i ++){
            wheel.push("luuk");
        }
        wheels.push(wheel);
    });
    return wheels;
}
wheels = makeWheels();

$(function() {
    for (let i = 1; i <= 3; i++) {
        for (let j = 0; j < 3; j++) {
            slot = document.createElement('div');
            slot.classList.add('slot2');
            let color = Math.floor(Math.random() * wheels[i - 1].length);
            slot.classList.add(wheels[i - 1][color]);
            $('#wheel' + i).append(slot);
        }
    }
});
function spin(array){
    let wins = true;
    let rolls = [];
    let waitTime = 0;
    for(let j = 1; j <= 3; j ++) {
        let wheel = '#wheel' + j;
        let roll;
        roll = Math.floor(Math.random() * 50 + minDuration);
        if(waitTime < roll * 55) {
            waitTime = roll * 55;
        }
        for (let i = 1; i <= roll; i++) {
            slot = document.createElement('div');
            slot.classList.add('slot2');
            let color = Math.floor(Math.random() * array[j - 1].length);
            slot.classList.add(array[j - 1][color]);
            $(wheel).prepend(slot);
        }

        $(wheel + '>.slot2').css('transition', 'none');
        $(wheel + '>.slot2').css('top', -113 * roll + -30 + 'px');

        setTimeout(function () {
            $(wheel + '>.slot2').css('transition', roll * 50 + 'ms');
            $(wheel + '>.slot2').css('top', -30 + 'px');
        }, 1000);
        setTimeout(function () {
            for (let i = 0; i < roll; i++) {
                $(wheel).children().last().remove();
            }

        }, roll * 55 + 500);
        rolls.push($(wheel).children()[1].classList[1]);
        if ($(wheel).children()[1].classList.contains("bom")) {
            wins = false;
        }
    }
    setTimeout(function () {
        setTimeout(function () {
            if(wins) {
                console.log(rolls.toString());
                setMultiplier();
                if(rolls.toString() === "rad,rad,rad") {
                    $('.spinRad').css('transition', '5s');
                    $('.spinRad').css('transform', 'rotate(1440deg)');
                    $('.bonus').css('opacity', '100');
                    $('.bonus').css('transform', 'scale(1)');
                    $('.gif').css('background-image', 'url(img/XZ5V.gif)');
                    setTimeout(function () {
                        $('.gif').css('background-image', 'none');
                    }, 5000)
                    radWinSound.play();
                }else {
                    winSound.play();
                }
                $('.title').css('animation', 'win 1s');
                $('.slots > hr.left').css('left', '100%');
                $('.slots > hr.right').css('right', '100%');
                setTimeout(function (){
                    $('.title').css('animation', 'none');
                    $('.slots > hr.left').css('left', '-100%');
                    $('.slots > hr.right').css('right', '-100%');
                }, 2000);
            }
            else {
                setBomGif(rolls.toString());
                bomSound.play();
            }
        }, waitTime - 2000);

    }, 2000);
    return wins;
}
function spin3() {
    spin(wheels);
    $('.title').css('animation', 'spin 1s');
    setTimeout(function (){
        $('.title').css('animation', 'none');
    }, 1500);
}
$('.lever').click(function (){
    let lever = $('.lever');
    leverSound.play();
    $('.multi').css('opacity', "0").css("animation", 'none');
    $('.spinRad').css('transition', '0s');
    $('.spinRad').css('transform', 'rotate(0deg)');
    $('.bonus').css('opacity', '0');
    $('.bonus').css('transform', 'scale(0)');
    $('.lever > .img').css('top', 35);
    lever.css('top', -100);
    lever.css('right', -578);
    lever.css('transform', 'scale(1.05)');
    spin3();
    setTimeout(function (){
        $('.lever > .img').css('top', 0);
        lever.css('top', -112);
        lever.css('right', -574);
        lever.css('transform', 'scale(1)');
    }, 1000)
});
function setMultiplier() {
    let random = Math.floor(Math.random() * 100);
    let multi = (random >= 75);
    if(multi) {
        let random = Math.floor(Math.random() * 25);
        let multi =  $('.multi');
        if(random >= 18) {
            multi.css('background-image', 'url(img/x3multi.png)');
        }else {
            multi.css('background-image', 'url(img/x2multi.png)')
        }
        multi.css('opacity', '100%');
        multi.css('animation', 'bounceIn 1s');
        multiSound.play();
    }
}
function setBomGif(list) {
    let array = list.split(',');
    for(let i = 0; i < array.length; i ++){
        if(array[i] === "bom") {
            $('.gifList').children()[i].setAttribute('style', "background-image: url('img/explosion.gif')");
            setTimeout(function (){
                $('.gifList').children()[i].setAttribute('style', "none");
            }, 1000);
        }
    }
}

$('#volume').change(function () {
    let volume = $('#volume').val() / 100;
   winSound.volume = volume;
   bomSound.volume = volume;
   leverSound.volume = volume;
   multiSound.volume = volume;
   radWinSound.volume = volume;
});