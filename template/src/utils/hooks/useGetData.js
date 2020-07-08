import { useState } from 'react'
import { notification } from 'antd'

import { translate } from 'utils/i18n';
import axios, { createCancelRequest } from 'utils/axios'

export default (_getConfigs, _initialState = {}) => {
  const [state, setState] = useState({
    ..._initialState,
    loading: false
  })

  const _cancelRequest = createCancelRequest()

  const _reloadData = async (_params = {}) => {
    const _configApi = _getConfigs()
    setState({
      ...state,
      loading: true
    })

    const response = await axios.get(_configApi.pathname, {
      ..._configApi.configs,
      params: {
        ..._configApi.configs && _configApi.configs.params,
        ..._params
      },
      cancelToken: _cancelRequest.token
    });

    if (response.status === 200) {
      return setState({
        ...response.data,
        loading: false
      })
    }

    notification.error({
      message: translate(response.data.message)
    })
    return setState({
      ...state,
      loading: false
    })
  }

  const _effectReloadData = (_params) => () => {
    _reloadData(_params);
    return _cancelRequest.cancel
  }

  return [
    state,
    _reloadData,
    _effectReloadData
  ]
}