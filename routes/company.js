var express = require('express');
var router = express.Router();

/*GET company page */
router.get('/', function(req, res, next){
	res.render('company/index', { title: 'Fill in your company name | tIMDr' });
});

module.exports = router;