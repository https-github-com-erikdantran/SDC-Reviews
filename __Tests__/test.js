const supertest = require('supertest');
const app = require('./mockServer.js');

test('Should get review data for product id 2 with a limit of 2', async () => {
  await supertest(app).get('/reviews/?product_id=2&count=2')
  .expect(200)
  .then((res) => {
    expect(res.body.results.length).toBe(2)
    expect(res.body.product).toBe('2')
    expect(res.body.count).toBe('2')
    expect(res.body.results[0].review_id).toBe(3)
    expect(res.body.results[0].rating).toBe(4)
    expect(res.body.results[0].summary).toBe('I am liking these glasses')
    expect(res.body.results[0].recommend).toBe(1)
    expect(res.body.results[0].response).toBe(`Glad you're enjoying the product!`)
    expect(res.body.results[0].body).toBe(`They are very dark.  But that's good because I'm in very sunny spots`)
    expect(res.body.results[0].date).toBe('2020-12-30T10:57:31.000Z')
    expect(res.body.results[0].reviewer_name).toBe('bigbrotherbenjamin')
    expect(res.body.results[0].reviewer_email).toBe('first.last@gmail.com')
    expect(res.body.results[0].helpfulness).toBe(5)
    expect(res.body.results[0].photos[0].id).toBe(2742543)
  })
})

test('Should get review meta data for product_id 5', async () => {
  await supertest(app).get('/reviews/meta/?product_id=5')
  .expect(200)
  .then((res) => {
    expect(res.body.product_id).toBe('5')
    expect(res.body.ratings[3]).toBe(1)
    expect(res.body.ratings[4]).toBe(1)
    expect(res.body.recommended[1]).toBe(2)
    expect(res.body.characteristics.Size.id).toBe(14)
    expect(res.body.characteristics.Size.value).toBe("4.6250")
    expect(res.body.characteristics.Width.id).toBe(15)
    expect(res.body.characteristics.Width.value).toBe("4.2500")
    expect(res.body.characteristics.Comfort.id).toBe(16)
    expect(res.body.characteristics.Comfort.value).toBe("4.0000")
    expect(res.body.characteristics.Quality.id).toBe(17)
    expect(res.body.characteristics.Quality.value).toBe("3.5000")
  })
}, 10000)

test('Should post/add data to reviews', async () => {
  let newReview = {
    "product_id": 10,
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
  }
  await supertest(app).post('/reviews')
  .send(newReview)
  .expect(200)
})

test('Should expect success 200 for helpful', async () => {
  await supertest(app).put('/reviews/1/helpful')
  .expect(200)
})

test('Should expect success 200 for report', async () => {
  await supertest(app).put('/reviews/1/report')
  .expect(200)
})