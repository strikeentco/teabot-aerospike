teabot-aerospike  [![License](https://img.shields.io/github/license/strikeentco/teabot-aerospike.svg)](https://github.com/strikeentco/teabot-aerospike/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/teabot-aerospike.svg)](https://www.npmjs.com/package/teabot-aerospike) [![npm](https://img.shields.io/badge/teabot-plugin-blue.svg)](https://github.com/strikeentco/teabot/tree/master/docs/PLUGINS.md)
==========
[![Build Status](https://travis-ci.org/strikeentco/teabot-aerospike.svg)](https://travis-ci.org/strikeentco/teabot-aerospike) [![node](https://img.shields.io/node/v/teabot-aerospike.svg)](https://www.npmjs.com/package/teabot-aerospike) [![Test Coverage](https://codeclimate.com/github/strikeentco/teabot-aerospike/badges/coverage.svg)](https://codeclimate.com/github/strikeentco/teabot-aerospike/coverage) [![bitHound Score](https://www.bithound.io/github/strikeentco/teabot-aerospike/badges/score.svg)](https://www.bithound.io/github/strikeentco/teabot-aerospike)

`teabot-aerospike` an Aerospike db [plugin](https://github.com/strikeentco/teabot/tree/master/docs/PLUGINS.md) for [TeaBot](https://github.com/strikeentco/teabot).

By default, all data is stored in memory, but for synchronization between servers or nodes, you can use this plugin.

# Usage

```sh
$ npm install teabot-aerospike --save
```

You also should install [TeaBot](https://github.com/strikeentco/teabot) and Aerospike [client](https://github.com/aerospike/aerospike-client-nodejs).

```js
var TeaBot = require('teabot')('TELEGRAM_BOT_TOKEN', 'TELEGRAM_BOT_NAME');
var aerospike = require('aerospike');
var client = aerospike.client({
  hosts: [{
    addr: '127.0.0.1',
    port: 4000,
  }]
}).connect(function(response) {
  if (response.code == 0) {
    console.log('Connection to Aerospike cluster succeeded!');
  }
});

TeaBot.use('db', require('teabot-aerospike')(client));

TeaBot.defineCommand(function(dialog, message) {
  dialog.setUserData('some data', 'data'); // data will be stored at Aerospike db
  dialog.sendMessage('Echo: ' + message.text);
});

TeaBot.startPolling();
```

# License

The MIT License (MIT)<br/>
Copyright (c) 2016 Alexey Bystrov
