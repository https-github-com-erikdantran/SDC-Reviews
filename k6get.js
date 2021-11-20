import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 5,
  duration: '30s'
};


const getReviews = `http://localhost:5000/reviews/?product_id=2&count=5`;
const getReviewData = `http://localhost:5000/reviews/meta/?product_id=2`;


export default function () {
  const res = http.get(getReviewData);
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
