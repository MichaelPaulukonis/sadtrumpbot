`use strict`;

(function() {

  const feedparser = require(`feedparser-promised`),
        url = `http://www.theonion.com/feeds/rss`;

  let config = require(`./config.js`),
      Util = require(`./util.js`),
      util = new Util(),
      Twit = require(`twit`),
      T = new Twit(config),
      Promise = require(`bluebird`);

  var logger = function(msg) {
    if (config.log) console.log(msg);
  };

  let tweeter = function(headlines) {

    let headline = util.pick(headlines);

    if (headline.length === 0 || headline.length > 140) {
      birded();
    } else {
      if (config.tweet_on) {
        T.post(`statuses/update`, { status: headline }, function(err, reply) {
          if (err) {
            console.log(`error:`, err, reply);
          }
          else {
            // nothing on success unless we wanna get crazy with logging replies
            logger(`posted: ${headline}`);
          }
        });
      }
    }
  };

  let birded = function() {

    let loadURLs = function() {
      return new Promise((resolve, reject) => {
        feedparser.parse(url).then( (items) => {
          resolve(items);
        }).catch( (error) => {
          console.log(`error: `, error);
          reject(new Error(`Could not load feed`));
        });
      });
    };

    loadURLs()
      .then((items) => items
            .map(item => `${item.title}. SAD!`)
            .filter(item => item.match(/trump/i) === null)
           )
      .then(tweeter)
      .catch(error => console.error(`Error in promise chain`, error));
  };

  birded();

}());
