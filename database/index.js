const mysql = require('mysql2');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'reviews'
})

connection.connect();

module.exports = connection;






/*
load data local infile '/Users/dkim6613/sdc-capstone/sample boolean csv.csv'
into table reviewsSample
fields terminated by ','
lines terminated by '\n'
ignore 1 rows
(id, recommend, reported, reviewer_name)
set
  recommend = case recommend
    when true then 1 else 0
  end
*/






//mysql commands for dataload
//reviews
/*
load data local infile '/Users/dkim6613/sdc-capstone/reviews.csv'
into table reviews
fields terminated by ','
lines terminated by '\n'
ignore 1 rows
(id, product_id, rating, @date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
SET date = FROM_UNIXTIME(@date/1000, '%Y-%m-%d %H:%i:%s %p');
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