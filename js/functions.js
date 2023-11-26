// eslint-disable-next-line no-unused-vars
const checkStringLength = (string, maxLength) => string.length <= maxLength;

// eslint-disable-next-line no-unused-vars
const isPolindrome = (string) => {
  string =  string.replaceAll(' ', '');
  string = string.toLowerCase();
  // eslint-disable-next-line no-alert
  alert(string);
  for (let i = 0; i < (string.length - 1) / 2; i++) {
    if (string[i] !== string[string.length - 1 -i]) {return false;}
    return true;
  }
};
