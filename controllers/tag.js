const Tag = require('../models/Tag');

/*
 * GET /tag/new
 * Show new tag page
 */
exports.getNewTag = (req, res) => {
  res.render('tag/newTag', {
    title: 'Create New Tag'
  });
};

/*
 * POST /tag/new
 * Create new tag.
 */
exports.postNewTag = (req, res) => {
  req.assert('name', 'Name cannot be blank').notEmpty();
  
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/tag/new');
  }

  var tag = new Tag({
    name: req.body.name
  });

  tag.save((err, tag) => {
    if (err) {
      req.flash('errors', {
        msg: err.message
      });
      return res.redirect('/tag/new');
    }

    req.flash('success', {
      msg: 'Tag has been created successfully.'
    });
    res.redirect('/tag/all')
    });
};

/*
 * GET /tag/all
 * Show all tags
 */
exports.getTags = (req, res) => {
  Tag.find((err, docs) => {
    res.render('tag/allTags', {
      title: 'All Tags',
      tags: docs
    });
  });
};
