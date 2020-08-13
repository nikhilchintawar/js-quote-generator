const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterButton = document.getElementById("twitter")
const newQuoteButton = document.getElementById("new-quote")
const loader = document.getElementById("loader");


function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true
    }
}

//get quote api
async function getQuote(){

    showLoadingSpinner();


    const proxyUrl = `https://cors-anywhere.herokuapp.com/`
    const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //if author is blank add unkown.
        if (data.quoteAuthor === "") {
            authorText.innerText = "unkonown";
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        //reduce font size for long quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add("long-quote");
        }else{
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;

        //stop loader
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}

//tweet quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterUrl, "_blank");
}

//event listener
newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);

//on load
getQuote();