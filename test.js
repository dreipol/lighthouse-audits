const { audit, gatherer } = require('./brokenlink');

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function launchChromeAndRunLighthouse(url, opts, config = null) {
    return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then(results => {
            // The gathered artifacts are typically removed as they can be quite large (~50MB+)
            delete results.artifacts;
            return chrome.kill().then(() => results)
        });
    });
}

const opts = {
    chromeFlags: []
};

const config = {
    settings: {},
    passes: [
        {
            passName: 'defaultPass',
            recordTrace: true,
            pauseAfterLoadMs: 10000,
            networkQuietThresholdMs: 5000,
            pauseAfterNetworkQuietMs: 5000,
            cpuQuietThresholdMs: 5250,
            gatherers: [
                gatherer
            ],
        },
    ],
    audits: [
        audit
    ],

    categories: {
        dreipol: {
            name: 'Dreipol Audits',
            description: 'Dreipol audits',
            audits: [
                { id: 'brokenlink-audit', weight: 1 },
            ],
        },
    }
}

// Usage:
launchChromeAndRunLighthouse('https://example.com', opts, config)
    .then(results => {
        console.log(results);
    });
