const faker = require('faker');
class UsersService {
  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    for (let i = 0; i < 100; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        gender: faker.name.gender(),
      })
    }
  }

  create(data){
    const newUser = {
      id: faker.datatype.uuid,
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  find(){
    return this.users;
  }

  findOne(id){
    return this.users.find(item => item.id == id)
  }

  update(id, changes){
    const index = this.users.findIndex(item => item.id == id);
    if (index == -1){
      throw new Error('No se encontró ese index');
    }

    const user =  this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    }
    return this.users[index];
  }

  deleteOne(id){
    const index = this.users.findIndex(item => item.id == id);
    if (index == -1){
      throw new Error('No se encontró ese index');
    }
    this.users.splice(index, 1);
    return id;
  }
}

module.exports = UsersService;
