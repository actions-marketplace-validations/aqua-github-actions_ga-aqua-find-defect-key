const Aqua = require('./lib/common/Aqua');
const core = require('@actions/core');


module.exports = class {
  constructor({argv}) {
    this.Aqua = new Aqua({
      baseUrl: argv.baseUrl,
      token: argv.token,
    });

    this.from = argv.from;
  }

  async execute() {
    core.info('From: ' + this.from);
    // search for defect keys on from

    // search for defect on aqua

    // if defect on aqua exists, return this key
  }
};
