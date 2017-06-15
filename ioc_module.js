'use strict';

const IamService = require('./dist/commonjs/index').IamService;

const tokenAdapterDiscoveryTag = require('@process-engine-js/core_contracts').TokenAdapterDiscoveryTag;
const entityDiscoveryTag = require('@process-engine-js/core_contracts').EntityDiscoveryTag;


function registerInContainer (container, useCustomIdentityService, useCustomUserEntity) {

  container.register('IamService', IamService)
    .singleton();
}

module.exports.registerInContainer = registerInContainer;
