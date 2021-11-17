const db = require('../database/index.js');

const controller = {

  // getReviews: (req, res) => {
  //   let {product_id, count} = req.query;
  //   const queryStr = `select * from reviews where product_id = ${product_id} limit ${count}`;

  //   db.query(queryStr, (err, results) => {
  //     if (err) {
  //       res.status(404).send(err);
  //     } else {
  //       res.status(200).send(results);
  //     }
  //   })
  // },

  getReviews: (req, res) => {
    let {product_id, count} = req.query;
    // const queryStr = `select * from reviews where product_id = ${product_id} limit ${count}`;
    const queryStr = `select * from reviews inner join reviews_photos on reviews.product_id = ${product_id} and reviews.id = reviews_photos.review_id limit ${count}`;

    db.query(queryStr, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        let data = {
          product: product_id,
          count: count,
          results: [],
        };
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
            // for (let j = 0; j < ) {

            // }
          }
          data.results.push(resultsObj)
        };
        res.status(200).send(results)
      }
    })
  },

  // getReviewData: (req, res) => {
  //   let {product_id} = req.query;
  //   const queryStr = ``;
  // }


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