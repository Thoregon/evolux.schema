/**
 *
 *
 * @author: Bernhard Lukassen
 */

export default class Event {

    constructor({
                    name,
                    description,
                    params
                } = {}) {
        Object.assign(this, { name, description, params });
    }

}
