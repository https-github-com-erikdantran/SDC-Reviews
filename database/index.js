const mysql = require('mysql2');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'reviews'
})

connection.connect();

module.exports = connection;






//mysql commands for dataload
//reviews
/*
load data local infile '/Users/dkim6613/sdc-capstone/reviews.csv'
into table reviews
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\n'
ignore 1 rows
(id, product_id, rating, @date, summary, body, @recommend, @reported, reviewer_name, reviewer_email, response, helpfulness)
SET
  date = FROM_UNIXTIME(@date/1000, '%Y-%m-%d %H:%i:%s %p'),
  recommend = IF(@recommend='true',1,0),
  reported = IF(@reported='true',1,0);
*/

//reviews_photos
/*
load data local infile '/Users/dkim6613/sdc-capstone/reviews_photos.csv'
into table reviews_photos
fields terminated by ','
lines terminated by '\n'
ignore 1 rows
(id, review_id, url);
*/

//characteristics
/*
load data local infile '/Users/dkim6613/sdc-capstone/characteristics.csv'
into table characteristics
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\n'
ignore 1 rows
(id, product_id, name)
*/

//characteristics_reviews
/*
load data local infile '/Users/dkim6613/sdc-capstone/characteristic_reviews.csv'
into table characteristics_reviews
fields terminated by ','
lines terminated by '\n'
ignore 1 rows
(id, characteristic_id, review_id, value)
*/

/**
 {
    "product_id": 3,
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
 */