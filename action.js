const Aqua = require('./lib/common/Aqua');

module.exports = class {
  constructor({argv}) {
    this.Aqua = new Aqua({
      baseUrl: argv.baseUrl,
      token: argv.token,
    });

    this.defect = argv.defect;
    this.comment = argv.comment;
  }

  async execute() {
    await this.Aqua.addComment({
      defect: this.defect,
      comment: this.comment,
    });
  }
};
