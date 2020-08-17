const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const glob = require('glob');
const { validateYaml } = require('./validateYaml');

try {
    const root = core.getInput('root');
    console.log(`Validating files in directory '${root}'`);

    const files = glob.sync('(*.yaml|*.yml)', { root });
    console.log('files: ', files)
    files.forEach(f => {
        console.log(`Validating file: ${f}`);
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err;
            validateYaml(data)
                .then(() => console.log('Validation Succeeded'))
                .catch(error => {
                    core.setFailed(error.message);
                })
        });
    })
} catch (error) {
    core.setFailed(error.message);
}
