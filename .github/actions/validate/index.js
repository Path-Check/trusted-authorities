const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const glob = require('glob');
const { validateYaml } = require('./validateYaml');

try {
    const root = core.getInput('root');
    console.log(`Validating files in directory '${root}'`);

    // options is optional
    glob(`${root}/*.yaml|${root}/*.yml`, {}, function (er, files) {
        if (er) {
            console.log('Glob error reading files!');
            core.setFailed(er.message)
        }
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
    })
} catch (error) {
    core.setFailed(error.message);
}
