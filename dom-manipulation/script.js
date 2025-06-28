document.addEventListener('DOMContentLoaded', function() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const addQuoteButton = document.getElementById('addQuote');

    let quotes = [
        { text: "The only way to do great work is to love what you do.", category: "Motivational" },
        { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
        { text: "Strive not to be a success, but rather to be of value.", category: "Inspirational" }
    ];

    function showRandomQuote() {
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
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

            newQuoteText.value = "";
            newQuoteCategory.value = "";

            showRandomQuote();
        } else {
            alert("Please enter both a quote and a category.");
        }
    }

    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);

    showRandomQuote();
});