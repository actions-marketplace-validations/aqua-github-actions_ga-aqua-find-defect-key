const core = require('@actions/core');

const Action = require('./action');

async function exec() {
  try {
    /* eslint max-len: "off" */
    if (!(process.env.AQUA_BASE_URL || core.getInput('aqua-base-url'))) throw new Error('Please specify aqua-base-url as input or AQUA_BASE_URL as env');
    if (!(process.env.AQUA_TOKEN || core.getInput('aqua-token'))) throw new Error('Please specify aqua-token as input or AQUA_TOKEN as env');
    if (!core.getInput('from')) throw new Error('Please specify from as input');

    const argv = {
      baseUrl: process.env.AQUA_BASE_URL || core.getInput('aqua-base-url'),
      token: process.env.AQUA_TOKEN || core.getInput('aqua-token'),
      from: core.getInput('from'),
    };

    await new Action({argv}).execute();
  } catch (error) {
    core.setFailed(error.toString());
  }
}

exec();
