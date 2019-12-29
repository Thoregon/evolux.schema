/**
 *
 *
 * @author: Bernhard Lukassen
 */

export default class Method {

    constructor({
                    name,
                    description,
                    params,
                    fn
                } = {}) {
        Object.assign(this, { name, description, params, fn });
    }

}
