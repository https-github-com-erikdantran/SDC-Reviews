import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 5,
  duration: '30s'
};

const postReviewsData = {
  "product_id": 1,
  "rating": 2,
  "summary": "test summary",
  "body": "test body",
  "recommend": true,
  "name": "test name3",
  "email": "test email3",
  "photos": "google.com/image",
  "characteristics": {
      "14": 5,
      "15": 5
  }
};

const params = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const postReviews = `http://localhost:5000/reviews`;

export default function () {
  const res = http.post(postReviews, postReviewsData, params);
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 10ms': r => r.timings.duration < 10,
    'transaction time < 20ms': r => r.timings.duration < 20,
    'transaction time < 50ms': r => r.timings.duration < 50,
    'transaction time < 100ms': r => r.timings.duration < 100,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 10000ms': r => r.timings.duration < 10000,
    'transaction time < 20000ms': r => r.timings.duration < 20000,
    'transaction time < 30000ms': r => r.timings.duration < 30000
  });

  sleep(0.5);
};