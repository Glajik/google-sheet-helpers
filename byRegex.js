function byRegex(regex, str) {
  const result = regex.exec(str);
  if (result && result.length > 1) {
    return result[1];
  }
  return str;
}

export default byRegex;
