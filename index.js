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


}

app.init();

module.exports = app;