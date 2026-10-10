// b.cjs
const a = require("./a.cjs");

const b = "B";
module.exports = { b };

console.log("b.cjs sees a =", a);
