const { Audit } = require('lighthouse');

module.exports = function createDetails(data) {
    const headings = [
        { key: 'kb', itemType: 'text', text: 'KB' },
        { key: 'max', itemType: 'text', text: 'max' },
        { key: 'diff', itemType: 'text', text: 'diff' },
        { key: 'rate', itemType: 'text', text: 'rate' },
    ];

    return Audit.makeTableDetails(headings, data);
}
