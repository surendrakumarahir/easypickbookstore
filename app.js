document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const gridColumns = document.getElementById('grid-columns');
    
    let books = [];
    let allCategories = [];

    // Fetch book data from the JSON file
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            books = data;
            populateCategories();
            renderBooks();
        })
        .catch(error => console.error('Error fetching books:', error));

    // Populate category filter
    function populateCategories() {
        allCategories = [...new Set(books.map(book => book.category))];
        allCategories.sort();
        allCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }
    
    // Main function to render books based on current filters and sorting
    function renderBooks() {
        let filteredBooks = [...books];
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;
        const sortValue = sortBy.value;

        // Apply category filter
        if (selectedCategory !== 'all') {
            filteredBooks = filteredBooks.filter(book => book.category === selectedCategory);
        }

        // Apply search filter
        if (searchTerm) {
            filteredBooks = filteredBooks.filter(book => {
                return (
                    book.title.toLowerCase().includes(searchTerm) ||
                    book.author.toLowerCase().includes(searchTerm) ||
                    book.category.toLowerCase().includes(searchTerm)
                );
            });
        }
        
        // Apply sorting
        if (sortValue === 'title') {
            filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortValue === 'price') {
            filteredBooks.sort((a, b) => a.price - b.price);
        }

        displayBooks(filteredBooks);
    }

    // Function to display books
    function displayBooks(booksToDisplay) {
        bookList.innerHTML = ''; // Clear existing list
        const columns = gridColumns.value;
        bookList.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        bookList.classList.remove('grid-cols-4', 'grid-cols-8', 'grid-cols-12');
        bookList.classList.add(`grid-cols-${columns}`);

        if (booksToDisplay.length === 0) {
            bookList.innerHTML = '<p>No books found matching your criteria.</p>';
            return;
        }

        booksToDisplay.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');

            const searchTerm = searchInput.value.toLowerCase();
            const title = highlightMatch(book.title, searchTerm);
            const author = highlightMatch(book.author, searchTerm);
            const category = highlightMatch(book.category, searchTerm);

            const discount = book.original_price > 0 ? Math.round(((book.original_price - book.price) / book.original_price) * 100) : 0;
            const priceHtml = `
                <div class="price-container">
                    <span class="original-price">₹${book.original_price.toFixed(2)}</span>
                    <span class="price">₹${book.price.toFixed(2)}</span>
                    ${discount > 0 ? `<span class="discount">(${discount}% off)</span>` : ''}
                </div>
            `;

            bookCard.innerHTML = `
                <img src="${book.cover_image}" alt="${book.title} cover">
                <div class="book-content">
                    <h2>${title}</h2>
                    <p class="description">${book.description}</p>
                    ${priceHtml}
                </div>
            `;
            bookList.appendChild(bookCard);
        });
    }

    // Function to highlight matched search terms
    function highlightMatch(text, term) {
        if (!term) {
            return text;
        }

        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Event Listeners
    searchInput.addEventListener('input', renderBooks);
    categoryFilter.addEventListener('change', renderBooks);
    sortBy.addEventListener('change', renderBooks);
    gridColumns.addEventListener('change', renderBooks);
});