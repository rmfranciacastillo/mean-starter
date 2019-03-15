/**
 * GET /
 * Home Page
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Homepage',
  });
};
