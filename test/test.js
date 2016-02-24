'use strict';

var should = require('should/as-function');

function client() {
  return {
    get: function (key, cb) {
      var k = key.key;
      if (k === 0) {
        cb({ code: k }, 'Ok');
      } else if (k === 2) {
        cb({ code: k });
      } else {
        cb(new Error('Oops'));
      }
    },

    put: function (key, data, policy, cb) {
      var k = key.key;
      if (k === 0) {
        cb({ code: k });
      } else {
        cb(new Error('Oops'));
      }
    }
  };
}

var botan = require('../main')(client());

describe('teabot-botan()', function () {
  describe('._getType()', function () {
    it('should be equal db', function () {
      should(botan._getType()).be.eql('db');
    });
  });

  describe('._getData()', function () {
    it('should be eql teabot', function () {
      should(botan._getData('KEY').set).be.eql('teabot');
    });

    it('should be false', function () {
      should(botan._getData()).be.false();
    });
  });

  describe('._get()', function () {
    it('should be eql Ok', function () {
      return botan._get(0).then(function (res) {
        should(res).be.eql('Ok');
      });
    });

    it('should be false', function () {
      return botan._get(2).then(function (res) {
        should(res).be.false();
      });
    });

    it('should throw Error', function () {
      return botan._get(1).catch(function (res) {
        should(res.message).be.eql('Oops');
      });
    });
  });

  describe('._put()', function () {
    it('should be true', function () {
      return botan._put(0, 'Test').then(function (res) {
        should(res).be.true();
      });
    });

    it('should throw Error', function () {
      return botan._put(1, 'Test').catch(function (res) {
        should(res.message).be.eql('Oops');
      });
    });
  });
});
