//********* */ Dark Light Switcher ********//

let changer = document.querySelector('.isWhite');
let ball = document.querySelector('.ball');
let bodyColor = document.querySelector('.light-bg')

ball.addEventListener('click', () => {
    if (ball.className.split(' ')[1] == 'static') {
        ball.style.transform = 'translateX(40px)';
        ball.classList.remove('static');
        ball.classList.add('moved');
        bodyColor.classList.add('dark-bg');
        bodyColor.classList.remove('light-bg');
    }else if (ball.className.split(' ')[1] == 'moved'){
        ball.style.transform = 'translateX(0px)';
        ball.classList.add('static');
        ball.classList.remove('moved');
        bodyColor.classList.remove('dark-bg');
        bodyColor.classList.add('light-bg');
    }
})

//*************  Information on MAP ***************//
