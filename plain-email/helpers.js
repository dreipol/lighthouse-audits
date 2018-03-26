const isEmail = require('email-check');

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