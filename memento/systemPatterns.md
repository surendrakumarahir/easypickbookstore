# System Patterns

## Architecture

The system follows a simple client-side architecture. There is no backend server logic.

1.  **Client-Side Application:** The entire application runs in the user's web browser.
2.  **Data Fetching:** On page load, the application fetches book data from a static `books.json` file.
3.  **UI Rendering:** The JavaScript dynamically generates the HTML for the book list based on the fetched data.
4.  **Search & Filter:** All search and filtering operations are performed in-memory on the client-side, making them instantaneous.

## Key Technical Decisions

- **No Framework:** To keep the project lightweight and dependency-free, we will use vanilla HTML, CSS, and JavaScript. This avoids the overhead of a library like React for a project of this scale.
- **Single Page Application (SPA):** The entire user experience is contained within a single HTML page. All interactions update the DOM dynamically without requiring page reloads.
- **Static Data:** Using a JSON file simplifies the setup immensely. It's easy to manage and requires no database or backend API.