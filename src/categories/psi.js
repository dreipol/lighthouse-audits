module.exports = {
    name: 'PSI',
    description: 'Page Speed Insight',
    audits: [
        { id: 'psi-speed-score', weight: 5 },
        { id: 'psi-usability-score', weight: 5 },

        { id: 'psi-html', weight: 1 },
        { id: 'psi-css', weight: 1 },
        { id: 'psi-css-resources', weight: 1 },
        { id: 'psi-img', weight: 1 },
        { id: 'psi-js', weight: 1 },
        { id: 'psi-js-resources', weight: 1 },
    ],
};
