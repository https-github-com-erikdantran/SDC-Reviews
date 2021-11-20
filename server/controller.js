const connection = require('../database/index.js');

const controller = {

  getReviews: (req, res) => {
    let {product_id, count} = req.query;

    const queryStr = `select * from reviews where product_id = ${product_id} limit ${count}`;

    connection.query(queryStr, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        let data = {
          product: product_id,
          count: count,
          results: [],
        };
        if (results.length === 0) {
          return res.send(data);
        }
        const photoQueryStr = `select * from reviews_photos where review_id >= ${results[0].id} and review_id <= ${results[results.length - 1].id}`;
        connection.query(photoQueryStr, (photoErr, photoResults) => {
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

    connection.query(queryStr, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        let data = {
          product_id: product_id,
          ratings: {},
          recommended: {},
          characteristics: {}
        };
        const characteristicsQueryStr = `select * from characteristics where product_id = ${product_id}`
        connection.query(characteristicsQueryStr, (characteristicsErr, characteristicsResults) => {
          if (characteristicsErr) {
            res.status(404).send(characteristicsErr);
          } else {
            const charReviewQueryStr = `select * from characteristics_reviews where characteristic_id >= ${characteristicsResults[0].id} and characteristic_id <= ${characteristicsResults[characteristicsResults.length - 1].id}`;
            connection.query(charReviewQueryStr, (charReviewErr, charReviewResults) => {
              if (charReviewErr) {
                res.status(404).send(charReviewErr);
              } else {
                tempcharacteristics = {};
                for (let i = 0; i < characteristicsResults.length; i++) {
                  var sumOfValues = 0;
                  var iteration = 0;
                  for (let j = 0; j < charReviewResults.length; j++) {
                    if (characteristicsResults[i].id === charReviewResults[j].characteristic_id) {
                      sumOfValues += charReviewResults[j].value;
                      iteration++;
                    }
                  }
                  var avgOfValues = (sumOfValues / iteration).toFixed(4);
                  tempcharacteristics[characteristicsResults[i].name] = {
                    id: characteristicsResults[i].id,
                    value: charReviewResults[i] ? avgOfValues : 0
                  }
                }
                data.characteristics = tempcharacteristics;
                tempRatings = {};
                for (let i = 0; i < results.length; i++) {
                  if (tempRatings[results[i].rating] === undefined) {
                    tempRatings[results[i].rating] = 1;
                  } else {
                    tempRatings[results[i].rating]++
                  }
                }
                data.ratings = tempRatings;
                tempRecommended = {};
                for (let i = 0; i < results.length; i++) {
                  if (tempRecommended[results[i].recommend] === undefined) {
                    tempRecommended[results[i].recommend] = 1;
                  } else {
                    tempRecommended[results[i].recommend]++;
                  }
                }
                data.recommended = tempRecommended;
              }
              res.status(200).send(data)
            })
          }
        })
      }
    })
  },


  addReview: (req, res) => {
    let {product_id, rating, summary, body, recommend, name, email, photos, characteristics} = req.body;

    const reviewQueryStr = `
    insert into reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
      values (${product_id}, ${rating}, now(), "${summary}", "${body}", ${recommend}, false, "${name}", "${email}", null, 0)`;

    connection.query(reviewQueryStr, (reviewErr, reviewResults) => {
      if (reviewErr) {
        res.status(404).send(reviewErr);
      } else {
        const reviewId = reviewResults.insertId;
        if (req.body.photos) {
          const reviewPhotoStr = `INSERT INTO reviews_photos (review_id, url)
          VALUES (${reviewId}, "${photos}")`;

          connection.query(reviewPhotoStr, (reviewPhotoErr, reviewPhotoResults) => {
            if (reviewPhotoErr) {
              res.status(404).send(reviewPhotoErr)
            }
          })
        }
        for (const [key, value] of Object.entries(characteristics)) {
          const characteristicReviewStr = `insert into characteristics_reviews (characteristic_id, review_id, value)
          VALUES (${key}, ${reviewId}, ${value})`;

          connection.query(characteristicReviewStr, (characteristicErr, characteristicResults) => {
            if (characteristicErr) {
              res.status(404).send(characteristicErr)
            }
          })
        }
      }
      res.status(200).send('successfully added data')
    })
  },


  ReviewHelpful: (req, res) => {
    let {review_id} = req.params;
    const queryStr = `update reviews set helpfulness = helpfulness + 1 where id = ${review_id}`;

    connection.query(queryStr, (err, results) => {
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

    connection.query(queryStr, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(`successfully changed reported to true for review_id: ${review_id}`)
      }
    })
  }


}


module.exports = controller;