import { httpPort } from './config';
import lotion from 'lotion';

const app = lotion({
  initialState: {
    count: 0,
  },
});

app.use(function(state, tx) {
  if (state.count === tx.nonce) {
    state.count++;
  }
});

app.listen(httpPort);
console.log('port', httpPort);
