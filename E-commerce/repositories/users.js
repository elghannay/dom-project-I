const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename');
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  async create(attrs) {
    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id) {
    return await this.getAll().find((element) => element.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filtered = records.filter((element) => element.id !== id);
    await this.writeAll(filtered);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((element) => element.id === id);
    if (!record) throw new Error(`the user with the id ${id} is not found`);
    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      if (found) return record;
    }
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
