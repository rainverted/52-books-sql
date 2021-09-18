const Validation = require('./Validation');
const Author = {};

/**
 * Autoriaus irasymas i duomenu baze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas.
 * @param {string} authorLastname Autoriaus pavarde.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius buvo irasytas i duomenu baze.
 */

Author.create = async (connection, authorFirstname, authorLastname) => {

    if (!Validation.isValidFirstName(authorFirstname)) {
        return `Autoriaus irasyti nepavyko: vardas negali būti tuščias. `
    }
    if (!Validation.isValidLastName(authorLastname)) {
        return `Autoriaus irasyti nepavyko: pavarde negali būti tuščias tekstas. `
    }

    //sql uzklausa rasoma su const, nes vykdoma funkcijoje
    const sql = 'INSERT INTO `authors`\
                (`id`, `firstname`, `lastname`)\
                VALUES (NULL, "'+ authorFirstname + '", "' + authorLastname + '")';
    const [rows] = await connection.execute(sql);
    return `Naujas autorius pridetas: ${authorFirstname} ${authorLastname}. `;

}

Author.listAll = async (connection) => {
    const sql = 'SELECT *\
                FROM `authors`';
    const [rows] = await connection.execute(sql);
    console.log('Autoriu sarasas:');
    const list = [];
    let i = 0;
    for (const { firstname, lastname } of rows) {
        list.push(`${++i}) ${firstname} ${lastname}`);
    }
    return list.join('\n');
    // const title = 'Autoriu sarasas:\n';
    // return title + infoList.join('\n');
}

Author.findById = async (connection, authorId) => {

    if (!Validation.IDisValid(authorId)) {
        return `ID gali būti tik baigtinis skaičius.`;
    }

    const sql = 'SELECT *\
                FROM `authors`\
                WHERE `id` = '+ authorId;
    const [rows] = await connection.execute(sql);

    for (const { firstname, lastname } of rows) {
        if (rows.length === 0) {
        }
        return `Pasirinktas autorius pagal ID yra ${firstname} ${lastname}`;
    }
    // if (rows.length === 0) {
    //     const name = rows[0].firstname;
    //     const surname = rows[0].lastname;
    //     const author = `${name} ${surname}`;
    //     return `Pasirinktas autorius pagal ID yra ${author}`;
    // }
}

Author.findByFirstname = async (connection, authorFirstname) => {
    if (!Validation.isText(authorFirstname)) {
        return `Vardas negali būti tuščias ir turi būti užrašytas tik lotyniškomis raidėmis.`;
    }

    const sql = 'SELECT *\
                FROM `authors`\
                WHERE `firstname` LIKE  "%' + authorFirstname + '%"';
    const [rows] = await connection.execute(sql);
    for (const { id } of rows) {
        return `Autorius, kurio vardas - ${authorFirstname}, id - ${id}.`
    }
}

Author.findByLastname = async (connection, authorLastname) => {
    if (!Validation.isText(authorLastname)) {
        return `Pavardė negali būti tuščias tekstas ir turi būti užrašytas tik lotyniškomis raidėmis.`;
    }
    const sql = 'SELECT *\
                FROM `authors`\
                 WHERE `lastname` LIKE  "%' + authorLastname + '%"';
    const [rows] = await connection.execute(sql);
    for (const { id } of rows) {
        return `Autorius, kurio pavardė - ${authorLastname}, id - ${id}.`;
    }
}

Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
    const sql = 'UPDATE `authors`\
                 SET ' + propertyName + '= "' + propertyValue + '"\
                 WHERE `authors`.`id` = ' + authorId;
    const [rows] = await connection.execute(sql);
    console.log(`Atnaujintas autoriaus vardas: "${propertyValue}"`);
}

Author.delete = async (connection, authorId) => {
    const sql = 'DELETE FROM `authors` WHERE `id` = ' + authorId;
    const [rows] = await connection.execute(sql);
    const res = `Autorius id:${authorId} sekmingai istrintas`;
    return res;
}

module.exports = Author;