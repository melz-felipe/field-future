import prodKeys from './prod'
import devKeys from './dev'
let keys;

if (process.env.NODE_ENV === 'production') {
  keys = prodKeys
} else {
  keys = devKeys
}

export default keys;
