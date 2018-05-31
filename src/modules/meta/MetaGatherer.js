'use strict';

const { Gatherer } = require('lighthouse');

class MetaGatherer extends Gatherer {
    constructor() {
        super();
    }

    async afterPass(options) {
        const driver = options.driver;
        const expression = `(function() {
                        
            return getElements(document.querySelectorAll('meta[name="robots"]'));
            
            function getElements(elements){
              let myElements = [];
              elements.forEach(node => {
                myElements.push({
                  nodeName: node.nodeName,
                  attributes: getAttributeObjects(node.attributes)
                });
              });
              
              return myElements;
            }
            
            function getAttributeObjects(attributes){
              let attrs = {};
              for(let i = 0; i <attributes.length; i++){
                let item = attributes.item(i);
                attrs[item.name] = item.value;
              }
              return attrs;
            }
        })()`;

        return await driver.evaluateAsync(expression);
    }
}

module.exports = MetaGatherer;
