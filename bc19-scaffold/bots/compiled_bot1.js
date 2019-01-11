// Transcrypt'ed from Python, 2019-01-11 00:26:39
var __name__ = 'org.transcrypt.__runtime__';

function __nest__ (headObject, tailNames, value) {
    var current = headObject;
    if (tailNames != '') {
        var tailChain = tailNames.split ('.');
        var firstNewIndex = tailChain.length;
        for (var index = 0; index < tailChain.length; index++) {
            if (!current.hasOwnProperty (tailChain [index])) {
                firstNewIndex = index;
                break;
            }
            current = current [tailChain [index]];
        }
        for (var index = firstNewIndex; index < tailChain.length; index++) {
            current [tailChain [index]] = {};
            current = current [tailChain [index]];
        }
    }
    for (let attrib of Object.getOwnPropertyNames (value)) {
        Object.defineProperty (current, attrib, {
            get () {return value [attrib];},
            enumerable: true,
            configurable: true
        });
    }
}function __get__ (self, func, quotedFuncName) {
    if (self) {
        if (self.hasOwnProperty ('__class__') || typeof self == 'string' || self instanceof String) {
            if (quotedFuncName) {
                Object.defineProperty (self, quotedFuncName, {
                    value: function () {
                        var args = [] .slice.apply (arguments);
                        return func.apply (null, [self] .concat (args));
                    },
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
            return function () {
                var args = [] .slice.apply (arguments);
                return func.apply (null, [self] .concat (args));
            };
        }
        else {
            return func;
        }
    }
    else {
        return func;
    }
}var py_metatype = {
    __name__: 'type',
    __bases__: [],
    __new__: function (meta, name, bases, attribs) {
        var cls = function () {
            var args = [] .slice.apply (arguments);
            return cls.__new__ (args);
        };
        for (var index = bases.length - 1; index >= 0; index--) {
            var base = bases [index];
            for (var attrib in base) {
                var descrip = Object.getOwnPropertyDescriptor (base, attrib);
                Object.defineProperty (cls, attrib, descrip);
            }
            for (let symbol of Object.getOwnPropertySymbols (base)) {
                let descrip = Object.getOwnPropertyDescriptor (base, symbol);
                Object.defineProperty (cls, symbol, descrip);
            }
        }
        cls.__metaclass__ = meta;
        cls.__name__ = name.startsWith ('py_') ? name.slice (3) : name;
        cls.__bases__ = bases;
        for (var attrib in attribs) {
            var descrip = Object.getOwnPropertyDescriptor (attribs, attrib);
            Object.defineProperty (cls, attrib, descrip);
        }
        for (let symbol of Object.getOwnPropertySymbols (attribs)) {
            let descrip = Object.getOwnPropertyDescriptor (attribs, symbol);
            Object.defineProperty (cls, symbol, descrip);
        }
        return cls;
    }
};
py_metatype.__metaclass__ = py_metatype;
var object = {
    __init__: function (self) {},
    __metaclass__: py_metatype,
    __name__: 'object',
    __bases__: [],
    __new__: function (args) {
        var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
        if ('__getattr__' in this || '__setattr__' in this) {
            instance = new Proxy (instance, {
                get: function (target, name) {
                    let result = target [name];
                    if (result == undefined) {
                        return target.__getattr__ (name);
                    }
                    else {
                        return result;
                    }
                },
                set: function (target, name, value) {
                    try {
                        target.__setattr__ (name, value);
                    }
                    catch (exception) {
                        target [name] = value;
                    }
                    return true;
                }
            });
        }
        this.__init__.apply (null, [instance] .concat (args));
        return instance;
    }
};
function __class__ (name, bases, attribs, meta) {
    if (meta === undefined) {
        meta = bases [0] .__metaclass__;
    }
    return meta.__new__ (meta, name, bases, attribs);
}function __call__ (/* <callee>, <this>, <params>* */) {
    var args = [] .slice.apply (arguments);
    if (typeof args [0] == 'object' && '__call__' in args [0]) {
        return args [0] .__call__ .apply (args [1], args.slice (2));
    }
    else {
        return args [0] .apply (args [1], args.slice (2));
    }
}function __kwargtrans__ (anObject) {
    anObject.__kwargtrans__ = null;
    anObject.constructor = Object;
    return anObject;
}
function __setproperty__ (anObject, name, descriptor) {
    if (!anObject.hasOwnProperty (name)) {
        Object.defineProperty (anObject, name, descriptor);
    }
}
function __in__ (element, container) {
    if (container === undefined || container === null) {
        return false;
    }
    if (container.__contains__ instanceof Function) {
        return container.__contains__ (element);
    }
    else {
        return (
            container.indexOf ?
            container.indexOf (element) > -1 :
            container.hasOwnProperty (element)
        );
    }
}function __specialattrib__ (attrib) {
    return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
}function len (anObject) {
    if (anObject === undefined || anObject === null) {
        return 0;
    }
    if (anObject.__len__ instanceof Function) {
        return anObject.__len__ ();
    }
    if (anObject.length !== undefined) {
        return anObject.length;
    }
    var length = 0;
    for (var attr in anObject) {
        if (!__specialattrib__ (attr)) {
            length++;
        }
    }
    return length;
}function __t__ (target) {
    return (
        target === undefined || target === null ? false :
        ['boolean', 'number'] .indexOf (typeof target) >= 0 ? target :
        target.__bool__ instanceof Function ? (target.__bool__ () ? target : false) :
        target.__len__ instanceof Function ?  (target.__len__ () !== 0 ? target : false) :
        target instanceof Function ? target :
        len (target) !== 0 ? target :
        false
    );
}
function float (any) {
    if (any == 'inf') {
        return Infinity;
    }
    else if (any == '-inf') {
        return -Infinity;
    }
    else if (any == 'nan') {
        return NaN;
    }
    else if (isNaN (parseFloat (any))) {
        if (any === false) {
            return 0;
        }
        else if (any === true) {
            return 1;
        }
        else {
            throw ValueError ("could not convert string to float: '" + str(any) + "'", new Error ());
        }
    }
    else {
        return +any;
    }
}float.__name__ = 'float';
float.__bases__ = [object];
function int (any) {
    return float (any) | 0
}int.__name__ = 'int';
int.__bases__ = [object];
function bool (any) {
    return !!__t__ (any);
}bool.__name__ = 'bool';
bool.__bases__ = [int];
function py_typeof (anObject) {
    var aType = typeof anObject;
    if (aType == 'object') {
        try {
            return '__class__' in anObject ? anObject.__class__ : object;
        }
        catch (exception) {
            return aType;
        }
    }
    else {
        return (
            aType == 'boolean' ? bool :
            aType == 'string' ? str :
            aType == 'number' ? (anObject % 1 == 0 ? int : float) :
            null
        );
    }
}function issubclass (aClass, classinfo) {
    if (classinfo instanceof Array) {
        for (let aClass2 of classinfo) {
            if (issubclass (aClass, aClass2)) {
                return true;
            }
        }
        return false;
    }
    try {
        var aClass2 = aClass;
        if (aClass2 == classinfo) {
            return true;
        }
        else {
            var bases = [].slice.call (aClass2.__bases__);
            while (bases.length) {
                aClass2 = bases.shift ();
                if (aClass2 == classinfo) {
                    return true;
                }
                if (aClass2.__bases__.length) {
                    bases = [].slice.call (aClass2.__bases__).concat (bases);
                }
            }
            return false;
        }
    }
    catch (exception) {
        return aClass == classinfo || classinfo == object;
    }
}function isinstance (anObject, classinfo) {
    try {
        return '__class__' in anObject ? issubclass (anObject.__class__, classinfo) : issubclass (py_typeof (anObject), classinfo);
    }
    catch (exception) {
        return issubclass (py_typeof (anObject), classinfo);
    }
}function repr (anObject) {
    try {
        return anObject.__repr__ ();
    }
    catch (exception) {
        try {
            return anObject.__str__ ();
        }
        catch (exception) {
            try {
                if (anObject == null) {
                    return 'None';
                }
                else if (anObject.constructor == Object) {
                    var result = '{';
                    var comma = false;
                    for (var attrib in anObject) {
                        if (!__specialattrib__ (attrib)) {
                            if (attrib.isnumeric ()) {
                                var attribRepr = attrib;
                            }
                            else {
                                var attribRepr = '\'' + attrib + '\'';
                            }
                            if (comma) {
                                result += ', ';
                            }
                            else {
                                comma = true;
                            }
                            result += attribRepr + ': ' + repr (anObject [attrib]);
                        }
                    }
                    result += '}';
                    return result;
                }
                else {
                    return typeof anObject == 'boolean' ? anObject.toString () .capitalize () : anObject.toString ();
                }
            }
            catch (exception) {
                return '<object of type: ' + typeof anObject + '>';
            }
        }
    }
}function min (nrOrSeq) {
    return arguments.length == 1 ? Math.min (...nrOrSeq) : Math.min (...arguments);
}var abs = Math.abs;
function __PyIterator__ (iterable) {
    this.iterable = iterable;
    this.index = 0;
}
__PyIterator__.prototype.__next__ = function() {
    if (this.index < this.iterable.length) {
        return this.iterable [this.index++];
    }
    else {
        throw StopIteration (new Error ());
    }
};
function __JsIterator__ (iterable) {
    this.iterable = iterable;
    this.index = 0;
}
__JsIterator__.prototype.next = function () {
    if (this.index < this.iterable.py_keys.length) {
        return {value: this.index++, done: false};
    }
    else {
        return {value: undefined, done: true};
    }
};
function zip () {
    var args = [] .slice.call (arguments);
    for (var i = 0; i < args.length; i++) {
        if (typeof args [i] == 'string') {
            args [i] = args [i] .split ('');
        }
        else if (!Array.isArray (args [i])) {
            args [i] = Array.from (args [i]);
        }
    }
    var shortest = args.length == 0 ? [] : args.reduce (
        function (array0, array1) {
            return array0.length < array1.length ? array0 : array1;
        }
    );
    return shortest.map (
        function (current, index) {
            return args.map (
                function (current) {
                    return current [index];
                }
            );
        }
    );
}function copy (anObject) {
    if (anObject == null || typeof anObject == "object") {
        return anObject;
    }
    else {
        var result = {};
        for (var attrib in obj) {
            if (anObject.hasOwnProperty (attrib)) {
                result [attrib] = anObject [attrib];
            }
        }
        return result;
    }
}
function list (iterable) {
    let instance = iterable ? Array.from (iterable) : [];
    return instance;
}
Array.prototype.__class__ = list;
list.__name__ = 'list';
list.__bases__ = [object];
Array.prototype.__iter__ = function () {return new __PyIterator__ (this);};
Array.prototype.__getslice__ = function (start, stop, step) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    else if (stop > this.length) {
        stop = this.length;
    }
    if (step == 1) {
        return Array.prototype.slice.call(this, start, stop);
    }
    let result = list ([]);
    for (let index = start; index < stop; index += step) {
        result.push (this [index]);
    }
    return result;
};
Array.prototype.__setslice__ = function (start, stop, step, source) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    if (step == null) {
        Array.prototype.splice.apply (this, [start, stop - start] .concat (source));
    }
    else {
        let sourceIndex = 0;
        for (let targetIndex = start; targetIndex < stop; targetIndex += step) {
            this [targetIndex] = source [sourceIndex++];
        }
    }
};
Array.prototype.__repr__ = function () {
    if (this.__class__ == set && !this.length) {
        return 'set()';
    }
    let result = !this.__class__ || this.__class__ == list ? '[' : this.__class__ == tuple ? '(' : '{';
    for (let index = 0; index < this.length; index++) {
        if (index) {
            result += ', ';
        }
        result += repr (this [index]);
    }
    if (this.__class__ == tuple && this.length == 1) {
        result += ',';
    }
    result += !this.__class__ || this.__class__ == list ? ']' : this.__class__ == tuple ? ')' : '}';    return result;
};
Array.prototype.__str__ = Array.prototype.__repr__;
Array.prototype.append = function (element) {
    this.push (element);
};
Array.prototype.py_clear = function () {
    this.length = 0;
};
Array.prototype.extend = function (aList) {
    this.push.apply (this, aList);
};
Array.prototype.insert = function (index, element) {
    this.splice (index, 0, element);
};
Array.prototype.remove = function (element) {
    let index = this.indexOf (element);
    if (index == -1) {
        throw ValueError ("list.remove(x): x not in list", new Error ());
    }
    this.splice (index, 1);
};
Array.prototype.index = function (element) {
    return this.indexOf (element);
};
Array.prototype.py_pop = function (index) {
    if (index == undefined) {
        return this.pop ();
    }
    else {
        return this.splice (index, 1) [0];
    }
};
Array.prototype.py_sort = function () {
    __sort__.apply  (null, [this].concat ([] .slice.apply (arguments)));
};
Array.prototype.__add__ = function (aList) {
    return list (this.concat (aList));
};
Array.prototype.__mul__ = function (scalar) {
    let result = this;
    for (let i = 1; i < scalar; i++) {
        result = result.concat (this);
    }
    return result;
};
Array.prototype.__rmul__ = Array.prototype.__mul__;
function tuple (iterable) {
    let instance = iterable ? [] .slice.apply (iterable) : [];
    instance.__class__ = tuple;
    return instance;
}
tuple.__name__ = 'tuple';
tuple.__bases__ = [object];
function set (iterable) {
    let instance = [];
    if (iterable) {
        for (let index = 0; index < iterable.length; index++) {
            instance.add (iterable [index]);
        }
    }
    instance.__class__ = set;
    return instance;
}
set.__name__ = 'set';
set.__bases__ = [object];
Array.prototype.__bindexOf__ = function (element) {
    element += '';
    let mindex = 0;
    let maxdex = this.length - 1;
    while (mindex <= maxdex) {
        let index = (mindex + maxdex) / 2 | 0;
        let middle = this [index] + '';
        if (middle < element) {
            mindex = index + 1;
        }
        else if (middle > element) {
            maxdex = index - 1;
        }
        else {
            return index;
        }
    }
    return -1;
};
Array.prototype.add = function (element) {
    if (this.indexOf (element) == -1) {
        this.push (element);
    }
};
Array.prototype.discard = function (element) {
    var index = this.indexOf (element);
    if (index != -1) {
        this.splice (index, 1);
    }
};
Array.prototype.isdisjoint = function (other) {
    this.sort ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) != -1) {
            return false;
        }
    }
    return true;
};
Array.prototype.issuperset = function (other) {
    this.sort ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) == -1) {
            return false;
        }
    }
    return true;
};
Array.prototype.issubset = function (other) {
    return set (other.slice ()) .issuperset (this);
};
Array.prototype.union = function (other) {
    let result = set (this.slice () .sort ());
    for (let i = 0; i < other.length; i++) {
        if (result.__bindexOf__ (other [i]) == -1) {
            result.push (other [i]);
        }
    }
    return result;
};
Array.prototype.intersection = function (other) {
    this.sort ();
    let result = set ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) != -1) {
            result.push (other [i]);
        }
    }
    return result;
};
Array.prototype.difference = function (other) {
    let sother = set (other.slice () .sort ());
    let result = set ();
    for (let i = 0; i < this.length; i++) {
        if (sother.__bindexOf__ (this [i]) == -1) {
            result.push (this [i]);
        }
    }
    return result;
};
Array.prototype.symmetric_difference = function (other) {
    return this.union (other) .difference (this.intersection (other));
};
Array.prototype.py_update = function () {
    let updated = [] .concat.apply (this.slice (), arguments) .sort ();
    this.py_clear ();
    for (let i = 0; i < updated.length; i++) {
        if (updated [i] != updated [i - 1]) {
            this.push (updated [i]);
        }
    }
};
Array.prototype.__eq__ = function (other) {
    if (this.length != other.length) {
        return false;
    }
    if (this.__class__ == set) {
        this.sort ();
        other.sort ();
    }
    for (let i = 0; i < this.length; i++) {
        if (this [i] != other [i]) {
            return false;
        }
    }
    return true;
};
Array.prototype.__ne__ = function (other) {
    return !this.__eq__ (other);
};
Array.prototype.__le__ = function (other) {
    if (this.__class__ == set) {
        return this.issubset (other);
    }
    else {
        for (let i = 0; i < this.length; i++) {
            if (this [i] > other [i]) {
                return false;
            }
            else if (this [i] < other [i]) {
                return true;
            }
        }
        return true;
    }
};
Array.prototype.__ge__ = function (other) {
    if (this.__class__ == set) {
        return this.issuperset (other);
    }
    else {
        for (let i = 0; i < this.length; i++) {
            if (this [i] < other [i]) {
                return false;
            }
            else if (this [i] > other [i]) {
                return true;
            }
        }
        return true;
    }
};
Array.prototype.__lt__ = function (other) {
    return (
        this.__class__ == set ?
        this.issubset (other) && !this.issuperset (other) :
        !this.__ge__ (other)
    );
};
Array.prototype.__gt__ = function (other) {
    return (
        this.__class__ == set ?
        this.issuperset (other) && !this.issubset (other) :
        !this.__le__ (other)
    );
};
Uint8Array.prototype.__add__ = function (aBytes) {
    let result = new Uint8Array (this.length + aBytes.length);
    result.set (this);
    result.set (aBytes, this.length);
    return result;
};
Uint8Array.prototype.__mul__ = function (scalar) {
    let result = new Uint8Array (scalar * this.length);
    for (let i = 0; i < scalar; i++) {
        result.set (this, i * this.length);
    }
    return result;
};
Uint8Array.prototype.__rmul__ = Uint8Array.prototype.__mul__;
function str (stringable) {
    if (typeof stringable === 'number')
        return stringable.toString();
    else {
        try {
            return stringable.__str__ ();
        }
        catch (exception) {
            try {
                return repr (stringable);
            }
            catch (exception) {
                return String (stringable);
            }
        }
    }
}String.prototype.__class__ = str;
str.__name__ = 'str';
str.__bases__ = [object];
String.prototype.__iter__ = function () {};
String.prototype.__repr__ = function () {
    return (this.indexOf ('\'') == -1 ? '\'' + this + '\'' : '"' + this + '"') .py_replace ('\t', '\\t') .py_replace ('\n', '\\n');
};
String.prototype.__str__ = function () {
    return this;
};
String.prototype.capitalize = function () {
    return this.charAt (0).toUpperCase () + this.slice (1);
};
String.prototype.endswith = function (suffix) {
    if (suffix instanceof Array) {
        for (var i=0;i<suffix.length;i++) {
            if (this.slice (-suffix[i].length) == suffix[i])
                return true;
        }
    } else
        return suffix == '' || this.slice (-suffix.length) == suffix;
    return false;
};
String.prototype.find = function (sub, start) {
    return this.indexOf (sub, start);
};
String.prototype.__getslice__ = function (start, stop, step) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    var result = '';
    if (step == 1) {
        result = this.substring (start, stop);
    }
    else {
        for (var index = start; index < stop; index += step) {
            result = result.concat (this.charAt(index));
        }
    }
    return result;
};
__setproperty__ (String.prototype, 'format', {
    get: function () {return __get__ (this, function (self) {
        var args = tuple ([] .slice.apply (arguments).slice (1));
        var autoIndex = 0;
        return self.replace (/\{(\w*)\}/g, function (match, key) {
            if (key == '') {
                key = autoIndex++;
            }
            if (key == +key) {
                return args [key] === undefined ? match : str (args [key]);
            }
            else {
                for (var index = 0; index < args.length; index++) {
                    if (typeof args [index] == 'object' && args [index][key] !== undefined) {
                        return str (args [index][key]);
                    }
                }
                return match;
            }
        });
    });},
    enumerable: true
});
String.prototype.isalnum = function () {
    return /^[0-9a-zA-Z]{1,}$/.test(this)
};
String.prototype.isalpha = function () {
    return /^[a-zA-Z]{1,}$/.test(this)
};
String.prototype.isdecimal = function () {
    return /^[0-9]{1,}$/.test(this)
};
String.prototype.isdigit = function () {
    return this.isdecimal()
};
String.prototype.islower = function () {
    return /^[a-z]{1,}$/.test(this)
};
String.prototype.isupper = function () {
    return /^[A-Z]{1,}$/.test(this)
};
String.prototype.isspace = function () {
    return /^[\s]{1,}$/.test(this)
};
String.prototype.isnumeric = function () {
    return !isNaN (parseFloat (this)) && isFinite (this);
};
String.prototype.join = function (strings) {
    strings = Array.from (strings);
    return strings.join (this);
};
String.prototype.lower = function () {
    return this.toLowerCase ();
};
String.prototype.py_replace = function (old, aNew, maxreplace) {
    return this.split (old, maxreplace) .join (aNew);
};
String.prototype.lstrip = function () {
    return this.replace (/^\s*/g, '');
};
String.prototype.rfind = function (sub, start) {
    return this.lastIndexOf (sub, start);
};
String.prototype.rsplit = function (sep, maxsplit) {
    if (sep == undefined || sep == null) {
        sep = /\s+/;
        var stripped = this.strip ();
    }
    else {
        var stripped = this;
    }
    if (maxsplit == undefined || maxsplit == -1) {
        return stripped.split (sep);
    }
    else {
        var result = stripped.split (sep);
        if (maxsplit < result.length) {
            var maxrsplit = result.length - maxsplit;
            return [result.slice (0, maxrsplit) .join (sep)] .concat (result.slice (maxrsplit));
        }
        else {
            return result;
        }
    }
};
String.prototype.rstrip = function () {
    return this.replace (/\s*$/g, '');
};
String.prototype.py_split = function (sep, maxsplit) {
    if (sep == undefined || sep == null) {
        sep = /\s+/;
        var stripped = this.strip ();
    }
    else {
        var stripped = this;
    }
    if (maxsplit == undefined || maxsplit == -1) {
        return stripped.split (sep);
    }
    else {
        var result = stripped.split (sep);
        if (maxsplit < result.length) {
            return result.slice (0, maxsplit).concat ([result.slice (maxsplit).join (sep)]);
        }
        else {
            return result;
        }
    }
};
String.prototype.startswith = function (prefix) {
    if (prefix instanceof Array) {
        for (var i=0;i<prefix.length;i++) {
            if (this.indexOf (prefix [i]) == 0)
                return true;
        }
    } else
        return this.indexOf (prefix) == 0;
    return false;
};
String.prototype.strip = function () {
    return this.trim ();
};
String.prototype.upper = function () {
    return this.toUpperCase ();
};
String.prototype.__mul__ = function (scalar) {
    var result = '';
    for (var i = 0; i < scalar; i++) {
        result = result + this;
    }
    return result;
};
String.prototype.__rmul__ = String.prototype.__mul__;
function __contains__ (element) {
    return this.hasOwnProperty (element);
}
function __keys__ () {
    var keys = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            keys.push (attrib);
        }
    }
    return keys;
}
function __items__ () {
    var items = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            items.push ([attrib, this [attrib]]);
        }
    }
    return items;
}
function __del__ (key) {
    delete this [key];
}
function __clear__ () {
    for (var attrib in this) {
        delete this [attrib];
    }
}
function __getdefault__ (aKey, aDefault) {
    var result = this [aKey];
    if (result == undefined) {
        result = this ['py_' + aKey];
    }
    return result == undefined ? (aDefault == undefined ? null : aDefault) : result;
}
function __setdefault__ (aKey, aDefault) {
    var result = this [aKey];
    if (result != undefined) {
        return result;
    }
    var val = aDefault == undefined ? null : aDefault;
    this [aKey] = val;
    return val;
}
function __pop__ (aKey, aDefault) {
    var result = this [aKey];
    if (result != undefined) {
        delete this [aKey];
        return result;
    } else {
        if ( aDefault === undefined ) {
            throw KeyError (aKey, new Error());
        }
    }
    return aDefault;
}
function __popitem__ () {
    var aKey = Object.keys (this) [0];
    if (aKey == null) {
        throw KeyError ("popitem(): dictionary is empty", new Error ());
    }
    var result = tuple ([aKey, this [aKey]]);
    delete this [aKey];
    return result;
}
function __update__ (aDict) {
    for (var aKey in aDict) {
        this [aKey] = aDict [aKey];
    }
}
function __values__ () {
    var values = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            values.push (this [attrib]);
        }
    }
    return values;
}
function __dgetitem__ (aKey) {
    return this [aKey];
}
function __dsetitem__ (aKey, aValue) {
    this [aKey] = aValue;
}
function dict (objectOrPairs) {
    var instance = {};
    if (!objectOrPairs || objectOrPairs instanceof Array) {
        if (objectOrPairs) {
            for (var index = 0; index < objectOrPairs.length; index++) {
                var pair = objectOrPairs [index];
                if ( !(pair instanceof Array) || pair.length != 2) {
                    throw ValueError(
                        "dict update sequence element #" + index +
                        " has length " + pair.length +
                        "; 2 is required", new Error());
                }
                var key = pair [0];
                var val = pair [1];
                if (!(objectOrPairs instanceof Array) && objectOrPairs instanceof Object) {
                     if (!isinstance (objectOrPairs, dict)) {
                         val = dict (val);
                     }
                }
                instance [key] = val;
            }
        }
    }
    else {
        if (isinstance (objectOrPairs, dict)) {
            var aKeys = objectOrPairs.py_keys ();
            for (var index = 0; index < aKeys.length; index++ ) {
                var key = aKeys [index];
                instance [key] = objectOrPairs [key];
            }
        } else if (objectOrPairs instanceof Object) {
            instance = objectOrPairs;
        } else {
            throw ValueError ("Invalid type of object for dict creation", new Error ());
        }
    }
    __setproperty__ (instance, '__class__', {value: dict, enumerable: false, writable: true});
    __setproperty__ (instance, '__contains__', {value: __contains__, enumerable: false});
    __setproperty__ (instance, 'py_keys', {value: __keys__, enumerable: false});
    __setproperty__ (instance, '__iter__', {value: function () {new __PyIterator__ (this.py_keys ());}, enumerable: false});
    __setproperty__ (instance, Symbol.iterator, {value: function () {new __JsIterator__ (this.py_keys ());}, enumerable: false});
    __setproperty__ (instance, 'py_items', {value: __items__, enumerable: false});
    __setproperty__ (instance, 'py_del', {value: __del__, enumerable: false});
    __setproperty__ (instance, 'py_clear', {value: __clear__, enumerable: false});
    __setproperty__ (instance, 'py_get', {value: __getdefault__, enumerable: false});
    __setproperty__ (instance, 'py_setdefault', {value: __setdefault__, enumerable: false});
    __setproperty__ (instance, 'py_pop', {value: __pop__, enumerable: false});
    __setproperty__ (instance, 'py_popitem', {value: __popitem__, enumerable: false});
    __setproperty__ (instance, 'py_update', {value: __update__, enumerable: false});
    __setproperty__ (instance, 'py_values', {value: __values__, enumerable: false});
    __setproperty__ (instance, '__getitem__', {value: __dgetitem__, enumerable: false});
    __setproperty__ (instance, '__setitem__', {value: __dsetitem__, enumerable: false});
    return instance;
}
dict.__name__ = 'dict';
dict.__bases__ = [object];
function __setdoc__ (docString) {
    this.__doc__ = docString;
    return this;
}
__setproperty__ (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});
function __mod__ (a, b) {
    if (typeof a == 'object' && '__mod__' in a) {
        return a.__mod__ (b);
    }
    else if (typeof b == 'object' && '__rmod__' in b) {
        return b.__rmod__ (a);
    }
    else {
        return ((a % b) + b) % b;
    }
}function __neg__ (a) {
    if (typeof a == 'object' && '__neg__' in a) {
        return a.__neg__ ();
    }
    else {
        return -a;
    }
}function __add__ (a, b) {
    if (typeof a == 'object' && '__add__' in a) {
        return a.__add__ (b);
    }
    else if (typeof b == 'object' && '__radd__' in b) {
        return b.__radd__ (a);
    }
    else {
        return a + b;
    }
}function __eq__ (a, b) {
    if (typeof a == 'object' && '__eq__' in a) {
        return a.__eq__ (b);
    }
    else {
        return a == b;
    }
}function __iadd__ (a, b) {
    if (typeof a == 'object' && '__iadd__' in a) {
        return a.__iadd__ (b);
    }
    else if (typeof a == 'object' && '__add__' in a) {
        return a = a.__add__ (b);
    }
    else if (typeof b == 'object' && '__radd__' in b) {
        return a = b.__radd__ (a);
    }
    else {
        return a += b;
    }
}function __getitem__ (container, key) {
    if (typeof container == 'object' && '__getitem__' in container) {
        return container.__getitem__ (key);
    }
    else if ((typeof container == 'string' || container instanceof Array) && key < 0) {
        return container [container.length + key];
    }
    else {
        return container [key];
    }
}var BaseException =  __class__ ('BaseException', [object], {
	__module__: __name__,
});
var Exception =  __class__ ('Exception', [BaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.__args__ = args;
		try {
			self.stack = kwargs.error.stack;
		}
		catch (__except0__) {
			self.stack = 'No stack trace available';
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (len (self.__args__) > 1) {
			return '{}{}'.format (self.__class__.__name__, repr (tuple (self.__args__)));
		}
		else if (len (self.__args__)) {
			return '{}({})'.format (self.__class__.__name__, repr (self.__args__ [0]));
		}
		else {
			return '{}()'.format (self.__class__.__name__);
		}
	});},
	get __str__ () {return __get__ (this, function (self) {
		if (len (self.__args__) > 1) {
			return str (tuple (self.__args__));
		}
		else if (len (self.__args__)) {
			return str (self.__args__ [0]);
		}
		else {
			return '';
		}
	});}
});
var IterableError =  __class__ ('IterableError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, error) {
		Exception.__init__ (self, "Can't iterate over non-iterable", __kwargtrans__ ({error: error}));
	});}
});
var StopIteration =  __class__ ('StopIteration', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, error) {
		Exception.__init__ (self, 'Iterator exhausted', __kwargtrans__ ({error: error}));
	});}
});
var ValueError =  __class__ ('ValueError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var KeyError =  __class__ ('KeyError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var AssertionError =  __class__ ('AssertionError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		if (message) {
			Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
		}
		else {
			Exception.__init__ (self, __kwargtrans__ ({error: error}));
		}
	});}
});
var NotImplementedError =  __class__ ('NotImplementedError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var IndexError =  __class__ ('IndexError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var AttributeError =  __class__ ('AttributeError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var py_TypeError =  __class__ ('py_TypeError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var Warning =  __class__ ('Warning', [Exception], {
	__module__: __name__,
});
var UserWarning =  __class__ ('UserWarning', [Warning], {
	__module__: __name__,
});
var DeprecationWarning =  __class__ ('DeprecationWarning', [Warning], {
	__module__: __name__,
});
var RuntimeWarning =  __class__ ('RuntimeWarning', [Warning], {
	__module__: __name__,
});
var __sort__ = function (iterable, key, reverse) {
	if (typeof key == 'undefined' || (key != null && key.hasOwnProperty ("__kwargtrans__"))) {		var key = null;
	}	if (typeof reverse == 'undefined' || (reverse != null && reverse.hasOwnProperty ("__kwargtrans__"))) {		var reverse = false;
	}	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
					case 'key': var key = __allkwargs0__ [__attrib0__]; break;
					case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	if (key) {
		iterable.sort ((function __lambda__ (a, b) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'a': var a = __allkwargs0__ [__attrib0__]; break;
							case 'b': var b = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			return (key (a) > key (b) ? 1 : -(1));
		}));
	}
	else {
		iterable.sort ();
	}
	if (reverse) {
		iterable.reverse ();
	}
};
var sorted = function (iterable, key, reverse) {
	if (typeof key == 'undefined' || (key != null && key.hasOwnProperty ("__kwargtrans__"))) {		var key = null;
	}	if (typeof reverse == 'undefined' || (reverse != null && reverse.hasOwnProperty ("__kwargtrans__"))) {		var reverse = false;
	}	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
					case 'key': var key = __allkwargs0__ [__attrib0__]; break;
					case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	if (py_typeof (iterable) == dict) {
		var result = copy (iterable.py_keys ());
	}
	else {
		var result = copy (iterable);
	}
	__sort__ (result, key, reverse);
	return result;
};
var divmod = function (n, d) {
	return tuple ([Math.floor (n / d), __mod__ (n, d)]);
};
var __Terminal__ =  __class__ ('__Terminal__', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.buffer = '';
		try {
			self.element = document.getElementById ('__terminal__');
		}
		catch (__except0__) {
			self.element = null;
		}
		if (self.element) {
			self.element.style.overflowX = 'auto';
			self.element.style.boxSizing = 'border-box';
			self.element.style.padding = '5px';
			self.element.innerHTML = '_';
		}
	});},
	get print () {return __get__ (this, function (self) {
		var sep = ' ';
		var end = '\n';
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'sep': var sep = __allkwargs0__ [__attrib0__]; break;
						case 'end': var end = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.buffer = '{}{}{}'.format (self.buffer, sep.join ((function () {
			var __accu0__ = [];
			for (var arg of args) {
				__accu0__.append (str (arg));
			}
			return __accu0__;
		}) ()), end).__getslice__ (-(4096), null, 1);
		if (self.element) {
			self.element.innerHTML = self.buffer.py_replace ('\n', '<br>').py_replace (' ', '&nbsp');
			self.element.scrollTop = self.element.scrollHeight;
		}
		else {
			console.log (sep.join ((function () {
				var __accu0__ = [];
				for (var arg of args) {
					__accu0__.append (str (arg));
				}
				return __accu0__;
			}) ()));
		}
	});},
	get input () {return __get__ (this, function (self, question) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'question': var question = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		self.print ('{}'.format (question), __kwargtrans__ ({end: ''}));
		var answer = window.prompt ('\n'.join (self.buffer.py_split ('\n').__getslice__ (-(8), null, 1)));
		self.print (answer);
		return answer;
	});}
});
var __terminal__ = __Terminal__ ();
var print = __terminal__.print;
var input = __terminal__.input;

// Transcrypt'ed from Python, 2019-01-11 00:26:39
var __name__$1 = 'battlecode';
var SPECS = dict ({'COMMUNICATION_BITS': 16, 'CASTLE_TALK_BITS': 8, 'MAX_ROUNDS': 1000, 'TRICKLE_FUEL': 25, 'INITIAL_KARBONITE': 100, 'INITIAL_FUEL': 500, 'MINE_FUEL_COST': 1, 'KARBONITE_YIELD': 2, 'FUEL_YIELD': 10, 'MAX_TRADE': 1024, 'MAX_BOARD_SIZE': 64, 'MAX_ID': 4096, 'CASTLE': 0, 'CHURCH': 1, 'PILGRIM': 2, 'CRUSADER': 3, 'PROPHET': 4, 'PREACHER': 5, 'RED': 0, 'BLUE': 1, 'CHESS_INITIAL': 100, 'CHESS_EXTRA': 20, 'TURN_MAX_TIME': 200, 'MAX_MEMORY': 50000000, 'UNITS': [dict ({'CONSTRUCTION_KARBONITE': null, 'CONSTRUCTION_FUEL': null, 'KARBONITE_CAPACITY': null, 'FUEL_CAPACITY': null, 'SPEED': 0, 'FUEL_PER_MOVE': null, 'STARTING_HP': 100, 'VISION_RADIUS': 100, 'ATTACK_DAMAGE': null, 'ATTACK_RADIUS': null, 'ATTACK_FUEL_COST': null, 'DAMAGE_SPREAD': null}), dict ({'CONSTRUCTION_KARBONITE': 50, 'CONSTRUCTION_FUEL': 200, 'KARBONITE_CAPACITY': null, 'FUEL_CAPACITY': null, 'SPEED': 0, 'FUEL_PER_MOVE': null, 'STARTING_HP': 50, 'VISION_RADIUS': 100, 'ATTACK_DAMAGE': null, 'ATTACK_RADIUS': null, 'ATTACK_FUEL_COST': null, 'DAMAGE_SPREAD': null}), dict ({'CONSTRUCTION_KARBONITE': 10, 'CONSTRUCTION_FUEL': 50, 'KARBONITE_CAPACITY': 20, 'FUEL_CAPACITY': 100, 'SPEED': 4, 'FUEL_PER_MOVE': 1, 'STARTING_HP': 10, 'VISION_RADIUS': 100, 'ATTACK_DAMAGE': null, 'ATTACK_RADIUS': null, 'ATTACK_FUEL_COST': null, 'DAMAGE_SPREAD': null}), dict ({'CONSTRUCTION_KARBONITE': 20, 'CONSTRUCTION_FUEL': 50, 'KARBONITE_CAPACITY': 20, 'FUEL_CAPACITY': 100, 'SPEED': 9, 'FUEL_PER_MOVE': 1, 'STARTING_HP': 40, 'VISION_RADIUS': 36, 'ATTACK_DAMAGE': 10, 'ATTACK_RADIUS': [1, 16], 'ATTACK_FUEL_COST': 10, 'DAMAGE_SPREAD': 0}), dict ({'CONSTRUCTION_KARBONITE': 25, 'CONSTRUCTION_FUEL': 50, 'KARBONITE_CAPACITY': 20, 'FUEL_CAPACITY': 100, 'SPEED': 4, 'FUEL_PER_MOVE': 2, 'STARTING_HP': 20, 'VISION_RADIUS': 64, 'ATTACK_DAMAGE': 10, 'ATTACK_RADIUS': [16, 64], 'ATTACK_FUEL_COST': 25, 'DAMAGE_SPREAD': 0}), dict ({'CONSTRUCTION_KARBONITE': 30, 'CONSTRUCTION_FUEL': 50, 'KARBONITE_CAPACITY': 20, 'FUEL_CAPACITY': 100, 'SPEED': 4, 'FUEL_PER_MOVE': 3, 'STARTING_HP': 60, 'VISION_RADIUS': 16, 'ATTACK_DAMAGE': 20, 'ATTACK_RADIUS': [1, 16], 'ATTACK_FUEL_COST': 15, 'DAMAGE_SPREAD': 3})]});
var BCAbstractRobot =  __class__ ('BCAbstractRobot', [object], {
	__module__: __name__$1,
	get __init__ () {return __get__ (this, function (self) {
		self._bc_reset_state ();
	});},
	get _do_turn () {return __get__ (this, function (self, game_state) {
		self._bc_game_state = game_state;
		self.id = game_state ['id'];
		self.karbonite = game_state ['karbonite'];
		self.fuel = game_state ['fuel'];
		self.last_offer = game_state ['last_offer'];
		self.me = self.get_robot (self.id);
		if (self.me.turn == 1) {
			self.map = game_state ['map'];
			self.karbonite_map = game_state ['karbonite_map'];
			self.fuel_map = game_state ['fuel_map'];
		}
		try {
			var t = self.turn ();
		}
		catch (__except0__) {
			if (isinstance (__except0__, Exception)) {
				var e = __except0__;
				var t = self._bc_error_action (e);
			}
			else {
				throw __except0__;
			}
		}
		if (!(t)) {
			var t = self._bc_null_action ();
		}
		t ['signal'] = self._bc_signal;
		t ['signal_radius'] = self._bc_signal_radius;
		t ['logs'] = self._bc_logs;
		t ['castle_talk'] = self._bc_castle_talk;
		self._bc_reset_state ();
		return t;
	});},
	get _bc_reset_state () {return __get__ (this, function (self) {
		self._bc_logs = [];
		self._bc_signal = 0;
		self._bc_signal_radius = 0;
		self._bc_game_state = null;
		self._bc_castle_talk = 0;
		self.me = null;
		self.id = null;
		self.fuel = null;
		self.karbonite = null;
		self.last_offer = null;
	});},
	get _bc_null_action () {return __get__ (this, function (self) {
		return dict ({'signal': self._bc_signal, 'signal_radius': self._bc_signal_radius, 'logs': self._bc_logs, 'castle_talk': self._bc_castle_talk});
	});},
	get _bc_error_action () {return __get__ (this, function (self, e) {
		var a = self._bc_null_action ();
		a ['error'] = str (e);
		return a;
	});},
	get _bc_action () {return __get__ (this, function (self, action, properties) {
		if (typeof properties == 'undefined' || (properties != null && properties.hasOwnProperty ("__kwargtrans__"))) {			var properties = null;
		}		var a = self._bc_null_action ();
		if (properties) {
			for (var key of properties.py_keys ()) {
				a [key] = properties [key];
			}
		}
		a ['action'] = action;
		return a;
	});},
	get _bc_check_on_map () {return __get__ (this, function (self, x, y) {
		return x >= 0 && x < len (self._bc_game_state ['shadow'] [0]) && y >= 0 && y < len (self._bc_game_state ['shadow']);
	});},
	get log () {return __get__ (this, function (self, message) {
		self._bc_logs.append (str (message));
	});},
	get signal () {return __get__ (this, function (self, value, radius) {
		if (self.fuel < radius) {
			var __except0__ = Exception ('Not enough fuel to signal given radius.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (value < 0 || value >= Math.pow (2, SPECS ['COMMUNICATION_BITS'])) {
			var __except0__ = Exception ('Invalid signal, must be int within bit range.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (radius > 2 * Math.pow (SPECS ['MAX_BOARD_SIZE'] - 1, 2)) {
			var __except0__ = Exception ('Signal radius is too big.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._bc_signal = value;
		self._bc_signal_radius = radius;
		self.fuel -= radius;
	});},
	get castle_talk () {return __get__ (this, function (self, value) {
		if (value < 0 || value >= Math.pow (2, SPECS ['CASTLE_TALK_BITS'])) {
			var __except0__ = Exception ('Invalid castle talk, must be between 0 and 2^8.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._bc_castle_talk = value;
	});},
	get propose_trade () {return __get__ (this, function (self, karbonite, fuel) {
		if (self.me ['unit'] != SPECS ['CASTLE']) {
			var __except0__ = Exception ('Only castles can trade.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (abs (karbonite) >= SPECS ['MAX_TRADE'] || abs (fuel) >= SPECS ['MAX_TRADE']) {
			var __except0__ = Exception (('Cannot trade over ' + str (SPECS ['MAX_TRADE'])) + ' in a given turn.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return self._bc_action ('trade', dict ({'trade_fuel': fuel, 'trade_karbonite': karbonite}));
	});},
	get build_unit () {return __get__ (this, function (self, unit, dx, dy) {
		if (self.me ['unit'] != SPECS ['PILGRIM'] && self.me ['unit'] != SPECS ['CASTLE'] && self.me ['unit'] != SPECS ['CHURCH']) {
			var __except0__ = Exception ('This unit type cannot build.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self.me ['unit'] == SPECS ['PILGRIM'] && unit != SPECS ['CHURCH']) {
			var __except0__ = Exception ('Pilgrims can only build churches.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self.me ['unit'] != SPECS ['PILGRIM'] && unit == SPECS ['CHURCH']) {
			var __except0__ = Exception ('Only pilgrims can build churches.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (dx < -(1) || dy < -(1) || dx > 1 || dy > 1) {
			var __except0__ = Exception ('Can only build in adjacent squares.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(self._bc_check_on_map (self.me ['x'] + dx, self.me ['y'] + dy))) {
			var __except0__ = Exception ("Can't build units off of map.");
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self._bc_game_state ['shadow'] [self.me ['y'] + dy] [self.me ['x'] + dx] != 0) {
			var __except0__ = Exception ('Cannot build on occupied tile.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(self.map [self.me ['y'] + dy] [self.me ['x'] + dx])) {
			var __except0__ = Exception ('Cannot build onto impassable terrain.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self.karbonite < SPECS ['UNITS'] [unit] ['CONSTRUCTION_KARBONITE'] || self.fuel < SPECS ['UNITS'] [unit] ['CONSTRUCTION_FUEL']) {
			var __except0__ = Exception ('Cannot afford to build specified unit.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return self._bc_action ('build', dict ({'dx': dx, 'dy': dy, 'build_unit': unit}));
	});},
	get move () {return __get__ (this, function (self, dx, dy) {
		if (self.me ['unit'] == SPECS ['CASTLE'] || self.me ['unit'] == SPECS ['CHURCH']) {
			var __except0__ = Exception ('Churches and Castles cannot move.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(self._bc_check_on_map (self.me ['x'] + dx, self.me ['y'] + dy))) {
			var __except0__ = Exception ("Can't move off of map.");
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self._bc_game_state.shadow [self.me ['y'] + dy] [self.me ['x'] + dx] == -(1)) {
			var __except0__ = Exception ('Cannot move outside of vision range.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self._bc_game_state.shadow [self.me ['y'] + dy] [self.me ['x'] + dx] != 0) {
			var __except0__ = Exception ('Cannot move onto occupied tile.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(self.map [self.me ['y'] + dy] [self.me ['x'] + dx])) {
			var __except0__ = Exception ('Cannot move onto impassable terrain.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var r = Math.pow (dx, 2) + Math.pow (dy, 2);
		if (r > SPECS ['UNITS'] [self.me ['unit']] ['SPEED']) {
			var __except0__ = Exception ('Slow down, cowboy.  Tried to move faster than unit can.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self.fuel < r * SPECS ['UNITS'] [self.me ['unit']] ['FUEL_PER_MOVE']) {
			var __except0__ = Exception ('Not enough fuel to move at given speed.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return self._bc_action ('move', dict ({'dx': dx, 'dy': dy}));
	});},
	get mine () {return __get__ (this, function (self) {
		if (self.me ['unit'] != SPECS ['PILGRIM']) {
			var __except0__ = Exception ('Only Pilgrims can mine.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self.fuel < SPECS ['MINE_FUEL_COST']) {
			var __except0__ = Exception ('Not enough fuel to mine.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self.karbonite_map [self.me ['y']] [self.me ['x']]) {
			if (self.me ['karbonite'] >= SPECS ['UNITS'] [SPECS ['PILGRIM']] ['KARBONITE_CAPACITY']) {
				var __except0__ = Exception ('Cannot mine, as at karbonite capacity.');
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		else if (self.fuel_map [self.me ['y']] [self.me ['x']]) {
			if (self.me ['fuel'] >= SPECS ['UNITS'] [SPECS ['PILGRIM']] ['FUEL_CAPACITY']) {
				var __except0__ = Exception ('Cannot mine, as at fuel capacity.');
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		else {
			var __except0__ = Exception ('Cannot mine square without fuel or karbonite.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return self._bc_action ('mine');
	});},
	get give () {return __get__ (this, function (self, dx, dy, karbonite, fuel) {
		if (dx > 1 || dx < -(1) || dy > 1 || dy < -(1) || dx == 0 && dy == 0) {
			var __except0__ = Exception ('Can only give to adjacent squares.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(self._bc_check_on_map (self.me ['x'] + dx, self.me ['y'] + dy))) {
			var __except0__ = Exception ("Can't give off of map.");
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self._bc_game_state ['shadow'] [self.me ['y'] + dy] [self.me ['x'] + dx] <= 0) {
			var __except0__ = Exception ('Cannot give to empty square.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (karbonite < 0 || fuel < 0 || self.me ['karbonite'] < karbonite || self.me ['fuel'] < fuel) {
			var __except0__ = Exception ('Do not have specified amount to give.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return self._bc_action ('give', dict ({'dx': dx, 'dy': dy, 'give_karbonite': karbonite, 'give_fuel': fuel}));
	});},
	get attack () {return __get__ (this, function (self, dx, dy) {
		if (self.me ['unit'] != SPECS ['CRUSADER'] && self.me ['unit'] != SPECS ['PREACHER'] && self.me ['unit'] != SPECS ['PROPHET']) {
			var __except0__ = Exception ('Given unit cannot attack.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self.fuel < SPECS ['UNITS'] [self.me ['unit']] ['ATTACK_FUEL_COST']) {
			var __except0__ = Exception ('Not enough fuel to attack.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(self._bc_check_on_map (self.me ['x'] + dx, self.me ['y'] + dy))) {
			var __except0__ = Exception ("Can't attack off of map.");
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self._bc_game_state ['shadow'] [self.me ['y'] + dy] [self.me ['x'] + dx] == -(1)) {
			var __except0__ = Exception ('Cannot attack outside of vision range.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(self.map [self.me ['y'] + dy] [self.me ['x'] + dx])) {
			var __except0__ = Exception ('Cannot attack impassable terrain.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (self._bc_game_state ['shadow'] [self.me ['y'] + dy] [self.me ['x'] + dx] == 0) {
			var __except0__ = Exception ('Cannot attack empty tile.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var r = Math.pow (dx, 2) + Math.pow (dy, 2);
		if (r > SPECS ['UNITS'] [self.me ['unit']] ['ATTACK_RADIUS'] [1] || r < SPECS ['UNITS'] [self.me ['unit']] ['ATTACK_RADIUS'] [0]) {
			var __except0__ = Exception ('Cannot attack outside of attack range.');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return self._bc_action ('attack', dict ({'dx': dx, 'dy': dy}));
	});},
	get get_robot () {return __get__ (this, function (self, id) {
		if (id <= 0) {
			return null;
		}
		for (var robot of self._bc_game_state ['visible']) {
			if (robot ['id'] == id) {
				return robot;
			}
		}
		return null;
	});},
	get is_visible () {return __get__ (this, function (self, robot) {
		var x = __in__ ('x', robot);
		return x;
	});},
	get is_radioing () {return __get__ (this, function (self, robot) {
		return robot ['signal'] >= 0;
	});},
	get get_visible_robot_map () {return __get__ (this, function (self) {
		return self._bc_game_state ['shadow'];
	});},
	get get_passable_map () {return __get__ (this, function (self) {
		return self.map;
	});},
	get get_karbonite_map () {return __get__ (this, function (self) {
		return self.karbonite_map;
	});},
	get get_fuel_map () {return __get__ (this, function (self) {
		return self.fuel_map;
	});},
	get get_visible_robots () {return __get__ (this, function (self) {
		return self._bc_game_state ['visible'];
	});},
	get turn () {return __get__ (this, function (self) {
		return null;
	});}
});

// Transcrypt'ed from Python, 2019-01-11 00:26:39
var pi = Math.PI;
var e = Math.E;
var exp = Math.exp;
var expm1 = function (x) {
	return Math.exp (x) - 1;
};
var log = function (x, base) {
	return (base === undefined ? Math.log (x) : Math.log (x) / Math.log (base));
};
var log1p = function (x) {
	return Math.log (x + 1);
};
var log2 = function (x) {
	return Math.log (x) / Math.LN2;
};
var log10 = function (x) {
	return Math.log (x) / Math.LN10;
};
var pow$1 = Math.pow;
var sqrt = Math.sqrt;
var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var asin = Math.asin;
var acos = Math.acos;
var atan = Math.atan;
var atan2 = Math.atan2;
var hypot = Math.hypot;
var degrees = function (x) {
	return (x * 180) / Math.PI;
};
var radians = function (x) {
	return (x * Math.PI) / 180;
};
var sinh = Math.sinh;
var cosh = Math.cosh;
var tanh = Math.tanh;
var asinh = Math.asinh;
var acosh = Math.acosh;
var atanh = Math.atanh;
var floor = Math.floor;
var ceil = Math.ceil;
var trunc = Math.trunc;
var isnan = isNaN;
var inf = Infinity;
var nan = NaN;
var modf = function (n) {
	var sign = (n >= 0 ? 1 : -(1));
	var __left0__ = divmod (abs (n), 1);
	var f = __left0__ [0];
	var mod = __left0__ [1];
	return tuple ([mod * sign, f * sign]);
};

var __module_math__ = /*#__PURE__*/Object.freeze({
    pi: pi,
    e: e,
    exp: exp,
    expm1: expm1,
    log: log,
    log1p: log1p,
    log2: log2,
    log10: log10,
    pow: pow$1,
    sqrt: sqrt,
    sin: sin,
    cos: cos,
    tan: tan,
    asin: asin,
    acos: acos,
    atan: atan,
    atan2: atan2,
    hypot: hypot,
    degrees: degrees,
    radians: radians,
    sinh: sinh,
    cosh: cosh,
    tanh: tanh,
    asinh: asinh,
    acosh: acosh,
    atanh: atanh,
    floor: floor,
    ceil: ceil,
    trunc: trunc,
    isnan: isnan,
    inf: inf,
    nan: nan,
    modf: modf
});

// Transcrypt'ed from Python, 2019-01-11 00:26:39
var math = {};
__nest__ (math, '', __module_math__);
var _array = (function () {
	var __accu0__ = [];
	for (var i = 0; i < 624; i++) {
		__accu0__.append (0);
	}
	return __accu0__;
}) ();
var _index = 0;
var _bitmask1 = Math.pow (2, 32) - 1;
var _bitmask2 = Math.pow (2, 31);
var _bitmask3 = Math.pow (2, 31) - 1;
var _fill_array = function () {
	for (var i = 0; i < 624; i++) {
		var y = (_array [i] & _bitmask2) + (_array [__mod__ (i + 1, 624)] & _bitmask3);
		_array [i] = _array [__mod__ (i + 397, 624)] ^ y >> 1;
		if (__mod__ (y, 2) != 0) {
			_array [i] ^= 2567483615;
		}
	}
};
var _random_integer = function () {
	if (_index == 0) {
		_fill_array ();
	}
	var y = _array [_index];
	y ^= y >> 11;
	y ^= y << 7 & 2636928640;
	y ^= y << 15 & 4022730752;
	y ^= y >> 18;
	_index = __mod__ (_index + 1, 624);
	return y;
};
var seed = function (x) {
	if (typeof x == 'undefined' || (x != null && x.hasOwnProperty ("__kwargtrans__"))) {		var x = int (_bitmask3 * Math.random ());
	}	_array [0] = x;
	for (var i = 1; i < 624; i++) {
		_array [i] = (1812433253 * _array [i - 1] ^ (_array [i - 1] >> 30) + i) & _bitmask1;
	}
};
var random$1 = function () {
	return _random_integer () / _bitmask3;
};
var shuffle = function (x) {
	for (var i = len (x) - 1; i > 0; i--) {
		var j = math.floor (random$1 () * (i + 1));
		var temp = x [i];
		x [i] = x [j];
		x [j] = temp;
	}
};
seed ();

// Transcrypt'ed from Python, 2019-01-11 00:26:39
var is_out_of_bounds = function (map_dim, pos_x, pos_y) {
	return pos_x < 0 || pos_y < 0 || pos_x >= map_dim || pos_y >= map_dim;
};
var is_cell_occupied = function (occupied_map, pos_x, pos_y) {
	var bounds_map = len (occupied_map);
	if (is_out_of_bounds (bounds_map, pos_x, pos_y)) {
		return true;
	}
	else if (occupied_map [pos_y] [pos_x] <= 0) {
		return false;
	}
	else {
		return true;
	}
};
var cells_around = function () {
	var dirs = [tuple ([-(1), 0]), tuple ([-(1), 1]), tuple ([0, 1]), tuple ([1, 1]), tuple ([1, 0]), tuple ([1, -(1)]), tuple ([0, -(1)]), tuple ([-(1), -(1)])];
	shuffle (dirs, random$1);
	return dirs;
};
var get_relative_karbonite_mine_positions = function (robot) {
	var pos_x = robot.me.x;
	var pos_y = robot.me.y;
	var karb_map = robot.get_karbonite_map ();
	var map_length = len (karb_map);
	var queue = [];
	var distance = [];
	for (var iter_i = 0; iter_i < map_length; iter_i++) {
		for (var iter_j = 0; iter_j < map_length; iter_j++) {
			if (karb_map [iter_i] [iter_j]) {
				distance.append (Math.pow (iter_j - pos_x, 2) + Math.pow (iter_i - pos_y, 2));
				queue.append (tuple ([iter_j, iter_i]));
			}
		}
	}
	return (function () {
		var __accu0__ = [];
		for (var [_, x] of sorted (zip (distance, queue))) {
			__accu0__.append (x);
		}
		return __accu0__;
	}) ();
};
var get_relative_fuel_mine_positions = function (robot) {
	var pos_x = robot.me.x;
	var pos_y = robot.me.y;
	var fuel_map = robot.get_fuel_map ();
	var map_length = len (fuel_map);
	var queue = [];
	var distance = [];
	for (var iter_i = 0; iter_i < map_length; iter_i++) {
		for (var iter_j = 0; iter_j < map_length; iter_j++) {
			if (fuel_map [iter_i] [iter_j]) {
				distance.append (Math.pow (iter_j - pos_x, 2) + Math.pow (iter_i - pos_y, 2));
				queue.append (tuple ([iter_j, iter_i]));
			}
		}
	}
	return (function () {
		var __accu0__ = [];
		for (var [_, x] of sorted (zip (distance, queue))) {
			__accu0__.append (x);
		}
		return __accu0__;
	}) ();
};
var get_relative_mine_positions = function (robot) {
	var pos_x = robot.me.x;
	var pos_y = robot.me.y;
	var fuel_map = robot.get_fuel_map ();
	var karb_map = robot.get_karbonite_map ();
	var map_length = len (fuel_map);
	var queue = [];
	var distance = [];
	for (var iter_i = 0; iter_i < map_length; iter_i++) {
		for (var iter_j = 0; iter_j < map_length; iter_j++) {
			if (fuel_map [iter_i] [iter_j] || karb_map [iter_i] [iter_j]) {
				distance.append (Math.pow (iter_j - pos_x, 2) + Math.pow (iter_i - pos_y, 2));
				queue.append (tuple ([iter_j, iter_i]));
			}
		}
	}
	return (function () {
		var __accu0__ = [];
		for (var [_, x] of sorted (zip (distance, queue))) {
			__accu0__.append (x);
		}
		return __accu0__;
	}) ();
};

var __module_utility__ = /*#__PURE__*/Object.freeze({
    is_out_of_bounds: is_out_of_bounds,
    is_cell_occupied: is_cell_occupied,
    cells_around: cells_around,
    get_relative_karbonite_mine_positions: get_relative_karbonite_mine_positions,
    get_relative_fuel_mine_positions: get_relative_fuel_mine_positions,
    get_relative_mine_positions: get_relative_mine_positions
});

// Transcrypt'ed from Python, 2019-01-11 00:26:39
var math$1 = {};
var utility = {};
__nest__ (utility, '', __module_utility__);
__nest__ (math$1, '', __module_math__);
var _is_higher_than = function (a, b) {
	if (a == null || b == null) {
		return true;
	}
	return b [1] < a [1] || a [1] == b [1] && a [2] < b [2];
};
var _heapify = function (nodes, new_node_index) {
	while (1 < new_node_index) {
		var new_node = nodes [new_node_index];
		var parent_index = new_node_index / 2;
		var parent_node = nodes [parent_index];
		if (_is_higher_than (parent_node, new_node)) {
			break;
		}
		var tmp_node = parent_node;
		nodes [parent_index] = new_node;
		nodes [new_node_index] = tmp_node;
		var new_node_index = parent_index;
	}
	return nodes;
};
var add = function (nodes, value, priority, insert_counter) {
	var new_node_index = len (nodes);
	insert_counter++;
	nodes.append (tuple ([value, priority, insert_counter]));
	_heapify (nodes, new_node_index);
	return insert_counter;
};
var peek = function (nodes) {
	if (len (nodes) == 1) {
		return null;
	}
	else {
		return nodes [1] [0];
	}
};
var py_pop = function (nodes) {
	if (len (nodes) == 1) {
		var __except0__ = LookupError ('Heap is empty');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var result = nodes [1] [0];
	var empty_space_index = 1;
	while (empty_space_index * 2 < len (nodes)) {
		var left_child_index = empty_space_index * 2;
		var right_child_index = empty_space_index * 2 + 1;
		if (len (nodes) <= right_child_index || _is_higher_than (nodes [left_child_index], nodes [right_child_index])) {
			nodes [empty_space_index] = nodes [left_child_index];
			var empty_space_index = left_child_index;
		}
		else {
			nodes [empty_space_index] = nodes [right_child_index];
			var empty_space_index = right_child_index;
		}
	}
	var last_node_index = len (nodes) - 1;
	nodes [empty_space_index] = nodes [last_node_index];
	_heapify (nodes, empty_space_index);
	nodes.py_pop ();
	return result;
};
var astar_heuristic = function (pos_initial, pos_final) {
	var __left0__ = pos_initial;
	var x1 = __left0__ [0];
	var y1 = __left0__ [1];
	var __left0__ = pos_final;
	var x2 = __left0__ [0];
	var y2 = __left0__ [1];
	var dx = abs (x1 - x2);
	var dy = abs (y1 - y2);
	var heuristic = (dx + dy) - min (dx, dy);
	return heuristic * 5;
};
var astar_search = function (robot, pos_initial, pos_final) {
	robot.log (robot.me.time);
	var dirs = [tuple ([-(1), 0]), tuple ([-(1), 1]), tuple ([0, 1]), tuple ([1, 1]), tuple ([1, 0]), tuple ([1, -(1)]), tuple ([0, -(1)]), tuple ([-(1), -(1)])];
	var nodes = [null];
	var insert_counter = 0;
	var block_kicker = 0;
	var came_from = dict ({});
	var cost_so_far = dict ({});
	came_from [pos_initial] = null;
	cost_so_far [pos_initial] = 0;
	var occupied_map = robot.get_visible_robot_map ();
	var passable_map = robot.get_passable_map ();
	if (utility.is_out_of_bounds (occupied_map, pos_final [0], pos_final [1]) || !(passable_map [pos_final [1]] [pos_final [0]])) {
		return tuple ([]);
	}
	var retrace_path = function (pos_initial, pos_final, came_from) {
		var current = pos_final;
		var path = [];
		while (current != pos_initial) {
			path.append (current);
			var current = came_from [current];
		}
		path.reverse ();
		return path;
	};
	var neighbours = function (pos_intermediate) {
		var __left0__ = pos_intermediate;
		var pos_x = __left0__ [0];
		var pos_y = __left0__ [1];
		var result = [];
		for (var dirc of dirs) {
			var new_pos_x = pos_x + dirc [1];
			var new_pos_y = pos_y + dirc [0];
			if (!(utility.is_cell_occupied (occupied_map, new_pos_x, new_pos_y)) && passable_map [new_pos_y] [new_pos_x]) {
				result.append (tuple ([new_pos_x, new_pos_y]));
			}
		}
		return result;
	};
	if (utility.is_out_of_bounds (occupied_map, pos_final [0], pos_final [1]) || !(passable_map [pos_final [1]] [pos_final [0]])) {
		return tuple ([]);
	}
	var insert_counter = add (nodes, pos_initial, 0, insert_counter);
	while (len (nodes) > 1) {
		var current = py_pop (nodes);
		if (str (current) == str (pos_final) || block_kicker > 40 || robot.me.time < 50) {
			return retrace_path (pos_initial, current, came_from);
		}
		for (var iter_a of neighbours (current)) {
			if (iter_a) {
				var new_cost = cost_so_far [current] + 1;
				if (!__in__ (iter_a, cost_so_far) || new_cost < cost_so_far [iter_a]) {
					cost_so_far [iter_a] = new_cost;
					var priority = new_cost + astar_heuristic (iter_a, pos_final);
					var insert_counter = add (nodes, iter_a, -(priority), insert_counter);
					came_from [iter_a] = current;
				}
			}
		}
		block_kicker++;
	}
	return retrace_path (pos_initial, pos_final, came_from);
};

var __module_pathfinding__ = /*#__PURE__*/Object.freeze({
    _is_higher_than: _is_higher_than,
    _heapify: _heapify,
    add: add,
    peek: peek,
    py_pop: py_pop,
    astar_heuristic: astar_heuristic,
    astar_search: astar_search
});

// Transcrypt'ed from Python, 2019-01-11 00:26:39
var message_to_castles = function (robot, mesg_type) {
	robot.castleTalk (mesg_type);
};
var self_communicate_loop = function (robot) {
	robot.signal (robot.me.signal, 0);
};

var __module_communications__ = /*#__PURE__*/Object.freeze({
    message_to_castles: message_to_castles,
    self_communicate_loop: self_communicate_loop
});

// Transcrypt'ed from Python, 2019-01-11 00:26:39
var sort_visible_units_by_distance = function (robot) {
	var visible = robot.get_visible_robots ();
	var bots = [];
	var bots_distance = [];
	if (visible == null) {
		return [];
	}
	for (var r of visible) {
		if (!(robot.is_visible (r))) {
			continue;
		}
		bots_distance.append (Math.pow (r ['x'] - robot.me ['x'], 2) + Math.pow (r ['y'] - robot.me ['y'], 2));
		bots.append (r);
	}
	return (function () {
		var __accu0__ = [];
		for (var [_, x] of sorted (zip (bots_distance, bots))) {
			__accu0__.append (x);
		}
		return __accu0__;
	}) ();
};
var sort_visible_friendlies_by_distance = function (robot) {
	var visible = robot.get_visible_robots ();
	var friendly_bots = [];
	var friendly_bots_distance = [];
	if (visible == null) {
		return [];
	}
	for (var r of visible) {
		if (!(robot.is_visible (r))) {
			continue;
		}
		if (r ['team'] == robot.me ['team']) {
			friendly_bots_distance.append (Math.pow (r ['x'] - robot.me ['x'], 2) + Math.pow (r ['y'] - robot.me ['y'], 2));
			friendly_bots.append (r);
		}
	}
	return (function () {
		var __accu0__ = [];
		for (var [_, x] of sorted (zip (friendly_bots_distance, friendly_bots))) {
			__accu0__.append (x);
		}
		return __accu0__;
	}) ();
};
var sort_visible_enemies_by_distance = function (robot) {
	var visible = robot.get_visible_robots ();
	var enemy_bots = [];
	var enemy_bots_distance = [];
	if (visible == null) {
		return [];
	}
	for (var r of visible) {
		if (!(robot.is_visible (r))) {
			continue;
		}
		if (r ['team'] != robot.me ['team']) {
			enemy_bots_distance.append (Math.pow (r ['x'] - robot.me ['x'], 2) + Math.pow (r ['y'] - robot.me ['y'], 2));
			enemy_bots.append (r);
		}
	}
	return (function () {
		var __accu0__ = [];
		for (var [_, x] of sorted (zip (enemy_bots_distance, enemy_bots))) {
			__accu0__.append (x);
		}
		return __accu0__;
	}) ();
};
var all_karbonite = function (robot) {
	var karb_count = 0;
	for (var row of robot.karbonite_map) {
		for (var cell of row) {
			if (cell == true) {
				karb_count++;
			}
		}
	}
	return karb_count;
};
var all_fuel = function (robot) {
	var fuel_count = 0;
	for (var row of robot.fuel_map) {
		for (var cell of row) {
			if (cell == true) {
				fuel_count++;
			}
		}
	}
	return fuel_count;
};

var __module_vision__ = /*#__PURE__*/Object.freeze({
    sort_visible_units_by_distance: sort_visible_units_by_distance,
    sort_visible_friendlies_by_distance: sort_visible_friendlies_by_distance,
    sort_visible_enemies_by_distance: sort_visible_enemies_by_distance,
    all_karbonite: all_karbonite,
    all_fuel: all_fuel
});

// Transcrypt'ed from Python, 2019-01-11 00:26:39
var communications = {};
var pathfinding = {};
var utility$1 = {};
var vision = {};
__nest__ (pathfinding, '', __module_pathfinding__);
__nest__ (communications, '', __module_communications__);
__nest__ (vision, '', __module_vision__);
__nest__ (utility$1, '', __module_utility__);
var pilgrim = function (robot) {
	communications.self_communicate_loop (robot);
	if (robot.me.signal == 0) {
		for (var friendly_unit of vision.sort_visible_friendlies_by_distance (robot)) {
			if (friendly_unit.unit == 0 && friendly_unit.signal > -(1)) {
				robot.signal (friendly_unit.signal, 0);
				break;
			}
		}
	}
	var unit_signal = robot.me.signal;
	var carry_karb = robot.me.karbonite;
	var carry_fuel = robot.me.fuel;
	var pos_x = robot.me.x;
	var pos_y = robot.me.y;
	if (carry_fuel > 80 || carry_karb > 18) {
		return pilgrim_full (robot);
	}
	var ab = pilgrim_mine (robot);
	if (ab != 0) {
		return ab;
	}
	else {
		var bc = pilgrim_move (robot, unit_signal);
		if (bc != 0) {
			return bc;
		}
	}
};
var move_to_specified_mine = function (robot, unit_signal) {
	var nearest_mine_list = utility$1.get_relative_mine_positions (robot);
	if (unit_signal < len (nearest_mine_list)) {
		var tile_to_move_to = pathfinding.astar_search (robot, tuple ([robot.me.x, robot.me.y]), nearest_mine_list [unit_signal]);
	}
	else {
		var unit_signal = __mod__ (unit_signal, nearest_mine_list);
		var tile_to_move_to = pathfinding.astar_search (robot, tuple ([robot.me.x, robot.me.y]), nearest_mine_list [unit_signal]);
	}
	if (tile_to_move_to == null) {
		return null;
	}
	else {
		return tile_to_move_to [0];
	}
};
var pilgrim_move = function (robot, unit_signal) {
	if (robot.fuel <= 2) {
		return 0;
	}
	var pos_x = robot.me.x;
	var pos_y = robot.me.y;
	var passable_map = robot.get_passable_map ();
	var karb_map = robot.get_karbonite_map ();
	var fuel_map = robot.get_fuel_map ();
	var occupied_map = robot.get_visible_robot_map ();
	var directions = utility$1.cells_around ();
	for (var direction of directions) {
		if (!(utility$1.is_cell_occupied (occupied_map, pos_x + direction [1], pos_y + direction [0])) && (karb_map [pos_y + direction [0]] [pos_x + direction [1]] == 1 || fuel_map [pos_y + direction [0]] [pos_x + direction [1]] == 1)) {
			return robot.move (direction [1], direction [0]);
		}
	}
	var move_to = move_to_specified_mine (robot, unit_signal);
	if (move_to != null) {
		var __left0__ = move_to;
		var new_pos_x = __left0__ [0];
		var new_pos_y = __left0__ [1];
		return robot.move (new_pos_x - pos_x, new_pos_y - pos_y);
	}
	for (var direction of directions) {
		if (!(utility$1.is_cell_occupied (occupied_map, pos_x + direction [1], pos_y + direction [0])) && passable_map [pos_y + direction [0]] [pos_x + direction [1]] == 1) {
			return robot.move (direction [1], direction [0]);
		}
	}
	return 0;
};
var pilgrim_mine = function (robot) {
	var pos_x = robot.me.x;
	var pos_y = robot.me.y;
	var karb_map = robot.get_karbonite_map ();
	var fuel_map = robot.get_fuel_map ();
	if (karb_map [pos_y] [pos_x] == 1 || fuel_map [pos_y] [pos_x] == 1) {
		return robot.mine ();
	}
	else {
		return 0;
	}
};
var pilgrim_full = function (robot) {
	var unit_castle = SPECS ['CASTLE'];
	var unit_church = SPECS ['CHURCH'];
	var pos_x = robot.me.x;
	var pos_y = robot.me.y;
	var carry_karb = robot.me.karbonite;
	var carry_fuel = robot.me.fuel;
	var karb_map = robot.get_karbonite_map ();
	var fuel_map = robot.get_fuel_map ();
	var passable_map = robot.get_passable_map ();
	var occupied_map = robot.get_visible_robot_map ();
	var directions = utility$1.cells_around ();
	if (karb_map [pos_y] [pos_x] == 1 || fuel_map [pos_y] [pos_x] == 1) {
		var friendly_units = vision.sort_visible_friendlies_by_distance (robot);
		if (friendly_units) {
			for (var f_unit of friendly_units) {
				var dx = f_unit.x - pos_x;
				var dy = f_unit.y - pos_y;
				if (f_unit.unit == unit_church || f_unit.unit == unit_castle) {
					if (tuple ([dy, __in__ (dx, directions)]) && abs (dx) <= 1 && abs (dy) <= 1 && robot.get_visible_robot_map () [pos_y + dy] [pos_x + dx] > 0) {
						return robot.give (dx, dy, carry_karb, carry_fuel);
					}
				}
			}
		}
		for (var direction of directions) {
			if (!(utility$1.is_cell_occupied (occupied_map, pos_x + direction [1], pos_y + direction [0])) && (karb_map [pos_y + direction [0]] [pos_x + direction [1]] != 1 || fuel_map [pos_y + direction [0]] [pos_x + direction [1]] != 1) && passable_map [pos_y + direction [0]] [pos_x + direction [1]] == 1) {
				if (robot.karbonite > 50 && robot.fuel > 200) {
					robot.log ("Drop a church like it's hot");
					return robot.build_unit (unit_church, direction [1], direction [0]);
				}
			}
		}
	}
};

// Transcrypt'ed from Python, 2019-01-11 00:26:39
var crusaders_move = function (self) {
	self.log ('Crusader health: ' + str (self.me ['health']));
	var choices = [tuple ([0, -(1)]), tuple ([1, -(1)]), tuple ([1, 0]), tuple ([1, 1]), tuple ([0, 1]), tuple ([-(1), 1]), tuple ([-(1), 0]), tuple ([-(1), -(1)])];
	var choice = random.choice (choices);
	self.log ('TRYING TO MOVE IN DIRECTION ' + str (choice));
	return choice;
};

// Transcrypt'ed from Python, 2019-01-11 00:26:39
var communications$1 = {};
var utility$2 = {};
var vision$1 = {};
__nest__ (vision$1, '', __module_vision__);
__nest__ (communications$1, '', __module_communications__);
__nest__ (utility$2, '', __module_utility__);
var castle = function (robot) {
	var unit_castle = SPECS ['CASTLE'];
	var unit_church = SPECS ['CHURCH'];
	var unit_crusader = SPECS ['CRUSADER'];
	var unit_pilgrim = SPECS ['PILGRIM'];
	var unit_preacher = SPECS ['PREACHER'];
	var unit_prophet = SPECS ['PROPHET'];
	var pilgrim_count = 0;
	var friendly_units = castle_all_friendly_units (robot);
	var total_karbonite = vision$1.all_karbonite (robot);
	var total_fuel = vision$1.all_fuel (robot);
	for (var f_unit of friendly_units) {
		if (f_unit.unit == unit_castle) ;
		else if (f_unit.unit == unit_church) ;
		else if (f_unit.unit == unit_crusader) ;
		else if (f_unit.unit == unit_pilgrim) {
			pilgrim_count++;
		}
		else if (f_unit.unit == unit_preacher) ;
		else if (f_unit.unit == unit_prophet) ;
	}
	communications$1.self_communicate_loop (robot);
	if (robot.step < 2) {
		robot.signal (robot.me.signal + 1, 2);
		return castle_build (robot, unit_pilgrim);
	}
	else if (robot.step > 200 && robot.karbonite > 100 && robot.fuel > 200) {
		robot.signal (robot.me.signal + 1, 2);
		return castle_build (robot, unit_pilgrim);
	}
	else if ((total_fuel + total_karbonite) * 0.55 < pilgrim_count && robot.karbonite > 100 && robot.fuel > 200) {
		return castle_build (robot, unit_pilgrim);
	}
};
var castle_build = function (robot, unit_type) {
	var pos_x = robot.me.x;
	var pos_y = robot.me.y;
	var occupied_map = robot.get_visible_robot_map ();
	var passable_map = robot.get_passable_map ();
	var directions = utility$2.cells_around ();
	for (var direction of directions) {
		if (!(utility$2.is_cell_occupied (occupied_map, pos_x + direction [1], pos_y + direction [0])) && passable_map [pos_y + direction [0]] [pos_x + direction [1]] == 1) {
			return robot.build_unit (unit_type, direction [1], direction [0]);
		}
	}
};
var castle_all_friendly_units = function (robot) {
	var all_units = robot.get_visible_robots ();
	var friendly_units = [];
	for (var unit of all_units) {
		if (unit.team == null) {
			friendly_units.append (unit);
		}
		else if (robot.me.team == unit.team) {
			friendly_units.append (unit);
		}
	}
	return friendly_units;
};

// Transcrypt'ed from Python, 2019-01-11 00:26:39
var pathfinding$1 = {};
__nest__ (pathfinding$1, '', __module_pathfinding__);
var __name__$b = '__main__';
var go_home = function (self) {
	var unit_map = (function () {
		var __accu0__ = self;
		return __call__ (__accu0__.getVisibleRobotMap, __accu0__);
	}) ();
	var unit_type = __getitem__ (SPECS, 'CASTLE');
};
var find_unit_type = function (self, map$$1) {
};
var MyRobot =  __class__ ('MyRobot', [BCAbstractRobot], {
	__module__: __name__$b,
	step: __neg__ (1),
	get turn () {return __get__ (this, function (self) {
		self.step = __call__ (__iadd__, null, self.step, 1);
		var unit_type = __getitem__ (self.me, 'unit');
		var unit_castle = __getitem__ (SPECS, 'CASTLE');
		var unit_church = __getitem__ (SPECS, 'CHURCH');
		var unit_crusader = __getitem__ (SPECS, 'CRUSADER');
		var unit_pilgrim = __getitem__ (SPECS, 'PILGRIM');
		var unit_preacher = __getitem__ (SPECS, 'PREACHER');
		var unit_prophet = __getitem__ (SPECS, 'PROPHET');
		if (__t__ (__t__ (__eq__ (__mod__ (self.step, 200), 3)) && __eq__ (unit_type, unit_castle))) {
			(function () {
				var __accu0__ = self;
				return __call__ (__accu0__.log, __accu0__, __add__ (__add__ (__add__ ('Total current karbonite is ', __call__ (str, null, self.karbonite)), ' turn '), __call__ (str, null, self.step)));
			}) ();
		}
		if (__t__ (__eq__ (unit_type, unit_crusader))) {
			return (function () {
				var __accu0__ = self;
				return __call__ (__accu0__.move, __accu0__, __call__ (crusaders_move, null, self));
			}) ();
		}
		else if (__t__ (__eq__ (unit_type, unit_castle))) {
			return __call__ (castle, null, self);
		}
		else if (__t__ (__eq__ (unit_type, unit_pilgrim))) {
			return __call__ (pilgrim, null, self);
		}
	});}
});
var robot = new MyRobot();