## 1. binding

پیش‌بینی من:

- CJS: before = 0 / after = 0
- ESM: before = 0 / after = 1
- خط count = 10 چه می‌کنه؟

خروجی واقعی:
TypeError: Assignment to constant variable.
at file:///C:/Users/MHG/Desktop/private%20project/minishop/labs/01-modules/1-binding/main.mjs:6:7
at ModuleJob.run (node:internal/modules/esm/module_job:439:25)
at async node:internal/modules/esm/loader:646:26
at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

چرا؟
چون وقتی توی esmodules یک متغیری رو ایمپورت میکنیم تبدیل به یک کانستنت میشه و نمیتونیم تغییرش بدیم
