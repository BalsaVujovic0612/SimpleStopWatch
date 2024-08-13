let timer = document.getElementById('timer')//Element za prikaz vremena
let startBtn = document.getElementById('start-btn')//Dugme za pocetak
let stopBtn = document.getElementById('stop-btn')//dugme za pauzu
let resetBtn = document.getElementById('reset-btn')//Dugme za resetovanje

let startTime = 0//Pocetno vreme kada je stoperica pokrenuta
let elapsedTime = 0//Ukupno proteklo vreme koje je proslo dok je stoperica bila zaustavljena
let interval;//referenca na interval koji azurira stopericu

//funkcija za azuriranje prikaza stoperice
function update() {
    let time = Date.now() - startTime + elapsedTime;//izracunaj ukupno proteklo vreme
    let milliseconds = Math.floor((time % 1000) / 10); // konvertuj milisekunde u dve cifre
    let seconds = Math.floor((time / 1000) % 60);   // izracunaj sekunde
    let minutes = Math.floor((time / 1000 / 60) % 60); //izracunaj minute
    let hours = Math.floor(time / 1000 / 60 / 60); //izracunaj sate
    //Prikaz vremena u formatu HH:MM:SS:MS
    timer.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

//Funkcija za pokretanje stoperice
function startTimer(){
    if(!interval){ //Ako interval ne postoji, stoperica nije aktivna
        startTime = Date.now()//Zapocni merenje vremena
        interval = setInterval(update,10)//Azuriraj svakih 10 milisekundi
    }
}

//funkcija za zaustavljanje stoperice
function stopTimer(){
    if(interval){//Ako interval postoji stoperica je aktivna
        clearInterval(interval)//Zaustvai interval
        interval = null//postavi interval na null da oznaci da je stoperica zaustavljena
        elapsedTime += Date.now() - startTime//Dodaj proteklo vreme na ukupno vreme
    }
}
//Funkcije za resetovanje stoperice
function resetTimer() {
    clearInterval(interval);//Zaustavi interval ako je aktivan
    interval = null;//Postavi interval na null
    startTime = 0; // Postavi startTime na 0 da bi se stoperica mogla ponovo pokrenuti od nule
    elapsedTime = 0;//Resetuj elapsedTime na 0
    timer.innerText = '00:00:00:00'; // Prikaz resetovan na početni format
    // update() pozivanje je suvišno jer je već prikaz postavljen na '00:00:00:00'
}
//Povezivanje dogadjaja sa dugmadi
startBtn.addEventListener('click',startTimer)
stopBtn.addEventListener('click',stopTimer)
resetBtn.addEventListener('click',resetTimer)