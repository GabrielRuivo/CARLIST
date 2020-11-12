(function() {
  'use strict'

  function DOM(elements) {
    if (!(this instanceof DOM)) {
      return new DOM(elements)
    }
    this.element = document.querySelectorAll(elements)
  }

  DOM.prototype.on = function (eventType, callback) {
    Array.prototype.forEach.call(this.element, (element) => {
      element.addEventListener(eventType, callback, false)
    })
  }
  DOM.prototype.off = function off(eventType, callback) {
    Array.prototype.forEach.call(this.element, (element) => {
      element.removeEventListener(eventType, callback, false)
    })
  }
  DOM.prototype.get = function get(index) {
    return !index ? this.element[0] : this.element[index]
  }

  // forEach, map, filter, reduce, reduceRight, every e some.

  DOM.prototype.forEach = function () {
    return Array.prototype.forEach.apply(this.element, arguments)
  }
  DOM.prototype.map = function () {
    return Array.prototype.map.apply(this.element, arguments)
  }
  DOM.prototype.filter = function () {
    return Array.prototype.filter.apply(this.element, arguments)
  }
  DOM.prototype.reduce = function () {
    return Array.prototype.reduce.apply(this.element, arguments)
  }
  DOM.prototype.reduceRight = function () {
    return Array.prototype.reduceRight.apply(this.element, arguments)
  }
  DOM.prototype.every = function () {
    return Array.prototype.every.apply(this.element, arguments)
  }
  DOM.prototype.sum = function () {
    return Array.prototype.sum.apply(this.element, arguments)
  }

  //isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.

  DOM.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  DOM.isObject = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Object]'
  }
  DOM.isFunction = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Function]'
  }
  DOM.isNumber = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Number]'
  }
  DOM.isString = function (arg) {
    return Object.prototype.toString.call(arg) === '[object String]'
  }
  DOM.isBoolean = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Boolean]'
  }
  DOM.isNull = function (arg) {
    return (
      Object.prototype.toString.call(arg) === '[object Null]' ||
      Object.prototype.toString.call(arg) === '[object Undefined]'
    )
  }

  window.DOM = DOM
})()
