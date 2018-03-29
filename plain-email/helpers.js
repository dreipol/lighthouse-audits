const isEmail = require('email-check');

/**
 * Clean up the array of mails
 * 
 * @param {Array<string>} results 
 */
function cleanup(results) {
    const promises = results.map((mail) => {
        return isEmail(mail)
            .then(isMailValid => {
                if (isMailValid) {
                    return mail;
                }
            });
    });

    return Promise.all(promises)
        .then((mails) => {
            return mails.filter((mail) => {
                if (mail) {
                    return { mail };
                }
            });
        });
}

module.exports = {
    cleanup
};