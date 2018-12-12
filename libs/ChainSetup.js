const sampleOriginConfig = {
  deployer: {
    address: '0x...',
    gasPrice: '0x12A05F200'
  },
  organization: {
    address: null,
    owner: '0x...',
    admin: '0x...',
    worker: {
      address: '0x...',
      expirationHeight: '1234567890'
    }
  }
};

const Web3 = require('web3');
const AbiBinProvider = require('./AbiBinProvider');
const OrganizationHelper = require('./helpers/OrganizationHelper');
const SafeCoreHelper = require('./helpers/SafeCoreHelper');

const defaultAuxiliaryConfig = {
  organisationOwner: null
};

class ChainSetup {
  constructor(originWeb3, originConfig, auxiliaryWeb3, auxiliaryConfig) {
    const oThis = this;
    if (typeof originWeb3 === 'string') {
      originWeb3 = new Web3(originWeb3);
    }

    if (typeof auxiliaryWeb3 === 'string') {
      auxiliaryWeb3 = new Web3(auxiliaryWeb3);
    }

    originConfig = originConfig || {};

    oThis.originConfig = Object.assign({}, originConfig);
    oThis.originWeb3 = originWeb3;
    oThis.auxiliaryWeb3 = auxiliaryWeb3;
    oThis.abiBinProvider = new AbiBinProvider();

    oThis.origin = {
      organization: new OrganizationHelper(originWeb3),
      safeCore: new SafeCoreHelper(originWeb3)
    };

    oThis.auxiliary = {
      organization: new OrganizationHelper(auxiliaryWeb3),
      safeCore: new SafeCoreHelper(auxiliaryWeb3)
    };
  }

  static get OrganizationHelper() {
    return OrganizationHelper;
  }

  static get SafeCoreHelper() {
    return SafeCoreHelper;
  }
}

module.exports = ChainSetup;