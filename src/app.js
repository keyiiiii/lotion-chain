const httpPort = require('./config').httpPort;
const lotion = require('lotion');
const SHA256 = require('crypto-js/sha256');

const initialState = {
  balances: {
    '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 1000000,
  },
};

const app = lotion({
  initialState,
  devMode: true,
});

/**
 * POST txs
 */
app.use((state, body) => {
  const { from, to, seed, amount } = body;
  if (!(from && to && seed && amount)) {
    return;
  }
  if (from === to) {
    return;
  }

  if (SHA256(seed).toString() !== from) {
    return;
  }

  if (state.balances[from] > amount) {
    state.balances[to] = (state.balances[to] || 0) + amount;
    state.balances[from] = state.balances[from] - amount;
  }
  console.log('state', state);
});

app.listen(httpPort).then(({ GCI }) => {
  console.log('GCI', GCI);
  console.log('port', httpPort);
});
