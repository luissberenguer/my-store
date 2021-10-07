const faker = require('faker');
class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      })
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid,
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 500)
    })
  }

  async findOne(id){
    return new Promise((resolve, reject) => {
      try {
        resolve(this.products.find(item => item.id == id));
      } catch (error) {
        reject(error);
      }
    })
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id == id);
    if (index == -1){
      throw new Error('No se encontró ese index');
    }

    const product =  this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    }
    return this.products[index];
  }

  async deleteOne(id){
    const index = this.products.findIndex(item => item.id == id);
    if (index == -1){
      throw new Error('No se encontró ese index');
    }
    this.products.splice(index, 1);
    return id;
  }
}

module.exports = ProductsService;
