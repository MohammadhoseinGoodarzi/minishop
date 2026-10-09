## 1. binding

پیش‌بینی من:

- CJS: before = 0 / after = 0
- ESM: before = 0 / after = 1
- خط count = 10 چه می‌کنه؟

خروجی واقعی:

```
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
```

چرا؟
commonjs: چون متغییر توی ابجکت هستش مقدار فعلی متغییر هستش و نه خود متغییر بخاطر همین توی بعد هم 0 نشون میده و ما مقدار جدید رو نمیبینیم

esm: متغییر ایمپورت شده فقط خواندنی است خود تابع میتونه مقدارشو عوض کنه اما ما مستقیم نمیتونیم متغییر رو عوض کنیم چون مثل متغییر ثابت باهاش برخورد میشه و فقط خواندنی است

## 2. cache

پیش‌بینی من:

- 'logger.mjs evaluated' چند بار چاپ می‌شه؟
  یک بار چون کش شده
- id در a و b یکیه یا فرق داره؟
  یکیه چون کش شده
- ترتیب چاپ ۴ خط چیه؟
  فک کنم اول که ب فایل مین میریم قبل کنسول لاگ ایمپورت اول که a هستش ران میشه توی اون چون لاگر ایمپورت شده اول اون ران میشه و توی خود لاگر ترتیب با کنسول لاگ بعد ایدی رندوم و این 2 کش میشن بعد برمیگردیم به فایل a لاگ ایدی اونجا نمایش داده میشه بعد برمیگردیم به فایل مین حالا ایمپورت دوم که b هستش همون راه a رو میریم ولی چون کش شده دیگه لاگر اجرا نمیشه بخاطر همون ایدی برابر چاپ میشه در اخر دوباره برمیگیردیم به فایل مین کنسول لاگ چاپ میشه چون اولویت اجرا با ایمپورت هستش

```
npm run lab:cache

> lab:cache
> node labs/01-modules/2-cache/main.mjs

logger.mjs evaluated
a sees id: 0.33060552133827126
b sees id: 0.33060552133827126
main.mjs start
```
