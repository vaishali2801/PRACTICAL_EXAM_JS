let books = JSON.parse(localStorage.getItem("books")) || [];
DisplayBook();

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const author = document.getElementById("author").value.trim();
    const price = Number(document.getElementById("price").value);
    const year = Number(document.getElementById("year").value);
    const editIndex = document.getElementById("editIndex").value;

    if (price <= 0 || price > 99999) {
        alert("Price must be greater than 0");
        return;
    }

    if (year < 1000 || year > 9999) {
        alert("Year must be a 4-digit number");
        return;
    }

    if (name.length > 20 && editIndex === "-1") {
        alert("Book name limit reached!");
        return;
    }
    const authors = document.getElementById("author").value.trim();

    if (!/^[A-Za-z\s]+$/.test(authors)) {
        alert("Author name must contain only letters");
        return;
    }

    if (authors.length < 3) {
        alert("Author name must be at least 3 characters");
        return;
    }


    const bookData = { name, author, price, year };

    if (editIndex === "-1") {
        books.push(bookData);
    } else {
        books[editIndex] = bookData;
        document.getElementById("editIndex").value = -1;
    }

    saveToLocalStorage();   // 👈 ADD THIS
    this.reset();
    DisplayBook();
});
function saveToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
}
// display book in task
function DisplayBook() {
    const table = document.getElementById("BookTable");
    const output = document.getElementById("titlesOutput");
    table.innerHTML = "";

    books.forEach((book, index) => {
        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.price}</td>
            <td>${book.year}</td>
            <td>
                <button type="button" class="btn btn-info btn-sm" onclick="editBook(${index})">Edit</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="deleteBook(${index})">Delete</button>
            </td>
        </tr>
`;

    });

    const titles = books.map(book => book.name);

    output.innerText = titles.length
        ? "📚 Book Names: " + titles.join(", ")
        : "Book Names Will Appear Here";
}
// edit book in task manager
function editBook(index) {
    const book = books[index];

    document.getElementById("name").value = book.name;
    document.getElementById("author").value = book.author;
    document.getElementById("price").value = book.price;
    document.getElementById("year").value = book.year;
    document.getElementById("editIndex").value = index;
}
// delete book from task
function deleteBook(index) {
    books.splice(index, 1);
    saveToLocalStorage();  
    DisplayBook();
}
