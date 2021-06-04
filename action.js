const Aqua = require('./lib/common/Aqua');
const core = require('@actions/core');
const _ = require('lodash');

const defectIdRegEx = /([df|DF]+[0-9]+)/g;

const eventTemplates = {
  branch: '{{event.ref}}',
  commits: '{{event.commits.map(c=>c.message).join(\' \')}}',
};

module.exports = class {
  constructor({argv, githubEvent}) {
    this.Aqua = new Aqua({
      baseUrl: argv.baseUrl,
      token: argv.token,
    });

    this.from = argv.from;
    this.githubEvent = githubEvent;
  }

  async execute() {
    // search for defect keys on from
    const template = eventTemplates[this.from];
    let searchStr = this.from;
    if (template) {
      searchStr = this.preprocessString(template);
    }
    const foundDefect = await this.findDefectKeyIn(searchStr);
    if (foundDefect) return foundDefect;
  }

  async findDefectKeyIn(searchStr) {
    const match = searchStr.match(defectIdRegEx);

    core.info(`Searching in string: \n ${searchStr}`);

    if (!match) {
      core.info(`No defect keys found in ${this.from}`);
      return;
    }

    for (const defectKey of match) {
      const defect = await this.Aqua.getDefect({'defect': defectKey});
      if (defect) {
        return {'defect': defectKey};
      }
    }
  }

  preprocessString(str) {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const tmpl = _.template(str);
    return tmpl({event: this.githubEvent});
  }
};
