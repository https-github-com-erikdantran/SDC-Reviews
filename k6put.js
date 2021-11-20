import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 5,
  duration: '30s'
};

const putReviewHelpful = `http://localhost:5000/reviews/1/helpful`;
const putReviewReported = `http://localhost:5000/reviews/1/report`;

export default function () {
  const res = http.put(putReviewReported);
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
