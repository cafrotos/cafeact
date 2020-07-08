import locales from 'consts/locales';

const configs = {
  language: "en"
}

export const getLanguage = () => configs.language

export const setLanguage = (_language) => {
  if (locales[_language]) {
    configs.language = _language
  }
}

export const translate = (text, ...values) => {
  const _locales = locales[configs.language];
  let indexValue = 0;

  if (!text) {
    return text
  }

  if (_locales[text] && _locales[text].trim() !== "") {
    return _locales[text].replace(/\{value\}/gi, () => values[indexValue++] || "")
  }
  return text.replace(/\{value\}/gi, () => values[indexValue++] || "")
}