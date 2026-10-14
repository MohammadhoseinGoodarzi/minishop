function reactive(target, onChange) {
  return new Proxy(target, {
    set(obj, key, value, receiver) {
      const result = Reflect.set(obj, key, value, receiver);
      onChange(key, value);
      return result;
    },
  });
}

const state = reactive({ count: 0 }, (key, value) => {
  console.log(`${String(key)} changed to ${value}`);
});

state.count++;
state.count = 10;
console.log("final:", state.count);
