/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura API
 * keys are available for free at: infura.io/register
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('truffle-hdwallet-provider');

let mnemonic, infuraProject;

try {
  const secrets = require('./secrets.json');
  mnemonic = secrets.mnemonic;
  infuraProject = secrets.infuraProject;
} catch (err) {
  console.log('You should have secrets.json file with mnemonic key and infura'
            + 'project id if you want to be able to deploy contracts');
}


module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          `https://kovan.infura.io/v3/${infuraProject}`);
      },
      network_id: 42,
      gas: 4700000,
      from: '0x55DbDAB581c4D5318901e9e35608444Cc2A3142d',
      skipDryRun: true,
    },
    skale: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          'http://157.230.171.237:8068/'
        );
      },
      network_id: '*',
      gas: 0,
      from: '0x55DbDAB581c4D5318901e9e35608444Cc2A3142d',
      skipDryRun: true,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.2",
    }
  },
}
