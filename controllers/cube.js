
const cubeModel = require('../models/cube');

module.exports = {

  getCubes(req, res, next) {

    const { from, search, to } = req.query;
    let query = {}; 

    if (search) { query.name = new RegExp(search, 'i') }; 
    if (from) { query.difficultyLevel = { $gte: +from } };
    if (to) {
      query.difficultyLevel = query.difficultyLevel || {};
      query.difficultyLevel.$lte = +to;
    };

    cubeModel.find(query).populate('accessories') 
      .then((cubes) => { 
        console.log(JSON.stringify(cubes, null, 2));
        res.render('index', { title: 'Cube Workshop', cubes, search, from, to });
      }).catch(next);
  },

  getCube(req, res, next) {

    const id = req.params.id;

    cubeModel.findById(id).populate('accessories')
      .then(cube => {
        res.render('details', { title: 'Details | Cube Workshop', cube })
      }).catch(next);
  },

  postCreateCube(req, res, next) {

    const { name, description, imageUrl, difficultyLevel } = req.body;

    cubeModel.create({ name, description, imageUrl, difficultyLevel: +difficultyLevel })
      .then(() => res.redirect('/'))
      .catch(next);
  },

  getCreateCube(req, res) {

    res.render('create', { title: 'Create | Cube Workshop' });
  },

  getEditCube(req, res, next) {

    const id = req.params.id;

    cubeModel.findById(id)
    .then(cube=> res.render('edit',  { title: 'Edit | Cube Workshop' , cube}))
    .catch(next);
  },
  
  postEditCube(req, res, next) {

    const id = req.params.id;
    const { name, description, imageUrl, difficultyLevel } = req.body;

    cubeModel.update({ _id: id }, { name, description, imageUrl, difficultyLevel: +difficultyLevel }) //разликата от create, pri update горе добавихме ид и тук също
      .then(() => res.redirect('/'))
      .catch(next);
  },

  getDeleteCube(req, res, next) {

    const id = req.params.id;

    cubeModel.findById(id)
    .then(cube=> res.render('delete',  { title: 'Delete | Cube Workshop', cube }))
    .catch(next);
  },

  postDeleteCube(req, res, next) {

    const id = req.params.id;

    cubeModel.deleteOne({ _id: id }) 
      .then(() => res.redirect('/'))
      .catch(next)
  }
}