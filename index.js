`use strict`;

const feedparser = require(`feedparser-promised`);

const url = `http://www.theonion.com/feeds/rss`;

feedparser.parse(url).then( (items) => {
  items.forEach( (item) => {
    console.log(`title: ${item.title} length: ${item.title.length}`);
  });
}).catch( (error) => {
  console.log(`error: `, error);
});
