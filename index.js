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
    const author1 = await Author.create(conn, 'Vardenis', 'Pavardenis');
    console.log(author1);
    const author2 = await Author.create(conn, '', 'Jonaitis');
    console.log(author2);
    const author3 = await Author.create(conn, 'Petras', 'Petraitis');
    console.log(author3);
    const author4 = await Author.create(conn, 'Jonas', 'Jonaitis');
    console.log(author4);
    const author5 = await Author.create(conn, 'Jonas', 'burokas');
    console.log(author5);
    console.log('');

    const authors = await Author.listAll(conn);
    console.log(authors);
    console.log('');

    const uniqueId1 = await Author.findById(conn, 3);
    console.log(uniqueId1);
    const uniqueId2 = await Author.findById(conn, 0);
    console.log(uniqueId2);
    const uniqueId3 = await Author.findById(conn, 2.2);
    console.log(uniqueId3);
    console.log('');

    const firstName1 = await Author.findByFirstname(conn, 'Petras');
    console.log(firstName1);
    const firstName2 = await Author.findByFirstname(conn, '');
    console.log(firstName2);
    const firstName3 = await Author.findByFirstname(conn, '5');
    console.log(firstName3);
    console.log('');

    const lastName1 = await Author.findByLastname(conn, 'Vardenis');
    console.log(lastName1);
    const lastName2 = await Author.findByLastname(conn, '');
    console.log(lastName2);
    console.log('');

    const update = await Author.updatePropertyById(conn, 1, 'firstname', 'Tomas')
    console.log('');

    // const deleteAuthor = await Author.delete(conn, 3);
    // console.log(deleteAuthor);


    // //BOOKS
    // await Books.create(conn, 1, 'Vanagas', '1000');
    // await Books.create(conn, 2, 'Kovas', '2000');
    // await Books.create(conn, 3, 'Kranklys', '2001');
    // await Books.create(conn, 3, 'Zyle', '3000');
    // console.log('');

    // const booklist = await Books.listAll(conn);
    // console.log(booklist);
    // console.log('');

    // const bookname = await Books.findByName(conn, 'Zyle');
    // console.log(bookname);
    // console.log('');

    // const bookYear = await Books.findByYear(conn, '2001');
    // console.log(bookYear);
    // console.log('');

    // const bookId = await Books.updateById(conn, 2, 'bookname', 'Kovas vol.II');
    // const newName = await Books.updateNameById(conn, 1, 'Skrydis');
    // const newYear = await Books.updateYearById(conn, 1, '2005');
    // console.log('');

    // const bookDelete = await Books.delete(conn, 1);
    // const deleteAll = await Books.deleteAllByAuthorId(conn, 3);




}

app.init();

module.exports = app;