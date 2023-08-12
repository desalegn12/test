const one = require("./one.json");
const two = require("./two.json");

//before solution
function beforeTest(config) {
  let initialValues = config.fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: field.defaultValue || "" }),
    {}
  );
  return initialValues;
}
console.log("before fix", beforeTest(one));
console.log("before test error", beforeTest(two));
console.log("================================");
//after fix
function test(config, initial = {}) {
  let initialValues;
  initialValues = config.fields.reduce((acc, field) => {
    if (Array.isArray(field)) {
      config.fields = field;
      return test(config, acc);
    }
    return { ...acc, [field.name]: field.defaultValue || "" };
  }, initial);
  return initialValues;
}
console.log("this is for the customer", test(one));
console.log("this is for the dashboard", test(two));
