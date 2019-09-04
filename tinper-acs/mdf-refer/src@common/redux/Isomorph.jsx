import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router, browserHistory } from 'react-router'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'

export default class Isomorph extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  // TODO：这两个方法和 Isomorph 是并行的，不用放在组件内定义。
  // 可以单独 export 出去。
  static createStore = (entryPoint, initialState) => configureStore(entryPoint, initialState)

  static createHistory = (store, path) => {
    if (process.env.__CLIENT__)
      return syncHistoryWithStore(browserHistory, store)
    return createMemoryHistory(path)
  }

  render() {
    const { store, history, routes } = this.props
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}
