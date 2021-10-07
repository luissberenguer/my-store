const faker = require('faker');
class CategoriesService {
  constructor(){
    this.categories = [];
    this.generate();
  }

  generate(){
    for (let i = 0; i < 100; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        categorie: faker.commerce.productAdjective(),
      })
    }
  }

  create(data){
    const newCategorie = {
      id: faker.datatype.uuid,
      ...data
    }
    this.categories.push(newCategorie);
    return newCategorie;
  }

  find(){
    return this.categories;
  }

  findOne(id){
    return this.categories.find(item => item.id == id)
  }

  update(id, changes){
    const index = this.categories.findIndex(item => item.id == id);
    if (index == -1){
      throw new Error('No se encontró ese index');
    }

    const categorie =  this.categories[index];
    this.categories[index] = {
      ...categorie,
      ...changes,
    }
    return this.categories[index];
  }

  deleteOne(id){
    const index = this.categories.findIndex(item => item.id == id);
    if (index == -1){
      throw new Error('No se encontró ese index');
    }
    this.categories.splice(index, 1);
    return id;
  }
}

module.exports = CategoriesService;
