/**
 *
 *
 * @author: Bernhard Lukassen
 */

export default class Schema {

    constructor({
                    id,
                    name,
                    ref,        // name with namespace
                    description,
                    attributes,
                    methods,
                    indexes,
                    extend
                } = {}) {
        Object.assign(this, { name, ref, description, attributes, methods, indexes, extend });
        this.attributes =   this.attributes || {};
        this.methods =      this.methods    || {};
        this.indexes =      this.indexes    || {};
    }

    /**
     * check the properties for their values and also missing mandatory
     *
     * @param properties
     * @return {async boolean}
     */
    async validate(properties) {
        return true;
    }

    /**
     *
     * @param {Object} methods - an Object looking like a class object which implements the class (schema)
     */
    implement( methods ) {
        this._buildImplements();
        Object.assign(this.constructs, methods);
    }

    get jsProperties() {
        let properties = {};
        Object.entries(this.attributes).forEach(([name, def]) => {
            properties[name] = def.default;
        });
        return properties;
    }

    // **** private

    _buildImplements() {
        if (this.constructs) return;
        // todo: use classbuilder
    }
}
