/**
 *
 *
 * @author: Bernhard Lukassen
 */

export default class Schema {

    constructor({
                    id,
                    name,
                    description,
                    attributes,
                    methods,
                    indexes,
                    extend
                } = {}) {
        Object.assign(this, { name, description, attributes, methods, indexes, extend });
    }

    /**
     *
     * @param {Object} methods - an Object looking like a class object which implements the class (schema)
     */
    implement( methods ) {
        this._buildImplements();
        Object.assign(this.constructs, methods);
    }

    // **** private

    _buildImplements() {
        if (this.constructs) return;
        // todo: use classbuilder
    }
}
