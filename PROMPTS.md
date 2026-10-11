## 1. Review of labs/01-modules

### Prompt

Context:
I'm preparing for a senior frontend interview. labs/01-modules contains my
experiments on CommonJS vs ES Modules. labs/01-modules/NOTES.md has my
predictions, real outputs, and explanations (in Persian).
Some scripts fail on purpose — the errors are part of the experiments.

Task:
Review only. Run every "lab:\*" script in package.json and check whether
my explanations in NOTES.md are technically correct.

Constraints:

- Do not create, edit, or delete any file.
- For each problem, quote the exact line from NOTES.md.
- If you're not sure about a Node.js behavior, say so instead of guessing.

Output:
A table with columns: section | correct? | problem | correct explanation
Write in Persian, keep technical terms in English.

### خلاصه نتیجه

1. binding — ESM : count در main.mjs کپی نیست. یه live binding به همون خونهٔ count در module environment ِ counter.mjs است، برای همین بعد از increment() مقدار 1 خونده میشه.

2. cache — ترتیب چاپ :موضوع «اولویت» نیست. import ها static و hoisted هستن و ESM سه فاز داره: construction (parse کل گراف)، linking (ساختن binding ها) و evaluation (post-order DFS: logger ← a ← b ← main). بدنهٔ main.mjs شروع نمیشه که وسطش import اجرا بشه: تا همهٔ dependency ها evaluate نشن، هیچ خطی از main اجرا نمیشه.

5 تا هشدار دیگه پیدا کرده که دلایل ناقص ما در فایل نوتز هستش

### چی رو قبول یا رد کردم و چرا

- همه رو قبول کردم چون داشت پروژه رو میخوند اسکریپت هارو اجرا و تحلیل میکرد کار دیگه انجام نداد

### دفعه بعد چی رو توی پرامپت عوض می‌کنم

- خوب بود بنظرم نیازی به تغییر نداره
