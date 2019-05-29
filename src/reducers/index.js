import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import Prss from './Prss';
import Cnvs from './Cnvs';
import Errs from './Errs';
import CnvDetail from './CnvDetail';

const rootReducer = combineReducers({ Prss, Cnvs, CnvDetail, Errs});

export default rootReducer;
