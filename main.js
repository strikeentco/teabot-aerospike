'use strict';

function TeabotAerospikePlugin(client, key) {
  if (!(this instanceof TeabotAerospikePlugin)) {
    return new TeabotAerospikePlugin(client, key);
  }

  this._pluginType = 'db';

  key || (key = {});
  this._pluginData = {
    client: client,
    KEY: {
      ns: key.ns || 'app',
      set: key.set || 'teabot',
      key: null
    }
  };
}

TeabotAerospikePlugin.prototype._getType = function () {
  return this._pluginType;
};

TeabotAerospikePlugin.prototype._getData = function (name) {
  return this._pluginData[name] || false;
};

TeabotAerospikePlugin.prototype._get = function (key) {
  return new Promise(function (resolve, reject) {
    this._getData('KEY').key = key;
    this._getData('client').get(this._getData('KEY'), function (err, record) {
      if (err.code === 0) { //aerospike.status.AEROSPIKE_OK
        resolve(record);
      } else if (err.code === 602 || err.code === 2) { //aerospike.status.AEROSPIKE_ERR_RECORD_NOT_FOUND
        resolve(false);
      } else {
        reject(err);
      }
    });
  }.bind(this));
};

TeabotAerospikePlugin.prototype._put = function (key, data) {
  return new Promise(function (resolve, reject) {
    this._getData('KEY').key = key;
    this._getData('client').put(this._getData('KEY'), data, { exists: 0 }, function (err) { //aerospike.policy.exists.IGNORE
      if (err.code !== 0) { //aerospike.status.AEROSPIKE_OK
        reject(err);
      } else {
        resolve(true);
      }
    });
  }.bind(this));
};

module.exports = TeabotAerospikePlugin;
