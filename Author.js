const Author = {};

/**
 * Autoriaus irasymas i duomenu baze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas.
 * @param {string} authorLastname Autoriaus pavarde.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius buvo irasytas i duomenu baze.
 */

Author.create = async (connection, authorFirstname, authorLastname) => {
    //sql uzklausa rasoma su const, nes vykdoma funkcijoje
    const sql = 'INSERT INTO `authors`\
                (`id`, `firstname`, `lastname`)\
                VALUES (NULL, "'+ authorFirstname + '", "' + authorLastname + '")';
    const [rows] = await connection.execute(sql);
    const res = `Naujas autorius pridetas: ${authorFirstname} ${authorLastname} `;
    console.log(res);
    return res;
}

Author.listAll = async (connection) => {
    const sql = 'SELECT *\
                FROM `authors`';
    const [rows] = await connection.execute(sql);
    console.log('');
    console.log('Autoriu sarasas:');
    const list = [];
    i = 0;
    for (const { firstname, lastname } of rows) {
        list.push(`${++i}) ${firstname} ${lastname}`);
    }
    return list.join('\n');

    //const title = 'Autoriu sarasas:\n';
    //return title + infoList.join('\n');
}

Author.findById = async (connection, authorId) => {

}

Author.findByFirstname = async (connection, authorFirstname) => {
}

Author.findByLastname = async (connection, authorLastname) => {
}

Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
}

Author.delete = async (connection, authorId) => {
}

module.exports = Author;