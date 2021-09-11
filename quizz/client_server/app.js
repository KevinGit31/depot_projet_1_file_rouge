const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(__dirname + '/quizz'));

router.get('*', function(req, res){
  res.sendFile(path.join(__dirname+'/quizz/index.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 32000);

console.log('Running at Port 32000');