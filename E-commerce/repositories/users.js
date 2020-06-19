const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);
const repository = require('./repository');

class UsersRepository extends repository {
  async create(attrs) {
    attrs.id = this.randomId();
    const records = await this.getAll();

    const salt = crypto.randomBytes(8).toString('hex');
    const buffer = await scrypt(attrs.password, salt, 64);
    const record = {
      ...attrs,
      password: `${buffer.toString('hex')}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async comparePasswords(saved, supplied) {
    // saved > the hashed.salt password saved on the data base
    // supplied > the password provided by the user on signup

    // const hashed = saved.split('.')[0];
    // const salt = saved.split('.')[1];
    const [hashed, salt] = saved.split('.');
    const hashedSuppliedBuffer = await scrypt(supplied, salt, 64);
    return hashed === hashedSuppliedBuffer.toString('hex');
  }
}

module.exports = new UsersRepository('users.json');

// class testing logic

// const test = async () => {
//   const repo = new UsersRepository('users.json');
//   // await repo.create({ email: 'test@test.com', password: 'password' });
//   // const users = await repo.getAll();
//   // await repo.delete('4682738e');

//   // const user = await repo.getOneBy({
//   //   email: 'test@test.csom',
//   // });
//   // console.log(user);
// };

// test();
