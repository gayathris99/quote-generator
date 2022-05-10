let apiQuotes = []

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote') 
 const loader = document.getElementById('loader')


 function showLoader() {
     loader.hidden = false;
     quoteContainer.hidden = true
 }

function hideLoader() {
    loader.hidden = true;
    quoteContainer.hidden = false
}

// Show New Quotes 
const newQuote = () => {
    showLoader()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    authorText.textContent = quote.author ? quote.author : 'Unknown ';
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    }
    else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
    hideLoader()
}
// Get Quotes from API
async function getQuotes () {
    showLoader()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    }  
    catch (error) {
        getQuotes()
    }
      
}

// To tweet

function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank');
}

//Event Listeners 
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)
getQuotes()