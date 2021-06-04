const core = require('@actions/core');

const githubEvent = require(process.env.GITHUB_EVENT_PATH);
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

    const result = await new Action({argv, githubEvent}).execute();
    if (result) {
      core.setOutput('defect', result.defect);
    }
  } catch (error) {
    core.setFailed(error.toString());
  }
}

exec();
