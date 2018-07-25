import { httpPort } from './config';
import lotion from 'lotion';

const initialState = {
  count: 0,
  blockCount: 0,
  foo: {
    bar: {
      beep: 'boop',
    },
  },
};

const app = lotion({
  initialState,
  logTendermint: false,
  tendermintPort: 46657,
  p2pPort: 46661,
  devMode: true,
});

app.use(function(state, tx, chainInfo) {
  console.warn('state, tx, chainInfo', state, tx, chainInfo);
  // validate tx, mutate state if it's valid.
  state.count++
});

app.listen(httpPort).then(({ GCI }) => {
  console.log('GCI', GCI);
  console.log('port', httpPort);
});
