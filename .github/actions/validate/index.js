const core = require('@actions/core');
const github = require('@actions/github');
var fs = require('fs');
const { validateYaml } = require('./validateYaml');

try {
    // `file` input defined in action metadata file
    const file = core.getInput('file');
    console.log(`Validating file '${file}'`);

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        validateYaml(data)
            .then(() => console.log('Validation Succeeded'))
            .catch(error => {
                core.setFailed(error.message);
            })
    });
} catch (error) {
    core.setFailed(error.message);
}
