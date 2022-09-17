/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMPLETE_NOTIFICATION": () => (/* binding */ COMPLETE_NOTIFICATION),
/* harmony export */   "createNotification": () => (/* binding */ createNotification),
/* harmony export */   "errorNotification": () => (/* binding */ errorNotification),
/* harmony export */   "nextNotification": () => (/* binding */ nextNotification)
/* harmony export */ });
var COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
//# sourceMappingURL=NotificationFactories.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Observable.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Observable.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observable": () => (/* binding */ Observable)
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/pipe */ "./node_modules/rxjs/dist/esm5/internal/util/pipe.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");







var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber(observerOrNext, error, complete);
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_1__.errorContext)(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[_symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return (0,_util_pipe__WEBPACK_IMPORTED_MODULE_3__.pipeFromArray)(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());

function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : _config__WEBPACK_IMPORTED_MODULE_4__.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.next) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.error) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber) || (isObserver(value) && (0,_Subscription__WEBPACK_IMPORTED_MODULE_6__.isSubscription)(value));
}
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subscriber.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY_OBSERVER": () => (/* binding */ EMPTY_OBSERVER),
/* harmony export */   "SafeSubscriber": () => (/* binding */ SafeSubscriber),
/* harmony export */   "Subscriber": () => (/* binding */ Subscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/reportUnhandledError */ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/noop */ "./node_modules/rxjs/dist/esm5/internal/util/noop.js");
/* harmony import */ var _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationFactories */ "./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduler/timeoutProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");









var Subscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if ((0,_Subscription__WEBPACK_IMPORTED_MODULE_1__.isSubscription)(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.nextNotification)(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.errorNotification)(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription));

var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            var context_1;
            if (_this && _config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));

function handleUnhandledError(error) {
    if (_config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedSynchronousErrorHandling) {
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_5__.captureError)(error);
    }
    else {
        (0,_util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__.reportUnhandledError)(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = _config__WEBPACK_IMPORTED_MODULE_4__.config.onStoppedNotification;
    onStoppedNotification && _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
var EMPTY_OBSERVER = {
    closed: true,
    next: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
    error: defaultErrorHandler,
    complete: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
};
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/Subscription.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subscription.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY_SUBSCRIPTION": () => (/* binding */ EMPTY_SUBSCRIPTION),
/* harmony export */   "Subscription": () => (/* binding */ Subscription),
/* harmony export */   "isSubscription": () => (/* binding */ isSubscription)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/UnsubscriptionError */ "./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/arrRemove */ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError) {
                                errors = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(errors)), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());

var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.remove) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.add) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/config.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/config.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/empty.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/empty.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY": () => (/* binding */ EMPTY),
/* harmony export */   "empty": () => (/* binding */ empty)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");

var EMPTY = new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) { return subscriber.complete(); });
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}
//# sourceMappingURL=empty.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/from.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/from.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "from": () => (/* binding */ from)
/* harmony export */ });
/* harmony import */ var _scheduled_scheduled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduled/scheduled */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js");
/* harmony import */ var _innerFrom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");


function from(input, scheduler) {
    return scheduler ? (0,_scheduled_scheduled__WEBPACK_IMPORTED_MODULE_0__.scheduled)(input, scheduler) : (0,_innerFrom__WEBPACK_IMPORTED_MODULE_1__.innerFrom)(input);
}
//# sourceMappingURL=from.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromEvent": () => (/* binding */ fromEvent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../operators/mergeMap */ "./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isArrayLike */ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/mapOneOrManyArgs */ "./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js");







var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe((0,_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__.mapOneOrManyArgs)(resultSelector));
    }
    var _a = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__read)(isEventTarget(target)
        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
        :
            isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                : isJQueryStyleEventEmitter(target)
                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                    : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(target)) {
            return (0,_operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__.mergeMap)(function (subTarget) { return fromEvent(subTarget, eventName, options); })((0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__.innerFrom)(target));
        }
    }
    if (!add) {
        throw new TypeError('Invalid event target');
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_6__.Observable(function (subscriber) {
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function () { return remove(handler); };
    });
}
function toCommonHandlerRegistry(target, eventName) {
    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
}
function isNodeStyleEventEmitter(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.addListener) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.on) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.off);
}
function isEventTarget(target) {
    return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.addEventListener) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target.removeEventListener);
}
//# sourceMappingURL=fromEvent.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromArrayLike": () => (/* binding */ fromArrayLike),
/* harmony export */   "fromAsyncIterable": () => (/* binding */ fromAsyncIterable),
/* harmony export */   "fromInteropObservable": () => (/* binding */ fromInteropObservable),
/* harmony export */   "fromIterable": () => (/* binding */ fromIterable),
/* harmony export */   "fromPromise": () => (/* binding */ fromPromise),
/* harmony export */   "fromReadableStreamLike": () => (/* binding */ fromReadableStreamLike),
/* harmony export */   "innerFrom": () => (/* binding */ innerFrom)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArrayLike */ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isPromise */ "./node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isInteropObservable */ "./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/throwUnobservableError */ "./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/isIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/reportUnhandledError */ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");












function innerFrom(input) {
    if (input instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable) {
        return input;
    }
    if (input != null) {
        if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__.isInteropObservable)(input)) {
            return fromInteropObservable(input);
        }
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(input)) {
            return fromArrayLike(input);
        }
        if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_3__.isPromise)(input)) {
            return fromPromise(input);
        }
        if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__.isAsyncIterable)(input)) {
            return fromAsyncIterable(input);
        }
        if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_5__.isIterable)(input)) {
            return fromIterable(input);
        }
        if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.isReadableStreamLike)(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__.createInvalidObservableTypeError)(input);
}
function fromInteropObservable(obj) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var obs = obj[_symbol_observable__WEBPACK_IMPORTED_MODULE_8__.observable]();
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_9__.isFunction)(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__.reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__values)(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.readableStreamLikeToAsyncGenerator)(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function () {
        var value, e_2_1;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__asyncValues)(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}
//# sourceMappingURL=innerFrom.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OperatorSubscriber": () => (/* binding */ OperatorSubscriber),
/* harmony export */   "createOperatorSubscriber": () => (/* binding */ createOperatorSubscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/dist/esm5/internal/Subscriber.js");


function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__.Subscriber));

//# sourceMappingURL=OperatorSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/filter.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/filter.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filter": () => (/* binding */ filter)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function filter(predicate, thisArg) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}
//# sourceMappingURL=filter.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/map.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "map": () => (/* binding */ map)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function map(project, thisArg) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeInternals": () => (/* binding */ mergeInternals)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(project(value, index++)).subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
                outerNext(innerValue);
            }
            else {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        if (innerSubScheduler) {
                            (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, innerSubScheduler, function () { return doInnerSub(bufferedValue); });
                        }
                        else {
                            doInnerSub(bufferedValue);
                        }
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
        additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
}
//# sourceMappingURL=mergeInternals.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js":
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeMap": () => (/* binding */ mergeMap)
/* harmony export */ });
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _mergeInternals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mergeInternals */ "./node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");





function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(resultSelector)) {
        return mergeMap(function (a, i) { return (0,_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (b, ii) { return resultSelector(a, b, i, ii); })((0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_3__.operate)(function (source, subscriber) { return (0,_mergeInternals__WEBPACK_IMPORTED_MODULE_4__.mergeInternals)(source, subscriber, project, concurrent); });
}
//# sourceMappingURL=mergeMap.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "observeOn": () => (/* binding */ observeOn)
/* harmony export */ });
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}
//# sourceMappingURL=observeOn.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "subscribeOn": () => (/* binding */ subscribeOn)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");

function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}
//# sourceMappingURL=subscribeOn.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "switchMap": () => (/* binding */ switchMap)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function switchMap(project, resultSelector) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var innerSubscriber = null;
        var index = 0;
        var isComplete = false;
        var checkComplete = function () { return isComplete && !innerSubscriber && subscriber.complete(); };
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) {
            innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
            var innerIndex = 0;
            var outerIndex = index++;
            (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(project(value, outerIndex)).subscribe((innerSubscriber = (0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (innerValue) { return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue); }, function () {
                innerSubscriber = null;
                checkComplete();
            })));
        }, function () {
            isComplete = true;
            checkComplete();
        }));
    });
}
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/take.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/take.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "take": () => (/* binding */ take)
/* harmony export */ });
/* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/empty */ "./node_modules/rxjs/dist/esm5/internal/observable/empty.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function take(count) {
    return count <= 0
        ?
            function () { return _observable_empty__WEBPACK_IMPORTED_MODULE_0__.EMPTY; }
        : (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
            var seen = 0;
            source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, function (value) {
                if (++seen <= count) {
                    subscriber.next(value);
                    if (count <= seen) {
                        subscriber.complete();
                    }
                }
            }));
        });
}
//# sourceMappingURL=take.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js":
/*!*************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleArray": () => (/* binding */ scheduleArray)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");

function scheduleArray(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}
//# sourceMappingURL=scheduleArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleAsyncIterable": () => (/* binding */ scheduleAsyncIterable)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");


function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}
//# sourceMappingURL=scheduleAsyncIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js":
/*!****************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleIterable": () => (/* binding */ scheduleIterable)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/executeSchedule */ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");




function scheduleIterable(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var iterator;
        (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
            iterator = input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__.iterator]();
            (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
    });
}
//# sourceMappingURL=scheduleIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleObservable": () => (/* binding */ scheduleObservable)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _operators_observeOn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/observeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js");
/* harmony import */ var _operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/subscribeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js");



function scheduleObservable(input, scheduler) {
    return (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(input).pipe((0,_operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__.subscribeOn)(scheduler), (0,_operators_observeOn__WEBPACK_IMPORTED_MODULE_2__.observeOn)(scheduler));
}
//# sourceMappingURL=scheduleObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schedulePromise": () => (/* binding */ schedulePromise)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _operators_observeOn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/observeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js");
/* harmony import */ var _operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/subscribeOn */ "./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js");



function schedulePromise(input, scheduler) {
    return (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(input).pipe((0,_operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__.subscribeOn)(scheduler), (0,_operators_observeOn__WEBPACK_IMPORTED_MODULE_2__.observeOn)(scheduler));
}
//# sourceMappingURL=schedulePromise.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduleReadableStreamLike": () => (/* binding */ scheduleReadableStreamLike)
/* harmony export */ });
/* harmony import */ var _scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduleAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");


function scheduleReadableStreamLike(input, scheduler) {
    return (0,_scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_0__.scheduleAsyncIterable)((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_1__.readableStreamLikeToAsyncGenerator)(input), scheduler);
}
//# sourceMappingURL=scheduleReadableStreamLike.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scheduled": () => (/* binding */ scheduled)
/* harmony export */ });
/* harmony import */ var _scheduleObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduleObservable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js");
/* harmony import */ var _schedulePromise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schedulePromise */ "./node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js");
/* harmony import */ var _scheduleArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scheduleArray */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js");
/* harmony import */ var _scheduleIterable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scheduleIterable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js");
/* harmony import */ var _scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduleAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isInteropObservable */ "./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isPromise */ "./node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArrayLike */ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/isIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isAsyncIterable */ "./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../util/throwUnobservableError */ "./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");
/* harmony import */ var _scheduleReadableStreamLike__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./scheduleReadableStreamLike */ "./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js");













function scheduled(input, scheduler) {
    if (input != null) {
        if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_0__.isInteropObservable)(input)) {
            return (0,_scheduleObservable__WEBPACK_IMPORTED_MODULE_1__.scheduleObservable)(input, scheduler);
        }
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(input)) {
            return (0,_scheduleArray__WEBPACK_IMPORTED_MODULE_3__.scheduleArray)(input, scheduler);
        }
        if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_4__.isPromise)(input)) {
            return (0,_schedulePromise__WEBPACK_IMPORTED_MODULE_5__.schedulePromise)(input, scheduler);
        }
        if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_6__.isAsyncIterable)(input)) {
            return (0,_scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_7__.scheduleAsyncIterable)(input, scheduler);
        }
        if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_8__.isIterable)(input)) {
            return (0,_scheduleIterable__WEBPACK_IMPORTED_MODULE_9__.scheduleIterable)(input, scheduler);
        }
        if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_10__.isReadableStreamLike)(input)) {
            return (0,_scheduleReadableStreamLike__WEBPACK_IMPORTED_MODULE_11__.scheduleReadableStreamLike)(input, scheduler);
        }
    }
    throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_12__.createInvalidObservableTypeError)(input);
}
//# sourceMappingURL=scheduled.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeoutProvider": () => (/* binding */ timeoutProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
            return delegate.setTimeout.apply(delegate, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
        }
        return setTimeout.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=timeoutProvider.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSymbolIterator": () => (/* binding */ getSymbolIterator),
/* harmony export */   "iterator": () => (/* binding */ iterator)
/* harmony export */ });
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();
//# sourceMappingURL=iterator.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/symbol/observable.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "observable": () => (/* binding */ observable)
/* harmony export */ });
var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnsubscriptionError": () => (/* binding */ UnsubscriptionError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var UnsubscriptionError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrRemove": () => (/* binding */ arrRemove)
/* harmony export */ });
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
//# sourceMappingURL=arrRemove.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createErrorClass": () => (/* binding */ createErrorClass)
/* harmony export */ });
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
//# sourceMappingURL=createErrorClass.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/errorContext.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "captureError": () => (/* binding */ captureError),
/* harmony export */   "errorContext": () => (/* binding */ errorContext)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./node_modules/rxjs/dist/esm5/internal/config.js");

var context = null;
function errorContext(cb) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
function captureError(err) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}
//# sourceMappingURL=errorContext.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "executeSchedule": () => (/* binding */ executeSchedule)
/* harmony export */ });
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}
//# sourceMappingURL=executeSchedule.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/identity.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/identity.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "identity": () => (/* binding */ identity)
/* harmony export */ });
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isArrayLike": () => (/* binding */ isArrayLike)
/* harmony export */ });
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isAsyncIterable": () => (/* binding */ isAsyncIterable)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
//# sourceMappingURL=isAsyncIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isFunction.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFunction": () => (/* binding */ isFunction)
/* harmony export */ });
function isFunction(value) {
    return typeof value === 'function';
}
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isInteropObservable": () => (/* binding */ isInteropObservable)
/* harmony export */ });
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isInteropObservable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input[_symbol_observable__WEBPACK_IMPORTED_MODULE_1__.observable]);
}
//# sourceMappingURL=isInteropObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isIterable.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isIterable.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isIterable": () => (/* binding */ isIterable)
/* harmony export */ });
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isIterable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input === null || input === void 0 ? void 0 : input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_1__.iterator]);
}
//# sourceMappingURL=isIterable.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isPromise.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isPromise.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPromise": () => (/* binding */ isPromise)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isPromise(value) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value === null || value === void 0 ? void 0 : value.then);
}
//# sourceMappingURL=isPromise.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isReadableStreamLike": () => (/* binding */ isReadableStreamLike),
/* harmony export */   "readableStreamLikeToAsyncGenerator": () => (/* binding */ readableStreamLikeToAsyncGenerator)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function readableStreamLikeToAsyncGenerator(readableStream) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__asyncGenerator)(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (false) {}
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
//# sourceMappingURL=isReadableStreamLike.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/lift.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/lift.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasLift": () => (/* binding */ hasLift),
/* harmony export */   "operate": () => (/* binding */ operate)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function hasLift(source) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
//# sourceMappingURL=lift.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapOneOrManyArgs": () => (/* binding */ mapOneOrManyArgs)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/map */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");


var isArray = Array.isArray;
function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return (0,_operators_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (args) { return callOrApply(fn, args); });
}
//# sourceMappingURL=mapOneOrManyArgs.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/noop.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/noop.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
function noop() { }
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/pipe.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/pipe.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "pipeFromArray": () => (/* binding */ pipeFromArray)
/* harmony export */ });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ "./node_modules/rxjs/dist/esm5/internal/util/identity.js");

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reportUnhandledError": () => (/* binding */ reportUnhandledError)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/timeoutProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");


function reportUnhandledError(err) {
    _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__.timeoutProvider.setTimeout(function () {
        var onUnhandledError = _config__WEBPACK_IMPORTED_MODULE_1__.config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
//# sourceMappingURL=reportUnhandledError.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInvalidObservableTypeError": () => (/* binding */ createInvalidObservableTypeError)
/* harmony export */ });
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
//# sourceMappingURL=throwUnobservableError.js.map

/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BALL_INTERVAL": () => (/* binding */ BALL_INTERVAL),
/* harmony export */   "MIN_BET": () => (/* binding */ MIN_BET),
/* harmony export */   "ROUND_NUMBER": () => (/* binding */ ROUND_NUMBER),
/* harmony export */   "ROUND_TIME": () => (/* binding */ ROUND_TIME),
/* harmony export */   "SERVER_ADDRESS": () => (/* binding */ SERVER_ADDRESS),
/* harmony export */   "TICKETS": () => (/* binding */ TICKETS),
/* harmony export */   "TICKET_TO_BE_POPULATED": () => (/* binding */ TICKET_TO_BE_POPULATED),
/* harmony export */   "USER": () => (/* binding */ USER)
/* harmony export */ });
var SERVER_ADDRESS = "http://localhost:3000";
var BALL_INTERVAL = 2500;
var ROUND_TIME = 35 * BALL_INTERVAL;
var ROUND_NUMBER = 0;
var MIN_BET = 20;
var TICKET_TO_BE_POPULATED = {
    numbers: [],
    bet: MIN_BET,
    num: 0
};
var TICKETS = [];
var USER = {
    id: 1,
    balance: 1000,
    name: "Marko"
};


/***/ }),

/***/ "./src/controllers/BallController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/BallController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBalls": () => (/* binding */ getBalls),
/* harmony export */   "getFiguresQuery": () => (/* binding */ getFiguresQuery)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");


var getBalls = function () {
    var promise = fetch("".concat(_config__WEBPACK_IMPORTED_MODULE_0__.SERVER_ADDRESS, "/ball"))
        .then(function (res) {
        if (!res.ok) {
            throw new Error();
        }
        else {
            return res.json();
            //console.table(res.json());
        }
    })
        .catch(function (err) {
        console.error(err);
    });
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(promise);
};
var getFiguresQuery = function (query) {
    var promise = fetch("".concat(_config__WEBPACK_IMPORTED_MODULE_0__.SERVER_ADDRESS, "/ball?q=").concat(query))
        .then(function (res) {
        if (!res.ok) {
            throw new Error();
        }
        else {
            return res.json();
            //console.table(res.json());
        }
    })
        .catch(function (err) {
        console.error(err);
    });
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(promise);
};


/***/ }),

/***/ "./src/helpers/HelperLogic.ts":
/*!************************************!*\
  !*** ./src/helpers/HelperLogic.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrayRemove": () => (/* binding */ arrayRemove),
/* harmony export */   "arrayShuffle": () => (/* binding */ arrayShuffle),
/* harmony export */   "getRandomNumber": () => (/* binding */ getRandomNumber),
/* harmony export */   "randomNumber": () => (/* binding */ randomNumber)
/* harmony export */ });
var getRandomNumber = function (length) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
};
var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
var arrayRemove = function (arr, value) {
    arr.filter(function (ele) {
        return ele != value;
    });
    return arr;
};
var arrayShuffle = function (array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        _a = [
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
};


/***/ }),

/***/ "./src/helpers/HelperViews.ts":
/*!************************************!*\
  !*** ./src/helpers/HelperViews.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createButton": () => (/* binding */ createButton),
/* harmony export */   "createCustomElement": () => (/* binding */ createCustomElement),
/* harmony export */   "createDiv": () => (/* binding */ createDiv),
/* harmony export */   "createInput": () => (/* binding */ createInput),
/* harmony export */   "createLabel": () => (/* binding */ createLabel),
/* harmony export */   "removeAllChildNodes": () => (/* binding */ removeAllChildNodes)
/* harmony export */ });
var createDiv = function (parent, className) {
    var div = document.createElement('div');
    div.classList.add(className);
    parent.appendChild(div);
    return div;
};
var createLabel = function (parent, className) {
    var lbl = document.createElement('label');
    if (typeof className !== "undefined")
        lbl.classList.add(className);
    parent.appendChild(lbl);
    return lbl;
};
var createButton = function (parent, className) {
    var btn = document.createElement('button');
    if (typeof className !== "undefined")
        btn.classList.add(className);
    parent.appendChild(btn);
    return btn;
};
var createInput = function (parent, className) {
    var inpt = document.createElement('input');
    if (typeof className !== "undefined")
        inpt.classList.add(className);
    parent.appendChild(inpt);
    return inpt;
};
var createCustomElement = function (tagName, parent, className) {
    var el = document.createElement(tagName);
    if (typeof className !== "undefined")
        el.classList.add(className);
    parent.appendChild(el);
    return el;
};
var removeAllChildNodes = function (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};


/***/ }),

/***/ "./src/services/GameService.ts":
/*!*************************************!*\
  !*** ./src/services/GameService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prepareGame": () => (/* binding */ prepareGame),
/* harmony export */   "prepareUserData": () => (/* binding */ prepareUserData),
/* harmony export */   "startGame": () => (/* binding */ startGame)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/take.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _helpers_HelperLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/HelperLogic */ "./src/helpers/HelperLogic.ts");



var prepareGame = function () {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(function (gen) {
        setInterval(function () {
            gen.next(arr.splice((0,_helpers_HelperLogic__WEBPACK_IMPORTED_MODULE_1__.arrayShuffle)(arr).indexOf((0,_helpers_HelperLogic__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(1, arr.length)), 1)[0]);
        }, _config__WEBPACK_IMPORTED_MODULE_0__.BALL_INTERVAL);
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.take)(35)).subscribe();
};
var prepareUserData = function (el) {
    return new Promise(function (res) {
        var t = {
            numbers: [],
            bet: 0,
            num: 0
        };
        var v = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.from)(el.parentElement.querySelectorAll('.num')).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(function (el) { return parseInt(el.innerHTML); })).subscribe(function (el) { return t.numbers.push(el); });
        t.bet = parseInt(el.parentElement.querySelector('.t-bet-input').value);
        t.num = parseInt((el.parentElement.getAttribute('t-id')));
        res(t);
        _config__WEBPACK_IMPORTED_MODULE_0__.USER.balance -= t.bet;
    });
};
var startGame = function () {
    var divs = document.querySelectorAll('.b-conf-active');
    divs.forEach(function (el) {
        prepareUserData(el).then(function (t) {
            _config__WEBPACK_IMPORTED_MODULE_0__.TICKETS.push(t);
            console.log(_config__WEBPACK_IMPORTED_MODULE_0__.TICKETS);
        });
    });
    prepareGame();
};


/***/ }),

/***/ "./src/services/TicketService.ts":
/*!***************************************!*\
  !*** ./src/services/TicketService.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OnTicketActive": () => (/* binding */ OnTicketActive),
/* harmony export */   "listenClickOnBall": () => (/* binding */ listenClickOnBall),
/* harmony export */   "updateTickets": () => (/* binding */ updateTickets)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _views_HomeView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/HomeView */ "./src/views/HomeView.ts");



var updateTickets = function (number) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.numbers.length >= 6) {
        _config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.numbers = [];
        _config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.num++;
        _config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.bet = _config__WEBPACK_IMPORTED_MODULE_0__.MIN_BET;
        (0,_views_HomeView__WEBPACK_IMPORTED_MODULE_1__.drawTicket)();
        OnTicketActive();
    }
    else {
        _config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.numbers.push(number);
        (0,_views_HomeView__WEBPACK_IMPORTED_MODULE_1__.updateTicketNumbers)(number);
    }
    console.log(_config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.numbers);
};
var listenClickOnBall = function () {
    console.log("asdas");
    (0,_views_HomeView__WEBPACK_IMPORTED_MODULE_1__.drawTicket)();
    (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.fromEvent)(document.querySelectorAll('.ballHandler'), 'click')
        .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(function (ev) { return parseInt(ev.target.getAttribute('id')); }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.filter)(function (el) { return el != undefined && !isNaN(el); }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(function (id) {
        if (_config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.numbers.includes(id)) {
            _config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.numbers.splice(_config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.numbers.indexOf(id), 1);
            (0,_views_HomeView__WEBPACK_IMPORTED_MODULE_1__.updateTicketNumbers)(id, true);
            return 0;
        }
        else
            return id;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.filter)(function (val) { return val != 0 && val != undefined; })).subscribe(function (x) { return updateTickets(x); });
};
var OnTicketActive = function () {
    (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.fromEvent)(document.querySelectorAll('.u-ticket'), 'click')
        .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(function (ev) {
        _config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.numbers = [];
        (0,_views_HomeView__WEBPACK_IMPORTED_MODULE_1__.resetActiveBalls)();
        return ev.target;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.filter)(function (el) { return el != undefined; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(function (el) { return el.querySelectorAll('.num'); }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.filter)(function (nums) { return nums != undefined; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(function (nums) {
        console.log(parseInt(nums.innerHTML));
        (0,_views_HomeView__WEBPACK_IMPORTED_MODULE_1__.activateBall)(parseInt(nums.innerHTML));
        _config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.numbers.push(parseInt(nums.innerHTML));
    })).subscribe();
};


/***/ }),

/***/ "./src/views/HomeView.ts":
/*!*******************************!*\
  !*** ./src/views/HomeView.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activateBall": () => (/* binding */ activateBall),
/* harmony export */   "activateTicket": () => (/* binding */ activateTicket),
/* harmony export */   "drawBallHandlerWithBall": () => (/* binding */ drawBallHandlerWithBall),
/* harmony export */   "drawBalls": () => (/* binding */ drawBalls),
/* harmony export */   "drawTicket": () => (/* binding */ drawTicket),
/* harmony export */   "initHome": () => (/* binding */ initHome),
/* harmony export */   "initUi": () => (/* binding */ initUi),
/* harmony export */   "removeEmptyTickets": () => (/* binding */ removeEmptyTickets),
/* harmony export */   "resetActiveBalls": () => (/* binding */ resetActiveBalls),
/* harmony export */   "resetActiveTickets": () => (/* binding */ resetActiveTickets),
/* harmony export */   "updateTicketNumbers": () => (/* binding */ updateTicketNumbers)
/* harmony export */ });
/* harmony import */ var _helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/HelperViews */ "./src/helpers/HelperViews.ts");
/* harmony import */ var _controllers_BallController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/BallController */ "./src/controllers/BallController.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _services_TicketService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/TicketService */ "./src/services/TicketService.ts");




var initHome = function (host) {
    var sector1 = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'sector1');
    var sector2 = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'sector2');
    initUi(sector2, _config__WEBPACK_IMPORTED_MODULE_2__.USER);
    var title = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(sector1, 'divTitle');
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(title, 'title').innerText = 'Place Bet';
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(title, 'r-title').innerText = '#' + _config__WEBPACK_IMPORTED_MODULE_2__.ROUND_NUMBER;
    var db = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(sector1, 'divBalls');
    (0,_controllers_BallController__WEBPACK_IMPORTED_MODULE_1__.getBalls)().subscribe(function (balls) {
        drawBallHandlerWithBall(db, balls).then(_services_TicketService__WEBPACK_IMPORTED_MODULE_3__.listenClickOnBall);
    });
};
var drawBallHandlerWithBall = function (host, balls) {
    return new Promise(function (resolve) {
        balls.forEach(function (el) {
            drawBalls(el, (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'ballHandler'));
        });
        resolve();
    });
};
var initUi = function (host, user) {
    var uiDiv = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'u-div');
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(uiDiv, 'u-name').innerText = 'Balance: ' + user.balance;
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(uiDiv, 'u-bal').innerText = 'Hello ' + user.name;
    var tickets = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'u-main-tickets');
};
var drawBalls = function (ball, host) {
    var b = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'ball');
    b.setAttribute('id', ball.id.toString());
    b.innerText = ball.id.toString();
    b.style.background = ball.color;
    b.addEventListener('click', function (ev) {
        activateBall(ball.id);
    }, true);
};
var activateBall = function (ballId) {
    var ball = document.querySelectorAll('div[id]')
        .item(ballId - 1).parentElement;
    if (ball.classList.contains('active'))
        ball.classList.remove('active');
    else
        ball.classList.add('active');
};
var activateTicket = function (ticketId) {
    var ticket = document.querySelectorAll('div[t-id]').item(ticketId);
    resetActiveTickets();
    if (ticket.classList.contains('t-active'))
        ticket.classList.remove('t-active');
    else
        ticket.classList.add('t-active');
};
var drawTicket = function () {
    resetActiveTickets();
    var tArea = document.querySelector('.u-main-tickets');
    var ticket = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(tArea, 'u-ticket');
    ticket.classList.add('t-active');
    ticket.setAttribute('t-id', _config__WEBPACK_IMPORTED_MODULE_2__.TICKET_TO_BE_POPULATED.num.toString());
    ticket.addEventListener('click', function () { activateTicket(parseInt(ticket.getAttribute('t-id'))); }, false);
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(ticket, 'lbl').innerText = "Ticket #" + _config__WEBPACK_IMPORTED_MODULE_2__.TICKET_TO_BE_POPULATED.num.toString();
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(ticket, 't-numbers');
    var tBet = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(ticket, 't-bet');
    var betInput = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createInput)(tBet, 't-bet-input');
    betInput.type = 'number';
    betInput.value = _config__WEBPACK_IMPORTED_MODULE_2__.MIN_BET.toString();
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(ticket, 'btnConf').innerHTML = "<svg width=\"30px\" height=\"30px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d=\"M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z\"/></svg>";
    resetActiveBalls();
};
var updateTicketNumbers = function (num, reset) {
    var divTickets = document.querySelectorAll('div[t-id]');
    console.log(divTickets);
    var ticket;
    divTickets.forEach(function (el) {
        if (el.classList.contains('t-active'))
            ticket = el;
    });
    var numbersDiv = ticket.querySelector('.t-numbers');
    if (reset) {
        var nums = numbersDiv.querySelectorAll('.num');
        nums.forEach(function (el) {
            if (el.innerHTML == num.toString()) {
                numbersDiv.removeChild(el);
            }
        });
    }
    else {
        (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(numbersDiv, 'num').innerText = num.toString();
    }
    var btnCnf = ticket.querySelector('.btnConf');
    if (numbersDiv.children.length === 6) {
        btnCnf.classList.add('b-conf-active');
    }
    else {
        if (btnCnf.classList.contains('b-conf-active')) {
            btnCnf.classList.remove('b-conf-active');
        }
    }
};
var resetActiveBalls = function () {
    var ball = document.querySelectorAll('.active');
    ball.forEach(function (el) {
        el.classList.remove('active');
    });
};
var resetActiveTickets = function () {
    var tickets = document.querySelectorAll('.t-active');
    tickets.forEach(function (el) {
        el.classList.remove('t-active');
    });
};
var removeEmptyTickets = function () {
    var mainDiv = document.querySelector('.u-main-tickets');
    var tickets = document.querySelectorAll('.u-ticket');
    tickets.forEach(function (el) {
        if (el.querySelector('.t-numbers').children.length <= 0)
            mainDiv.removeChild(el);
    });
};


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldIn": () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _views_HomeView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/HomeView */ "./src/views/HomeView.ts");
/* harmony import */ var _services_GameService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/GameService */ "./src/services/GameService.ts");


(0,_views_HomeView__WEBPACK_IMPORTED_MODULE_0__.initHome)(document.querySelector('.mainContainer'));
setTimeout(_services_GameService__WEBPACK_IMPORTED_MODULE_1__.startGame, 5000);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ1AsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7O1VDdlBBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjBDO0FBQ087QUFHakQseURBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUVuRCxVQUFVLENBQUMsNERBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvTm90aWZpY2F0aW9uRmFjdG9yaWVzLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1N1YnNjcmliZXIuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9TdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9jb25maWcuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2VtcHR5LmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tRXZlbnQuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2lubmVyRnJvbS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9PcGVyYXRvclN1YnNjcmliZXIuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvZmlsdGVyLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL21hcC5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9tZXJnZUludGVybmFscy5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9tZXJnZU1hcC5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9vYnNlcnZlT24uanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvc3Vic2NyaWJlT24uanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvc3dpdGNoTWFwLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL3Rha2UuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVBcnJheS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZUFzeW5jSXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVJdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZU9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVQcm9taXNlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlZC5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlci90aW1lb3V0UHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zeW1ib2wvb2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvYXJyUmVtb3ZlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9jcmVhdGVFcnJvckNsYXNzLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9lcnJvckNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2V4ZWN1dGVTY2hlZHVsZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzQXJyYXlMaWtlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0FzeW5jSXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzSW50ZXJvcE9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzSXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2UuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2xpZnQuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL21hcE9uZU9yTWFueUFyZ3MuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL25vb3AuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL3BpcGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC90aHJvd1Vub2JzZXJ2YWJsZUVycm9yLmpzIiwid2VicGFjazovL3J4anMvLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovL3J4anMvLi9zcmMvY29udHJvbGxlcnMvQmFsbENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vcnhqcy8uL3NyYy9oZWxwZXJzL0hlbHBlckxvZ2ljLnRzIiwid2VicGFjazovL3J4anMvLi9zcmMvaGVscGVycy9IZWxwZXJWaWV3cy50cyIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL3NlcnZpY2VzL0dhbWVTZXJ2aWNlLnRzIiwid2VicGFjazovL3J4anMvLi9zcmMvc2VydmljZXMvVGlja2V0U2VydmljZS50cyIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL3ZpZXdzL0hvbWVWaWV3LnRzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwid2VicGFjazovL3J4anMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcnhqcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcnhqcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3J4anMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgQ09NUExFVEVfTk9USUZJQ0FUSU9OID0gKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignQycsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTsgfSkoKTtcbmV4cG9ydCBmdW5jdGlvbiBlcnJvck5vdGlmaWNhdGlvbihlcnJvcikge1xuICAgIHJldHVybiBjcmVhdGVOb3RpZmljYXRpb24oJ0UnLCB1bmRlZmluZWQsIGVycm9yKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuZXh0Tm90aWZpY2F0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignTicsIHZhbHVlLCB1bmRlZmluZWQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vdGlmaWNhdGlvbihraW5kLCB2YWx1ZSwgZXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBraW5kLFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Tm90aWZpY2F0aW9uRmFjdG9yaWVzLmpzLm1hcCIsImltcG9ydCB7IFNhZmVTdWJzY3JpYmVyLCBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IGlzU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4vc3ltYm9sL29ic2VydmFibGUnO1xuaW1wb3J0IHsgcGlwZUZyb21BcnJheSB9IGZyb20gJy4vdXRpbC9waXBlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBlcnJvckNvbnRleHQgfSBmcm9tICcuL3V0aWwvZXJyb3JDb250ZXh0JztcbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZSkge1xuICAgICAgICBpZiAoc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gaXNTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0KSA/IG9ic2VydmVyT3JOZXh0IDogbmV3IFNhZmVTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBlcnJvckNvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hID0gX3RoaXMsIG9wZXJhdG9yID0gX2Eub3BlcmF0b3IsIHNvdXJjZSA9IF9hLnNvdXJjZTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKG9wZXJhdG9yXG4gICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRvci5jYWxsKHN1YnNjcmliZXIsIHNvdXJjZSlcbiAgICAgICAgICAgICAgICA6IHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3Vic2NyaWJlKHN1YnNjcmliZXIpXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl90cnlTdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHNpbmspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpYmUoc2luayk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2luay5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKG5leHQsIHByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHByb21pc2VDdG9yID0gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpO1xuICAgICAgICByZXR1cm4gbmV3IHByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpYmVyID0gbmV3IFNhZmVTdWJzY3JpYmVyKHtcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogcmVqZWN0LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiByZXNvbHZlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuc291cmNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGVbU3ltYm9sX29ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvcGVyYXRpb25zID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBvcGVyYXRpb25zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpcGVGcm9tQXJyYXkob3BlcmF0aW9ucykodGhpcyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1Byb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiAodmFsdWUgPSB4KTsgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gcmVqZWN0KGVycik7IH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmUodmFsdWUpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZSk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZTtcbn0oKSk7XG5leHBvcnQgeyBPYnNlcnZhYmxlIH07XG5mdW5jdGlvbiBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcikge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gKF9hID0gcHJvbWlzZUN0b3IgIT09IG51bGwgJiYgcHJvbWlzZUN0b3IgIT09IHZvaWQgMCA/IHByb21pc2VDdG9yIDogY29uZmlnLlByb21pc2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFByb21pc2U7XG59XG5mdW5jdGlvbiBpc09ic2VydmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIGlzRnVuY3Rpb24odmFsdWUubmV4dCkgJiYgaXNGdW5jdGlvbih2YWx1ZS5lcnJvcikgJiYgaXNGdW5jdGlvbih2YWx1ZS5jb21wbGV0ZSk7XG59XG5mdW5jdGlvbiBpc1N1YnNjcmliZXIodmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlICYmIHZhbHVlIGluc3RhbmNlb2YgU3Vic2NyaWJlcikgfHwgKGlzT2JzZXJ2ZXIodmFsdWUpICYmIGlzU3Vic2NyaXB0aW9uKHZhbHVlKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IGlzU3Vic2NyaXB0aW9uLCBTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyByZXBvcnRVbmhhbmRsZWRFcnJvciB9IGZyb20gJy4vdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvcic7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi91dGlsL25vb3AnO1xuaW1wb3J0IHsgbmV4dE5vdGlmaWNhdGlvbiwgZXJyb3JOb3RpZmljYXRpb24sIENPTVBMRVRFX05PVElGSUNBVElPTiB9IGZyb20gJy4vTm90aWZpY2F0aW9uRmFjdG9yaWVzJztcbmltcG9ydCB7IHRpbWVvdXRQcm92aWRlciB9IGZyb20gJy4vc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlcic7XG5pbXBvcnQgeyBjYXB0dXJlRXJyb3IgfSBmcm9tICcuL3V0aWwvZXJyb3JDb250ZXh0JztcbnZhciBTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJzY3JpYmVyKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgIF90aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgICAgICAgICBpZiAoaXNTdWJzY3JpcHRpb24oZGVzdGluYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24uYWRkKF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmRlc3RpbmF0aW9uID0gRU1QVFlfT0JTRVJWRVI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdWJzY3JpYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uIChuZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTYWZlU3Vic2NyaWJlcihuZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24obmV4dE5vdGlmaWNhdGlvbih2YWx1ZSksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24oZXJyb3JOb3RpZmljYXRpb24oZXJyKSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKENPTVBMRVRFX05PVElGSUNBVElPTiwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFN1YnNjcmliZXI7XG59KFN1YnNjcmlwdGlvbikpO1xuZXhwb3J0IHsgU3Vic2NyaWJlciB9O1xudmFyIF9iaW5kID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ7XG5mdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIF9iaW5kLmNhbGwoZm4sIHRoaXNBcmcpO1xufVxudmFyIENvbnN1bWVyT2JzZXJ2ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnN1bWVyT2JzZXJ2ZXIocGFydGlhbE9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMucGFydGlhbE9ic2VydmVyID0gcGFydGlhbE9ic2VydmVyO1xuICAgIH1cbiAgICBDb25zdW1lck9ic2VydmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXIgPSB0aGlzLnBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKHBhcnRpYWxPYnNlcnZlci5uZXh0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29uc3VtZXJPYnNlcnZlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXIgPSB0aGlzLnBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKHBhcnRpYWxPYnNlcnZlci5lcnJvcikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnN1bWVyT2JzZXJ2ZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFydGlhbE9ic2VydmVyID0gdGhpcy5wYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgICAgIGlmIChwYXJ0aWFsT2JzZXJ2ZXIuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDb25zdW1lck9ic2VydmVyO1xufSgpKTtcbnZhciBTYWZlU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNhZmVTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNhZmVTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob2JzZXJ2ZXJPck5leHQpIHx8ICFvYnNlcnZlck9yTmV4dCkge1xuICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0ge1xuICAgICAgICAgICAgICAgIG5leHQ6IChvYnNlcnZlck9yTmV4dCAhPT0gbnVsbCAmJiBvYnNlcnZlck9yTmV4dCAhPT0gdm9pZCAwID8gb2JzZXJ2ZXJPck5leHQgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvciAhPT0gbnVsbCAmJiBlcnJvciAhPT0gdm9pZCAwID8gZXJyb3IgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGNvbXBsZXRlICE9PSBudWxsICYmIGNvbXBsZXRlICE9PSB2b2lkIDAgPyBjb21wbGV0ZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dF8xO1xuICAgICAgICAgICAgaWYgKF90aGlzICYmIGNvbmZpZy51c2VEZXByZWNhdGVkTmV4dENvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEgPSBPYmplY3QuY3JlYXRlKG9ic2VydmVyT3JOZXh0KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy51bnN1YnNjcmliZSgpOyB9O1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogb2JzZXJ2ZXJPck5leHQubmV4dCAmJiBiaW5kKG9ic2VydmVyT3JOZXh0Lm5leHQsIGNvbnRleHRfMSksXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBvYnNlcnZlck9yTmV4dC5lcnJvciAmJiBiaW5kKG9ic2VydmVyT3JOZXh0LmVycm9yLCBjb250ZXh0XzEpLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogb2JzZXJ2ZXJPck5leHQuY29tcGxldGUgJiYgYmluZChvYnNlcnZlck9yTmV4dC5jb21wbGV0ZSwgY29udGV4dF8xKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBuZXcgQ29uc3VtZXJPYnNlcnZlcihwYXJ0aWFsT2JzZXJ2ZXIpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBTYWZlU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgU2FmZVN1YnNjcmliZXIgfTtcbmZ1bmN0aW9uIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgIGNhcHR1cmVFcnJvcihlcnJvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXBvcnRVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVmYXVsdEVycm9ySGFuZGxlcihlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG59XG5mdW5jdGlvbiBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgc3Vic2NyaWJlcikge1xuICAgIHZhciBvblN0b3BwZWROb3RpZmljYXRpb24gPSBjb25maWcub25TdG9wcGVkTm90aWZpY2F0aW9uO1xuICAgIG9uU3RvcHBlZE5vdGlmaWNhdGlvbiAmJiB0aW1lb3V0UHJvdmlkZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBvblN0b3BwZWROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBzdWJzY3JpYmVyKTsgfSk7XG59XG5leHBvcnQgdmFyIEVNUFRZX09CU0VSVkVSID0ge1xuICAgIGNsb3NlZDogdHJ1ZSxcbiAgICBuZXh0OiBub29wLFxuICAgIGVycm9yOiBkZWZhdWx0RXJyb3JIYW5kbGVyLFxuICAgIGNvbXBsZXRlOiBub29wLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmliZXIuanMubWFwIiwiaW1wb3J0IHsgX19yZWFkLCBfX3NwcmVhZEFycmF5LCBfX3ZhbHVlcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IFVuc3Vic2NyaXB0aW9uRXJyb3IgfSBmcm9tICcuL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvcic7XG5pbXBvcnQgeyBhcnJSZW1vdmUgfSBmcm9tICcuL3V0aWwvYXJyUmVtb3ZlJztcbnZhciBTdWJzY3JpcHRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbihpbml0aWFsVGVhcmRvd24pIHtcbiAgICAgICAgdGhpcy5pbml0aWFsVGVhcmRvd24gPSBpbml0aWFsVGVhcmRvd247XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ZpbmFsaXplcnMgPSBudWxsO1xuICAgIH1cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZV8xLCBfYSwgZV8yLCBfYjtcbiAgICAgICAgdmFyIGVycm9ycztcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgICAgICBpZiAoX3BhcmVudGFnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9wYXJlbnRhZ2VfMSA9IF9fdmFsdWVzKF9wYXJlbnRhZ2UpLCBfcGFyZW50YWdlXzFfMSA9IF9wYXJlbnRhZ2VfMS5uZXh0KCk7ICFfcGFyZW50YWdlXzFfMS5kb25lOyBfcGFyZW50YWdlXzFfMSA9IF9wYXJlbnRhZ2VfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50XzEgPSBfcGFyZW50YWdlXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRfMS5yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfcGFyZW50YWdlXzFfMSAmJiAhX3BhcmVudGFnZV8xXzEuZG9uZSAmJiAoX2EgPSBfcGFyZW50YWdlXzEucmV0dXJuKSkgX2EuY2FsbChfcGFyZW50YWdlXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfcGFyZW50YWdlLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaW5pdGlhbEZpbmFsaXplciA9IHRoaXMuaW5pdGlhbFRlYXJkb3duO1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oaW5pdGlhbEZpbmFsaXplcikpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsRmluYWxpemVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGUgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yID8gZS5lcnJvcnMgOiBbZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9maW5hbGl6ZXJzID0gdGhpcy5fZmluYWxpemVycztcbiAgICAgICAgICAgIGlmIChfZmluYWxpemVycykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmFsaXplcnMgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9maW5hbGl6ZXJzXzEgPSBfX3ZhbHVlcyhfZmluYWxpemVycyksIF9maW5hbGl6ZXJzXzFfMSA9IF9maW5hbGl6ZXJzXzEubmV4dCgpOyAhX2ZpbmFsaXplcnNfMV8xLmRvbmU7IF9maW5hbGl6ZXJzXzFfMSA9IF9maW5hbGl6ZXJzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxpemVyID0gX2ZpbmFsaXplcnNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjRmluYWxpemVyKGZpbmFsaXplcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzICE9PSBudWxsICYmIGVycm9ycyAhPT0gdm9pZCAwID8gZXJyb3JzIDogW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoZXJyb3JzKSksIF9fcmVhZChlcnIuZXJyb3JzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9maW5hbGl6ZXJzXzFfMSAmJiAhX2ZpbmFsaXplcnNfMV8xLmRvbmUgJiYgKF9iID0gX2ZpbmFsaXplcnNfMS5yZXR1cm4pKSBfYi5jYWxsKF9maW5hbGl6ZXJzXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVuc3Vic2NyaXB0aW9uRXJyb3IoZXJyb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGVhcmRvd24gJiYgdGVhcmRvd24gIT09IHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIGV4ZWNGaW5hbGl6ZXIodGVhcmRvd24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRlYXJkb3duIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZWFyZG93bi5jbG9zZWQgfHwgdGVhcmRvd24uX2hhc1BhcmVudCh0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRlYXJkb3duLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICh0aGlzLl9maW5hbGl6ZXJzID0gKF9hID0gdGhpcy5fZmluYWxpemVycykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10pLnB1c2godGVhcmRvd24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9oYXNQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICByZXR1cm4gX3BhcmVudGFnZSA9PT0gcGFyZW50IHx8IChBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpICYmIF9wYXJlbnRhZ2UuaW5jbHVkZXMocGFyZW50KSk7XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9hZGRQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpID8gKF9wYXJlbnRhZ2UucHVzaChwYXJlbnQpLCBfcGFyZW50YWdlKSA6IF9wYXJlbnRhZ2UgPyBbX3BhcmVudGFnZSwgcGFyZW50XSA6IHBhcmVudDtcbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX3JlbW92ZVBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIGlmIChfcGFyZW50YWdlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSkge1xuICAgICAgICAgICAgYXJyUmVtb3ZlKF9wYXJlbnRhZ2UsIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHRlYXJkb3duKSB7XG4gICAgICAgIHZhciBfZmluYWxpemVycyA9IHRoaXMuX2ZpbmFsaXplcnM7XG4gICAgICAgIF9maW5hbGl6ZXJzICYmIGFyclJlbW92ZShfZmluYWxpemVycywgdGVhcmRvd24pO1xuICAgICAgICBpZiAodGVhcmRvd24gaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRlYXJkb3duLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5FTVBUWSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbXB0eSA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgZW1wdHkuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGVtcHR5O1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKSk7XG5leHBvcnQgeyBTdWJzY3JpcHRpb24gfTtcbmV4cG9ydCB2YXIgRU1QVFlfU1VCU0NSSVBUSU9OID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3Vic2NyaXB0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbiB8fFxuICAgICAgICAodmFsdWUgJiYgJ2Nsb3NlZCcgaW4gdmFsdWUgJiYgaXNGdW5jdGlvbih2YWx1ZS5yZW1vdmUpICYmIGlzRnVuY3Rpb24odmFsdWUuYWRkKSAmJiBpc0Z1bmN0aW9uKHZhbHVlLnVuc3Vic2NyaWJlKSkpO1xufVxuZnVuY3Rpb24gZXhlY0ZpbmFsaXplcihmaW5hbGl6ZXIpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihmaW5hbGl6ZXIpKSB7XG4gICAgICAgIGZpbmFsaXplcigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZmluYWxpemVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaXB0aW9uLmpzLm1hcCIsImV4cG9ydCB2YXIgY29uZmlnID0ge1xuICAgIG9uVW5oYW5kbGVkRXJyb3I6IG51bGwsXG4gICAgb25TdG9wcGVkTm90aWZpY2F0aW9uOiBudWxsLFxuICAgIFByb21pc2U6IHVuZGVmaW5lZCxcbiAgICB1c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nOiBmYWxzZSxcbiAgICB1c2VEZXByZWNhdGVkTmV4dENvbnRleHQ6IGZhbHNlLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5leHBvcnQgdmFyIEVNUFRZID0gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHsgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTsgfSk7XG5leHBvcnQgZnVuY3Rpb24gZW1wdHkoc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIHNjaGVkdWxlciA/IGVtcHR5U2NoZWR1bGVkKHNjaGVkdWxlcikgOiBFTVBUWTtcbn1cbmZ1bmN0aW9uIGVtcHR5U2NoZWR1bGVkKHNjaGVkdWxlcikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikgeyByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTsgfSk7IH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW1wdHkuanMubWFwIiwiaW1wb3J0IHsgc2NoZWR1bGVkIH0gZnJvbSAnLi4vc2NoZWR1bGVkL3NjaGVkdWxlZCc7XG5pbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuL2lubmVyRnJvbSc7XG5leHBvcnQgZnVuY3Rpb24gZnJvbShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIHNjaGVkdWxlciA/IHNjaGVkdWxlZChpbnB1dCwgc2NoZWR1bGVyKSA6IGlubmVyRnJvbShpbnB1dCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tLmpzLm1hcCIsImltcG9ydCB7IF9fcmVhZCB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaW5uZXJGcm9tIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9pbm5lckZyb20nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICcuLi9vcGVyYXRvcnMvbWVyZ2VNYXAnO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuLi91dGlsL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgbWFwT25lT3JNYW55QXJncyB9IGZyb20gJy4uL3V0aWwvbWFwT25lT3JNYW55QXJncyc7XG52YXIgbm9kZUV2ZW50RW1pdHRlck1ldGhvZHMgPSBbJ2FkZExpc3RlbmVyJywgJ3JlbW92ZUxpc3RlbmVyJ107XG52YXIgZXZlbnRUYXJnZXRNZXRob2RzID0gWydhZGRFdmVudExpc3RlbmVyJywgJ3JlbW92ZUV2ZW50TGlzdGVuZXInXTtcbnZhciBqcXVlcnlNZXRob2RzID0gWydvbicsICdvZmYnXTtcbmV4cG9ydCBmdW5jdGlvbiBmcm9tRXZlbnQodGFyZ2V0LCBldmVudE5hbWUsIG9wdGlvbnMsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgcmVzdWx0U2VsZWN0b3IgPSBvcHRpb25zO1xuICAgICAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FdmVudCh0YXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucykucGlwZShtYXBPbmVPck1hbnlBcmdzKHJlc3VsdFNlbGVjdG9yKSk7XG4gICAgfVxuICAgIHZhciBfYSA9IF9fcmVhZChpc0V2ZW50VGFyZ2V0KHRhcmdldClcbiAgICAgICAgPyBldmVudFRhcmdldE1ldGhvZHMubWFwKGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7IHJldHVybiBmdW5jdGlvbiAoaGFuZGxlcikgeyByZXR1cm4gdGFyZ2V0W21ldGhvZE5hbWVdKGV2ZW50TmFtZSwgaGFuZGxlciwgb3B0aW9ucyk7IH07IH0pXG4gICAgICAgIDpcbiAgICAgICAgICAgIGlzTm9kZVN0eWxlRXZlbnRFbWl0dGVyKHRhcmdldClcbiAgICAgICAgICAgICAgICA/IG5vZGVFdmVudEVtaXR0ZXJNZXRob2RzLm1hcCh0b0NvbW1vbkhhbmRsZXJSZWdpc3RyeSh0YXJnZXQsIGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgOiBpc0pRdWVyeVN0eWxlRXZlbnRFbWl0dGVyKHRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgPyBqcXVlcnlNZXRob2RzLm1hcCh0b0NvbW1vbkhhbmRsZXJSZWdpc3RyeSh0YXJnZXQsIGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIDogW10sIDIpLCBhZGQgPSBfYVswXSwgcmVtb3ZlID0gX2FbMV07XG4gICAgaWYgKCFhZGQpIHtcbiAgICAgICAgaWYgKGlzQXJyYXlMaWtlKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZU1hcChmdW5jdGlvbiAoc3ViVGFyZ2V0KSB7IHJldHVybiBmcm9tRXZlbnQoc3ViVGFyZ2V0LCBldmVudE5hbWUsIG9wdGlvbnMpOyB9KShpbm5lckZyb20odGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFhZGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBldmVudCB0YXJnZXQnKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZXIubmV4dCgxIDwgYXJncy5sZW5ndGggPyBhcmdzIDogYXJnc1swXSk7XG4gICAgICAgIH07XG4gICAgICAgIGFkZChoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbW92ZShoYW5kbGVyKTsgfTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHRvQ29tbW9uSGFuZGxlclJlZ2lzdHJ5KHRhcmdldCwgZXZlbnROYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7IHJldHVybiBmdW5jdGlvbiAoaGFuZGxlcikgeyByZXR1cm4gdGFyZ2V0W21ldGhvZE5hbWVdKGV2ZW50TmFtZSwgaGFuZGxlcik7IH07IH07XG59XG5mdW5jdGlvbiBpc05vZGVTdHlsZUV2ZW50RW1pdHRlcih0YXJnZXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbih0YXJnZXQuYWRkTGlzdGVuZXIpICYmIGlzRnVuY3Rpb24odGFyZ2V0LnJlbW92ZUxpc3RlbmVyKTtcbn1cbmZ1bmN0aW9uIGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24odGFyZ2V0Lm9uKSAmJiBpc0Z1bmN0aW9uKHRhcmdldC5vZmYpO1xufVxuZnVuY3Rpb24gaXNFdmVudFRhcmdldCh0YXJnZXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbih0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcikgJiYgaXNGdW5jdGlvbih0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tRXZlbnQuanMubWFwIiwiaW1wb3J0IHsgX19hc3luY1ZhbHVlcywgX19hd2FpdGVyLCBfX2dlbmVyYXRvciwgX192YWx1ZXMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGlzQXJyYXlMaWtlIH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5TGlrZSc7XG5pbXBvcnQgeyBpc1Byb21pc2UgfSBmcm9tICcuLi91dGlsL2lzUHJvbWlzZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc0ludGVyb3BPYnNlcnZhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzQXN5bmNJdGVyYWJsZSB9IGZyb20gJy4uL3V0aWwvaXNBc3luY0l0ZXJhYmxlJztcbmltcG9ydCB7IGNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yIH0gZnJvbSAnLi4vdXRpbC90aHJvd1Vub2JzZXJ2YWJsZUVycm9yJztcbmltcG9ydCB7IGlzSXRlcmFibGUgfSBmcm9tICcuLi91dGlsL2lzSXRlcmFibGUnO1xuaW1wb3J0IHsgaXNSZWFkYWJsZVN0cmVhbUxpa2UsIHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IgfSBmcm9tICcuLi91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgcmVwb3J0VW5oYW5kbGVkRXJyb3IgfSBmcm9tICcuLi91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yJztcbmltcG9ydCB7IG9ic2VydmFibGUgYXMgU3ltYm9sX29ic2VydmFibGUgfSBmcm9tICcuLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5leHBvcnQgZnVuY3Rpb24gaW5uZXJGcm9tKGlucHV0KSB7XG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChpc0ludGVyb3BPYnNlcnZhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21JbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXlMaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1Byb21pc2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbVByb21pc2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FzeW5jSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUFzeW5jSXRlcmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0l0ZXJhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21JdGVyYWJsZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21SZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IGNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yKGlucHV0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tSW50ZXJvcE9ic2VydmFibGUob2JqKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBvYnMgPSBvYmpbU3ltYm9sX29ic2VydmFibGVdKCk7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9icy5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JzLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm92aWRlZCBvYmplY3QgZG9lcyBub3QgY29ycmVjdGx5IGltcGxlbWVudCBTeW1ib2wub2JzZXJ2YWJsZScpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21BcnJheUxpa2UoYXJyYXkpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpKyspIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChhcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Qcm9taXNlKHByb21pc2UpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSlcbiAgICAgICAgICAgIC50aGVuKG51bGwsIHJlcG9ydFVuaGFuZGxlZEVycm9yKTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tSXRlcmFibGUoaXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpdGVyYWJsZV8xID0gX192YWx1ZXMoaXRlcmFibGUpLCBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKTsgIWl0ZXJhYmxlXzFfMS5kb25lOyBpdGVyYWJsZV8xXzEgPSBpdGVyYWJsZV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGl0ZXJhYmxlXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlcmFibGVfMV8xICYmICFpdGVyYWJsZV8xXzEuZG9uZSAmJiAoX2EgPSBpdGVyYWJsZV8xLnJldHVybikpIF9hLmNhbGwoaXRlcmFibGVfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Bc3luY0l0ZXJhYmxlKGFzeW5jSXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcHJvY2Vzcyhhc3luY0l0ZXJhYmxlLCBzdWJzY3JpYmVyKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBzdWJzY3JpYmVyLmVycm9yKGVycik7IH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21SZWFkYWJsZVN0cmVhbUxpa2UocmVhZGFibGVTdHJlYW0pIHtcbiAgICByZXR1cm4gZnJvbUFzeW5jSXRlcmFibGUocmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcihyZWFkYWJsZVN0cmVhbSkpO1xufVxuZnVuY3Rpb24gcHJvY2Vzcyhhc3luY0l0ZXJhYmxlLCBzdWJzY3JpYmVyKSB7XG4gICAgdmFyIGFzeW5jSXRlcmFibGVfMSwgYXN5bmNJdGVyYWJsZV8xXzE7XG4gICAgdmFyIGVfMiwgX2E7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWUsIGVfMl8xO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzAsIDUsIDYsIDExXSk7XG4gICAgICAgICAgICAgICAgICAgIGFzeW5jSXRlcmFibGVfMSA9IF9fYXN5bmNWYWx1ZXMoYXN5bmNJdGVyYWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbNCwgYXN5bmNJdGVyYWJsZV8xLm5leHQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShhc3luY0l0ZXJhYmxlXzFfMSA9IF9iLnNlbnQoKSwgIWFzeW5jSXRlcmFibGVfMV8xLmRvbmUpKSByZXR1cm4gWzMsIDRdO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGFzeW5jSXRlcmFibGVfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFszLCAxXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMywgMTFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgZV8yXzEgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMTFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFs2LCAsIDksIDEwXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGFzeW5jSXRlcmFibGVfMV8xICYmICFhc3luY0l0ZXJhYmxlXzFfMS5kb25lICYmIChfYSA9IGFzeW5jSXRlcmFibGVfMS5yZXR1cm4pKSkgcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBfYS5jYWxsKGFzeW5jSXRlcmFibGVfMSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDg7XG4gICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzMsIDEwXTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDEwOiByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbm5lckZyb20uanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBvbk5leHQsIG9uQ29tcGxldGUsIG9uRXJyb3IsIG9uRmluYWxpemUpIHtcbiAgICByZXR1cm4gbmV3IE9wZXJhdG9yU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgb25OZXh0LCBvbkNvbXBsZXRlLCBvbkVycm9yLCBvbkZpbmFsaXplKTtcbn1cbnZhciBPcGVyYXRvclN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPcGVyYXRvclN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT3BlcmF0b3JTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBvbk5leHQsIG9uQ29tcGxldGUsIG9uRXJyb3IsIG9uRmluYWxpemUsIHNob3VsZFVuc3Vic2NyaWJlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5vbkZpbmFsaXplID0gb25GaW5hbGl6ZTtcbiAgICAgICAgX3RoaXMuc2hvdWxkVW5zdWJzY3JpYmUgPSBzaG91bGRVbnN1YnNjcmliZTtcbiAgICAgICAgX3RoaXMuX25leHQgPSBvbk5leHRcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25OZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fbmV4dDtcbiAgICAgICAgX3RoaXMuX2Vycm9yID0gb25FcnJvclxuICAgICAgICAgICAgPyBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBfc3VwZXIucHJvdG90eXBlLl9lcnJvcjtcbiAgICAgICAgX3RoaXMuX2NvbXBsZXRlID0gb25Db21wbGV0ZVxuICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBfc3VwZXIucHJvdG90eXBlLl9jb21wbGV0ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPcGVyYXRvclN1YnNjcmliZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghdGhpcy5zaG91bGRVbnN1YnNjcmliZSB8fCB0aGlzLnNob3VsZFVuc3Vic2NyaWJlKCkpIHtcbiAgICAgICAgICAgIHZhciBjbG9zZWRfMSA9IHRoaXMuY2xvc2VkO1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgIWNsb3NlZF8xICYmICgoX2EgPSB0aGlzLm9uRmluYWxpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9wZXJhdG9yU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgT3BlcmF0b3JTdWJzY3JpYmVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PcGVyYXRvclN1YnNjcmliZXIuanMubWFwIiwiaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5pbXBvcnQgeyBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIgfSBmcm9tICcuL09wZXJhdG9yU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHJldHVybiBvcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgrKykgJiYgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTsgfSkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcCIsImltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi9PcGVyYXRvclN1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIG1hcChwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChwcm9qZWN0LmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4KyspKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmpzLm1hcCIsImltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4uL29ic2VydmFibGUvaW5uZXJGcm9tJztcbmltcG9ydCB7IGV4ZWN1dGVTY2hlZHVsZSB9IGZyb20gJy4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlJztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIHByb2plY3QsIGNvbmN1cnJlbnQsIG9uQmVmb3JlTmV4dCwgZXhwYW5kLCBpbm5lclN1YlNjaGVkdWxlciwgYWRkaXRpb25hbEZpbmFsaXplcikge1xuICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICB2YXIgYWN0aXZlID0gMDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBpc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgdmFyIGNoZWNrQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc0NvbXBsZXRlICYmICFidWZmZXIubGVuZ3RoICYmICFhY3RpdmUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIG91dGVyTmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gKGFjdGl2ZSA8IGNvbmN1cnJlbnQgPyBkb0lubmVyU3ViKHZhbHVlKSA6IGJ1ZmZlci5wdXNoKHZhbHVlKSk7IH07XG4gICAgdmFyIGRvSW5uZXJTdWIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgZXhwYW5kICYmIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgIGFjdGl2ZSsrO1xuICAgICAgICB2YXIgaW5uZXJDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICBpbm5lckZyb20ocHJvamVjdCh2YWx1ZSwgaW5kZXgrKykpLnN1YnNjcmliZShjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKGlubmVyVmFsdWUpIHtcbiAgICAgICAgICAgIG9uQmVmb3JlTmV4dCA9PT0gbnVsbCB8fCBvbkJlZm9yZU5leHQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9uQmVmb3JlTmV4dChpbm5lclZhbHVlKTtcbiAgICAgICAgICAgIGlmIChleHBhbmQpIHtcbiAgICAgICAgICAgICAgICBvdXRlck5leHQoaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlubmVyQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICB9LCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpbm5lckNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlLS07XG4gICAgICAgICAgICAgICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlcmVkVmFsdWUgPSBidWZmZXIuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lclN1YlNjaGVkdWxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBpbm5lclN1YlNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9Jbm5lclN1YihidWZmZXJlZFZhbHVlKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb0lubmVyU3ViKGJ1ZmZlcmVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCAmJiBhY3RpdmUgPCBjb25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8xKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIG91dGVyTmV4dCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBhZGRpdGlvbmFsRmluYWxpemVyID09PSBudWxsIHx8IGFkZGl0aW9uYWxGaW5hbGl6ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFkZGl0aW9uYWxGaW5hbGl6ZXIoKTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VJbnRlcm5hbHMuanMubWFwIiwiaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi9tYXAnO1xuaW1wb3J0IHsgaW5uZXJGcm9tIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9pbm5lckZyb20nO1xuaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5pbXBvcnQgeyBtZXJnZUludGVybmFscyB9IGZyb20gJy4vbWVyZ2VJbnRlcm5hbHMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VNYXAocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IsIGNvbmN1cnJlbnQpIHtcbiAgICBpZiAoY29uY3VycmVudCA9PT0gdm9pZCAwKSB7IGNvbmN1cnJlbnQgPSBJbmZpbml0eTsgfVxuICAgIGlmIChpc0Z1bmN0aW9uKHJlc3VsdFNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gbWVyZ2VNYXAoZnVuY3Rpb24gKGEsIGkpIHsgcmV0dXJuIG1hcChmdW5jdGlvbiAoYiwgaWkpIHsgcmV0dXJuIHJlc3VsdFNlbGVjdG9yKGEsIGIsIGksIGlpKTsgfSkoaW5uZXJGcm9tKHByb2plY3QoYSwgaSkpKTsgfSwgY29uY3VycmVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiByZXN1bHRTZWxlY3RvciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uY3VycmVudCA9IHJlc3VsdFNlbGVjdG9yO1xuICAgIH1cbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7IHJldHVybiBtZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIHByb2plY3QsIGNvbmN1cnJlbnQpOyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlTWFwLmpzLm1hcCIsImltcG9ydCB7IGV4ZWN1dGVTY2hlZHVsZSB9IGZyb20gJy4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlJztcbmltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi9PcGVyYXRvclN1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVPbihzY2hlZHVsZXIsIGRlbGF5KSB7XG4gICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7IH0sIGRlbGF5KTsgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9LCBkZWxheSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSwgZGVsYXkpOyB9KSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZlT24uanMubWFwIiwiaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlT24oc2NoZWR1bGVyLCBkZWxheSkge1xuICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgIHJldHVybiBvcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgc3Vic2NyaWJlci5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7IH0sIGRlbGF5KSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVPbi5qcy5tYXAiLCJpbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hNYXAocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbm5lclN1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgY2hlY2tDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlzQ29tcGxldGUgJiYgIWlubmVyU3Vic2NyaWJlciAmJiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH07XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaW5uZXJTdWJzY3JpYmVyID09PSBudWxsIHx8IGlubmVyU3Vic2NyaWJlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5uZXJTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB2YXIgaW5uZXJJbmRleCA9IDA7XG4gICAgICAgICAgICB2YXIgb3V0ZXJJbmRleCA9IGluZGV4Kys7XG4gICAgICAgICAgICBpbm5lckZyb20ocHJvamVjdCh2YWx1ZSwgb3V0ZXJJbmRleCkpLnN1YnNjcmliZSgoaW5uZXJTdWJzY3JpYmVyID0gY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uIChpbm5lclZhbHVlKSB7IHJldHVybiBzdWJzY3JpYmVyLm5leHQocmVzdWx0U2VsZWN0b3IgPyByZXN1bHRTZWxlY3Rvcih2YWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCsrKSA6IGlubmVyVmFsdWUpOyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaW5uZXJTdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoTWFwLmpzLm1hcCIsImltcG9ydCB7IEVNUFRZIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9lbXB0eSc7XG5pbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiB0YWtlKGNvdW50KSB7XG4gICAgcmV0dXJuIGNvdW50IDw9IDBcbiAgICAgICAgP1xuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gRU1QVFk7IH1cbiAgICAgICAgOiBvcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBzZWVuID0gMDtcbiAgICAgICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICgrK3NlZW4gPD0gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50IDw9IHNlZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YWtlLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZUFycmF5KGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpID09PSBpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaW5wdXRbaSsrXSk7XG4gICAgICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlQXJyYXkuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZXhlY3V0ZVNjaGVkdWxlIH0gZnJvbSAnLi4vdXRpbC9leGVjdXRlU2NoZWR1bGUnO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlQXN5bmNJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZXJhYmxlIGNhbm5vdCBiZSBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpbnB1dFtTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKTtcbiAgICAgICAgICAgIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDAsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlQXN5bmNJdGVyYWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpdGVyYXRvciBhcyBTeW1ib2xfaXRlcmF0b3IgfSBmcm9tICcuLi9zeW1ib2wvaXRlcmF0b3InO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBleGVjdXRlU2NoZWR1bGUgfSBmcm9tICcuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZSc7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpdGVyYXRvcjtcbiAgICAgICAgZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXRlcmF0b3IgPSBpbnB1dFtTeW1ib2xfaXRlcmF0b3JdKCk7XG4gICAgICAgICAgICBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZG9uZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBpdGVyYXRvci5uZXh0KCksIHZhbHVlID0gX2EudmFsdWUsIGRvbmUgPSBfYS5kb25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBpc0Z1bmN0aW9uKGl0ZXJhdG9yID09PSBudWxsIHx8IGl0ZXJhdG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpdGVyYXRvci5yZXR1cm4pICYmIGl0ZXJhdG9yLnJldHVybigpOyB9O1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVJdGVyYWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBvYnNlcnZlT24gfSBmcm9tICcuLi9vcGVyYXRvcnMvb2JzZXJ2ZU9uJztcbmltcG9ydCB7IHN1YnNjcmliZU9uIH0gZnJvbSAnLi4vb3BlcmF0b3JzL3N1YnNjcmliZU9uJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZU9ic2VydmFibGUoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBpbm5lckZyb20oaW5wdXQpLnBpcGUoc3Vic2NyaWJlT24oc2NoZWR1bGVyKSwgb2JzZXJ2ZU9uKHNjaGVkdWxlcikpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVPYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4uL29ic2VydmFibGUvaW5uZXJGcm9tJztcbmltcG9ydCB7IG9ic2VydmVPbiB9IGZyb20gJy4uL29wZXJhdG9ycy9vYnNlcnZlT24nO1xuaW1wb3J0IHsgc3Vic2NyaWJlT24gfSBmcm9tICcuLi9vcGVyYXRvcnMvc3Vic2NyaWJlT24nO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlUHJvbWlzZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIGlubmVyRnJvbShpbnB1dCkucGlwZShzdWJzY3JpYmVPbihzY2hlZHVsZXIpLCBvYnNlcnZlT24oc2NoZWR1bGVyKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZVByb21pc2UuanMubWFwIiwiaW1wb3J0IHsgc2NoZWR1bGVBc3luY0l0ZXJhYmxlIH0gZnJvbSAnLi9zY2hlZHVsZUFzeW5jSXRlcmFibGUnO1xuaW1wb3J0IHsgcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvciB9IGZyb20gJy4uL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2UnO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVBc3luY0l0ZXJhYmxlKHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IoaW5wdXQpLCBzY2hlZHVsZXIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UuanMubWFwIiwiaW1wb3J0IHsgc2NoZWR1bGVPYnNlcnZhYmxlIH0gZnJvbSAnLi9zY2hlZHVsZU9ic2VydmFibGUnO1xuaW1wb3J0IHsgc2NoZWR1bGVQcm9taXNlIH0gZnJvbSAnLi9zY2hlZHVsZVByb21pc2UnO1xuaW1wb3J0IHsgc2NoZWR1bGVBcnJheSB9IGZyb20gJy4vc2NoZWR1bGVBcnJheSc7XG5pbXBvcnQgeyBzY2hlZHVsZUl0ZXJhYmxlIH0gZnJvbSAnLi9zY2hlZHVsZUl0ZXJhYmxlJztcbmltcG9ydCB7IHNjaGVkdWxlQXN5bmNJdGVyYWJsZSB9IGZyb20gJy4vc2NoZWR1bGVBc3luY0l0ZXJhYmxlJztcbmltcG9ydCB7IGlzSW50ZXJvcE9ic2VydmFibGUgfSBmcm9tICcuLi91dGlsL2lzSW50ZXJvcE9ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi4vdXRpbC9pc1Byb21pc2UnO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuLi91dGlsL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzSXRlcmFibGUgfSBmcm9tICcuLi91dGlsL2lzSXRlcmFibGUnO1xuaW1wb3J0IHsgaXNBc3luY0l0ZXJhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0FzeW5jSXRlcmFibGUnO1xuaW1wb3J0IHsgY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IgfSBmcm9tICcuLi91dGlsL3Rocm93VW5vYnNlcnZhYmxlRXJyb3InO1xuaW1wb3J0IHsgaXNSZWFkYWJsZVN0cmVhbUxpa2UgfSBmcm9tICcuLi91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlJztcbmltcG9ydCB7IHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlIH0gZnJvbSAnLi9zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZSc7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVkKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZU9ic2VydmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXlMaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlQXJyYXkoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJvbWlzZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVByb21pc2UoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXN5bmNJdGVyYWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUFzeW5jSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IoaW5wdXQpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVkLmpzLm1hcCIsImltcG9ydCB7IF9fcmVhZCwgX19zcHJlYWRBcnJheSB9IGZyb20gXCJ0c2xpYlwiO1xuZXhwb3J0IHZhciB0aW1lb3V0UHJvdmlkZXIgPSB7XG4gICAgc2V0VGltZW91dDogZnVuY3Rpb24gKGhhbmRsZXIsIHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbGVnYXRlID0gdGltZW91dFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLnNldFRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZS5zZXRUaW1lb3V0LmFwcGx5KGRlbGVnYXRlLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgfSxcbiAgICBjbGVhclRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gdGltZW91dFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuY2xlYXJUaW1lb3V0KSB8fCBjbGVhclRpbWVvdXQpKGhhbmRsZSk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVvdXRQcm92aWRlci5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gZ2V0U3ltYm9sSXRlcmF0b3IoKSB7XG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgIVN5bWJvbC5pdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gJ0BAaXRlcmF0b3InO1xuICAgIH1cbiAgICByZXR1cm4gU3ltYm9sLml0ZXJhdG9yO1xufVxuZXhwb3J0IHZhciBpdGVyYXRvciA9IGdldFN5bWJvbEl0ZXJhdG9yKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pdGVyYXRvci5qcy5tYXAiLCJleHBvcnQgdmFyIG9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkgeyByZXR1cm4gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLm9ic2VydmFibGUpIHx8ICdAQG9ic2VydmFibGUnOyB9KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBjcmVhdGVFcnJvckNsYXNzIH0gZnJvbSAnLi9jcmVhdGVFcnJvckNsYXNzJztcbmV4cG9ydCB2YXIgVW5zdWJzY3JpcHRpb25FcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbChlcnJvcnMpIHtcbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvcnNcbiAgICAgICAgICAgID8gZXJyb3JzLmxlbmd0aCArIFwiIGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XFxuXCIgKyBlcnJvcnMubWFwKGZ1bmN0aW9uIChlcnIsIGkpIHsgcmV0dXJuIGkgKyAxICsgXCIpIFwiICsgZXJyLnRvU3RyaW5nKCk7IH0pLmpvaW4oJ1xcbiAgJylcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIHRoaXMubmFtZSA9ICdVbnN1YnNjcmlwdGlvbkVycm9yJztcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5zdWJzY3JpcHRpb25FcnJvci5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gYXJyUmVtb3ZlKGFyciwgaXRlbSkge1xuICAgIGlmIChhcnIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIDAgPD0gaW5kZXggJiYgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyUmVtb3ZlLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFcnJvckNsYXNzKGNyZWF0ZUltcGwpIHtcbiAgICB2YXIgX3N1cGVyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgIEVycm9yLmNhbGwoaW5zdGFuY2UpO1xuICAgICAgICBpbnN0YW5jZS5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICAgIH07XG4gICAgdmFyIGN0b3JGdW5jID0gY3JlYXRlSW1wbChfc3VwZXIpO1xuICAgIGN0b3JGdW5jLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbiAgICBjdG9yRnVuYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yRnVuYztcbiAgICByZXR1cm4gY3RvckZ1bmM7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmVhdGVFcnJvckNsYXNzLmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG52YXIgY29udGV4dCA9IG51bGw7XG5leHBvcnQgZnVuY3Rpb24gZXJyb3JDb250ZXh0KGNiKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgIHZhciBpc1Jvb3QgPSAhY29udGV4dDtcbiAgICAgICAgaWYgKGlzUm9vdCkge1xuICAgICAgICAgICAgY29udGV4dCA9IHsgZXJyb3JUaHJvd246IGZhbHNlLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNiKCk7XG4gICAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGNvbnRleHQsIGVycm9yVGhyb3duID0gX2EuZXJyb3JUaHJvd24sIGVycm9yID0gX2EuZXJyb3I7XG4gICAgICAgICAgICBjb250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChlcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjYigpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjYXB0dXJlRXJyb3IoZXJyKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nICYmIGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5lcnJvclRocm93biA9IHRydWU7XG4gICAgICAgIGNvbnRleHQuZXJyb3IgPSBlcnI7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JDb250ZXh0LmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBleGVjdXRlU2NoZWR1bGUocGFyZW50U3Vic2NyaXB0aW9uLCBzY2hlZHVsZXIsIHdvcmssIGRlbGF5LCByZXBlYXQpIHtcbiAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICBpZiAocmVwZWF0ID09PSB2b2lkIDApIHsgcmVwZWF0ID0gZmFsc2U7IH1cbiAgICB2YXIgc2NoZWR1bGVTdWJzY3JpcHRpb24gPSBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICB3b3JrKCk7XG4gICAgICAgIGlmIChyZXBlYXQpIHtcbiAgICAgICAgICAgIHBhcmVudFN1YnNjcmlwdGlvbi5hZGQodGhpcy5zY2hlZHVsZShudWxsLCBkZWxheSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfSwgZGVsYXkpO1xuICAgIHBhcmVudFN1YnNjcmlwdGlvbi5hZGQoc2NoZWR1bGVTdWJzY3JpcHRpb24pO1xuICAgIGlmICghcmVwZWF0KSB7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZVN1YnNjcmlwdGlvbjtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGVjdXRlU2NoZWR1bGUuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KHgpIHtcbiAgICByZXR1cm4geDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlkZW50aXR5LmpzLm1hcCIsImV4cG9ydCB2YXIgaXNBcnJheUxpa2UgPSAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgeCAhPT0gJ2Z1bmN0aW9uJzsgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FycmF5TGlrZS5qcy5tYXAiLCJpbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBpc0FzeW5jSXRlcmFibGUob2JqKSB7XG4gICAgcmV0dXJuIFN5bWJvbC5hc3luY0l0ZXJhdG9yICYmIGlzRnVuY3Rpb24ob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2JqW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FzeW5jSXRlcmFibGUuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNGdW5jdGlvbi5qcy5tYXAiLCJpbXBvcnQgeyBvYnNlcnZhYmxlIGFzIFN5bWJvbF9vYnNlcnZhYmxlIH0gZnJvbSAnLi4vc3ltYm9sL29ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKGlucHV0W1N5bWJvbF9vYnNlcnZhYmxlXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0ludGVyb3BPYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IGl0ZXJhdG9yIGFzIFN5bWJvbF9pdGVyYXRvciB9IGZyb20gJy4uL3N5bWJvbC9pdGVyYXRvcic7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBpc0l0ZXJhYmxlKGlucHV0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oaW5wdXQgPT09IG51bGwgfHwgaW5wdXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGlucHV0W1N5bWJvbF9pdGVyYXRvcl0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNJdGVyYWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSBcIi4vaXNGdW5jdGlvblwiO1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZSkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2YWx1ZS50aGVuKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzUHJvbWlzZS5qcy5tYXAiLCJpbXBvcnQgeyBfX2FzeW5jR2VuZXJhdG9yLCBfX2F3YWl0LCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcihyZWFkYWJsZVN0cmVhbSkge1xuICAgIHJldHVybiBfX2FzeW5jR2VuZXJhdG9yKHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24gcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcl8xKCkge1xuICAgICAgICB2YXIgcmVhZGVyLCBfYSwgdmFsdWUsIGRvbmU7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlciA9IHJlYWRhYmxlU3RyZWFtLmdldFJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsICwgOSwgMTBdKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cnVlKSByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIF9fYXdhaXQocmVhZGVyLnJlYWQoKSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCksIHZhbHVlID0gX2EudmFsdWUsIGRvbmUgPSBfYS5kb25lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRvbmUpIHJldHVybiBbMywgNV07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgX19hd2FpdCh2b2lkIDApXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiwgX2Iuc2VudCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbNCwgX19hd2FpdCh2YWx1ZSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFs0LCBfYi5zZW50KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFszLCAxMF07XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVsZWFzZUxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDEwOiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1JlYWRhYmxlU3RyZWFtTGlrZShvYmopIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbihvYmogPT09IG51bGwgfHwgb2JqID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvYmouZ2V0UmVhZGVyKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzUmVhZGFibGVTdHJlYW1MaWtlLmpzLm1hcCIsImltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0xpZnQoc291cmNlKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oc291cmNlID09PSBudWxsIHx8IHNvdXJjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc291cmNlLmxpZnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9wZXJhdGUoaW5pdCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgIGlmIChoYXNMaWZ0KHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UubGlmdChmdW5jdGlvbiAobGlmdGVkU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaXQobGlmdGVkU291cmNlLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5hYmxlIHRvIGxpZnQgdW5rbm93biBPYnNlcnZhYmxlIHR5cGUnKTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlmdC5qcy5tYXAiLCJpbXBvcnQgeyBfX3JlYWQsIF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IG1hcCB9IGZyb20gXCIuLi9vcGVyYXRvcnMvbWFwXCI7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5mdW5jdGlvbiBjYWxsT3JBcHBseShmbiwgYXJncykge1xuICAgIHJldHVybiBpc0FycmF5KGFyZ3MpID8gZm4uYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoYXJncykpKSA6IGZuKGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG1hcE9uZU9yTWFueUFyZ3MoZm4pIHtcbiAgICByZXR1cm4gbWFwKGZ1bmN0aW9uIChhcmdzKSB7IHJldHVybiBjYWxsT3JBcHBseShmbiwgYXJncyk7IH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwT25lT3JNYW55QXJncy5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gbm9vcCgpIHsgfVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9vcC5qcy5tYXAiLCJpbXBvcnQgeyBpZGVudGl0eSB9IGZyb20gJy4vaWRlbnRpdHknO1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgdmFyIGZucyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGZuc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gcGlwZUZyb21BcnJheShmbnMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBpcGVGcm9tQXJyYXkoZm5zKSB7XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGlkZW50aXR5O1xuICAgIH1cbiAgICBpZiAoZm5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZm5zWzBdO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGlwZWQoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGZucy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGZuKSB7IHJldHVybiBmbihwcmV2KTsgfSwgaW5wdXQpO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1waXBlLmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgeyB0aW1lb3V0UHJvdmlkZXIgfSBmcm9tICcuLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyJztcbmV4cG9ydCBmdW5jdGlvbiByZXBvcnRVbmhhbmRsZWRFcnJvcihlcnIpIHtcbiAgICB0aW1lb3V0UHJvdmlkZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvblVuaGFuZGxlZEVycm9yID0gY29uZmlnLm9uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIGlmIChvblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBvblVuaGFuZGxlZEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcG9ydFVuaGFuZGxlZEVycm9yLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvcihpbnB1dCkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKFwiWW91IHByb3ZpZGVkIFwiICsgKGlucHV0ICE9PSBudWxsICYmIHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcgPyAnYW4gaW52YWxpZCBvYmplY3QnIDogXCInXCIgKyBpbnB1dCArIFwiJ1wiKSArIFwiIHdoZXJlIGEgc3RyZWFtIHdhcyBleHBlY3RlZC4gWW91IGNhbiBwcm92aWRlIGFuIE9ic2VydmFibGUsIFByb21pc2UsIFJlYWRhYmxlU3RyZWFtLCBBcnJheSwgQXN5bmNJdGVyYWJsZSwgb3IgSXRlcmFibGUuXCIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhyb3dVbm9ic2VydmFibGVFcnJvci5qcy5tYXAiLCJpbXBvcnQge1RpY2tldH0gZnJvbSBcIi4vbW9kZWxzL1RpY2tldFwiO1xuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi9tb2RlbHMvVXNlclwiO1xuXG5leHBvcnQgY29uc3QgU0VSVkVSX0FERFJFU1MgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xuXG5cbmV4cG9ydCBjb25zdCBCQUxMX0lOVEVSVkFMID0gMjUwMDtcbmV4cG9ydCBjb25zdCBST1VORF9USU1FID0gMzUgKiBCQUxMX0lOVEVSVkFMO1xuZXhwb3J0IGNvbnN0IFJPVU5EX05VTUJFUiA9IDA7XG5cbmV4cG9ydCBjb25zdCBNSU5fQkVUID0gMjBcblxuZXhwb3J0IGNvbnN0IFRJQ0tFVF9UT19CRV9QT1BVTEFURUQgOiBUaWNrZXQgPSB7XG4gICAgbnVtYmVyczogW10sXG4gICAgYmV0OiBNSU5fQkVULFxuICAgIG51bTogMFxufTtcbmV4cG9ydCBjb25zdCBUSUNLRVRTIDogVGlja2V0W10gPSBbXVxuXG5leHBvcnQgY29uc3QgVVNFUiA6IFVzZXIgPSB7XG4gICAgaWQgOiAxLFxuICAgIGJhbGFuY2U6IDEwMDAsXG4gICAgbmFtZTogXCJNYXJrb1wiXG59IiwiaW1wb3J0IHtmcm9tLCBPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtCYWxsfSBmcm9tIFwiLi4vbW9kZWxzL0JhbGxcIjtcbmltcG9ydCB7U0VSVkVSX0FERFJFU1N9IGZyb20gXCIuLi9jb25maWdcIjtcblxuZXhwb3J0IGNvbnN0IGdldEJhbGxzID0gKCk6IE9ic2VydmFibGU8QmFsbFtdPiA9PiB7XG4gICAgY29uc3QgcHJvbWlzZTogUHJvbWlzZTxCYWxsW10+ID0gZmV0Y2goYCR7U0VSVkVSX0FERFJFU1N9L2JhbGxgKVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXJlcy5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUudGFibGUocmVzLmpzb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBmcm9tKHByb21pc2UpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEZpZ3VyZXNRdWVyeSA9IChxdWVyeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCYWxsW10+ID0+IHtcbiAgICBjb25zdCBwcm9taXNlOiBQcm9taXNlPEJhbGxbXT4gPSBmZXRjaChgJHtTRVJWRVJfQUREUkVTU30vYmFsbD9xPSR7cXVlcnl9YClcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLnRhYmxlKHJlcy5qc29uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gZnJvbShwcm9taXNlKTtcbn07IiwiZXhwb3J0IGNvbnN0IGdldFJhbmRvbU51bWJlciA9IChsZW5ndGg6IG51bWJlcikgOiBudW1iZXIgPT5cbntcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnBvdygxMCwgbGVuZ3RoLTEpICsgTWF0aC5yYW5kb20oKSAqIChNYXRoLnBvdygxMCwgbGVuZ3RoKSAtIE1hdGgucG93KDEwLCBsZW5ndGgtMSkgLSAxKSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmFuZG9tTnVtYmVyID0gKCBtaW46bnVtYmVyLCBtYXg6bnVtYmVyKSA6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbn1cblxuZXhwb3J0IGNvbnN0IGFycmF5UmVtb3ZlID0gKGFyciA6IGFueVtdLCB2YWx1ZTogYW55KSA6IGFueVtdID0+IHtcbiAgICBhcnIuZmlsdGVyKGZ1bmN0aW9uKGVsZSl7XG4gICAgICAgIHJldHVybiBlbGUgIT0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGNvbnN0IGFycmF5U2h1ZmZsZSA9ICggYXJyYXk6IGFueVtdKSAgOiBhbnlbXSA9PiB7XG4gICAgbGV0IGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgIHJhbmRvbUluZGV4O1xuICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLlxuICAgIHdoaWxlIChjdXJyZW50SW5kZXggIT0gMCkge1xuICAgICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuXG4gICAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICAgICAgY3VycmVudEluZGV4LS07XG4gICAgICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgICAgW2FycmF5W2N1cnJlbnRJbmRleF0sIGFycmF5W3JhbmRvbUluZGV4XV0gPSBbXG4gICAgICAgICAgICBhcnJheVtyYW5kb21JbmRleF0sIGFycmF5W2N1cnJlbnRJbmRleF1dO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlRGl2ID0gKHBhcmVudDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKTogSFRNTERpdkVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICByZXR1cm4gZGl2O1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUxhYmVsID0gKHBhcmVudDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZT86IHN0cmluZyk6IEhUTUxMYWJlbEVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IGxibCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgIT09IFwidW5kZWZpbmVkXCIpIGxibC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGxibCk7XG5cbiAgICByZXR1cm4gbGJsO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUJ1dHRvbiA9IChwYXJlbnQ6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU/OiBzdHJpbmcpOiBIVE1MQnV0dG9uRWxlbWVudCA9PiB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgIT09IFwidW5kZWZpbmVkXCIpIGJ0bi5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGJ0bik7XG5cbiAgICByZXR1cm4gYnRuO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUlucHV0ID0gKHBhcmVudDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZT86IHN0cmluZyk6IEhUTUxJbnB1dEVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IGlucHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lICE9PSBcInVuZGVmaW5lZFwiKSBpbnB0LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoaW5wdCk7XG5cbiAgICByZXR1cm4gaW5wdDtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDdXN0b21FbGVtZW50ID0gKHRhZ05hbWU6IHN0cmluZywgcGFyZW50OiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lPzogc3RyaW5nKTogSFRNTEVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSAhPT0gXCJ1bmRlZmluZWRcIikgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICByZXR1cm4gZWw7XG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVBbGxDaGlsZE5vZGVzID0gKHBhcmVudDogSFRNTEVsZW1lbnQpOiB2b2lkID0+IHtcbiAgICB3aGlsZSAocGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcbiAgICB9XG59IiwiaW1wb3J0IHtkZWJvdW5jZVRpbWUsIGZyb20sIGludGVydmFsLCBtYXAsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgdGFrZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7QkFMTF9JTlRFUlZBTCwgVElDS0VUUywgVVNFUn0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IHthcnJheVJlbW92ZSwgYXJyYXlTaHVmZmxlLCBnZXRSYW5kb21OdW1iZXIsIHJhbmRvbU51bWJlcn0gZnJvbSBcIi4uL2hlbHBlcnMvSGVscGVyTG9naWNcIjtcbmltcG9ydCB7VGlja2V0fSBmcm9tIFwiLi4vbW9kZWxzL1RpY2tldFwiO1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUdhbWUgPSAoKSA6IFN1YnNjcmlwdGlvbiA9PiB7XG4gICAgbGV0IGFyciA9IFsxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCwzOSw0MCw0MSw0Miw0Myw0NCw0NSw0Niw0Nyw0OF07XG4gICByZXR1cm4gbmV3IE9ic2VydmFibGUoIChnZW4pID0+e1xuICAgICAgIHNldEludGVydmFsKCAoKSA9PiB7XG4gICAgICAgICAgIGdlbi5uZXh0KFxuICAgICAgICAgICAgICAgYXJyLnNwbGljZShcbiAgICAgICAgICAgICAgICAgICBhcnJheVNodWZmbGUoYXJyKS5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICAgICByYW5kb21OdW1iZXIoMSxhcnIubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICksMSlcbiAgICAgICAgICAgICAgICAgICBbMF1cbiAgICAgICAgICAgKTtcbiAgICAgICB9LCBCQUxMX0lOVEVSVkFMKVxuICAgfSkucGlwZSh0YWtlKDM1KSkuc3Vic2NyaWJlKCk7XG59XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlVXNlckRhdGEgPSAoZWw6IEhUTUxFbGVtZW50KSA6IFByb21pc2U8VGlja2V0PiA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCAgKHJlcykgPT4ge1xuICAgICAgICBsZXQgdCA6IFRpY2tldD0ge1xuICAgICAgICAgICAgbnVtYmVyczogW10sXG4gICAgICAgICAgICBiZXQ6IDAsXG4gICAgICAgICAgICBudW06IDBcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHYgPSBmcm9tKGVsLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm51bScpKS5waXBlKG1hcChlbD0+cGFyc2VJbnQoZWwuaW5uZXJIVE1MKSkpLnN1YnNjcmliZShlbD0+dC5udW1iZXJzLnB1c2goZWwpKTtcbiAgICAgICAgdC5iZXQgPSBwYXJzZUludCgoZWwucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudC1iZXQtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSlcbiAgICAgICAgdC5udW0gPSBwYXJzZUludCgoZWwucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3QtaWQnKSkpXG4gICAgICAgIHJlcyh0KTtcbiAgICAgICAgVVNFUi5iYWxhbmNlIC09IHQuYmV0O1xuICAgIH0pXG59XG5cblxuZXhwb3J0IGNvbnN0IHN0YXJ0R2FtZSA9ICgpIDogdm9pZCA9PiB7XG4gICAgbGV0IGRpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYi1jb25mLWFjdGl2ZScpXG5cbiAgICBkaXZzLmZvckVhY2goZWw9PntcbiAgICAgICAgcHJlcGFyZVVzZXJEYXRhKGVsIGFzIEhUTUxFbGVtZW50KS50aGVuKHQ9PntcbiAgICAgICAgICAgIFRJQ0tFVFMucHVzaCh0KVxuICAgICAgICAgICAgY29uc29sZS5sb2coVElDS0VUUyk7XG4gICAgICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgcHJlcGFyZUdhbWUoKTtcbn1cblxuIiwiaW1wb3J0IHtcbiAgICBmaWx0ZXIsXG4gICAgZnJvbUV2ZW50LFxuICAgIG1hcCxcbiAgICBzd2l0Y2hNYXB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge01JTl9CRVQsIFRJQ0tFVF9UT19CRV9QT1BVTEFURUR9IGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7YWN0aXZhdGVCYWxsLCBkcmF3VGlja2V0LCByZXNldEFjdGl2ZUJhbGxzLCB1cGRhdGVUaWNrZXROdW1iZXJzfSBmcm9tIFwiLi4vdmlld3MvSG9tZVZpZXdcIjtcblxuXG5leHBvcnQgY29uc3QgdXBkYXRlVGlja2V0cyA9IChudW1iZXIgOiBudW1iZXIpIDogdm9pZCA9PiB7XG4gICAgaWYgKFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtYmVycy5sZW5ndGggPj0gNikge1xuICAgICAgICBUSUNLRVRfVE9fQkVfUE9QVUxBVEVELm51bWJlcnMgPSBbXTtcbiAgICAgICAgVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5udW0rKztcbiAgICAgICAgVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5iZXQgPSBNSU5fQkVUO1xuICAgICAgICBkcmF3VGlja2V0KCk7XG4gICAgICAgIE9uVGlja2V0QWN0aXZlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBUSUNLRVRfVE9fQkVfUE9QVUxBVEVELm51bWJlcnMucHVzaChudW1iZXIpO1xuICAgICAgICB1cGRhdGVUaWNrZXROdW1iZXJzKG51bWJlcik7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtYmVycyk7XG59XG5cblxuXG5leHBvcnQgY29uc3QgbGlzdGVuQ2xpY2tPbkJhbGwgPSAoKSA6IHZvaWQgPT57XG4gICAgY29uc29sZS5sb2coXCJhc2Rhc1wiKVxuICAgIGRyYXdUaWNrZXQoKTtcbiAgICBmcm9tRXZlbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJhbGxIYW5kbGVyJyksJ2NsaWNrJylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoZXYgPT4gcGFyc2VJbnQoKDxIVE1MRGl2RWxlbWVudD5ldi50YXJnZXQpLmdldEF0dHJpYnV0ZSgnaWQnKSkpLFxuICAgICAgICAgICAgZmlsdGVyKGVsID0+IGVsICE9IHVuZGVmaW5lZCAmJiAhaXNOYU4oZWwpKSxcbiAgICAgICAgICAgIG1hcChpZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtYmVycy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5udW1iZXJzLnNwbGljZShUSUNLRVRfVE9fQkVfUE9QVUxBVEVELm51bWJlcnMuaW5kZXhPZihpZCksMSk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRpY2tldE51bWJlcnMoaWQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBpZH0pLFxuICAgICAgICAgICAgZmlsdGVyKCB2YWwgPT4gdmFsICE9IDAgJiYgdmFsICE9IHVuZGVmaW5lZClcbiAgICAgICAgKS5zdWJzY3JpYmUoeD0+ICB1cGRhdGVUaWNrZXRzKHgpKTtcbn1cblxuZXhwb3J0IGNvbnN0IE9uVGlja2V0QWN0aXZlID0gKCkgOiB2b2lkID0+e1xuICAgIGZyb21FdmVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudS10aWNrZXQnKSwnY2xpY2snKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChldj0+IHtcbiAgICAgICAgICAgICAgICBUSUNLRVRfVE9fQkVfUE9QVUxBVEVELm51bWJlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXNldEFjdGl2ZUJhbGxzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxIVE1MRGl2RWxlbWVudD4gZXYudGFyZ2V0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBmaWx0ZXIoZWwgPT4gZWwgIT0gdW5kZWZpbmVkKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcChlbD0+IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5udW0nKSksXG4gICAgICAgICAgICBmaWx0ZXIobnVtcyA9PiBudW1zICE9IHVuZGVmaW5lZCksXG4gICAgICAgICAgICBtYXAobnVtcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyc2VJbnQobnVtcy5pbm5lckhUTUwpKTtcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZUJhbGwocGFyc2VJbnQobnVtcy5pbm5lckhUTUwpKTtcbiAgICAgICAgICAgICAgICBUSUNLRVRfVE9fQkVfUE9QVUxBVEVELm51bWJlcnMucHVzaChwYXJzZUludChudW1zLmlubmVySFRNTCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKVxufSIsImltcG9ydCB7Y3JlYXRlRGl2LCBjcmVhdGVJbnB1dCwgY3JlYXRlTGFiZWx9IGZyb20gXCIuLi9oZWxwZXJzL0hlbHBlclZpZXdzXCI7XG5pbXBvcnQge2dldEJhbGxzfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvQmFsbENvbnRyb2xsZXJcIjtcbmltcG9ydCB7VXNlcn0gZnJvbSBcIi4uL21vZGVscy9Vc2VyXCI7XG5pbXBvcnQge0JhbGx9IGZyb20gXCIuLi9tb2RlbHMvQmFsbFwiO1xuaW1wb3J0IHtNSU5fQkVULCBST1VORF9OVU1CRVIsIFRJQ0tFVF9UT19CRV9QT1BVTEFURUQsIFVTRVJ9IGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7bGlzdGVuQ2xpY2tPbkJhbGx9IGZyb20gXCIuLi9zZXJ2aWNlcy9UaWNrZXRTZXJ2aWNlXCI7XG5cbmV4cG9ydCBjb25zdCBpbml0SG9tZSA9IChob3N0IDogSFRNTEVsZW1lbnQpOnZvaWQgPT4ge1xuICAgIGNvbnN0IHNlY3RvcjEgPSBjcmVhdGVEaXYoaG9zdCwnc2VjdG9yMScpO1xuICAgIGNvbnN0IHNlY3RvcjIgPSBjcmVhdGVEaXYoaG9zdCwnc2VjdG9yMicpO1xuXG4gICAgaW5pdFVpKHNlY3RvcjIsVVNFUik7XG5cbiAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZURpdihzZWN0b3IxLCdkaXZUaXRsZScpO1xuICAgIGNyZWF0ZUxhYmVsKHRpdGxlLCd0aXRsZScpLmlubmVyVGV4dCA9ICdQbGFjZSBCZXQnO1xuICAgIGNyZWF0ZUxhYmVsKHRpdGxlLCdyLXRpdGxlJykuaW5uZXJUZXh0ID0gJyMnICsgUk9VTkRfTlVNQkVSO1xuXG4gICAgY29uc3QgZGIgPSBjcmVhdGVEaXYoc2VjdG9yMSwnZGl2QmFsbHMnKTtcblxuICAgIGdldEJhbGxzKCkuc3Vic2NyaWJlKChiYWxscykgPT4ge1xuICAgICAgICBkcmF3QmFsbEhhbmRsZXJXaXRoQmFsbChkYiwgYmFsbHMpLnRoZW4obGlzdGVuQ2xpY2tPbkJhbGwpO1xuICAgIH0pO1xufVxuZXhwb3J0IGNvbnN0IGRyYXdCYWxsSGFuZGxlcldpdGhCYWxsID0gKGhvc3Q6IEhUTUxFbGVtZW50LGJhbGxzOkJhbGxbXSkgOiBQcm9taXNlPHZvaWQ+ID0+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSAoIChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGJhbGxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBkcmF3QmFsbHMoZWwsXG4gICAgICAgICAgICBjcmVhdGVEaXYoaG9zdCwnYmFsbEhhbmRsZXInKSk7XG4gICAgfSlcbiAgICByZXNvbHZlKCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBpbml0VWkgPSAoaG9zdDogSFRNTEVsZW1lbnQsIHVzZXI6IFVzZXIpIDogdm9pZCA9PiB7XG4gICAgY29uc3QgdWlEaXYgPSBjcmVhdGVEaXYoaG9zdCwndS1kaXYnKTtcbiAgICBjcmVhdGVMYWJlbCh1aURpdiwndS1uYW1lJykuaW5uZXJUZXh0ID0gJ0JhbGFuY2U6ICcrdXNlci5iYWxhbmNlO1xuICAgIGNyZWF0ZUxhYmVsKHVpRGl2LCd1LWJhbCcpLmlubmVyVGV4dCA9ICdIZWxsbyAnKyB1c2VyLm5hbWU7XG4gICAgY29uc3QgdGlja2V0cyA9IGNyZWF0ZURpdihob3N0LCd1LW1haW4tdGlja2V0cycpO1xufVxuXG5leHBvcnQgY29uc3QgZHJhd0JhbGxzID0gKGJhbGwgOiBCYWxsLCBob3N0OiBIVE1MRWxlbWVudCkgOiB2b2lkID0+e1xuICAgIGNvbnN0IGIgPSBjcmVhdGVEaXYoaG9zdCwnYmFsbCcpO1xuICAgIGIuc2V0QXR0cmlidXRlKCdpZCcsYmFsbC5pZC50b1N0cmluZygpKTtcbiAgICBiLmlubmVyVGV4dCA9IGJhbGwuaWQudG9TdHJpbmcoKTtcbiAgICBiLnN0eWxlLmJhY2tncm91bmQgPSBiYWxsLmNvbG9yO1xuICAgIGIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChldik9PntcbiAgICAgICAgYWN0aXZhdGVCYWxsKGJhbGwuaWQpO1xuICAgIH0sdHJ1ZSk7XG59XG5cbmV4cG9ydCBjb25zdCBhY3RpdmF0ZUJhbGwgPSAoYmFsbElkOiBudW1iZXIpIDp2b2lkID0+e1xuICAgIGxldCBiYWxsID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdltpZF0nKVxuICAgICAgICAuaXRlbShiYWxsSWQgLSAxKS5wYXJlbnRFbGVtZW50O1xuICAgIGlmIChiYWxsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpXG4gICAgICAgIGJhbGwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICBlbHNlXG4gICAgICAgIGJhbGwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG59XG5leHBvcnQgY29uc3QgYWN0aXZhdGVUaWNrZXQgPSAodGlja2V0SWQ6IG51bWJlcikgOnZvaWQgPT57XG4gICAgbGV0IHRpY2tldCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbdC1pZF0nKS5pdGVtKHRpY2tldElkKVxuICAgIHJlc2V0QWN0aXZlVGlja2V0cygpO1xuICAgIGlmICh0aWNrZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0LWFjdGl2ZScpKVxuICAgICAgICB0aWNrZXQuY2xhc3NMaXN0LnJlbW92ZSgndC1hY3RpdmUnKVxuICAgIGVsc2VcbiAgICAgICAgdGlja2V0LmNsYXNzTGlzdC5hZGQoJ3QtYWN0aXZlJyk7XG59XG5cbmV4cG9ydCBjb25zdCBkcmF3VGlja2V0ID0gKCkgOiB2b2lkID0+IHtcbiAgICByZXNldEFjdGl2ZVRpY2tldHMoKTtcbiAgICBsZXQgdEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudS1tYWluLXRpY2tldHMnKSBhcyBIVE1MRWxlbWVudFxuXG4gICAgbGV0IHRpY2tldCA9IGNyZWF0ZURpdih0QXJlYSwndS10aWNrZXQnKTtcbiAgICB0aWNrZXQuY2xhc3NMaXN0LmFkZCgndC1hY3RpdmUnKVxuICAgIHRpY2tldC5zZXRBdHRyaWJ1dGUoJ3QtaWQnLFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtLnRvU3RyaW5nKCkpO1xuICAgIHRpY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PnthY3RpdmF0ZVRpY2tldChwYXJzZUludCh0aWNrZXQuZ2V0QXR0cmlidXRlKCd0LWlkJykpKX0sZmFsc2UpO1xuXG5cblxuICAgIGNyZWF0ZUxhYmVsKHRpY2tldCwnbGJsJykuaW5uZXJUZXh0ID0gXCJUaWNrZXQgI1wiICsgVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5udW0udG9TdHJpbmcoKTtcbiAgICBjcmVhdGVEaXYodGlja2V0LCd0LW51bWJlcnMnKTtcbiAgICBsZXQgdEJldCA9IGNyZWF0ZURpdih0aWNrZXQsJ3QtYmV0Jyk7XG5cbiAgICBsZXQgYmV0SW5wdXQgPSBjcmVhdGVJbnB1dCh0QmV0LCd0LWJldC1pbnB1dCcpO1xuICAgIGJldElucHV0LnR5cGUgPSAnbnVtYmVyJztcbiAgICBiZXRJbnB1dC52YWx1ZSA9IE1JTl9CRVQudG9TdHJpbmcoKTtcbiAgICBjcmVhdGVEaXYodGlja2V0LCdidG5Db25mJykuaW5uZXJIVE1MID0gYDxzdmcgd2lkdGg9XCIzMHB4XCIgaGVpZ2h0PVwiMzBweFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMi4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIyIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBkPVwiTTQ3MC42IDEwNS40YzEyLjUgMTIuNSAxMi41IDMyLjggMCA0NS4zbC0yNTYgMjU2Yy0xMi41IDEyLjUtMzIuOCAxMi41LTQ1LjMgMGwtMTI4LTEyOGMtMTIuNS0xMi41LTEyLjUtMzIuOCAwLTQ1LjNzMzIuOC0xMi41IDQ1LjMgMEwxOTIgMzM4LjcgNDI1LjQgMTA1LjRjMTIuNS0xMi41IDMyLjgtMTIuNSA0NS4zIDB6XCIvPjwvc3ZnPmA7XG4gICAgcmVzZXRBY3RpdmVCYWxscygpO1xufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlVGlja2V0TnVtYmVycyA9IChudW06bnVtYmVyLCByZXNldD8gOiBib29sZWFuKSA9PiB7XG4gICAgbGV0IGRpdlRpY2tldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbdC1pZF0nKVxuICAgIGNvbnNvbGUubG9nKGRpdlRpY2tldHMpO1xuICAgIGxldCB0aWNrZXQgOiBIVE1MRWxlbWVudDtcbiAgICBkaXZUaWNrZXRzLmZvckVhY2goZWw9PntcbiAgICAgICAgaWYoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCd0LWFjdGl2ZScpKVxuICAgICAgICAgICAgdGlja2V0ID0gZWwgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIH0pO1xuICAgIGxldCBudW1iZXJzRGl2ID0gdGlja2V0LnF1ZXJ5U2VsZWN0b3IoJy50LW51bWJlcnMnKSBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAocmVzZXQpXG4gICAge1xuICAgICAgICBsZXQgbnVtcyA9IG51bWJlcnNEaXYucXVlcnlTZWxlY3RvckFsbCgnLm51bScpXG4gICAgICAgIG51bXMuZm9yRWFjaChlbD0+e1xuICAgICAgICAgICAgaWYoZWwuaW5uZXJIVE1MID09IG51bS50b1N0cmluZygpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG51bWJlcnNEaXYucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICBjcmVhdGVEaXYobnVtYmVyc0RpdiwgJ251bScpLmlubmVyVGV4dCA9IG51bS50b1N0cmluZygpO1xuICAgIH1cbiAgICBsZXQgYnRuQ25mID0gdGlja2V0LnF1ZXJ5U2VsZWN0b3IoJy5idG5Db25mJyk7XG4gICAgaWYobnVtYmVyc0Rpdi5jaGlsZHJlbi5sZW5ndGggPT09IDYpXG4gICAge1xuICAgICAgICBidG5DbmYuY2xhc3NMaXN0LmFkZCgnYi1jb25mLWFjdGl2ZScpXG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGlmIChidG5DbmYuY2xhc3NMaXN0LmNvbnRhaW5zKCdiLWNvbmYtYWN0aXZlJykpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJ0bkNuZi5jbGFzc0xpc3QucmVtb3ZlKCdiLWNvbmYtYWN0aXZlJylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlc2V0QWN0aXZlQmFsbHMgPSAoKSA6IHZvaWQgPT4ge1xuICAgIGxldCBiYWxsID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUnKVxuICAgIGJhbGwuZm9yRWFjaChlbD0+e1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9KVxufVxuXG5leHBvcnQgY29uc3QgcmVzZXRBY3RpdmVUaWNrZXRzID0gKCkgOiB2b2lkID0+IHtcbiAgICBsZXQgdGlja2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50LWFjdGl2ZScpO1xuICAgIHRpY2tldHMuZm9yRWFjaChlbD0+e1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd0LWFjdGl2ZScpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlRW1wdHlUaWNrZXRzID0gKCkgOiB2b2lkID0+IHtcbiAgICBsZXQgbWFpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51LW1haW4tdGlja2V0cycpO1xuICAgIGxldCB0aWNrZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnUtdGlja2V0JylcbiAgICB0aWNrZXRzLmZvckVhY2goZWw9PntcbiAgICAgICAgaWYoZWwucXVlcnlTZWxlY3RvcignLnQtbnVtYmVycycpLmNoaWxkcmVuLmxlbmd0aCA8PSAwKVxuICAgICAgICAgICAgbWFpbkRpdi5yZW1vdmVDaGlsZChlbCk7XG4gICAgfSk7XG59XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2luaXRIb21lfSBmcm9tIFwiLi92aWV3cy9Ib21lVmlld1wiO1xuaW1wb3J0IHtzdGFydEdhbWV9IGZyb20gXCIuL3NlcnZpY2VzL0dhbWVTZXJ2aWNlXCI7XG5pbXBvcnQge1JPVU5EX1RJTUV9IGZyb20gXCIuL2NvbmZpZ1wiO1xuXG5pbml0SG9tZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbkNvbnRhaW5lcicpKTtcblxuc2V0VGltZW91dChzdGFydEdhbWUsNTAwMCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=