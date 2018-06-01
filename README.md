# @dreipol/lighthouse-audits
[![CircleCI](https://circleci.com/gh/dreipol/lighthouse-audits.svg?style=svg)](https://circleci.com/gh/dreipol/lighthouse-audits)

Collection of useful lighthouse audits


# Install

    npm i @dreipol/lighthouse-audits --save

# Setup
This module provides some audits for deeper inspections and better quality of your website/project.

## Config
To add an audit to your lighthouse configuration you simply import this module. This module exports a couple of
object (See API below). Those modules contain audits and gatherers. Those can be simply be added to your already existent
lighthouse configuration.


**Example**

    const {
        PSI,
    } = require('@dreipol/lighthouse-audits');
    
    ...
    passes: [
            {
                passName: 'defaultPass',
                recordTrace: true,
                pauseAfterLoadMs: 10000,
                networkQuietThresholdMs: 10000,
                cpuQuietThresholdMs: 10000,
                gatherers: [
                
                    PSI.PSIGatherer,
                    
                    'url',
                    'scripts',
                    'css-usage',
                    'viewport',
                    'viewport-dimensions',
                    ...
    ...
    audits: [
        PSI.PSISpeedScoreAudit,
        
        'service-worker',
        'viewport',
        'without-javascript',
        
Now we've added the `gatherer` and the `audit`. But if we run the audits now, we wont see the result of the audit in the 
report, since we didn't added the category where the audit should be added at. There are two options.

First is to add all the categories and assign the audits by your own (recommended when not using the default)

    categories: {
        dreipol: {
            name: 'Dreipol Audits',
            description: 'Dreipol audits',
            audits: [
                { id: '<AUDIT_NAME>', weight: 5 },
            ],
        },
        psi: {
            name: 'PSI',
            description: 'Page Speed Insight audits',
            audits: [
                { id: 'psi-speed-score', weight: 5 },
                ...
            ],
        }

Or you can use the default categories exported by this module. Those default categories are available under `Categories`

Exmaple in your lighthouse config:

    const {
        Categories,
    } = require('@dreipol/lighthouse-audits');
    
    ...
    categories: {
        psi: Categories.PSI, 
        dreipol: Categories.Dreipol, 
    }
    


# Usage

## API
Structure of exported module. You can use these to add them as audits/gatherers

### Plain Email Addresses
| Class                         | Description | Audit Name
| -------                       | --------| --- |
|PlainEmail.PlainEmailGatherer  | Gahters email adresses from a webpage| | 
|PlainEmail.PlainEmailAudit  | Calculates the score for emails found on the page| `plain-email-audit`|

### Broken Links
| Class                         | Description | Audit Name
| -------                       | --------| --- | 
|BrokenLink.BrokenLinkGatherer  | Gathers all links from a page| |
|BrokenLink.BrokenLinkAudit  | Check if any link resolves to a 404 page|`brokenlink-audit`|

### Page Meta Tags
| Class                         | Description | Audit Name
| -------                       | --------| --- | 
|Meta.MetaGatherer  | Gather all META tags with the name='robots' on a page|| 
|Meta.MetaAudit  | Check if any tag has a `no-index` or `no-follow` value | `meta-audit` |

### Page Speed Insights
| Class                         | Description | Audit Name
| -------                       | --------| --- |
|PSI.PSIGatherer  | Runs a PSI report for the page | |
|PSI.PSISpeedScoreAudit  | Calculate score based on the speed score|`psi-speed-score`| 
|PSI.PSIUsabilityScoreAudit  | Calculate score based on the usability score|`psi-usability-score`| 
|PSI.PSIHTMLSizeAudit  | Calculate score based on the HTML size |`psi-html`| 
|PSI.PSICssSizeAudit  | Calculate score based on the CSS size |`psi-css`| 
|PSI.PSIImgSizeAudit  | Calculate score based on the IMG size |`psi-img`| 
|PSI.PSIJsSizeAudit  | Calculate score based on the JS size |`psi-js`| 
|PSI.PSIJsResourcesAudit  | Calculate score based on the amount of JS resources |`psi-js-resources`| 
|PSI.PSICssResourcesAudit  | Calculate score based on the amount of CSS resources |`psi-CSS-resources`| 

Example usage
`see above`



# Test
To test the config in the `/example` folder run 

    dreihouse report https://dreipol.ch -f ./example/lh.desktop.js -vvv
