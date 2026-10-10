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

## 3. circular

برنامه خطا میده یا اجرا می‌شه؟
cjs:اجرا میشه اما هشدار میده چون مقدار فعلی a هیچی نیست پس یک ابجکت خالیه
esm:اجرا نمیشه و خطا میده و میگه نمیشه به a دسترسی داشت چون هنوز تعریف نشده

b مقدار a رو چی می‌بینه؟
cjs:یک ابجکت خالی
esm:نمیبینه چون قبل تعریف شدن کال شده و هنوز نیستش

```
npm run lab:circular:esm

> lab:circular:esm
> node labs/01-modules/3-circular/esm/main.mjs

file:///C:/Users/MHG/Desktop/private%20project/minishop/labs/01-modules/3-circular/esm/b.mjs:5
console.log("b.mjs sees a =", a);
                              ^

ReferenceError: Cannot access 'a' before initialization
    at file:///C:/Users/MHG/Desktop/private%20project/minishop/labs/01-modules/3-circular/esm/b.mjs:5:31
    at ModuleJob.run (node:internal/modules/esm/module_job:439:25)
    at async node:internal/modules/esm/loader:646:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v26.3.0

npm run lab:circular:cjs

> lab:circular:cjs
> node labs/01-modules/3-circular/cjs/main.cjs

b.cjs sees a = {}
a.cjs sees b = { b: 'B' }
(node:8264) Warning: Accessing non-existent property 'Symbol(nodejs.util.inspect.custom)' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:8264) Warning: Accessing non-existent property 'constructor' of module exports inside circular dependency
(node:8264) Warning: Accessing non-existent property 'Symbol(Symbol.toStringTag)' of module exports inside circular dependency

npm run lab:circular:fixed

> lab:circular:fixed
> node labs/01-modules/3-circular/fixed/main.mjs

a.mjs sees b = B
b.mjs sees a = A
```

چرا؟
از فایل مین ب فایل a میرویم اول در بالا b ایمپورت شده پس میریم سراغ اون ولی باز میبینیم که a ایمپورت شده اما چون قبلا توش بودیم و کش شده دیگه ادامه میدیم همون b رو تو خط بعدی b تعریف میشه و بعدش کنسول رو داریم که میاد a رو از کش بخونه اما میبینه که a هنوز تعریف نشده پس اررور میخوره و همینجا متوقف میشه
در cjs وقتی ب کنسول میرسه اینبار a رو یک ابجکت خالی داره تو کش پس همونو چاپ میکنه و ادامه میده و به a برمیگرده و بعد خود a رو تعریف میکنه اما مقدارش دیگه مهم نیست چون دیگه از لاگ اون گذشتیم بعد به لاگ بعدی میرسه و b رو چاپ میکنه
بنظر رفتار cjs بدتره چون درمورد a گمراه میشیم و مقدار درست و واقعیشو نداریم

## 4. type field

"type": "commonjs": باعث میشه همه فایل های js داخل پوشه باهاشون مثل cjs برخورد بشه
"type": "module": معادل همون esm هستش
{}: فک کنم حالت دیفالت رو درنظر بگیره

```
npm run lab:type

> lab:type
> node labs/01-modules/4-type-field/index.js

(node:18800) Warning: Failed to load the ES module: C:\Users\MHG\Desktop\private project\minishop\labs\01-modules\4-type-field\helper.js. Make sure to set "type": "module" in the nearest package.json file or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
C:\Users\MHG\Desktop\private project\minishop\labs\01-modules\4-type-field\helper.js:2
export function greet(name) {
^^^^^^

SyntaxError: Unexpected token 'export'
    at wrapSafe (node:internal/modules/cjs/loader:1806:18)
    at Module._compile (node:internal/modules/cjs/loader:1847:20)
    at Object..js (node:internal/modules/cjs/loader:2013:10)
    at Module.load (node:internal/modules/cjs/loader:1596:32)
    at Module._load (node:internal/modules/cjs/loader:1398:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.require (node:internal/modules/cjs/loader:1619:12)
    at require (node:internal/modules/helpers:191:16)
    at Object.<anonymous> (C:\Users\MHG\Desktop\private project\minishop\labs\01-modules\4-type-field\index.js:1:15)
    at Module._compile (node:internal/modules/cjs/loader:1873:14)

Node.js v26.3.0

npm run lab:type

> lab:type
> node labs/01-modules/4-type-field/index.js

node:internal/modules/run_main:76
  const type = getNearestParentPackageJSONType(mainPath);
               ^

Error: Invalid package config \\?\C:\Users\MHG\Desktop\private project\minishop\labs\01-modules\4-type-field\package.json.
    at shouldUseESMLoader (node:internal/modules/run_main:76:16)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:147:20)
    at node:internal/main/run_main_module:33:47 {
  code: 'ERR_INVALID_PACKAGE_CONFIG'
}

Node.js v26.3.0

npm run lab:type

> lab:type
> node labs/01-modules/4-type-field/index.js

Hello MiniShop
```
