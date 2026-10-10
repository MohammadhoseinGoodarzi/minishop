// a.cjs
const b = require("./b.cjs");

const a = "A";
module.exports = { a };

console.log("a.cjs sees b =", b);
