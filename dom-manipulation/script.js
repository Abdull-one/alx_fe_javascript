
document.addEventListener('DOMContentLoaded', function() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const addQuoteButton = document.getElementById('addQuote');
    const exportButton = document.getElementById('exportButton');
    const importFile = document.getElementById('importFile');
    const categoryFilter = document.getElementById('categoryFilter');

    // Load quotes from local storage
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The only way to do great work is to love what you do.", category: "motivational" },
        { text: "Innovation distinguishes between a leader and a follower.", category: "innovation" },
        { text: "Strive not to be a success, but rather to be of value.", category: "inspirational" }
    ];

    // Function to save quotes to local storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Function to populate categories in the dropdown
    function populateCategories() {
        let categories = ['all']; // Start with "All Categories"
        quotes.forEach(quote => {
            if (!categories.includes(quote.category)) {
                categories.push(quote.category);
            }
        })

