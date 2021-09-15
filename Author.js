const Author = {};

Author.create = async (connection, authorFirstname, authorLastname) => {
    //sql uzklausa rasoma su const, nes vykdoma funkcijoje
    const sql = 'INSERT INTO `authors`\
                (`id`, `firstname`, `lastname`)\
                VALUES (NULL, "'+ authorFirstname + '", "' + authorLastname + '")';
    const [rows] = await connection.execute(sql);
    const res = `Naujas autorius pridetas: ${authorFirstname} ${authorLastname} `;
    console.log(res);
    return res;
    console.log('');
}

Author.listAll = async (connection) => {


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