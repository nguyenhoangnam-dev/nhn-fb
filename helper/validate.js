var validator = require("validator");
var validator2 = require("password-validator");

var validatePassword = function (password, errors, first_name, last_name) {
  if (!password) {
    errors.push({ msg: "Please fill password." });
    return { errors, password, password1: "" };
  }

  // Regex to check contain first_name, last_name
  var regexFirstName = new RegExp(first_name, "i");
  var regexLastName = new RegExp(last_name, "i");

  var schema = new validator2();
  schema
    .is()
    .min(8)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .is()
    .not(regexFirstName)
    .is()
    .not(regexLastName);

  if (!schema.validate(password)) {
    errors.push({ msg: "Please follow password policy" });
    return { errors, password: "" };
  }

  return { errors, password };
};

var validateEmail = function (email, errors) {
  if (!email) {
    errors.push({ msg: "Please fill email." });
    return { errors, email };
  }
  if (!validator.isEmail(email)) {
    errors.push({ msg: "Invalid email." });
    return { errors, email: "" };
  }

  return { errors, email };
};

var validateFirstName = function (first_name, errors) {
  if (!first_name) {
    errors.push({ msg: "Please fill first name." });
    return { errors, first_name };
  }

  var schema = new validator2();
  schema.has().uppercase().has().lowercase().not().digits();

  if (!schema.validate(first_name)) {
    errors.push({ msg: "Invalid first name" });
    return { errors, first_name: "" };
  }

  return { errors, first_name };
};

var validateLastName = function (last_name, errors) {
  if (!last_name) {
    errors.push({ msg: "Please fill last name." });
    return { errors, last_name };
  }

  var schema = new validator2();
  schema.has().uppercase().has().lowercase().not().digits();

  if (!schema.validate(last_name)) {
    errors.push({ msg: "Invalid last name" });
    return { errors, last_name: "" };
  }

  return { errors, last_name };
};

var validate = function (
  first_name,
  last_name,
  email,
  password,
  day,
  month,
  year,
  gender
) {
  var errors = [];
  var obj;

  obj = validateFirstName(first_name, errors);
  errors = obj.errors;
  first_name = obj.first_name;

  obj = validateLastName(last_name, errors);
  errors = obj.errors;
  last_name = obj.last_name;

  obj = validateEmail(email, errors);
  errors = obj.errors;
  email = obj.email;

  obj = validatePassword(password, errors, first_name, last_name);
  errors = obj.errors;
  password = obj.password;

  let birthday = new Date(year, month, day);

  let sex;
  if (gender == "1") {
    sex = "female";
  } else if (gender == "2") {
    sex = "male";
  } else {
    sex = "custom";
  }

  return { errors, first_name, last_name, email, password, birthday, sex };
};

module.exports = {
  password: validatePassword,
  email: validateEmail,
  first_name: validateFirstName,
  last_name: validateLastName,
  validate: validate,
};
