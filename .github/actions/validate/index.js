const core = require('@actions/core');
const fs = require('fs');
const glob = require('glob');
const { validateYaml } = require('./validateYaml');

try {
    const root = core.getInput('root');

    console.log(`Validating files in directory '${root}'`);
    const files = [
        ...glob.sync('/*.yaml', { root }),
        ...glob.sync('/*.yml', { root })
    ];

    console.log('Files to validate: ', files)
    files.forEach(file => {
        console.log(`Validating file: ${file}`);
        const data = fs.readFileSync(file, 'utf8');
        validateYaml(data);
        console.log('Validation Succeeded');
    })
} catch (error) {
    core.setFailed(error.message);
}
