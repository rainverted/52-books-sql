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
    await Author.create(conn, 'Vardenis', 'Pavardenis');
    await Author.create(conn, 'Petras', 'Petraitis');
    await Author.create(conn, 'Jonas', 'Jonaitis');

    const authors = await Author.listAll(conn);
    console.log(authors);

    const uniqueId = await Author.findById(conn, 3);
    console.log(uniqueId);

    const firstName = await Author.findByFirstname(conn, 'Petras');
    console.log(firstName);

    const lastName = await Author.findByLastname(conn, 'Vardenis');
    console.log(lastName);

    // const update = await Author.updatePropertyById(conn, 1, 'Vardenis', 'Tomas')
    // console.log(update);

    const deleteAuthor = await Author.delete(conn, 3);
    console.log(deleteAuthor);
}

app.init();

module.exports = app;