# Metarhia Common Library

[![TravisCI](https://travis-ci.org/metarhia/common.svg?branch=master)](https://travis-ci.org/metarhia/common)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/57f219ad89e64c848685a93f5f2f14c2)](https://www.codacy.com/app/metarhia/common)
[![NPM Version](https://badge.fury.io/js/metarhia-common.svg)](https://badge.fury.io/js/metarhia-common)
[![NPM Downloads/Month](https://img.shields.io/npm/dm/metarhia-common.svg)](https://www.npmjs.com/package/metarhia-common)
[![NPM Downloads](https://img.shields.io/npm/dt/metarhia-common.svg)](https://www.npmjs.com/package/metarhia-common)

Namespace: `api.common` in [Impress Application Server](https://github.com/metarhia/Impress)

## Installation

```bash
$ npm install metarhia-common
```

### Split array into two parts
`common.splitAt(index, array)`
  - `index:number` - index defining end of first part and start of second
  - `array` - array

Returns: tuple with two parts of the array

### Shuffle an array
`common.shuffle(arr)`
  - `arr` - array

Returns: array


### Generate int array from given range
`common.range(from, to)`
  - `from:number` - range start
  - `to:number` - range end

Returns: array

Example:
```js `range(1, 5) = [1, 2, 3, 4, 5]`
```


### Generate int array from sequence syntax
`common.sequence(seq, max)`
  - `seq` - array
  - `max:number` - optional max

Returns: array

Example:
```js
list: sequence([81, 82, 83]) = [81, 82, 83]
range from..to: sequence([81,,83]) = [81, 82, 83]
range from..count: sequence([81, [3]]) = [81, 82, 83]
range from..max-to: sequence([81, [-2]], 5) = [81, 82, 83]
```


### Get last element of array
`common.last(arr)`
  - `arr` - array

Returns: element


### Extend Map interface with:
`common.cache()`

`cache.allocated` - total allocated size
`cache.add(key, val)` - add record
`cache.del(key)` - delete record
`cache.clr(prefix, fn)` - delete all if `key.startsWith(prefix)`
Returns: object, cache instance


### Empty function
`common.falseness()`

Returns: boolean, always false


### Empty function
`common.trueness()`

Returns: boolean, always true


### Empty function
`common.emptiness()`

Returns: always undefined


### Empty asynchronous callback-last single-argument function
`common.nop(callback)`
  - `callback:function` - callback to be called with (null)


### Empty asynchronous callback-last double-argument function
`common.noop(empty, callback)`
  - `empty` - incoming value to be ignored
  - `callback:function` - callback to be called with (null, null)


### Wrap function: call once, not null
`common.once(fn)`
  - `fn:function` - (optional)

Returns: function, wrapped callback


### Extract callback function
`common.unsafeCallback(args)`

It's unsafe: may return null, allows multiple calls
  - `args` - array

Returns: function, callback or null

Hint: previous name: `common.cbUnsafe` (deprecated)

Hint: another alias: `common.extractCallback` (deprecated)


### Extract callback
`common.safeCallback(args)`
  - `args` - array

Returns: function, wrapped callback or common.emptiness if there is no one

Hint: previous name: `cbExtract` (deprecated)


### Extract callback
`common.requiredCallback(args)`
  - `args` - array

Returns: function or throw TypeError if there is no callback


### Extract callback and make it safe
`common.onceCallback(args)`

Wrap callback with once()
  - `args` - array

Returns: function, callback or common.emptiness if there is no callback


### Check if value is scalar
`common.isScalar(value)`
  - `value` - scalar value or Object

Returns: boolean


### Copy dataset (copy objects to new array)
`common.copy(ds)`
  - `ds` - array of objects

Returns: array of objects


### Clone object or array
`common.clone(obj)`
  - `obj:object or array`

Returns: object or array


### Duplicate object or array (properly handles prototype and circular links)
`common.duplicate(obj)`
  - `obj:object or array`

Returns: object or array


### Read property by dot-separated path
`common.getByPath(data, dataPath)`
  - `data:object`
  - `dataPath:string` - dot-separated path

Returns: value


### Set property by dot-separated path
`common.setByPath(data, dataPath, value)`
  - `data:object`
  - `dataPath:string` - dot-separated path
  - `value` - new value


### Delete property by dot-separated path
`common.deleteByPath(data, dataPath)`
  - `data:object`
  - `dataPath:string` - dot-separated path

Returns: boolean


### Distinctly merge multiple arrays
`common.merge(args)`
  - `args` - array of arrays with elements to merge

Returns: array


### Merge multiple objects with merger
`common.mergeObjects(merger, objs)`
  - `merger:function`
  - `objs` - array of objects

Returns: object


### Forward events from one EventEmitter to another
`common.forwardEvents(from, to, events)`
  - `from` - EventEmitter
  - `to` - EventEmitter
  - `events` - array of strings

Example:
```js common.forwardEvent(from, to);
```

Example:
```js common.forwardEvent(from, to, 'eventName');
```

Example:
```js common.forwardEvent(from, to, { eventName: 'newEventName' });
```

Example:
```js common.forwardEvent(from, to, ['eventName1', 'eventName2']);
```


### Get enhanced EventEmitter with wildcard and forward method
`common.emitter()`

Returns: EventEmitter, instance


### Partially apply arguments to function
`common.partial(fn, args)`
  - `fn:function`
  - `args` - array

Returns: function
  rest - arguments


### Map object fields with provided function
`common.omap(mapFn, obj)`
  - `mapFn` - funtion
  - `obj:object` - which fields used for mapping

Returns: object, with same reference but with transformed fields


### Compose multiple functions into one
`common.compose(fns)`
  - `fns` - array of functions

Returns: function, composed
  args - arguments to be passed to first function


### Apply given function to value or default value
`common.maybe(fn, defVal, value)`
  - `fn:function`
  - `defVal` - default value
  - `value` - value (optional)

Returns: result of `fn` or `defVal`


### Zip several arrays into one
`common.zip(arrays)`
  - `arrays` - array of arrays,

Returns: array, length is minimal of input arrays length
Element with index i of resulting array is array with
elements with index i from input arrays


### Create array of replicated values
`common.replicate(count, elem)`
  - `count:number` - new array length
  - `elem` - value to replicate

Returns: array, replicated


### Zip arrays using specific function
`common.zipWith(fn, arrays)`
  - `fn:function` - for zipping elements with index i
  - `arrays` - array of arrays

Returns: array
Element with index i of resulting array is result
of fn called with arguments from arrays


### Curry function until the condition is met
`common.curryUntil(condition, fn, args)`
  - `condition:function` - (argsI, argsParts) returns boolean
argsI is arguments for i-th currying
argsParts is array of args given for currying from first to i-th currying
  - `fn:function` - which will be curried
  - `args` - array

Returns: function, curried


### Curry fn count times, first curry uses args for first currying
`common.curryN(fn, count, args)`
  - `fn:function` - curried
  - `count:number` - of times function should be curried
  - `args` - array

Returns: function, curried given times count


### Curry function curry with fn
`common.curryTwice()`
 - `fn:function` - to be curried

Returns: function, to pass arguments that returns curried fn


### Curry function with given arguments
`common.curry(fn, args)`
  - `fn:function`
  - `args` - array

Returns: function, curried


### Apply arguments
`common.applyArgs(args)`
  - `args` - array

Returns: function, to pass (fn) arguments will be applied


### Get first not errored result of fn
`common.either(fn)`
  - `fn:function` - to be called

Returns: result of `fn`
  args - arguments to iterate


### Rest left, transform function
`common.restLeft(fn)`
  - `fn:function` - (args, arg1..argN, callback)

Returns: function, (arg1..argN, ...args, callback)
  spreadArgs - arguments


### Generate random key
`common.generateKey(length, possible)`
  - `length:number` - key length
  - `possible:string` - with possible characters

Returns: string, key


### Generate an RFC4122-compliant GUID (UUID v4)
`common.generateGUID()`

Returns: string, GUID


### Generate random SID
`common.generateSID(config)`
  - `config` - record

Returns: string, SID


### Calculate SID CRC
`common.crcSID(config, key)`
  - `config` - record
  - `key:string` - SID key

Returns: string, CRC


### Validate SID
`common.validateSID(config, sid)`
  - `config` - record
  - `sid:string` - session id

Returns: boolean


### Calculate hash with salt
`common.hash(password, salt)`
  - `password:string`
  - `salt:string`

Returns: string, hash


### Validate hash
`common.validateHash(hash, password, salt)`
  - `hash:string`
  - `password:string`
  - `salt:string`

Returns: boolean


### Generate file storage key
`common.generateStorageKey()`

Returns: Array of string, [folder1, folder2, code]


### Convert id to array of hex strings
`common.idToChunks(id)`
  - `id:number`

Returns: array, minimal length is 2


### Convert id to file path
`common.idToPath(id)`
  - `id:number`

Returns: string


### Convert file path to id
`common.pathToId(path)`
  - `path:string`

Returns: number


### Create prefetcher to use when crypto.randomBytes is required to generate
`common.cryptoPrefetcher(bufSize, valueSize)`

multiple same-size values. `bufSize` must be a multiple of `valueSize` for
this to work.
  - `bufSize:number` - size in bytes of the buffer to preallocate
  - `valueSize:number` - size in bytes of the produced chunks


### Generate random integer value in given range
`common.random(min, max)`
  - `min:number` - range start
  - `max:number` - range end

Returns: number


### Generate random number in the range from 0 inclusive up to
`common.cryptoRandom()`

but not including 1 (same as Math.random),
but use crypto-secure number generator.
Returns: number


### List method names
`common.methods(iface)`
  - `iface:object` - to be introspected

Returns: array of strings, method names


### List property names
`common.properties(iface)`
  - `iface:object` - to be introspected

Returns: array of string, property names


### Convert IP string to number
`common.ipToInt(ip)`
  - `ip:string` - IP address, default: '127.0.0.1'

Returns: number


### Get local network interfaces
`common.localIPs()`

Returns: array of strings


### Parse host string
`common.parseHost(host)`
  - `host:string` - host or empty string, may contain `:port`

Returns: string, host without port but not empty


### Override method: save old to `fn.inherited`
`common.override(obj, fn)`
  - `obj:object` - containing method to override
  - `fn:function` - name will be used to find method

Hint: Previous function will be accessible by obj.fnName.inherited


### Mixin for ES6 classes without overriding existing methods
`common.mixin(target, source)`
  - `target:object` - mixin to target
  - `source:object` - source methods


### Compare for array.sort with priority
`common.sortComparePriority(priority, s1, s2)`
  - `priority` - array of strings with priority
  - `s1, s2:string` - to compare

Returns: number

Example:
```js files.sort(common.sortComparePriority)
```


### Compare for array.sort, directories first
`common.sortCompareDirectories(a, b)`
  - `a, b:string` - to compare

Returns: number

Example:
```js files.sort(sortCompareDirectories);
```


### Compare for array.sort
`common.sortCompareByName(a, b)`
  - `a, b:object` - { name } to compare

Returns: number

Example:
```js files.sort(sortCompareByName)
```


### Substitute variables
`common.subst(tpl, data, dataPath, escapeHtml)`
  - `tpl:string` - template body
  - `data` - hash
  - `dataPath:string` - current position in data structure
  - `escapeHtml:boolean` - escape html special characters if true

Returns: string


### Escape html characters
`common.htmlEscape(content)`
  - `content:string` - to escape

Returns: string

Example:
```js htmlEscape('5>=5') = '5&lt;=5'
```


### Extract file extension in lower case with no dot
`common.fileExt(fileName)`
  - `fileName:string` - file name

Returns: string

Example:
```js fileExt('/dir/file.txt')
```

Result:
```js 'txt'
```


### Remove file extension from file name
`common.removeExt(fileName)`
  - `fileName:string` - file name

Returns: string

Example:
```js fileExt('file.txt')
```

Result:
```js 'file'
```


### Convert spinal case to camel case
`common.spinalToCamel(name)`
  - `name:string`

Returns: string


### Escape regular expression control characters
`common.escapeRegExp(s)`
  - `s:string`

Returns: string

Example:
```js escapeRegExp('/path/to/res?search=this.that')
```


### Generate escaped regular expression
`common.newEscapedRegExp(s)`
  - `s:string`

Returns: RegExp, instance


### Add trailing slash at the end if there isn't one
`common.addTrailingSlash(s)`
  - `s:string`

Returns: string


### Remove trailing slash from string
`common.stripTrailingSlash(s)`
  - `s:string`

Returns: string


### Get directory name with trailing slash from path
`common.dirname(filePath)`
  - `filePath:string`

Returns: string


### Capitalize string
`common.capitalize(s)`
  - `s:string`

Returns: string


### Extract substring between prefix and suffix
`common.between(s, prefix, suffix)`
  - `s:string` - source
  - `prefix:string` - before needed fragment
  - `suffix:string` - after needed fragment

Returns: string


### Remove UTF-8 BOM
`common.removeBOM(s)`
  - `s:string` - possibly starts with BOM

Returns: string


### Generate RegExp from array with '*' wildcards
`common.arrayRegExp(items)`
  - `items` - array of strings

Returns: RegExp, instance

Example:
```js ['/css/*', '/index.html']
```


### Split string by the first occurrence of separator
`common.section(s, separator)`
  - `s:string`
  - `separator:string` - or char

Returns: array of strings

Example:
```js rsection('All you need is JavaScript', 'is')
```

Result:
```js ['All you need ', ' JavaScript']
```


### Split string by the last occurrence of separator
`common.rsection(s, separator)`
  - `s:string`
  - `separator:string` - or char

Returns: array of strings

Example:
```js rsection('All you need is JavaScript', 'a')
```

Result:
```js ['All you need is Jav', 'Script']
```


### Split string by multiple occurrence of separator
`common.split(s, separator, limit)`
  - `s:string`
  - `separator:string (optional)` - default: ','
  - `limit:number (optional)` - default: -1 max length of result array

Returns: array of strings

Example:
```js split('a,b,c,d')
```

Result:
```js ['a', 'b', 'c', 'd']
```

Example:
```js split('a,b,c,d', ',', 2)
```

Result:
```js ['a', 'b']
```


### Split string by multiple occurrences of separator
`common.rsplit(s, separator, limit)`
  - `s:string`
  - `separator:string (optional)` - default: ','
  - `limit:number (optional)` - default: -1 max length of result array

Returns: array of strings

Example:
```js split('a,b,c,d', ',', 2)
```

Result:
```js ['c', 'd']
```


### Compare time1 and time2
`common.isTimeEqual(time1, time2)`
  - `time1:string` - time or milliseconds
  - `time2:string` - time or milliseconds

Returns: boolean

Example:
```js isTimeEqual(sinceTime, buffer.stats.mtime)
```


### Get current date in YYYY-MM-DD format
`common.nowDate(date)`
  - `date` - Date (optional)

Returns: string


### Get current date in YYYY-MM-DD hh:mm format
`common.nowDateTime(date)`
  - `date` - Date (optional)

Returns: string


### Parse duration to seconds
`common.duration(s)`
  - `s:string` - duration syntax

Returns: number, milliseconds

Example:
```js duration('1d 10h 7m 13s')
```


### Convert integer duration to string
`common.durationToString(n)`
  - `n:number` - duration

Returns: string


### Convert integer to string, representing data size in Kb, Mb, Gb, and Tb
`common.bytesToSize(bytes)`
  - `bytes:number` - size

Returns: string


### Convert string with data size to integer
`common.sizeToBytes(size)`
  - `size:string` - size

Returns: number


### Wrap method to mark it as deprecated
`common.deprecate(fn)`
  - `fn:function (optional)`

Returns: function, wrapped with deprecation warning


### Wrap new method to mark old alias as deprecated
`common.alias(fn)`
  - `fn:function (optional)`

Returns: function, wrapped with deprecation warning


### Make function raise-safe
`common.safe(fn)`
  - `fn:function`

Returns: function, wrapped with try/catch interception
  args - arguments

## Contributors

  - Timur Shemsedinov (marcusaurelius) <timur.shemsedinov@gmail.com>
  - Vlad Dziuba (DzyubSpirit) <dzyubavlad@gmail.com>
  - See github for full [contributors list](https://github.com/metarhia/common/graphs/contributors)
