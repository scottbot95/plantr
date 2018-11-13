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
}).then((createdVeggies) => {
  veggies = createdVeggies;
  return Gardener.bulkCreate([
    {name: 'Frank', age: 52, favoriteVegetableId: veggies[0].id}, 
    {name: 'Julie', age: 35, favoriteVegetableId: veggies[3].id},
    {name: 'Henry', age: 22, favoriteVegetableId: veggies[1].id},
    {name: 'Jesse', age: 72, favoriteVegetableId: veggies[0].id}
  ]);
}).then((createdGardeners) => {
  // gardeners = createdGardeners;
  // // console.log(veggies);
  // return Promise.all(createdGardeners.map(gardener => {
  //   const rand = Math.floor(Math.random() * veggies.length);
  //   console.log(veggies.dataValues[rand]);
  //   return gardener.setFavoriteVegetable(veggies.dataValues[rand]);
  // }));
}).catch((err) => {
  console.error(err);
}).finally(() => {
  db.close();
});