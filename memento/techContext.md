# Technical Context

## Technologies

-   **HTML5:** For the core structure and content of the web page.
-   **CSS3:** For styling, layout, and responsiveness. We will use modern CSS features like Flexbox or Grid for the layout.
-   **JavaScript (ES6+):** For all dynamic behavior, including:
    -   Fetching and parsing the `books.json` data.
    -   Dynamically rendering the book list.
    -   Implementing the live search functionality.
-   **JSON:** As the data format for storing the book collection.

## Development Setup

-   **No Build Step:** Since we are using vanilla technologies, no package manager (like npm) or bundler (like Webpack) is required.
-   **Local Server:** For development, the files can be served using a simple local server (e.g., Python's `http.server` or the Live Server extension in VS Code) to avoid CORS issues when fetching the JSON file.

## Technical Constraints

-   **Browser Compatibility:** The site should be compatible with all modern web browsers (Chrome, Firefox, Safari, Edge).
-   **No Backend:** The project must not rely on any server-side processing. All logic is handled by the client.