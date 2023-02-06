export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const regexPassword = {
  atLeast6character: /.{6,}/g,
  atLeastOneNumeric: /[0-9]/g,
  atLeastOneLowercase: /[a-z]/g,
  atLeastOneUppercase: /[A-Z]/g,
  atLeastOneSpecialChar: /[!@#$%^&*()-+]/g,
};
