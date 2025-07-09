document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // === البيانات الأساسية (تم إصلاح أيقونات الميزان والدلو) ===
    // =================================================================
    const zodiacData = [
        // ... (الحمل، الثور، الجوزاء، السرطانال مصفوفة `zodiacData` الحالية في ملف `script.js` بالنسخة المُصححة التالية، حيث قمت بإعادة إنشاء الأيقونات التالفة.

**الخطوات:**

1.  افتح ملف `script.js` الخاص بك.
2.  ابحث عن السطر الذي يبدأ بـ `const zodiacData = [`
3.  **احذف مصفوفة `zodiacData` الحالية بالكامل** (من `[` في البداية إلى `];` في النهاية).
4.  **الصق الكود التالي** بدلاً منها.

**إليك الكود المُصحح لـ `zodiacData`:**

```javascript
    const zodiacData = [
        // الأبراج الأخرى تبقى كما هي
        { name: "الحمل", startDay: 21, startMonth: 3, endDay: 19, endMonth: 4, description: "شخصية قوية، مبادرة، ومتحمسة. تحب المغامرة والتحديات ولا تخاف من البدء من جديد.", advice: "حاول أن تتحلى بالصبر وتستمع لآراء الآخرين قبل اتخاذ قرارات متسرعة.", compatibility: "الأسد، القوس، والجوزاء.", luckyColor: "الأحمر", luckyNumber: 9, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNOSAxOFY1YTcgNyAwIDAgMSAxNCAwdiEzTTkgNWE3IDcgMCAwIDAtMTQgMHYxMyIvPjwvc3ZnPg==",، الأسد، العذراء - بدون تغيير)
        { name: "الحمل", startDay: 21, startMonth: 3, endDay: 19, endMonth: 4, description: "شخصية قوية، مبادرة، ومتحمسة. تحب المغامرة والتحديات ولا تخاف من البدء من جديد.", advice: "حاول أن تتحلى بالصبر وتستمع لآراء الآخرين قبل اتخاذ قرارات متسرعة.", compatibility: "الأسد، القوس، والجوزاء.", luckyColor: "الأحمر", luckyNumber: 9, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNOSAxOFY1YTcgNyAwIDAgMSAxNCAwdiEzTTkgNWE3IDcgMCAwIDAtMTQgMHYxMyIvPjwvc3ZnPg==", daily: "طاقتك في أوجها اليوم. استغلها لإنجاز المهام الصعبة.", strengths: "الشجاعة، الثقة بالنفس، الحماس.", weaknesses: "التهور، نفاد الصبر، العدوانية أحيانًا." },
        { name: "الثور", startDay: 20, startMonth: 4, endDay: 20, endMonth: 5, description: "شخصية عملية، موثوقة، ومحبة للاستقرار والجمال. تقدر الراحة والأشياء الجيدة في الحياة.", advice: "لا تخف من التغيير أحيانًا. الخروج من منطقة الراحة قد يفتح لك أبوابًا جديدة.", compatibility: "العذراء، الجدي، والسرطان.", luckyColor: "الأخضر", luckyNumber: 6, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5 daily: "طاقتك في أوجها اليوم. استغلها لإنجاز المهام الصعبة.", strengths: "الشجاعة، الثقة بالنفس، الحماس.", weaknesses: "التهور، نفاد الصبر، العدوانية أحيانًا." },
        { name: "الثور", startDay: 20, startMonth: 4, endDay: 20, endMonth: 5, description: "شخصية عملية، موثوقة، ومحبة للاستقرار والجمال. تقدر الراحة والأشياء الجيدة فيkIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMCAwSDI0VjI0SDBaIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNOS41IDNhNi41IDYuNSAwIDAgMSAwIDEzIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIvPjwvc3ZnPg==", daily: "يوم مثالي للاسترخاء والاهتمام بنفسك. دلل حواسك.", strengths: "الاعتمادية، الصبر، الحس الفني.", weaknesses: "العناد، حب التملك، مقاومة التغيير." },
        { name: "الجوزاء", startDay: 21, startMonth: 5 الحياة.", advice: "لا تخف من التغيير أحيانًا. الخروج من منطقة الراحة قد يفتح لك أبوابًا جديدة.", compatibility: "العذراء، الجدي، والسرطان.", luckyColor: "الأخضر", luckyNumber: 6, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMCAwSDI0VjI0SDBaIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNOS41IDNhNi41IDYuNSAwIDAgMSAwIDE, endDay: 20, endMonth: 6, description: "شخصية اجتماعية، فضولية، وسريعة البديهة. تستمتع بالتواصل مع الناس وتعلم أشياء جديدة.", advice: "حاول التركيز على مهمة واحدة في كل مرة لتجنب تشتت طاقتك.", compatibility: "الميزان، الدلو، والحمل.", luckyColor: "الأصفر", luckyNumber: 5, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRzIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIvPjwvc3ZnPg==", daily: "يوم مثالي للاسترخاء والاهتمام بنفسك. دلل حواسك.", strengths: "الاعتمادية، الصبر، الحس الفني.", weaknesses: "العناد، حب التملك، مقاومة التغيير." },
        { name: "الجوزاء", startDay: 2oPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD1, startMonth: 5, endDay: 20, endMonth: 6, description: "شخصية اجتماعية، فضولية، وسريعة البديهة. تستمتع بالتواصل مع الناس وتعلم أش0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48ياء جديدة.", advice: "حاول التركيز على مهمة واحدة في كل مرة لتجنب تشتت طاقتcGF0aCBkPSJNNiAzdjE4TTIgMjFoMjBNMTggM1ك.", compatibility: "الميزان، الدلو، والحمل.", luckyColor: "الأصفر", luckyNumber: 5, image: "data:image/svg+xml;base64,PHN2ZyB4bYyMSIvPjwvc3ZnPg==", daily: "تواصلك اليوم مثمر جدًا. فرصة جيدةWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9 للتعبير عن أفكارك.", strengths: "الفضول، القدرة على التكيف، الذكاء.", weaknesseszdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgd: "التردد، العصبية، السطحية أحيانًا." },
        { name: "السرطانmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB", startDay: 21, startMonth: 6, endDay: 22, endMonth:zdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13a 7, description: "شخصية عاطفية، حدسية، ومخلصة. تهتمWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJ كثيرًا بالأسرة والأصدقاء وتشعر بعمق.", advice: "لا تدع حساسيتك تسيvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5طر عليك. تعلم كيفية حماية مشاعرك دون الانغلاق على نفسك.", compatibility: "العقرب، الحوت،kIj48cGF0aCBkPSJNNiAzdjE4TTIgMjFoMjBN والثور.", luckyColor: "الفضي", luckyNumber: 2, image: "data:image/svgMTggM1YyMSIvPjwvc3ZnPg==", daily: "تواصلك اليوم مثمر جدًا+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIy. فرصة جيدة للتعبير عن أفكارك.", strengths: "الفضول، القدرة على التكيف، الذNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0كاء.", weaknesses: "التردد، العصبية، السطحية أحيانًا." },
        { name:IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3 "السرطان", startDay: 21, startMonth: 6, endDay: 22, endMonth: 7, description: "شخصية عاطفية، حدسية، ومخلMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Rybصة. تهتم كثيرًا بالأسرة والأصدقاء وتشعر بعمق.", advice: "لا تدع حساس2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4يتك تسيطر عليك. تعلم كيفية حماية مشاعرك دون الانغلاق على نفسك.", compatibility: "العقرب، الحوت، والثور.", luckyColor: "الفضي", luckyNumber: 2, image: "dataPSI2IiBjeT0iMTIiIHI9IjMiLz48Y2lyY2:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0xlIGN4PSIxOCIgY3k9IjEyIiByPSIzIi8+PHBhdGggcDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJvaZD0iTTMgMTJBMTAgMTAgMCAwIDAgMTIgMjIgMTAgM2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4TAgMCAwIDAgMjEgMTIgNiA2IDAgMCAxIDE1IDIuNSA2IDYgMCAwIDEgOSAyLjUiLz48L3N2Zz4=", daily: "قد تشعر بالحنين للماضي. اقضِ وقتًا مع العائلة.", strengths: "الإخلاص، العاطفة، الحدس القوي.", weaknesses: "الحساسية المفرطة، التقلب، التشاؤم." },
        { name: "الأسد", startDay: 23, startMonth: 7, endDay: 228Y2lyY2xlIGN4PSI2IiBjeT0iMTIiIHI9IjMiLz48Y2lyY2xlIGN4PSIxOCIgY3k9IjEyIiBy, endMonth: 8, description: "شخصية واثقة، كريمة، وقيادية. تحب أن تكون في دائرة الضوء وتلهم الآخرين.", advice: "تذكر أن القائد الحقيقي هو من يستمع لفريقه ويقدر مساهماتهم.", compatibility: "الحمل، القوس، والميزPSIzIi8+PHBhdGggZD0iTTMgMTJBMTAgMTAgMCAwIDAgMTIgMjIgMTAgMTAgMCAwIDAgMjEgMTIgNiA2IDAgMCAxIDE1IDIuNSA2IDYgMCAwIDEgOSAyLjUiLz48L3N2Zz4=", daily: "قد تشعر بالحنين للماضي. اقضِ وقتًا مع العائلة.", strengths: "الإخلاص، العاطفة، الحدس القوي.", weaknesses: "الحساسية المفران.", luckyColor: "الذهبي", luckyNumber: 1, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIطة، التقلب، التشاؤم." },
        { name: "الأسد", startDay: 23, startMonth: 7, endDay: 22, endMonth: 8, description: "شخصية واثقة، كريمة، وقيادية. تحب أن تكون في دائرة الضوء وتلهم الآخرين.", advice: "تذكر أن القائد الحقيقي هو من يستمع لفريقه ويقدر مساهماتهم.", compatibility: "الحمل، القوس، والميزان.", luckyColor: "الذهبي", luckyNumber: 1gaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMyAxNGE1IDUgMCAwIDEtNSA1IDUgNSAwIDAgMS0xMCAwIDUgNSAwIDAgMSA1LTUgMyAzIDAgMCAxIDYgMFoiLz48cGF, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW50aCBkPSJNMjEgMTZhNSA1IDAgMCAwIDAtMTAgNSA1IDAgMCAwLTMuNSAzLjUiLz48L3N2Zz4=", daily: "إبداعك يلفت الأنظار. لا تتردد في أخذ زمام المبادرة.", strengths: "الكرم، الثقة، الإبداع.", weaknesses: "الغطرسة، العناد، عدم تقبل النقد." },
        { name: "العذراء", startDay: 23, startMonth: 8, endDay: 22, endMonth: 9, description: "شخصية دقيقة، مجتهدة، وعملية. تهتم بالتفاصيل وتسعى دائمًا إلى الكمال.", advice: "لا تكن قاسيًا على نفسك. من الجيد أن تقبل بأن الأمور ليست دائمًا مثالية.", compatibility: "الثkIj48cGF0aCBkPSJNMyAxNGE1IDUgMCAwIDEtNSA1IDUgNSAwIDAgMS0xMCAwIDUgNSAwIDAgMSA1LTUgMyAzIDAgMCAxIDYgMFoiLz48cGF0aCBkPSJNMjEgMTZhNSA1IDAgMCAwIDAtMTAgNSA1IDAgMCAwLTMuNSAzLjUiLz48L3N2Zz4=", daily: "إبداعك يلفت الأنظار. لا تتردد في أخذ زمام المبادرة.", strengths: "الكرم، الثقة، الإبداع.", weaknesses: "الغطرسة، العناد، عدم تقبل النقد." },
        { name: "العذراء", startDay: ور، الجدي، والسرطان.", luckyColor: "البني", luckyNumber: 5, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4823, startMonth: 8, endDay: 22, endMonth: 9, description: "شخصية دقيقة، مجتهدة، وعملية. تهتم بالتفاصيل وتسعى دائمًا إلى الكمال.", advice: "لا تكن قاسيًا على نفسك. من الجيد أن تقبل بأن الأمور ليست دائمًا مثالية.", compatibility: "الثور، الجدي، والسرطان.", luckyColor: "البني", luckyNumber: 5, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHNcGF0aCBkPSJNMCAwSDI0VjI0SDBaIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjIgMTEuMDhWMjIiLz48cGF0aCBkPSJNMTYgM2wyIDRjLjgxLTIuMTMgMy00IDcgLTR2Ni41Ii8+PHBhdGggZD0iTTIgMyg2IDNWMTYiLz48cGF0aCBkPSJNNiAzdDIgNHMzIDAgMy00Ii8+PHBhdGggZD0iTTEwIDE2SDYiLz48L3N2Zz4=", daily: "يوم مناسب لتنظيم أمورك. ستشعر بالرضا عند إنجاز التفاصيل الصغيرة.", strengths: "الدقة، التحليل، الاجتهاد.", weaknesses: "القلق، النقد اللاذع0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMCAwSDI0VjI0SDBaIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjIgMTEuMDhWMjIiLz48cGF0aCBkPSJNMTYgM2wyIDRjLjgxLTIuMTMgMy00IDcgLTR2Ni41Ii8+PHBhdGggZD0iTTIgMyg2IDNWMTYiLz48cGF0aCBkPSJNNiAzdDIgNHMzIDAgMy00Ii8+PHBhdGggZD0iTTEwIDE2SDYiLz48L3N2Zz4=", daily: "يوم مناسب لتنظيم أمورك. ستش، الخجل." },
        
        // --- ★★★ تم إصلاح أيقونة الميزان هنا ★★★ ---
        { name: "الميزان", startDay: 23, startMonth: 9, endDay: 22, endMonth: 10, description: "شخصية دبلوماسية، ساحرة، ومحبة للعدل والانسجام. تسعى دائمًا لتحقيق التوازن.", advice: "لا تتردد كثيرًا في اتخاذ القرارات. ثق بحدسك واختر ما تشعر أنه صحيح.", compatibility: "الجوزاء، الدلو، والأسد.", luckyColor: "الأزرق", luckyNumber: 7, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS1عر بالرضا عند إنجاز التفاصيل الصغيرة.", strengths: "الدقة، التحليل، الاجتهاد.", weaknesses: "القلق، النقد اللاذع، الخجل." },
        // === تم إصلاح برج الميزان ===
        { name: "الميزان", startDay: 23, startMonth: 9, endDay: 22, endMonth: 10, description: "شخصية دبلوماسية، ساحرة، ومحبة للعدل والانسجام. تسعى دائمًا لتحقيق التوازن.", advice: "لا تتردد كثيرًا في اتخاذ القرارات. ثق بحدسك واختر ما تشعر أنه صحيح.", compatibility: "الجوزاء، الدلو، والأسد.", luckyColor: "الأزرق", luckyNumber: 7, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9r3aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iNSIgeDI9IjE5IiB5MT0iMjAiIHkyPSIyMCIvPjxwYXRoIGQ9Ik01IDE2aDE0di00aC0zLjQ0YTQgNCAwIDEgMSAwLThIMTlWMyIvPjwvc3ZnPg==" },
        
        { name: "العقرب", startDay: 23, startMonth: 10, endDay: 21, endMonth: 11, description: "شخصية عاطفية قوية، شغوفة، وذات إرادة صلبة. لا تعرف الاستسلام بسهولة.", advice: "حاول أن تسامح وتتخلى عن الضغائن. ذلك سيحرر طاقة كبيرة بداخلك.", compatibility: "السرطان، الحوت، والجدي.", luckyColor: "الأسود", luckyNumber: 8, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iNSIgeTE9IjIwIiB4Mj0iMTkiIHkyPSIyMCIvPjxwYXRoIGQ9Ik01IDE2aDE0di00aC0zLjQ0YTQgNCAwIDEgMSAwLThIMTlWMyIgLz48L3N2Zz4=", daily: "علاقاتك الاجتماعية هي محور اهتمامك. يوم رائع للتواصل مع الأصدقاء.", strengths: "الدبلوماسية، العدل، الرقي.", weaknesses: "التردد، تجنب المواجهة، الانغماس في الملذات." },
        { name: "العقرب", startDay: 23, startMonth: 10, endDay: 21, endMonth: 11, description: "شخصية عاطفية قوية، شغوفة، وذات إرادة صلبة. لا تعرف الاستسلام بسهولة.", advice: "حاول أن تسامح وتتخلى عن الضغائن. ذلك سيحرر طاقة كبيرة بداخلك.", compatibility: "السرطان، الحوت، والجدي.", luckyColor: "الأسود", luckyNumber: Z2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMCAwSDI0VjI0SDBaIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJtMyAxNCA0LTQgNCA0Ii8+PHBhdGggZD0iTTcgMTB2MTFNMTIgMTUgMyAyNGw1LTEuNSAyLjUtNCAzLjUtMi41LTcgNy41Ii8+PHBhdGggZD0iTTE2IDNoMS41YTQuNSA0LjUgMCAwIDEgMCA5SDE2Ii8+PC9zdmc+" },
        { name: "القوس", startDay: 22, startMonth: 11, endDay: 21, endMonth: 12, description: "شخصية متفائلة، محبة للحرية، وفيلسوفة. تعشق السفر واستكشاف آفاق جديدة.", advice: "التزامك بالوعود مهم بقدر8, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMCAwSDI0VjI0SDB حريتك. حاول الموازنة بينهما.", compatibility: "الحمل، الأسد، والدلو.", luckyColor: "البنفسجي", luckyNumber: 3, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iMjEiIHgyPSIzIiB5MT0iMyIgeTI9IjIxIi8+PHBhdGggZD0iTTEzIDMgMyAxMyIvPjxwYXRoIGQ9Ik0yMSAzbDItMi0yIDIiLz48cGF0aCBkPSJtMTggMTEgMy0zIi8+PC9zdmc+" },
        { name: "الجدي", startaIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJtMyAxNCA0LTQgNCA0Ii8+PHBhdGggZD0iTTcgMTB2MTFNMTIgMTUgMyAyNGw1LTEuNSAyLjUtNCAzLjUtMi41LTcgNy41Ii8+PHBhdGggZD0iTTE2IDNoMS41YTQuNSA0LjUgMCAwIDEgMCA5SDE2Ii8+PC9zdmc+", daily: "حدسك قوي جدًا اليوم. ثق به، فقد يكشف لك عن أمور هامة.", strengths: "الشغف، الإصرار، الشجاعة.", weaknesses: "الغيرة، حب السيطرة، الكتمان." },
        { name: "القوس", startDay: 22, startMonth: 11, endDay: 21, endMonth: 12, description: "شخصية متفائلة، محبة للحرية، وفيلسوفة. تعشق السفر واستكشاف آفاق جديدة.", advice: "التزامك بالوعود مهم بقدر حريتك. حاول الموازنة بينهما.", compatibility: "الحمل، الأسد، والدلو.", luckyColor: "البنفسجي", luckyNumber: 3, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJDay: 22, startMonth: 12, endDay: 19, endMonth: 1, description: "شخصية طموحة، منضبطة، وصبورة. تعمل بجد لتحقيق أهدافها على المدى الطويل.", advice: "لا تنسَ أن تأخذ فترات راحة وتستمتع بثمار عملك. الحياة ليست عملًا فقط.", compatibility: "الثور، العذراء، والعقرب.", luckyColor: "الرمادي الداكن", luckyNumber: 4, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNiAzdjhtNiAwbDItMy41Ii8+PHBhdGggZD0iTTE4IDNoLTVhNCA0IDAgMCAwLTMuNDQgNyIvPjxwYXRoIGQ9Ik0zIDNoM3Y4Ii8+PHBhdGggZD0iTTMuNDcgMTguN2E0LjQgNC40IDAgMCAxIDAtNivdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iMjEiIHgyPSIzIiB5MT0iMyIgeTI9IjIxIi8+PHBhdGggZD0iTTEzIDMgMyAxMyIvPjxwYXRoIGQ9Ik0yMSAzbDItMi0yIDIiLz48cGF0aCBkPSJtMTggMTEgMy0zIi8+PC9zdmc+", daily: "تشعر برغبة في المغامرة. خطط لرحلة قصيرة أو تعلم شيئًا جديدًا.", strengths: "التفاؤل، الفكاهة، الصدق.", weaknesses: "عدم الصبر، المبالغة، عدم الالتزام." },
        { name: "الجدي", startDay: 22, startMonth: 12, endDay: 19, endMonth: 1, description: "شخصية طموحة، منضبطة، وصبورة. تعمل بجد لتحقيق أهدافها على المدى الطويل.", advice: "لا تنسَ أن تأخذ فترات راحة وتستمتع بثمار عملك. الحياة ليست عملًا فقط.", compatibility: "الثور، العذراء، والعقرب.", luckyColor: "الرمادي الداكن", luckyNumber: 4, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJ4yIDQuMiA0LjIgMCAwIDEgNi4xIDBsMSAxdjRhMyAzIDAgMCAwIDYgMGwuNDgtLjVsMS41IDEuNUwzLjQ4IDE4Ljd6Ii8+PC9zdmc+" },
        
        // --- ★★★ تم إصلاح أيقونة الدلو هنا ★★★ ---
        { name: "الدلو", startDay: 20, startMonth: 1, endDay: 18, endMonth: 2, description: "شخصية مبتكرة، مستقلة، وإنسانية. تفكر خارج الصندوق وتهتم بالقضايا الاجتماعية.", advice: "قد يشعر الآخرون أحيانًا ببعدك العاطفي. حاول التعبير عن مشاعرك بشكل أوضح.", compatibility: "الجوزاء، الميزان، والقوس.", luckyColor: "الفيروزي", luckyNumber: 11, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMyAxNSA0LTQgNCA0IDQtNCA0IDQiLz48cGF0aCBkPSJtMyA4IDQtNCA0IDQgNC00IDQgNCIvPjwvc3ZnPg==" },
        
        { name: "الحوت", startDay: 19, startMonthva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNiAzdjhtNiAwbDItMy41Ii8+PHBhdGggZD0iTTE4IDNoLTVhNCA0IDAgMCAwLTMuNDQgNyIvPjxwYXRoIGQ9Ik0zIDNoM3Y4Ii8+PHBhdGggZD0iTTMuNDcgMTguN2E0LjQgNC40IDAgMCAxIDAtNi4yIDQuMiA0LjIgMCAwIDEgNi4xIDBsMSAxdjRhMyAzIDAgMCAwIDYgMGwuNDgtLjVsMS41IDEuNUwzLjQ4IDE4Ljd6Ii8+PC9zdmc+", daily: "تركيزك العالي يساعدك على تحقيق تقدم كبير في عملك.", strengths: "الانضباط، المسؤولية، الصبر.", weaknesses: "التشاؤم، العناد، الجدية الزائدة." },
        // === تم إصلاح برج الدلو ===
        { name: "الدلو", startDay: 20, startMonth: 1, endDay: 18, endMonth: 2, description: "شخصية مبتكرة، مستقلة، وإنسانية. تفكر خارج الصندوق وتهتم بالقضايا الاجتماعية.", advice: "قد يشعر الآخرون أحيانًا ببعدك العاطفي. حاول التعبير عن مشاعرك بشكل أوضح.", compatibility: "الجوزاء، الميزان، والقوس.", luckyColor: "الفيروزي", luckyNumber: 11, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13a: 2, endDay: 20, endMonth: 3, description: "شخصية حالمة، متعاطفة، وفنية. تمتلك خيالًا واسعًا وحدسًا قويًا.", advice: "من المهم أن تضع حدودًا واضحة حتى لا تستنزف طاقتك في مساعدة الآخرين.", compatibility: "السرطان، العقرب، والثور.", luckyColor: "الأخضر البحري", luckyNumber: 7, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgNGE5IDkgMCAxIDAgNS4yOSA4LjQ4TTIgMTJoMjBNNi44IDE4LjljLS41LTEuNC0uOC0zLS44LTQuOU0xNiA2YTkgOSAwIDAgMC0xMS4yOSA4LjQ4Ii8+PC9zdmc+" }
    ];

    // ... (بقية الكود يبقى كما هو بدون تغيير)

    const birthdateInput = document.getElementById('birthdate');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultSection = document.getElementById('result');
    const loader = document.getElementById('loader');

    const savedBirthdate = localStorage.getItem('userBirthdate');
    if (savedBirthdate) {
        birthdateInput.value = savedBirthdate;
    }

    WR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMyAxNSA0LTQgNCA0IDQtNCA0IDQiLz48cGF0aCBkPSJtMyA5IDQtNCA0IDQgNC00IDQgNCIvPjwvc3ZnPg==", daily: "لديك أفكار عبقرية اليوم. شاركها مع الآخرين.", strengths: "الابتكار، الاستقلالية، الإنسانية.", weaknesses: "البرود العاطفي، العناد، عدم القدرة على التنبؤ." },
        { name: "الحوت", startDay: 19, startMonth: 2, endDay: 20, endMonth: 3, description: "شخصية حالمة، متعاطفة، وفنية. تمتلك خيالًا واسعًا وحدسًا قويًا.", advice: "من المهم أن تضع حدودًا واضحة حتى لا تستنزف طاقتك في مساعدة الآخرين.", compatibility: "السرطان، العقرب، والثور.", luckyColor: "الأخضر البحري", luckyNumber: 7, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgNGE5IDkgMCAxIDAgNS4yOSA4LjQ4TTIgif (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const birthdateValue = birthdateInput.value;
            if (!birthdateValue) {
                alert("الرجاء إدخال تاريخ ميلادك أولاً!");
                return;
            }

            resultSection.classList.add('hidden');
            loader.classList.remove('hidden');

            setTimeout(() => {
                const birthDate = new Date(birthdateValue);
                const day = birthDate.getDate();
                const month = birthDate.getMonth() + 1;

                const zodiacSign = findZodiac(day, month);

                if (zodiacSign) {
                    localStorage.setItem('userBirthdate', birthdateValue);
                    displayResult(zodiacSign);
                }

                loader.classList.add('hidden');
                resultSection.classList.remove('hidden');

            }, 1500);
        });
    }

    function findZodiac(day, month) {
         for (const sign of zodiacData) {
            if (sign.name === "الجدي") {
                if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return sign;
            } else {
                if ((month === sign.startMonth && day >= sign.startDay) || (month === sign.endMonth && day <= sign.endDay)) return sign;
            }
        }
        return null;
    }

    function displayResult(sign) {
        document.getElementById('zodiacImage').src = sign.image;
        document.getElementById('zodiacName').textContent = sign.name;
        document.getElementById('zodiacDates').textContent = `(من ${sign.startDay}/${sign.startMonth} إلى ${sign.endDay}/${sign.endMonth})`;
        document.getElementById('luckyColor').textContent = sign.luckyColor;
        document.getElementById('luckyNumber').textContent = sign.luckyNumber;
        document.getElementById('zodiacDescription').textContent = sign.description;
        document.getElementById('compatibility').textContent = sign.compatibility;
        document.getElementById('zodiacAdvice').textContent = sign.advice;
    }

    const dailyGrid = document.getElementById('daily-horoscopes-grid');
    const traitsGrid = document.getElementById('traits-grid');

    if (dailyGrid && traitsGrid) {
        zodiacData.forEach(sign => {
            const dailyCard = document.createElement('div');
            dailyCard.className = 'horoscope-card';
MTJoMjBNNi44IDE4LjljLS41LTEuNC0uOC0zLS44LTQuOU0xNiA2YTkgOSAwIDAgMC0xMS4yOSA4LjQ4Ii8+PC9zdmc+", daily: "خيالك خصب اليوم. استخدمه في الفن أو الكتابة أو حل المشكلات.", strengths: "التعاطف، الحدس، الإبداع الفني.", weaknesses: "الهروب من الواقع، السذاجة، الحساسية الزائدة." }
    ];
