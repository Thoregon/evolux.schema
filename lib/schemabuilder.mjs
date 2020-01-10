/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { isFunction, useprops } from '/evolux.util';
import { tservices }             from '/evolux.universe';
import Schema                   from './schema/schema.mjs';
import { ErrUnknownSchema }     from './errors.mjs';
import Attribute                from './schema/attribute.mjs';
import Index                    from "./schema/index.mjs";
import Method                   from "./schema/method.mjs";
import Param                    from "./schema/param.mjs";

// import has                      from '/has-values';
// import is                       from '/@sindresorhus/is';

export default class SchemaBuilder {

    constructor() {
        this._attributes =  [];
        this._methods =     [];
        this._indexes =     [];
    }

    name(name) {
        this._name = name;
        return this;
    }

    extend(schemaname) {
        this._extend = schemaname;
        return this;
    }

    addAttribute(attribute) {
        this._attributes.push(attribute);
        return this;
    }

    addMethod(method) {
        this._methods.push(method);
        return this;
    }

    addIndex(index) {
        this._indexes.push(index);
        return this;
    }

    /*
     * build and register the schema
     */

    build() {
        let schema;
        if (this._extend) {
            if (!tservices().schema.hasSchema(this._extend)) throw ErrUnknownSchema(this._extend);
            schema = new Schema({ name: this._name, extend: tservices().schema.schema(this._extend) });
            tservices().schema.putSchema(this._name, schema);
        } else {
            // if it exists, supplement it
            // if not, create new schema
            if (tservices().schema.hasSchema(this._name)) {
                schema = tservices().schema.schema(this._name);
            } else {
                schema = new Schema({ name: this._name });
                tservices().schema.putSchema(this._name, schema);
            }
        }

        // now set all attributes, methods, ...
        let oldattr = Object.keys(schema.attributes);
        schema.attributes = {};
        this._attributes.forEach(attrdef => {
            let attrname = attrdef.name;
            if (attrdef.index) this._indexes.push({ name: attrname, attr: attrname, order: 'asc' });
            let attr = new Attribute( useprops(attrdef, 'name', 'description', 'group', 'tags', 'type', 'mandatory'));
            if (attrdef.compute) {
                attr.compute = (isFunction(attrdef.compute))
                    ? { fn: attrdef.compute }
                    : attrdef.compute;
            }
            if (attrdef.validate) {
                attr.validate = (isFunction(attrdef.validate))
                    ? { fn: attrdef.validate }
                    : attrdef.validate;
            }
            schema.attributes[attrname] = attr;
            oldattr = oldattr.filter(item => item !== attrname);
        });
        // todo: record/handle changes for existing schemas
        oldattr.forEach(attrname => {});

        // define indexes
        // todo: record changes for existing schemas
        schema.indexes = {};
        this._indexes.forEach(idxdef => {
            let idxattrs = [];
            let attrs = idxdef.attr;
            if (Array.isArray(attrs)) {
                idxattrs = attrs;
            } else {
                idxattrs = [attrs];
            }
            let idxname = this._newIdxName(schema.indexes, idxdef, idxattrs);
            let index = new Index({ name: idxname, attrs: idxattrs, order: idxdef.order || 'asc'});
            schema.indexes[idxname] = index;
        });

        // define methods
        let oldmths = Object.keys(schema.methods);
        schema.methods = {};
        this._methods.forEach(mthdef => {
            let mthname = mthdef.name;
            let params = [];
            if (mthdef.params) {
                mthdef.params.forEach(pdef => {
                    let param = new Param({ name: pdef.name, type: pdef.type });
                    params.push(param);
                })
            }
            let mth = new Method({ name: mthdef.name, params: params, fn: mthdef.fn });
            schema.methods[mthname] = mth;
            oldmths = oldmths.filter(item => item !== mthname);
        });
        // todo: record/handle changes for existing schemas
        oldmths.forEach(attrname => {});

        return schema;
    }

    _newIdxName(indexes, idxdef, idxattrs) {
        let name = idxdef.name;
        if (!name) name = idxattrs.join('_');
        let i = 2, iname = name;
        while (indexes[iname]) name += i++;
        return iname;
    }

}

