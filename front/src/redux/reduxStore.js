import {reducer as formReducer} from 'redux-form';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import heroReducer from './reducer/heroReducer';

let reducers = combineReducers({
    hero: heroReducer,
    form: formReducer
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));