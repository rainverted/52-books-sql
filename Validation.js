class Validation {

    static isValidFirstName(firstName) {
        if (firstName === undefined ||
            typeof firstName !== 'string' ||
            firstName.length < 2 ||
            !Validation.isUpperCase(firstName[0])) {
            return false;
        }
        return true;
    }
    static isValidLastName(lastName) {
        if (lastName === undefined ||
            typeof lastName !== 'string' ||
            lastName.length < 2 ||
            !Validation.isUpperCase(lastName[0])) {
            return false;
        }
        return true;
    }


    static isUpperCase(letter) {
        return letter === letter.toUpperCase();
    }


    static IDisValid = (id) => {
        if (typeof id !== 'number' ||
            !isFinite(id) ||
            id < 1 ||
            id % 1 !== 0) {
            return false
        }
        return true
    }

    static isText = (text) => {
        const abc = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
        for (const t of text) {
            if (!abc.includes(t)) {
                return false
            }
            return true
        }

        if (text === undefined ||
            typeof text !== 'string' ||
            text.length < 2 ||
            text === '') {
            return false;
        }
        return true;
    }
}
module.exports = Validation;