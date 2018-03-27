const isEmail = require('email-check');

/**
 * Clean up the array of mails
 * 
 * @param {Array<string>} results 
 */
function cleanup(results) {
    return new Promise((res, rej) => {
        results = results.filter(async (mail) => {
            const isMailValid = await isEmail(mail);

            if (isMailValid) {
                return mail;
            }
        });

        return res(results.map((mail) => {
            return { mail };
        }));
    });
}

module.exports = {
    cleanup
};