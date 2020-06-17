const fs = require('fs');
const { json } = require('express');

class usersRepository {
  constructor(filename) {
    //   we used the sync version since we will be only creating
    //   once instance of the users Class.
    //   constructor in js are not allowed to be async in nature.
    if (!filename)
      throw new Error('a file must be created before having a userRepository');

    this.filename = filename;

    try {
      fs.accessSync(filename);
    } catch (e) {
      fs.writeFileSync(this.filename, '[]');
    }
  }
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf-8',
      })
    );
  }
}
const test = async () => {
  const repo = new usersRepository('users.json');
  const data = await repo.getAll();
  console.log(data);
};
test();
