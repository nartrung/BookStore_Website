const algoliaSearch = require("algoliasearch");

const client = algoliaSearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_SECRET
);
  
const index = client.initIndex(process.env.ALGOLIA_INDEX);

class SearchController{
    async search(req,res){
        try {
            let result = await index.search(req.body.title);
            res.json(result.hits);
          } catch (err) {
            res.json(err.message);
          }
    }
}

module.exports = new SearchController();