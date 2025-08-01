import React, { useState, useEffect } from 'react';
import './App.css';

const BookCard = ({ book, searchTerm }) => {
    const highlightMatch = (text, term) => {
        if (!term) {
            return text;
        }
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    };

    const title = highlightMatch(book.title, searchTerm);

    const discount = book.original_price > 0 ? Math.round(((book.original_price - book.price) / book.original_price) * 100) : 0;
    const priceHtml = (
        <div className="price-container">
            <span className="original-price">₹{book.original_price.toFixed(2)}</span>
            <span className="price">₹{book.price.toFixed(2)}</span>
            {discount > 0 && <span className="discount">({discount}% off)</span>}
        </div>
    );

    return (
        <div className="book-card">
            <img src={book.cover_image.replace('public/', '')} alt={`${book.title} cover`} />
            <div className="book-content">
                <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
                <p className="description">{book.description}</p>
                {priceHtml}
            </div>
        </div>
    );
};

function App() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [gridColumns, setGridColumns] = useState(4);

    useEffect(() => {
        fetch('books.json')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
                const allCategories = [...new Set(data.map(book => book.category))];
                allCategories.sort();
                setCategories(allCategories);
            })
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    useEffect(() => {
        let currentBooks = [...books];

        if (selectedCategory !== 'all') {
            currentBooks = currentBooks.filter(book => book.category === selectedCategory);
        }

        if (searchTerm) {
            currentBooks = currentBooks.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortBy === 'title') {
            currentBooks.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'price') {
            currentBooks.sort((a, b) => a.price - b.price);
        }

        setFilteredBooks(currentBooks);
    }, [books, searchTerm, selectedCategory, sortBy]);

    return (
        <div className="App">
            <header>
                <img src="logo/logo.png" alt="Easy Pick Book Store" className="logo" />
                <h1>Easy Pick Book Store</h1>
                <div className="controls">
                    <select id="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="default">Sort by</option>
                        <option value="title">Title (A-Z)</option>
                        <option value="price">Price (Low to High)</option>
                    </select>
                    <select id="grid-columns" value={gridColumns} onChange={(e) => setGridColumns(Number(e.target.value))}>
                        <option value="4">4 Columns</option>
                        <option value="8">8 Columns</option>
                        <option value="12">12 Columns</option>
                    </select>
                    <input
                        type="search"
                        id="search-input"
                        placeholder="Search by title, author, or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>
            <main id="book-list" className={`book-grid grid-cols-${gridColumns}`} style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <BookCard key={book.id} book={book} searchTerm={searchTerm} />
                    ))
                ) : (
                    <p>No books found matching your criteria.</p>
                )}
            </main>
        </div>
    );
}

export default App;
