export const decodeJWT = (_token) => {
  if (typeof _token !== "string") {
    return false;
  }
  const _splitToken = _token.split(".");
  if (_splitToken.length !== 3) {
    return false
  }
  try {
    return JSON.parse(atob(_splitToken[1]))
  } catch (error) {
    return null
  }
}

export const composeAsync = (..._fns) => _fns.reduce((_fnCurrent, _fnNext) => async (_params) => {
  const _executed = _fnNext(_params);
  if (_executed instanceof Promise) {
    const _result = await _executed;
    return _fnCurrent(_result)
  }
  return _fnCurrent(_executed)
})