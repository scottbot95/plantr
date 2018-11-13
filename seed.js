const { db, Gardener, Plot, Vegetable } = require('./models');

let veggies;
let plots;
let gardeners;

db.sync({force: true}).then(() => {
  return Vegetable.bulkCreate([
    {name: 'Carrot', color: 'orange'},
    {name: 'Eggplant', color: 'purple'},
    {name: 'Broccoli', color: 'green'},
    {name: 'Tomato', color: 'red'},
    {name: 'Onion', color: 'white'}
  ]);
}).then(() => {
  return Vegetable.findAll();
}).then((createdVeggies) => {
  veggies = createdVeggies;
  return Gardener.bulkCreate([
    {name: 'Frank', age: 52}, 
    {name: 'Julie', age: 35},
    {name: 'Henry', age: 22},
    {name: 'Jesse', age: 72}
  ]);
  // return Gardener.bulkCreate([
  //   {name: 'Frank', age: 52, favoriteVegetableId: veggies[0].id}, 
  //   {name: 'Julie', age: 35, favoriteVegetableId: veggies[3].id},
  //   {name: 'Henry', age: 22, favoriteVegetableId: veggies[1].id},
  //   {name: 'Jesse', age: 72, favoriteVegetableId: veggies[0].id}
  // ]);
}).then(() => {
  return Gardener.findAll();
}).then((createdGardeners) => {
  gardeners = createdGardeners;
  // console.log(veggies);
  return Promise.all(createdGardeners.map(gardener => {
    const rand = Math.floor(Math.random() * veggies.length);
    // console.log(veggies.dataValues[rand]);
    return gardener.setFavoriteVegetable(veggies[rand]);
  }));
}).then(() => {
  return Plot.bulkCreate([
    {size: 28, shaded: true},
    {size: 70, shaded: false},
    {size: 22, shaded: false},
    {size: 30, shaded: true},
    {size: 200, shaded: false},
    {size: 80, shaded: false},
    {size: 24, shaded: true},
  ]);
}).then(() => {
  return Plot.findAll();
}).then((createdPlots) => {
  plots = createdPlots;

  return Promise.all(plots.map(plot => {
    const numVeggies = Math.min(Math.ceil(plot.size / 10), veggies.length);
    
    const allowedVeggies = [...veggies];
    
    const plotVeggies = Array(numVeggies).fill(null).map(() => {
      // console.log(allowedVeggies.map(v => v ? v.name : undefined));
      const rand = Math.floor(Math.random() * allowedVeggies.length);
      return allowedVeggies.splice(rand, 1)[0];
      // return allowedVeggies[rand];
    });
    // console.log(plotVeggies.map(p => p.id));

    const p1 = plot.setVegetables(plotVeggies);

    const rand = Math.floor(Math.random() * gardeners.length);
    const p2 = plot.setGardener(gardeners[rand]);

    return Promise.all([p1,p2]);
  }));
}).catch((err) => {
  console.error(err);
}).finally(() => {
  db.close();
});