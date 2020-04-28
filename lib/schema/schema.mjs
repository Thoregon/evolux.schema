/**
 *
 *
 * @author: Bernhard Lukassen
 */

const Matter = () => universe.Matter;

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

    /*
     * key, index, id ...
     */

    keyFrom(object) {
        let key = undefined;
        if (this.hasKey()) {
            let keyprops = this.key.map(prop => this._prop(object, prop));
            key = keyprops.join('$|$');
        }
        return key;
    }

    hasKey() {
        return this.key && this.key.length > 0;
    }

    _prop(obj, path) {
        let parts = Array.isArray(path) ? path : path.split('.');
        let prop = parts.shift();
        let val = obj[prop];
        if (parts.length == 0) return val;
        return this._prop(val, parts);
    }

    keyedEntry(object, id) {
        let key = this.keyFrom(object);
        let entry = {};
        if (!id); // create id
        entry[key] = id;
        return entry;
    }

    // **** private

    _buildImplements() {
        if (this.constructs) return;
        // todo: use classbuilder
    }
}
