/**
 *
 *
 * @author: Bernhard Lukassen
 */

export default class Attribute {

    constructor({
                    name,
                    description,
                    group,
                    tags,
                    type,
                    mandatory,
                    compute,
                    validate
                } = {}) {
        Object.assign(this, { name, description, group, tags, type, mandatory, compute, validate });
    }


}
