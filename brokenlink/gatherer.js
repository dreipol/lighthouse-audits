'use strict';

const Gatherer = require('lighthouse').Gatherer;
const request = require('request');
const URL = require('url');

class BrokenLinkGatherer extends Gatherer {
    constructor() {
        super();
        this.checkedUrls = [];
    }

    getLink(node) {
        return node.getAttribute('href');
    }

    getLinkText(node) {
        console.log(node.outerHTML);
        return node.innerText;
    }

    sendRequest(url) {
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

    checkLink(base, node) {
        return Promise.all([this.getLink(node)])
            .then(([url]) => {
                let result = false;

                if (!url) {
                    return Promise.reject(new Error('No URL provided'));
                }

                if (url.indexOf('http') === -1) {
                    url = URL.resolve(base, url);
                }

                if (this.checkedUrls.includes(url)) {
                    return null;
                }
                this.checkedUrls.push(url);

                return Promise.all([url, this.sendRequest(url)])
                    .then(([url, response]) => {
                        return { url, statusCode: response.statusCode };
                    })
            })
            .catch((e) => {
                return { error: e };
            });
    }

    afterPass(options) {
        const driver = options.driver;

        return driver.querySelectorAll('a')
            .then((results) => {
                return Promise.all(results.map(node => {
                    return this.checkLink(options.url, node);
                }));
            })
            .catch(e => console.error(e));
    }
}

module.exports = BrokenLinkGatherer;