const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const cors = require('cors');

app.use(express.static(__dirname + '/quizz'));

router.get('*', function(req, res){
  res.sendFile(path.join(__dirname+'/quizz/index.html'));
});


app.use(cors({
    origin: '*'
}));

//add the router
app.use('/', router);
app.listen(process.env.port || 80);

console.log('Running at Port 80');