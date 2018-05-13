module.exports = {
    name: 'PSI',
    description: 'Page Speed Insight',
    audits: [
        { id: 'psi-speed-score', weight: 1 },
        { id: 'psi-usability-score', weight: 1 },

        { id: 'psi-html', weight: 0 },
        { id: 'psi-css', weight: 0 },
        { id: 'psi-css-resources', weight: 0 },
        { id: 'psi-img', weight: 0 },
        { id: 'psi-js', weight: 0 },
        { id: 'psi-js-resources', weight: 0 },
    ],
};
