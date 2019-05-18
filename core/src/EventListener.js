import Blockchain from './Blockchain';

// TODO alex implement - not neccessary

export default {
  listenForAnyEvents: function(cb) {

    setInterval(() => {
      cb()
    }, 1000)
  },

  listenForTransfers: function(cb) {
    //TODO alex uncomment it

    let contract = Blockchain.contract();
    console.log(`Contract: ${contract}`);

    let loadedFilter = contract.filters.AssetLoaded();
    let unLoadedFilter = contract.filters.AssetUnLoaded();

    contract.on(loadedFilter, (address, hash, value) => {
      cb({
        type: 'Card loaded',
        agent: address,
        value: Number(web3.fromWei(value, 'ether')).toPrecision(2)
      })
    })

    contract.on(unLoadedFilter, (address, hash, value) => {
      cb({
        type: 'Card unloaded',
        agent: address,
        value: Number(web3.fromWei(value, 'ether')).toPrecision(2)
      })
  })
  }
}
