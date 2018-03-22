const request = require('request');
const URL = require('url');

/**
 * send request to url
 * 
 * @param {string} url 
 * 
 * @returns {Promise}
 */
function sendRequest(url) {
    return new Promise((res, rej) => {
        request
            .get(url)
            .on('error', (err) => {
                return rej(err);
            })
            .on('response', (response) => {
                res(response);
            });
    });
}

/**
 * Cleanup nodes
 * @param {Object} nodes 
 * @returns {Array}
 */
function cleanNodes(base, nodes) {
    const checkedUrls = [];

    return nodes.filter((node) => {
        if (!node.href) {
            return;
        }

        let url = node.href;
        if (url.indexOf('://') === -1) {
            url = URL.resolve(base, url);
        }

        const protocol = URL.parse(url).protocol;
        if ((protocol === 'http:' || protocol === 'https:') && !checkedUrls.includes(url)) {
            checkedUrls.push(url);
            return node;
        }
    });
}

/**
 * Check if link points to 404 page
 * 
 * @param {any} url 
 * @returns {Promise}
 */
function checkLink(url) {
    let result = false;

    if (!url) {
        return Promise.reject(new Error('No URL provided'));
    }

    return sendRequest(url)
        .then((response) => {
            return { statusCode: response.statusCode, err: null };
        })
        .catch(e => {
            return { err: e.message, statusCode: null };
        });
}

module.exports = {
    checkLink,
    cleanNodes
};