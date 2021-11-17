const router = require('express').Router();
const controller = require('./controller.js');

router.route('/reviews/meta/').get(controller.getReviewData);
router.route('/reviews').get(controller.getReviews)
  // .post(controller.addReview);
router.route('/reviews/:review_id/helpful').put(controller.ReviewHelpful);
router.route('/reviews/:review_id/report').put(controller.ReviewReported);



module.exports = router;