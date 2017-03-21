`use strict`;

const feedparser = require(`feedparser-promised`);

const url = `http://www.theonion.com/feeds/rss`;

let versionone = function() {

  feedparser.parse(url).then( (items) => {
    items.forEach( (item) => {
      console.log(`title: ${item.title} length: ${item.title.length}`);
    });
  }).catch( (error) => {
    console.log(`error: `, error);
  });


};


let birded = function() {

  let Promise = require('bluebird');

  let loadURLs = function() {
    return new Promise((resolve, reject) => {
      feedparser.parse(url).then( (items) => {
        resolve(items);
      }).catch( (error) => {
        console.log(`error: `, error);
        reject(new Error('Could not load feed'));
      });
    });
  };

  loadURLs()
    .then((items) => items.map(item => console.log(`title: ${item.title} length: ${item.title.length}`)))
    .catch(error => console.error(`Error in promise chain`, error));

};


birded();
