let btnSend = document.querySelector('button');
    let message = document.querySelector('h1');
    btnSend.addEventListener('click',() => {
    btnSend.innerText = 'Registered';

    setTimeout(() => {
    btnSend.style.display = "none";
    message.innerText = 'Registered';
     },1000);
    });