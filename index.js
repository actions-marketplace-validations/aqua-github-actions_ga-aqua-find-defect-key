const core = require('@actions/core');

const Action = require('./action');

async function exec() {
  try {
    /* eslint max-len: "off" */
    if (!(process.env.AQUA_BASE_URL || core.getInput('aqua-base-url'))) throw new Error('Please specify aqua-base-url as input or AQUA_BASE_URL as env');
    if (!(process.env.AQUA_TOKEN || core.getInput('aqua-token'))) throw new Error('Please specify aqua-token as input or AQUA_TOKEN as env');
    if (!core.getInput('defect')) throw new Error('Please specify defect as input');
    if (!core.getInput('comment')) throw new Error('Please specify comment as input');

    const argv = {
      baseUrl: process.env.AQUA_BASE_URL || core.getInput('aqua-base-url'),
      token: process.env.AQUA_TOKEN || core.getInput('aqua-token'),
      defect: core.getInput('defect'),
      comment: core.getInput('comment'),
    };

    await new Action({argv}).execute();
  } catch (error) {
    core.setFailed(error.toString());
  }
}

exec();
