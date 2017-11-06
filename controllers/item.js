const Item = require('../models/Item');

/*
 * GET /item/new
 * Show new item page.
 */
exports.getNewItem = (req, res) => {
  res.render('item/newItem', {
    title: 'Create New Item'
  });
};

/*
 * POST /item/new
 * Create new item.
 */
exports.postNewItem = (req, res) => {
  req.assert('name', 'Name cannot be blank').notEmpty();
  
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/item/new');
  }

  var item = new Item({
    name: req.body.name
  });

  item.save((err, item) => {
    if (err) {
      req.flash('errors', {
        msg: err.message
      });
      return res.redirect('/item/new');
    }

    req.flash('success', {
      msg: 'Item has been created successfully.'
    });
    res.redirect('/item/new')
    });
};

/*
 * GET /item
 * Show all items
 */
exports.getItems = (req, res) => {
  Item.find((err, docs) => {
    res.render('item/allItems', {
      title: 'All Items',
      items: docs
    });
  });
};
