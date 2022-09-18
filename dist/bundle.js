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

/***/ "./node_modules/rxjs/dist/esm5/internal/Scheduler.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Scheduler.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scheduler": () => (/* binding */ Scheduler)
/* harmony export */ });
/* harmony import */ var _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler/dateTimestampProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js");

var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__.dateTimestampProvider.now;
    return Scheduler;
}());

//# sourceMappingURL=Scheduler.js.map

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

/***/ "./node_modules/rxjs/dist/esm5/internal/observable/timer.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/observable/timer.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timer": () => (/* binding */ timer)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/dist/esm5/internal/scheduler/async.js");
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/dist/esm5/internal/util/isScheduler.js");
/* harmony import */ var _util_isDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isDate */ "./node_modules/rxjs/dist/esm5/internal/util/isDate.js");




function timer(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) { dueTime = 0; }
    if (scheduler === void 0) { scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.async; }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
        if ((0,_util_isScheduler__WEBPACK_IMPORTED_MODULE_1__.isScheduler)(intervalOrScheduler)) {
            scheduler = intervalOrScheduler;
        }
        else {
            intervalDuration = intervalOrScheduler;
        }
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_2__.Observable(function (subscriber) {
        var due = (0,_util_isDate__WEBPACK_IMPORTED_MODULE_3__.isValidDate)(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
            due = 0;
        }
        var n = 0;
        return scheduler.schedule(function () {
            if (!subscriber.closed) {
                subscriber.next(n++);
                if (0 <= intervalDuration) {
                    this.schedule(undefined, intervalDuration);
                }
                else {
                    subscriber.complete();
                }
            }
        }, due);
    });
}
//# sourceMappingURL=timer.js.map

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

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "takeWhile": () => (/* binding */ takeWhile)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function takeWhile(predicate, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) {
            var result = predicate(value, index++);
            (result || inclusive) && subscriber.next(value);
            !result && subscriber.complete();
        }));
    });
}
//# sourceMappingURL=takeWhile.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/operators/tap.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/operators/tap.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tap": () => (/* binding */ tap)
/* harmony export */ });
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ "./node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ "./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/identity */ "./node_modules/rxjs/dist/esm5/internal/util/identity.js");




function tap(observerOrNext, error, complete) {
    var tapObserver = (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(observerOrNext) || error || complete
        ?
            { next: observerOrNext, error: error, complete: complete }
        : observerOrNext;
    return tapObserver
        ? (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (source, subscriber) {
            var _a;
            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
            var isUnsub = true;
            source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, function (value) {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                subscriber.next(value);
            }, function () {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                subscriber.complete();
            }, function (err) {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                subscriber.error(err);
            }, function () {
                var _a, _b;
                if (isUnsub) {
                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
            }));
        })
        :
            _util_identity__WEBPACK_IMPORTED_MODULE_3__.identity;
}
//# sourceMappingURL=tap.js.map

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

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/Action.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/Action.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Action": () => (/* binding */ Action)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");


var Action = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription));

//# sourceMappingURL=Action.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js":
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncAction": () => (/* binding */ AsyncAction)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Action */ "./node_modules/rxjs/dist/esm5/internal/scheduler/Action.js");
/* harmony import */ var _intervalProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./intervalProvider */ "./node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/arrRemove */ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var AsyncAction = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.clearInterval(id);
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = e ? e : new Error('Scheduled action threw falsy error');
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_2__.arrRemove)(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(_Action__WEBPACK_IMPORTED_MODULE_3__.Action));

//# sourceMappingURL=AsyncAction.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js":
/*!**************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncScheduler": () => (/* binding */ AsyncScheduler)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Scheduler */ "./node_modules/rxjs/dist/esm5/internal/Scheduler.js");


var AsyncScheduler = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = _Scheduler__WEBPACK_IMPORTED_MODULE_1__.Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        _this._scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(_Scheduler__WEBPACK_IMPORTED_MODULE_1__.Scheduler));

//# sourceMappingURL=AsyncScheduler.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/async.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/async.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "async": () => (/* binding */ async),
/* harmony export */   "asyncScheduler": () => (/* binding */ asyncScheduler)
/* harmony export */ });
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncAction */ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncScheduler */ "./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js");


var asyncScheduler = new _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__.AsyncScheduler(_AsyncAction__WEBPACK_IMPORTED_MODULE_1__.AsyncAction);
var async = asyncScheduler;
//# sourceMappingURL=async.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dateTimestampProvider": () => (/* binding */ dateTimestampProvider)
/* harmony export */ });
var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};
//# sourceMappingURL=dateTimestampProvider.js.map

/***/ }),

/***/ "./node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js":
/*!****************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "intervalProvider": () => (/* binding */ intervalProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var intervalProvider = {
    setInterval: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = intervalProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
            return delegate.setInterval.apply(delegate, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
        }
        return setInterval.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    },
    clearInterval: function (handle) {
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=intervalProvider.js.map

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

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isDate.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isDate.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValidDate": () => (/* binding */ isValidDate)
/* harmony export */ });
function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
}
//# sourceMappingURL=isDate.js.map

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

/***/ "./node_modules/rxjs/dist/esm5/internal/util/isScheduler.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/isScheduler.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isScheduler": () => (/* binding */ isScheduler)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isScheduler(value) {
    return value && (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value.schedule);
}
//# sourceMappingURL=isScheduler.js.map

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
/* harmony export */   "INTERVAL": () => (/* binding */ INTERVAL),
/* harmony export */   "MINUTES": () => (/* binding */ MINUTES),
/* harmony export */   "MIN_BET": () => (/* binding */ MIN_BET),
/* harmony export */   "ROUND_NUMBER": () => (/* binding */ ROUND_NUMBER),
/* harmony export */   "ROUND_TIME": () => (/* binding */ ROUND_TIME),
/* harmony export */   "SEC": () => (/* binding */ SEC),
/* harmony export */   "SERVER_ADDRESS": () => (/* binding */ SERVER_ADDRESS),
/* harmony export */   "TICKETS": () => (/* binding */ TICKETS),
/* harmony export */   "TICKET_TO_BE_POPULATED": () => (/* binding */ TICKET_TO_BE_POPULATED),
/* harmony export */   "TIME": () => (/* binding */ TIME),
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
var SEC = 1000;
var INTERVAL = SEC;
var MINUTES = 1.5;
var TIME = MINUTES * 60;


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
/* harmony export */   "prepareTickets": () => (/* binding */ prepareTickets),
/* harmony export */   "prepareUserData": () => (/* binding */ prepareUserData),
/* harmony export */   "startDraw": () => (/* binding */ startDraw),
/* harmony export */   "startGame": () => (/* binding */ startGame)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/take.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _helpers_HelperLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/HelperLogic */ "./src/helpers/HelperLogic.ts");
/* harmony import */ var _views_GameView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/GameView */ "./src/views/GameView.ts");




var startDraw = function () {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
    return new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable(function (gen) {
        setInterval(function () {
            gen.next(arr.splice((0,_helpers_HelperLogic__WEBPACK_IMPORTED_MODULE_1__.arrayShuffle)(arr).indexOf((0,_helpers_HelperLogic__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(1, arr.length)), 1)[0]);
        }, _config__WEBPACK_IMPORTED_MODULE_0__.BALL_INTERVAL);
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.take)(35)).subscribe(function (x) { return console.log(x); });
};
var prepareUserData = function (el) {
    return new Promise(function (res) {
        var t = {
            numbers: [],
            bet: 0,
            num: 0
        };
        (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.from)(el.parentElement.querySelectorAll('.num')).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(function (el) { return parseInt(el.innerHTML); })).subscribe(function (el) { return t.numbers.push(el); });
        t.bet = parseInt(el.parentElement.querySelector('.t-bet-input').value);
        t.num = parseInt((el.parentElement.getAttribute('t-id')));
        res(t);
        _config__WEBPACK_IMPORTED_MODULE_0__.USER.balance -= t.bet;
    });
};
var prepareTickets = function () {
    return new Promise(function (res) {
        var divs = document.querySelectorAll('.b-conf-active');
        divs.forEach(function (el) {
            prepareUserData(el).then(function (t) {
                _config__WEBPACK_IMPORTED_MODULE_0__.TICKETS.push(t);
                console.log(_config__WEBPACK_IMPORTED_MODULE_0__.TICKETS);
            });
        });
        res();
    });
};
var startGame = function () {
    prepareTickets().then(function () {
        (0,_views_GameView__WEBPACK_IMPORTED_MODULE_2__.initGameView)(document.querySelector('.mainContainer'));
        setTimeout(startDraw, 2500);
    });
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

/***/ "./src/services/TimerService.ts":
/*!**************************************!*\
  !*** ./src/services/TimerService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "remainingTimeUpdate": () => (/* binding */ remainingTimeUpdate),
/* harmony export */   "scheduleGameAndStart": () => (/* binding */ scheduleGameAndStart)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/timer.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/tap.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _GameService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameService */ "./src/services/GameService.ts");
/* harmony import */ var _views_HomeView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/HomeView */ "./src/views/HomeView.ts");





var scheduleGameAndStart = function () {
    var counter = 10;
    (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.timer)(_config__WEBPACK_IMPORTED_MODULE_0__.SEC, _config__WEBPACK_IMPORTED_MODULE_0__.SEC)
        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeWhile)(function () { return counter > 0; }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(function () { return counter--; }))
        .subscribe(function () {
        remainingTimeUpdate(counter);
        if (counter <= 0)
            (0,_GameService__WEBPACK_IMPORTED_MODULE_1__.startGame)();
    });
};
var remainingTimeUpdate = function (seconds) {
    var mins = Math.floor(seconds / 60).toString();
    var sec = (seconds - (parseInt(mins) * 60)).toString();
    if (mins.length <= 1)
        mins = "0" + mins;
    if (sec.length <= 1)
        sec = "0" + sec;
    (0,_views_HomeView__WEBPACK_IMPORTED_MODULE_2__.updateDomTimer)(sec, mins);
};


/***/ }),

/***/ "./src/views/GameView.ts":
/*!*******************************!*\
  !*** ./src/views/GameView.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawTickets": () => (/* binding */ drawTickets),
/* harmony export */   "initGameView": () => (/* binding */ initGameView)
/* harmony export */ });
/* harmony import */ var _helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/HelperViews */ "./src/helpers/HelperViews.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.ts");


var initGameView = function (host) {
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.removeAllChildNodes)(host);
    var sector1 = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'g-sector1');
    var sector2 = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'g-sector2');
    var roundInfo = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(sector2, 'timer');
    roundInfo.innerHTML = "\n    <div>\n    <span class=\"minutes\"></span>\n    <span>:</span>\n    <span class=\"seconds\"></span>\n    </div>";
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(roundInfo, 'lbl').innerHTML = '#' + _config__WEBPACK_IMPORTED_MODULE_1__.ROUND_NUMBER;
    var divT = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(sector2, 'u-div');
    drawTickets(sector2);
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(divT, 'r-title').innerHTML = 'Balance: ' + _config__WEBPACK_IMPORTED_MODULE_1__.USER.balance;
};
var drawTickets = function (host) {
    _config__WEBPACK_IMPORTED_MODULE_1__.TICKETS.forEach(function (el) {
        var ticket = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'u-ticket');
        ticket.setAttribute('t-id', el.num.toString());
        ticket.style.flexDirection = 'column';
        ticket.style.width = '95%';
        var nums = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(ticket, 't-numbers');
        el.numbers.forEach(function (num) {
            (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(nums, 't-nums').innerHTML = num.toString();
        });
        (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(ticket, 't-bet').innerHTML = 'Bet: ' + el.bet.toString();
    });
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
/* harmony export */   "updateDomTimer": () => (/* binding */ updateDomTimer),
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
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(title, 'lblTimer').innerHTML = "\n    <span class=\"minutes\"></span>\n    <span>:</span>\n    <span class=\"seconds\"></span>";
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
var updateDomTimer = function (sec, mins) {
    document.querySelector('.minutes').innerHTML = mins;
    document.querySelector('.seconds').innerHTML = sec;
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
/* harmony import */ var _services_TimerService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/TimerService */ "./src/services/TimerService.ts");


(0,_views_HomeView__WEBPACK_IMPORTED_MODULE_0__.initHome)(document.querySelector('.mainContainer'));
setTimeout(_services_TimerService__WEBPACK_IMPORTED_MODULE_1__.scheduleGameAndStart, 5000);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFjO0FBQ2hOLHVCQUF1Qiw4QkFBOEIsZ0RBQWdELHdEQUF3RDtBQUM3Siw2Q0FBNkMsc0NBQXNDLFVBQVUsbUJBQW1CLElBQUk7QUFDcEg7QUFDQTtBQUNPO0FBQ1AsaUNBQWlDLHVDQUF1QyxZQUFZLEtBQUssT0FBTztBQUNoRztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw0QkFBNEI7QUFDdEUsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLDZDQUE2QztBQUM3QztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZQQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ04wQztBQUNtQjtBQUk3RCx5REFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0FBQ25ELFVBQVUsQ0FBQyx3RUFBb0IsRUFBQyxJQUFJLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvTm90aWZpY2F0aW9uRmFjdG9yaWVzLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1NjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1N1YnNjcmliZXIuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9TdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9jb25maWcuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2VtcHR5LmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tRXZlbnQuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2lubmVyRnJvbS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29ic2VydmFibGUvdGltZXIuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvT3BlcmF0b3JTdWJzY3JpYmVyLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9tYXAuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvbWVyZ2VJbnRlcm5hbHMuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvbWVyZ2VNYXAuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvb2JzZXJ2ZU9uLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL3N1YnNjcmliZU9uLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL3N3aXRjaE1hcC5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy90YWtlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL3Rha2VXaGlsZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy90YXAuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVBcnJheS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZUFzeW5jSXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVJdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZU9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVQcm9taXNlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlZC5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlci9BY3Rpb24uanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQXN5bmNBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQXN5bmNTY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvYXN5bmMuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvZGF0ZVRpbWVzdGFtcFByb3ZpZGVyLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL2ludGVydmFsUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc3ltYm9sL29ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2FyclJlbW92ZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvY3JlYXRlRXJyb3JDbGFzcy5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvZXJyb3JDb250ZXh0LmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9leGVjdXRlU2NoZWR1bGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lkZW50aXR5LmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNBc3luY0l0ZXJhYmxlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0RhdGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzSW50ZXJvcE9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzSXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2UuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzU2NoZWR1bGVyLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9saWZ0LmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9tYXBPbmVPck1hbnlBcmdzLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9ub29wLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9waXBlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvdGhyb3dVbm9ic2VydmFibGVFcnJvci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL2NvbnRyb2xsZXJzL0JhbGxDb250cm9sbGVyLnRzIiwid2VicGFjazovL3J4anMvLi9zcmMvaGVscGVycy9IZWxwZXJMb2dpYy50cyIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL2hlbHBlcnMvSGVscGVyVmlld3MudHMiLCJ3ZWJwYWNrOi8vcnhqcy8uL3NyYy9zZXJ2aWNlcy9HYW1lU2VydmljZS50cyIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL3NlcnZpY2VzL1RpY2tldFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vcnhqcy8uL3NyYy9zZXJ2aWNlcy9UaW1lclNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vcnhqcy8uL3NyYy92aWV3cy9HYW1lVmlldy50cyIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL3ZpZXdzL0hvbWVWaWV3LnRzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwid2VicGFjazovL3J4anMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcnhqcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcnhqcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3J4anMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgQ09NUExFVEVfTk9USUZJQ0FUSU9OID0gKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignQycsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTsgfSkoKTtcbmV4cG9ydCBmdW5jdGlvbiBlcnJvck5vdGlmaWNhdGlvbihlcnJvcikge1xuICAgIHJldHVybiBjcmVhdGVOb3RpZmljYXRpb24oJ0UnLCB1bmRlZmluZWQsIGVycm9yKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuZXh0Tm90aWZpY2F0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignTicsIHZhbHVlLCB1bmRlZmluZWQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vdGlmaWNhdGlvbihraW5kLCB2YWx1ZSwgZXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBraW5kLFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Tm90aWZpY2F0aW9uRmFjdG9yaWVzLmpzLm1hcCIsImltcG9ydCB7IFNhZmVTdWJzY3JpYmVyLCBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IGlzU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4vc3ltYm9sL29ic2VydmFibGUnO1xuaW1wb3J0IHsgcGlwZUZyb21BcnJheSB9IGZyb20gJy4vdXRpbC9waXBlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBlcnJvckNvbnRleHQgfSBmcm9tICcuL3V0aWwvZXJyb3JDb250ZXh0JztcbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZSkge1xuICAgICAgICBpZiAoc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gaXNTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0KSA/IG9ic2VydmVyT3JOZXh0IDogbmV3IFNhZmVTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBlcnJvckNvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hID0gX3RoaXMsIG9wZXJhdG9yID0gX2Eub3BlcmF0b3IsIHNvdXJjZSA9IF9hLnNvdXJjZTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKG9wZXJhdG9yXG4gICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRvci5jYWxsKHN1YnNjcmliZXIsIHNvdXJjZSlcbiAgICAgICAgICAgICAgICA6IHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3Vic2NyaWJlKHN1YnNjcmliZXIpXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl90cnlTdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHNpbmspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpYmUoc2luayk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2luay5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKG5leHQsIHByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHByb21pc2VDdG9yID0gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpO1xuICAgICAgICByZXR1cm4gbmV3IHByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpYmVyID0gbmV3IFNhZmVTdWJzY3JpYmVyKHtcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogcmVqZWN0LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiByZXNvbHZlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuc291cmNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGVbU3ltYm9sX29ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvcGVyYXRpb25zID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBvcGVyYXRpb25zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpcGVGcm9tQXJyYXkob3BlcmF0aW9ucykodGhpcyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1Byb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiAodmFsdWUgPSB4KTsgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gcmVqZWN0KGVycik7IH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmUodmFsdWUpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZSk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZTtcbn0oKSk7XG5leHBvcnQgeyBPYnNlcnZhYmxlIH07XG5mdW5jdGlvbiBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcikge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gKF9hID0gcHJvbWlzZUN0b3IgIT09IG51bGwgJiYgcHJvbWlzZUN0b3IgIT09IHZvaWQgMCA/IHByb21pc2VDdG9yIDogY29uZmlnLlByb21pc2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFByb21pc2U7XG59XG5mdW5jdGlvbiBpc09ic2VydmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIGlzRnVuY3Rpb24odmFsdWUubmV4dCkgJiYgaXNGdW5jdGlvbih2YWx1ZS5lcnJvcikgJiYgaXNGdW5jdGlvbih2YWx1ZS5jb21wbGV0ZSk7XG59XG5mdW5jdGlvbiBpc1N1YnNjcmliZXIodmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlICYmIHZhbHVlIGluc3RhbmNlb2YgU3Vic2NyaWJlcikgfHwgKGlzT2JzZXJ2ZXIodmFsdWUpICYmIGlzU3Vic2NyaXB0aW9uKHZhbHVlKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IGRhdGVUaW1lc3RhbXBQcm92aWRlciB9IGZyb20gJy4vc2NoZWR1bGVyL2RhdGVUaW1lc3RhbXBQcm92aWRlcic7XG52YXIgU2NoZWR1bGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY2hlZHVsZXIoc2NoZWR1bGVyQWN0aW9uQ3Rvciwgbm93KSB7XG4gICAgICAgIGlmIChub3cgPT09IHZvaWQgMCkgeyBub3cgPSBTY2hlZHVsZXIubm93OyB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyQWN0aW9uQ3RvciA9IHNjaGVkdWxlckFjdGlvbkN0b3I7XG4gICAgICAgIHRoaXMubm93ID0gbm93O1xuICAgIH1cbiAgICBTY2hlZHVsZXIucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHdvcmssIGRlbGF5LCBzdGF0ZSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLnNjaGVkdWxlckFjdGlvbkN0b3IodGhpcywgd29yaykuc2NoZWR1bGUoc3RhdGUsIGRlbGF5KTtcbiAgICB9O1xuICAgIFNjaGVkdWxlci5ub3cgPSBkYXRlVGltZXN0YW1wUHJvdmlkZXIubm93O1xuICAgIHJldHVybiBTY2hlZHVsZXI7XG59KCkpO1xuZXhwb3J0IHsgU2NoZWR1bGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TY2hlZHVsZXIuanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgaXNTdWJzY3JpcHRpb24sIFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IHJlcG9ydFVuaGFuZGxlZEVycm9yIH0gZnJvbSAnLi91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuL3V0aWwvbm9vcCc7XG5pbXBvcnQgeyBuZXh0Tm90aWZpY2F0aW9uLCBlcnJvck5vdGlmaWNhdGlvbiwgQ09NUExFVEVfTk9USUZJQ0FUSU9OIH0gZnJvbSAnLi9Ob3RpZmljYXRpb25GYWN0b3JpZXMnO1xuaW1wb3J0IHsgdGltZW91dFByb3ZpZGVyIH0gZnJvbSAnLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyJztcbmltcG9ydCB7IGNhcHR1cmVFcnJvciB9IGZyb20gJy4vdXRpbC9lcnJvckNvbnRleHQnO1xudmFyIFN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YnNjcmliZXIoZGVzdGluYXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgIGlmIChpc1N1YnNjcmlwdGlvbihkZXN0aW5hdGlvbikpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5hZGQoX3RoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBFTVBUWV9PQlNFUlZFUjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN1YnNjcmliZXIuY3JlYXRlID0gZnVuY3Rpb24gKG5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFNhZmVTdWJzY3JpYmVyKG5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihuZXh0Tm90aWZpY2F0aW9uKHZhbHVlKSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihlcnJvck5vdGlmaWNhdGlvbihlcnIpLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24oQ09NUExFVEVfTk9USUZJQ0FUSU9OLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gU3Vic2NyaWJlcjtcbn0oU3Vic2NyaXB0aW9uKSk7XG5leHBvcnQgeyBTdWJzY3JpYmVyIH07XG52YXIgX2JpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZDtcbmZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gX2JpbmQuY2FsbChmbiwgdGhpc0FyZyk7XG59XG52YXIgQ29uc3VtZXJPYnNlcnZlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29uc3VtZXJPYnNlcnZlcihwYXJ0aWFsT2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5wYXJ0aWFsT2JzZXJ2ZXIgPSBwYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgfVxuICAgIENvbnN1bWVyT2JzZXJ2ZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlciA9IHRoaXMucGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAocGFydGlhbE9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDb25zdW1lck9ic2VydmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlciA9IHRoaXMucGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAocGFydGlhbE9ic2VydmVyLmVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29uc3VtZXJPYnNlcnZlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXIgPSB0aGlzLnBhcnRpYWxPYnNlcnZlcjtcbiAgICAgICAgaWYgKHBhcnRpYWxPYnNlcnZlci5jb21wbGV0ZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZVVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbnN1bWVyT2JzZXJ2ZXI7XG59KCkpO1xudmFyIFNhZmVTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2FmZVN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2FmZVN1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICB2YXIgcGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihvYnNlcnZlck9yTmV4dCkgfHwgIW9ic2VydmVyT3JOZXh0KSB7XG4gICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIgPSB7XG4gICAgICAgICAgICAgICAgbmV4dDogKG9ic2VydmVyT3JOZXh0ICE9PSBudWxsICYmIG9ic2VydmVyT3JOZXh0ICE9PSB2b2lkIDAgPyBvYnNlcnZlck9yTmV4dCA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yICE9PSBudWxsICYmIGVycm9yICE9PSB2b2lkIDAgPyBlcnJvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogY29tcGxldGUgIT09IG51bGwgJiYgY29tcGxldGUgIT09IHZvaWQgMCA/IGNvbXBsZXRlIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0XzE7XG4gICAgICAgICAgICBpZiAoX3RoaXMgJiYgY29uZmlnLnVzZURlcHJlY2F0ZWROZXh0Q29udGV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfMSA9IE9iamVjdC5jcmVhdGUob2JzZXJ2ZXJPck5leHQpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRfMS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnVuc3Vic2NyaWJlKCk7IH07XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyID0ge1xuICAgICAgICAgICAgICAgICAgICBuZXh0OiBvYnNlcnZlck9yTmV4dC5uZXh0ICYmIGJpbmQob2JzZXJ2ZXJPck5leHQubmV4dCwgY29udGV4dF8xKSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG9ic2VydmVyT3JOZXh0LmVycm9yICYmIGJpbmQob2JzZXJ2ZXJPck5leHQuZXJyb3IsIGNvbnRleHRfMSksXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBvYnNlcnZlck9yTmV4dC5jb21wbGV0ZSAmJiBiaW5kKG9ic2VydmVyT3JOZXh0LmNvbXBsZXRlLCBjb250ZXh0XzEpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIgPSBvYnNlcnZlck9yTmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBDb25zdW1lck9ic2VydmVyKHBhcnRpYWxPYnNlcnZlcik7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNhZmVTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG5leHBvcnQgeyBTYWZlU3Vic2NyaWJlciB9O1xuZnVuY3Rpb24gaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpIHtcbiAgICBpZiAoY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgY2FwdHVyZUVycm9yKGVycm9yKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlcG9ydFVuaGFuZGxlZEVycm9yKGVycm9yKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZWZhdWx0RXJyb3JIYW5kbGVyKGVycikge1xuICAgIHRocm93IGVycjtcbn1cbmZ1bmN0aW9uIGhhbmRsZVN0b3BwZWROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBzdWJzY3JpYmVyKSB7XG4gICAgdmFyIG9uU3RvcHBlZE5vdGlmaWNhdGlvbiA9IGNvbmZpZy5vblN0b3BwZWROb3RpZmljYXRpb247XG4gICAgb25TdG9wcGVkTm90aWZpY2F0aW9uICYmIHRpbWVvdXRQcm92aWRlci5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9uU3RvcHBlZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIHN1YnNjcmliZXIpOyB9KTtcbn1cbmV4cG9ydCB2YXIgRU1QVFlfT0JTRVJWRVIgPSB7XG4gICAgY2xvc2VkOiB0cnVlLFxuICAgIG5leHQ6IG5vb3AsXG4gICAgZXJyb3I6IGRlZmF1bHRFcnJvckhhbmRsZXIsXG4gICAgY29tcGxldGU6IG5vb3AsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaWJlci5qcy5tYXAiLCJpbXBvcnQgeyBfX3JlYWQsIF9fc3ByZWFkQXJyYXksIF9fdmFsdWVzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgVW5zdWJzY3JpcHRpb25FcnJvciB9IGZyb20gJy4vdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yJztcbmltcG9ydCB7IGFyclJlbW92ZSB9IGZyb20gJy4vdXRpbC9hcnJSZW1vdmUnO1xudmFyIFN1YnNjcmlwdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKGluaXRpYWxUZWFyZG93bikge1xuICAgICAgICB0aGlzLmluaXRpYWxUZWFyZG93biA9IGluaXRpYWxUZWFyZG93bjtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZmluYWxpemVycyA9IG51bGw7XG4gICAgfVxuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlXzEsIF9hLCBlXzIsIF9iO1xuICAgICAgICB2YXIgZXJyb3JzO1xuICAgICAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgICAgIGlmIChfcGFyZW50YWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX3BhcmVudGFnZV8xID0gX192YWx1ZXMoX3BhcmVudGFnZSksIF9wYXJlbnRhZ2VfMV8xID0gX3BhcmVudGFnZV8xLm5leHQoKTsgIV9wYXJlbnRhZ2VfMV8xLmRvbmU7IF9wYXJlbnRhZ2VfMV8xID0gX3BhcmVudGFnZV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IF9wYXJlbnRhZ2VfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudF8xLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9wYXJlbnRhZ2VfMV8xICYmICFfcGFyZW50YWdlXzFfMS5kb25lICYmIChfYSA9IF9wYXJlbnRhZ2VfMS5yZXR1cm4pKSBfYS5jYWxsKF9wYXJlbnRhZ2VfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF9wYXJlbnRhZ2UucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpbml0aWFsRmluYWxpemVyID0gdGhpcy5pbml0aWFsVGVhcmRvd247XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihpbml0aWFsRmluYWxpemVyKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxGaW5hbGl6ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZSBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3IgPyBlLmVycm9ycyA6IFtlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX2ZpbmFsaXplcnMgPSB0aGlzLl9maW5hbGl6ZXJzO1xuICAgICAgICAgICAgaWYgKF9maW5hbGl6ZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmluYWxpemVycyA9IG51bGw7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2ZpbmFsaXplcnNfMSA9IF9fdmFsdWVzKF9maW5hbGl6ZXJzKSwgX2ZpbmFsaXplcnNfMV8xID0gX2ZpbmFsaXplcnNfMS5uZXh0KCk7ICFfZmluYWxpemVyc18xXzEuZG9uZTsgX2ZpbmFsaXplcnNfMV8xID0gX2ZpbmFsaXplcnNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaW5hbGl6ZXIgPSBfZmluYWxpemVyc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWNGaW5hbGl6ZXIoZmluYWxpemVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMgIT09IG51bGwgJiYgZXJyb3JzICE9PSB2b2lkIDAgPyBlcnJvcnMgOiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChlcnJvcnMpKSwgX19yZWFkKGVyci5lcnJvcnMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2ZpbmFsaXplcnNfMV8xICYmICFfZmluYWxpemVyc18xXzEuZG9uZSAmJiAoX2IgPSBfZmluYWxpemVyc18xLnJldHVybikpIF9iLmNhbGwoX2ZpbmFsaXplcnNfMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0ZWFyZG93bikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0ZWFyZG93biAmJiB0ZWFyZG93biAhPT0gdGhpcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgZXhlY0ZpbmFsaXplcih0ZWFyZG93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGVhcmRvd24gaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlYXJkb3duLmNsb3NlZCB8fCB0ZWFyZG93bi5faGFzUGFyZW50KHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGVhcmRvd24uX2FkZFBhcmVudCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKHRoaXMuX2ZpbmFsaXplcnMgPSAoX2EgPSB0aGlzLl9maW5hbGl6ZXJzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSkucHVzaCh0ZWFyZG93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2hhc1BhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIHJldHVybiBfcGFyZW50YWdlID09PSBwYXJlbnQgfHwgKEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkgJiYgX3BhcmVudGFnZS5pbmNsdWRlcyhwYXJlbnQpKTtcbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2FkZFBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkgPyAoX3BhcmVudGFnZS5wdXNoKHBhcmVudCksIF9wYXJlbnRhZ2UpIDogX3BhcmVudGFnZSA/IFtfcGFyZW50YWdlLCBwYXJlbnRdIDogcGFyZW50O1xuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5fcmVtb3ZlUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgaWYgKF9wYXJlbnRhZ2UgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpKSB7XG4gICAgICAgICAgICBhcnJSZW1vdmUoX3BhcmVudGFnZSwgcGFyZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgdmFyIF9maW5hbGl6ZXJzID0gdGhpcy5fZmluYWxpemVycztcbiAgICAgICAgX2ZpbmFsaXplcnMgJiYgYXJyUmVtb3ZlKF9maW5hbGl6ZXJzLCB0ZWFyZG93bik7XG4gICAgICAgIGlmICh0ZWFyZG93biBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGVhcmRvd24uX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLkVNUFRZID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVtcHR5ID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICBlbXB0eS5jbG9zZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZW1wdHk7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gU3Vic2NyaXB0aW9uO1xufSgpKTtcbmV4cG9ydCB7IFN1YnNjcmlwdGlvbiB9O1xuZXhwb3J0IHZhciBFTVBUWV9TVUJTQ1JJUFRJT04gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5leHBvcnQgZnVuY3Rpb24gaXNTdWJzY3JpcHRpb24odmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uIHx8XG4gICAgICAgICh2YWx1ZSAmJiAnY2xvc2VkJyBpbiB2YWx1ZSAmJiBpc0Z1bmN0aW9uKHZhbHVlLnJlbW92ZSkgJiYgaXNGdW5jdGlvbih2YWx1ZS5hZGQpICYmIGlzRnVuY3Rpb24odmFsdWUudW5zdWJzY3JpYmUpKSk7XG59XG5mdW5jdGlvbiBleGVjRmluYWxpemVyKGZpbmFsaXplcikge1xuICAgIGlmIChpc0Z1bmN0aW9uKGZpbmFsaXplcikpIHtcbiAgICAgICAgZmluYWxpemVyKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmaW5hbGl6ZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpcHRpb24uanMubWFwIiwiZXhwb3J0IHZhciBjb25maWcgPSB7XG4gICAgb25VbmhhbmRsZWRFcnJvcjogbnVsbCxcbiAgICBvblN0b3BwZWROb3RpZmljYXRpb246IG51bGwsXG4gICAgUHJvbWlzZTogdW5kZWZpbmVkLFxuICAgIHVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmc6IGZhbHNlLFxuICAgIHVzZURlcHJlY2F0ZWROZXh0Q29udGV4dDogZmFsc2UsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmV4cG9ydCB2YXIgRU1QVFkgPSBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9KTtcbmV4cG9ydCBmdW5jdGlvbiBlbXB0eShzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVyID8gZW1wdHlTY2hlZHVsZWQoc2NoZWR1bGVyKSA6IEVNUFRZO1xufVxuZnVuY3Rpb24gZW1wdHlTY2hlZHVsZWQoc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7IHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9KTsgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbXB0eS5qcy5tYXAiLCJpbXBvcnQgeyBzY2hlZHVsZWQgfSBmcm9tICcuLi9zY2hlZHVsZWQvc2NoZWR1bGVkJztcbmltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4vaW5uZXJGcm9tJztcbmV4cG9ydCBmdW5jdGlvbiBmcm9tKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVyID8gc2NoZWR1bGVkKGlucHV0LCBzY2hlZHVsZXIpIDogaW5uZXJGcm9tKGlucHV0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb20uanMubWFwIiwiaW1wb3J0IHsgX19yZWFkIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJy4uL29wZXJhdG9ycy9tZXJnZU1hcCc7XG5pbXBvcnQgeyBpc0FycmF5TGlrZSB9IGZyb20gJy4uL3V0aWwvaXNBcnJheUxpa2UnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBtYXBPbmVPck1hbnlBcmdzIH0gZnJvbSAnLi4vdXRpbC9tYXBPbmVPck1hbnlBcmdzJztcbnZhciBub2RlRXZlbnRFbWl0dGVyTWV0aG9kcyA9IFsnYWRkTGlzdGVuZXInLCAncmVtb3ZlTGlzdGVuZXInXTtcbnZhciBldmVudFRhcmdldE1ldGhvZHMgPSBbJ2FkZEV2ZW50TGlzdGVuZXInLCAncmVtb3ZlRXZlbnRMaXN0ZW5lciddO1xudmFyIGpxdWVyeU1ldGhvZHMgPSBbJ29uJywgJ29mZiddO1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21FdmVudCh0YXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucywgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICByZXN1bHRTZWxlY3RvciA9IG9wdGlvbnM7XG4gICAgICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChyZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gZnJvbUV2ZW50KHRhcmdldCwgZXZlbnROYW1lLCBvcHRpb25zKS5waXBlKG1hcE9uZU9yTWFueUFyZ3MocmVzdWx0U2VsZWN0b3IpKTtcbiAgICB9XG4gICAgdmFyIF9hID0gX19yZWFkKGlzRXZlbnRUYXJnZXQodGFyZ2V0KVxuICAgICAgICA/IGV2ZW50VGFyZ2V0TWV0aG9kcy5tYXAoZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHsgcmV0dXJuIGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiB0YXJnZXRbbWV0aG9kTmFtZV0oZXZlbnROYW1lLCBoYW5kbGVyLCBvcHRpb25zKTsgfTsgfSlcbiAgICAgICAgOlxuICAgICAgICAgICAgaXNOb2RlU3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KVxuICAgICAgICAgICAgICAgID8gbm9kZUV2ZW50RW1pdHRlck1ldGhvZHMubWFwKHRvQ29tbW9uSGFuZGxlclJlZ2lzdHJ5KHRhcmdldCwgZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICA6IGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICA/IGpxdWVyeU1ldGhvZHMubWFwKHRvQ29tbW9uSGFuZGxlclJlZ2lzdHJ5KHRhcmdldCwgZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgOiBbXSwgMiksIGFkZCA9IF9hWzBdLCByZW1vdmUgPSBfYVsxXTtcbiAgICBpZiAoIWFkZCkge1xuICAgICAgICBpZiAoaXNBcnJheUxpa2UodGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlTWFwKGZ1bmN0aW9uIChzdWJUYXJnZXQpIHsgcmV0dXJuIGZyb21FdmVudChzdWJUYXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucyk7IH0pKGlubmVyRnJvbSh0YXJnZXQpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWFkZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGV2ZW50IHRhcmdldCcpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlci5uZXh0KDEgPCBhcmdzLmxlbmd0aCA/IGFyZ3MgOiBhcmdzWzBdKTtcbiAgICAgICAgfTtcbiAgICAgICAgYWRkKGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVtb3ZlKGhhbmRsZXIpOyB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdG9Db21tb25IYW5kbGVyUmVnaXN0cnkodGFyZ2V0LCBldmVudE5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHsgcmV0dXJuIGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiB0YXJnZXRbbWV0aG9kTmFtZV0oZXZlbnROYW1lLCBoYW5kbGVyKTsgfTsgfTtcbn1cbmZ1bmN0aW9uIGlzTm9kZVN0eWxlRXZlbnRFbWl0dGVyKHRhcmdldCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKHRhcmdldC5hZGRMaXN0ZW5lcikgJiYgaXNGdW5jdGlvbih0YXJnZXQucmVtb3ZlTGlzdGVuZXIpO1xufVxuZnVuY3Rpb24gaXNKUXVlcnlTdHlsZUV2ZW50RW1pdHRlcih0YXJnZXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbih0YXJnZXQub24pICYmIGlzRnVuY3Rpb24odGFyZ2V0Lm9mZik7XG59XG5mdW5jdGlvbiBpc0V2ZW50VGFyZ2V0KHRhcmdldCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKHRhcmdldC5hZGRFdmVudExpc3RlbmVyKSAmJiBpc0Z1bmN0aW9uKHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb21FdmVudC5qcy5tYXAiLCJpbXBvcnQgeyBfX2FzeW5jVmFsdWVzLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yLCBfX3ZhbHVlcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuLi91dGlsL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4uL3V0aWwvaXNQcm9taXNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzSW50ZXJvcE9ic2VydmFibGUgfSBmcm9tICcuLi91dGlsL2lzSW50ZXJvcE9ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNBc3luY0l0ZXJhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0FzeW5jSXRlcmFibGUnO1xuaW1wb3J0IHsgY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IgfSBmcm9tICcuLi91dGlsL3Rocm93VW5vYnNlcnZhYmxlRXJyb3InO1xuaW1wb3J0IHsgaXNJdGVyYWJsZSB9IGZyb20gJy4uL3V0aWwvaXNJdGVyYWJsZSc7XG5pbXBvcnQgeyBpc1JlYWRhYmxlU3RyZWFtTGlrZSwgcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvciB9IGZyb20gJy4uL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2UnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyByZXBvcnRVbmhhbmRsZWRFcnJvciB9IGZyb20gJy4uL3V0aWwvcmVwb3J0VW5oYW5kbGVkRXJyb3InO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4uL3N5bWJvbC9vYnNlcnZhYmxlJztcbmV4cG9ydCBmdW5jdGlvbiBpbm5lckZyb20oaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGlzSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUludGVyb3BPYnNlcnZhYmxlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUFycmF5TGlrZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJvbWlzZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tUHJvbWlzZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXN5bmNJdGVyYWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tQXN5bmNJdGVyYWJsZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUl0ZXJhYmxlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbVJlYWRhYmxlU3RyZWFtTGlrZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IoaW5wdXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21JbnRlcm9wT2JzZXJ2YWJsZShvYmopIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIG9icyA9IG9ialtTeW1ib2xfb2JzZXJ2YWJsZV0oKTtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob2JzLnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBvYnMuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb3ZpZGVkIG9iamVjdCBkb2VzIG5vdCBjb3JyZWN0bHkgaW1wbGVtZW50IFN5bWJvbC5vYnNlcnZhYmxlJyk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUFycmF5TGlrZShhcnJheSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aCAmJiAhc3Vic2NyaWJlci5jbG9zZWQ7IGkrKykge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbVByb21pc2UocHJvbWlzZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnIpOyB9KVxuICAgICAgICAgICAgLnRoZW4obnVsbCwgcmVwb3J0VW5oYW5kbGVkRXJyb3IpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21JdGVyYWJsZShpdGVyYWJsZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGl0ZXJhYmxlXzEgPSBfX3ZhbHVlcyhpdGVyYWJsZSksIGl0ZXJhYmxlXzFfMSA9IGl0ZXJhYmxlXzEubmV4dCgpOyAhaXRlcmFibGVfMV8xLmRvbmU7IGl0ZXJhYmxlXzFfMSA9IGl0ZXJhYmxlXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gaXRlcmFibGVfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZV8xXzEgJiYgIWl0ZXJhYmxlXzFfMS5kb25lICYmIChfYSA9IGl0ZXJhYmxlXzEucmV0dXJuKSkgX2EuY2FsbChpdGVyYWJsZV8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUFzeW5jSXRlcmFibGUoYXN5bmNJdGVyYWJsZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBwcm9jZXNzKGFzeW5jSXRlcmFibGUsIHN1YnNjcmliZXIpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbVJlYWRhYmxlU3RyZWFtTGlrZShyZWFkYWJsZVN0cmVhbSkge1xuICAgIHJldHVybiBmcm9tQXN5bmNJdGVyYWJsZShyZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yKHJlYWRhYmxlU3RyZWFtKSk7XG59XG5mdW5jdGlvbiBwcm9jZXNzKGFzeW5jSXRlcmFibGUsIHN1YnNjcmliZXIpIHtcbiAgICB2YXIgYXN5bmNJdGVyYWJsZV8xLCBhc3luY0l0ZXJhYmxlXzFfMTtcbiAgICB2YXIgZV8yLCBfYTtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZSwgZV8yXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMCwgNSwgNiwgMTFdKTtcbiAgICAgICAgICAgICAgICAgICAgYXN5bmNJdGVyYWJsZV8xID0gX19hc3luY1ZhbHVlcyhhc3luY0l0ZXJhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFs0LCBhc3luY0l0ZXJhYmxlXzEubmV4dCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGFzeW5jSXRlcmFibGVfMV8xID0gX2Iuc2VudCgpLCAhYXN5bmNJdGVyYWJsZV8xXzEuZG9uZSkpIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gYXN5bmNJdGVyYWJsZV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzMsIDFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFszLCAxMV07XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBlXzJfMSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZV8yID0geyBlcnJvcjogZV8yXzEgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxMV07XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzYsICwgOSwgMTBdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYXN5bmNJdGVyYWJsZV8xXzEgJiYgIWFzeW5jSXRlcmFibGVfMV8xLmRvbmUgJiYgKF9hID0gYXN5bmNJdGVyYWJsZV8xLnJldHVybikpKSByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIF9hLmNhbGwoYXN5bmNJdGVyYWJsZV8xKV07XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gODtcbiAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMywgMTBdO1xuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6IHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlubmVyRnJvbS5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBhc3luYyBhcyBhc3luY1NjaGVkdWxlciB9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5pbXBvcnQgeyBpc1NjaGVkdWxlciB9IGZyb20gJy4uL3V0aWwvaXNTY2hlZHVsZXInO1xuaW1wb3J0IHsgaXNWYWxpZERhdGUgfSBmcm9tICcuLi91dGlsL2lzRGF0ZSc7XG5leHBvcnQgZnVuY3Rpb24gdGltZXIoZHVlVGltZSwgaW50ZXJ2YWxPclNjaGVkdWxlciwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKGR1ZVRpbWUgPT09IHZvaWQgMCkgeyBkdWVUaW1lID0gMDsgfVxuICAgIGlmIChzY2hlZHVsZXIgPT09IHZvaWQgMCkgeyBzY2hlZHVsZXIgPSBhc3luY1NjaGVkdWxlcjsgfVxuICAgIHZhciBpbnRlcnZhbER1cmF0aW9uID0gLTE7XG4gICAgaWYgKGludGVydmFsT3JTY2hlZHVsZXIgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNTY2hlZHVsZXIoaW50ZXJ2YWxPclNjaGVkdWxlcikpIHtcbiAgICAgICAgICAgIHNjaGVkdWxlciA9IGludGVydmFsT3JTY2hlZHVsZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbnRlcnZhbER1cmF0aW9uID0gaW50ZXJ2YWxPclNjaGVkdWxlcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGR1ZSA9IGlzVmFsaWREYXRlKGR1ZVRpbWUpID8gK2R1ZVRpbWUgLSBzY2hlZHVsZXIubm93KCkgOiBkdWVUaW1lO1xuICAgICAgICBpZiAoZHVlIDwgMCkge1xuICAgICAgICAgICAgZHVlID0gMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbiA9IDA7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChuKyspO1xuICAgICAgICAgICAgICAgIGlmICgwIDw9IGludGVydmFsRHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh1bmRlZmluZWQsIGludGVydmFsRHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZHVlKTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVyLmpzLm1hcCIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgb25OZXh0LCBvbkNvbXBsZXRlLCBvbkVycm9yLCBvbkZpbmFsaXplKSB7XG4gICAgcmV0dXJuIG5ldyBPcGVyYXRvclN1YnNjcmliZXIoZGVzdGluYXRpb24sIG9uTmV4dCwgb25Db21wbGV0ZSwgb25FcnJvciwgb25GaW5hbGl6ZSk7XG59XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoT3BlcmF0b3JTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE9wZXJhdG9yU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgb25OZXh0LCBvbkNvbXBsZXRlLCBvbkVycm9yLCBvbkZpbmFsaXplLCBzaG91bGRVbnN1YnNjcmliZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMub25GaW5hbGl6ZSA9IG9uRmluYWxpemU7XG4gICAgICAgIF90aGlzLnNob3VsZFVuc3Vic2NyaWJlID0gc2hvdWxkVW5zdWJzY3JpYmU7XG4gICAgICAgIF90aGlzLl9uZXh0ID0gb25OZXh0XG4gICAgICAgICAgICA/IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IF9zdXBlci5wcm90b3R5cGUuX25leHQ7XG4gICAgICAgIF90aGlzLl9lcnJvciA9IG9uRXJyb3JcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fZXJyb3I7XG4gICAgICAgIF90aGlzLl9jb21wbGV0ZSA9IG9uQ29tcGxldGVcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fY29tcGxldGU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT3BlcmF0b3JTdWJzY3JpYmVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkVW5zdWJzY3JpYmUgfHwgdGhpcy5zaG91bGRVbnN1YnNjcmliZSgpKSB7XG4gICAgICAgICAgICB2YXIgY2xvc2VkXzEgPSB0aGlzLmNsb3NlZDtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICFjbG9zZWRfMSAmJiAoKF9hID0gdGhpcy5vbkZpbmFsaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPcGVyYXRvclN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbmV4cG9ydCB7IE9wZXJhdG9yU3Vic2NyaWJlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T3BlcmF0b3JTdWJzY3JpYmVyLmpzLm1hcCIsImltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi9PcGVyYXRvclN1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gcHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4KyspICYmIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7IH0pKTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlci5qcy5tYXAiLCJpbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBtYXAocHJvamVjdCwgdGhpc0FyZykge1xuICAgIHJldHVybiBvcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQocHJvamVjdC5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCsrKSk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcC5qcy5tYXAiLCJpbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBleGVjdXRlU2NoZWR1bGUgfSBmcm9tICcuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZSc7XG5pbXBvcnQgeyBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIgfSBmcm9tICcuL09wZXJhdG9yU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VJbnRlcm5hbHMoc291cmNlLCBzdWJzY3JpYmVyLCBwcm9qZWN0LCBjb25jdXJyZW50LCBvbkJlZm9yZU5leHQsIGV4cGFuZCwgaW5uZXJTdWJTY2hlZHVsZXIsIGFkZGl0aW9uYWxGaW5hbGl6ZXIpIHtcbiAgICB2YXIgYnVmZmVyID0gW107XG4gICAgdmFyIGFjdGl2ZSA9IDA7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgIHZhciBjaGVja0NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNDb21wbGV0ZSAmJiAhYnVmZmVyLmxlbmd0aCAmJiAhYWN0aXZlKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBvdXRlck5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIChhY3RpdmUgPCBjb25jdXJyZW50ID8gZG9Jbm5lclN1Yih2YWx1ZSkgOiBidWZmZXIucHVzaCh2YWx1ZSkpOyB9O1xuICAgIHZhciBkb0lubmVyU3ViID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGV4cGFuZCAmJiBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICBhY3RpdmUrKztcbiAgICAgICAgdmFyIGlubmVyQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgaW5uZXJGcm9tKHByb2plY3QodmFsdWUsIGluZGV4KyspKS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uIChpbm5lclZhbHVlKSB7XG4gICAgICAgICAgICBvbkJlZm9yZU5leHQgPT09IG51bGwgfHwgb25CZWZvcmVOZXh0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvbkJlZm9yZU5leHQoaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoZXhwYW5kKSB7XG4gICAgICAgICAgICAgICAgb3V0ZXJOZXh0KGlubmVyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGlubmVyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpbm5lckNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgfSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaW5uZXJDb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZS0tO1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXJlZFZhbHVlID0gYnVmZmVyLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXJTdWJTY2hlZHVsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgaW5uZXJTdWJTY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvSW5uZXJTdWIoYnVmZmVyZWRWYWx1ZSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9Jbm5lclN1YihidWZmZXJlZFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGJ1ZmZlci5sZW5ndGggJiYgYWN0aXZlIDwgY29uY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2xvb3BfMSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBvdXRlck5leHQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXNDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIGNoZWNrQ29tcGxldGUoKTtcbiAgICB9KSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWRkaXRpb25hbEZpbmFsaXplciA9PT0gbnVsbCB8fCBhZGRpdGlvbmFsRmluYWxpemVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhZGRpdGlvbmFsRmluYWxpemVyKCk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlSW50ZXJuYWxzLmpzLm1hcCIsImltcG9ydCB7IG1hcCB9IGZyb20gJy4vbWFwJztcbmltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4uL29ic2VydmFibGUvaW5uZXJGcm9tJztcbmltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgbWVyZ2VJbnRlcm5hbHMgfSBmcm9tICcuL21lcmdlSW50ZXJuYWxzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlTWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yLCBjb25jdXJyZW50KSB7XG4gICAgaWYgKGNvbmN1cnJlbnQgPT09IHZvaWQgMCkgeyBjb25jdXJyZW50ID0gSW5maW5pdHk7IH1cbiAgICBpZiAoaXNGdW5jdGlvbihyZXN1bHRTZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlTWFwKGZ1bmN0aW9uIChhLCBpKSB7IHJldHVybiBtYXAoZnVuY3Rpb24gKGIsIGlpKSB7IHJldHVybiByZXN1bHRTZWxlY3RvcihhLCBiLCBpLCBpaSk7IH0pKGlubmVyRnJvbShwcm9qZWN0KGEsIGkpKSk7IH0sIGNvbmN1cnJlbnQpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgcmVzdWx0U2VsZWN0b3IgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvbmN1cnJlbnQgPSByZXN1bHRTZWxlY3RvcjtcbiAgICB9XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikgeyByZXR1cm4gbWVyZ2VJbnRlcm5hbHMoc291cmNlLCBzdWJzY3JpYmVyLCBwcm9qZWN0LCBjb25jdXJyZW50KTsgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZU1hcC5qcy5tYXAiLCJpbXBvcnQgeyBleGVjdXRlU2NoZWR1bGUgfSBmcm9tICcuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZSc7XG5pbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlT24oc2NoZWR1bGVyLCBkZWxheSkge1xuICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgIHJldHVybiBvcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLm5leHQodmFsdWUpOyB9LCBkZWxheSk7IH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTsgfSwgZGVsYXkpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLmVycm9yKGVycik7IH0sIGRlbGF5KTsgfSkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2ZU9uLmpzLm1hcCIsImltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuZXhwb3J0IGZ1bmN0aW9uIHN1YnNjcmliZU9uKHNjaGVkdWxlciwgZGVsYXkpIHtcbiAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpOyB9LCBkZWxheSkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3Vic2NyaWJlT24uanMubWFwIiwiaW1wb3J0IHsgaW5uZXJGcm9tIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9pbm5lckZyb20nO1xuaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5pbXBvcnQgeyBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIgfSBmcm9tICcuL09wZXJhdG9yU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoTWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaW5uZXJTdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgdmFyIGlzQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGNoZWNrQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpc0NvbXBsZXRlICYmICFpbm5lclN1YnNjcmliZXIgJiYgc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9O1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlubmVyU3Vic2NyaWJlciA9PT0gbnVsbCB8fCBpbm5lclN1YnNjcmliZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGlubmVyU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdmFyIGlubmVySW5kZXggPSAwO1xuICAgICAgICAgICAgdmFyIG91dGVySW5kZXggPSBpbmRleCsrO1xuICAgICAgICAgICAgaW5uZXJGcm9tKHByb2plY3QodmFsdWUsIG91dGVySW5kZXgpKS5zdWJzY3JpYmUoKGlubmVyU3Vic2NyaWJlciA9IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAoaW5uZXJWYWx1ZSkgeyByZXR1cm4gc3Vic2NyaWJlci5uZXh0KHJlc3VsdFNlbGVjdG9yID8gcmVzdWx0U2VsZWN0b3IodmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgrKykgOiBpbm5lclZhbHVlKTsgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlubmVyU3Vic2NyaWJlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXNDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICBjaGVja0NvbXBsZXRlKCk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXRjaE1hcC5qcy5tYXAiLCJpbXBvcnQgeyBFTVBUWSB9IGZyb20gJy4uL29ic2VydmFibGUvZW1wdHknO1xuaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5pbXBvcnQgeyBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIgfSBmcm9tICcuL09wZXJhdG9yU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gdGFrZShjb3VudCkge1xuICAgIHJldHVybiBjb3VudCA8PSAwXG4gICAgICAgID9cbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIEVNUFRZOyB9XG4gICAgICAgIDogb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIgc2VlbiA9IDA7XG4gICAgICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoKytzZWVuIDw9IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA8PSBzZWVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFrZS5qcy5tYXAiLCJpbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiB0YWtlV2hpbGUocHJlZGljYXRlLCBpbmNsdXNpdmUpIHtcbiAgICBpZiAoaW5jbHVzaXZlID09PSB2b2lkIDApIHsgaW5jbHVzaXZlID0gZmFsc2U7IH1cbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgrKyk7XG4gICAgICAgICAgICAocmVzdWx0IHx8IGluY2x1c2l2ZSkgJiYgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICFyZXN1bHQgJiYgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YWtlV2hpbGUuanMubWFwIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnLi4vdXRpbC9pZGVudGl0eSc7XG5leHBvcnQgZnVuY3Rpb24gdGFwKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICB2YXIgdGFwT2JzZXJ2ZXIgPSBpc0Z1bmN0aW9uKG9ic2VydmVyT3JOZXh0KSB8fCBlcnJvciB8fCBjb21wbGV0ZVxuICAgICAgICA/XG4gICAgICAgICAgICB7IG5leHQ6IG9ic2VydmVyT3JOZXh0LCBlcnJvcjogZXJyb3IsIGNvbXBsZXRlOiBjb21wbGV0ZSB9XG4gICAgICAgIDogb2JzZXJ2ZXJPck5leHQ7XG4gICAgcmV0dXJuIHRhcE9ic2VydmVyXG4gICAgICAgID8gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAoX2EgPSB0YXBPYnNlcnZlci5zdWJzY3JpYmUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRhcE9ic2VydmVyKTtcbiAgICAgICAgICAgIHZhciBpc1Vuc3ViID0gdHJ1ZTtcbiAgICAgICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAoX2EgPSB0YXBPYnNlcnZlci5uZXh0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0YXBPYnNlcnZlciwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlzVW5zdWIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAoX2EgPSB0YXBPYnNlcnZlci5jb21wbGV0ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGFwT2JzZXJ2ZXIpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgaXNVbnN1YiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIChfYSA9IHRhcE9ic2VydmVyLmVycm9yKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0YXBPYnNlcnZlciwgZXJyKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbnN1Yikge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSB0YXBPYnNlcnZlci51bnN1YnNjcmliZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGFwT2JzZXJ2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAoX2IgPSB0YXBPYnNlcnZlci5maW5hbGl6ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwodGFwT2JzZXJ2ZXIpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KVxuICAgICAgICA6XG4gICAgICAgICAgICBpZGVudGl0eTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRhcC5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVBcnJheShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGlucHV0W2krK10pO1xuICAgICAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZUFycmF5LmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGV4ZWN1dGVTY2hlZHVsZSB9IGZyb20gJy4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZUFzeW5jSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJdGVyYWJsZSBjYW5ub3QgYmUgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaW5wdXRbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCk7XG4gICAgICAgICAgICBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAwLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZUFzeW5jSXRlcmFibGUuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgZXhlY3V0ZVNjaGVkdWxlIH0gZnJvbSAnLi4vdXRpbC9leGVjdXRlU2NoZWR1bGUnO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaXRlcmF0b3I7XG4gICAgICAgIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yID0gaW5wdXRbU3ltYm9sX2l0ZXJhdG9yXSgpO1xuICAgICAgICAgICAgZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIGRvbmU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gaXRlcmF0b3IubmV4dCgpLCB2YWx1ZSA9IF9hLnZhbHVlLCBkb25lID0gX2EuZG9uZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNGdW5jdGlvbihpdGVyYXRvciA9PT0gbnVsbCB8fCBpdGVyYXRvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaXRlcmF0b3IucmV0dXJuKSAmJiBpdGVyYXRvci5yZXR1cm4oKTsgfTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlSXRlcmFibGUuanMubWFwIiwiaW1wb3J0IHsgaW5uZXJGcm9tIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9pbm5lckZyb20nO1xuaW1wb3J0IHsgb2JzZXJ2ZU9uIH0gZnJvbSAnLi4vb3BlcmF0b3JzL29ic2VydmVPbic7XG5pbXBvcnQgeyBzdWJzY3JpYmVPbiB9IGZyb20gJy4uL29wZXJhdG9ycy9zdWJzY3JpYmVPbic7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVPYnNlcnZhYmxlKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gaW5uZXJGcm9tKGlucHV0KS5waXBlKHN1YnNjcmliZU9uKHNjaGVkdWxlciksIG9ic2VydmVPbihzY2hlZHVsZXIpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlT2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBvYnNlcnZlT24gfSBmcm9tICcuLi9vcGVyYXRvcnMvb2JzZXJ2ZU9uJztcbmltcG9ydCB7IHN1YnNjcmliZU9uIH0gZnJvbSAnLi4vb3BlcmF0b3JzL3N1YnNjcmliZU9uJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZVByb21pc2UoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBpbm5lckZyb20oaW5wdXQpLnBpcGUoc3Vic2NyaWJlT24oc2NoZWR1bGVyKSwgb2JzZXJ2ZU9uKHNjaGVkdWxlcikpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVQcm9taXNlLmpzLm1hcCIsImltcG9ydCB7IHNjaGVkdWxlQXN5bmNJdGVyYWJsZSB9IGZyb20gJy4vc2NoZWR1bGVBc3luY0l0ZXJhYmxlJztcbmltcG9ydCB7IHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IgfSBmcm9tICcuLi91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIHNjaGVkdWxlQXN5bmNJdGVyYWJsZShyZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yKGlucHV0KSwgc2NoZWR1bGVyKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlLmpzLm1hcCIsImltcG9ydCB7IHNjaGVkdWxlT2JzZXJ2YWJsZSB9IGZyb20gJy4vc2NoZWR1bGVPYnNlcnZhYmxlJztcbmltcG9ydCB7IHNjaGVkdWxlUHJvbWlzZSB9IGZyb20gJy4vc2NoZWR1bGVQcm9taXNlJztcbmltcG9ydCB7IHNjaGVkdWxlQXJyYXkgfSBmcm9tICcuL3NjaGVkdWxlQXJyYXknO1xuaW1wb3J0IHsgc2NoZWR1bGVJdGVyYWJsZSB9IGZyb20gJy4vc2NoZWR1bGVJdGVyYWJsZSc7XG5pbXBvcnQgeyBzY2hlZHVsZUFzeW5jSXRlcmFibGUgfSBmcm9tICcuL3NjaGVkdWxlQXN5bmNJdGVyYWJsZSc7XG5pbXBvcnQgeyBpc0ludGVyb3BPYnNlcnZhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4uL3V0aWwvaXNQcm9taXNlJztcbmltcG9ydCB7IGlzQXJyYXlMaWtlIH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5TGlrZSc7XG5pbXBvcnQgeyBpc0l0ZXJhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0l0ZXJhYmxlJztcbmltcG9ydCB7IGlzQXN5bmNJdGVyYWJsZSB9IGZyb20gJy4uL3V0aWwvaXNBc3luY0l0ZXJhYmxlJztcbmltcG9ydCB7IGNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yIH0gZnJvbSAnLi4vdXRpbC90aHJvd1Vub2JzZXJ2YWJsZUVycm9yJztcbmltcG9ydCB7IGlzUmVhZGFibGVTdHJlYW1MaWtlIH0gZnJvbSAnLi4vdXRpbC9pc1JlYWRhYmxlU3RyZWFtTGlrZSc7XG5pbXBvcnQgeyBzY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZSB9IGZyb20gJy4vc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UnO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlZChpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGlzSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVPYnNlcnZhYmxlKGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5TGlrZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUFycmF5KGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1Byb21pc2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVQcm9taXNlKGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FzeW5jSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVBc3luY0l0ZXJhYmxlKGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0l0ZXJhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IGNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yKGlucHV0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlZC5qcy5tYXAiLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG52YXIgQWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgfVxuICAgIEFjdGlvbi5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBBY3Rpb247XG59KFN1YnNjcmlwdGlvbikpO1xuZXhwb3J0IHsgQWN0aW9uIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BY3Rpb24uanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL0FjdGlvbic7XG5pbXBvcnQgeyBpbnRlcnZhbFByb3ZpZGVyIH0gZnJvbSAnLi9pbnRlcnZhbFByb3ZpZGVyJztcbmltcG9ydCB7IGFyclJlbW92ZSB9IGZyb20gJy4uL3V0aWwvYXJyUmVtb3ZlJztcbnZhciBBc3luY0FjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFzeW5jQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFzeW5jQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIHdvcmspIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgX3RoaXMud29yayA9IHdvcms7XG4gICAgICAgIF90aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdmFyIGlkID0gdGhpcy5pZDtcbiAgICAgICAgdmFyIHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGVuZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQgfHwgdGhpcy5yZXF1ZXN0QXN5bmNJZChzY2hlZHVsZXIsIHRoaXMuaWQsIGRlbGF5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBfaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gaW50ZXJ2YWxQcm92aWRlci5zZXRJbnRlcnZhbChzY2hlZHVsZXIuZmx1c2guYmluZChzY2hlZHVsZXIsIHRoaXMpLCBkZWxheSk7XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUucmVjeWNsZUFzeW5jSWQgPSBmdW5jdGlvbiAoX3NjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAoZGVsYXkgIT0gbnVsbCAmJiB0aGlzLmRlbGF5ID09PSBkZWxheSAmJiB0aGlzLnBlbmRpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICAgICAgaW50ZXJ2YWxQcm92aWRlci5jbGVhckludGVydmFsKGlkKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2V4ZWN1dGluZyBhIGNhbmNlbGxlZCBhY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yID0gdGhpcy5fZXhlY3V0ZShzdGF0ZSwgZGVsYXkpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBlbmRpbmcgPT09IGZhbHNlICYmIHRoaXMuaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQodGhpcy5zY2hlZHVsZXIsIHRoaXMuaWQsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUuX2V4ZWN1dGUgPSBmdW5jdGlvbiAoc3RhdGUsIF9kZWxheSkge1xuICAgICAgICB2YXIgZXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3JWYWx1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMud29yayhzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgZXJyb3JWYWx1ZSA9IGUgPyBlIDogbmV3IEVycm9yKCdTY2hlZHVsZWQgYWN0aW9uIHRocmV3IGZhbHN5IGVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yZWQpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHJldHVybiBlcnJvclZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMsIGlkID0gX2EuaWQsIHNjaGVkdWxlciA9IF9hLnNjaGVkdWxlcjtcbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gc2NoZWR1bGVyLmFjdGlvbnM7XG4gICAgICAgICAgICB0aGlzLndvcmsgPSB0aGlzLnN0YXRlID0gdGhpcy5zY2hlZHVsZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBhcnJSZW1vdmUoYWN0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSB0aGlzLnJlY3ljbGVBc3luY0lkKHNjaGVkdWxlciwgaWQsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWxheSA9IG51bGw7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBc3luY0FjdGlvbjtcbn0oQWN0aW9uKSk7XG5leHBvcnQgeyBBc3luY0FjdGlvbiB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXN5bmNBY3Rpb24uanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xudmFyIEFzeW5jU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXN5bmNTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXN5bmNTY2hlZHVsZXIoU2NoZWR1bGVyQWN0aW9uLCBub3cpIHtcbiAgICAgICAgaWYgKG5vdyA9PT0gdm9pZCAwKSB7IG5vdyA9IFNjaGVkdWxlci5ub3c7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU2NoZWR1bGVyQWN0aW9uLCBub3cpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmFjdGlvbnMgPSBbXTtcbiAgICAgICAgX3RoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5fc2NoZWR1bGVkID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFzeW5jU2NoZWR1bGVyLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoKGFjdGlvbiA9IGFjdGlvbnMuc2hpZnQoKSkpO1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB3aGlsZSAoKGFjdGlvbiA9IGFjdGlvbnMuc2hpZnQoKSkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNTY2hlZHVsZXI7XG59KFNjaGVkdWxlcikpO1xuZXhwb3J0IHsgQXN5bmNTY2hlZHVsZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzeW5jU2NoZWR1bGVyLmpzLm1hcCIsImltcG9ydCB7IEFzeW5jQWN0aW9uIH0gZnJvbSAnLi9Bc3luY0FjdGlvbic7XG5pbXBvcnQgeyBBc3luY1NjaGVkdWxlciB9IGZyb20gJy4vQXN5bmNTY2hlZHVsZXInO1xuZXhwb3J0IHZhciBhc3luY1NjaGVkdWxlciA9IG5ldyBBc3luY1NjaGVkdWxlcihBc3luY0FjdGlvbik7XG5leHBvcnQgdmFyIGFzeW5jID0gYXN5bmNTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3luYy5qcy5tYXAiLCJleHBvcnQgdmFyIGRhdGVUaW1lc3RhbXBQcm92aWRlciA9IHtcbiAgICBub3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChkYXRlVGltZXN0YW1wUHJvdmlkZXIuZGVsZWdhdGUgfHwgRGF0ZSkubm93KCk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGVUaW1lc3RhbXBQcm92aWRlci5qcy5tYXAiLCJpbXBvcnQgeyBfX3JlYWQsIF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmV4cG9ydCB2YXIgaW50ZXJ2YWxQcm92aWRlciA9IHtcbiAgICBzZXRJbnRlcnZhbDogZnVuY3Rpb24gKGhhbmRsZXIsIHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbGVnYXRlID0gaW50ZXJ2YWxQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5zZXRJbnRlcnZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlLnNldEludGVydmFsLmFwcGx5KGRlbGVnYXRlLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldEludGVydmFsLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgIH0sXG4gICAgY2xlYXJJbnRlcnZhbDogZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBpbnRlcnZhbFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuY2xlYXJJbnRlcnZhbCkgfHwgY2xlYXJJbnRlcnZhbCkoaGFuZGxlKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlOiB1bmRlZmluZWQsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJ2YWxQcm92aWRlci5qcy5tYXAiLCJpbXBvcnQgeyBfX3JlYWQsIF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmV4cG9ydCB2YXIgdGltZW91dFByb3ZpZGVyID0ge1xuICAgIHNldFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGVyLCB0aW1lb3V0KSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IHRpbWVvdXRQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5zZXRUaW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuc2V0VGltZW91dC5hcHBseShkZWxlZ2F0ZSwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0LmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbaGFuZGxlciwgdGltZW91dF0sIF9fcmVhZChhcmdzKSkpO1xuICAgIH0sXG4gICAgY2xlYXJUaW1lb3V0OiBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IHRpbWVvdXRQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgcmV0dXJuICgoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLmNsZWFyVGltZW91dCkgfHwgY2xlYXJUaW1lb3V0KShoYW5kbGUpO1xuICAgIH0sXG4gICAgZGVsZWdhdGU6IHVuZGVmaW5lZCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lb3V0UHJvdmlkZXIuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGdldFN5bWJvbEl0ZXJhdG9yKCkge1xuICAgIGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nIHx8ICFTeW1ib2wuaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuICdAQGl0ZXJhdG9yJztcbiAgICB9XG4gICAgcmV0dXJuIFN5bWJvbC5pdGVyYXRvcjtcbn1cbmV4cG9ydCB2YXIgaXRlcmF0b3IgPSBnZXRTeW1ib2xJdGVyYXRvcigpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXRlcmF0b3IuanMubWFwIiwiZXhwb3J0IHZhciBvYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHsgcmV0dXJuICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5vYnNlcnZhYmxlKSB8fCAnQEBvYnNlcnZhYmxlJzsgfSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgY3JlYXRlRXJyb3JDbGFzcyB9IGZyb20gJy4vY3JlYXRlRXJyb3JDbGFzcyc7XG5leHBvcnQgdmFyIFVuc3Vic2NyaXB0aW9uRXJyb3IgPSBjcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gVW5zdWJzY3JpcHRpb25FcnJvckltcGwoZXJyb3JzKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyb3JzXG4gICAgICAgICAgICA/IGVycm9ycy5sZW5ndGggKyBcIiBlcnJvcnMgb2NjdXJyZWQgZHVyaW5nIHVuc3Vic2NyaXB0aW9uOlxcblwiICsgZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyLCBpKSB7IHJldHVybiBpICsgMSArIFwiKSBcIiArIGVyci50b1N0cmluZygpOyB9KS5qb2luKCdcXG4gICcpXG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICB0aGlzLm5hbWUgPSAnVW5zdWJzY3JpcHRpb25FcnJvcic7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3Vic2NyaXB0aW9uRXJyb3IuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGFyclJlbW92ZShhcnIsIGl0ZW0pIHtcbiAgICBpZiAoYXJyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGFyci5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAwIDw9IGluZGV4ICYmIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFyclJlbW92ZS5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRXJyb3JDbGFzcyhjcmVhdGVJbXBsKSB7XG4gICAgdmFyIF9zdXBlciA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICBFcnJvci5jYWxsKGluc3RhbmNlKTtcbiAgICAgICAgaW5zdGFuY2Uuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICB9O1xuICAgIHZhciBjdG9yRnVuYyA9IGNyZWF0ZUltcGwoX3N1cGVyKTtcbiAgICBjdG9yRnVuYy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgY3RvckZ1bmMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvckZ1bmM7XG4gICAgcmV0dXJuIGN0b3JGdW5jO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JlYXRlRXJyb3JDbGFzcy5qcy5tYXAiLCJpbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xudmFyIGNvbnRleHQgPSBudWxsO1xuZXhwb3J0IGZ1bmN0aW9uIGVycm9yQ29udGV4dChjYikge1xuICAgIGlmIChjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICB2YXIgaXNSb290ID0gIWNvbnRleHQ7XG4gICAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSB7IGVycm9yVGhyb3duOiBmYWxzZSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYigpO1xuICAgICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBjb250ZXh0LCBlcnJvclRocm93biA9IF9hLmVycm9yVGhyb3duLCBlcnJvciA9IF9hLmVycm9yO1xuICAgICAgICAgICAgY29udGV4dCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY2IoKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY2FwdHVyZUVycm9yKGVycikge1xuICAgIGlmIChjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZyAmJiBjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuZXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICBjb250ZXh0LmVycm9yID0gZXJyO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9yQ29udGV4dC5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gZXhlY3V0ZVNjaGVkdWxlKHBhcmVudFN1YnNjcmlwdGlvbiwgc2NoZWR1bGVyLCB3b3JrLCBkZWxheSwgcmVwZWF0KSB7XG4gICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgaWYgKHJlcGVhdCA9PT0gdm9pZCAwKSB7IHJlcGVhdCA9IGZhbHNlOyB9XG4gICAgdmFyIHNjaGVkdWxlU3Vic2NyaXB0aW9uID0gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd29yaygpO1xuICAgICAgICBpZiAocmVwZWF0KSB7XG4gICAgICAgICAgICBwYXJlbnRTdWJzY3JpcHRpb24uYWRkKHRoaXMuc2NoZWR1bGUobnVsbCwgZGVsYXkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH0sIGRlbGF5KTtcbiAgICBwYXJlbnRTdWJzY3JpcHRpb24uYWRkKHNjaGVkdWxlU3Vic2NyaXB0aW9uKTtcbiAgICBpZiAoIXJlcGVhdCkge1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVTdWJzY3JpcHRpb247XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhlY3V0ZVNjaGVkdWxlLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gICAgcmV0dXJuIHg7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZGVudGl0eS5qcy5tYXAiLCJleHBvcnQgdmFyIGlzQXJyYXlMaWtlID0gKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICYmIHR5cGVvZiB4Lmxlbmd0aCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHggIT09ICdmdW5jdGlvbic7IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBcnJheUxpa2UuanMubWFwIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gaXNBc3luY0l0ZXJhYmxlKG9iaikge1xuICAgIHJldHVybiBTeW1ib2wuYXN5bmNJdGVyYXRvciAmJiBpc0Z1bmN0aW9uKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9ialtTeW1ib2wuYXN5bmNJdGVyYXRvcl0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBc3luY0l0ZXJhYmxlLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkRGF0ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKHZhbHVlKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRGF0ZS5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0Z1bmN0aW9uLmpzLm1hcCIsImltcG9ydCB7IG9ic2VydmFibGUgYXMgU3ltYm9sX29ic2VydmFibGUgfSBmcm9tICcuLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVyb3BPYnNlcnZhYmxlKGlucHV0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oaW5wdXRbU3ltYm9sX29ic2VydmFibGVdKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzSW50ZXJvcE9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIGlzSXRlcmFibGUoaW5wdXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbihpbnB1dCA9PT0gbnVsbCB8fCBpbnB1dCA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5wdXRbU3ltYm9sX2l0ZXJhdG9yXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0l0ZXJhYmxlLmpzLm1hcCIsImltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tIFwiLi9pc0Z1bmN0aW9uXCI7XG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24odmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLnRoZW4pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNQcm9taXNlLmpzLm1hcCIsImltcG9ydCB7IF9fYXN5bmNHZW5lcmF0b3IsIF9fYXdhaXQsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiByZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yKHJlYWRhYmxlU3RyZWFtKSB7XG4gICAgcmV0dXJuIF9fYXN5bmNHZW5lcmF0b3IodGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiByZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yXzEoKSB7XG4gICAgICAgIHZhciByZWFkZXIsIF9hLCB2YWx1ZSwgZG9uZTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGFibGVTdHJlYW0uZ2V0UmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgLCA5LCAxMF0pO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRydWUpIHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgX19hd2FpdChyZWFkZXIucmVhZCgpKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgdmFsdWUgPSBfYS52YWx1ZSwgZG9uZSA9IF9hLmRvbmU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZG9uZSkgcmV0dXJuIFszLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBfX2F3YWl0KHZvaWQgMCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyLCBfYi5zZW50KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFs0LCBfX2F3YWl0KHZhbHVlKV07XG4gICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzQsIF9iLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzMsIDEwXTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWxlYXNlTG9jaygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6IHJldHVybiBbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVhZGFibGVTdHJlYW1MaWtlKG9iaikge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9iai5nZXRSZWFkZXIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNSZWFkYWJsZVN0cmVhbUxpa2UuanMubWFwIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gaXNTY2hlZHVsZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgaXNGdW5jdGlvbih2YWx1ZS5zY2hlZHVsZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1NjaGVkdWxlci5qcy5tYXAiLCJpbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBoYXNMaWZ0KHNvdXJjZSkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNvdXJjZS5saWZ0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBvcGVyYXRlKGluaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICBpZiAoaGFzTGlmdChzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmxpZnQoZnVuY3Rpb24gKGxpZnRlZFNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbml0KGxpZnRlZFNvdXJjZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuYWJsZSB0byBsaWZ0IHVua25vd24gT2JzZXJ2YWJsZSB0eXBlJyk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpZnQuanMubWFwIiwiaW1wb3J0IHsgX19yZWFkLCBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBtYXAgfSBmcm9tIFwiLi4vb3BlcmF0b3JzL21hcFwiO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZnVuY3Rpb24gY2FsbE9yQXBwbHkoZm4sIGFyZ3MpIHtcbiAgICByZXR1cm4gaXNBcnJheShhcmdzKSA/IGZuLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSkgOiBmbihhcmdzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtYXBPbmVPck1hbnlBcmdzKGZuKSB7XG4gICAgcmV0dXJuIG1hcChmdW5jdGlvbiAoYXJncykgeyByZXR1cm4gY2FsbE9yQXBwbHkoZm4sIGFyZ3MpOyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcE9uZU9yTWFueUFyZ3MuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7IH1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vb3AuanMubWFwIiwiaW1wb3J0IHsgaWRlbnRpdHkgfSBmcm9tICcuL2lkZW50aXR5JztcbmV4cG9ydCBmdW5jdGlvbiBwaXBlKCkge1xuICAgIHZhciBmbnMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBmbnNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHBpcGVGcm9tQXJyYXkoZm5zKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwaXBlRnJvbUFycmF5KGZucykge1xuICAgIGlmIChmbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBpZGVudGl0eTtcbiAgICB9XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZuc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBpcGVkKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBmbnMucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBmbikgeyByZXR1cm4gZm4ocHJldik7IH0sIGlucHV0KTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGlwZS5qcy5tYXAiLCJpbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHsgdGltZW91dFByb3ZpZGVyIH0gZnJvbSAnLi4vc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlcic7XG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0VW5oYW5kbGVkRXJyb3IoZXJyKSB7XG4gICAgdGltZW91dFByb3ZpZGVyLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb25VbmhhbmRsZWRFcnJvciA9IGNvbmZpZy5vblVuaGFuZGxlZEVycm9yO1xuICAgICAgICBpZiAob25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgb25VbmhhbmRsZWRFcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXBvcnRVbmhhbmRsZWRFcnJvci5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IoaW5wdXQpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBwcm92aWRlZCBcIiArIChpbnB1dCAhPT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnID8gJ2FuIGludmFsaWQgb2JqZWN0JyA6IFwiJ1wiICsgaW5wdXQgKyBcIidcIikgKyBcIiB3aGVyZSBhIHN0cmVhbSB3YXMgZXhwZWN0ZWQuIFlvdSBjYW4gcHJvdmlkZSBhbiBPYnNlcnZhYmxlLCBQcm9taXNlLCBSZWFkYWJsZVN0cmVhbSwgQXJyYXksIEFzeW5jSXRlcmFibGUsIG9yIEl0ZXJhYmxlLlwiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRocm93VW5vYnNlcnZhYmxlRXJyb3IuanMubWFwIiwiaW1wb3J0IHtUaWNrZXR9IGZyb20gXCIuL21vZGVscy9UaWNrZXRcIjtcbmltcG9ydCB7VXNlcn0gZnJvbSBcIi4vbW9kZWxzL1VzZXJcIjtcblxuZXhwb3J0IGNvbnN0IFNFUlZFUl9BRERSRVNTID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcblxuXG5leHBvcnQgY29uc3QgQkFMTF9JTlRFUlZBTCA9IDI1MDA7XG5leHBvcnQgY29uc3QgUk9VTkRfVElNRSA9IDM1ICogQkFMTF9JTlRFUlZBTDtcbmV4cG9ydCBjb25zdCBST1VORF9OVU1CRVIgPSAwO1xuXG5leHBvcnQgY29uc3QgTUlOX0JFVCA9IDIwXG5cbmV4cG9ydCBjb25zdCBUSUNLRVRfVE9fQkVfUE9QVUxBVEVEIDogVGlja2V0ID0ge1xuICAgIG51bWJlcnM6IFtdLFxuICAgIGJldDogTUlOX0JFVCxcbiAgICBudW06IDBcbn07XG5leHBvcnQgY29uc3QgVElDS0VUUyA6IFRpY2tldFtdID0gW11cblxuZXhwb3J0IGNvbnN0IFVTRVIgOiBVc2VyID0ge1xuICAgIGlkIDogMSxcbiAgICBiYWxhbmNlOiAxMDAwLFxuICAgIG5hbWU6IFwiTWFya29cIlxufVxuXG5leHBvcnQgY29uc3QgU0VDOiBudW1iZXIgPSAxMDAwO1xuZXhwb3J0IGNvbnN0IElOVEVSVkFMOm51bWJlciA9IFNFQztcbmV4cG9ydCBjb25zdCBNSU5VVEVTOiBudW1iZXIgPSAxLjU7XG5leHBvcnQgY29uc3QgVElNRTpudW1iZXIgPSBNSU5VVEVTICogNjA7XG5cbiIsImltcG9ydCB7ZnJvbSwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7QmFsbH0gZnJvbSBcIi4uL21vZGVscy9CYWxsXCI7XG5pbXBvcnQge1NFUlZFUl9BRERSRVNTfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5cbmV4cG9ydCBjb25zdCBnZXRCYWxscyA9ICgpOiBPYnNlcnZhYmxlPEJhbGxbXT4gPT4ge1xuICAgIGNvbnN0IHByb21pc2U6IFByb21pc2U8QmFsbFtdPiA9IGZldGNoKGAke1NFUlZFUl9BRERSRVNTfS9iYWxsYClcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLnRhYmxlKHJlcy5qc29uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gZnJvbShwcm9taXNlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRGaWd1cmVzUXVlcnkgPSAocXVlcnk6IHN0cmluZyk6IE9ic2VydmFibGU8QmFsbFtdPiA9PiB7XG4gICAgY29uc3QgcHJvbWlzZTogUHJvbWlzZTxCYWxsW10+ID0gZmV0Y2goYCR7U0VSVkVSX0FERFJFU1N9L2JhbGw/cT0ke3F1ZXJ5fWApXG4gICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS50YWJsZShyZXMuanNvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIGZyb20ocHJvbWlzZSk7XG59OyIsImV4cG9ydCBjb25zdCBnZXRSYW5kb21OdW1iZXIgPSAobGVuZ3RoOiBudW1iZXIpIDogbnVtYmVyID0+XG57XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5wb3coMTAsIGxlbmd0aC0xKSArIE1hdGgucmFuZG9tKCkgKiAoTWF0aC5wb3coMTAsIGxlbmd0aCkgLSBNYXRoLnBvdygxMCwgbGVuZ3RoLTEpIC0gMSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJhbmRvbU51bWJlciA9ICggbWluOm51bWJlciwgbWF4Om51bWJlcikgOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXG59XG5cbmV4cG9ydCBjb25zdCBhcnJheVJlbW92ZSA9IChhcnIgOiBhbnlbXSwgdmFsdWU6IGFueSkgOiBhbnlbXSA9PiB7XG4gICAgYXJyLmZpbHRlcihmdW5jdGlvbihlbGUpe1xuICAgICAgICByZXR1cm4gZWxlICE9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBjb25zdCBhcnJheVNodWZmbGUgPSAoIGFycmF5OiBhbnlbXSkgIDogYW55W10gPT4ge1xuICAgIGxldCBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsICByYW5kb21JbmRleDtcbiAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS5cbiAgICB3aGlsZSAoY3VycmVudEluZGV4ICE9IDApIHtcbiAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50LlxuICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgICAgIGN1cnJlbnRJbmRleC0tO1xuICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICAgIFthcnJheVtjdXJyZW50SW5kZXhdLCBhcnJheVtyYW5kb21JbmRleF1dID0gW1xuICAgICAgICAgICAgYXJyYXlbcmFuZG9tSW5kZXhdLCBhcnJheVtjdXJyZW50SW5kZXhdXTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xufVxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZURpdiA9IChwYXJlbnQ6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50ID0+IHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChkaXYpO1xuXG4gICAgcmV0dXJuIGRpdjtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVMYWJlbCA9IChwYXJlbnQ6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU/OiBzdHJpbmcpOiBIVE1MTGFiZWxFbGVtZW50ID0+IHtcbiAgICBjb25zdCBsYmwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lICE9PSBcInVuZGVmaW5lZFwiKSBsYmwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChsYmwpO1xuXG4gICAgcmV0dXJuIGxibDtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVCdXR0b24gPSAocGFyZW50OiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lPzogc3RyaW5nKTogSFRNTEJ1dHRvbkVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lICE9PSBcInVuZGVmaW5lZFwiKSBidG4uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidG4pO1xuXG4gICAgcmV0dXJuIGJ0bjtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVJbnB1dCA9IChwYXJlbnQ6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU/OiBzdHJpbmcpOiBIVE1MSW5wdXRFbGVtZW50ID0+IHtcbiAgICBjb25zdCBpbnB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSAhPT0gXCJ1bmRlZmluZWRcIikgaW5wdC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGlucHQpO1xuXG4gICAgcmV0dXJuIGlucHQ7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ3VzdG9tRWxlbWVudCA9ICh0YWdOYW1lOiBzdHJpbmcsIHBhcmVudDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZT86IHN0cmluZyk6IEhUTUxFbGVtZW50ID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgIT09IFwidW5kZWZpbmVkXCIpIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xuXG4gICAgcmV0dXJuIGVsO1xufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlQWxsQ2hpbGROb2RlcyA9IChwYXJlbnQ6IEhUTUxFbGVtZW50KTogdm9pZCA9PiB7XG4gICAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxufSIsImltcG9ydCB7ZGVib3VuY2VUaW1lLCBmcm9tLCBpbnRlcnZhbCwgbWFwLCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIHRha2V9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0JBTExfSU5URVJWQUwsIFRJQ0tFVFMsIFVTRVJ9IGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7YXJyYXlSZW1vdmUsIGFycmF5U2h1ZmZsZSwgZ2V0UmFuZG9tTnVtYmVyLCByYW5kb21OdW1iZXJ9IGZyb20gXCIuLi9oZWxwZXJzL0hlbHBlckxvZ2ljXCI7XG5pbXBvcnQge1RpY2tldH0gZnJvbSBcIi4uL21vZGVscy9UaWNrZXRcIjtcbmltcG9ydCB7aW5pdEdhbWVWaWV3fSBmcm9tIFwiLi4vdmlld3MvR2FtZVZpZXdcIjtcblxuZXhwb3J0IGNvbnN0IHN0YXJ0RHJhdyA9ICgpIDogU3Vic2NyaXB0aW9uID0+IHtcbiAgICBsZXQgYXJyID0gWzEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4XTtcbiAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSggKGdlbikgPT57XG4gICAgICAgc2V0SW50ZXJ2YWwoICgpID0+IHtcbiAgICAgICAgICAgZ2VuLm5leHQoXG4gICAgICAgICAgICAgICBhcnIuc3BsaWNlKFxuICAgICAgICAgICAgICAgICAgIGFycmF5U2h1ZmZsZShhcnIpLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbU51bWJlcigxLGFyci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgKSwxKVxuICAgICAgICAgICAgICAgICAgIFswXVxuICAgICAgICAgICApO1xuICAgICAgIH0sIEJBTExfSU5URVJWQUwpXG4gICB9KS5waXBlKHRha2UoMzUpKS5zdWJzY3JpYmUoeD0+Y29uc29sZS5sb2coeCkpO1xufVxuXG5leHBvcnQgY29uc3QgcHJlcGFyZVVzZXJEYXRhID0gKGVsOiBIVE1MRWxlbWVudCkgOiBQcm9taXNlPFRpY2tldD4gPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSggIChyZXMpID0+IHtcbiAgICAgICAgbGV0IHQgOiBUaWNrZXQ9IHtcbiAgICAgICAgICAgIG51bWJlcnM6IFtdLFxuICAgICAgICAgICAgYmV0OiAwLFxuICAgICAgICAgICAgbnVtOiAwXG4gICAgICAgIH07XG4gICAgICAgIGZyb20oZWwucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubnVtJykpLnBpcGUobWFwKGVsPT5wYXJzZUludChlbC5pbm5lckhUTUwpKSkuc3Vic2NyaWJlKGVsPT50Lm51bWJlcnMucHVzaChlbCkpO1xuICAgICAgICB0LmJldCA9IHBhcnNlSW50KChlbC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50LWJldC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKVxuICAgICAgICB0Lm51bSA9IHBhcnNlSW50KChlbC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgndC1pZCcpKSlcbiAgICAgICAgcmVzKHQpO1xuICAgICAgICBVU0VSLmJhbGFuY2UgLT0gdC5iZXQ7XG4gICAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHByZXBhcmVUaWNrZXRzID0gKCkgOlByb21pc2U8dm9pZD4gPT57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlICgocmVzKT0+e1xuICAgICAgICBsZXQgZGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNvbmYtYWN0aXZlJylcblxuICAgICAgICBkaXZzLmZvckVhY2goZWw9PntcbiAgICAgICAgICAgIHByZXBhcmVVc2VyRGF0YShlbCBhcyBIVE1MRWxlbWVudCkudGhlbih0PT57XG4gICAgICAgICAgICAgICAgVElDS0VUUy5wdXNoKHQpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coVElDS0VUUyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzKCl9KVxufVxuXG5leHBvcnQgY29uc3Qgc3RhcnRHYW1lID0gKCkgOiB2b2lkID0+IHtcbiAgICBwcmVwYXJlVGlja2V0cygpLnRoZW4oKCk9PntcbiAgICAgICAgaW5pdEdhbWVWaWV3KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluQ29udGFpbmVyJykpO1xuICAgICAgICBzZXRUaW1lb3V0KHN0YXJ0RHJhdywyNTAwKVxuICAgIH0pO1xufVxuXG4iLCJpbXBvcnQge1xuICAgIGZpbHRlcixcbiAgICBmcm9tRXZlbnQsXG4gICAgbWFwLFxuICAgIHN3aXRjaE1hcH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7TUlOX0JFVCwgVElDS0VUX1RPX0JFX1BPUFVMQVRFRH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IHthY3RpdmF0ZUJhbGwsIGRyYXdUaWNrZXQsIHJlc2V0QWN0aXZlQmFsbHMsIHVwZGF0ZVRpY2tldE51bWJlcnN9IGZyb20gXCIuLi92aWV3cy9Ib21lVmlld1wiO1xuXG5cbmV4cG9ydCBjb25zdCB1cGRhdGVUaWNrZXRzID0gKG51bWJlciA6IG51bWJlcikgOiB2b2lkID0+IHtcbiAgICBpZiAoVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5udW1iZXJzLmxlbmd0aCA+PSA2KSB7XG4gICAgICAgIFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtYmVycyA9IFtdO1xuICAgICAgICBUSUNLRVRfVE9fQkVfUE9QVUxBVEVELm51bSsrO1xuICAgICAgICBUSUNLRVRfVE9fQkVfUE9QVUxBVEVELmJldCA9IE1JTl9CRVQ7XG4gICAgICAgIGRyYXdUaWNrZXQoKTtcbiAgICAgICAgT25UaWNrZXRBY3RpdmUoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtYmVycy5wdXNoKG51bWJlcik7XG4gICAgICAgIHVwZGF0ZVRpY2tldE51bWJlcnMobnVtYmVyKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5udW1iZXJzKTtcbn1cblxuXG5cbmV4cG9ydCBjb25zdCBsaXN0ZW5DbGlja09uQmFsbCA9ICgpIDogdm9pZCA9PntcbiAgICBjb25zb2xlLmxvZyhcImFzZGFzXCIpXG4gICAgZHJhd1RpY2tldCgpO1xuICAgIGZyb21FdmVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFsbEhhbmRsZXInKSwnY2xpY2snKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChldiA9PiBwYXJzZUludCgoPEhUTUxEaXZFbGVtZW50PmV2LnRhcmdldCkuZ2V0QXR0cmlidXRlKCdpZCcpKSksXG4gICAgICAgICAgICBmaWx0ZXIoZWwgPT4gZWwgIT0gdW5kZWZpbmVkICYmICFpc05hTihlbCkpLFxuICAgICAgICAgICAgbWFwKGlkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5udW1iZXJzLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICBUSUNLRVRfVE9fQkVfUE9QVUxBVEVELm51bWJlcnMuc3BsaWNlKFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtYmVycy5pbmRleE9mKGlkKSwxKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGlja2V0TnVtYmVycyhpZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIGlkfSksXG4gICAgICAgICAgICBmaWx0ZXIoIHZhbCA9PiB2YWwgIT0gMCAmJiB2YWwgIT0gdW5kZWZpbmVkKVxuICAgICAgICApLnN1YnNjcmliZSh4PT4gIHVwZGF0ZVRpY2tldHMoeCkpO1xufVxuXG5leHBvcnQgY29uc3QgT25UaWNrZXRBY3RpdmUgPSAoKSA6IHZvaWQgPT57XG4gICAgZnJvbUV2ZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51LXRpY2tldCcpLCdjbGljaycpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKGV2PT4ge1xuICAgICAgICAgICAgICAgIFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtYmVycyA9IFtdO1xuICAgICAgICAgICAgICAgIHJlc2V0QWN0aXZlQmFsbHMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gPEhUTUxEaXZFbGVtZW50PiBldi50YXJnZXQ7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGZpbHRlcihlbCA9PiBlbCAhPSB1bmRlZmluZWQpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKGVsPT4gZWwucXVlcnlTZWxlY3RvckFsbCgnLm51bScpKSxcbiAgICAgICAgICAgIGZpbHRlcihudW1zID0+IG51bXMgIT0gdW5kZWZpbmVkKSxcbiAgICAgICAgICAgIG1hcChudW1zID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJzZUludChudW1zLmlubmVySFRNTCkpO1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlQmFsbChwYXJzZUludChudW1zLmlubmVySFRNTCkpO1xuICAgICAgICAgICAgICAgIFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtYmVycy5wdXNoKHBhcnNlSW50KG51bXMuaW5uZXJIVE1MKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApLnN1YnNjcmliZSgpXG59IiwiaW1wb3J0IHt0aW1lcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VXaGlsZSwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1NFQywgVElNRX0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IHtzdGFydEdhbWV9IGZyb20gXCIuL0dhbWVTZXJ2aWNlXCI7XG5pbXBvcnQge3VwZGF0ZURvbVRpbWVyfSBmcm9tIFwiLi4vdmlld3MvSG9tZVZpZXdcIjtcblxuZXhwb3J0IGNvbnN0IHNjaGVkdWxlR2FtZUFuZFN0YXJ0ID0gKCkgPT4ge1xuICAgIGxldCBjb3VudGVyID0gMTA7XG4gICAgdGltZXIoU0VDLCBTRUMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFrZVdoaWxlKCgpID0+IGNvdW50ZXIgPiAwKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiBjb3VudGVyLS0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICByZW1haW5pbmdUaW1lVXBkYXRlKGNvdW50ZXIpO1xuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPD0gMClcbiAgICAgICAgICAgICAgICBzdGFydEdhbWUoKVxuICAgICAgICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHJlbWFpbmluZ1RpbWVVcGRhdGUgPSAoc2Vjb25kcyA6IG51bWJlcikgOiB2b2lkID0+IHtcbiAgICBsZXQgbWluczogc3RyaW5nID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjAgKS50b1N0cmluZygpO1xuICAgIGxldCBzZWM6IHN0cmluZyA9IChzZWNvbmRzIC0gKHBhcnNlSW50KG1pbnMpICogNjApKS50b1N0cmluZygpO1xuXG4gICAgaWYgKG1pbnMubGVuZ3RoIDw9IDEpXG4gICAgICAgIG1pbnMgPSBcIjBcIittaW5zO1xuICAgIGlmIChzZWMubGVuZ3RoIDw9IDEpXG4gICAgICAgIHNlYyA9IFwiMFwiK3NlYztcbiAgICB1cGRhdGVEb21UaW1lcihzZWMsbWlucyk7XG59XG5cblxuIiwiaW1wb3J0IHtjcmVhdGVEaXYsIGNyZWF0ZUlucHV0LCBjcmVhdGVMYWJlbCwgcmVtb3ZlQWxsQ2hpbGROb2Rlc30gZnJvbSBcIi4uL2hlbHBlcnMvSGVscGVyVmlld3NcIjtcbmltcG9ydCB7TUlOX0JFVCwgUk9VTkRfTlVNQkVSLCBUSUNLRVRfVE9fQkVfUE9QVUxBVEVELCBUSUNLRVRTLCBVU0VSfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5cbmV4cG9ydCBjb25zdCBpbml0R2FtZVZpZXcgPSAoaG9zdDogSFRNTEVsZW1lbnQpIDogdm9pZCA9PntcbiAgICByZW1vdmVBbGxDaGlsZE5vZGVzKGhvc3QpO1xuICAgIGNvbnN0IHNlY3RvcjEgPSBjcmVhdGVEaXYoaG9zdCwnZy1zZWN0b3IxJyk7XG4gICAgY29uc3Qgc2VjdG9yMiA9IGNyZWF0ZURpdihob3N0LCdnLXNlY3RvcjInKTtcbiAgICBsZXQgcm91bmRJbmZvID0gY3JlYXRlRGl2KHNlY3RvcjIsJ3RpbWVyJylcbiAgICByb3VuZEluZm8uaW5uZXJIVE1MID0gYFxuICAgIDxkaXY+XG4gICAgPHNwYW4gY2xhc3M9XCJtaW51dGVzXCI+PC9zcGFuPlxuICAgIDxzcGFuPjo8L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJzZWNvbmRzXCI+PC9zcGFuPlxuICAgIDwvZGl2PmA7XG4gICAgY3JlYXRlTGFiZWwocm91bmRJbmZvLCdsYmwnKS5pbm5lckhUTUwgPSAnIycgKyBST1VORF9OVU1CRVJcbiAgICBsZXQgZGl2VCA9IGNyZWF0ZURpdihzZWN0b3IyLCd1LWRpdicpO1xuICAgIGRyYXdUaWNrZXRzKHNlY3RvcjIpO1xuICAgIGNyZWF0ZUxhYmVsKGRpdlQsJ3ItdGl0bGUnKS5pbm5lckhUTUwgPSAnQmFsYW5jZTogJyArIFVTRVIuYmFsYW5jZVxufVxuXG5leHBvcnQgY29uc3QgZHJhd1RpY2tldHMgPSAoaG9zdDpIVE1MRWxlbWVudCkgPT4ge1xuICAgIFRJQ0tFVFMuZm9yRWFjaChlbD0+e1xuICAgICAgICBsZXQgdGlja2V0ID0gY3JlYXRlRGl2KGhvc3QsJ3UtdGlja2V0Jyk7XG4gICAgICAgIHRpY2tldC5zZXRBdHRyaWJ1dGUoJ3QtaWQnLGVsLm51bS50b1N0cmluZygpKTtcbiAgICAgICAgdGlja2V0LnN0eWxlLmZsZXhEaXJlY3Rpb24gPSAnY29sdW1uJztcbiAgICAgICAgdGlja2V0LnN0eWxlLndpZHRoID0gJzk1JSc7XG4gICAgICAgIGxldCBudW1zID0gIGNyZWF0ZURpdih0aWNrZXQsJ3QtbnVtYmVycycpO1xuICAgICAgICBlbC5udW1iZXJzLmZvckVhY2gobnVtID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZURpdihudW1zLCd0LW51bXMnKS5pbm5lckhUTUwgPSBudW0udG9TdHJpbmcoKTtcbiAgICAgICAgfSlcbiAgICAgICAgY3JlYXRlRGl2KHRpY2tldCwndC1iZXQnKS5pbm5lckhUTUwgPSAnQmV0OiAnICsgZWwuYmV0LnRvU3RyaW5nKCk7XG4gICAgfSlcbn0iLCJpbXBvcnQge2NyZWF0ZURpdiwgY3JlYXRlSW5wdXQsIGNyZWF0ZUxhYmVsfSBmcm9tIFwiLi4vaGVscGVycy9IZWxwZXJWaWV3c1wiO1xuaW1wb3J0IHtnZXRCYWxsc30gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL0JhbGxDb250cm9sbGVyXCI7XG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuLi9tb2RlbHMvVXNlclwiO1xuaW1wb3J0IHtCYWxsfSBmcm9tIFwiLi4vbW9kZWxzL0JhbGxcIjtcbmltcG9ydCB7TUlOX0JFVCwgUk9VTkRfTlVNQkVSLCBUSUNLRVRfVE9fQkVfUE9QVUxBVEVELCBVU0VSfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5pbXBvcnQge2xpc3RlbkNsaWNrT25CYWxsfSBmcm9tIFwiLi4vc2VydmljZXMvVGlja2V0U2VydmljZVwiO1xuXG5leHBvcnQgY29uc3QgaW5pdEhvbWUgPSAoaG9zdCA6IEhUTUxFbGVtZW50KTp2b2lkID0+IHtcbiAgICBjb25zdCBzZWN0b3IxID0gY3JlYXRlRGl2KGhvc3QsJ3NlY3RvcjEnKTtcbiAgICBjb25zdCBzZWN0b3IyID0gY3JlYXRlRGl2KGhvc3QsJ3NlY3RvcjInKTtcblxuICAgIGluaXRVaShzZWN0b3IyLFVTRVIpO1xuXG4gICAgY29uc3QgdGl0bGUgPSBjcmVhdGVEaXYoc2VjdG9yMSwnZGl2VGl0bGUnKTtcbiAgICBjcmVhdGVMYWJlbCh0aXRsZSwndGl0bGUnKS5pbm5lclRleHQgPSAnUGxhY2UgQmV0JztcbiAgICBjcmVhdGVMYWJlbCh0aXRsZSwnbGJsVGltZXInKS5pbm5lckhUTUwgPSBgXG4gICAgPHNwYW4gY2xhc3M9XCJtaW51dGVzXCI+PC9zcGFuPlxuICAgIDxzcGFuPjo8L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJzZWNvbmRzXCI+PC9zcGFuPmA7XG4gICAgY3JlYXRlTGFiZWwodGl0bGUsJ3ItdGl0bGUnKS5pbm5lclRleHQgPSAnIycgKyBST1VORF9OVU1CRVI7XG5cbiAgICBjb25zdCBkYiA9IGNyZWF0ZURpdihzZWN0b3IxLCdkaXZCYWxscycpO1xuXG4gICAgZ2V0QmFsbHMoKS5zdWJzY3JpYmUoKGJhbGxzKSA9PiB7XG4gICAgICAgIGRyYXdCYWxsSGFuZGxlcldpdGhCYWxsKGRiLCBiYWxscykudGhlbihsaXN0ZW5DbGlja09uQmFsbCk7XG4gICAgfSk7XG59XG5leHBvcnQgY29uc3QgZHJhd0JhbGxIYW5kbGVyV2l0aEJhbGwgPSAoaG9zdDogSFRNTEVsZW1lbnQsYmFsbHM6QmFsbFtdKSA6IFByb21pc2U8dm9pZD4gPT57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlICggKHJlc29sdmUpID0+IHtcbiAgICAgICAgYmFsbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGRyYXdCYWxscyhlbCxcbiAgICAgICAgICAgIGNyZWF0ZURpdihob3N0LCdiYWxsSGFuZGxlcicpKTtcbiAgICB9KVxuICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRVaSA9IChob3N0OiBIVE1MRWxlbWVudCwgdXNlcjogVXNlcikgOiB2b2lkID0+IHtcbiAgICBjb25zdCB1aURpdiA9IGNyZWF0ZURpdihob3N0LCd1LWRpdicpO1xuICAgIGNyZWF0ZUxhYmVsKHVpRGl2LCd1LW5hbWUnKS5pbm5lclRleHQgPSAnQmFsYW5jZTogJyt1c2VyLmJhbGFuY2U7XG4gICAgY3JlYXRlTGFiZWwodWlEaXYsJ3UtYmFsJykuaW5uZXJUZXh0ID0gJ0hlbGxvICcrIHVzZXIubmFtZTtcbiAgICBjb25zdCB0aWNrZXRzID0gY3JlYXRlRGl2KGhvc3QsJ3UtbWFpbi10aWNrZXRzJyk7XG59XG5cbmV4cG9ydCBjb25zdCBkcmF3QmFsbHMgPSAoYmFsbCA6IEJhbGwsIGhvc3Q6IEhUTUxFbGVtZW50KSA6IHZvaWQgPT57XG4gICAgY29uc3QgYiA9IGNyZWF0ZURpdihob3N0LCdiYWxsJyk7XG4gICAgYi5zZXRBdHRyaWJ1dGUoJ2lkJyxiYWxsLmlkLnRvU3RyaW5nKCkpO1xuICAgIGIuaW5uZXJUZXh0ID0gYmFsbC5pZC50b1N0cmluZygpO1xuICAgIGIuc3R5bGUuYmFja2dyb3VuZCA9IGJhbGwuY29sb3I7XG4gICAgYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGV2KT0+e1xuICAgICAgICBhY3RpdmF0ZUJhbGwoYmFsbC5pZCk7XG4gICAgfSx0cnVlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFjdGl2YXRlQmFsbCA9IChiYWxsSWQ6IG51bWJlcikgOnZvaWQgPT57XG4gICAgbGV0IGJhbGwgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W2lkXScpXG4gICAgICAgIC5pdGVtKGJhbGxJZCAtIDEpLnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKGJhbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSlcbiAgICAgICAgYmFsbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgIGVsc2VcbiAgICAgICAgYmFsbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbn1cbmV4cG9ydCBjb25zdCBhY3RpdmF0ZVRpY2tldCA9ICh0aWNrZXRJZDogbnVtYmVyKSA6dm9pZCA9PntcbiAgICBsZXQgdGlja2V0ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdlt0LWlkXScpLml0ZW0odGlja2V0SWQpXG4gICAgcmVzZXRBY3RpdmVUaWNrZXRzKCk7XG4gICAgaWYgKHRpY2tldC5jbGFzc0xpc3QuY29udGFpbnMoJ3QtYWN0aXZlJykpXG4gICAgICAgIHRpY2tldC5jbGFzc0xpc3QucmVtb3ZlKCd0LWFjdGl2ZScpXG4gICAgZWxzZVxuICAgICAgICB0aWNrZXQuY2xhc3NMaXN0LmFkZCgndC1hY3RpdmUnKTtcbn1cblxuZXhwb3J0IGNvbnN0IGRyYXdUaWNrZXQgPSAoKSA6IHZvaWQgPT4ge1xuICAgIHJlc2V0QWN0aXZlVGlja2V0cygpO1xuICAgIGxldCB0QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51LW1haW4tdGlja2V0cycpIGFzIEhUTUxFbGVtZW50XG5cbiAgICBsZXQgdGlja2V0ID0gY3JlYXRlRGl2KHRBcmVhLCd1LXRpY2tldCcpO1xuICAgIHRpY2tldC5jbGFzc0xpc3QuYWRkKCd0LWFjdGl2ZScpXG4gICAgdGlja2V0LnNldEF0dHJpYnV0ZSgndC1pZCcsVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5udW0udG9TdHJpbmcoKSk7XG4gICAgdGlja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e2FjdGl2YXRlVGlja2V0KHBhcnNlSW50KHRpY2tldC5nZXRBdHRyaWJ1dGUoJ3QtaWQnKSkpfSxmYWxzZSk7XG5cblxuXG4gICAgY3JlYXRlTGFiZWwodGlja2V0LCdsYmwnKS5pbm5lclRleHQgPSBcIlRpY2tldCAjXCIgKyBUSUNLRVRfVE9fQkVfUE9QVUxBVEVELm51bS50b1N0cmluZygpO1xuICAgIGNyZWF0ZURpdih0aWNrZXQsJ3QtbnVtYmVycycpO1xuICAgIGxldCB0QmV0ID0gY3JlYXRlRGl2KHRpY2tldCwndC1iZXQnKTtcblxuICAgIGxldCBiZXRJbnB1dCA9IGNyZWF0ZUlucHV0KHRCZXQsJ3QtYmV0LWlucHV0Jyk7XG4gICAgYmV0SW5wdXQudHlwZSA9ICdudW1iZXInO1xuICAgIGJldElucHV0LnZhbHVlID0gTUlOX0JFVC50b1N0cmluZygpO1xuICAgIGNyZWF0ZURpdih0aWNrZXQsJ2J0bkNvbmYnKS5pbm5lckhUTUwgPSBgPHN2ZyB3aWR0aD1cIjMwcHhcIiBoZWlnaHQ9XCIzMHB4XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBQcm8gNi4yLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UgKENvbW1lcmNpYWwgTGljZW5zZSkgQ29weXJpZ2h0IDIwMjIgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGQ9XCJNNDcwLjYgMTA1LjRjMTIuNSAxMi41IDEyLjUgMzIuOCAwIDQ1LjNsLTI1NiAyNTZjLTEyLjUgMTIuNS0zMi44IDEyLjUtNDUuMyAwbC0xMjgtMTI4Yy0xMi41LTEyLjUtMTIuNS0zMi44IDAtNDUuM3MzMi44LTEyLjUgNDUuMyAwTDE5MiAzMzguNyA0MjUuNCAxMDUuNGMxMi41LTEyLjUgMzIuOC0xMi41IDQ1LjMgMHpcIi8+PC9zdmc+YDtcbiAgICByZXNldEFjdGl2ZUJhbGxzKCk7XG59XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVUaWNrZXROdW1iZXJzID0gKG51bTpudW1iZXIsIHJlc2V0PyA6IGJvb2xlYW4pID0+IHtcbiAgICBsZXQgZGl2VGlja2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdlt0LWlkXScpXG4gICAgY29uc29sZS5sb2coZGl2VGlja2V0cyk7XG4gICAgbGV0IHRpY2tldCA6IEhUTUxFbGVtZW50O1xuICAgIGRpdlRpY2tldHMuZm9yRWFjaChlbD0+e1xuICAgICAgICBpZihlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3QtYWN0aXZlJykpXG4gICAgICAgICAgICB0aWNrZXQgPSBlbCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgfSk7XG4gICAgbGV0IG51bWJlcnNEaXYgPSB0aWNrZXQucXVlcnlTZWxlY3RvcignLnQtbnVtYmVycycpIGFzIEhUTUxFbGVtZW50O1xuICAgIGlmIChyZXNldClcbiAgICB7XG4gICAgICAgIGxldCBudW1zID0gbnVtYmVyc0Rpdi5xdWVyeVNlbGVjdG9yQWxsKCcubnVtJylcbiAgICAgICAgbnVtcy5mb3JFYWNoKGVsPT57XG4gICAgICAgICAgICBpZihlbC5pbm5lckhUTUwgPT0gbnVtLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbnVtYmVyc0Rpdi5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGNyZWF0ZURpdihudW1iZXJzRGl2LCAnbnVtJykuaW5uZXJUZXh0ID0gbnVtLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGxldCBidG5DbmYgPSB0aWNrZXQucXVlcnlTZWxlY3RvcignLmJ0bkNvbmYnKTtcbiAgICBpZihudW1iZXJzRGl2LmNoaWxkcmVuLmxlbmd0aCA9PT0gNilcbiAgICB7XG4gICAgICAgIGJ0bkNuZi5jbGFzc0xpc3QuYWRkKCdiLWNvbmYtYWN0aXZlJylcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgaWYgKGJ0bkNuZi5jbGFzc0xpc3QuY29udGFpbnMoJ2ItY29uZi1hY3RpdmUnKSlcbiAgICAgICAge1xuICAgICAgICAgICAgYnRuQ25mLmNsYXNzTGlzdC5yZW1vdmUoJ2ItY29uZi1hY3RpdmUnKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVzZXRBY3RpdmVCYWxscyA9ICgpIDogdm9pZCA9PiB7XG4gICAgbGV0IGJhbGwgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZScpXG4gICAgYmFsbC5mb3JFYWNoKGVsPT57XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0pXG59XG5cbmV4cG9ydCBjb25zdCByZXNldEFjdGl2ZVRpY2tldHMgPSAoKSA6IHZvaWQgPT4ge1xuICAgIGxldCB0aWNrZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnQtYWN0aXZlJyk7XG4gICAgdGlja2V0cy5mb3JFYWNoKGVsPT57XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3QtYWN0aXZlJyk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFbXB0eVRpY2tldHMgPSAoKSA6IHZvaWQgPT4ge1xuICAgIGxldCBtYWluRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnUtbWFpbi10aWNrZXRzJyk7XG4gICAgbGV0IHRpY2tldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudS10aWNrZXQnKVxuICAgIHRpY2tldHMuZm9yRWFjaChlbD0+e1xuICAgICAgICBpZihlbC5xdWVyeVNlbGVjdG9yKCcudC1udW1iZXJzJykuY2hpbGRyZW4ubGVuZ3RoIDw9IDApXG4gICAgICAgICAgICBtYWluRGl2LnJlbW92ZUNoaWxkKGVsKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHVwZGF0ZURvbVRpbWVyID0gKHNlYzogc3RyaW5nLCBtaW5zOiBzdHJpbmcpIDogdm9pZCA9PntcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWludXRlcycpLmlubmVySFRNTCA9IG1pbnM7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY29uZHMnKS5pbm5lckhUTUwgPSBzZWM7XG59IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtpbml0SG9tZX0gZnJvbSBcIi4vdmlld3MvSG9tZVZpZXdcIjtcbmltcG9ydCB7c2NoZWR1bGVHYW1lQW5kU3RhcnR9IGZyb20gXCIuL3NlcnZpY2VzL1RpbWVyU2VydmljZVwiO1xuaW1wb3J0IHtpbml0R2FtZVZpZXd9IGZyb20gXCIuL3ZpZXdzL0dhbWVWaWV3XCI7XG5pbXBvcnQge3N0YXJ0RHJhd30gZnJvbSBcIi4vc2VydmljZXMvR2FtZVNlcnZpY2VcIjtcblxuaW5pdEhvbWUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5Db250YWluZXInKSk7XG5zZXRUaW1lb3V0KHNjaGVkdWxlR2FtZUFuZFN0YXJ0LDUwMDApO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9