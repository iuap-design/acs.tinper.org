
import RefWithInput from 'ref-core/lib/refs/RefCoreWithInput';
import { createRefModal, createRefInput } from 'ref-core/lib/utils/createApi';
import RefCoreGlobal from 'ref-core/lib/refs/RefCoreGlobal';
import React from 'react';
import 'ref-core/css/refcore.css';
//import './index.less'; //webpackbuild放开
import RefTreeTransferBaseUI from './RefTreeTransferBaseUI';
function RefTreeTransfer(props) {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <RefCoreGlobal {...props}>
      <RefTreeTransferBaseUI />
    </RefCoreGlobal>
  );
}


function RefTreeTransferWithInput(props) {
  return (
    <RefWithInput {...props} multiple={true}>
      <RefTreeTransfer />
    </RefWithInput>
  );
}

function createRefTreeTransfer(selector, props, callback) {
  return createRefInput(selector, <RefTreeTransferWithInput />, props, (param) => {
    if (typeof callback === 'function') {
      callback(param);
    }
  });
}
function createRefTreeTransferModal(props, callback) {
  return createRefModal({
    component: <RefTreeTransfer />,
    ...props,
  }, (param) => {
    if (typeof callback === 'function') {
      callback(param);
    }
  });
}
export default RefTreeTransferBaseUI;
export {
  RefTreeTransferWithInput,
};
