
let allBooks = [];
let filteredBooks = [];

function toggleMobileMenu() {
    document.getElementById('nav').classList.toggle('active');
}
async function loadBooks() {
    try {
        const res = await fetch('/api/books');
        const books = await res.json();

        allBooks = books;
        filteredBooks = books;

        displayBooks(books);
        updateStats();

        document.getElementById('stats').style.display = 'flex';

    } catch (error) {
        console.error('Ошибка загрузки книг:', error);
        document.getElementById('book-list').innerHTML =
            '<div class="no-books">Ошибка загрузки книг. Попробуйте перезагрузить страницу.</div>';
    }
}

function displayBooks(books) {
    const list = document.getElementById('book-list');

    if (books.length === 0) {
        list.innerHTML = '<div class="no-books">Книги не найдены</div>';
        return;
    }

    list.innerHTML = '';

    books.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'book-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
        <h3 class="book-title">${escapeHtml(book.title)}</h3>
        <div class="book-info">
            <div class="book-detail">
                <span class="icon">👤</span>
                <span class="label">Автор:</span>
                <span class="value">${escapeHtml(book.author)}</span>
            </div>
            <div class="book-detail">
                <span class="icon">📅</span>
                <span class="label">Год:</span>
                <span class="value">${escapeHtml(book.year_written)}</span>
            </div>
        </div>
        `;

        list.appendChild(card);
    });
}

function filterBooks(searchTerm) {
    if (!searchTerm.trim()) {
        filteredBooks = allBooks;
    } else {
        const term = searchTerm.toLowerCase();
        filteredBooks = allBooks.filter(book =>
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term)
        );
    }

    displayBooks(filteredBooks);
    updateStats();
}

function updateStats() {
    document.getElementById('total-books').textContent = allBooks.length;
    document.getElementById('visible-books').textContent = filteredBooks.length;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
loadBooks();
