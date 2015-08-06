module.exports = {
  getOne: function(req, res, next) {
    console.log('---------------> here');
    res.json({
      data: 'data'
    });
  }
};