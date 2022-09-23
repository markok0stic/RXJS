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

/***/ "./node_modules/rxjs/dist/esm5/internal/Subject.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/Subject.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnonymousSubject": () => (/* binding */ AnonymousSubject),
/* harmony export */   "Subject": () => (/* binding */ Subject)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Observable */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/ObjectUnsubscribedError */ "./node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/arrRemove */ "./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/errorContext */ "./node_modules/rxjs/dist/esm5/internal/util/errorContext.js");






var Subject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__.ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                }
                try {
                    for (var _b = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var observer = _c.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
            return _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new _Subscription__WEBPACK_IMPORTED_MODULE_3__.Subscription(function () {
            _this.currentObservers = null;
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_4__.arrRemove)(observers, subscriber);
        });
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new _Observable__WEBPACK_IMPORTED_MODULE_5__.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(_Observable__WEBPACK_IMPORTED_MODULE_5__.Observable));

var AnonymousSubject = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

//# sourceMappingURL=Subject.js.map

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

/***/ "./node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js":
/*!******************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectUnsubscribedError": () => (/* binding */ ObjectUnsubscribedError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var ObjectUnsubscribedError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});
//# sourceMappingURL=ObjectUnsubscribedError.js.map

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
/* harmony export */   "ARRAY_IDS": () => (/* binding */ ARRAY_IDS),
/* harmony export */   "BALL_INTERVAL": () => (/* binding */ BALL_INTERVAL),
/* harmony export */   "MINUTES": () => (/* binding */ MINUTES),
/* harmony export */   "MIN_BET": () => (/* binding */ MIN_BET),
/* harmony export */   "MULTIPLIERS": () => (/* binding */ MULTIPLIERS),
/* harmony export */   "ROUND_TIME": () => (/* binding */ ROUND_TIME),
/* harmony export */   "SEC": () => (/* binding */ SEC),
/* harmony export */   "SERVER_ADDRESS": () => (/* binding */ SERVER_ADDRESS),
/* harmony export */   "SUBJECT": () => (/* binding */ SUBJECT),
/* harmony export */   "TICKETS": () => (/* binding */ TICKETS),
/* harmony export */   "TICKET_TO_BE_POPULATED": () => (/* binding */ TICKET_TO_BE_POPULATED),
/* harmony export */   "TIME": () => (/* binding */ TIME),
/* harmony export */   "USER": () => (/* binding */ USER)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/Subject.js");

var SERVER_ADDRESS = "http://localhost:3000";
var BALL_INTERVAL = 3000;
var ROUND_TIME = 35 * BALL_INTERVAL / 1000 + 2;
var MIN_BET = 20;
var TICKET_TO_BE_POPULATED = {
    numbers: [],
    bet: MIN_BET,
    num: 0,
    passed: false
};
var TICKETS = [];
var USER = {
    id: 1,
    balance: 1000,
    name: "Marko"
};
var SEC = 1000;
var MINUTES = 0.5;
var TIME = MINUTES * 60;
var ARRAY_IDS = [[1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15], [16, 17, 18], [19, 20, 21, 22], [23, 24, 25, 26, 27, 28, 29, 30]];
var MULTIPLIERS = [0, 0, 0, 0, 0, 10000, 7500, 5000, 2500, 1000, 500, 300, 200, 150, 100, 90, 80, 70, 60, 50, 40, 30, 25, 20, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
var SUBJECT = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();


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
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
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
/* harmony export */   "createLabel": () => (/* binding */ createLabel)
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


/***/ }),

/***/ "./src/services/GameService.ts":
/*!*************************************!*\
  !*** ./src/services/GameService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "disableInterfaceAndPrepareTickets": () => (/* binding */ disableInterfaceAndPrepareTickets),
/* harmony export */   "listenBigBall": () => (/* binding */ listenBigBall),
/* harmony export */   "prepareTickets": () => (/* binding */ prepareTickets),
/* harmony export */   "prepareUserData": () => (/* binding */ prepareUserData),
/* harmony export */   "startDraw": () => (/* binding */ startDraw),
/* harmony export */   "startGame": () => (/* binding */ startGame)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/take.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _helpers_HelperLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/HelperLogic */ "./src/helpers/HelperLogic.ts");
/* harmony import */ var _views_GameView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/GameView */ "./src/views/GameView.ts");
/* harmony import */ var _views_HomeView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/HomeView */ "./src/views/HomeView.ts");
/* harmony import */ var _TimerService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TimerService */ "./src/services/TimerService.ts");
/* harmony import */ var _controllers_BallController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/BallController */ "./src/controllers/BallController.ts");







var startDraw = function () {
    var array;
    (0,_controllers_BallController__WEBPACK_IMPORTED_MODULE_5__.getBalls)().subscribe(function (balls) {
        array = balls;
    });
    return new rxjs__WEBPACK_IMPORTED_MODULE_6__.Observable(function (gen) {
        setInterval(function () {
            gen.next(array.splice((0,_helpers_HelperLogic__WEBPACK_IMPORTED_MODULE_1__.arrayShuffle)(array).indexOf((0,_helpers_HelperLogic__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(1, array.length)), 1)[0]);
        }, _config__WEBPACK_IMPORTED_MODULE_0__.BALL_INTERVAL);
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.take)(35), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(function (x) { return x; }))
        .subscribe(function (x) {
        (0,_views_GameView__WEBPACK_IMPORTED_MODULE_2__.drawBallInBigBall)(x);
        if (array.length === 13) {
            (0,_views_GameView__WEBPACK_IMPORTED_MODULE_2__.setTicketNotPassed)();
            setTimeout(function () {
                (0,_views_HomeView__WEBPACK_IMPORTED_MODULE_3__.initHome)(document.querySelector('.mainContainer'));
            }, 5000);
        }
    });
};
var prepareUserData = function (el) {
    return new Promise(function (res) {
        var t = {
            numbers: [],
            bet: 0,
            num: 0,
            passed: false
        };
        (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.from)(el.parentElement.querySelectorAll('.num')).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(function (el) { return parseInt(el.innerHTML); })).subscribe(function (el) { return t.numbers.push(el); });
        t.bet = parseInt(el.parentElement.querySelector('.t-bet-input').value);
        t.num = parseInt((el.parentElement.getAttribute('t-id')));
        _config__WEBPACK_IMPORTED_MODULE_0__.USER.balance -= t.bet;
        res(t);
    });
};
var prepareTickets = function () {
    var divs = document.querySelectorAll('.b-conf-active');
    divs.forEach(function (el) {
        prepareUserData(el).then(function (t) {
            _config__WEBPACK_IMPORTED_MODULE_0__.TICKETS.push(t);
        });
    });
};
var startGame = function () {
    (0,_views_GameView__WEBPACK_IMPORTED_MODULE_2__.initGameView)(document.querySelector('.mainContainer'));
    startDraw();
    (0,_TimerService__WEBPACK_IMPORTED_MODULE_4__.startTimer)(_config__WEBPACK_IMPORTED_MODULE_0__.ROUND_TIME).subscribe();
};
var listenBigBall = function () {
    var phIndex = 0;
    _config__WEBPACK_IMPORTED_MODULE_0__.SUBJECT.subscribe(function (ball) {
        phIndex++;
        ball.num = phIndex;
        (0,_views_GameView__WEBPACK_IMPORTED_MODULE_2__.drawIntoBallHolder)(ball, phIndex);
        (0,_views_GameView__WEBPACK_IMPORTED_MODULE_2__.markNumberOnTicket)(ball.id);
        (0,_views_GameView__WEBPACK_IMPORTED_MODULE_2__.checkIfPassedTicket)(ball.num);
    });
};
var disableInterfaceAndPrepareTickets = function () {
    (0,_views_GameView__WEBPACK_IMPORTED_MODULE_2__.disableInterface)();
    prepareTickets();
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
};
var listenClickOnBall = function () {
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
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.filter)(function (el) { return el != undefined; }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(function (el) { return el.querySelectorAll('.num'); }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.filter)(function (nums) { return nums != undefined; })).subscribe(function (nums) {
        (0,_views_HomeView__WEBPACK_IMPORTED_MODULE_1__.activateBall)(parseInt(nums.innerHTML));
        _config__WEBPACK_IMPORTED_MODULE_0__.TICKET_TO_BE_POPULATED.numbers.push(parseInt(nums.innerHTML));
    });
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
/* harmony export */   "scheduleGameAndStart": () => (/* binding */ scheduleGameAndStart),
/* harmony export */   "startTimer": () => (/* binding */ startTimer)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/observable/timer.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/tap.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _GameService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameService */ "./src/services/GameService.ts");
/* harmony import */ var _views_HomeView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/HomeView */ "./src/views/HomeView.ts");





var remainingTimeUpdate = function (seconds) {
    var mins = Math.floor(seconds / 60).toString();
    var sec = (seconds - (parseInt(mins) * 60)).toString();
    if (mins.length <= 1)
        mins = "0" + mins;
    if (sec.length <= 1)
        sec = "0" + sec;
    (0,_views_HomeView__WEBPACK_IMPORTED_MODULE_2__.updateDomTimer)(sec, mins);
};
var scheduleGameAndStart = function () {
    startTimer(10).subscribe(function (x) {
        if (x == 5) {
            (0,_GameService__WEBPACK_IMPORTED_MODULE_1__.disableInterfaceAndPrepareTickets)();
        }
        if (x <= 0) {
            (0,_GameService__WEBPACK_IMPORTED_MODULE_1__.startGame)();
        }
    });
};
var startTimer = function (time) {
    var counter = time;
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.timer)(_config__WEBPACK_IMPORTED_MODULE_0__.SEC, _config__WEBPACK_IMPORTED_MODULE_0__.SEC)
        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeWhile)(function () { return counter > 0; }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(function () { return counter--; }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(function () {
        remainingTimeUpdate(counter);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(function () { return counter; }));
};


/***/ }),

/***/ "./src/views/GameView.ts":
/*!*******************************!*\
  !*** ./src/views/GameView.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkIfPassedTicket": () => (/* binding */ checkIfPassedTicket),
/* harmony export */   "clearBigBall": () => (/* binding */ clearBigBall),
/* harmony export */   "createSector1": () => (/* binding */ createSector1),
/* harmony export */   "createSector2": () => (/* binding */ createSector2),
/* harmony export */   "disableInterface": () => (/* binding */ disableInterface),
/* harmony export */   "drawBallHoldersWithMultiplier": () => (/* binding */ drawBallHoldersWithMultiplier),
/* harmony export */   "drawBallInBigBall": () => (/* binding */ drawBallInBigBall),
/* harmony export */   "drawIntoBallHolder": () => (/* binding */ drawIntoBallHolder),
/* harmony export */   "drawMiddleBall": () => (/* binding */ drawMiddleBall),
/* harmony export */   "drawTickets": () => (/* binding */ drawTickets),
/* harmony export */   "initGameView": () => (/* binding */ initGameView),
/* harmony export */   "markNumberOnTicket": () => (/* binding */ markNumberOnTicket),
/* harmony export */   "setTicketNotPassed": () => (/* binding */ setTicketNotPassed),
/* harmony export */   "updateUserBalance": () => (/* binding */ updateUserBalance)
/* harmony export */ });
/* harmony import */ var _helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/HelperViews */ "./src/helpers/HelperViews.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _services_GameService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/GameService */ "./src/services/GameService.ts");



var initGameView = function (host) {
    host.innerHTML = "";
    createSector1(host);
    createSector2(host);
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
var createSector2 = function (host) {
    var sector2 = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'g-sector2');
    var roundInfo = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(sector2, 'timer');
    roundInfo.innerHTML = "\n    <div>\n    <span class=\"minutes\"></span>\n    <span>:</span>\n    <span class=\"seconds\"></span>\n    </div>";
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(roundInfo, 'lbl');
    var divT = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(sector2, 'u-div');
    drawTickets(sector2);
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(divT, 'r-title').innerHTML = 'Balance: ' + _config__WEBPACK_IMPORTED_MODULE_1__.USER.balance;
};
var createSector1 = function (host) {
    var sector1 = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'g-sector1');
    var gDivPlcL = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(sector1, 'g-div-plc');
    var gDivPlcM = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(sector1, 'g-div-plc-m');
    var gDivPlcR = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(sector1, 'g-div-plc');
    drawBallHoldersWithMultiplier((0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(gDivPlcL, 'g-ph-1'), [10000, 7500, 5000, 2500, 1000, 500, 300, 200], 0);
    drawBallHoldersWithMultiplier((0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(gDivPlcL, 'g-ph-2'), [150, 100, 90, 80], 1);
    drawMiddleBall((0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(gDivPlcM, 'g-bb-ph-big'), 500);
    var gBDiv = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(gDivPlcM, 'g-bb-ph');
    drawBallHoldersWithMultiplier((0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(gBDiv, 'g-ph-3'), [70, 60, 50], 2);
    drawBallHoldersWithMultiplier((0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(gBDiv, 'g-ph-3'), [40, 30, 25], 3);
    drawBallHoldersWithMultiplier((0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(gDivPlcR, 'g-ph-2'), [20, 15, 10, 9], 4);
    drawBallHoldersWithMultiplier((0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(gDivPlcR, 'g-ph-1'), [8, 7, 6, 5, 4, 3, 2, 1], 5);
};
var drawBallHoldersWithMultiplier = function (host, multipliers, arrayx) {
    var h = Math.floor(100 / multipliers.length);
    var offset = 5;
    multipliers.forEach(function (el) {
        var bHolder = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'g-b-holder');
        bHolder.style.height = h.toString() + '%';
        var dibBall = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(bHolder, 'g-bhl');
        dibBall.setAttribute('ball-id', (_config__WEBPACK_IMPORTED_MODULE_1__.ARRAY_IDS[arrayx][multipliers.indexOf(el)] + offset).toString());
        dibBall.setAttribute('mult', el.toString());
        (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(bHolder, 'g-mul-l').innerHTML = el.toString();
    });
};
var drawMiddleBall = function (host, multiplier) {
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'g-bb-big-ball');
    var divBalls = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'g-div-bb-balls');
    for (var i = 1; i < 6; i++) {
        (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(divBalls, 'g-bhl').setAttribute('ball-id', i.toString());
    }
    (0,_services_GameService__WEBPACK_IMPORTED_MODULE_2__.listenBigBall)();
};
var drawBallInBigBall = function (ball) {
    var bigBall = document.querySelector('.g-bb-big-ball');
    bigBall.innerHTML = "<div class=\"centerBall\"> ".concat(ball.id.toString(), " </div>");
    _config__WEBPACK_IMPORTED_MODULE_1__.SUBJECT.next(ball);
    bigBall.style.background = ball.color;
    bigBall.style.boxShadow = "0px 5px 12px #0000001F";
    setTimeout(clearBigBall, 2000);
};
var clearBigBall = function () {
    var bigBall = document.querySelector('.g-bb-big-ball');
    bigBall.innerHTML = "";
    bigBall.style.background = '#f8f8f8';
};
var drawIntoBallHolder = function (ball, phIndex) {
    var bh = document.querySelectorAll('div[ball-id]');
    bh.forEach(function (el) {
        if (parseInt(el.getAttribute('ball-id')) == phIndex) {
            var bel = el;
            bel.innerHTML = "<div class=\"bh-b-placed\">".concat(ball.id.toString(), "</div>");
            bel.style.background = ball.color;
        }
    });
};
var markNumberOnTicket = function (numberToMark) {
    var tickets = document.querySelectorAll('div[t-id]');
    tickets.forEach(function (el) {
        el.querySelectorAll('.t-nums').forEach(function (num) {
            if (parseInt(num.innerHTML) == numberToMark) {
                var div = num;
                div.classList.add('t-marked-num');
            }
        });
    });
};
var checkIfPassedTicket = function (multip) {
    var tickets = document.querySelectorAll('div[t-id]');
    tickets.forEach(function (el) {
        var t = el;
        var id = parseInt(t.getAttribute('t-id'));
        if (el.querySelectorAll('.t-marked-num').length == 6 && !el.classList.contains('t-passed')) {
            t.classList.add('t-passed');
            _config__WEBPACK_IMPORTED_MODULE_1__.TICKETS.forEach(function (ticket) {
                if (ticket.num == id) {
                    ticket.passed = true;
                    updateUserBalance(ticket.bet * _config__WEBPACK_IMPORTED_MODULE_1__.MULTIPLIERS[multip]);
                }
            });
        }
    });
};
var setTicketNotPassed = function () {
    var tickets = document.querySelectorAll('.u-ticket');
    tickets.forEach(function (el) {
        if (el.classList.length < 2) {
            el.classList.add('t-failed');
        }
    });
};
var updateUserBalance = function (won) {
    var bal = document.querySelector('.r-title');
    bal.innerHTML = 'Balance: ' + (_config__WEBPACK_IMPORTED_MODULE_1__.USER.balance + won).toString();
    _config__WEBPACK_IMPORTED_MODULE_1__.USER.balance += won;
};
var disableInterface = function () {
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)((document.body.querySelector('.mainContainer')), 'bigTimer');
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
/* harmony import */ var _services_TimerService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/TimerService */ "./src/services/TimerService.ts");





var initHome = function (host) {
    host.innerHTML = "";
    while (_config__WEBPACK_IMPORTED_MODULE_2__.TICKETS.length > 0)
        _config__WEBPACK_IMPORTED_MODULE_2__.TICKETS.pop();
    _config__WEBPACK_IMPORTED_MODULE_2__.TICKET_TO_BE_POPULATED.numbers = [];
    var sector1 = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'sector1');
    var sector2 = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(host, 'sector2');
    initUi(sector2, _config__WEBPACK_IMPORTED_MODULE_2__.USER);
    var title = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(sector1, 'divTitle');
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(title, 'title').innerText = 'Place Bet';
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(title, 'lblTimer').innerHTML = "\n    <span class=\"minutes\"></span>\n    <span>:</span>\n    <span class=\"seconds\"></span>";
    (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createLabel)(title, 'r-title');
    var db = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(sector1, 'divBalls');
    (0,_controllers_BallController__WEBPACK_IMPORTED_MODULE_1__.getBalls)().subscribe(function (balls) {
        drawBallHandlerWithBall(db, balls).then(_services_TicketService__WEBPACK_IMPORTED_MODULE_3__.listenClickOnBall);
    });
    setTimeout(_services_TimerService__WEBPACK_IMPORTED_MODULE_4__.scheduleGameAndStart, 200);
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
    resetActiveTickets();
    var ticket = document.querySelectorAll('div[t-id]');
    ticket.forEach(function (el) {
        if (parseInt(el.getAttribute('t-id')) === ticketId)
            if (el.classList.contains('t-active'))
                el.classList.remove('t-active');
            else
                el.classList.add('t-active');
    });
};
var drawTicket = function () {
    resetActiveTickets();
    var tArea = document.querySelector('.u-main-tickets');
    var ticket = (0,_helpers_HelperViews__WEBPACK_IMPORTED_MODULE_0__.createDiv)(tArea, 'u-ticket');
    ticket.classList.add('t-active');
    ticket.setAttribute('t-id', _config__WEBPACK_IMPORTED_MODULE_2__.TICKET_TO_BE_POPULATED.num.toString());
    ticket.addEventListener('click', function () {
        activateTicket(parseInt(ticket.getAttribute('t-id')));
    }, false);
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

(0,_views_HomeView__WEBPACK_IMPORTED_MODULE_0__.initHome)(document.querySelector('.mainContainer'));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU8sMkNBQTJDLHVEQUF1RDtBQUNsRztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkMEQ7QUFDVjtBQUNzQjtBQUMxQjtBQUNWO0FBQ2E7QUFDSTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLHVEQUFjO0FBQzNGLFFBQVEsZ0VBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsdURBQWM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsMERBQWlCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHVCQUF1QjtBQUNoRDtBQUNBO0FBQ0EsZUFBZSx5REFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMscUJBQXFCLG1CQUFtQixxQkFBcUIsZ0JBQWdCLHdCQUF3QjtBQUNoSixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDcUI7QUFDdEI7QUFDQTtBQUNBLGdGQUFnRixtREFBYztBQUM5RjtBQUNBO0FBQ0Esb0JBQW9CLDREQUFVLGdCQUFnQiw0REFBVSxpQkFBaUIsNERBQVU7QUFDbkY7QUFDQTtBQUNBLHNDQUFzQyxtREFBVSwyQkFBMkIsNkRBQWM7QUFDekY7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDckcwRTtBQUMxRTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQSxvQkFBb0IsdUZBQXlCO0FBQzdDO0FBQ0EsQ0FBQztBQUNvQjtBQUNyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZjRDO0FBQ0Y7QUFDd0I7QUFDTztBQUM1QjtBQUNNO0FBQ25EO0FBQ0EsSUFBSSxnREFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isa0ZBQXVCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnRUFBWTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQywrQ0FBUSwwQ0FBMEMsVUFBVTtBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxRQUFRO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnRUFBWTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnRUFBWTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDZEQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQVk7QUFDL0I7QUFDQSxZQUFZLDBEQUFTO0FBQ3JCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG1EQUFVO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDLG1EQUFVO0FBQ087QUFDbkI7QUFDQSxJQUFJLGdEQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdJQUF3SSw2REFBa0I7QUFDMUo7QUFDQTtBQUNBLENBQUM7QUFDMkI7QUFDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqS2tDO0FBQ2E7QUFDZTtBQUM1QjtBQUNpQztBQUNoQztBQUNrRTtBQUN2QztBQUNYO0FBQ25EO0FBQ0EsSUFBSSxnREFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNkRBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msd0VBQWdCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHlFQUFpQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHlFQUFxQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLENBQUMsdURBQVk7QUFDUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxJQUFJLGdEQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsWUFBWSw0REFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG9FQUErQjtBQUN4RDtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUN5QjtBQUMxQjtBQUNBLFFBQVEsaUZBQTRDO0FBQ3BELFFBQVEsZ0VBQVk7QUFDcEI7QUFDQTtBQUNBLFFBQVEsZ0ZBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxpRUFBNEI7QUFDNUQsNkJBQTZCLGtGQUEwQixlQUFlLHlEQUF5RDtBQUMvSDtBQUNPO0FBQ1A7QUFDQSxVQUFVLDRDQUFJO0FBQ2Q7QUFDQSxjQUFjLDRDQUFJO0FBQ2xCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkx3RDtBQUNUO0FBQ2tCO0FBQ3BCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsK0NBQVEsb0RBQW9ELHNCQUFzQjtBQUNsSTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxRQUFRO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDREQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDBFQUFtQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsK0NBQVEsdURBQXVELHVCQUF1QjtBQUNuSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMEVBQW1CO0FBQ2xFLHlDQUF5QyxvREFBYSxDQUFDLG9EQUFhLEtBQUssNkNBQU0sV0FBVyw2Q0FBTTtBQUNoRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxRQUFRO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwwRUFBbUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBEQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBEQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ3VCO0FBQ2pCO0FBQ0E7QUFDUDtBQUNBLHVDQUF1Qyw0REFBVSxrQkFBa0IsNERBQVUsZUFBZSw0REFBVTtBQUN0RztBQUNBO0FBQ0EsUUFBUSw0REFBVTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5SU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1AyQztBQUNwQyxnQkFBZ0IsbURBQVUseUJBQXlCLCtCQUErQjtBQUNsRjtBQUNQO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbURBQVUseUJBQXlCLHdDQUF3QywrQkFBK0IsSUFBSTtBQUM3SDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDUm1EO0FBQ1g7QUFDakM7QUFDUCx1QkFBdUIsK0RBQVMscUJBQXFCLHFEQUFTO0FBQzlEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0wrQjtBQUNxQjtBQUNUO0FBQ007QUFDQztBQUNGO0FBQ1k7QUFDNUQ7QUFDQTtBQUNBO0FBQ087QUFDUCxRQUFRLDREQUFVO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELHdFQUFnQjtBQUMxRTtBQUNBLGFBQWEsNkNBQU07QUFDbkIseURBQXlELDRCQUE0Qiw0REFBNEQ7QUFDako7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDhEQUFXO0FBQ3ZCLG1CQUFtQiw2REFBUSx3QkFBd0Isa0RBQWtELEVBQUUsZ0VBQVM7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbURBQVU7QUFDekI7QUFDQTtBQUNBLDZCQUE2Qix1QkFBdUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixLQUFLO0FBQ0w7QUFDQTtBQUNBLG1DQUFtQyw0QkFBNEI7QUFDL0Q7QUFDQTtBQUNBLFdBQVcsNERBQVUsd0JBQXdCLDREQUFVO0FBQ3ZEO0FBQ0E7QUFDQSxXQUFXLDREQUFVLGVBQWUsNERBQVU7QUFDOUM7QUFDQTtBQUNBLFdBQVcsNERBQVUsNkJBQTZCLDREQUFVO0FBQzVEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUR3RTtBQUN0QjtBQUNKO0FBQ0g7QUFDdUI7QUFDUjtBQUN3QjtBQUNsQztBQUN3RDtBQUN4RDtBQUNvQjtBQUNHO0FBQ2hFO0FBQ1AseUJBQXlCLG1EQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLFlBQVksOEVBQW1CO0FBQy9CO0FBQ0E7QUFDQSxZQUFZLDhEQUFXO0FBQ3ZCO0FBQ0E7QUFDQSxZQUFZLDBEQUFTO0FBQ3JCO0FBQ0E7QUFDQSxZQUFZLHNFQUFlO0FBQzNCO0FBQ0E7QUFDQSxZQUFZLDREQUFVO0FBQ3RCO0FBQ0E7QUFDQSxZQUFZLGdGQUFvQjtBQUNoQztBQUNBO0FBQ0E7QUFDQSxVQUFVLDhGQUFnQztBQUMxQztBQUNPO0FBQ1AsZUFBZSxtREFBVTtBQUN6QixzQkFBc0IsMERBQWlCO0FBQ3ZDLFlBQVksNERBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUCxlQUFlLG1EQUFVO0FBQ3pCLHdCQUF3Qix3Q0FBd0M7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUCxlQUFlLG1EQUFVO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsbUJBQW1CLCtCQUErQjtBQUMzRCx3QkFBd0IsNkVBQW9CO0FBQzVDLEtBQUs7QUFDTDtBQUNPO0FBQ1AsZUFBZSxtREFBVTtBQUN6QjtBQUNBO0FBQ0Esa0NBQWtDLGdEQUFRLDhDQUE4QyxvQkFBb0I7QUFDNUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUCxlQUFlLG1EQUFVO0FBQ3pCLGtFQUFrRSwrQkFBK0I7QUFDakcsS0FBSztBQUNMO0FBQ087QUFDUCw2QkFBNkIsOEZBQWtDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxpREFBUztBQUNwQjtBQUNBLGVBQWUsbURBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHFEQUFhO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUkyQztBQUNrQjtBQUNYO0FBQ0w7QUFDdEM7QUFDUCw4QkFBOEI7QUFDOUIsZ0NBQWdDLFlBQVksbURBQWM7QUFDMUQ7QUFDQTtBQUNBLFlBQVksOERBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtREFBVTtBQUN6QixrQkFBa0IseURBQVc7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ2tDO0FBQ1M7QUFDcEM7QUFDUDtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdEQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDLG1EQUFVO0FBQ2tCO0FBQzlCOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUR1QztBQUN5QjtBQUN6RDtBQUNQLFdBQVcsbURBQU87QUFDbEI7QUFDQSx5QkFBeUIsNkVBQXdCLGdDQUFnQywyRUFBMkU7QUFDNUosS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSdUM7QUFDeUI7QUFDekQ7QUFDUCxXQUFXLG1EQUFPO0FBQ2xCO0FBQ0EseUJBQXlCLDZFQUF3QjtBQUNqRDtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWb0Q7QUFDTTtBQUNNO0FBQ3pEO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnRUFBUyxvQ0FBb0MsNkVBQXdCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixzRUFBZSw4Q0FBOEMsbUNBQW1DO0FBQzVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxxQkFBcUIsNkVBQXdCO0FBQzdDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVENEI7QUFDd0I7QUFDYjtBQUNXO0FBQ0Y7QUFDekM7QUFDUCxpQ0FBaUM7QUFDakMsUUFBUSw0REFBVTtBQUNsQiwwQ0FBMEMsT0FBTyx5Q0FBRyxvQkFBb0IscUNBQXFDLEVBQUUsZ0VBQVMsbUJBQW1CO0FBQzNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtREFBTyxpQ0FBaUMsT0FBTywrREFBYyw0Q0FBNEM7QUFDcEg7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmMEQ7QUFDbkI7QUFDeUI7QUFDekQ7QUFDUCw0QkFBNEI7QUFDNUIsV0FBVyxtREFBTztBQUNsQix5QkFBeUIsNkVBQXdCLGdDQUFnQyxPQUFPLHNFQUFlLHNDQUFzQyxnQ0FBZ0MsV0FBVyxnQkFBZ0IsT0FBTyxzRUFBZSxzQ0FBc0MsK0JBQStCLFdBQVcsbUJBQW1CLE9BQU8sc0VBQWUsc0NBQXNDLCtCQUErQixXQUFXO0FBQ3ZhLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNUdUM7QUFDaEM7QUFDUCw0QkFBNEI7QUFDNUIsV0FBVyxtREFBTztBQUNsQix3REFBd0Qsc0NBQXNDO0FBQzlGLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1BvRDtBQUNiO0FBQ3lCO0FBQ3pEO0FBQ1AsV0FBVyxtREFBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUMseUJBQXlCLDZFQUF3QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxZQUFZLGdFQUFTLDBEQUEwRCw2RUFBd0IscUNBQXFDLG9IQUFvSDtBQUNoUTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCNEM7QUFDTDtBQUN5QjtBQUN6RDtBQUNQO0FBQ0E7QUFDQSwwQkFBMEIsT0FBTyxvREFBSztBQUN0QyxVQUFVLG1EQUFPO0FBQ2pCO0FBQ0EsNkJBQTZCLDZFQUF3QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQnVDO0FBQ3lCO0FBQ3pEO0FBQ1AsZ0NBQWdDO0FBQ2hDLFdBQVcsbURBQU87QUFDbEI7QUFDQSx5QkFBeUIsNkVBQXdCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYmdEO0FBQ1Q7QUFDeUI7QUFDcEI7QUFDckM7QUFDUCxzQkFBc0IsNERBQVU7QUFDaEM7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFVBQVUsbURBQU87QUFDakI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDZFQUF3QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxZQUFZLG9EQUFRO0FBQ3BCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDMkM7QUFDcEM7QUFDUCxlQUFlLG1EQUFVO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQjJDO0FBQ2U7QUFDbkQ7QUFDUDtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1EQUFVO0FBQ3pCLFFBQVEsc0VBQWU7QUFDdkI7QUFDQSxZQUFZLHNFQUFlO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCMkM7QUFDc0I7QUFDakI7QUFDVTtBQUNuRDtBQUNQLGVBQWUsbURBQVU7QUFDekI7QUFDQSxRQUFRLHNFQUFlO0FBQ3ZCLDZCQUE2QixzREFBZTtBQUM1QyxZQUFZLHNFQUFlO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCw2QkFBNkIsT0FBTyw0REFBVTtBQUM5QyxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQm9EO0FBQ0Q7QUFDSTtBQUNoRDtBQUNQLFdBQVcsZ0VBQVMsYUFBYSxtRUFBVyxhQUFhLCtEQUFTO0FBQ2xFO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTm9EO0FBQ0Q7QUFDSTtBQUNoRDtBQUNQLFdBQVcsZ0VBQVMsYUFBYSxtRUFBVyxhQUFhLCtEQUFTO0FBQ2xFO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOZ0U7QUFDa0I7QUFDM0U7QUFDUCxXQUFXLDZFQUFxQixDQUFDLDhGQUFrQztBQUNuRTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMMEQ7QUFDTjtBQUNKO0FBQ007QUFDVTtBQUNFO0FBQ3BCO0FBQ0k7QUFDRjtBQUNVO0FBQ3dCO0FBQ2Q7QUFDTTtBQUNuRTtBQUNQO0FBQ0EsWUFBWSw4RUFBbUI7QUFDL0IsbUJBQW1CLHVFQUFrQjtBQUNyQztBQUNBLFlBQVksOERBQVc7QUFDdkIsbUJBQW1CLDZEQUFhO0FBQ2hDO0FBQ0EsWUFBWSwwREFBUztBQUNyQixtQkFBbUIsaUVBQWU7QUFDbEM7QUFDQSxZQUFZLHNFQUFlO0FBQzNCLG1CQUFtQiw2RUFBcUI7QUFDeEM7QUFDQSxZQUFZLDREQUFVO0FBQ3RCLG1CQUFtQixtRUFBZ0I7QUFDbkM7QUFDQSxZQUFZLGlGQUFvQjtBQUNoQyxtQkFBbUIsd0ZBQTBCO0FBQzdDO0FBQ0E7QUFDQSxVQUFVLCtGQUFnQztBQUMxQztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDcENrQztBQUNhO0FBQy9DO0FBQ0EsSUFBSSxnREFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLENBQUMsQ0FBQyx1REFBWTtBQUNJO0FBQ2xCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNka0M7QUFDQTtBQUNvQjtBQUNSO0FBQzlDO0FBQ0EsSUFBSSxnREFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLGVBQWUsMkVBQTRCO0FBQzNDO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2RUFBOEI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDLDJDQUFNO0FBQ2U7QUFDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RmtDO0FBQ087QUFDekM7QUFDQSxJQUFJLGdEQUFTO0FBQ2I7QUFDQSw4QkFBOEIsTUFBTSxxREFBYTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDLGlEQUFTO0FBQ2U7QUFDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEM0QztBQUNNO0FBQzNDLHlCQUF5QiwyREFBYyxDQUFDLHFEQUFXO0FBQ25EO0FBQ1A7Ozs7Ozs7Ozs7Ozs7O0FDSk87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ3ZDO0FBQ1A7QUFDQTtBQUNBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Qsb0RBQWEscUJBQXFCLDZDQUFNO0FBQ2hHO0FBQ0EseUNBQXlDLG9EQUFhLHFCQUFxQiw2Q0FBTTtBQUNqRixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkI4QztBQUN2QztBQUNQO0FBQ0E7QUFDQSx5QkFBeUIsdUJBQXVCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELG9EQUFhLHFCQUFxQiw2Q0FBTTtBQUMvRjtBQUNBLHdDQUF3QyxvREFBYSxxQkFBcUIsNkNBQU07QUFDaEYsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ25CTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQOzs7Ozs7Ozs7Ozs7OztBQ1BPLGdDQUFnQywrRUFBK0U7QUFDdEg7Ozs7Ozs7Ozs7Ozs7OztBQ0RzRDtBQUMvQyw4QkFBOEIsbUVBQWdCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7OztBQ1JzRDtBQUMvQywwQkFBMEIsbUVBQWdCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLDJHQUEyRyx1Q0FBdUM7QUFDbEo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7O0FDWE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZtQztBQUNuQztBQUNPO0FBQ1AsUUFBUSxpRkFBNEM7QUFDcEQ7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxRQUFRLGlGQUE0QztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzNCTztBQUNQLDRCQUE0QjtBQUM1Qiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDakJPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0hPLGtDQUFrQyxzRUFBc0U7QUFDL0c7Ozs7Ozs7Ozs7Ozs7OztBQ0QwQztBQUNuQztBQUNQLG1DQUFtQyx1REFBVTtBQUM3QztBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0pPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0hPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSHVFO0FBQzdCO0FBQ25DO0FBQ1AsV0FBVyx1REFBVSxPQUFPLDBEQUFpQjtBQUM3QztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDTGlFO0FBQ3ZCO0FBQ25DO0FBQ1AsV0FBVyx1REFBVSxxREFBcUQsc0RBQWU7QUFDekY7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTDBDO0FBQ25DO0FBQ1AsV0FBVyx1REFBVTtBQUNyQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0orRDtBQUNyQjtBQUNuQztBQUNQLFdBQVcsdURBQWdCO0FBQzNCO0FBQ0EsZUFBZSxrREFBVztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLEtBQUssRUFBRSxFQUFjO0FBQzdDLCtCQUErQiw4Q0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsOENBQU87QUFDdEM7QUFDQSxtQ0FBbUMsOENBQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ087QUFDUCxXQUFXLHVEQUFVO0FBQ3JCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDMEM7QUFDbkM7QUFDUCxvQkFBb0IsdURBQVU7QUFDOUI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0owQztBQUNuQztBQUNQLFdBQVcsdURBQVU7QUFDckI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkI4QztBQUNQO0FBQ3ZDO0FBQ0E7QUFDQSw0Q0FBNEMsb0RBQWEsS0FBSyw2Q0FBTTtBQUNwRTtBQUNPO0FBQ1AsV0FBVyxtREFBRyxtQkFBbUIsK0JBQStCO0FBQ2hFO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDVE87QUFDUDs7Ozs7Ozs7Ozs7Ozs7OztBQ0RzQztBQUMvQjtBQUNQO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxlQUFlLCtDQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsa0JBQWtCO0FBQ2xFO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25CbUM7QUFDNEI7QUFDeEQ7QUFDUCxJQUFJLGtGQUEwQjtBQUM5QiwrQkFBK0IsNERBQXVCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2JPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBNkI7QUFFdEIsSUFBTSxjQUFjLEdBQUcsdUJBQXVCLENBQUM7QUFDL0MsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzNCLElBQU0sVUFBVSxHQUFHLEVBQUUsR0FBRyxhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUVqRCxJQUFNLE9BQU8sR0FBRyxFQUFFO0FBRWxCLElBQU0sc0JBQXNCLEdBQVc7SUFDMUMsT0FBTyxFQUFFLEVBQUU7SUFDWCxHQUFHLEVBQUUsT0FBTztJQUNaLEdBQUcsRUFBRSxDQUFDO0lBQ04sTUFBTSxFQUFFLEtBQUs7Q0FDaEIsQ0FBQztBQUNLLElBQU0sT0FBTyxHQUFhLEVBQUU7QUFFNUIsSUFBTSxJQUFJLEdBQVM7SUFDdEIsRUFBRSxFQUFFLENBQUM7SUFDTCxPQUFPLEVBQUUsSUFBSTtJQUNiLElBQUksRUFBRSxPQUFPO0NBQ2hCO0FBRU0sSUFBTSxHQUFHLEdBQVcsSUFBSSxDQUFDO0FBQ3pCLElBQU0sT0FBTyxHQUFXLEdBQUcsQ0FBQztBQUM1QixJQUFNLElBQUksR0FBVyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBRWxDLElBQU0sU0FBUyxHQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekosSUFBTSxXQUFXLEdBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0ssSUFBTSxPQUFPLEdBQWtCLElBQUkseUNBQU8sRUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQnBCO0FBRUc7QUFFbEMsSUFBTSxRQUFRLEdBQUc7SUFDcEIsSUFBTSxPQUFPLEdBQW9CLEtBQUssQ0FBQyxVQUFHLG1EQUFjLFVBQU8sQ0FBQztTQUMzRCxJQUFJLENBQUMsVUFBQyxHQUFHO1FBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7U0FDckI7YUFBTTtZQUNILE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLDRCQUE0QjtTQUMvQjtJQUNMLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxVQUFDLEdBQUc7UUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsT0FBTywwQ0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQztBQUVLLElBQU0sZUFBZSxHQUFHLFVBQUMsS0FBYTtJQUN6QyxJQUFNLE9BQU8sR0FBb0IsS0FBSyxDQUFDLFVBQUcsbURBQWMscUJBQVcsS0FBSyxDQUFFLENBQUM7U0FDdEUsSUFBSSxDQUFDLFVBQUMsR0FBRztRQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQ3JCO2FBQU07WUFDSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQiw0QkFBNEI7U0FDL0I7SUFDTCxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsVUFBQyxHQUFHO1FBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztJQUNQLE9BQU8sMENBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDSyxJQUFNLGVBQWUsR0FBRyxVQUFDLE1BQWM7SUFDMUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4SCxDQUFDLENBQUM7QUFFSyxJQUFNLFlBQVksR0FBRyxVQUFDLEdBQVcsRUFBRSxHQUFXO0lBQ2pELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUM1RCxDQUFDO0FBRU0sSUFBTSxXQUFXLEdBQUcsVUFBQyxHQUFVLEVBQUUsS0FBVTtJQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRztRQUNwQixPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUM7SUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFTSxJQUFNLFlBQVksR0FBRyxVQUFDLEtBQVk7O0lBQ3JDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDO0lBQzdDLE9BQU8sWUFBWSxJQUFJLENBQUMsRUFBRTtRQUN0QixXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFDdkQsWUFBWSxFQUFFLENBQUM7UUFDZixLQUE0QztZQUN4QyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQztTQUFDLEVBRDNDLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQ0s7S0FDaEQ7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJNLElBQU0sU0FBUyxHQUFHLFVBQUMsTUFBbUIsRUFBRSxTQUFpQjtJQUM1RCxJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdCLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFeEIsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDLENBQUM7QUFFSyxJQUFNLFdBQVcsR0FBRyxVQUFDLE1BQW1CLEVBQUUsU0FBa0I7SUFDL0QsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVc7UUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXhCLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRUssSUFBTSxZQUFZLEdBQUcsVUFBQyxNQUFtQixFQUFFLFNBQWtCO0lBQ2hFLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXO1FBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV4QixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVLLElBQU0sV0FBVyxHQUFHLFVBQUMsTUFBbUIsRUFBRSxTQUFrQjtJQUMvRCxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVztRQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFekIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBRUssSUFBTSxtQkFBbUIsR0FBRyxVQUFDLE9BQWUsRUFBRSxNQUFtQixFQUFFLFNBQWtCO0lBQ3hGLElBQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXO1FBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV2QixPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDOEQ7QUFDYTtBQUNWO0FBVXZDO0FBQ2dDO0FBQ2pCO0FBQ2E7QUFHaEQsSUFBTSxTQUFTLEdBQUc7SUFDckIsSUFBSSxLQUFhO0lBQ2pCLHFFQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1FBQ3ZCLEtBQUssR0FBRyxLQUFLO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLDRDQUFVLENBQUMsVUFBQyxHQUFHO1FBQ3RCLFdBQVcsQ0FBQztZQUNSLEdBQUcsQ0FBQyxJQUFJLENBQ0osS0FBSyxDQUFDLE1BQU0sQ0FDUixrRUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FDdkIsa0VBQVksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUNKLENBQUMsQ0FBQyxDQUNWLENBQUM7UUFDTixDQUFDLEVBQUUsa0RBQWEsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0gsMENBQUksQ0FBQyxFQUFFLENBQUMsRUFDUix5Q0FBRyxDQUFDLFdBQUMsSUFBSSxRQUFTLEVBQVQsQ0FBUyxDQUFDLENBQUM7U0FDbkIsU0FBUyxDQUFDLFVBQUMsQ0FBQztRQUNULGtFQUFpQixDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFO1lBQ3JCLG1FQUFrQixFQUFFLENBQUM7WUFDckIsVUFBVSxDQUFDO2dCQUNQLHlEQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RELENBQUMsRUFBRSxJQUFJLENBQUM7U0FDWDtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVNLElBQU0sZUFBZSxHQUFHLFVBQUMsRUFBZTtJQUMzQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRztRQUNuQixJQUFJLENBQUMsR0FBVztZQUNaLE9BQU8sRUFBRSxFQUFFO1lBQ1gsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsQ0FBQztZQUNOLE1BQU0sRUFBRSxLQUFLO1NBQ2hCLENBQUM7UUFDRiwwQ0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMseUNBQUcsQ0FBQyxZQUFFLElBQUksZUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQUUsSUFBSSxRQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1FBQzVILENBQUMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBc0IsQ0FBQyxLQUFLLENBQUM7UUFDNUYsQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pELGlEQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN0QixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUM7QUFDTixDQUFDO0FBRU0sSUFBTSxjQUFjLEdBQUc7SUFDMUIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO0lBRXRELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBRTtRQUNYLGVBQWUsQ0FBQyxFQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQUM7WUFDckMsaURBQVksQ0FBQyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRU0sSUFBTSxTQUFTLEdBQUc7SUFDckIsNkRBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN2RCxTQUFTLEVBQUU7SUFDWCx5REFBVSxDQUFDLCtDQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUN2QyxDQUFDO0FBRU0sSUFBTSxhQUFhLEdBQUc7SUFDekIsSUFBSSxPQUFPLEdBQVcsQ0FBQyxDQUFDO0lBQ3hCLHNEQUFpQixDQUFDLGNBQUk7UUFDbEIsT0FBTyxFQUFFLENBQUM7UUFDVixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNuQixtRUFBa0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEMsbUVBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMzQixvRUFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVNLElBQU0saUNBQWlDLEdBQUc7SUFDN0MsaUVBQWdCLEVBQUU7SUFDbEIsY0FBYyxFQUFFO0FBQ3BCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUZzRDtBQUNHO0FBQ3dDO0FBRzNGLElBQU0sYUFBYSxHQUFHLFVBQUMsTUFBYztJQUN4QyxJQUFJLDBFQUFxQyxJQUFJLENBQUMsRUFBRTtRQUM1QyxtRUFBOEIsR0FBRyxFQUFFLENBQUM7UUFDcEMsK0RBQTBCLEVBQUUsQ0FBQztRQUM3QiwrREFBMEIsR0FBRyw0Q0FBTyxDQUFDO1FBQ3JDLDJEQUFVLEVBQUUsQ0FBQztRQUNiLGNBQWMsRUFBRSxDQUFDO0tBQ3BCO1NBQU07UUFDSCx3RUFBbUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxvRUFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQjtBQUNMLENBQUM7QUFFTSxJQUFNLGlCQUFpQixHQUFHO0lBQzdCLDJEQUFVLEVBQUUsQ0FBQztJQUNiLCtDQUFTLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFFLE9BQU8sQ0FBQztTQUN4RCxJQUFJLENBQ0QseUNBQUcsQ0FBQyxZQUFFLElBQUksZUFBUSxDQUFrQixFQUFFLENBQUMsTUFBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUF4RCxDQUF3RCxDQUFDLEVBQ25FLDRDQUFNLENBQUMsWUFBRSxJQUFJLFNBQUUsSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQTdCLENBQTZCLENBQUMsRUFDM0MseUNBQUcsQ0FBQyxZQUFFO1FBQ0YsSUFBSSw0RUFBdUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM3QywwRUFBcUMsQ0FBQywyRUFBc0MsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRixvRUFBbUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUIsT0FBTyxDQUFDO1NBQ1g7O1lBQU0sT0FBTyxFQUFFO0lBQ3BCLENBQUMsQ0FBQyxFQUNGLDRDQUFNLENBQUMsYUFBRyxJQUFJLFVBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsRUFBNUIsQ0FBNEIsQ0FBQyxDQUM5QyxDQUFDLFNBQVMsQ0FBQyxXQUFDLElBQUksb0JBQWEsQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFTSxJQUFNLGNBQWMsR0FBRztJQUMxQiwrQ0FBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxPQUFPLENBQUM7U0FDckQsSUFBSSxDQUNELHlDQUFHLENBQUMsWUFBRTtRQUNGLG1FQUE4QixHQUFHLEVBQUUsQ0FBQztRQUNwQyxpRUFBZ0IsRUFBRSxDQUFDO1FBQ25CLE9BQXVCLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckMsQ0FBQyxDQUFDLEVBQ0YsNENBQU0sQ0FBQyxZQUFFLElBQUksU0FBRSxJQUFJLFNBQVMsRUFBZixDQUFlLENBQUMsRUFDN0IsK0NBQVMsQ0FBQyxZQUFFLElBQUksU0FBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUEzQixDQUEyQixDQUFDLEVBQzVDLDRDQUFNLENBQUMsY0FBSSxJQUFJLFdBQUksSUFBSSxTQUFTLEVBQWpCLENBQWlCLENBQUMsQ0FDcEMsQ0FBQyxTQUFTLENBQUMsY0FBSTtRQUNoQiw2REFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN2Qyx3RUFBbUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQyxDQUFDO0FBQ04sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEQyQztBQUNFO0FBQ2hCO0FBQzZDO0FBQzFCO0FBRzFDLElBQU0sbUJBQW1CLEdBQUcsVUFBQyxPQUFlO0lBQy9DLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZELElBQUksR0FBRyxHQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFL0QsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7UUFDaEIsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDdEIsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUM7UUFDZixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNwQiwrREFBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBRU0sSUFBTSxvQkFBb0IsR0FBRztJQUNoQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1IsK0VBQWlDLEVBQUU7U0FDdEM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDUix1REFBUyxFQUFFO1NBQ2Q7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFHTSxJQUFNLFVBQVUsR0FBRyxVQUFDLElBQVk7SUFDbkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25CLE9BQU8sMkNBQUssQ0FBQyx3Q0FBRyxFQUFFLHdDQUFHLENBQUM7U0FDakIsSUFBSSxDQUNELHlEQUFTLENBQUMsY0FBTSxjQUFPLEdBQUcsQ0FBQyxFQUFYLENBQVcsQ0FBQyxFQUM1QixtREFBRyxDQUFDLGNBQU0sY0FBTyxFQUFFLEVBQVQsQ0FBUyxDQUFDLEVBQ3BCLG1EQUFHLENBQUM7UUFDQSxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7SUFDaEMsQ0FBQyxDQUFDLEVBQ0YseUNBQUcsQ0FBQyxjQUFNLGNBQU8sRUFBUCxDQUFPLENBQUMsQ0FDckI7QUFDVCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekM2RDtBQUNXO0FBRW5CO0FBRS9DLElBQU0sWUFBWSxHQUFHLFVBQUMsSUFBaUI7SUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFO0lBQ25CLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUVNLElBQU0sV0FBVyxHQUFHLFVBQUMsSUFBaUI7SUFDekMsb0RBQWUsQ0FBQyxZQUFFO1FBQ2QsSUFBSSxNQUFNLEdBQUcsK0RBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxJQUFJLEdBQUcsK0RBQVMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBRztZQUNsQiwrREFBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pELENBQUMsQ0FBQztRQUNGLCtEQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN2RSxDQUFDLENBQUM7QUFDTixDQUFDO0FBRU0sSUFBTSxhQUFhLEdBQUcsVUFBQyxJQUFpQjtJQUMzQyxJQUFNLE9BQU8sR0FBRywrREFBUyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3QyxJQUFJLFNBQVMsR0FBRywrREFBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7SUFDM0MsU0FBUyxDQUFDLFNBQVMsR0FBRyx1SEFLZixDQUFDO0lBQ1IsaUVBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO0lBQzdCLElBQUksSUFBSSxHQUFHLCtEQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixpRUFBVyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxTQUFTLEdBQUcsV0FBVyxHQUFHLGlEQUFZO0FBQ3ZFLENBQUM7QUFFTSxJQUFNLGFBQWEsR0FBRyxVQUFDLElBQWlCO0lBQzNDLElBQU0sT0FBTyxHQUFHLCtEQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLElBQUksUUFBUSxHQUFHLCtEQUFTLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQy9DLElBQUksUUFBUSxHQUFHLCtEQUFTLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELElBQUksUUFBUSxHQUFHLCtEQUFTLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRS9DLDZCQUE2QixDQUFDLCtEQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hILDZCQUE2QixDQUFDLCtEQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFcEYsY0FBYyxDQUFDLCtEQUFTLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUN2RCxJQUFJLEtBQUssR0FBRywrREFBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7SUFDMUMsNkJBQTZCLENBQUMsK0RBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxRSw2QkFBNkIsQ0FBQywrREFBUyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTFFLDZCQUE2QixDQUFDLCtEQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakYsNkJBQTZCLENBQUMsK0RBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUYsQ0FBQztBQUVNLElBQU0sNkJBQTZCLEdBQUcsVUFBQyxJQUFpQixFQUFFLFdBQXFCLEVBQUUsTUFBYztJQUNsRyxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckQsSUFBSSxNQUFNLEdBQVcsQ0FBQztJQUN0QixXQUFXLENBQUMsT0FBTyxDQUFDLFlBQUU7UUFDbEIsSUFBSSxPQUFPLEdBQUcsK0RBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHO1FBQ3pDLElBQUksT0FBTyxHQUFHLCtEQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUN6QyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLDhDQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pHLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQywrREFBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMzRCxDQUFDLENBQUM7QUFDTixDQUFDO0FBRU0sSUFBTSxjQUFjLEdBQUcsVUFBQyxJQUFpQixFQUFFLFVBQWtCO0lBQ2hFLCtEQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQztJQUNoQyxJQUFJLFFBQVEsR0FBRywrREFBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQztJQUNoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hCLCtEQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDdEU7SUFDRCxvRUFBYSxFQUFFO0FBQ25CLENBQUM7QUFFTSxJQUFNLGlCQUFpQixHQUFHLFVBQUMsSUFBVTtJQUN4QyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFnQixDQUFDO0lBQ3RFLE9BQU8sQ0FBQyxTQUFTLEdBQUcscUNBQTRCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVMsQ0FBQztJQUM1RSxpREFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLENBQUM7SUFDbkQsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRU0sSUFBTSxZQUFZLEdBQUc7SUFDeEIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBZ0IsQ0FBQztJQUN0RSxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDekMsQ0FBQztBQUVNLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxJQUFVLEVBQUUsT0FBZTtJQUMxRCxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO0lBQ2xELEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBRTtRQUNULElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxPQUFPLEVBQUU7WUFDakQsSUFBSSxHQUFHLEdBQUcsRUFBaUIsQ0FBQztZQUM1QixHQUFHLENBQUMsU0FBUyxHQUFHLHFDQUE0QixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFRO1lBQ3RFLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDckM7SUFDTCxDQUFDLENBQUM7QUFDTixDQUFDO0FBQ00sSUFBTSxrQkFBa0IsR0FBRyxVQUFDLFlBQW9CO0lBQ25ELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFDcEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFFO1FBQ2QsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFHO1lBQ3RDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxZQUFZLEVBQUU7Z0JBQ3pDLElBQUksR0FBRyxHQUFHLEdBQWtCO2dCQUM1QixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNyQztRQUNMLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFTSxJQUFNLG1CQUFtQixHQUFHLFVBQUMsTUFBYztJQUM5QyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQ3BELE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBRTtRQUNkLElBQUksQ0FBQyxHQUFHLEVBQWlCO1FBQ3pCLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN4RixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QixvREFBZSxDQUFDLGdCQUFNO2dCQUNsQixJQUFJLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO29CQUNsQixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDckIsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxnREFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN0RDtZQUNMLENBQUMsQ0FBQztTQUNMO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVNLElBQU0sa0JBQWtCLEdBQUc7SUFDOUIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztJQUNwRCxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQUU7UUFDZCxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFTSxJQUFNLGlCQUFpQixHQUFHLFVBQUMsR0FBVztJQUN6QyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBZ0I7SUFDM0QsR0FBRyxDQUFDLFNBQVMsR0FBRyxXQUFXLEdBQUcsQ0FBQyxpREFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlELGlEQUFZLElBQUksR0FBRztBQUN2QixDQUFDO0FBRU0sSUFBTSxnQkFBZ0IsR0FBRztJQUM1QiwrREFBUyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBZ0IsRUFBRSxVQUFVLENBQUM7QUFDekYsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZKMEU7QUFDcEI7QUFHa0I7QUFDYjtBQUNFO0FBRXZELElBQU0sUUFBUSxHQUFHLFVBQUMsSUFBaUI7SUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDcEIsT0FBTyxtREFBYyxHQUFHLENBQUM7UUFDckIsZ0RBQVcsRUFBRSxDQUFDO0lBQ2xCLG1FQUE4QixHQUFHLEVBQUUsQ0FBQztJQUVwQyxJQUFNLE9BQU8sR0FBRywrREFBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzQyxJQUFNLE9BQU8sR0FBRywrREFBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUUzQyxNQUFNLENBQUMsT0FBTyxFQUFFLHlDQUFJLENBQUMsQ0FBQztJQUV0QixJQUFNLEtBQUssR0FBRywrREFBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM3QyxpRUFBVyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO0lBQ3BELGlFQUFXLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxnR0FHYixDQUFDO0lBQy9CLGlFQUFXLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQztJQUU3QixJQUFNLEVBQUUsR0FBRywrREFBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUUxQyxxRUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztRQUN2Qix1QkFBdUIsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLHNFQUFpQixDQUFDLENBQUM7SUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsd0VBQW9CLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUNNLElBQU0sdUJBQXVCLEdBQUcsVUFBQyxJQUFpQixFQUFFLEtBQWE7SUFDcEUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87UUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFFO1lBQ1osU0FBUyxDQUFDLEVBQUUsRUFDUiwrREFBUyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQztRQUNGLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRU0sSUFBTSxNQUFNLEdBQUcsVUFBQyxJQUFpQixFQUFFLElBQVU7SUFDaEQsSUFBTSxLQUFLLEdBQUcsK0RBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkMsaUVBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3BFLGlFQUFXLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUM3RCxJQUFNLE9BQU8sR0FBRywrREFBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFFTSxJQUFNLFNBQVMsR0FBRyxVQUFDLElBQVUsRUFBRSxJQUFpQjtJQUNuRCxJQUFNLENBQUMsR0FBRywrREFBUyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDaEMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLEVBQUU7UUFDM0IsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDYixDQUFDO0FBRU0sSUFBTSxZQUFZLEdBQUcsVUFBQyxNQUFjO0lBQ3ZDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7U0FDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDcEMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDOztRQUUvQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBQ00sSUFBTSxjQUFjLEdBQUcsVUFBQyxRQUFnQjtJQUMzQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFFO1FBQ2IsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLFFBQVE7WUFDOUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7Z0JBQ2pDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Z0JBRS9CLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFTSxJQUFNLFVBQVUsR0FBRztJQUN0QixrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQWdCO0lBRXBFLElBQUksTUFBTSxHQUFHLCtEQUFTLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNoQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSx3RUFBbUMsRUFBRSxDQUFDLENBQUM7SUFDbkUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUM3QixjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFHVixpRUFBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxTQUFTLEdBQUcsVUFBVSxHQUFHLHdFQUFtQyxFQUFFLENBQUM7SUFDMUYsK0RBQVMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDL0IsSUFBSSxJQUFJLEdBQUcsK0RBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFdEMsSUFBSSxRQUFRLEdBQUcsaUVBQVcsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDaEQsUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7SUFDekIsUUFBUSxDQUFDLEtBQUssR0FBRyxxREFBZ0IsRUFBRSxDQUFDO0lBQ3BDLCtEQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxtZEFBeWMsQ0FBQztJQUNuZixnQkFBZ0IsRUFBRSxDQUFDO0FBQ3ZCLENBQUM7QUFFTSxJQUFNLG1CQUFtQixHQUFHLFVBQUMsR0FBVyxFQUFFLEtBQWU7SUFDNUQsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztJQUN2RCxJQUFJLE1BQW1CLENBQUM7SUFDeEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFFO1FBQ2pCLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ2pDLE1BQU0sR0FBRyxFQUFpQixDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQWdCLENBQUM7SUFDbkUsSUFBSSxLQUFLLEVBQUU7UUFDUCxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBRTtZQUNYLElBQUksRUFBRSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ2hDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDOUI7UUFDTCxDQUFDLENBQUM7S0FDTDtTQUFNO1FBQ0gsK0RBQVMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMzRDtJQUNELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUMsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO0tBQ3hDO1NBQU07UUFDSCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzVDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztTQUMzQztLQUNKO0FBQ0wsQ0FBQztBQUVNLElBQU0sZ0JBQWdCLEdBQUc7SUFDNUIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztJQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQUU7UUFDWCxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7QUFDTixDQUFDO0FBRU0sSUFBTSxrQkFBa0IsR0FBRztJQUM5QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFFO1FBQ2QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRU0sSUFBTSxrQkFBa0IsR0FBRztJQUM5QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDeEQsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztJQUNwRCxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQUU7UUFDZCxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ25ELE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRU0sSUFBTSxjQUFjLEdBQUcsVUFBQyxHQUFXLEVBQUUsSUFBWTtJQUNwRCxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDcEQsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQ3ZELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9KRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQixzQ0FBc0Msa0JBQWtCO0FBQ25GLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsY0FBYztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSw2Q0FBNkMsUUFBUTtBQUNyRDtBQUNBO0FBQ0E7QUFDTztBQUNQLG9DQUFvQztBQUNwQztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDTztBQUNQLGNBQWMsNkJBQTZCLDBCQUEwQixjQUFjLHFCQUFxQjtBQUN4RyxpQkFBaUIsb0RBQW9ELHFFQUFxRSxjQUFjO0FBQ3hKLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLG1DQUFtQyxTQUFTO0FBQzVDLG1DQUFtQyxXQUFXLFVBQVU7QUFDeEQsMENBQTBDLGNBQWM7QUFDeEQ7QUFDQSw4R0FBOEcsT0FBTztBQUNySCxpRkFBaUYsaUJBQWlCO0FBQ2xHLHlEQUF5RCxnQkFBZ0IsUUFBUTtBQUNqRiwrQ0FBK0MsZ0JBQWdCLGdCQUFnQjtBQUMvRTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0EsVUFBVSxZQUFZLGFBQWEsU0FBUyxVQUFVO0FBQ3RELG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCw2QkFBNkIsc0JBQXNCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLGtEQUFrRCxRQUFRO0FBQzFELHlDQUF5QyxRQUFRO0FBQ2pELHlEQUF5RCxRQUFRO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCw2RUFBNkUsT0FBTztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxpQkFBaUIsdUZBQXVGLGNBQWM7QUFDdEgsdUJBQXVCLGdDQUFnQyxxQ0FBcUMsMkNBQTJDO0FBQ3ZJLDRCQUE0QixNQUFNLGlCQUFpQixZQUFZO0FBQy9ELHVCQUF1QjtBQUN2Qiw4QkFBOEI7QUFDOUIsNkJBQTZCO0FBQzdCLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ087QUFDUDtBQUNBLGlCQUFpQiw2Q0FBNkMsVUFBVSxzREFBc0QsY0FBYztBQUM1SSwwQkFBMEIsNkJBQTZCLG9CQUFvQixnREFBZ0Qsa0JBQWtCO0FBQzdJO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSwyR0FBMkcsdUZBQXVGLGNBQWM7QUFDaE4sdUJBQXVCLDhCQUE4QixnREFBZ0Qsd0RBQXdEO0FBQzdKLDZDQUE2QyxzQ0FBc0MsVUFBVSxtQkFBbUIsSUFBSTtBQUNwSDtBQUNBO0FBQ087QUFDUCxpQ0FBaUMsdUNBQXVDLFlBQVksS0FBSyxPQUFPO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDRCQUE0QjtBQUN0RSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7O1VDdlBBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEM7QUFDMUMseURBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvTm90aWZpY2F0aW9uRmFjdG9yaWVzLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1NjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL1N1YmplY3QuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9TdWJzY3JpYmVyLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvU3Vic2NyaXB0aW9uLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvY29uZmlnLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9lbXB0eS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29ic2VydmFibGUvZnJvbS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29ic2VydmFibGUvZnJvbUV2ZW50LmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9pbm5lckZyb20uanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL3RpbWVyLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL09wZXJhdG9yU3Vic2NyaWJlci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvbWFwLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL21lcmdlSW50ZXJuYWxzLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL21lcmdlTWFwLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL29ic2VydmVPbi5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9zdWJzY3JpYmVPbi5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy9zd2l0Y2hNYXAuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvdGFrZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL29wZXJhdG9ycy90YWtlV2hpbGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvdGFwLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVBc3luY0l0ZXJhYmxlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlSXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVPYnNlcnZhYmxlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZWQuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQWN0aW9uLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL0FzeW5jQWN0aW9uLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL0FzeW5jU2NoZWR1bGVyLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL2FzeW5jLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL2RhdGVUaW1lc3RhbXBQcm92aWRlci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3NjaGVkdWxlci9pbnRlcnZhbFByb3ZpZGVyLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL3RpbWVvdXRQcm92aWRlci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3N5bWJvbC9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3N5bWJvbC9vYnNlcnZhYmxlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvci5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvYXJyUmVtb3ZlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9jcmVhdGVFcnJvckNsYXNzLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9lcnJvckNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2V4ZWN1dGVTY2hlZHVsZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzQXJyYXlMaWtlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc0FzeW5jSXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2lzRGF0ZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNJbnRlcm9wT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNJdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNQcm9taXNlLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC9pc1JlYWRhYmxlU3RyZWFtTGlrZS5qcyIsIndlYnBhY2s6Ly9yeGpzLy4vbm9kZV9tb2R1bGVzL3J4anMvZGlzdC9lc201L2ludGVybmFsL3V0aWwvaXNTY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL2xpZnQuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL21hcE9uZU9yTWFueUFyZ3MuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL25vb3AuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL3BpcGUuanMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvZXNtNS9pbnRlcm5hbC91dGlsL3JlcG9ydFVuaGFuZGxlZEVycm9yLmpzIiwid2VicGFjazovL3J4anMvLi9ub2RlX21vZHVsZXMvcnhqcy9kaXN0L2VzbTUvaW50ZXJuYWwvdXRpbC90aHJvd1Vub2JzZXJ2YWJsZUVycm9yLmpzIiwid2VicGFjazovL3J4anMvLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovL3J4anMvLi9zcmMvY29udHJvbGxlcnMvQmFsbENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vcnhqcy8uL3NyYy9oZWxwZXJzL0hlbHBlckxvZ2ljLnRzIiwid2VicGFjazovL3J4anMvLi9zcmMvaGVscGVycy9IZWxwZXJWaWV3cy50cyIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL3NlcnZpY2VzL0dhbWVTZXJ2aWNlLnRzIiwid2VicGFjazovL3J4anMvLi9zcmMvc2VydmljZXMvVGlja2V0U2VydmljZS50cyIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL3NlcnZpY2VzL1RpbWVyU2VydmljZS50cyIsIndlYnBhY2s6Ly9yeGpzLy4vc3JjL3ZpZXdzL0dhbWVWaWV3LnRzIiwid2VicGFjazovL3J4anMvLi9zcmMvdmlld3MvSG9tZVZpZXcudHMiLCJ3ZWJwYWNrOi8vcnhqcy8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vcnhqcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yeGpzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yeGpzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcnhqcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3J4anMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBDT01QTEVURV9OT1RJRklDQVRJT04gPSAoZnVuY3Rpb24gKCkgeyByZXR1cm4gY3JlYXRlTm90aWZpY2F0aW9uKCdDJywgdW5kZWZpbmVkLCB1bmRlZmluZWQpOyB9KSgpO1xuZXhwb3J0IGZ1bmN0aW9uIGVycm9yTm90aWZpY2F0aW9uKGVycm9yKSB7XG4gICAgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignRScsIHVuZGVmaW5lZCwgZXJyb3IpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5leHROb3RpZmljYXRpb24odmFsdWUpIHtcbiAgICByZXR1cm4gY3JlYXRlTm90aWZpY2F0aW9uKCdOJywgdmFsdWUsIHVuZGVmaW5lZCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTm90aWZpY2F0aW9uKGtpbmQsIHZhbHVlLCBlcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IGtpbmQsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Ob3RpZmljYXRpb25GYWN0b3JpZXMuanMubWFwIiwiaW1wb3J0IHsgU2FmZVN1YnNjcmliZXIsIFN1YnNjcmliZXIgfSBmcm9tICcuL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgaXNTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBvYnNlcnZhYmxlIGFzIFN5bWJvbF9vYnNlcnZhYmxlIH0gZnJvbSAnLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBwaXBlRnJvbUFycmF5IH0gZnJvbSAnLi91dGlsL3BpcGUnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IGVycm9yQ29udGV4dCB9IGZyb20gJy4vdXRpbC9lcnJvckNvbnRleHQnO1xudmFyIE9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoc3Vic2NyaWJlKSB7XG4gICAgICAgIGlmIChzdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICBvYnNlcnZhYmxlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHN1YnNjcmliZXIgPSBpc1N1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQpID8gb2JzZXJ2ZXJPck5leHQgOiBuZXcgU2FmZVN1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgIGVycm9yQ29udGV4dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBfdGhpcywgb3BlcmF0b3IgPSBfYS5vcGVyYXRvciwgc291cmNlID0gX2Euc291cmNlO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5hZGQob3BlcmF0b3JcbiAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yLmNhbGwoc3Vic2NyaWJlciwgc291cmNlKVxuICAgICAgICAgICAgICAgIDogc291cmNlXG4gICAgICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zdWJzY3JpYmUoc3Vic2NyaWJlcilcbiAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RyeVN1YnNjcmliZShzdWJzY3JpYmVyKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl90cnlTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc2luaykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnNjcmliZShzaW5rKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzaW5rLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAobmV4dCwgcHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmliZXIgPSBuZXcgU2FmZVN1YnNjcmliZXIoe1xuICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiByZWplY3QsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IHJlc29sdmUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gdGhpcy5zb3VyY2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZVtTeW1ib2xfb2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbnNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGlwZUZyb21BcnJheShvcGVyYXRpb25zKSh0aGlzKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnRvUHJvbWlzZSA9IGZ1bmN0aW9uIChwcm9taXNlQ3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBwcm9taXNlQ3RvciA9IGdldFByb21pc2VDdG9yKHByb21pc2VDdG9yKTtcbiAgICAgICAgcmV0dXJuIG5ldyBwcm9taXNlQ3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICBfdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24gKHgpIHsgcmV0dXJuICh2YWx1ZSA9IHgpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiByZWplY3QoZXJyKTsgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzb2x2ZSh2YWx1ZSk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUuY3JlYXRlID0gZnVuY3Rpb24gKHN1YnNjcmliZSkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufSgpKTtcbmV4cG9ydCB7IE9ic2VydmFibGUgfTtcbmZ1bmN0aW9uIGdldFByb21pc2VDdG9yKHByb21pc2VDdG9yKSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoX2EgPSBwcm9taXNlQ3RvciAhPT0gbnVsbCAmJiBwcm9taXNlQ3RvciAhPT0gdm9pZCAwID8gcHJvbWlzZUN0b3IgOiBjb25maWcuUHJvbWlzZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogUHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGlzT2JzZXJ2ZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgaXNGdW5jdGlvbih2YWx1ZS5uZXh0KSAmJiBpc0Z1bmN0aW9uKHZhbHVlLmVycm9yKSAmJiBpc0Z1bmN0aW9uKHZhbHVlLmNvbXBsZXRlKTtcbn1cbmZ1bmN0aW9uIGlzU3Vic2NyaWJlcih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgJiYgdmFsdWUgaW5zdGFuY2VvZiBTdWJzY3JpYmVyKSB8fCAoaXNPYnNlcnZlcih2YWx1ZSkgJiYgaXNTdWJzY3JpcHRpb24odmFsdWUpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgZGF0ZVRpbWVzdGFtcFByb3ZpZGVyIH0gZnJvbSAnLi9zY2hlZHVsZXIvZGF0ZVRpbWVzdGFtcFByb3ZpZGVyJztcbnZhciBTY2hlZHVsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjaGVkdWxlcihzY2hlZHVsZXJBY3Rpb25DdG9yLCBub3cpIHtcbiAgICAgICAgaWYgKG5vdyA9PT0gdm9pZCAwKSB7IG5vdyA9IFNjaGVkdWxlci5ub3c7IH1cbiAgICAgICAgdGhpcy5zY2hlZHVsZXJBY3Rpb25DdG9yID0gc2NoZWR1bGVyQWN0aW9uQ3RvcjtcbiAgICAgICAgdGhpcy5ub3cgPSBub3c7XG4gICAgfVxuICAgIFNjaGVkdWxlci5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAod29yaywgZGVsYXksIHN0YXRlKSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gbmV3IHRoaXMuc2NoZWR1bGVyQWN0aW9uQ3Rvcih0aGlzLCB3b3JrKS5zY2hlZHVsZShzdGF0ZSwgZGVsYXkpO1xuICAgIH07XG4gICAgU2NoZWR1bGVyLm5vdyA9IGRhdGVUaW1lc3RhbXBQcm92aWRlci5ub3c7XG4gICAgcmV0dXJuIFNjaGVkdWxlcjtcbn0oKSk7XG5leHBvcnQgeyBTY2hlZHVsZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNjaGVkdWxlci5qcy5tYXAiLCJpbXBvcnQgeyBfX2V4dGVuZHMsIF9fdmFsdWVzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgRU1QVFlfU1VCU0NSSVBUSU9OIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgfSBmcm9tICcuL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InO1xuaW1wb3J0IHsgYXJyUmVtb3ZlIH0gZnJvbSAnLi91dGlsL2FyclJlbW92ZSc7XG5pbXBvcnQgeyBlcnJvckNvbnRleHQgfSBmcm9tICcuL3V0aWwvZXJyb3JDb250ZXh0JztcbnZhciBTdWJqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJqZWN0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuY3VycmVudE9ic2VydmVycyA9IG51bGw7XG4gICAgICAgIF90aGlzLm9ic2VydmVycyA9IFtdO1xuICAgICAgICBfdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMudGhyb3duRXJyb3IgPSBudWxsO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN1YmplY3QucHJvdG90eXBlLmxpZnQgPSBmdW5jdGlvbiAob3BlcmF0b3IpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgQW5vbnltb3VzU3ViamVjdCh0aGlzLCB0aGlzKTtcbiAgICAgICAgc3ViamVjdC5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gc3ViamVjdDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl90aHJvd0lmQ2xvc2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGVycm9yQ29udGV4dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgICAgIF90aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuY3VycmVudE9ic2VydmVycykge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jdXJyZW50T2JzZXJ2ZXJzID0gQXJyYXkuZnJvbShfdGhpcy5vYnNlcnZlcnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKF90aGlzLmN1cnJlbnRPYnNlcnZlcnMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgZXJyb3JDb250ZXh0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmhhc0Vycm9yID0gX3RoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy50aHJvd25FcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gX3RoaXMub2JzZXJ2ZXJzO1xuICAgICAgICAgICAgICAgIHdoaWxlIChvYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVycy5zaGlmdCgpLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBlcnJvckNvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gX3RoaXMub2JzZXJ2ZXJzO1xuICAgICAgICAgICAgICAgIHdoaWxlIChvYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVycy5zaGlmdCgpLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSB0aGlzLmN1cnJlbnRPYnNlcnZlcnMgPSBudWxsO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN1YmplY3QucHJvdG90eXBlLCBcIm9ic2VydmVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICByZXR1cm4gKChfYSA9IHRoaXMub2JzZXJ2ZXJzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDA7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlLmNhbGwodGhpcywgc3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICB0aGlzLl9jaGVja0ZpbmFsaXplZFN0YXR1c2VzKHN1YnNjcmliZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5uZXJTdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5faW5uZXJTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBoYXNFcnJvciA9IF9hLmhhc0Vycm9yLCBpc1N0b3BwZWQgPSBfYS5pc1N0b3BwZWQsIG9ic2VydmVycyA9IF9hLm9ic2VydmVycztcbiAgICAgICAgaWYgKGhhc0Vycm9yIHx8IGlzU3RvcHBlZCkge1xuICAgICAgICAgICAgcmV0dXJuIEVNUFRZX1NVQlNDUklQVElPTjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRPYnNlcnZlcnMgPSBudWxsO1xuICAgICAgICBvYnNlcnZlcnMucHVzaChzdWJzY3JpYmVyKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJzY3JpcHRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuY3VycmVudE9ic2VydmVycyA9IG51bGw7XG4gICAgICAgICAgICBhcnJSZW1vdmUob2JzZXJ2ZXJzLCBzdWJzY3JpYmVyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fY2hlY2tGaW5hbGl6ZWRTdGF0dXNlcyA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGhhc0Vycm9yID0gX2EuaGFzRXJyb3IsIHRocm93bkVycm9yID0gX2EudGhyb3duRXJyb3IsIGlzU3RvcHBlZCA9IF9hLmlzU3RvcHBlZDtcbiAgICAgICAgaWYgKGhhc0Vycm9yKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKHRocm93bkVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuYXNPYnNlcnZhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgICBTdWJqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uIChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgQW5vbnltb3VzU3ViamVjdChkZXN0aW5hdGlvbiwgc291cmNlKTtcbiAgICB9O1xuICAgIHJldHVybiBTdWJqZWN0O1xufShPYnNlcnZhYmxlKSk7XG5leHBvcnQgeyBTdWJqZWN0IH07XG52YXIgQW5vbnltb3VzU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFub255bW91c1N1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQW5vbnltb3VzU3ViamVjdChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgICAgIF90aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIChfYiA9IChfYSA9IHRoaXMuZGVzdGluYXRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uZXh0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgdmFsdWUpO1xuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIChfYiA9IChfYSA9IHRoaXMuZGVzdGluYXRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5lcnJvcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIGVycik7XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgKF9iID0gKF9hID0gdGhpcy5kZXN0aW5hdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbXBsZXRlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSk7XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgcmV0dXJuIChfYiA9IChfYSA9IHRoaXMuc291cmNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3Vic2NyaWJlKHN1YnNjcmliZXIpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBFTVBUWV9TVUJTQ1JJUFRJT047XG4gICAgfTtcbiAgICByZXR1cm4gQW5vbnltb3VzU3ViamVjdDtcbn0oU3ViamVjdCkpO1xuZXhwb3J0IHsgQW5vbnltb3VzU3ViamVjdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3ViamVjdC5qcy5tYXAiLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBpc1N1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgcmVwb3J0VW5oYW5kbGVkRXJyb3IgfSBmcm9tICcuL3V0aWwvcmVwb3J0VW5oYW5kbGVkRXJyb3InO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4vdXRpbC9ub29wJztcbmltcG9ydCB7IG5leHROb3RpZmljYXRpb24sIGVycm9yTm90aWZpY2F0aW9uLCBDT01QTEVURV9OT1RJRklDQVRJT04gfSBmcm9tICcuL05vdGlmaWNhdGlvbkZhY3Rvcmllcyc7XG5pbXBvcnQgeyB0aW1lb3V0UHJvdmlkZXIgfSBmcm9tICcuL3NjaGVkdWxlci90aW1lb3V0UHJvdmlkZXInO1xuaW1wb3J0IHsgY2FwdHVyZUVycm9yIH0gZnJvbSAnLi91dGlsL2Vycm9yQ29udGV4dCc7XG52YXIgU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3Vic2NyaWJlcihkZXN0aW5hdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgICAgICAgaWYgKGlzU3Vic2NyaXB0aW9uKGRlc3RpbmF0aW9uKSkge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmFkZChfdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IEVNUFRZX09CU0VSVkVSO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3Vic2NyaWJlci5jcmVhdGUgPSBmdW5jdGlvbiAobmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2FmZVN1YnNjcmliZXIobmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKG5leHROb3RpZmljYXRpb24odmFsdWUpLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX25leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKGVycm9yTm90aWZpY2F0aW9uKGVyciksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihDT01QTEVURV9OT1RJRklDQVRJT04sIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTdWJzY3JpYmVyO1xufShTdWJzY3JpcHRpb24pKTtcbmV4cG9ydCB7IFN1YnNjcmliZXIgfTtcbnZhciBfYmluZCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kO1xuZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBfYmluZC5jYWxsKGZuLCB0aGlzQXJnKTtcbn1cbnZhciBDb25zdW1lck9ic2VydmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb25zdW1lck9ic2VydmVyKHBhcnRpYWxPYnNlcnZlcikge1xuICAgICAgICB0aGlzLnBhcnRpYWxPYnNlcnZlciA9IHBhcnRpYWxPYnNlcnZlcjtcbiAgICB9XG4gICAgQ29uc3VtZXJPYnNlcnZlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcGFydGlhbE9ic2VydmVyID0gdGhpcy5wYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgICAgIGlmIChwYXJ0aWFsT2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnN1bWVyT2JzZXJ2ZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgcGFydGlhbE9ic2VydmVyID0gdGhpcy5wYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgICAgIGlmIChwYXJ0aWFsT2JzZXJ2ZXIuZXJyb3IpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbE9ic2VydmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVVbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVVbmhhbmRsZWRFcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb25zdW1lck9ic2VydmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhcnRpYWxPYnNlcnZlciA9IHRoaXMucGFydGlhbE9ic2VydmVyO1xuICAgICAgICBpZiAocGFydGlhbE9ic2VydmVyLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ29uc3VtZXJPYnNlcnZlcjtcbn0oKSk7XG52YXIgU2FmZVN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTYWZlU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTYWZlU3Vic2NyaWJlcihvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIHZhciBwYXJ0aWFsT2JzZXJ2ZXI7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9ic2VydmVyT3JOZXh0KSB8fCAhb2JzZXJ2ZXJPck5leHQpIHtcbiAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlciA9IHtcbiAgICAgICAgICAgICAgICBuZXh0OiAob2JzZXJ2ZXJPck5leHQgIT09IG51bGwgJiYgb2JzZXJ2ZXJPck5leHQgIT09IHZvaWQgMCA/IG9ic2VydmVyT3JOZXh0IDogdW5kZWZpbmVkKSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IgIT09IG51bGwgJiYgZXJyb3IgIT09IHZvaWQgMCA/IGVycm9yIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBjb21wbGV0ZSAhPT0gbnVsbCAmJiBjb21wbGV0ZSAhPT0gdm9pZCAwID8gY29tcGxldGUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNvbnRleHRfMTtcbiAgICAgICAgICAgIGlmIChfdGhpcyAmJiBjb25maWcudXNlRGVwcmVjYXRlZE5leHRDb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dF8xID0gT2JqZWN0LmNyZWF0ZShvYnNlcnZlck9yTmV4dCk7XG4gICAgICAgICAgICAgICAgY29udGV4dF8xLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMudW5zdWJzY3JpYmUoKTsgfTtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsT2JzZXJ2ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IG9ic2VydmVyT3JOZXh0Lm5leHQgJiYgYmluZChvYnNlcnZlck9yTmV4dC5uZXh0LCBjb250ZXh0XzEpLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogb2JzZXJ2ZXJPck5leHQuZXJyb3IgJiYgYmluZChvYnNlcnZlck9yTmV4dC5lcnJvciwgY29udGV4dF8xKSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IG9ic2VydmVyT3JOZXh0LmNvbXBsZXRlICYmIGJpbmQob2JzZXJ2ZXJPck5leHQuY29tcGxldGUsIGNvbnRleHRfMSksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxPYnNlcnZlciA9IG9ic2VydmVyT3JOZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLmRlc3RpbmF0aW9uID0gbmV3IENvbnN1bWVyT2JzZXJ2ZXIocGFydGlhbE9ic2VydmVyKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU2FmZVN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbmV4cG9ydCB7IFNhZmVTdWJzY3JpYmVyIH07XG5mdW5jdGlvbiBoYW5kbGVVbmhhbmRsZWRFcnJvcihlcnJvcikge1xuICAgIGlmIChjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICBjYXB0dXJlRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVwb3J0VW5oYW5kbGVkRXJyb3IoZXJyb3IpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRlZmF1bHRFcnJvckhhbmRsZXIoZXJyKSB7XG4gICAgdGhyb3cgZXJyO1xufVxuZnVuY3Rpb24gaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIHN1YnNjcmliZXIpIHtcbiAgICB2YXIgb25TdG9wcGVkTm90aWZpY2F0aW9uID0gY29uZmlnLm9uU3RvcHBlZE5vdGlmaWNhdGlvbjtcbiAgICBvblN0b3BwZWROb3RpZmljYXRpb24gJiYgdGltZW91dFByb3ZpZGVyLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gb25TdG9wcGVkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgc3Vic2NyaWJlcik7IH0pO1xufVxuZXhwb3J0IHZhciBFTVBUWV9PQlNFUlZFUiA9IHtcbiAgICBjbG9zZWQ6IHRydWUsXG4gICAgbmV4dDogbm9vcCxcbiAgICBlcnJvcjogZGVmYXVsdEVycm9ySGFuZGxlcixcbiAgICBjb21wbGV0ZTogbm9vcCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpYmVyLmpzLm1hcCIsImltcG9ydCB7IF9fcmVhZCwgX19zcHJlYWRBcnJheSwgX192YWx1ZXMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBVbnN1YnNjcmlwdGlvbkVycm9yIH0gZnJvbSAnLi91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuaW1wb3J0IHsgYXJyUmVtb3ZlIH0gZnJvbSAnLi91dGlsL2FyclJlbW92ZSc7XG52YXIgU3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdWJzY3JpcHRpb24oaW5pdGlhbFRlYXJkb3duKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFRlYXJkb3duID0gaW5pdGlhbFRlYXJkb3duO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLl9maW5hbGl6ZXJzID0gbnVsbDtcbiAgICB9XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVfMSwgX2EsIGVfMiwgX2I7XG4gICAgICAgIHZhciBlcnJvcnM7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICAgICAgaWYgKF9wYXJlbnRhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KF9wYXJlbnRhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfcGFyZW50YWdlXzEgPSBfX3ZhbHVlcyhfcGFyZW50YWdlKSwgX3BhcmVudGFnZV8xXzEgPSBfcGFyZW50YWdlXzEubmV4dCgpOyAhX3BhcmVudGFnZV8xXzEuZG9uZTsgX3BhcmVudGFnZV8xXzEgPSBfcGFyZW50YWdlXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gX3BhcmVudGFnZV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50XzEucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3BhcmVudGFnZV8xXzEgJiYgIV9wYXJlbnRhZ2VfMV8xLmRvbmUgJiYgKF9hID0gX3BhcmVudGFnZV8xLnJldHVybikpIF9hLmNhbGwoX3BhcmVudGFnZV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3BhcmVudGFnZS5yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGluaXRpYWxGaW5hbGl6ZXIgPSB0aGlzLmluaXRpYWxUZWFyZG93bjtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGluaXRpYWxGaW5hbGl6ZXIpKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbEZpbmFsaXplcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvciA/IGUuZXJyb3JzIDogW2VdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBfZmluYWxpemVycyA9IHRoaXMuX2ZpbmFsaXplcnM7XG4gICAgICAgICAgICBpZiAoX2ZpbmFsaXplcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maW5hbGl6ZXJzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfZmluYWxpemVyc18xID0gX192YWx1ZXMoX2ZpbmFsaXplcnMpLCBfZmluYWxpemVyc18xXzEgPSBfZmluYWxpemVyc18xLm5leHQoKTsgIV9maW5hbGl6ZXJzXzFfMS5kb25lOyBfZmluYWxpemVyc18xXzEgPSBfZmluYWxpemVyc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFsaXplciA9IF9maW5hbGl6ZXJzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhlY0ZpbmFsaXplcihmaW5hbGl6ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycyAhPT0gbnVsbCAmJiBlcnJvcnMgIT09IHZvaWQgMCA/IGVycm9ycyA6IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGVycm9ycykpLCBfX3JlYWQoZXJyLmVycm9ycykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZmluYWxpemVyc18xXzEgJiYgIV9maW5hbGl6ZXJzXzFfMS5kb25lICYmIChfYiA9IF9maW5hbGl6ZXJzXzEucmV0dXJuKSkgX2IuY2FsbChfZmluYWxpemVyc18xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbnN1YnNjcmlwdGlvbkVycm9yKGVycm9ycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRlYXJkb3duKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRlYXJkb3duICYmIHRlYXJkb3duICE9PSB0aGlzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBleGVjRmluYWxpemVyKHRlYXJkb3duKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0ZWFyZG93biBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVhcmRvd24uY2xvc2VkIHx8IHRlYXJkb3duLl9oYXNQYXJlbnQodGhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZWFyZG93bi5fYWRkUGFyZW50KHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAodGhpcy5fZmluYWxpemVycyA9IChfYSA9IHRoaXMuX2ZpbmFsaXplcnMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdKS5wdXNoKHRlYXJkb3duKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5faGFzUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgcmV0dXJuIF9wYXJlbnRhZ2UgPT09IHBhcmVudCB8fCAoQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSAmJiBfcGFyZW50YWdlLmluY2x1ZGVzKHBhcmVudCkpO1xuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5fYWRkUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSA/IChfcGFyZW50YWdlLnB1c2gocGFyZW50KSwgX3BhcmVudGFnZSkgOiBfcGFyZW50YWdlID8gW19wYXJlbnRhZ2UsIHBhcmVudF0gOiBwYXJlbnQ7XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9yZW1vdmVQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICBpZiAoX3BhcmVudGFnZSA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkpIHtcbiAgICAgICAgICAgIGFyclJlbW92ZShfcGFyZW50YWdlLCBwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh0ZWFyZG93bikge1xuICAgICAgICB2YXIgX2ZpbmFsaXplcnMgPSB0aGlzLl9maW5hbGl6ZXJzO1xuICAgICAgICBfZmluYWxpemVycyAmJiBhcnJSZW1vdmUoX2ZpbmFsaXplcnMsIHRlYXJkb3duKTtcbiAgICAgICAgaWYgKHRlYXJkb3duIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0ZWFyZG93bi5fcmVtb3ZlUGFyZW50KHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24uRU1QVFkgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZW1wdHkgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIGVtcHR5LmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBlbXB0eTtcbiAgICB9KSgpO1xuICAgIHJldHVybiBTdWJzY3JpcHRpb247XG59KCkpO1xuZXhwb3J0IHsgU3Vic2NyaXB0aW9uIH07XG5leHBvcnQgdmFyIEVNUFRZX1NVQlNDUklQVElPTiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbmV4cG9ydCBmdW5jdGlvbiBpc1N1YnNjcmlwdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24gfHxcbiAgICAgICAgKHZhbHVlICYmICdjbG9zZWQnIGluIHZhbHVlICYmIGlzRnVuY3Rpb24odmFsdWUucmVtb3ZlKSAmJiBpc0Z1bmN0aW9uKHZhbHVlLmFkZCkgJiYgaXNGdW5jdGlvbih2YWx1ZS51bnN1YnNjcmliZSkpKTtcbn1cbmZ1bmN0aW9uIGV4ZWNGaW5hbGl6ZXIoZmluYWxpemVyKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oZmluYWxpemVyKSkge1xuICAgICAgICBmaW5hbGl6ZXIoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZpbmFsaXplci51bnN1YnNjcmliZSgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmlwdGlvbi5qcy5tYXAiLCJleHBvcnQgdmFyIGNvbmZpZyA9IHtcbiAgICBvblVuaGFuZGxlZEVycm9yOiBudWxsLFxuICAgIG9uU3RvcHBlZE5vdGlmaWNhdGlvbjogbnVsbCxcbiAgICBQcm9taXNlOiB1bmRlZmluZWQsXG4gICAgdXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZzogZmFsc2UsXG4gICAgdXNlRGVwcmVjYXRlZE5leHRDb250ZXh0OiBmYWxzZSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuZXhwb3J0IHZhciBFTVBUWSA9IG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7IHJldHVybiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH0pO1xuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KHNjaGVkdWxlcikge1xuICAgIHJldHVybiBzY2hlZHVsZXIgPyBlbXB0eVNjaGVkdWxlZChzY2hlZHVsZXIpIDogRU1QVFk7XG59XG5mdW5jdGlvbiBlbXB0eVNjaGVkdWxlZChzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHsgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH0pOyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVtcHR5LmpzLm1hcCIsImltcG9ydCB7IHNjaGVkdWxlZCB9IGZyb20gJy4uL3NjaGVkdWxlZC9zY2hlZHVsZWQnO1xuaW1wb3J0IHsgaW5uZXJGcm9tIH0gZnJvbSAnLi9pbm5lckZyb20nO1xuZXhwb3J0IGZ1bmN0aW9uIGZyb20oaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBzY2hlZHVsZXIgPyBzY2hlZHVsZWQoaW5wdXQsIHNjaGVkdWxlcikgOiBpbm5lckZyb20oaW5wdXQpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbS5qcy5tYXAiLCJpbXBvcnQgeyBfX3JlYWQgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4uL29ic2VydmFibGUvaW5uZXJGcm9tJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAnLi4vb3BlcmF0b3JzL21lcmdlTWFwJztcbmltcG9ydCB7IGlzQXJyYXlMaWtlIH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5TGlrZSc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IG1hcE9uZU9yTWFueUFyZ3MgfSBmcm9tICcuLi91dGlsL21hcE9uZU9yTWFueUFyZ3MnO1xudmFyIG5vZGVFdmVudEVtaXR0ZXJNZXRob2RzID0gWydhZGRMaXN0ZW5lcicsICdyZW1vdmVMaXN0ZW5lciddO1xudmFyIGV2ZW50VGFyZ2V0TWV0aG9kcyA9IFsnYWRkRXZlbnRMaXN0ZW5lcicsICdyZW1vdmVFdmVudExpc3RlbmVyJ107XG52YXIganF1ZXJ5TWV0aG9kcyA9IFsnb24nLCAnb2ZmJ107XG5leHBvcnQgZnVuY3Rpb24gZnJvbUV2ZW50KHRhcmdldCwgZXZlbnROYW1lLCBvcHRpb25zLCByZXN1bHRTZWxlY3Rvcikge1xuICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgIHJlc3VsdFNlbGVjdG9yID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmcm9tRXZlbnQodGFyZ2V0LCBldmVudE5hbWUsIG9wdGlvbnMpLnBpcGUobWFwT25lT3JNYW55QXJncyhyZXN1bHRTZWxlY3RvcikpO1xuICAgIH1cbiAgICB2YXIgX2EgPSBfX3JlYWQoaXNFdmVudFRhcmdldCh0YXJnZXQpXG4gICAgICAgID8gZXZlbnRUYXJnZXRNZXRob2RzLm1hcChmdW5jdGlvbiAobWV0aG9kTmFtZSkgeyByZXR1cm4gZnVuY3Rpb24gKGhhbmRsZXIpIHsgcmV0dXJuIHRhcmdldFttZXRob2ROYW1lXShldmVudE5hbWUsIGhhbmRsZXIsIG9wdGlvbnMpOyB9OyB9KVxuICAgICAgICA6XG4gICAgICAgICAgICBpc05vZGVTdHlsZUV2ZW50RW1pdHRlcih0YXJnZXQpXG4gICAgICAgICAgICAgICAgPyBub2RlRXZlbnRFbWl0dGVyTWV0aG9kcy5tYXAodG9Db21tb25IYW5kbGVyUmVnaXN0cnkodGFyZ2V0LCBldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgIDogaXNKUXVlcnlTdHlsZUV2ZW50RW1pdHRlcih0YXJnZXQpXG4gICAgICAgICAgICAgICAgICAgID8ganF1ZXJ5TWV0aG9kcy5tYXAodG9Db21tb25IYW5kbGVyUmVnaXN0cnkodGFyZ2V0LCBldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgICAgICA6IFtdLCAyKSwgYWRkID0gX2FbMF0sIHJlbW92ZSA9IF9hWzFdO1xuICAgIGlmICghYWRkKSB7XG4gICAgICAgIGlmIChpc0FycmF5TGlrZSh0YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VNYXAoZnVuY3Rpb24gKHN1YlRhcmdldCkgeyByZXR1cm4gZnJvbUV2ZW50KHN1YlRhcmdldCwgZXZlbnROYW1lLCBvcHRpb25zKTsgfSkoaW5uZXJGcm9tKHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghYWRkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgZXZlbnQgdGFyZ2V0Jyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWJzY3JpYmVyLm5leHQoMSA8IGFyZ3MubGVuZ3RoID8gYXJncyA6IGFyZ3NbMF0pO1xuICAgICAgICB9O1xuICAgICAgICBhZGQoaGFuZGxlcik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiByZW1vdmUoaGFuZGxlcik7IH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiB0b0NvbW1vbkhhbmRsZXJSZWdpc3RyeSh0YXJnZXQsIGV2ZW50TmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobWV0aG9kTmFtZSkgeyByZXR1cm4gZnVuY3Rpb24gKGhhbmRsZXIpIHsgcmV0dXJuIHRhcmdldFttZXRob2ROYW1lXShldmVudE5hbWUsIGhhbmRsZXIpOyB9OyB9O1xufVxuZnVuY3Rpb24gaXNOb2RlU3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24odGFyZ2V0LmFkZExpc3RlbmVyKSAmJiBpc0Z1bmN0aW9uKHRhcmdldC5yZW1vdmVMaXN0ZW5lcik7XG59XG5mdW5jdGlvbiBpc0pRdWVyeVN0eWxlRXZlbnRFbWl0dGVyKHRhcmdldCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKHRhcmdldC5vbikgJiYgaXNGdW5jdGlvbih0YXJnZXQub2ZmKTtcbn1cbmZ1bmN0aW9uIGlzRXZlbnRUYXJnZXQodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24odGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIpICYmIGlzRnVuY3Rpb24odGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbUV2ZW50LmpzLm1hcCIsImltcG9ydCB7IF9fYXN5bmNWYWx1ZXMsIF9fYXdhaXRlciwgX19nZW5lcmF0b3IsIF9fdmFsdWVzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBpc0FycmF5TGlrZSB9IGZyb20gJy4uL3V0aWwvaXNBcnJheUxpa2UnO1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi4vdXRpbC9pc1Byb21pc2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNJbnRlcm9wT2JzZXJ2YWJsZSB9IGZyb20gJy4uL3V0aWwvaXNJbnRlcm9wT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc0FzeW5jSXRlcmFibGUgfSBmcm9tICcuLi91dGlsL2lzQXN5bmNJdGVyYWJsZSc7XG5pbXBvcnQgeyBjcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvciB9IGZyb20gJy4uL3V0aWwvdGhyb3dVbm9ic2VydmFibGVFcnJvcic7XG5pbXBvcnQgeyBpc0l0ZXJhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0l0ZXJhYmxlJztcbmltcG9ydCB7IGlzUmVhZGFibGVTdHJlYW1MaWtlLCByZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yIH0gZnJvbSAnLi4vdXRpbC9pc1JlYWRhYmxlU3RyZWFtTGlrZSc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IHJlcG9ydFVuaGFuZGxlZEVycm9yIH0gZnJvbSAnLi4vdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvcic7XG5pbXBvcnQgeyBvYnNlcnZhYmxlIGFzIFN5bWJvbF9vYnNlcnZhYmxlIH0gZnJvbSAnLi4vc3ltYm9sL29ic2VydmFibGUnO1xuZXhwb3J0IGZ1bmN0aW9uIGlubmVyRnJvbShpbnB1dCkge1xuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cbiAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5TGlrZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcm9taXNlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21Qcm9taXNlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBc3luY0l0ZXJhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21Bc3luY0l0ZXJhYmxlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJdGVyYWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tSXRlcmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1JlYWRhYmxlU3RyZWFtTGlrZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBjcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvcihpbnB1dCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUludGVyb3BPYnNlcnZhYmxlKG9iaikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgb2JzID0gb2JqW1N5bWJvbF9vYnNlcnZhYmxlXSgpO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihvYnMuc3Vic2NyaWJlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9icy5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvdmlkZWQgb2JqZWN0IGRvZXMgbm90IGNvcnJlY3RseSBpbXBsZW1lbnQgU3ltYm9sLm9ic2VydmFibGUnKTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tQXJyYXlMaWtlKGFycmF5KSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoICYmICFzdWJzY3JpYmVyLmNsb3NlZDsgaSsrKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoYXJyYXlbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUHJvbWlzZShwcm9taXNlKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHByb21pc2VcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBzdWJzY3JpYmVyLmVycm9yKGVycik7IH0pXG4gICAgICAgICAgICAudGhlbihudWxsLCByZXBvcnRVbmhhbmRsZWRFcnJvcik7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUl0ZXJhYmxlKGl0ZXJhYmxlKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgaXRlcmFibGVfMSA9IF9fdmFsdWVzKGl0ZXJhYmxlKSwgaXRlcmFibGVfMV8xID0gaXRlcmFibGVfMS5uZXh0KCk7ICFpdGVyYWJsZV8xXzEuZG9uZTsgaXRlcmFibGVfMV8xID0gaXRlcmFibGVfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBpdGVyYWJsZV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZXJhYmxlXzFfMSAmJiAhaXRlcmFibGVfMV8xLmRvbmUgJiYgKF9hID0gaXRlcmFibGVfMS5yZXR1cm4pKSBfYS5jYWxsKGl0ZXJhYmxlXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tQXN5bmNJdGVyYWJsZShhc3luY0l0ZXJhYmxlKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHByb2Nlc3MoYXN5bmNJdGVyYWJsZSwgc3Vic2NyaWJlcikuY2F0Y2goZnVuY3Rpb24gKGVycikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnIpOyB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUmVhZGFibGVTdHJlYW1MaWtlKHJlYWRhYmxlU3RyZWFtKSB7XG4gICAgcmV0dXJuIGZyb21Bc3luY0l0ZXJhYmxlKHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IocmVhZGFibGVTdHJlYW0pKTtcbn1cbmZ1bmN0aW9uIHByb2Nlc3MoYXN5bmNJdGVyYWJsZSwgc3Vic2NyaWJlcikge1xuICAgIHZhciBhc3luY0l0ZXJhYmxlXzEsIGFzeW5jSXRlcmFibGVfMV8xO1xuICAgIHZhciBlXzIsIF9hO1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlLCBlXzJfMTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFswLCA1LCA2LCAxMV0pO1xuICAgICAgICAgICAgICAgICAgICBhc3luY0l0ZXJhYmxlXzEgPSBfX2FzeW5jVmFsdWVzKGFzeW5jSXRlcmFibGUpO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzQsIGFzeW5jSXRlcmFibGVfMS5uZXh0KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYXN5bmNJdGVyYWJsZV8xXzEgPSBfYi5zZW50KCksICFhc3luY0l0ZXJhYmxlXzFfMS5kb25lKSkgcmV0dXJuIFszLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBhc3luY0l0ZXJhYmxlXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMywgMV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzMsIDExXTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIGVfMl8xID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBlXzIgPSB7IGVycm9yOiBlXzJfMSB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDExXTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbNiwgLCA5LCAxMF0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShhc3luY0l0ZXJhYmxlXzFfMSAmJiAhYXN5bmNJdGVyYWJsZV8xXzEuZG9uZSAmJiAoX2EgPSBhc3luY0l0ZXJhYmxlXzEucmV0dXJuKSkpIHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgX2EuY2FsbChhc3luY0l0ZXJhYmxlXzEpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSA4O1xuICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFszLCAxMF07XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5uZXJGcm9tLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGFzeW5jIGFzIGFzeW5jU2NoZWR1bGVyIH0gZnJvbSAnLi4vc2NoZWR1bGVyL2FzeW5jJztcbmltcG9ydCB7IGlzU2NoZWR1bGVyIH0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG5pbXBvcnQgeyBpc1ZhbGlkRGF0ZSB9IGZyb20gJy4uL3V0aWwvaXNEYXRlJztcbmV4cG9ydCBmdW5jdGlvbiB0aW1lcihkdWVUaW1lLCBpbnRlcnZhbE9yU2NoZWR1bGVyLCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoZHVlVGltZSA9PT0gdm9pZCAwKSB7IGR1ZVRpbWUgPSAwOyB9XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IGFzeW5jU2NoZWR1bGVyOyB9XG4gICAgdmFyIGludGVydmFsRHVyYXRpb24gPSAtMTtcbiAgICBpZiAoaW50ZXJ2YWxPclNjaGVkdWxlciAhPSBudWxsKSB7XG4gICAgICAgIGlmIChpc1NjaGVkdWxlcihpbnRlcnZhbE9yU2NoZWR1bGVyKSkge1xuICAgICAgICAgICAgc2NoZWR1bGVyID0gaW50ZXJ2YWxPclNjaGVkdWxlcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGludGVydmFsRHVyYXRpb24gPSBpbnRlcnZhbE9yU2NoZWR1bGVyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgZHVlID0gaXNWYWxpZERhdGUoZHVlVGltZSkgPyArZHVlVGltZSAtIHNjaGVkdWxlci5ub3coKSA6IGR1ZVRpbWU7XG4gICAgICAgIGlmIChkdWUgPCAwKSB7XG4gICAgICAgICAgICBkdWUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuID0gMDtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KG4rKyk7XG4gICAgICAgICAgICAgICAgaWYgKDAgPD0gaW50ZXJ2YWxEdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHVuZGVmaW5lZCwgaW50ZXJ2YWxEdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkdWUpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZXIuanMubWFwIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBvbk5leHQsIG9uQ29tcGxldGUsIG9uRXJyb3IsIG9uRmluYWxpemUpIHtcbiAgICByZXR1cm4gbmV3IE9wZXJhdG9yU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgb25OZXh0LCBvbkNvbXBsZXRlLCBvbkVycm9yLCBvbkZpbmFsaXplKTtcbn1cbnZhciBPcGVyYXRvclN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPcGVyYXRvclN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT3BlcmF0b3JTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBvbk5leHQsIG9uQ29tcGxldGUsIG9uRXJyb3IsIG9uRmluYWxpemUsIHNob3VsZFVuc3Vic2NyaWJlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5vbkZpbmFsaXplID0gb25GaW5hbGl6ZTtcbiAgICAgICAgX3RoaXMuc2hvdWxkVW5zdWJzY3JpYmUgPSBzaG91bGRVbnN1YnNjcmliZTtcbiAgICAgICAgX3RoaXMuX25leHQgPSBvbk5leHRcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25OZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fbmV4dDtcbiAgICAgICAgX3RoaXMuX2Vycm9yID0gb25FcnJvclxuICAgICAgICAgICAgPyBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBfc3VwZXIucHJvdG90eXBlLl9lcnJvcjtcbiAgICAgICAgX3RoaXMuX2NvbXBsZXRlID0gb25Db21wbGV0ZVxuICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBfc3VwZXIucHJvdG90eXBlLl9jb21wbGV0ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPcGVyYXRvclN1YnNjcmliZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghdGhpcy5zaG91bGRVbnN1YnNjcmliZSB8fCB0aGlzLnNob3VsZFVuc3Vic2NyaWJlKCkpIHtcbiAgICAgICAgICAgIHZhciBjbG9zZWRfMSA9IHRoaXMuY2xvc2VkO1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgIWNsb3NlZF8xICYmICgoX2EgPSB0aGlzLm9uRmluYWxpemUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9wZXJhdG9yU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgT3BlcmF0b3JTdWJzY3JpYmVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PcGVyYXRvclN1YnNjcmliZXIuanMubWFwIiwiaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5pbXBvcnQgeyBjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIgfSBmcm9tICcuL09wZXJhdG9yU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHJldHVybiBvcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgrKykgJiYgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTsgfSkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcCIsImltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi9PcGVyYXRvclN1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIG1hcChwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChwcm9qZWN0LmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4KyspKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmpzLm1hcCIsImltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4uL29ic2VydmFibGUvaW5uZXJGcm9tJztcbmltcG9ydCB7IGV4ZWN1dGVTY2hlZHVsZSB9IGZyb20gJy4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlJztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIHByb2plY3QsIGNvbmN1cnJlbnQsIG9uQmVmb3JlTmV4dCwgZXhwYW5kLCBpbm5lclN1YlNjaGVkdWxlciwgYWRkaXRpb25hbEZpbmFsaXplcikge1xuICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICB2YXIgYWN0aXZlID0gMDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBpc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgdmFyIGNoZWNrQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc0NvbXBsZXRlICYmICFidWZmZXIubGVuZ3RoICYmICFhY3RpdmUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIG91dGVyTmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gKGFjdGl2ZSA8IGNvbmN1cnJlbnQgPyBkb0lubmVyU3ViKHZhbHVlKSA6IGJ1ZmZlci5wdXNoKHZhbHVlKSk7IH07XG4gICAgdmFyIGRvSW5uZXJTdWIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgZXhwYW5kICYmIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgIGFjdGl2ZSsrO1xuICAgICAgICB2YXIgaW5uZXJDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICBpbm5lckZyb20ocHJvamVjdCh2YWx1ZSwgaW5kZXgrKykpLnN1YnNjcmliZShjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKGlubmVyVmFsdWUpIHtcbiAgICAgICAgICAgIG9uQmVmb3JlTmV4dCA9PT0gbnVsbCB8fCBvbkJlZm9yZU5leHQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9uQmVmb3JlTmV4dChpbm5lclZhbHVlKTtcbiAgICAgICAgICAgIGlmIChleHBhbmQpIHtcbiAgICAgICAgICAgICAgICBvdXRlck5leHQoaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlubmVyQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICB9LCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpbm5lckNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlLS07XG4gICAgICAgICAgICAgICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlcmVkVmFsdWUgPSBidWZmZXIuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lclN1YlNjaGVkdWxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBpbm5lclN1YlNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9Jbm5lclN1YihidWZmZXJlZFZhbHVlKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb0lubmVyU3ViKGJ1ZmZlcmVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCAmJiBhY3RpdmUgPCBjb25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8xKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIG91dGVyTmV4dCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBhZGRpdGlvbmFsRmluYWxpemVyID09PSBudWxsIHx8IGFkZGl0aW9uYWxGaW5hbGl6ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFkZGl0aW9uYWxGaW5hbGl6ZXIoKTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VJbnRlcm5hbHMuanMubWFwIiwiaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi9tYXAnO1xuaW1wb3J0IHsgaW5uZXJGcm9tIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9pbm5lckZyb20nO1xuaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5pbXBvcnQgeyBtZXJnZUludGVybmFscyB9IGZyb20gJy4vbWVyZ2VJbnRlcm5hbHMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VNYXAocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IsIGNvbmN1cnJlbnQpIHtcbiAgICBpZiAoY29uY3VycmVudCA9PT0gdm9pZCAwKSB7IGNvbmN1cnJlbnQgPSBJbmZpbml0eTsgfVxuICAgIGlmIChpc0Z1bmN0aW9uKHJlc3VsdFNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gbWVyZ2VNYXAoZnVuY3Rpb24gKGEsIGkpIHsgcmV0dXJuIG1hcChmdW5jdGlvbiAoYiwgaWkpIHsgcmV0dXJuIHJlc3VsdFNlbGVjdG9yKGEsIGIsIGksIGlpKTsgfSkoaW5uZXJGcm9tKHByb2plY3QoYSwgaSkpKTsgfSwgY29uY3VycmVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiByZXN1bHRTZWxlY3RvciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uY3VycmVudCA9IHJlc3VsdFNlbGVjdG9yO1xuICAgIH1cbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7IHJldHVybiBtZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIHByb2plY3QsIGNvbmN1cnJlbnQpOyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlTWFwLmpzLm1hcCIsImltcG9ydCB7IGV4ZWN1dGVTY2hlZHVsZSB9IGZyb20gJy4uL3V0aWwvZXhlY3V0ZVNjaGVkdWxlJztcbmltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi9PcGVyYXRvclN1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVPbihzY2hlZHVsZXIsIGRlbGF5KSB7XG4gICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgcmV0dXJuIG9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikge1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7IH0sIGRlbGF5KTsgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9LCBkZWxheSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSwgZGVsYXkpOyB9KSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZlT24uanMubWFwIiwiaW1wb3J0IHsgb3BlcmF0ZSB9IGZyb20gJy4uL3V0aWwvbGlmdCc7XG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlT24oc2NoZWR1bGVyLCBkZWxheSkge1xuICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgIHJldHVybiBvcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgc3Vic2NyaWJlci5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7IH0sIGRlbGF5KSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVPbi5qcy5tYXAiLCJpbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hNYXAocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICByZXR1cm4gb3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbm5lclN1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB2YXIgaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgY2hlY2tDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlzQ29tcGxldGUgJiYgIWlubmVyU3Vic2NyaWJlciAmJiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH07XG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaW5uZXJTdWJzY3JpYmVyID09PSBudWxsIHx8IGlubmVyU3Vic2NyaWJlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5uZXJTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB2YXIgaW5uZXJJbmRleCA9IDA7XG4gICAgICAgICAgICB2YXIgb3V0ZXJJbmRleCA9IGluZGV4Kys7XG4gICAgICAgICAgICBpbm5lckZyb20ocHJvamVjdCh2YWx1ZSwgb3V0ZXJJbmRleCkpLnN1YnNjcmliZSgoaW5uZXJTdWJzY3JpYmVyID0gY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uIChpbm5lclZhbHVlKSB7IHJldHVybiBzdWJzY3JpYmVyLm5leHQocmVzdWx0U2VsZWN0b3IgPyByZXN1bHRTZWxlY3Rvcih2YWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCsrKSA6IGlubmVyVmFsdWUpOyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaW5uZXJTdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoTWFwLmpzLm1hcCIsImltcG9ydCB7IEVNUFRZIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9lbXB0eSc7XG5pbXBvcnQgeyBvcGVyYXRlIH0gZnJvbSAnLi4vdXRpbC9saWZ0JztcbmltcG9ydCB7IGNyZWF0ZU9wZXJhdG9yU3Vic2NyaWJlciB9IGZyb20gJy4vT3BlcmF0b3JTdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiB0YWtlKGNvdW50KSB7XG4gICAgcmV0dXJuIGNvdW50IDw9IDBcbiAgICAgICAgP1xuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gRU1QVFk7IH1cbiAgICAgICAgOiBvcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBzZWVuID0gMDtcbiAgICAgICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICgrK3NlZW4gPD0gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50IDw9IHNlZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YWtlLmpzLm1hcCIsImltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi9PcGVyYXRvclN1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIHRha2VXaGlsZShwcmVkaWNhdGUsIGluY2x1c2l2ZSkge1xuICAgIGlmIChpbmNsdXNpdmUgPT09IHZvaWQgMCkgeyBpbmNsdXNpdmUgPSBmYWxzZTsgfVxuICAgIHJldHVybiBvcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gcHJlZGljYXRlKHZhbHVlLCBpbmRleCsrKTtcbiAgICAgICAgICAgIChyZXN1bHQgfHwgaW5jbHVzaXZlKSAmJiBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgIXJlc3VsdCAmJiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRha2VXaGlsZS5qcy5tYXAiLCJpbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IG9wZXJhdGUgfSBmcm9tICcuLi91dGlsL2xpZnQnO1xuaW1wb3J0IHsgY3JlYXRlT3BlcmF0b3JTdWJzY3JpYmVyIH0gZnJvbSAnLi9PcGVyYXRvclN1YnNjcmliZXInO1xuaW1wb3J0IHsgaWRlbnRpdHkgfSBmcm9tICcuLi91dGlsL2lkZW50aXR5JztcbmV4cG9ydCBmdW5jdGlvbiB0YXAob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgIHZhciB0YXBPYnNlcnZlciA9IGlzRnVuY3Rpb24ob2JzZXJ2ZXJPck5leHQpIHx8IGVycm9yIHx8IGNvbXBsZXRlXG4gICAgICAgID9cbiAgICAgICAgICAgIHsgbmV4dDogb2JzZXJ2ZXJPck5leHQsIGVycm9yOiBlcnJvciwgY29tcGxldGU6IGNvbXBsZXRlIH1cbiAgICAgICAgOiBvYnNlcnZlck9yTmV4dDtcbiAgICByZXR1cm4gdGFwT2JzZXJ2ZXJcbiAgICAgICAgPyBvcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIChfYSA9IHRhcE9ic2VydmVyLnN1YnNjcmliZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGFwT2JzZXJ2ZXIpO1xuICAgICAgICAgICAgdmFyIGlzVW5zdWIgPSB0cnVlO1xuICAgICAgICAgICAgc291cmNlLnN1YnNjcmliZShjcmVhdGVPcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIChfYSA9IHRhcE9ic2VydmVyLm5leHQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRhcE9ic2VydmVyLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgaXNVbnN1YiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIChfYSA9IHRhcE9ic2VydmVyLmNvbXBsZXRlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0YXBPYnNlcnZlcik7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBpc1Vuc3ViID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgKF9hID0gdGFwT2JzZXJ2ZXIuZXJyb3IpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHRhcE9ic2VydmVyLCBlcnIpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGlmIChpc1Vuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IHRhcE9ic2VydmVyLnVuc3Vic2NyaWJlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0YXBPYnNlcnZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIChfYiA9IHRhcE9ic2VydmVyLmZpbmFsaXplKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbCh0YXBPYnNlcnZlcik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pXG4gICAgICAgIDpcbiAgICAgICAgICAgIGlkZW50aXR5O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFwLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZUFycmF5KGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpID09PSBpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaW5wdXRbaSsrXSk7XG4gICAgICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlQXJyYXkuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZXhlY3V0ZVNjaGVkdWxlIH0gZnJvbSAnLi4vdXRpbC9leGVjdXRlU2NoZWR1bGUnO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlQXN5bmNJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZXJhYmxlIGNhbm5vdCBiZSBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpbnB1dFtTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKTtcbiAgICAgICAgICAgIGV4ZWN1dGVTY2hlZHVsZShzdWJzY3JpYmVyLCBzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDAsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlQXN5bmNJdGVyYWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpdGVyYXRvciBhcyBTeW1ib2xfaXRlcmF0b3IgfSBmcm9tICcuLi9zeW1ib2wvaXRlcmF0b3InO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBleGVjdXRlU2NoZWR1bGUgfSBmcm9tICcuLi91dGlsL2V4ZWN1dGVTY2hlZHVsZSc7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpdGVyYXRvcjtcbiAgICAgICAgZXhlY3V0ZVNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXRlcmF0b3IgPSBpbnB1dFtTeW1ib2xfaXRlcmF0b3JdKCk7XG4gICAgICAgICAgICBleGVjdXRlU2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZG9uZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBpdGVyYXRvci5uZXh0KCksIHZhbHVlID0gX2EudmFsdWUsIGRvbmUgPSBfYS5kb25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBpc0Z1bmN0aW9uKGl0ZXJhdG9yID09PSBudWxsIHx8IGl0ZXJhdG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpdGVyYXRvci5yZXR1cm4pICYmIGl0ZXJhdG9yLnJldHVybigpOyB9O1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVJdGVyYWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBpbm5lckZyb20gfSBmcm9tICcuLi9vYnNlcnZhYmxlL2lubmVyRnJvbSc7XG5pbXBvcnQgeyBvYnNlcnZlT24gfSBmcm9tICcuLi9vcGVyYXRvcnMvb2JzZXJ2ZU9uJztcbmltcG9ydCB7IHN1YnNjcmliZU9uIH0gZnJvbSAnLi4vb3BlcmF0b3JzL3N1YnNjcmliZU9uJztcbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZU9ic2VydmFibGUoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBpbm5lckZyb20oaW5wdXQpLnBpcGUoc3Vic2NyaWJlT24oc2NoZWR1bGVyKSwgb2JzZXJ2ZU9uKHNjaGVkdWxlcikpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVPYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IGlubmVyRnJvbSB9IGZyb20gJy4uL29ic2VydmFibGUvaW5uZXJGcm9tJztcbmltcG9ydCB7IG9ic2VydmVPbiB9IGZyb20gJy4uL29wZXJhdG9ycy9vYnNlcnZlT24nO1xuaW1wb3J0IHsgc3Vic2NyaWJlT24gfSBmcm9tICcuLi9vcGVyYXRvcnMvc3Vic2NyaWJlT24nO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlUHJvbWlzZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIGlubmVyRnJvbShpbnB1dCkucGlwZShzdWJzY3JpYmVPbihzY2hlZHVsZXIpLCBvYnNlcnZlT24oc2NoZWR1bGVyKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZVByb21pc2UuanMubWFwIiwiaW1wb3J0IHsgc2NoZWR1bGVBc3luY0l0ZXJhYmxlIH0gZnJvbSAnLi9zY2hlZHVsZUFzeW5jSXRlcmFibGUnO1xuaW1wb3J0IHsgcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvciB9IGZyb20gJy4uL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2UnO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVBc3luY0l0ZXJhYmxlKHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IoaW5wdXQpLCBzY2hlZHVsZXIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UuanMubWFwIiwiaW1wb3J0IHsgc2NoZWR1bGVPYnNlcnZhYmxlIH0gZnJvbSAnLi9zY2hlZHVsZU9ic2VydmFibGUnO1xuaW1wb3J0IHsgc2NoZWR1bGVQcm9taXNlIH0gZnJvbSAnLi9zY2hlZHVsZVByb21pc2UnO1xuaW1wb3J0IHsgc2NoZWR1bGVBcnJheSB9IGZyb20gJy4vc2NoZWR1bGVBcnJheSc7XG5pbXBvcnQgeyBzY2hlZHVsZUl0ZXJhYmxlIH0gZnJvbSAnLi9zY2hlZHVsZUl0ZXJhYmxlJztcbmltcG9ydCB7IHNjaGVkdWxlQXN5bmNJdGVyYWJsZSB9IGZyb20gJy4vc2NoZWR1bGVBc3luY0l0ZXJhYmxlJztcbmltcG9ydCB7IGlzSW50ZXJvcE9ic2VydmFibGUgfSBmcm9tICcuLi91dGlsL2lzSW50ZXJvcE9ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi4vdXRpbC9pc1Byb21pc2UnO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuLi91dGlsL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzSXRlcmFibGUgfSBmcm9tICcuLi91dGlsL2lzSXRlcmFibGUnO1xuaW1wb3J0IHsgaXNBc3luY0l0ZXJhYmxlIH0gZnJvbSAnLi4vdXRpbC9pc0FzeW5jSXRlcmFibGUnO1xuaW1wb3J0IHsgY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IgfSBmcm9tICcuLi91dGlsL3Rocm93VW5vYnNlcnZhYmxlRXJyb3InO1xuaW1wb3J0IHsgaXNSZWFkYWJsZVN0cmVhbUxpa2UgfSBmcm9tICcuLi91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlJztcbmltcG9ydCB7IHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlIH0gZnJvbSAnLi9zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZSc7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVkKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZU9ic2VydmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXlMaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlQXJyYXkoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJvbWlzZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVByb21pc2UoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXN5bmNJdGVyYWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUFzeW5jSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IoaW5wdXQpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVkLmpzLm1hcCIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbnZhciBBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICB9XG4gICAgQWN0aW9uLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIEFjdGlvbjtcbn0oU3Vic2NyaXB0aW9uKSk7XG5leHBvcnQgeyBBY3Rpb24gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFjdGlvbi5qcy5tYXAiLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vQWN0aW9uJztcbmltcG9ydCB7IGludGVydmFsUHJvdmlkZXIgfSBmcm9tICcuL2ludGVydmFsUHJvdmlkZXInO1xuaW1wb3J0IHsgYXJyUmVtb3ZlIH0gZnJvbSAnLi4vdXRpbC9hcnJSZW1vdmUnO1xudmFyIEFzeW5jQWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXN5bmNBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXN5bmNBY3Rpb24oc2NoZWR1bGVyLCB3b3JrKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHNjaGVkdWxlciwgd29yaykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICBfdGhpcy53b3JrID0gd29yaztcbiAgICAgICAgX3RoaXMucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB2YXIgaWQgPSB0aGlzLmlkO1xuICAgICAgICB2YXIgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5yZWN5Y2xlQXN5bmNJZChzY2hlZHVsZXIsIGlkLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZCB8fCB0aGlzLnJlcXVlc3RBc3luY0lkKHNjaGVkdWxlciwgdGhpcy5pZCwgZGVsYXkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIF9pZCwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIHJldHVybiBpbnRlcnZhbFByb3ZpZGVyLnNldEludGVydmFsKHNjaGVkdWxlci5mbHVzaC5iaW5kKHNjaGVkdWxlciwgdGhpcyksIGRlbGF5KTtcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZCA9IGZ1bmN0aW9uIChfc2NoZWR1bGVyLCBpZCwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmIChkZWxheSAhPSBudWxsICYmIHRoaXMuZGVsYXkgPT09IGRlbGF5ICYmIHRoaXMucGVuZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgICAgICBpbnRlcnZhbFByb3ZpZGVyLmNsZWFySW50ZXJ2YWwoaWQpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignZXhlY3V0aW5nIGEgY2FuY2VsbGVkIGFjdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3IgPSB0aGlzLl9leGVjdXRlKHN0YXRlLCBkZWxheSk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGVuZGluZyA9PT0gZmFsc2UgJiYgdGhpcy5pZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5yZWN5Y2xlQXN5bmNJZCh0aGlzLnNjaGVkdWxlciwgdGhpcy5pZCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgX2RlbGF5KSB7XG4gICAgICAgIHZhciBlcnJvcmVkID0gZmFsc2U7XG4gICAgICAgIHZhciBlcnJvclZhbHVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy53b3JrKHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZXJyb3JlZCA9IHRydWU7XG4gICAgICAgICAgICBlcnJvclZhbHVlID0gZSA/IGUgOiBuZXcgRXJyb3IoJ1NjaGVkdWxlZCBhY3Rpb24gdGhyZXcgZmFsc3kgZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3JlZCkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yVmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdmFyIF9hID0gdGhpcywgaWQgPSBfYS5pZCwgc2NoZWR1bGVyID0gX2Euc2NoZWR1bGVyO1xuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBzY2hlZHVsZXIuYWN0aW9ucztcbiAgICAgICAgICAgIHRoaXMud29yayA9IHRoaXMuc3RhdGUgPSB0aGlzLnNjaGVkdWxlciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGFyclJlbW92ZShhY3Rpb25zLCB0aGlzKTtcbiAgICAgICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyLCBpZCwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRlbGF5ID0gbnVsbDtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFzeW5jQWN0aW9uO1xufShBY3Rpb24pKTtcbmV4cG9ydCB7IEFzeW5jQWN0aW9uIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bc3luY0FjdGlvbi5qcy5tYXAiLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFNjaGVkdWxlciB9IGZyb20gJy4uL1NjaGVkdWxlcic7XG52YXIgQXN5bmNTY2hlZHVsZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBc3luY1NjaGVkdWxlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBc3luY1NjaGVkdWxlcihTY2hlZHVsZXJBY3Rpb24sIG5vdykge1xuICAgICAgICBpZiAobm93ID09PSB2b2lkIDApIHsgbm93ID0gU2NoZWR1bGVyLm5vdzsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBTY2hlZHVsZXJBY3Rpb24sIG5vdykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuYWN0aW9ucyA9IFtdO1xuICAgICAgICBfdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIF90aGlzLl9zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQXN5bmNTY2hlZHVsZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoKGVycm9yID0gYWN0aW9uLmV4ZWN1dGUoYWN0aW9uLnN0YXRlLCBhY3Rpb24uZGVsYXkpKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICgoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHdoaWxlICgoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBc3luY1NjaGVkdWxlcjtcbn0oU2NoZWR1bGVyKSk7XG5leHBvcnQgeyBBc3luY1NjaGVkdWxlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXN5bmNTY2hlZHVsZXIuanMubWFwIiwiaW1wb3J0IHsgQXN5bmNBY3Rpb24gfSBmcm9tICcuL0FzeW5jQWN0aW9uJztcbmltcG9ydCB7IEFzeW5jU2NoZWR1bGVyIH0gZnJvbSAnLi9Bc3luY1NjaGVkdWxlcic7XG5leHBvcnQgdmFyIGFzeW5jU2NoZWR1bGVyID0gbmV3IEFzeW5jU2NoZWR1bGVyKEFzeW5jQWN0aW9uKTtcbmV4cG9ydCB2YXIgYXN5bmMgPSBhc3luY1NjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzeW5jLmpzLm1hcCIsImV4cG9ydCB2YXIgZGF0ZVRpbWVzdGFtcFByb3ZpZGVyID0ge1xuICAgIG5vdzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKGRhdGVUaW1lc3RhbXBQcm92aWRlci5kZWxlZ2F0ZSB8fCBEYXRlKS5ub3coKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlOiB1bmRlZmluZWQsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0ZVRpbWVzdGFtcFByb3ZpZGVyLmpzLm1hcCIsImltcG9ydCB7IF9fcmVhZCwgX19zcHJlYWRBcnJheSB9IGZyb20gXCJ0c2xpYlwiO1xuZXhwb3J0IHZhciBpbnRlcnZhbFByb3ZpZGVyID0ge1xuICAgIHNldEludGVydmFsOiBmdW5jdGlvbiAoaGFuZGxlciwgdGltZW91dCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsZWdhdGUgPSBpbnRlcnZhbFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLnNldEludGVydmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuc2V0SW50ZXJ2YWwuYXBwbHkoZGVsZWdhdGUsIF9fc3ByZWFkQXJyYXkoW2hhbmRsZXIsIHRpbWVvdXRdLCBfX3JlYWQoYXJncykpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgfSxcbiAgICBjbGVhckludGVydmFsOiBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGludGVydmFsUHJvdmlkZXIuZGVsZWdhdGU7XG4gICAgICAgIHJldHVybiAoKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5jbGVhckludGVydmFsKSB8fCBjbGVhckludGVydmFsKShoYW5kbGUpO1xuICAgIH0sXG4gICAgZGVsZWdhdGU6IHVuZGVmaW5lZCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcnZhbFByb3ZpZGVyLmpzLm1hcCIsImltcG9ydCB7IF9fcmVhZCwgX19zcHJlYWRBcnJheSB9IGZyb20gXCJ0c2xpYlwiO1xuZXhwb3J0IHZhciB0aW1lb3V0UHJvdmlkZXIgPSB7XG4gICAgc2V0VGltZW91dDogZnVuY3Rpb24gKGhhbmRsZXIsIHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbGVnYXRlID0gdGltZW91dFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLnNldFRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZS5zZXRUaW1lb3V0LmFwcGx5KGRlbGVnYXRlLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtoYW5kbGVyLCB0aW1lb3V0XSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgfSxcbiAgICBjbGVhclRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gdGltZW91dFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuY2xlYXJUaW1lb3V0KSB8fCBjbGVhclRpbWVvdXQpKGhhbmRsZSk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVvdXRQcm92aWRlci5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gZ2V0U3ltYm9sSXRlcmF0b3IoKSB7XG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgIVN5bWJvbC5pdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gJ0BAaXRlcmF0b3InO1xuICAgIH1cbiAgICByZXR1cm4gU3ltYm9sLml0ZXJhdG9yO1xufVxuZXhwb3J0IHZhciBpdGVyYXRvciA9IGdldFN5bWJvbEl0ZXJhdG9yKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pdGVyYXRvci5qcy5tYXAiLCJleHBvcnQgdmFyIG9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkgeyByZXR1cm4gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLm9ic2VydmFibGUpIHx8ICdAQG9ic2VydmFibGUnOyB9KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBjcmVhdGVFcnJvckNsYXNzIH0gZnJvbSAnLi9jcmVhdGVFcnJvckNsYXNzJztcbmV4cG9ydCB2YXIgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgPSBjcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JJbXBsKCkge1xuICAgICAgICBfc3VwZXIodGhpcyk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdPYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdvYmplY3QgdW5zdWJzY3JpYmVkJztcbiAgICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcy5tYXAiLCJpbXBvcnQgeyBjcmVhdGVFcnJvckNsYXNzIH0gZnJvbSAnLi9jcmVhdGVFcnJvckNsYXNzJztcbmV4cG9ydCB2YXIgVW5zdWJzY3JpcHRpb25FcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbChlcnJvcnMpIHtcbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvcnNcbiAgICAgICAgICAgID8gZXJyb3JzLmxlbmd0aCArIFwiIGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XFxuXCIgKyBlcnJvcnMubWFwKGZ1bmN0aW9uIChlcnIsIGkpIHsgcmV0dXJuIGkgKyAxICsgXCIpIFwiICsgZXJyLnRvU3RyaW5nKCk7IH0pLmpvaW4oJ1xcbiAgJylcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIHRoaXMubmFtZSA9ICdVbnN1YnNjcmlwdGlvbkVycm9yJztcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5zdWJzY3JpcHRpb25FcnJvci5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gYXJyUmVtb3ZlKGFyciwgaXRlbSkge1xuICAgIGlmIChhcnIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIDAgPD0gaW5kZXggJiYgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyUmVtb3ZlLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFcnJvckNsYXNzKGNyZWF0ZUltcGwpIHtcbiAgICB2YXIgX3N1cGVyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgIEVycm9yLmNhbGwoaW5zdGFuY2UpO1xuICAgICAgICBpbnN0YW5jZS5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICAgIH07XG4gICAgdmFyIGN0b3JGdW5jID0gY3JlYXRlSW1wbChfc3VwZXIpO1xuICAgIGN0b3JGdW5jLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbiAgICBjdG9yRnVuYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yRnVuYztcbiAgICByZXR1cm4gY3RvckZ1bmM7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmVhdGVFcnJvckNsYXNzLmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG52YXIgY29udGV4dCA9IG51bGw7XG5leHBvcnQgZnVuY3Rpb24gZXJyb3JDb250ZXh0KGNiKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgIHZhciBpc1Jvb3QgPSAhY29udGV4dDtcbiAgICAgICAgaWYgKGlzUm9vdCkge1xuICAgICAgICAgICAgY29udGV4dCA9IHsgZXJyb3JUaHJvd246IGZhbHNlLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNiKCk7XG4gICAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGNvbnRleHQsIGVycm9yVGhyb3duID0gX2EuZXJyb3JUaHJvd24sIGVycm9yID0gX2EuZXJyb3I7XG4gICAgICAgICAgICBjb250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChlcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjYigpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjYXB0dXJlRXJyb3IoZXJyKSB7XG4gICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nICYmIGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5lcnJvclRocm93biA9IHRydWU7XG4gICAgICAgIGNvbnRleHQuZXJyb3IgPSBlcnI7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JDb250ZXh0LmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBleGVjdXRlU2NoZWR1bGUocGFyZW50U3Vic2NyaXB0aW9uLCBzY2hlZHVsZXIsIHdvcmssIGRlbGF5LCByZXBlYXQpIHtcbiAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICBpZiAocmVwZWF0ID09PSB2b2lkIDApIHsgcmVwZWF0ID0gZmFsc2U7IH1cbiAgICB2YXIgc2NoZWR1bGVTdWJzY3JpcHRpb24gPSBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICB3b3JrKCk7XG4gICAgICAgIGlmIChyZXBlYXQpIHtcbiAgICAgICAgICAgIHBhcmVudFN1YnNjcmlwdGlvbi5hZGQodGhpcy5zY2hlZHVsZShudWxsLCBkZWxheSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfSwgZGVsYXkpO1xuICAgIHBhcmVudFN1YnNjcmlwdGlvbi5hZGQoc2NoZWR1bGVTdWJzY3JpcHRpb24pO1xuICAgIGlmICghcmVwZWF0KSB7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZVN1YnNjcmlwdGlvbjtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGVjdXRlU2NoZWR1bGUuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KHgpIHtcbiAgICByZXR1cm4geDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlkZW50aXR5LmpzLm1hcCIsImV4cG9ydCB2YXIgaXNBcnJheUxpa2UgPSAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgeCAhPT0gJ2Z1bmN0aW9uJzsgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FycmF5TGlrZS5qcy5tYXAiLCJpbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBpc0FzeW5jSXRlcmFibGUob2JqKSB7XG4gICAgcmV0dXJuIFN5bWJvbC5hc3luY0l0ZXJhdG9yICYmIGlzRnVuY3Rpb24ob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2JqW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FzeW5jSXRlcmFibGUuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWREYXRlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4odmFsdWUpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNEYXRlLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRnVuY3Rpb24uanMubWFwIiwiaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4uL3N5bWJvbC9vYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbihpbnB1dFtTeW1ib2xfb2JzZXJ2YWJsZV0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNJbnRlcm9wT2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBpdGVyYXRvciBhcyBTeW1ib2xfaXRlcmF0b3IgfSBmcm9tICcuLi9zeW1ib2wvaXRlcmF0b3InO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vaXNGdW5jdGlvbic7XG5leHBvcnQgZnVuY3Rpb24gaXNJdGVyYWJsZShpbnB1dCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKGlucHV0ID09PSBudWxsIHx8IGlucHV0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbnB1dFtTeW1ib2xfaXRlcmF0b3JdKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzSXRlcmFibGUuanMubWFwIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gXCIuL2lzRnVuY3Rpb25cIjtcbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbih2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUudGhlbik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1Byb21pc2UuanMubWFwIiwiaW1wb3J0IHsgX19hc3luY0dlbmVyYXRvciwgX19hd2FpdCwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3IocmVhZGFibGVTdHJlYW0pIHtcbiAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uIHJlYWRhYmxlU3RyZWFtTGlrZVRvQXN5bmNHZW5lcmF0b3JfMSgpIHtcbiAgICAgICAgdmFyIHJlYWRlciwgX2EsIHZhbHVlLCBkb25lO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSByZWFkYWJsZVN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCAsIDksIDEwXSk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHJ1ZSkgcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBfX2F3YWl0KHJlYWRlci5yZWFkKCkpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpLCB2YWx1ZSA9IF9hLnZhbHVlLCBkb25lID0gX2EuZG9uZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkb25lKSByZXR1cm4gWzMsIDVdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIF9fYXdhaXQodm9pZCAwKV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIsIF9iLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzQsIF9fYXdhaXQodmFsdWUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbNCwgX2Iuc2VudCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMywgMTBdO1xuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlbGVhc2VMb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNSZWFkYWJsZVN0cmVhbUxpa2Uob2JqKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24ob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2JqLmdldFJlYWRlcik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1JlYWRhYmxlU3RyZWFtTGlrZS5qcy5tYXAiLCJpbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBpc1NjaGVkdWxlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiBpc0Z1bmN0aW9uKHZhbHVlLnNjaGVkdWxlKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzU2NoZWR1bGVyLmpzLm1hcCIsImltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2lzRnVuY3Rpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0xpZnQoc291cmNlKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oc291cmNlID09PSBudWxsIHx8IHNvdXJjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc291cmNlLmxpZnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9wZXJhdGUoaW5pdCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgIGlmIChoYXNMaWZ0KHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UubGlmdChmdW5jdGlvbiAobGlmdGVkU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaXQobGlmdGVkU291cmNlLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5hYmxlIHRvIGxpZnQgdW5rbm93biBPYnNlcnZhYmxlIHR5cGUnKTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlmdC5qcy5tYXAiLCJpbXBvcnQgeyBfX3JlYWQsIF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IG1hcCB9IGZyb20gXCIuLi9vcGVyYXRvcnMvbWFwXCI7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5mdW5jdGlvbiBjYWxsT3JBcHBseShmbiwgYXJncykge1xuICAgIHJldHVybiBpc0FycmF5KGFyZ3MpID8gZm4uYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoYXJncykpKSA6IGZuKGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG1hcE9uZU9yTWFueUFyZ3MoZm4pIHtcbiAgICByZXR1cm4gbWFwKGZ1bmN0aW9uIChhcmdzKSB7IHJldHVybiBjYWxsT3JBcHBseShmbiwgYXJncyk7IH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwT25lT3JNYW55QXJncy5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gbm9vcCgpIHsgfVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9vcC5qcy5tYXAiLCJpbXBvcnQgeyBpZGVudGl0eSB9IGZyb20gJy4vaWRlbnRpdHknO1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgdmFyIGZucyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGZuc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gcGlwZUZyb21BcnJheShmbnMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBpcGVGcm9tQXJyYXkoZm5zKSB7XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGlkZW50aXR5O1xuICAgIH1cbiAgICBpZiAoZm5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZm5zWzBdO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGlwZWQoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGZucy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGZuKSB7IHJldHVybiBmbihwcmV2KTsgfSwgaW5wdXQpO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1waXBlLmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgeyB0aW1lb3V0UHJvdmlkZXIgfSBmcm9tICcuLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyJztcbmV4cG9ydCBmdW5jdGlvbiByZXBvcnRVbmhhbmRsZWRFcnJvcihlcnIpIHtcbiAgICB0aW1lb3V0UHJvdmlkZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvblVuaGFuZGxlZEVycm9yID0gY29uZmlnLm9uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIGlmIChvblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBvblVuaGFuZGxlZEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcG9ydFVuaGFuZGxlZEVycm9yLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvcihpbnB1dCkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKFwiWW91IHByb3ZpZGVkIFwiICsgKGlucHV0ICE9PSBudWxsICYmIHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcgPyAnYW4gaW52YWxpZCBvYmplY3QnIDogXCInXCIgKyBpbnB1dCArIFwiJ1wiKSArIFwiIHdoZXJlIGEgc3RyZWFtIHdhcyBleHBlY3RlZC4gWW91IGNhbiBwcm92aWRlIGFuIE9ic2VydmFibGUsIFByb21pc2UsIFJlYWRhYmxlU3RyZWFtLCBBcnJheSwgQXN5bmNJdGVyYWJsZSwgb3IgSXRlcmFibGUuXCIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhyb3dVbm9ic2VydmFibGVFcnJvci5qcy5tYXAiLCJpbXBvcnQge1RpY2tldH0gZnJvbSBcIi4vbW9kZWxzL1RpY2tldFwiO1xuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi9tb2RlbHMvVXNlclwiO1xuaW1wb3J0IHtCYWxsfSBmcm9tIFwiLi9tb2RlbHMvQmFsbFwiO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tIFwicnhqc1wiO1xuXG5leHBvcnQgY29uc3QgU0VSVkVSX0FERFJFU1MgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xuZXhwb3J0IGNvbnN0IEJBTExfSU5URVJWQUwgPSAzMDAwO1xuZXhwb3J0IGNvbnN0IFJPVU5EX1RJTUUgPSAzNSAqIEJBTExfSU5URVJWQUwgLyAxMDAwICsgMjtcblxuZXhwb3J0IGNvbnN0IE1JTl9CRVQgPSAyMFxuXG5leHBvcnQgY29uc3QgVElDS0VUX1RPX0JFX1BPUFVMQVRFRDogVGlja2V0ID0ge1xuICAgIG51bWJlcnM6IFtdLFxuICAgIGJldDogTUlOX0JFVCxcbiAgICBudW06IDAsXG4gICAgcGFzc2VkOiBmYWxzZVxufTtcbmV4cG9ydCBjb25zdCBUSUNLRVRTOiBUaWNrZXRbXSA9IFtdXG5cbmV4cG9ydCBjb25zdCBVU0VSOiBVc2VyID0ge1xuICAgIGlkOiAxLFxuICAgIGJhbGFuY2U6IDEwMDAsXG4gICAgbmFtZTogXCJNYXJrb1wiXG59XG5cbmV4cG9ydCBjb25zdCBTRUM6IG51bWJlciA9IDEwMDA7XG5leHBvcnQgY29uc3QgTUlOVVRFUzogbnVtYmVyID0gMC41O1xuZXhwb3J0IGNvbnN0IFRJTUU6IG51bWJlciA9IE1JTlVURVMgKiA2MDtcblxuZXhwb3J0IGNvbnN0IEFSUkFZX0lEUzogbnVtYmVyW11bXSA9IFtbMSwgMiwgMywgNCwgNSwgNiwgNywgOF0sIFs5LCAxMCwgMTEsIDEyXSwgWzEzLCAxNCwgMTVdLCBbMTYsIDE3LCAxOF0sIFsxOSwgMjAsIDIxLCAyMl0sIFsyMywgMjQsIDI1LCAyNiwgMjcsIDI4LCAyOSwgMzBdXVxuZXhwb3J0IGNvbnN0IE1VTFRJUExJRVJTOiBudW1iZXJbXSA9IFswLCAwLCAwLCAwLCAwLCAxMDAwMCwgNzUwMCwgNTAwMCwgMjUwMCwgMTAwMCwgNTAwLCAzMDAsIDIwMCwgMTUwLCAxMDAsIDkwLCA4MCwgNzAsIDYwLCA1MCwgNDAsIDMwLCAyNSwgMjAsIDE1LCAxMCwgOSwgOCwgNywgNiwgNSwgNCwgMywgMiwgMV07XG5leHBvcnQgY29uc3QgU1VCSkVDVDogU3ViamVjdDxCYWxsPiA9IG5ldyBTdWJqZWN0PEJhbGw+KCk7XG4iLCJpbXBvcnQge2Zyb20sIE9ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0JhbGx9IGZyb20gXCIuLi9tb2RlbHMvQmFsbFwiO1xuaW1wb3J0IHtTRVJWRVJfQUREUkVTU30gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuXG5leHBvcnQgY29uc3QgZ2V0QmFsbHMgPSAoKTogT2JzZXJ2YWJsZTxCYWxsW10+ID0+IHtcbiAgICBjb25zdCBwcm9taXNlOiBQcm9taXNlPEJhbGxbXT4gPSBmZXRjaChgJHtTRVJWRVJfQUREUkVTU30vYmFsbGApXG4gICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS50YWJsZShyZXMuanNvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIGZyb20ocHJvbWlzZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RmlndXJlc1F1ZXJ5ID0gKHF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEJhbGxbXT4gPT4ge1xuICAgIGNvbnN0IHByb21pc2U6IFByb21pc2U8QmFsbFtdPiA9IGZldGNoKGAke1NFUlZFUl9BRERSRVNTfS9iYWxsP3E9JHtxdWVyeX1gKVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXJlcy5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUudGFibGUocmVzLmpzb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBmcm9tKHByb21pc2UpO1xufTsiLCJleHBvcnQgY29uc3QgZ2V0UmFuZG9tTnVtYmVyID0gKGxlbmd0aDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnBvdygxMCwgbGVuZ3RoIC0gMSkgKyBNYXRoLnJhbmRvbSgpICogKE1hdGgucG93KDEwLCBsZW5ndGgpIC0gTWF0aC5wb3coMTAsIGxlbmd0aCAtIDEpIC0gMSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJhbmRvbU51bWJlciA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXG59XG5cbmV4cG9ydCBjb25zdCBhcnJheVJlbW92ZSA9IChhcnI6IGFueVtdLCB2YWx1ZTogYW55KTogYW55W10gPT4ge1xuICAgIGFyci5maWx0ZXIoZnVuY3Rpb24gKGVsZSkge1xuICAgICAgICByZXR1cm4gZWxlICE9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBjb25zdCBhcnJheVNodWZmbGUgPSAoYXJyYXk6IGFueVtdKTogYW55W10gPT4ge1xuICAgIGxldCBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHJhbmRvbUluZGV4O1xuICAgIHdoaWxlIChjdXJyZW50SW5kZXggIT0gMCkge1xuICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgICAgIGN1cnJlbnRJbmRleC0tO1xuICAgICAgICBbYXJyYXlbY3VycmVudEluZGV4XSwgYXJyYXlbcmFuZG9tSW5kZXhdXSA9IFtcbiAgICAgICAgICAgIGFycmF5W3JhbmRvbUluZGV4XSwgYXJyYXlbY3VycmVudEluZGV4XV07XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbn1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVEaXYgPSAocGFyZW50OiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCA9PiB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAgIHJldHVybiBkaXY7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTGFiZWwgPSAocGFyZW50OiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lPzogc3RyaW5nKTogSFRNTExhYmVsRWxlbWVudCA9PiB7XG4gICAgY29uc3QgbGJsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSAhPT0gXCJ1bmRlZmluZWRcIikgbGJsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobGJsKTtcblxuICAgIHJldHVybiBsYmw7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQnV0dG9uID0gKHBhcmVudDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZT86IHN0cmluZyk6IEhUTUxCdXR0b25FbGVtZW50ID0+IHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSAhPT0gXCJ1bmRlZmluZWRcIikgYnRuLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnRuKTtcblxuICAgIHJldHVybiBidG47XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlSW5wdXQgPSAocGFyZW50OiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lPzogc3RyaW5nKTogSFRNTElucHV0RWxlbWVudCA9PiB7XG4gICAgY29uc3QgaW5wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgIT09IFwidW5kZWZpbmVkXCIpIGlucHQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChpbnB0KTtcblxuICAgIHJldHVybiBpbnB0O1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUN1c3RvbUVsZW1lbnQgPSAodGFnTmFtZTogc3RyaW5nLCBwYXJlbnQ6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU/OiBzdHJpbmcpOiBIVE1MRWxlbWVudCA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lICE9PSBcInVuZGVmaW5lZFwiKSBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGVsKTtcblxuICAgIHJldHVybiBlbDtcbn1cblxuIiwiaW1wb3J0IHtmcm9tLCBtYXAsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgdGFrZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7QkFMTF9JTlRFUlZBTCwgUk9VTkRfVElNRSwgU1VCSkVDVCwgVElDS0VUUywgVVNFUn0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IHthcnJheVNodWZmbGUsIHJhbmRvbU51bWJlcn0gZnJvbSBcIi4uL2hlbHBlcnMvSGVscGVyTG9naWNcIjtcbmltcG9ydCB7VGlja2V0fSBmcm9tIFwiLi4vbW9kZWxzL1RpY2tldFwiO1xuaW1wb3J0IHtcbiAgICBjaGVja0lmUGFzc2VkVGlja2V0LFxuICAgIGRpc2FibGVJbnRlcmZhY2UsXG4gICAgZHJhd0JhbGxJbkJpZ0JhbGwsXG4gICAgZHJhd0ludG9CYWxsSG9sZGVyLFxuICAgIGluaXRHYW1lVmlldyxcbiAgICBtYXJrTnVtYmVyT25UaWNrZXQsXG4gICAgc2V0VGlja2V0Tm90UGFzc2VkXG59IGZyb20gXCIuLi92aWV3cy9HYW1lVmlld1wiO1xuaW1wb3J0IHtpbml0SG9tZSwgdXBkYXRlRG9tVGltZXJ9IGZyb20gXCIuLi92aWV3cy9Ib21lVmlld1wiO1xuaW1wb3J0IHtzdGFydFRpbWVyfSBmcm9tIFwiLi9UaW1lclNlcnZpY2VcIjtcbmltcG9ydCB7Z2V0QmFsbHN9IGZyb20gXCIuLi9jb250cm9sbGVycy9CYWxsQ29udHJvbGxlclwiO1xuaW1wb3J0IHtCYWxsfSBmcm9tIFwiLi4vbW9kZWxzL0JhbGxcIjtcblxuZXhwb3J0IGNvbnN0IHN0YXJ0RHJhdyA9ICgpOiBTdWJzY3JpcHRpb24gPT4ge1xuICAgIGxldCBhcnJheTogQmFsbFtdXG4gICAgZ2V0QmFsbHMoKS5zdWJzY3JpYmUoKGJhbGxzKSA9PiB7XG4gICAgICAgIGFycmF5ID0gYmFsbHNcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgoZ2VuKSA9PiB7XG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGdlbi5uZXh0KFxuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlTaHVmZmxlKGFycmF5KS5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tTnVtYmVyKDEsIGFycmF5Lmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgKSwgMSlcbiAgICAgICAgICAgICAgICAgICAgWzBdXG4gICAgICAgICAgICApO1xuICAgICAgICB9LCBCQUxMX0lOVEVSVkFMKVxuICAgIH0pLnBpcGUoXG4gICAgICAgIHRha2UoMzUpLFxuICAgICAgICBtYXAoeCA9PiB4IGFzIEJhbGwpKVxuICAgICAgICAuc3Vic2NyaWJlKCh4KSA9PiB7XG4gICAgICAgICAgICBkcmF3QmFsbEluQmlnQmFsbCh4KVxuICAgICAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICBzZXRUaWNrZXROb3RQYXNzZWQoKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdEhvbWUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5Db250YWluZXInKSlcbiAgICAgICAgICAgICAgICB9LCA1MDAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHByZXBhcmVVc2VyRGF0YSA9IChlbDogSFRNTEVsZW1lbnQpOiBQcm9taXNlPFRpY2tldD4gPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICAgIGxldCB0OiBUaWNrZXQgPSB7XG4gICAgICAgICAgICBudW1iZXJzOiBbXSxcbiAgICAgICAgICAgIGJldDogMCxcbiAgICAgICAgICAgIG51bTogMCxcbiAgICAgICAgICAgIHBhc3NlZDogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgZnJvbShlbC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5udW0nKSkucGlwZShtYXAoZWwgPT4gcGFyc2VJbnQoZWwuaW5uZXJIVE1MKSkpLnN1YnNjcmliZShlbCA9PiB0Lm51bWJlcnMucHVzaChlbCkpO1xuICAgICAgICB0LmJldCA9IHBhcnNlSW50KChlbC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50LWJldC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKVxuICAgICAgICB0Lm51bSA9IHBhcnNlSW50KChlbC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgndC1pZCcpKSlcbiAgICAgICAgVVNFUi5iYWxhbmNlIC09IHQuYmV0O1xuICAgICAgICByZXModCk7XG4gICAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHByZXBhcmVUaWNrZXRzID0gKCk6IHZvaWQgPT4ge1xuICAgIGxldCBkaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmItY29uZi1hY3RpdmUnKVxuXG4gICAgZGl2cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgcHJlcGFyZVVzZXJEYXRhKGVsIGFzIEhUTUxFbGVtZW50KS50aGVuKHQgPT4ge1xuICAgICAgICAgICAgVElDS0VUUy5wdXNoKHQpXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBzdGFydEdhbWUgPSAoKTogdm9pZCA9PiB7XG4gICAgaW5pdEdhbWVWaWV3KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluQ29udGFpbmVyJykpO1xuICAgIHN0YXJ0RHJhdygpXG4gICAgc3RhcnRUaW1lcihST1VORF9USU1FKS5zdWJzY3JpYmUoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGxpc3RlbkJpZ0JhbGwgPSAoKTogdm9pZCA9PiB7XG4gICAgbGV0IHBoSW5kZXg6IG51bWJlciA9IDA7XG4gICAgU1VCSkVDVC5zdWJzY3JpYmUoYmFsbCA9PiB7XG4gICAgICAgIHBoSW5kZXgrKztcbiAgICAgICAgYmFsbC5udW0gPSBwaEluZGV4O1xuICAgICAgICBkcmF3SW50b0JhbGxIb2xkZXIoYmFsbCwgcGhJbmRleCk7XG4gICAgICAgIG1hcmtOdW1iZXJPblRpY2tldChiYWxsLmlkKVxuICAgICAgICBjaGVja0lmUGFzc2VkVGlja2V0KGJhbGwubnVtKTtcbiAgICB9KVxufVxuXG5leHBvcnQgY29uc3QgZGlzYWJsZUludGVyZmFjZUFuZFByZXBhcmVUaWNrZXRzID0gKCk6IHZvaWQgPT4ge1xuICAgIGRpc2FibGVJbnRlcmZhY2UoKVxuICAgIHByZXBhcmVUaWNrZXRzKClcbn1cblxuIiwiaW1wb3J0IHtmaWx0ZXIsIGZyb21FdmVudCwgbWFwLCBzd2l0Y2hNYXB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge01JTl9CRVQsIFRJQ0tFVF9UT19CRV9QT1BVTEFURUR9IGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7YWN0aXZhdGVCYWxsLCBkcmF3VGlja2V0LCByZXNldEFjdGl2ZUJhbGxzLCB1cGRhdGVUaWNrZXROdW1iZXJzfSBmcm9tIFwiLi4vdmlld3MvSG9tZVZpZXdcIjtcblxuXG5leHBvcnQgY29uc3QgdXBkYXRlVGlja2V0cyA9IChudW1iZXI6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIGlmIChUSUNLRVRfVE9fQkVfUE9QVUxBVEVELm51bWJlcnMubGVuZ3RoID49IDYpIHtcbiAgICAgICAgVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5udW1iZXJzID0gW107XG4gICAgICAgIFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtKys7XG4gICAgICAgIFRJQ0tFVF9UT19CRV9QT1BVTEFURUQuYmV0ID0gTUlOX0JFVDtcbiAgICAgICAgZHJhd1RpY2tldCgpO1xuICAgICAgICBPblRpY2tldEFjdGl2ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtYmVycy5wdXNoKG51bWJlcik7XG4gICAgICAgIHVwZGF0ZVRpY2tldE51bWJlcnMobnVtYmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBsaXN0ZW5DbGlja09uQmFsbCA9ICgpOiB2b2lkID0+IHtcbiAgICBkcmF3VGlja2V0KCk7XG4gICAgZnJvbUV2ZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYWxsSGFuZGxlcicpLCAnY2xpY2snKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChldiA9PiBwYXJzZUludCgoPEhUTUxEaXZFbGVtZW50PmV2LnRhcmdldCkuZ2V0QXR0cmlidXRlKCdpZCcpKSksXG4gICAgICAgICAgICBmaWx0ZXIoZWwgPT4gZWwgIT0gdW5kZWZpbmVkICYmICFpc05hTihlbCkpLFxuICAgICAgICAgICAgbWFwKGlkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5udW1iZXJzLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICBUSUNLRVRfVE9fQkVfUE9QVUxBVEVELm51bWJlcnMuc3BsaWNlKFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtYmVycy5pbmRleE9mKGlkKSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRpY2tldE51bWJlcnMoaWQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gaWRcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZmlsdGVyKHZhbCA9PiB2YWwgIT0gMCAmJiB2YWwgIT0gdW5kZWZpbmVkKVxuICAgICAgICApLnN1YnNjcmliZSh4ID0+IHVwZGF0ZVRpY2tldHMoeCkpO1xufVxuXG5leHBvcnQgY29uc3QgT25UaWNrZXRBY3RpdmUgPSAoKTogdm9pZCA9PiB7XG4gICAgZnJvbUV2ZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51LXRpY2tldCcpLCAnY2xpY2snKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChldiA9PiB7XG4gICAgICAgICAgICAgICAgVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5udW1iZXJzID0gW107XG4gICAgICAgICAgICAgICAgcmVzZXRBY3RpdmVCYWxscygpO1xuICAgICAgICAgICAgICAgIHJldHVybiA8SFRNTERpdkVsZW1lbnQ+ZXYudGFyZ2V0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBmaWx0ZXIoZWwgPT4gZWwgIT0gdW5kZWZpbmVkKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcChlbCA9PiBlbC5xdWVyeVNlbGVjdG9yQWxsKCcubnVtJykpLFxuICAgICAgICAgICAgZmlsdGVyKG51bXMgPT4gbnVtcyAhPSB1bmRlZmluZWQpXG4gICAgICAgICkuc3Vic2NyaWJlKG51bXMgPT4ge1xuICAgICAgICBhY3RpdmF0ZUJhbGwocGFyc2VJbnQobnVtcy5pbm5lckhUTUwpKTtcbiAgICAgICAgVElDS0VUX1RPX0JFX1BPUFVMQVRFRC5udW1iZXJzLnB1c2gocGFyc2VJbnQobnVtcy5pbm5lckhUTUwpKTtcbiAgICB9KVxufVxuIiwiaW1wb3J0IHttYXAsIE9ic2VydmFibGUsIHRpbWVyfSBmcm9tICdyeGpzJztcbmltcG9ydCB7dGFrZVdoaWxlLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7U0VDfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5pbXBvcnQge2Rpc2FibGVJbnRlcmZhY2VBbmRQcmVwYXJlVGlja2V0cywgc3RhcnRHYW1lfSBmcm9tIFwiLi9HYW1lU2VydmljZVwiO1xuaW1wb3J0IHt1cGRhdGVEb21UaW1lcn0gZnJvbSBcIi4uL3ZpZXdzL0hvbWVWaWV3XCI7XG5cblxuZXhwb3J0IGNvbnN0IHJlbWFpbmluZ1RpbWVVcGRhdGUgPSAoc2Vjb25kczogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgbGV0IG1pbnM6IHN0cmluZyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKS50b1N0cmluZygpO1xuICAgIGxldCBzZWM6IHN0cmluZyA9IChzZWNvbmRzIC0gKHBhcnNlSW50KG1pbnMpICogNjApKS50b1N0cmluZygpO1xuXG4gICAgaWYgKG1pbnMubGVuZ3RoIDw9IDEpXG4gICAgICAgIG1pbnMgPSBcIjBcIiArIG1pbnM7XG4gICAgaWYgKHNlYy5sZW5ndGggPD0gMSlcbiAgICAgICAgc2VjID0gXCIwXCIgKyBzZWM7XG4gICAgdXBkYXRlRG9tVGltZXIoc2VjLCBtaW5zKTtcbn1cblxuZXhwb3J0IGNvbnN0IHNjaGVkdWxlR2FtZUFuZFN0YXJ0ID0gKCk6IHZvaWQgPT4ge1xuICAgIHN0YXJ0VGltZXIoMTApLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgaWYgKHggPT0gNSkge1xuICAgICAgICAgICAgZGlzYWJsZUludGVyZmFjZUFuZFByZXBhcmVUaWNrZXRzKClcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCA8PSAwKSB7XG4gICAgICAgICAgICBzdGFydEdhbWUoKVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuZXhwb3J0IGNvbnN0IHN0YXJ0VGltZXIgPSAodGltZTogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+ID0+IHtcbiAgICBsZXQgY291bnRlciA9IHRpbWU7XG4gICAgcmV0dXJuIHRpbWVyKFNFQywgU0VDKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRha2VXaGlsZSgoKSA9PiBjb3VudGVyID4gMCksXG4gICAgICAgICAgICB0YXAoKCkgPT4gY291bnRlci0tKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVtYWluaW5nVGltZVVwZGF0ZShjb3VudGVyKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoKCkgPT4gY291bnRlcilcbiAgICAgICAgKVxufVxuIiwiaW1wb3J0IHtjcmVhdGVEaXYsIGNyZWF0ZUxhYmVsfSBmcm9tIFwiLi4vaGVscGVycy9IZWxwZXJWaWV3c1wiO1xuaW1wb3J0IHtBUlJBWV9JRFMsIE1VTFRJUExJRVJTLCBTVUJKRUNULCBUSUNLRVRTLCBVU0VSfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5pbXBvcnQge0JhbGx9IGZyb20gXCIuLi9tb2RlbHMvQmFsbFwiO1xuaW1wb3J0IHtsaXN0ZW5CaWdCYWxsfSBmcm9tIFwiLi4vc2VydmljZXMvR2FtZVNlcnZpY2VcIjtcblxuZXhwb3J0IGNvbnN0IGluaXRHYW1lVmlldyA9IChob3N0OiBIVE1MRWxlbWVudCk6IHZvaWQgPT4ge1xuICAgIGhvc3QuaW5uZXJIVE1MID0gYGBcbiAgICBjcmVhdGVTZWN0b3IxKGhvc3QpO1xuICAgIGNyZWF0ZVNlY3RvcjIoaG9zdCk7XG59XG5cbmV4cG9ydCBjb25zdCBkcmF3VGlja2V0cyA9IChob3N0OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgIFRJQ0tFVFMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGxldCB0aWNrZXQgPSBjcmVhdGVEaXYoaG9zdCwgJ3UtdGlja2V0Jyk7XG4gICAgICAgIHRpY2tldC5zZXRBdHRyaWJ1dGUoJ3QtaWQnLCBlbC5udW0udG9TdHJpbmcoKSk7XG4gICAgICAgIHRpY2tldC5zdHlsZS5mbGV4RGlyZWN0aW9uID0gJ2NvbHVtbic7XG4gICAgICAgIHRpY2tldC5zdHlsZS53aWR0aCA9ICc5NSUnO1xuICAgICAgICBsZXQgbnVtcyA9IGNyZWF0ZURpdih0aWNrZXQsICd0LW51bWJlcnMnKTtcbiAgICAgICAgZWwubnVtYmVycy5mb3JFYWNoKG51bSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVEaXYobnVtcywgJ3QtbnVtcycpLmlubmVySFRNTCA9IG51bS50b1N0cmluZygpO1xuICAgICAgICB9KVxuICAgICAgICBjcmVhdGVEaXYodGlja2V0LCAndC1iZXQnKS5pbm5lckhUTUwgPSAnQmV0OiAnICsgZWwuYmV0LnRvU3RyaW5nKCk7XG4gICAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlY3RvcjIgPSAoaG9zdDogSFRNTEVsZW1lbnQpOiB2b2lkID0+IHtcbiAgICBjb25zdCBzZWN0b3IyID0gY3JlYXRlRGl2KGhvc3QsICdnLXNlY3RvcjInKTtcbiAgICBsZXQgcm91bmRJbmZvID0gY3JlYXRlRGl2KHNlY3RvcjIsICd0aW1lcicpXG4gICAgcm91bmRJbmZvLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2PlxuICAgIDxzcGFuIGNsYXNzPVwibWludXRlc1wiPjwvc3Bhbj5cbiAgICA8c3Bhbj46PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwic2Vjb25kc1wiPjwvc3Bhbj5cbiAgICA8L2Rpdj5gO1xuICAgIGNyZWF0ZUxhYmVsKHJvdW5kSW5mbywgJ2xibCcpXG4gICAgbGV0IGRpdlQgPSBjcmVhdGVEaXYoc2VjdG9yMiwgJ3UtZGl2Jyk7XG4gICAgZHJhd1RpY2tldHMoc2VjdG9yMik7XG4gICAgY3JlYXRlTGFiZWwoZGl2VCwgJ3ItdGl0bGUnKS5pbm5lckhUTUwgPSAnQmFsYW5jZTogJyArIFVTRVIuYmFsYW5jZVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlU2VjdG9yMSA9IChob3N0OiBIVE1MRWxlbWVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNlY3RvcjEgPSBjcmVhdGVEaXYoaG9zdCwgJ2ctc2VjdG9yMScpO1xuICAgIGxldCBnRGl2UGxjTCA9IGNyZWF0ZURpdihzZWN0b3IxLCAnZy1kaXYtcGxjJyk7XG4gICAgbGV0IGdEaXZQbGNNID0gY3JlYXRlRGl2KHNlY3RvcjEsICdnLWRpdi1wbGMtbScpO1xuICAgIGxldCBnRGl2UGxjUiA9IGNyZWF0ZURpdihzZWN0b3IxLCAnZy1kaXYtcGxjJyk7XG5cbiAgICBkcmF3QmFsbEhvbGRlcnNXaXRoTXVsdGlwbGllcihjcmVhdGVEaXYoZ0RpdlBsY0wsICdnLXBoLTEnKSwgWzEwMDAwLCA3NTAwLCA1MDAwLCAyNTAwLCAxMDAwLCA1MDAsIDMwMCwgMjAwXSwgMCk7XG4gICAgZHJhd0JhbGxIb2xkZXJzV2l0aE11bHRpcGxpZXIoY3JlYXRlRGl2KGdEaXZQbGNMLCAnZy1waC0yJyksIFsxNTAsIDEwMCwgOTAsIDgwXSwgMSk7XG5cbiAgICBkcmF3TWlkZGxlQmFsbChjcmVhdGVEaXYoZ0RpdlBsY00sICdnLWJiLXBoLWJpZycpLCA1MDApXG4gICAgbGV0IGdCRGl2ID0gY3JlYXRlRGl2KGdEaXZQbGNNLCAnZy1iYi1waCcpXG4gICAgZHJhd0JhbGxIb2xkZXJzV2l0aE11bHRpcGxpZXIoY3JlYXRlRGl2KGdCRGl2LCAnZy1waC0zJyksIFs3MCwgNjAsIDUwXSwgMilcbiAgICBkcmF3QmFsbEhvbGRlcnNXaXRoTXVsdGlwbGllcihjcmVhdGVEaXYoZ0JEaXYsICdnLXBoLTMnKSwgWzQwLCAzMCwgMjVdLCAzKVxuXG4gICAgZHJhd0JhbGxIb2xkZXJzV2l0aE11bHRpcGxpZXIoY3JlYXRlRGl2KGdEaXZQbGNSLCAnZy1waC0yJyksIFsyMCwgMTUsIDEwLCA5XSwgNCk7XG4gICAgZHJhd0JhbGxIb2xkZXJzV2l0aE11bHRpcGxpZXIoY3JlYXRlRGl2KGdEaXZQbGNSLCAnZy1waC0xJyksIFs4LCA3LCA2LCA1LCA0LCAzLCAyLCAxXSwgNSk7XG59XG5cbmV4cG9ydCBjb25zdCBkcmF3QmFsbEhvbGRlcnNXaXRoTXVsdGlwbGllciA9IChob3N0OiBIVE1MRWxlbWVudCwgbXVsdGlwbGllcnM6IG51bWJlcltdLCBhcnJheXg6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIGxldCBoOiBudW1iZXIgPSBNYXRoLmZsb29yKDEwMCAvIG11bHRpcGxpZXJzLmxlbmd0aCk7XG4gICAgbGV0IG9mZnNldDogbnVtYmVyID0gNVxuICAgIG11bHRpcGxpZXJzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBsZXQgYkhvbGRlciA9IGNyZWF0ZURpdihob3N0LCAnZy1iLWhvbGRlcicpXG4gICAgICAgIGJIb2xkZXIuc3R5bGUuaGVpZ2h0ID0gaC50b1N0cmluZygpICsgJyUnXG4gICAgICAgIGxldCBkaWJCYWxsID0gY3JlYXRlRGl2KGJIb2xkZXIsICdnLWJobCcpXG4gICAgICAgIGRpYkJhbGwuc2V0QXR0cmlidXRlKCdiYWxsLWlkJywgKEFSUkFZX0lEU1thcnJheXhdW211bHRpcGxpZXJzLmluZGV4T2YoZWwpXSArIG9mZnNldCkudG9TdHJpbmcoKSlcbiAgICAgICAgZGliQmFsbC5zZXRBdHRyaWJ1dGUoJ211bHQnLCBlbC50b1N0cmluZygpKVxuICAgICAgICBjcmVhdGVEaXYoYkhvbGRlciwgJ2ctbXVsLWwnKS5pbm5lckhUTUwgPSBlbC50b1N0cmluZygpXG4gICAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGRyYXdNaWRkbGVCYWxsID0gKGhvc3Q6IEhUTUxFbGVtZW50LCBtdWx0aXBsaWVyOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICBjcmVhdGVEaXYoaG9zdCwgJ2ctYmItYmlnLWJhbGwnKVxuICAgIGxldCBkaXZCYWxscyA9IGNyZWF0ZURpdihob3N0LCAnZy1kaXYtYmItYmFsbHMnKVxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgIGNyZWF0ZURpdihkaXZCYWxscywgJ2ctYmhsJykuc2V0QXR0cmlidXRlKCdiYWxsLWlkJywgaS50b1N0cmluZygpKTtcbiAgICB9XG4gICAgbGlzdGVuQmlnQmFsbCgpXG59XG5cbmV4cG9ydCBjb25zdCBkcmF3QmFsbEluQmlnQmFsbCA9IChiYWxsOiBCYWxsKTogdm9pZCA9PiB7XG4gICAgbGV0IGJpZ0JhbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZy1iYi1iaWctYmFsbCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIGJpZ0JhbGwuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjZW50ZXJCYWxsXCI+ICR7YmFsbC5pZC50b1N0cmluZygpfSA8L2Rpdj5gO1xuICAgIFNVQkpFQ1QubmV4dChiYWxsKTtcbiAgICBiaWdCYWxsLnN0eWxlLmJhY2tncm91bmQgPSBiYWxsLmNvbG9yO1xuICAgIGJpZ0JhbGwuc3R5bGUuYm94U2hhZG93ID0gYDBweCA1cHggMTJweCAjMDAwMDAwMUZgO1xuICAgIHNldFRpbWVvdXQoY2xlYXJCaWdCYWxsLCAyMDAwKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFyQmlnQmFsbCA9ICgpOiB2b2lkID0+IHtcbiAgICBsZXQgYmlnQmFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nLWJiLWJpZy1iYWxsJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgYmlnQmFsbC5pbm5lckhUTUwgPSBgYDtcbiAgICBiaWdCYWxsLnN0eWxlLmJhY2tncm91bmQgPSAnI2Y4ZjhmOCc7XG59XG5cbmV4cG9ydCBjb25zdCBkcmF3SW50b0JhbGxIb2xkZXIgPSAoYmFsbDogQmFsbCwgcGhJbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgbGV0IGJoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W2JhbGwtaWRdJylcbiAgICBiaC5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgaWYgKHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnYmFsbC1pZCcpKSA9PSBwaEluZGV4KSB7XG4gICAgICAgICAgICBsZXQgYmVsID0gZWwgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBiZWwuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJiaC1iLXBsYWNlZFwiPiR7YmFsbC5pZC50b1N0cmluZygpfTwvZGl2PmBcbiAgICAgICAgICAgIGJlbC5zdHlsZS5iYWNrZ3JvdW5kID0gYmFsbC5jb2xvcjtcbiAgICAgICAgfVxuICAgIH0pXG59XG5leHBvcnQgY29uc3QgbWFya051bWJlck9uVGlja2V0ID0gKG51bWJlclRvTWFyazogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgbGV0IHRpY2tldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbdC1pZF0nKVxuICAgIHRpY2tldHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy50LW51bXMnKS5mb3JFYWNoKG51bSA9PiB7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQobnVtLmlubmVySFRNTCkgPT0gbnVtYmVyVG9NYXJrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpdiA9IG51bSBhcyBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCd0LW1hcmtlZC1udW0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5leHBvcnQgY29uc3QgY2hlY2tJZlBhc3NlZFRpY2tldCA9IChtdWx0aXA6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIGxldCB0aWNrZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3QtaWRdJylcbiAgICB0aWNrZXRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBsZXQgdCA9IGVsIGFzIEhUTUxFbGVtZW50XG4gICAgICAgIGxldCBpZCA9IHBhcnNlSW50KHQuZ2V0QXR0cmlidXRlKCd0LWlkJykpXG4gICAgICAgIGlmIChlbC5xdWVyeVNlbGVjdG9yQWxsKCcudC1tYXJrZWQtbnVtJykubGVuZ3RoID09IDYgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucygndC1wYXNzZWQnKSkge1xuICAgICAgICAgICAgdC5jbGFzc0xpc3QuYWRkKCd0LXBhc3NlZCcpO1xuICAgICAgICAgICAgVElDS0VUUy5mb3JFYWNoKHRpY2tldCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRpY2tldC5udW0gPT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGlja2V0LnBhc3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVVzZXJCYWxhbmNlKHRpY2tldC5iZXQgKiBNVUxUSVBMSUVSU1ttdWx0aXBdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5leHBvcnQgY29uc3Qgc2V0VGlja2V0Tm90UGFzc2VkID0gKCk6IHZvaWQgPT4ge1xuICAgIGxldCB0aWNrZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnUtdGlja2V0JylcbiAgICB0aWNrZXRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3QtZmFpbGVkJyk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlVXNlckJhbGFuY2UgPSAod29uOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICBsZXQgYmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnItdGl0bGUnKSBhcyBIVE1MRWxlbWVudFxuICAgIGJhbC5pbm5lckhUTUwgPSAnQmFsYW5jZTogJyArIChVU0VSLmJhbGFuY2UgKyB3b24pLnRvU3RyaW5nKCk7XG4gICAgVVNFUi5iYWxhbmNlICs9IHdvblxufVxuXG5leHBvcnQgY29uc3QgZGlzYWJsZUludGVyZmFjZSA9ICgpOiB2b2lkID0+IHtcbiAgICBjcmVhdGVEaXYoKGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignLm1haW5Db250YWluZXInKSkgYXMgSFRNTEVsZW1lbnQsICdiaWdUaW1lcicpXG59XG4iLCJpbXBvcnQge2NyZWF0ZURpdiwgY3JlYXRlSW5wdXQsIGNyZWF0ZUxhYmVsfSBmcm9tIFwiLi4vaGVscGVycy9IZWxwZXJWaWV3c1wiO1xuaW1wb3J0IHtnZXRCYWxsc30gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL0JhbGxDb250cm9sbGVyXCI7XG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuLi9tb2RlbHMvVXNlclwiO1xuaW1wb3J0IHtCYWxsfSBmcm9tIFwiLi4vbW9kZWxzL0JhbGxcIjtcbmltcG9ydCB7TUlOX0JFVCwgVElDS0VUX1RPX0JFX1BPUFVMQVRFRCwgVElDS0VUUywgVVNFUn0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IHtsaXN0ZW5DbGlja09uQmFsbH0gZnJvbSBcIi4uL3NlcnZpY2VzL1RpY2tldFNlcnZpY2VcIjtcbmltcG9ydCB7c2NoZWR1bGVHYW1lQW5kU3RhcnR9IGZyb20gXCIuLi9zZXJ2aWNlcy9UaW1lclNlcnZpY2VcIjtcblxuZXhwb3J0IGNvbnN0IGluaXRIb21lID0gKGhvc3Q6IEhUTUxFbGVtZW50KTogdm9pZCA9PiB7XG4gICAgaG9zdC5pbm5lckhUTUwgPSBgYDtcbiAgICB3aGlsZSAoVElDS0VUUy5sZW5ndGggPiAwKVxuICAgICAgICBUSUNLRVRTLnBvcCgpO1xuICAgIFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtYmVycyA9IFtdO1xuXG4gICAgY29uc3Qgc2VjdG9yMSA9IGNyZWF0ZURpdihob3N0LCAnc2VjdG9yMScpO1xuICAgIGNvbnN0IHNlY3RvcjIgPSBjcmVhdGVEaXYoaG9zdCwgJ3NlY3RvcjInKTtcblxuICAgIGluaXRVaShzZWN0b3IyLCBVU0VSKTtcblxuICAgIGNvbnN0IHRpdGxlID0gY3JlYXRlRGl2KHNlY3RvcjEsICdkaXZUaXRsZScpO1xuICAgIGNyZWF0ZUxhYmVsKHRpdGxlLCAndGl0bGUnKS5pbm5lclRleHQgPSAnUGxhY2UgQmV0JztcbiAgICBjcmVhdGVMYWJlbCh0aXRsZSwgJ2xibFRpbWVyJykuaW5uZXJIVE1MID0gYFxuICAgIDxzcGFuIGNsYXNzPVwibWludXRlc1wiPjwvc3Bhbj5cbiAgICA8c3Bhbj46PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwic2Vjb25kc1wiPjwvc3Bhbj5gO1xuICAgIGNyZWF0ZUxhYmVsKHRpdGxlLCAnci10aXRsZScpXG5cbiAgICBjb25zdCBkYiA9IGNyZWF0ZURpdihzZWN0b3IxLCAnZGl2QmFsbHMnKTtcblxuICAgIGdldEJhbGxzKCkuc3Vic2NyaWJlKChiYWxscykgPT4ge1xuICAgICAgICBkcmF3QmFsbEhhbmRsZXJXaXRoQmFsbChkYiwgYmFsbHMpLnRoZW4obGlzdGVuQ2xpY2tPbkJhbGwpO1xuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dChzY2hlZHVsZUdhbWVBbmRTdGFydCwgMjAwKTtcbn1cbmV4cG9ydCBjb25zdCBkcmF3QmFsbEhhbmRsZXJXaXRoQmFsbCA9IChob3N0OiBIVE1MRWxlbWVudCwgYmFsbHM6IEJhbGxbXSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBiYWxscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGRyYXdCYWxscyhlbCxcbiAgICAgICAgICAgICAgICBjcmVhdGVEaXYoaG9zdCwgJ2JhbGxIYW5kbGVyJykpO1xuICAgICAgICB9KVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBpbml0VWkgPSAoaG9zdDogSFRNTEVsZW1lbnQsIHVzZXI6IFVzZXIpOiB2b2lkID0+IHtcbiAgICBjb25zdCB1aURpdiA9IGNyZWF0ZURpdihob3N0LCAndS1kaXYnKTtcbiAgICBjcmVhdGVMYWJlbCh1aURpdiwgJ3UtbmFtZScpLmlubmVyVGV4dCA9ICdCYWxhbmNlOiAnICsgdXNlci5iYWxhbmNlO1xuICAgIGNyZWF0ZUxhYmVsKHVpRGl2LCAndS1iYWwnKS5pbm5lclRleHQgPSAnSGVsbG8gJyArIHVzZXIubmFtZTtcbiAgICBjb25zdCB0aWNrZXRzID0gY3JlYXRlRGl2KGhvc3QsICd1LW1haW4tdGlja2V0cycpO1xufVxuXG5leHBvcnQgY29uc3QgZHJhd0JhbGxzID0gKGJhbGw6IEJhbGwsIGhvc3Q6IEhUTUxFbGVtZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3QgYiA9IGNyZWF0ZURpdihob3N0LCAnYmFsbCcpO1xuICAgIGIuc2V0QXR0cmlidXRlKCdpZCcsIGJhbGwuaWQudG9TdHJpbmcoKSk7XG4gICAgYi5pbm5lclRleHQgPSBiYWxsLmlkLnRvU3RyaW5nKCk7XG4gICAgYi5zdHlsZS5iYWNrZ3JvdW5kID0gYmFsbC5jb2xvcjtcbiAgICBiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICAgIGFjdGl2YXRlQmFsbChiYWxsLmlkKTtcbiAgICB9LCB0cnVlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFjdGl2YXRlQmFsbCA9IChiYWxsSWQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIGxldCBiYWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W2lkXScpXG4gICAgICAgIC5pdGVtKGJhbGxJZCAtIDEpLnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKGJhbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSlcbiAgICAgICAgYmFsbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgIGVsc2VcbiAgICAgICAgYmFsbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbn1cbmV4cG9ydCBjb25zdCBhY3RpdmF0ZVRpY2tldCA9ICh0aWNrZXRJZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgcmVzZXRBY3RpdmVUaWNrZXRzKCk7XG4gICAgbGV0IHRpY2tldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdlt0LWlkXScpXG4gICAgdGlja2V0LmZvckVhY2goZWwgPT4ge1xuICAgICAgICBpZiAocGFyc2VJbnQoZWwuZ2V0QXR0cmlidXRlKCd0LWlkJykpID09PSB0aWNrZXRJZClcbiAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3QtYWN0aXZlJykpXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgndC1hY3RpdmUnKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3QtYWN0aXZlJyk7XG4gICAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGRyYXdUaWNrZXQgPSAoKTogdm9pZCA9PiB7XG4gICAgcmVzZXRBY3RpdmVUaWNrZXRzKCk7XG4gICAgbGV0IHRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnUtbWFpbi10aWNrZXRzJykgYXMgSFRNTEVsZW1lbnRcblxuICAgIGxldCB0aWNrZXQgPSBjcmVhdGVEaXYodEFyZWEsICd1LXRpY2tldCcpO1xuICAgIHRpY2tldC5jbGFzc0xpc3QuYWRkKCd0LWFjdGl2ZScpXG4gICAgdGlja2V0LnNldEF0dHJpYnV0ZSgndC1pZCcsIFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtLnRvU3RyaW5nKCkpO1xuICAgIHRpY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgYWN0aXZhdGVUaWNrZXQocGFyc2VJbnQodGlja2V0LmdldEF0dHJpYnV0ZSgndC1pZCcpKSlcbiAgICB9LCBmYWxzZSk7XG5cblxuICAgIGNyZWF0ZUxhYmVsKHRpY2tldCwgJ2xibCcpLmlubmVyVGV4dCA9IFwiVGlja2V0ICNcIiArIFRJQ0tFVF9UT19CRV9QT1BVTEFURUQubnVtLnRvU3RyaW5nKCk7XG4gICAgY3JlYXRlRGl2KHRpY2tldCwgJ3QtbnVtYmVycycpO1xuICAgIGxldCB0QmV0ID0gY3JlYXRlRGl2KHRpY2tldCwgJ3QtYmV0Jyk7XG5cbiAgICBsZXQgYmV0SW5wdXQgPSBjcmVhdGVJbnB1dCh0QmV0LCAndC1iZXQtaW5wdXQnKTtcbiAgICBiZXRJbnB1dC50eXBlID0gJ251bWJlcic7XG4gICAgYmV0SW5wdXQudmFsdWUgPSBNSU5fQkVULnRvU3RyaW5nKCk7XG4gICAgY3JlYXRlRGl2KHRpY2tldCwgJ2J0bkNvbmYnKS5pbm5lckhUTUwgPSBgPHN2ZyB3aWR0aD1cIjMwcHhcIiBoZWlnaHQ9XCIzMHB4XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBQcm8gNi4yLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UgKENvbW1lcmNpYWwgTGljZW5zZSkgQ29weXJpZ2h0IDIwMjIgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGQ9XCJNNDcwLjYgMTA1LjRjMTIuNSAxMi41IDEyLjUgMzIuOCAwIDQ1LjNsLTI1NiAyNTZjLTEyLjUgMTIuNS0zMi44IDEyLjUtNDUuMyAwbC0xMjgtMTI4Yy0xMi41LTEyLjUtMTIuNS0zMi44IDAtNDUuM3MzMi44LTEyLjUgNDUuMyAwTDE5MiAzMzguNyA0MjUuNCAxMDUuNGMxMi41LTEyLjUgMzIuOC0xMi41IDQ1LjMgMHpcIi8+PC9zdmc+YDtcbiAgICByZXNldEFjdGl2ZUJhbGxzKCk7XG59XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVUaWNrZXROdW1iZXJzID0gKG51bTogbnVtYmVyLCByZXNldD86IGJvb2xlYW4pID0+IHtcbiAgICBsZXQgZGl2VGlja2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdlt0LWlkXScpXG4gICAgbGV0IHRpY2tldDogSFRNTEVsZW1lbnQ7XG4gICAgZGl2VGlja2V0cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygndC1hY3RpdmUnKSlcbiAgICAgICAgICAgIHRpY2tldCA9IGVsIGFzIEhUTUxFbGVtZW50O1xuICAgIH0pO1xuICAgIGxldCBudW1iZXJzRGl2ID0gdGlja2V0LnF1ZXJ5U2VsZWN0b3IoJy50LW51bWJlcnMnKSBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAocmVzZXQpIHtcbiAgICAgICAgbGV0IG51bXMgPSBudW1iZXJzRGl2LnF1ZXJ5U2VsZWN0b3JBbGwoJy5udW0nKVxuICAgICAgICBudW1zLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgaWYgKGVsLmlubmVySFRNTCA9PSBudW0udG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgIG51bWJlcnNEaXYucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNyZWF0ZURpdihudW1iZXJzRGl2LCAnbnVtJykuaW5uZXJUZXh0ID0gbnVtLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGxldCBidG5DbmYgPSB0aWNrZXQucXVlcnlTZWxlY3RvcignLmJ0bkNvbmYnKTtcbiAgICBpZiAobnVtYmVyc0Rpdi5jaGlsZHJlbi5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgYnRuQ25mLmNsYXNzTGlzdC5hZGQoJ2ItY29uZi1hY3RpdmUnKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChidG5DbmYuY2xhc3NMaXN0LmNvbnRhaW5zKCdiLWNvbmYtYWN0aXZlJykpIHtcbiAgICAgICAgICAgIGJ0bkNuZi5jbGFzc0xpc3QucmVtb3ZlKCdiLWNvbmYtYWN0aXZlJylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlc2V0QWN0aXZlQmFsbHMgPSAoKTogdm9pZCA9PiB7XG4gICAgbGV0IGJhbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlJylcbiAgICBiYWxsLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9KVxufVxuXG5leHBvcnQgY29uc3QgcmVzZXRBY3RpdmVUaWNrZXRzID0gKCk6IHZvaWQgPT4ge1xuICAgIGxldCB0aWNrZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnQtYWN0aXZlJyk7XG4gICAgdGlja2V0cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgndC1hY3RpdmUnKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5VGlja2V0cyA9ICgpOiB2b2lkID0+IHtcbiAgICBsZXQgbWFpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51LW1haW4tdGlja2V0cycpO1xuICAgIGxldCB0aWNrZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnUtdGlja2V0JylcbiAgICB0aWNrZXRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBpZiAoZWwucXVlcnlTZWxlY3RvcignLnQtbnVtYmVycycpLmNoaWxkcmVuLmxlbmd0aCA8PSAwKVxuICAgICAgICAgICAgbWFpbkRpdi5yZW1vdmVDaGlsZChlbCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVEb21UaW1lciA9IChzZWM6IHN0cmluZywgbWluczogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pbnV0ZXMnKS5pbm5lckhUTUwgPSBtaW5zO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWNvbmRzJykuaW5uZXJIVE1MID0gc2VjO1xufVxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtpbml0SG9tZX0gZnJvbSBcIi4vdmlld3MvSG9tZVZpZXdcIjtcbmluaXRIb21lKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluQ29udGFpbmVyJykpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9