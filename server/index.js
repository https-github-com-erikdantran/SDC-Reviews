const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router.js');
const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

const port = 5000;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

// 3,2, true,false,"bigbrotherbenjamin","first.last@gmail.com","Glad you're enjoying the product!",5
// 4,2, true,false,"fashionperson","first.last@gmail.com",null,1
// 5,2, true,false,"shortandsweeet","first.last@gmail.com",null,5
// 6,2, false,false,"negativity","first.last@gmail.com","Sorry to hear. Is there anything in particular you don't like?",0
// 7,2, false,false,"anyone","first.last@gmail.com",null,0
