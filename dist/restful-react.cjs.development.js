'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var debounce = _interopDefault(require('lodash/debounce'));
var isEqual$1 = _interopDefault(require('lodash/isEqual'));
var React = require('react');
var noop = _interopDefault(require('lodash/noop'));
var url = _interopDefault(require('url'));
var qs = _interopDefault(require('qs'));
var merge = _interopDefault(require('lodash/merge'));
var equal = _interopDefault(require('react-fast-compare'));
var isEqualWith = _interopDefault(require('lodash/isEqualWith'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; };
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
  defineProperty(
    GeneratorFunctionPrototype,
    "constructor",
    { value: GeneratorFunction, configurable: true }
  );
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    defineProperty(this, "_invoke", { value: enqueue });
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(val) {
    var object = Object(val);
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var _excluded = ["children"];
var Context = /*#__PURE__*/React.createContext({
  base: "",
  parentPath: "",
  resolve: function resolve(data) {
    return data;
  },
  requestOptions: {},
  onError: noop,
  onRequest: noop,
  onResponse: noop,
  queryParams: {},
  queryParamStringifyOptions: {},
  children: null
});

var RestfulReactProvider = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(RestfulReactProvider, _React$Component);

  function RestfulReactProvider() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = RestfulReactProvider.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        value = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return React.createElement(Context.Provider, {
      value: _extends({
        onError: noop,
        onRequest: noop,
        onResponse: noop,
        resolve: function resolve(data) {
          return data;
        },
        requestOptions: {},
        parentPath: "",
        queryParams: {},
        queryParamStringifyOptions: {},
        children: null
      }, value)
    }, children);
  };

  return RestfulReactProvider;
}(React.Component);
RestfulReactProvider.displayName = "RestfulProviderContext";
var RestfulReactConsumer = Context.Consumer;

var composeUrl = function composeUrl(base, parentPath, path) {
  if (base === void 0) {
    base = "";
  }

  if (parentPath === void 0) {
    parentPath = "";
  }

  if (path === void 0) {
    path = "";
  }

  var composedPath = composePath(parentPath, path);
  /* If the base is empty, preceding slash will be trimmed during composition */

  if (base === "" && composedPath.startsWith("/")) {
    return composedPath;
  }
  /* If the base contains a trailing slash, it will be trimmed during composition */


  return base.endsWith("/") ? "" + base.slice(0, -1) + composedPath : "" + base + composedPath;
};
/**
 * If the path starts with slash, it is considered as absolute url.
 * If not, it is considered as relative url.
 * For example,
 * parentPath = "/someBasePath" and path = "/absolute" resolves to "/absolute"
 * whereas,
 * parentPath = "/someBasePath" and path = "relative" resolves to "/someBasePath/relative"
 */

var composePath = function composePath(parentPath, path) {
  if (parentPath === void 0) {
    parentPath = "";
  }

  if (path === void 0) {
    path = "";
  }

  if (path.startsWith("/") && path.length > 1) {
    return url.resolve(parentPath, path);
  } else if (path !== "" && path !== "/") {
    return parentPath + "/" + path;
  } else {
    return parentPath;
  }
};

var parseError = function parseError(e) {
  var msg = parseErrorMessage(e);
  return {
    message: msg,
    data: e
  };
};
var parseErrorMessage = function parseErrorMessage(e) {
  var errMessage = "Failed to fetch, unknown error";

  if (e instanceof Error) {
    errMessage = "Failed to fetch: " + getErrorMessage(e);
  }

  return errMessage;
};
var getErrorMessage = function getErrorMessage(e) {
  var errMessage = "unknown error";

  if (e instanceof Error) {
    errMessage = "" + e.message;
  }

  return errMessage;
};

var processResponse = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(response) {
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(response.status === 204)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", {
              data: undefined,
              responseError: false
            });

          case 2:
            if (!(response.headers.get("content-type") || "").includes("application/json")) {
              _context.next = 15;
              break;
            }

            _context.prev = 3;
            _context.next = 6;
            return response.json();

          case 6:
            _context.t0 = _context.sent;
            return _context.abrupt("return", {
              data: _context.t0,
              responseError: false
            });

          case 10:
            _context.prev = 10;
            _context.t1 = _context["catch"](3);
            return _context.abrupt("return", {
              data: parseErrorMessage(_context.t1),
              responseError: true
            });

          case 13:
            _context.next = 29;
            break;

          case 15:
            if (!((response.headers.get("content-type") || "").includes("text/plain") || (response.headers.get("content-type") || "").includes("text/html"))) {
              _context.next = 28;
              break;
            }

            _context.prev = 16;
            _context.next = 19;
            return response.text();

          case 19:
            _context.t2 = _context.sent;
            return _context.abrupt("return", {
              data: _context.t2,
              responseError: false
            });

          case 23:
            _context.prev = 23;
            _context.t3 = _context["catch"](16);
            return _context.abrupt("return", {
              data: parseErrorMessage(_context.t3),
              responseError: true
            });

          case 26:
            _context.next = 29;
            break;

          case 28:
            return _context.abrupt("return", {
              data: response,
              responseError: false
            });

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 10], [16, 23]]);
  }));

  return function processResponse(_x) {
    return _ref.apply(this, arguments);
  };
}();

var resolveData = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(_ref) {
    var data, resolve, resolvedData, resolveError, resolvedDataOrPromise;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = _ref.data, resolve = _ref.resolve;
            resolvedData = null;
            resolveError = null;
            _context.prev = 3;

            if (!resolve) {
              _context.next = 16;
              break;
            }

            resolvedDataOrPromise = resolve(data);

            if (!resolvedDataOrPromise.then) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return resolvedDataOrPromise;

          case 9:
            _context.t0 = _context.sent;
            _context.next = 13;
            break;

          case 12:
            _context.t0 = resolvedDataOrPromise;

          case 13:
            resolvedData = _context.t0;
            _context.next = 17;
            break;

          case 16:
            resolvedData = data;

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t1 = _context["catch"](3);
            resolvedData = null;
            resolveError = {
              message: "RESOLVE_ERROR",
              data: JSON.stringify(_context.t1)
            };

          case 23:
            return _context.abrupt("return", {
              data: resolvedData,
              error: resolveError
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 19]]);
  }));

  return function resolveData(_x) {
    return _ref2.apply(this, arguments);
  };
}();

function constructUrl(base, path, queryParams, resolvePathOptions) {
  if (resolvePathOptions === void 0) {
    resolvePathOptions = {};
  }

  var _resolvePathOptions = resolvePathOptions,
      queryParamOptions = _resolvePathOptions.queryParamOptions,
      stripTrailingSlash = _resolvePathOptions.stripTrailingSlash;
  var normalizedBase = base.endsWith("/") ? base : base + "/";
  var trimmedPath = path.startsWith("/") ? path.slice(1) : path;
  var encodedPathWithParams = Object.keys(queryParams || {}).length ? trimmedPath + "?" + qs.stringify(queryParams, queryParamOptions) : trimmedPath;
  var composed = Boolean(encodedPathWithParams) ? url.resolve(normalizedBase, encodedPathWithParams) : normalizedBase;
  return stripTrailingSlash && composed.endsWith("/") ? composed.slice(0, -1) : composed;
}

/**
 * The <Get /> component without Context. This
 * is a named class because it is useful in
 * debugging.
 */

var ContextlessGet = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ContextlessGet, _React$Component);

  function ContextlessGet(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    /**
     * Abort controller to cancel the current fetch query
     */

    _this.abortController = new AbortController();
    _this.signal = _this.abortController.signal;
    _this.state = {
      data: null,
      response: null,
      loading: !_this.props.lazy,
      error: null
    };

    _this.getRequestOptions = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(url, extraOptions, extraHeaders) {
        var requestOptions, options;
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                requestOptions = _this.props.requestOptions;

                if (!(typeof requestOptions === "function")) {
                  _context.next = 9;
                  break;
                }

                _context.next = 4;
                return requestOptions(url, "GET");

              case 4:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 7;
                  break;
                }

                _context.t0 = {};

              case 7:
                options = _context.t0;
                return _context.abrupt("return", _extends({}, extraOptions, options, {
                  headers: new Headers(_extends({}, typeof extraHeaders !== "boolean" ? extraHeaders : {}, (extraOptions || {}).headers, options.headers))
                }));

              case 9:
                return _context.abrupt("return", _extends({}, extraOptions, requestOptions, {
                  headers: new Headers(_extends({}, typeof extraHeaders !== "boolean" ? extraHeaders : {}, (extraOptions || {}).headers, (requestOptions || {}).headers))
                }));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.fetch = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(requestPath, thisRequestOptions) {
        var _this$props, base, __internal_hasExplicitBase, parentPath, path, resolve, onError, onRequest, onResponse, makeRequestPath, request, response, originalResponse, _yield$processRespons, data, responseError, error, resolved;

        return runtime_1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props = _this.props, base = _this$props.base, __internal_hasExplicitBase = _this$props.__internal_hasExplicitBase, parentPath = _this$props.parentPath, path = _this$props.path, resolve = _this$props.resolve, onError = _this$props.onError, onRequest = _this$props.onRequest, onResponse = _this$props.onResponse;

                if (_this.state.error || !_this.state.loading) {
                  _this.setState(function () {
                    return {
                      error: null,
                      loading: true
                    };
                  });
                }

                makeRequestPath = function makeRequestPath() {
                  var concatPath = __internal_hasExplicitBase ? path : composePath(parentPath, path);
                  return constructUrl(base, concatPath, _this.props.queryParams, {
                    stripTrailingSlash: true,
                    queryParamOptions: _this.props.queryParamStringifyOptions
                  });
                };

                _context2.t0 = Request;
                _context2.t1 = makeRequestPath();
                _context2.next = 7;
                return _this.getRequestOptions(makeRequestPath(), thisRequestOptions);

              case 7:
                _context2.t2 = _context2.sent;
                request = new _context2.t0(_context2.t1, _context2.t2);
                if (onRequest) onRequest(request);
                _context2.prev = 10;
                _context2.next = 13;
                return fetch(request, {
                  signal: _this.signal
                });

              case 13:
                response = _context2.sent;
                originalResponse = response.clone();
                if (onResponse) onResponse(response.clone());
                _context2.next = 18;
                return processResponse(response);

              case 18:
                _yield$processRespons = _context2.sent;
                data = _yield$processRespons.data;
                responseError = _yield$processRespons.responseError;

                if (!_this.signal.aborted) {
                  _context2.next = 23;
                  break;
                }

                return _context2.abrupt("return");

              case 23:
                if (!(!response.ok || responseError)) {
                  _context2.next = 28;
                  break;
                }

                error = {
                  message: "Failed to fetch: " + response.status + " " + response.statusText + (responseError ? " - " + data : ""),
                  data: data,
                  status: response.status
                };

                _this.setState({
                  loading: false,
                  error: error,
                  data: null,
                  response: originalResponse
                });

                if (!_this.props.localErrorOnly && onError) {
                  onError(error, function () {
                    return _this.fetch(requestPath, thisRequestOptions);
                  }, response);
                }

                return _context2.abrupt("return", null);

              case 28:
                _context2.next = 30;
                return resolveData({
                  data: data,
                  resolve: resolve
                });

              case 30:
                resolved = _context2.sent;

                _this.setState({
                  loading: false,
                  data: resolved.data,
                  error: resolved.error,
                  response: originalResponse
                });

                return _context2.abrupt("return", data);

              case 35:
                _context2.prev = 35;
                _context2.t3 = _context2["catch"](10);

                if (!_this.signal.aborted) {
                  _context2.next = 39;
                  break;
                }

                return _context2.abrupt("return");

              case 39:
                _this.setState({
                  loading: false,
                  data: null,
                  error: parseError(_context2.t3)
                });

              case 40:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[10, 35]]);
      }));

      return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }();

    if (typeof props.debounce === "object") {
      _this.fetch = debounce(_this.fetch, props.debounce.wait, props.debounce.options);
    } else if (typeof props.debounce === "number") {
      _this.fetch = debounce(_this.fetch, props.debounce);
    } else if (props.debounce) {
      _this.fetch = debounce(_this.fetch);
    }

    return _this;
  }

  var _proto = ContextlessGet.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (!this.props.lazy) {
      this.fetch();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var base = prevProps.base,
        parentPath = prevProps.parentPath,
        path = prevProps.path,
        resolve = prevProps.resolve,
        queryParams = prevProps.queryParams,
        requestOptions = prevProps.requestOptions;

    if (base !== this.props.base || parentPath !== this.props.parentPath || path !== this.props.path || !isEqual$1(queryParams, this.props.queryParams) || // both `resolve` props need to _exist_ first, and then be equivalent.
    resolve && this.props.resolve && resolve.toString() !== this.props.resolve.toString() || requestOptions && this.props.requestOptions && requestOptions.toString() !== this.props.requestOptions.toString()) {
      if (!this.props.lazy) {
        this.fetch();
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.abortController.abort();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        wait = _this$props2.wait,
        path = _this$props2.path,
        base = _this$props2.base,
        parentPath = _this$props2.parentPath;
    var _this$state = this.state,
        data = _this$state.data,
        error = _this$state.error,
        loading = _this$state.loading,
        response = _this$state.response;

    if (wait && data === null && !error) {
      return React.createElement(React.Fragment, null); // Show nothing until we have data.
    }

    return children(data, {
      loading: loading,
      error: error
    }, {
      refetch: this.fetch
    }, {
      response: response,
      absolutePath: composeUrl(base, parentPath, path)
    });
  };

  return ContextlessGet;
}(React.Component);

ContextlessGet.defaultProps = {
  base: "",
  parentPath: "",
  resolve: function resolve(unresolvedData) {
    return unresolvedData;
  },
  queryParams: {}
};
/**
 * The <Get /> component _with_ context.
 * Context is used to compose path props,
 * and to maintain the base property against
 * which all requests will be made.
 *
 * We compose Consumers immediately with providers
 * in order to provide new `parentPath` props that contain
 * a segment of the path, creating composable URLs.
 */

function Get(props) {
  return React.createElement(RestfulReactConsumer, null, function (contextProps) {
    return React.createElement(RestfulReactProvider, Object.assign({}, contextProps, {
      parentPath: composePath(contextProps.parentPath, props.path)
    }), React.createElement(ContextlessGet, Object.assign({}, contextProps, props, {
      queryParams: _extends({}, contextProps.queryParams, props.queryParams),
      __internal_hasExplicitBase: Boolean(props.base),
      queryParamStringifyOptions: _extends({}, contextProps.queryParamStringifyOptions, props.queryParamStringifyOptions)
    })));
  });
}

/**
 * The <Poll /> component without context.
 */

var ContextlessPoll = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ContextlessPoll, _React$Component);

  function ContextlessPoll() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.state = {
      data: null,
      previousData: null,
      loading: !_this.props.lazy,
      lastResponse: null,
      polling: !_this.props.lazy,
      finished: false,
      error: null
    };
    _this.keepPolling = !_this.props.lazy;
    /**
     * Abort controller to cancel the current fetch query
     */

    _this.abortController = new AbortController();
    _this.signal = _this.abortController.signal;

    _this.isModified = function (response, nextData) {
      if (response.status === 304) {
        return false;
      }

      if (equal(_this.state.data, nextData)) {
        return false;
      }

      return true;
    };

    _this.getRequestOptions = function (url) {
      return typeof _this.props.requestOptions === "function" ? _this.props.requestOptions(url, "GET") : _this.props.requestOptions || {};
    }; // 304 is not a OK status code but is green in Chrome 🤦🏾‍♂️


    _this.isResponseOk = function (response) {
      return response.ok || response.status === 304;
    };
    /**
     * This thing does the actual poll.
     */


    _this.cycle = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var _this$props, base, path, interval, wait, onError, onRequest, onResponse, lastPollIndex, url, requestOptions, request, response, _yield$processRespons, data, responseError, error;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.keepPolling) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              if (!(_this.props.until && _this.props.until(_this.state.data, _this.state.lastResponse))) {
                _context.next = 5;
                break;
              }

              _this.stop(); // stop.


              return _context.abrupt("return");

            case 5:
              // If we should keep going,
              _this$props = _this.props, base = _this$props.base, path = _this$props.path, interval = _this$props.interval, wait = _this$props.wait, onError = _this$props.onError, onRequest = _this$props.onRequest, onResponse = _this$props.onResponse;
              lastPollIndex = _this.state.lastPollIndex;
              url = constructUrl(base, path, _this.props.queryParams, {
                queryParamOptions: _this.props.queryParamStringifyOptions,
                stripTrailingSlash: true
              });
              _context.next = 10;
              return _this.getRequestOptions(url);

            case 10:
              requestOptions = _context.sent;
              request = new Request(url, _extends({}, requestOptions, {
                headers: _extends({
                  Prefer: "wait=" + wait + "s;" + (lastPollIndex ? "index=" + lastPollIndex : "")
                }, requestOptions.headers)
              }));
              if (onRequest) onRequest(request);
              _context.prev = 13;
              _context.next = 16;
              return fetch(request, {
                signal: _this.signal
              });

            case 16:
              response = _context.sent;
              if (onResponse) onResponse(response.clone());
              _context.next = 20;
              return processResponse(response);

            case 20:
              _yield$processRespons = _context.sent;
              data = _yield$processRespons.data;
              responseError = _yield$processRespons.responseError;

              if (!(!_this.keepPolling || _this.signal.aborted)) {
                _context.next = 25;
                break;
              }

              return _context.abrupt("return");

            case 25:
              if (!_this.isResponseOk(response) || responseError) {
                error = {
                  message: "Failed to poll: " + response.status + " " + response.statusText + (responseError ? " - " + data : ""),
                  data: data,
                  status: response.status
                };

                _this.setState({
                  loading: false,
                  lastResponse: response,
                  error: error
                });

                if (!_this.props.localErrorOnly && onError) {
                  onError(error, function () {
                    return Promise.resolve();
                  }, response);
                }
              } else if (_this.isModified(response, data)) {
                _this.setState(function (prevState) {
                  return {
                    loading: false,
                    lastResponse: response,
                    previousData: prevState.data,
                    data: data,
                    error: null,
                    lastPollIndex: response.headers.get("x-polling-index") || undefined
                  };
                });
              } // Wait for interval to pass.


              _context.next = 28;
              return new Promise(function (resolvePromise) {
                return setTimeout(resolvePromise, interval);
              });

            case 28:
              _this.cycle(); // Do it all again!


              _context.next = 33;
              break;

            case 31:
              _context.prev = 31;
              _context.t0 = _context["catch"](13);

            case 33:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[13, 31]]);
    }));

    _this.start = function () {
      _this.keepPolling = true;

      if (!_this.state.polling) {
        _this.setState(function () {
          return {
            polling: true
          };
        }); // let everyone know we're done here.

      }

      _this.cycle();
    };

    _this.stop = function () {
      _this.keepPolling = false;

      _this.setState(function () {
        return {
          polling: false,
          finished: true
        };
      }); // let everyone know we're done here.

    };

    return _this;
  }

  var _proto = ContextlessPoll.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props2 = this.props,
        path = _this$props2.path,
        lazy = _this$props2.lazy;

    if (path === undefined) {
      throw new Error("[restful-react]: You're trying to poll something without a path. Please specify a \"path\" prop on your Poll component.");
    }

    if (!lazy) {
      this.start();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    // Cancel the current query
    this.abortController.abort(); // Stop the polling cycle

    this.stop();
  };

  _proto.render = function render() {
    var _this$state = this.state,
        response = _this$state.lastResponse,
        previousData = _this$state.previousData,
        data = _this$state.data,
        polling = _this$state.polling,
        loading = _this$state.loading,
        error = _this$state.error,
        finished = _this$state.finished;
    var _this$props3 = this.props,
        children = _this$props3.children,
        base = _this$props3.base,
        path = _this$props3.path,
        resolve = _this$props3.resolve;
    var meta = {
      response: response,
      absolutePath: composeUrl(base, "", path)
    };
    var states = {
      polling: polling,
      loading: loading,
      error: error,
      finished: finished
    };
    var actions = {
      stop: this.stop,
      start: this.start
    }; // data is parsed only when poll has already resolved so response is defined

    var resolvedData = response && resolve ? resolve(data, previousData) : data;
    return children(resolvedData, states, actions, meta);
  };

  return ContextlessPoll;
}(React.Component);

ContextlessPoll.defaultProps = {
  interval: 1000,
  wait: 60,
  base: "",
  resolve: function resolve(data) {
    return data;
  },
  queryParams: {}
};

function Poll(props) {
  // Compose Contexts to allow for URL nesting
  return React.createElement(RestfulReactConsumer, null, function (contextProps) {
    return React.createElement(ContextlessPoll, Object.assign({}, contextProps, props, {
      queryParams: _extends({}, contextProps.queryParams, props.queryParams),
      requestOptions: function () {
        var _requestOptions = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(url, method) {
          var contextRequestOptions, propsRequestOptions;
          return runtime_1.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(typeof contextProps.requestOptions === "function")) {
                    _context2.next = 6;
                    break;
                  }

                  _context2.next = 3;
                  return contextProps.requestOptions(url, method);

                case 3:
                  _context2.t0 = _context2.sent;
                  _context2.next = 7;
                  break;

                case 6:
                  _context2.t0 = contextProps.requestOptions || {};

                case 7:
                  contextRequestOptions = _context2.t0;

                  if (!(typeof props.requestOptions === "function")) {
                    _context2.next = 14;
                    break;
                  }

                  _context2.next = 11;
                  return props.requestOptions(url, method);

                case 11:
                  _context2.t1 = _context2.sent;
                  _context2.next = 15;
                  break;

                case 14:
                  _context2.t1 = props.requestOptions || {};

                case 15:
                  propsRequestOptions = _context2.t1;
                  return _context2.abrupt("return", merge(contextRequestOptions, propsRequestOptions));

                case 17:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function requestOptions(_x, _x2) {
          return _requestOptions.apply(this, arguments);
        }

        return requestOptions;
      }(),
      queryParamStringifyOptions: _extends({}, contextProps.queryParamStringifyOptions, props.queryParamStringifyOptions)
    }));
  });
}

/**
 * The <Mutate /> component without Context. This
 * is a named class because it is useful in
 * debugging.
 */

var ContextlessMutate = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ContextlessMutate, _React$Component);

  function ContextlessMutate() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.state = {
      loading: false,
      error: null
    };
    /**
     * Abort controller to cancel the current fetch query
     */

    _this.abortController = new AbortController();
    _this.signal = _this.abortController.signal;

    _this.mutate = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(body, mutateRequestOptions) {
        var _this$props, __internal_hasExplicitBase, base, parentPath, path, verb, providerRequestOptions, onError, onRequest, onResponse, pathInlineBodyEncode, resolve, makeRequestPath, request, response, error, _yield$processRespons, rawData, responseError, data;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = _this.props, __internal_hasExplicitBase = _this$props.__internal_hasExplicitBase, base = _this$props.base, parentPath = _this$props.parentPath, path = _this$props.path, verb = _this$props.verb, providerRequestOptions = _this$props.requestOptions, onError = _this$props.onError, onRequest = _this$props.onRequest, onResponse = _this$props.onResponse, pathInlineBodyEncode = _this$props.pathInlineBodyEncode, resolve = _this$props.resolve;

                _this.setState(function () {
                  return {
                    error: null,
                    loading: true
                  };
                });

                makeRequestPath = function makeRequestPath() {
                  var pathWithPossibleBody = verb === "DELETE" && typeof body === "string" ? composePath(path, pathInlineBodyEncode ? pathInlineBodyEncode(body) : body) : path;
                  var concatPath = __internal_hasExplicitBase ? pathWithPossibleBody || "" : composePath(parentPath, pathWithPossibleBody);
                  return constructUrl(base, concatPath, _this.props.queryParams, {
                    stripTrailingSlash: true,
                    queryParamOptions: _this.props.queryParamStringifyOptions
                  });
                };

                _context.t0 = Request;
                _context.t1 = makeRequestPath();
                _context.t2 = _extends;
                _context.t3 = {
                  method: verb,
                  body: body instanceof FormData ? body : typeof body === "object" ? JSON.stringify(body) : body
                };

                if (!(typeof providerRequestOptions === "function")) {
                  _context.next = 13;
                  break;
                }

                _context.next = 10;
                return providerRequestOptions(makeRequestPath(), verb, body);

              case 10:
                _context.t4 = _context.sent;
                _context.next = 14;
                break;

              case 13:
                _context.t4 = providerRequestOptions;

              case 14:
                _context.t5 = _context.t4;
                _context.t6 = mutateRequestOptions;
                _context.t7 = _extends;
                _context.t8 = {};

                if (!(typeof providerRequestOptions === "function")) {
                  _context.next = 24;
                  break;
                }

                _context.next = 21;
                return providerRequestOptions(makeRequestPath(), verb, body);

              case 21:
                _context.t9 = _context.sent.headers;
                _context.next = 25;
                break;

              case 24:
                _context.t9 = (providerRequestOptions || {}).headers;

              case 25:
                _context.t10 = _context.t9;
                _context.t11 = mutateRequestOptions ? mutateRequestOptions.headers : {};
                _context.t12 = (0, _context.t7)(_context.t8, _context.t10, _context.t11);
                _context.t13 = {
                  headers: _context.t12
                };
                _context.t14 = (0, _context.t2)(_context.t3, _context.t5, _context.t6, _context.t13);
                request = new _context.t0(_context.t1, _context.t14);

                // Type assertion for version of TypeScript that can't yet discriminate.
                // only set default content-type if body is not of type FormData and there is no content-type already defined on mutateRequestOptions.headers
                if (!(body instanceof FormData) && !request.headers.has("content-type")) {
                  request.headers.set("content-type", typeof body === "object" ? "application/json" : "text/plain");
                }

                if (onRequest) onRequest(request);
                _context.prev = 33;
                _context.next = 36;
                return fetch(request, {
                  signal: _this.signal
                });

              case 36:
                response = _context.sent;
                if (onResponse) onResponse(response.clone());
                _context.next = 46;
                break;

              case 40:
                _context.prev = 40;
                _context.t15 = _context["catch"](33);
                error = parseError(_context.t15);

                _this.setState({
                  error: error,
                  loading: false
                });

                if (!_this.props.localErrorOnly && onError) {
                  onError(error, function () {
                    return _this.mutate(body, mutateRequestOptions);
                  });
                }

                throw error;

              case 46:
                _context.next = 48;
                return processResponse(response);

              case 48:
                _yield$processRespons = _context.sent;
                rawData = _yield$processRespons.data;
                responseError = _yield$processRespons.responseError;
                _context.prev = 51;
                data = resolve ? resolve(rawData) : rawData;
                _context.next = 61;
                break;

              case 55:
                _context.prev = 55;
                _context.t16 = _context["catch"](51);

                if (!_this.signal.aborted) {
                  _context.next = 59;
                  break;
                }

                return _context.abrupt("return");

              case 59:
                _this.setState({
                  error: parseError(_context.t16),
                  loading: false
                });

                throw _context.t16;

              case 61:
                if (!_this.signal.aborted) {
                  _context.next = 63;
                  break;
                }

                return _context.abrupt("return");

              case 63:
                if (!(!response.ok || responseError)) {
                  _context.next = 68;
                  break;
                }

                error = {
                  data: data,
                  message: "Failed to fetch: " + response.status + " " + response.statusText,
                  status: response.status
                };

                _this.setState({
                  error: error,
                  loading: false
                });

                if (!_this.props.localErrorOnly && onError) {
                  onError(error, function () {
                    return _this.mutate(body, mutateRequestOptions);
                  }, response);
                }

                throw error;

              case 68:
                _this.setState({
                  loading: false
                });

                if (_this.props.onMutate) {
                  _this.props.onMutate(body, data);
                }

                return _context.abrupt("return", data);

              case 71:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[33, 40], [51, 55]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    return _this;
  }

  var _proto = ContextlessMutate.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.abortController.abort();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        path = _this$props2.path,
        base = _this$props2.base,
        parentPath = _this$props2.parentPath;
    var _this$state = this.state,
        error = _this$state.error,
        loading = _this$state.loading;
    return children(this.mutate, {
      loading: loading,
      error: error
    }, {
      absolutePath: composeUrl(base, parentPath, path)
    });
  };

  return ContextlessMutate;
}(React.Component);

ContextlessMutate.defaultProps = {
  base: "",
  parentPath: "",
  path: "",
  queryParams: {}
};
/**
 * The <Mutate /> component _with_ context.
 * Context is used to compose path props,
 * and to maintain the base property against
 * which all requests will be made.
 *
 * We compose Consumers immediately with providers
 * in order to provide new `parentPath` props that contain
 * a segment of the path, creating composable URLs.
 */

function Mutate(props) {
  return React.createElement(RestfulReactConsumer, null, function (contextProps) {
    return React.createElement(RestfulReactProvider, Object.assign({}, contextProps, {
      parentPath: composePath(contextProps.parentPath, props.path)
    }), React.createElement(ContextlessMutate, Object.assign({}, contextProps, props, {
      queryParams: _extends({}, contextProps.queryParams, props.queryParams),
      queryParamStringifyOptions: _extends({}, contextProps.queryParamStringifyOptions, props.queryParamStringifyOptions),
      __internal_hasExplicitBase: Boolean(props.base)
    })));
  });
}

/**
 * Custom version of isEqual to handle function comparison
 */

var isEqual = function isEqual(x, y) {
  return isEqualWith(x, y, function (a, b) {
    // Deal with the function comparison case
    if (typeof a === "function" && typeof b === "function") {
      return a.toString() === b.toString();
    } // Fallback on the method


    return undefined;
  });
};

function useDeepCompareMemoize(value) {
  var ref = React.useRef();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
/**
 * Accepts a function that contains imperative, possibly effectful code.
 *
 * This is the deepCompare version of the `React.useEffect` hooks (that is shallowed compare)
 *
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list change.
 *
 * @see https://gist.github.com/kentcdodds/fb8540a05c43faf636dd68647747b074#gistcomment-2830503
 */


function useDeepCompareEffect(effect, deps) {
  React.useEffect(effect, useDeepCompareMemoize(deps));
}
function useDeepCompareCallback(callback, deps) {
  return React.useCallback(callback, useDeepCompareMemoize(deps));
}

function createAbortController() {
  try {
    return new AbortController();
  } catch (_unused) {
    return undefined;
  }
}

function useAbort() {
  var instance = React.useRef(createAbortController());
  var abort = React.useCallback(function () {
    if (instance && instance.current) {
      instance.current.abort();
      instance.current = createAbortController();
    }
  }, [instance]);
  return {
    abort: abort,
    getAbortSignal: function getAbortSignal() {
      var _instance$current;

      return instance == null ? void 0 : (_instance$current = instance.current) == null ? void 0 : _instance$current.signal;
    }
  };
}

var isCancellable = function isCancellable(func) {
  return typeof func.cancel === "function" && typeof func.flush === "function";
};

function useGet() {
  var props = typeof arguments[0] === "object" ? arguments[0] : _extends({}, arguments[1], {
    path: arguments[0]
  });
  var context = React.useContext(Context);
  var path = props.path,
      _props$pathParams = props.pathParams,
      pathParams = _props$pathParams === void 0 ? {} : _props$pathParams;

  var _useState = React.useState({
    data: null,
    response: null,
    loading: !props.lazy,
    error: null
  }),
      state = _useState[0],
      setState = _useState[1];

  var _useAbort = useAbort(),
      abort = _useAbort.abort,
      getAbortSignal = _useAbort.getAbortSignal;

  var pathStr = typeof path === "function" ? path(pathParams) : path;

  var _fetchData = useDeepCompareCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(props, context, abort, getAbortSignal) {
      var _props$base, base, path, _props$resolve, resolve, _props$queryParams, queryParams, _props$queryParamStri, queryParamStringifyOptions, requestOptions, _props$pathParams2, pathParams, pathStr, url, propsRequestOptions, contextRequestOptions, signal, request, response, originalResponse, _yield$processRespons, data, responseError, error, resolvedData, _error;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _props$base = props.base, base = _props$base === void 0 ? context.base : _props$base, path = props.path, _props$resolve = props.resolve, resolve = _props$resolve === void 0 ? context.resolve || function (d) {
                return d;
              } : _props$resolve, _props$queryParams = props.queryParams, queryParams = _props$queryParams === void 0 ? {} : _props$queryParams, _props$queryParamStri = props.queryParamStringifyOptions, queryParamStringifyOptions = _props$queryParamStri === void 0 ? {} : _props$queryParamStri, requestOptions = props.requestOptions, _props$pathParams2 = props.pathParams, pathParams = _props$pathParams2 === void 0 ? {} : _props$pathParams2;
              setState(function (prev) {
                if (prev.error || !prev.loading) {
                  return _extends({}, prev, {
                    error: null,
                    loading: true
                  });
                }

                return prev;
              });
              pathStr = typeof path === "function" ? path(pathParams) : path;
              url = constructUrl(base, pathStr, _extends({}, context.queryParams, queryParams), {
                queryParamOptions: _extends({}, context.queryParamStringifyOptions, queryParamStringifyOptions)
              });

              if (!(typeof requestOptions === "function")) {
                _context.next = 10;
                break;
              }

              _context.next = 7;
              return requestOptions(url, "GET");

            case 7:
              _context.t1 = _context.sent;
              _context.next = 11;
              break;

            case 10:
              _context.t1 = requestOptions;

            case 11:
              _context.t0 = _context.t1;

              if (_context.t0) {
                _context.next = 14;
                break;
              }

              _context.t0 = {};

            case 14:
              propsRequestOptions = _context.t0;

              if (!(typeof context.requestOptions === "function")) {
                _context.next = 21;
                break;
              }

              _context.next = 18;
              return context.requestOptions(url, "GET");

            case 18:
              _context.t3 = _context.sent;
              _context.next = 22;
              break;

            case 21:
              _context.t3 = context.requestOptions;

            case 22:
              _context.t2 = _context.t3;

              if (_context.t2) {
                _context.next = 25;
                break;
              }

              _context.t2 = {};

            case 25:
              contextRequestOptions = _context.t2;
              signal = getAbortSignal();
              request = new Request(url, merge({}, contextRequestOptions, propsRequestOptions, {
                signal: signal
              }));
              if (context.onRequest) context.onRequest(request);
              _context.prev = 29;
              _context.next = 32;
              return fetch(request);

            case 32:
              response = _context.sent;
              originalResponse = response.clone();
              if (context.onResponse) context.onResponse(originalResponse);
              _context.next = 37;
              return processResponse(response);

            case 37:
              _yield$processRespons = _context.sent;
              data = _yield$processRespons.data;
              responseError = _yield$processRespons.responseError;

              if (!(signal && signal.aborted)) {
                _context.next = 42;
                break;
              }

              return _context.abrupt("return");

            case 42:
              if (!(!response.ok || responseError)) {
                _context.next = 47;
                break;
              }

              error = {
                message: "Failed to fetch: " + response.status + " " + response.statusText + (responseError ? " - " + data : ""),
                data: data,
                status: response.status
              };
              setState(function (prev) {
                return _extends({}, prev, {
                  loading: false,
                  data: null,
                  error: error,
                  response: originalResponse
                });
              });

              if (!props.localErrorOnly && context.onError) {
                context.onError(error, function () {
                  return _fetchData(props, context, abort, getAbortSignal);
                }, response);
              }

              return _context.abrupt("return");

            case 47:
              resolvedData = resolve(data);
              setState(function (prev) {
                return _extends({}, prev, {
                  error: null,
                  loading: false,
                  data: resolvedData,
                  response: originalResponse
                });
              });
              return _context.abrupt("return", resolvedData);

            case 52:
              _context.prev = 52;
              _context.t4 = _context["catch"](29);

              if (!(signal && signal.aborted)) {
                _context.next = 56;
                break;
              }

              return _context.abrupt("return");

            case 56:
              _error = parseError(_context.t4);
              setState(function (prev) {
                return _extends({}, prev, {
                  data: null,
                  loading: false,
                  error: _error
                });
              });

              if (!props.localErrorOnly && context.onError) {
                context.onError(_error, function () {
                  return _fetchData(props, context, abort, getAbortSignal);
                });
              }

              return _context.abrupt("return");

            case 60:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[29, 52]]);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }(), [props.lazy, props.mock, props.path, props.base, props.resolve, props.queryParams, props.requestOptions, props.pathParams, context.base, context.parentPath, context.queryParams, context.requestOptions, abort]);

  var fetchData = React.useCallback(typeof props.debounce === "object" ? debounce(_fetchData, props.debounce.wait, props.debounce.options) : typeof props.debounce === "number" ? debounce(_fetchData, props.debounce) : props.debounce ? debounce(_fetchData) : _fetchData, [_fetchData, props.debounce]);
  React.useEffect(function () {
    if (!props.lazy && !props.mock) {
      fetchData(props, context, abort, getAbortSignal);
    }

    return function () {
      if (isCancellable(fetchData)) {
        fetchData.cancel();
      }

      abort();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, props.lazy, props.mock]);
  var refetch = React.useCallback(function (options) {
    if (options === void 0) {
      options = {};
    }

    return fetchData(_extends({}, props, options), context, abort, getAbortSignal);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [fetchData]);
  return _extends({}, state, props.mock, {
    absolutePath: constructUrl(props.base || context.base, pathStr, _extends({}, context.queryParams, props.queryParams), {
      queryParamOptions: _extends({}, context.queryParamStringifyOptions, props.queryParamStringifyOptions)
    }),
    cancel: function cancel() {
      setState(_extends({}, state, {
        loading: false
      }));
      abort();
    },
    refetch: refetch
  });
}

function useMutate() {
  var props = typeof arguments[0] === "object" ? arguments[0] : _extends({}, arguments[2], {
    path: arguments[1],
    verb: arguments[0]
  });
  var context = React.useContext(Context);
  var verb = props.verb,
      _props$base = props.base,
      base = _props$base === void 0 ? context.base : _props$base,
      path = props.path,
      _props$queryParams = props.queryParams,
      queryParams = _props$queryParams === void 0 ? EMPTY_OBJECT : _props$queryParams,
      _props$resolve = props.resolve,
      resolve = _props$resolve === void 0 ? context.resolve : _props$resolve,
      _props$pathParams = props.pathParams,
      pathParams = _props$pathParams === void 0 ? EMPTY_OBJECT : _props$pathParams;
  var isDelete = verb === "DELETE";

  var _useState = React.useState({
    error: null,
    loading: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _useAbort = useAbort(),
      abort = _useAbort.abort,
      getAbortSignal = _useAbort.getAbortSignal; // Cancel the fetch on unmount


  React.useEffect(function () {
    return function () {
      return abort();
    };
  }, [abort]);
  var pathInlineBodyEncode = props.pathInlineBodyEncode,
      queryParamStringifyOptions = props.queryParamStringifyOptions,
      requestOptions = props.requestOptions,
      localErrorOnly = props.localErrorOnly,
      onMutate = props.onMutate;
  var effectDependencies = [path, pathParams, queryParams, verb, isDelete, base, context, queryParamStringifyOptions, requestOptions, onMutate, abort, pathInlineBodyEncode, localErrorOnly, resolve];
  var mutate = useDeepCompareCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(body, mutateRequestOptions) {
      var signal, pathStr, pathParts, options, possiblyEncodedBody, url, propsRequestOptions, contextRequestOptions, request, response, error, _yield$processRespons, rawData, responseError, data, _error;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              signal = getAbortSignal();
              setState(function (prevState) {
                if (prevState.error || !prevState.loading) {
                  return _extends({}, prevState, {
                    loading: true,
                    error: null
                  });
                }

                return prevState;
              });
              pathStr = typeof path === "function" ? path((mutateRequestOptions == null ? void 0 : mutateRequestOptions.pathParams) || pathParams) : path;
              pathParts = [pathStr];
              options = {
                method: verb
              }; // don't set content-type when body is of type FormData

              if (!(body instanceof FormData)) {
                options.headers = {
                  "content-type": typeof body === "object" ? "application/json" : "text/plain"
                };
              }

              if (body instanceof FormData) {
                options.body = body;
              } else if (typeof body === "object") {
                options.body = JSON.stringify(body);
              } else if (isDelete && body !== undefined) {
                possiblyEncodedBody = pathInlineBodyEncode ? pathInlineBodyEncode(String(body)) : String(body);
                pathParts.push(possiblyEncodedBody);
              } else {
                options.body = body;
              }

              url = constructUrl(base, pathParts.join("/"), _extends({}, context.queryParams, queryParams, mutateRequestOptions == null ? void 0 : mutateRequestOptions.queryParams), {
                queryParamOptions: _extends({}, context.queryParamStringifyOptions, queryParamStringifyOptions)
              });

              if (!(typeof requestOptions === "function")) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return requestOptions(url, verb, body);

            case 11:
              _context.t1 = _context.sent;
              _context.next = 15;
              break;

            case 14:
              _context.t1 = requestOptions;

            case 15:
              _context.t0 = _context.t1;

              if (_context.t0) {
                _context.next = 18;
                break;
              }

              _context.t0 = {};

            case 18:
              propsRequestOptions = _context.t0;

              if (!(typeof context.requestOptions === "function")) {
                _context.next = 25;
                break;
              }

              _context.next = 22;
              return context.requestOptions(url, verb, body);

            case 22:
              _context.t3 = _context.sent;
              _context.next = 26;
              break;

            case 25:
              _context.t3 = context.requestOptions;

            case 26:
              _context.t2 = _context.t3;

              if (_context.t2) {
                _context.next = 29;
                break;
              }

              _context.t2 = {};

            case 29:
              contextRequestOptions = _context.t2;
              request = new Request(url, merge({}, contextRequestOptions, options, propsRequestOptions, mutateRequestOptions, {
                signal: signal
              }));
              if (context.onRequest) context.onRequest(request);
              _context.prev = 32;
              _context.next = 35;
              return fetch(request);

            case 35:
              response = _context.sent;
              if (context.onResponse) context.onResponse(response.clone());
              _context.next = 45;
              break;

            case 39:
              _context.prev = 39;
              _context.t4 = _context["catch"](32);
              error = {
                message: "Failed to fetch: " + getErrorMessage(_context.t4),
                data: ""
              };
              setState({
                error: error,
                loading: false
              });

              if (!localErrorOnly && context.onError) {
                context.onError(error, function () {
                  return mutate(body, mutateRequestOptions);
                });
              }

              throw error;

            case 45:
              _context.next = 47;
              return processResponse(response);

            case 47:
              _yield$processRespons = _context.sent;
              rawData = _yield$processRespons.data;
              responseError = _yield$processRespons.responseError;
              _context.prev = 50;
              data = resolve ? resolve(rawData) : rawData;
              _context.next = 61;
              break;

            case 54:
              _context.prev = 54;
              _context.t5 = _context["catch"](50);

              if (!(signal && signal.aborted)) {
                _context.next = 58;
                break;
              }

              return _context.abrupt("return");

            case 58:
              error = {
                data: getErrorMessage(_context.t5),
                message: "Failed to resolve: " + getErrorMessage(_context.t5)
              };
              setState(function (prevState) {
                return _extends({}, prevState, {
                  error: error,
                  loading: false
                });
              });
              throw _context.t5;

            case 61:
              if (!(signal && signal.aborted)) {
                _context.next = 63;
                break;
              }

              return _context.abrupt("return");

            case 63:
              if (!(!response.ok || responseError)) {
                _context.next = 68;
                break;
              }

              _error = {
                data: data,
                message: "Failed to fetch: " + response.status + " " + response.statusText,
                status: response.status
              };
              setState(function (prevState) {
                return _extends({}, prevState, {
                  error: _error,
                  loading: false
                });
              });

              if (!localErrorOnly && context.onError) {
                context.onError(_error, function () {
                  return mutate(body);
                }, response);
              }

              throw _error;

            case 68:
              setState(function (prevState) {
                return _extends({}, prevState, {
                  loading: false
                });
              });

              if (onMutate) {
                onMutate(body, data);
              }

              return _context.abrupt("return", data);

            case 71:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[32, 39], [50, 54]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), effectDependencies);
  useDeepCompareEffect(function () {
    if (state.loading) {
      abort();
    }
  }, effectDependencies);
  return _extends({}, state, {
    mutate: mutate
  }, props.mock, {
    cancel: function cancel() {
      setState(function (prevState) {
        return _extends({}, prevState, {
          loading: false
        });
      });
      abort();
    }
  });
} // Declaring this in order to have a thing with stable identity

var EMPTY_OBJECT = {};

exports.Get = Get;
exports.Mutate = Mutate;
exports.Poll = Poll;
exports.RestfulProvider = RestfulReactProvider;
exports.default = Get;
exports.useGet = useGet;
exports.useMutate = useMutate;
//# sourceMappingURL=restful-react.cjs.development.js.map
