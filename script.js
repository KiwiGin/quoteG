const quoteContenedor=document.getElementById('quote-contenedor');
const quoteTexto=document.getElementById('quote');
const quoteAutor=document.getElementById('autor');
const tuiterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes=[];

//show loading
function loading() {
    loader.hidden = false;
    quoteContenedor.hidden=true;
}

//hide loading
function complete(){
    quoteContenedor.hidden=false;
    loader.hidden=true;
}

//Mostrar nueva cita
function nuevaCita(){
    loading(); 
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    if(!quote.author){
        quoteAutor.textContent='Unknown';
    }else{
        quoteAutor.textContent=quote.author;
    }

    if(quote.text.length>110){
        quoteTexto.classList.add('long-quote');
    }else{
        quoteTexto.classList.remove('long-quote');
    }
    //set quote, hide loader
    quoteTexto.textContent=quote.text;
    complete();
}

//Get Quotes from API
async function geTQuotes(){
    loading();
    const apiurl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiurl);
        apiQuotes=await response.json();
        nuevaCita();
    }catch(error){
        //algo
    }
}

//Hacer tuit
function nuevoTweet(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteTexto.textContent} - ${quoteAutor.textContent}${'. Estoy usando esta página https://kiwigin.github.io/quoteG/'}`;
    window.open(twitterUrl, '_blank');
}

//Events listener
newQuoteBtn.addEventListener('click', nuevaCita);
tuiterBtn.addEventListener('click', nuevoTweet);

//On Load
geTQuotes();