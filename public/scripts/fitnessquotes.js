// Papaparse CDN link
const papaparseScript = document.createElement('script');
papaparseScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js';
document.head.appendChild(papaparseScript);

// Papaparse after the script has loaded
papaparseScript.onload = function() {
  fetch('/csv/fitnessquotesbank.csv') 
    .then(response => response.text())
    .then(data => {
      const parsedData = Papa.parse(data, {
        header: true,
        delimiter: ',',
        quoteChar: "'",
        skipEmptyLines: true,
        transformHeader: header => header.trim(), // Trim header names
        transform: (value, header) => (typeof value === 'string' ? value.trim() : value) // Trim cell values
      }).data;
      displayQuote(parsedData);
    })
    .catch(error => {
      console.error('Error fetching quotes:', error);
    });

  function getRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  function displayQuote(quotes) {
    const quoteElement = document.getElementById('fitness-quote');
    if (quoteElement) {
      const randomQuoteObject = getRandomQuote(quotes);
      const quoteText = randomQuoteObject.quote;
      const author = randomQuoteObject.author;

      quoteElement.innerHTML = `<p>${quoteText}</p><p class="author">${author}</p>`;
    } else {
      console.error("Element with ID 'fitness-quote' not found.");
    }
  }
};
