const Joi = require('@hapi/joi');
const Yaml = require('js-yaml');

// Kept in sync with PathCheck GPS
const Coords = Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
});

const HaList = Joi.array().items(
    Joi.object({
        bounds: Joi.object({
            ne: Coords.required(),
            sw: Coords.required(),
        }),
        name: Joi.string().required(),
        org_id: Joi.string().required(),
        public_api: Joi.string().required(),
        cursor_url: Joi.string().required(),
    }).required(),
);

const Response = Joi.object({
    authorities: HaList.required(),
}).required();

const validateYaml = function (yamlString) {
    const { error, value } = Response.validate(Yaml.safeLoad(yamlString));
    if (error) throw error;
    return value;
}

module.exports = {
    validateYaml
}