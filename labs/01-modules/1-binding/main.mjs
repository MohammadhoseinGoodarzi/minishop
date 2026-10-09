import { count, increment } from "./counter.mjs";

console.log("before:", count);
increment();
console.log("after:", count);
count = 10;
