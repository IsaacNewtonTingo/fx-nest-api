const cheerio = require("cheerio");

async function getReadTime(content) {
  const wordsPerMinute = 200;
  const plainContent = stripHtmlTags(content);
  const words = plainContent.split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);

  return readTime;
}

function stripHtmlTags(html) {
  const $ = cheerio.load(html);
  return $.text();
}

module.exports = {
  getReadTime,
};
