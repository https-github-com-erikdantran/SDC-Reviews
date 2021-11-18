const db = require('../database/index.js');

const controller = {

  getReviews: (req, res) => {
    let {product_id, count} = req.query;
    const queryStr = `select * from reviews where product_id = ${product_id} limit ${count}`;

    db.query(queryStr, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        let data = {
          product: product_id,
          count: count,
          results: [],
        };
        const photoQueryStr = `select * from reviews_photos where review_id >= ${results[0].id} and review_id <= ${results[results.length - 1].id}`;
        db.query(photoQueryStr, (photoErr, photoResults) => {
          if (photoErr) {
            res.status(404).send(photoErr);
          } else {
            for (let i = 0; i < results.length; i++) {
              var resultsObj = {
                review_id: results[i].id,
                rating: results[i].rating,
                summary: results[i].summary,
                recommend: results[i].recommend,
                response: results[i].response,
                body: results[i].body,
                date: results[i].date,
                reviewer_name: results[i].reviewer_name,
                reviewer_email: results[i].reviewer_email,
                helpfulness: results[i].helpfulness,
                photos: []
              }
              for (let j = 0; j < photoResults.length; j++) {
                var photoObj = {
                  id: photoResults[j].id,
                  url: photoResults[j].url
                }
                if (results[i].id === photoResults[j].review_id) {
                  resultsObj.photos.push(photoObj)
                }
              }
              data.results.push(resultsObj)
            };
          }
          res.status(200).send(data)
        })
      }
    })
  },

  getReviewData: (req, res) => {
    let {product_id} = req.query;
    const queryStr = `select * from reviews where product_id = ${product_id}`;

    db.query(queryStr, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        console.log('results: ', results[3])
        let data = {
          product_id: product_id,
          ratings: {},
          recommended: {},
          characteristics: {}
        };
        tempRatings = {};
        tempRecommended = {};
        for (let i = 0; i < results.length; i++) {
          if (tempRatings[results[i].rating] === undefined) {
            tempRatings[results[i].rating] = 1;
          } else {
            tempRatings[results[i].rating]++
          }
        }
        data.ratings = tempRatings;
        for (let i = 0; i < results.length; i++) {
          if (tempRecommended[results[i].recommend] === undefined) {
            tempRecommended[results[i].recommend] = 1;
          } else {
            tempRecommended[results[i].recommend]++;
          }
        }
        data.recommended = tempRecommended;
        res.status(200).send(data)
      }
    })




  },


  // addReview: (req, res) => {

  // }


  ReviewHelpful: (req, res) => {
    let {review_id} = req.params;
    const queryStr = `update reviews set helpfulness = helpfulness + 1 where id = ${review_id}`;

    db.query(queryStr, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(`successfully increased helpfulness for review_id: ${review_id}`)
      }
    })
  },


  ReviewReported: (req, res) => {
    let {review_id} = req.params;
    const queryStr = `update reviews set reported = true where id = ${review_id}`;

    db.query(queryStr, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(`successfully changed reported to true for review_id: ${review_id}`)
      }
    })
  }


}


module.exports = controller;