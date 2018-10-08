import { connect } from './core/connect';
console.log('Root file');
const easyDb = {
  connect: connect
};
console.log('Logging export');
console.log(easyDb);
export {
  connect
};
