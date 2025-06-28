document.addEventListener('DOMContentLoaded', function() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const addQuoteButton = document.getElementById('addQuote');
    const exportButton = document.getElementById('exportButton');
    const importFile = document.getElementById('importFile');


    // Load quotes from local storage
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The only way to do great work is to love what you do.", category: "Motivational" },
        { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
        { text: "Strive not to be a success, but rather to be of value.", category: "Inspirational" }
    ];

    // Function to save quotes to local storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    function showRandomQuote() {
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
            //Optional. storing the last used quote in session storage
            sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));

        } else {
            quoteDisplay.textContent = "No quotes available. Add some!";
        }
    }

    function addQuote() {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if (quoteText !== "" && quoteCategory !== "") {
            const newQuote = { text: quoteText, category: quoteCategory };
            quotes.push(newQuote);

            saveQuotes(); // Save quotes to local storage

            newQuoteText.value = "";
            newQuoteCategory.value = "";

            showRandomQuote();
        } else {
            alert("Please enter both a quote and a category.");
        }
    }

   // Function to export quotes to JSON file
    function exportToJsonFile() {
        const jsonString = JSON.stringify(quotes, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

     // Function to import quotes from JSON file
    window.importFromJsonFile = function(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            try {
                const importedQuotes = JSON.parse(event.target.result);
                if (Array.isArray(importedQuotes)) {
                    quotes.push(...importedQuotes);
                    saveQuotes();
                    showRandomQuote();
                    alert('Quotes imported successfully!');
                } else {
                    alert('Invalid JSON file: The file must contain an array of quotes.');
                }
            } catch (error) {
                alert('Error importing quotes: ' + error.message);
            }
        };
        fileReader.readAsText(event.target.files[0]);
    };

    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
    exportButton.addEventListener('click', exportToJsonFile);

    showRandomQuote();
});