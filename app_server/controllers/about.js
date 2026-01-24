/* GET about view */
const about = (req, res) => {
	res.render('about', { title: 'About Us' });
};

module.exports = {
	about
};