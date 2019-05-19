import Blockchain from './Blockchain';

// TODO alex implement - not neccessary

export default {
  listenForAnyEvents: function(cb) {

    setInterval(() => {
      cb()
    }, 1000)
  },

  listenForTransfers: function(cb) {

    let contract = Blockchain.contract();
    console.log(`Contract: ${contract}`);

    let loadedFilter = contract.filters.AssetLoaded();
    let unLoadedFilter = contract.filters.AssetUnLoaded();

    contract.on(loadedFilter, (address, hash, value, timestamp) => {
      cb({
        type: 'Meal awarded',
        agent: address,
        value: Number(web3.fromWei(value, 'ether')).toPrecision(2),
        timestamp: Number(timestamp)
      })
    })

    contract.on(unLoadedFilter, (address, hash, value, timestamp) => {
      cb({
        type: 'Meal claimed',
        agent: address,
        value: Number(web3.fromWei(value, 'ether')).toPrecision(2),
        timestamp: Number(timestamp)
      })
  })
  }
}
