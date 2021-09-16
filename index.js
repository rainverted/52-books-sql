const db = require('./db');
const Author = require('./Author');
const Books = require('./Books');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const conn = await db.init({
        host: 'localhost',
        user: 'root',
        database: 'books',
    });

    // LOGIC BELOW
    //AUTHORS
    await Author.create(conn, 'Vardenis', 'Pavardenis');
    await Author.create(conn, 'Petras', 'Petraitis');
    await Author.create(conn, 'Jonas', 'Jonaitis');

    const authors = await Author.listAll(conn);
    console.log(authors);
    console.log('');

    const uniqueId = await Author.findById(conn, 3);
    console.log(uniqueId);
    console.log('');

    const firstName = await Author.findByFirstname(conn, 'Petras');
    console.log(firstName);
    console.log('');

    const lastName = await Author.findByLastname(conn, 'Vardenis');
    console.log(lastName);
    console.log('');

    const update = await Author.updatePropertyById(conn, 1, 'firstname', 'Tomas')
    console.log('');

    // const deleteAuthor = await Author.delete(conn, 3);
    // console.log(deleteAuthor);


    //BOOKS
    await Books.create(conn, 1, 'Vanagas', '1000');
    await Books.create(conn, 2, 'Kovas', '2000');
    await Books.create(conn, 3, 'Kranklys', '2001');
    await Books.create(conn, 3, 'Zyle', '3000');
    console.log('');

    const booklist = await Books.listAll(conn);
    console.log(booklist);
    console.log('');

    const bookname = await Books.findByName(conn, 'Zyle');
    console.log(bookname);
    console.log('');

    const bookYear = await Books.findByYear(conn, '2001');
    console.log(bookYear);



}

app.init();

module.exports = app;