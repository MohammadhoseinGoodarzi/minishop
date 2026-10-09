## 1. binding

پیش‌بینی من:

- CJS: before = 0 / after = 0
- ESM: before = 0 / after = 1
- خط count = 10 چه می‌کنه؟

خروجی واقعی:
'
npm run lab:binding:cjs

> lab:binding:cjs
> node labs/01-modules/1-binding/main.cjs

before: 0
after: 0

npm run lab:binding:esm

> lab:binding:esm
> node labs/01-modules/1-binding/main.mjs

before: 0
after: 1
file:///C:/Users/MHG/Desktop/private%20project/minishop/labs/01-modules/1-binding/main.mjs:6
count = 10;
^

TypeError: Assignment to constant variable.
at file:///C:/Users/MHG/Desktop/private%20project/minishop/labs/01-modules/1-binding/main.mjs:6:7
at ModuleJob.run (node:internal/modules/esm/module_job:439:25)
at async node:internal/modules/esm/loader:646:26
at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v26.3.0
'

چرا؟
commonjs: چون متغییر توی ابجکت هستش خود متغییر توشه و نه مقدار فعلیش بخاطر همین توی بعد هم 0 نشون میده

esm: متغییر ایمپورت شده فقط خواندنی است خود تابع میتونه مقدارشو عوض کنه اما ما مستقیم نمیتونیم متغییر رو عوض کنیم چون مثل متغییر ثابت باهاش برخورد میشه و فقط خواندنی است
