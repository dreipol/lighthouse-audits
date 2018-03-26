const isEmail = require('is-email');

function cleanup(results) {
    results = results.filter((mail) => {
        if (isEmail(mail)) {
            return mail;
        }
    });

    return results.map((mail) => {
        return { mail };
    });
}

module.exports = {
    cleanup
};