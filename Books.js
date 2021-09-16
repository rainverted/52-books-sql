/**
 * Kaip rasyti JSDOc'sus?
 * Link: https://jsdoc.app
 */

const Books = {};

/**
 * Autoriaus isleistos knygos irasymas i duombaze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} bookName Knygos pavadinimas.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.create = async (connection, authorId, bookName, bookReleaseYear) => {
    const sql = 'INSERT INTO `books`\
                (`id`, `author_Id`, `bookname`, `release_year`) \
                VALUES (NULL, "'+ authorId + '", "' + bookName + '", "' + bookReleaseYear + '")';
    const [rows] = await connection.execute(sql);
    const res = `Knyga "${bookName}" sekmingai irasyta`;
    console.log(res);
    return res;
}

/**
 * Visu autoriu isleistu knygu sarasas.
 * @param {object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<Object[]>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.listAll = async (connection) => {
    const sql = 'SELECT *, firstname, lastname\
                FROM `books`\
                LEFT JOIN `authors`\
                    ON `authors`.`id` = `books`.`author_Id`';
    const [rows] = await connection.execute(sql);
    const list = [];
    let i = 0;
    for (const { firstname, lastname, bookname, release_year } of rows) {
        list.push(`${++i}) ${firstname} ${lastname} isleido knyga "${bookname}" ${release_year} metais.`);
    };
    const title = 'Visu autoriu isleistu knygu sarasas:\n';
    return title + list.join('\n');
}

/**
 * Knygos paieska pagal pavadinima.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} bookName Knygos pavadinimas.
 * @returns {Promise<Object[]>} Sarasas su knygu objektais.
 */
Books.findByName = async (connection, bookName) => {
    const sql = 'SELECT *, `authors`.`id`\
                FROM `books`\
                LEFT JOIN `authors`\
                        ON `authors`.`id` = `books`.`author_Id`\
                WHERE `bookname` LIKE  "%' + bookName + '%"';
    const [rows] = await connection.execute(sql);
    for (const { id } of rows) {
        return `Autorius, kurio ID:${id} parase knyga ${bookName}`;
    };
}

Books.findByYear = async (connection, bookReleaseYear) => {
    const sql = 'SELECT *, `authors`.`id`\
                FROM `books`\
                LEFT JOIN `authors`\
                        ON `authors`.`id` = `books`.`author_Id`\
                WHERE `release_year` LIKE  "%' + bookReleaseYear + '%"';
    const [rows] = await connection.execute(sql);
    for (const { bookname } of rows) {
        return `Knyga "${bookname}" isleista ${bookReleaseYear} metais.`;
    };
}

Books.updateById = async (connection, bookId, propertyName, propertyValue) => {
    const sql = 'UPDATE `books`\
                SET `'+ propertyName + '`= "' + propertyValue + '" \
                WHERE `books`.`id` =' + bookId;
    const [rows] = await connection.execute(sql);
    console.log(`Knygos informacija atnaujinta sekmingai: "${propertyValue}"`);
}

Books.updateNameById = async (connection, bookId, bookName) => {

}

Books.updateYearById = async (connection, bookId, bookReleaseYear) => {
}

Books.delete = async (connection, bookId) => {
}

Books.deleteAllByAuthorId = async (connection, authorId) => {
}

module.exports = Books;