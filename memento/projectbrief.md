# Project Brief: Single Page Book Showcase

This project is to create a single-page website to showcase a collection of books. It's a client-facing catalog without e-commerce functionality like a shopping cart or checkout.

## 1. Core Requirements

- **Data Source:** All book data will be stored in a single `books.json` file. No database is required.
- **Display:** The main page will display all books from the JSON file.
- **Search:** A prominent search bar at the top of the page will allow users to find books instantly.
- **Instant Search:** The search must update results as the user types.
- **Search Fields:** The search should cover the book's title, author, and category/tags.

## 2. Design & Layout

- **Layout:** The design should be simple, clean, and responsive, ensuring it works well on desktops, tablets, and mobile devices.
- **Book Card:** Each book will be represented by a "card" displaying:
  - Cover Image
  - Title
  - Author
  - Price
  - A short description

## 3. Technology Stack

- **Frontend:** HTML, CSS, and modern vanilla JavaScript. A framework like React is an option but not required. The initial implementation will use vanilla JS to keep it lightweight.

## 4. Bonus Features (To be considered post-MVP)

- **Category Filtering:** Allow users to filter the book list by genre or category.
- **Sorting:** Provide options to sort the visible books by title or price.
- **Search Term Highlighting:** Visually highlight the matched text within the search results.