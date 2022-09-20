var express = require('express')
var router = express.Router()
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '185.85.211.100',
  user     : 'u32_bNaoRJn1Mr',
  password : 'VzXILNsIrE+x30IUyTzmPFf!',
  database : 's32_mysafety'
});
 
connection.connect();

router.get('/', function (req, res) {
    connection.query('SELECT * FROM premiumcodes', function (error, results, fields) {
        if (error) throw error;
        // console.log('All codes: ', results)
        res.send({Codes: results})
    });
})

router.post('/', function (req, res) {
    // console.log('whoh!!')
    function getRandomString(length) {
        var randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
      } 

      var code = getRandomString(12);
      var date = Date.now();

    connection.query(`INSERT INTO premiumcodes (premiumcode, time) VALUES ('premium_key_${code}', '${date}')`, function (error, results, fields) {
        if (error) throw error;
        // console.log('1 record inserted')
        res.send({Code: `premium_key_${code}`})
    });
})

router.delete('/', function (req, res) {
    // console.log('whoh!!')
    var premcode = req.query.code

    // console.log(premcode)
    
    connection.query(`DELETE FROM premiumcodes WHERE premiumcode=${premcode}`, function (error, results, fields) {
        if (error) throw error;
        // console.log(results)
        if (results.affectedRows == 0) {
            // console.log('nah bro couldnt find this stuff')
            res.send({success: false})
        } else {
            res.send({success: true})
        }
        
    });
})


module.exports = router