const { searchService } = require('../services');

const viewBySearch = async (req, res) => {
  const { keyword } = req.query;

  const result = await searchService.viewBySearch(keyword);

  res.status(200).json({ data: result });
};

module.exports = { viewBySearch };
