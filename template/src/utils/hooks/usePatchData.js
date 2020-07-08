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

  const _postData = async (_dataAppend = {}) => {
    const _configApi = _getConfigs()
    setState({
      ...state,
      loading: true
    })

    const response = await axios.patch(_configApi.pathname, {
      ...state,
      ..._configApi.data,
      ..._dataAppend
    }, {
      ..._configApi.configs,
      cancelToken: _cancelRequest.token,
    });

    if (response.status === 200) {
      notification.success({
        message: translate("Success")
      })
      return setState({
        ...state,
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

  const _setData = (_dataAppend) => {
    if (!_dataAppend) {
      return setState({
        ..._initialState,
        loading: false
      })
    }
    if (typeof _dataAppend === 'object') {
      return setState({
        ...state,
        ..._dataAppend,
        loading: false
      })
    }
  }

  return [
    state,
    _postData,
    _setData,
    _cancelRequest.cancel
  ]
}