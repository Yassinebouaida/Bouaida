document.addEventListener('DOMContentLoaded', () => {

    // بيانات الأبراج (تم إصلاح أيقونات الميزان والدلو فقط)
    const zodiacData = [
        { name: "الحمل", startDay: 21, startMonth: 3, endDay: 19, endMonth: 4, description: "شخصية قوية، مبادرة، ومتحمسة. تحب المغامرة والتحديات ولا تخاف من البدء من جديد.", advice: "حاول أن تتحلى بالصبر وتستمع لآراء الآخرين قبل اتخاذ قرارات متسرعة.", compatibility: "الأسد، القوس، والجوزاء.", luckyColor: "الأحمر", luckyNumber: 9, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNOSAxOFY1YTcgNyAwIDAgMSAxNCAwdiEzTTkgNWE3IDcgMCAwIDAtMTQgMHYxMyIvPjwvc3ZnPg==" },
        { name: "الثور", startDay: 20, startMonth: 4, endDay: 20, endMonth: 5, description: "شخصية عملية، موثوقة، ومحبة للاستقرار والجمال. تقدر الراحة والأشياء الجيدة في الحياة.", advice: "لا تخف من التغيير أحيانًا. الخروج من منطقة الراحة قد يفتح لك أبوابًا جديدة.", compatibility: "العذراء، الجدي، والسرطان.", luckyColor: "الأخضر", luckyNumber: 6, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMCAwSDI0VjI0SDBaIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNOS41IDNhNi41IDYuNSAwIDAgMSAwIDEzIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIvPjwvc3ZnPg==" },
        { name: "الجوزاء", startDay: 21, startMonth: 5, endDay: 20, endMonth: 6, description: "شخصية اجتماعية، فضولية، وسريعة البديهة. تستمتع بالتواصل مع الناس وتعلم أشياء جديدة.", advice: "حاول التركيز على مهمة واحدة في كل مرة لتجنب تشتت طاقتك.", compatibility: "الميزان، الدلو، والحمل.", luckyColor: "الأصفر", luckyNumber: 5, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNiAzdjE4TTIgMjFoMjBNMTggM1YyMSIvPjwvc3ZnPg==" },
        { name: "السرطان", startDay: 21, startMonth: 6, endDay: 22, endMonth: 7, description: "شخصية عاطفية، حدسية، ومخلصة. تهتم كثيرًا بالأسرة والأصدقاء وتشعر بعمق.", advice: "لا تدع حساسيتك تسيطر عليك. تعلم كيفية حماية مشاعرك دون الانغلاق على نفسك.", compatibility: "العقرب، الحوت، والثور.", luckyColor: "الفضي", luckyNumber: 2, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSI2IiBjeT0iMTIiIHI9IjMiLz48Y2lyY2xlIGN4PSIxOCIgY3k9IjEyIiByPSIzIi8+PHBhdGggZD0iTTMgMTJBMTAgMTAgMCAwIDAgMTIgMjIgMTAgMTAgMCAwIDAgMjEgMTIgNiA2IDAgMCAxIDE1IDIuNSA2IDYgMCAwIDEgOSAyLjUiLz48L3N2Zz4=" },
        { name: "الأسد", startDay: 23, startMonth: 7, endDay: 22, endMonth: 8, description: "شخصية واثقة، كريمة، وقيادية. تحب أن تكون في دائرة الضوء وتلهم الآخرين.", advice: "تذكر أن القائد الحقيقي هو من يستمع لفريقه ويقدر مساهماتهم.", compatibility: "الحمل، القوس، والميزان.", luckyColor: "الذهبي", luckyNumber: 1, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMyAxNGE1IDUgMCAwIDEtNSA1IDUgNSAwIDAgMS0xMCAwIDUgNSAwIDAgMSA1LTUgMyAzIDAgMCAxIDYgMFoiLz48cGF0aCBkPSJNMjEgMTZhNSA1IDAgMCAwIDAtMTAgNSA1IDAgMCAwLTMuNSAzLjUiLz48L3N2Zz4=" },
        { name: "العذراء", startDay: 23, startMonth: 8, endDay: 22, endMonth: 9, description: "شخصية دقيقة، مجتهدة، وعملية. تهتم بالتفاصيل وتسعى دائمًا إلى الكمال.", advice: "لا تكن قاسيًا على نفسك. من الجيد أن تقبل بأن الأمور ليست دائمًا مثالية.", compatibility: "الثور، الجدي، والسرطان.", luckyColor: "البني", luckyNumber: 5, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMCAwSDI0VjI0SDBaIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjIgMTEuMDhWMjIiLz48cGF0aCBkPSJNMTYgM2wyIDRjLjgxLTIuMTMgMy00IDcgLTR2Ni41Ii8+PHBhdGggZD0iTTIgMyg2IDNWMTYiLz48cGF0aCBkPSJNNiAzdDIgNHMzIDAgMy00Ii8+PHBhdGggZD0iTTEwIDE2SDYiLz48L3N2Zz4=" },
        // === تم إصلاح برج الميزان ===
        { name: "الميزان", startDay: 23, startMonth: 9, endDay: 22, endMonth: 10, description: "شخصية دبلوماسية، ساحرة، ومحبة للعدل والانسجام. تسعى دائمًا لتحقيق التوازن.", advice: "لا تتردد كثيرًا في اتخاذ القرارات. ثق بحدسك واختر ما تشعر أنه صحيح.", compatibility: "الجوزاء، الدلو، والأسد.", luckyColor: "الأزرق", luckyNumber: 7, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iNSIgeTE9IjIwIiB4Mj0iMTkiIHkyPSIyMCIvPjxwYXRoIGQ9Ik01IDE2aDE0di00aC0zLjQ0YTQgNCAwIDEgMSAwLThIMTlWMyIvPjwvc3ZnPg==" },
        { name: "العقرب", startDay: 23, startMonth: 10, endDay: 21, endMonth: 11, description: "شخصية عاطفية قوية، شغوفة، وذات إرادة صلبة. لا تعرف الاستسلام بسهولة.", advice: "حاول أن تسامح وتتخلى عن الضغائن. ذلك سيحرر طاقة كبيرة بداخلك.", compatibility: "السرطان، الحوت، والجدي.", luckyColor: "الأسود", luckyNumber: 8, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMCAwSDI0VjI0SDBaIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJtMyAxNCA0LTQgNCA0Ii8+PHBhdGggZD0iTTcgMTB2MTFNMTIgMTUgMyAyNGw1LTEuNSAyLjUtNCAzLjUtMi41LTcgNy41Ii8+PHBhdGggZD0iTTE2IDNoMS41YTQuNSA0LjUgMCAwIDEgMCA5SDE2Ii8+PC9zdmc+" },
        { name: "القوس", startDay: 22, startMonth: 11, endDay: 21, endMonth: 12, description: "شخصية متفائلة، محبة للحرية، وفيلسوفة. تعشق السفر واستكشاف آفاق جديدة.", advice: "التزامك بالوعود مهم بقدر حريتك. حاول الموازنة بينهما.", compatibility: "الحمل، الأسد، والدلو.", luckyColor: "البنفسجي", luckyNumber: 3, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iMjEiIHgyPSIzIiB5MT0iMyIgeTI9IjIxIi8+PHBhdGggZD0iTTEzIDMgMyAxMyIvPjxwYXRoIGQ9Ik0yMSAzbDItMi0yIDIiLz48cGF0aCBkPSJtMTggMTEgMy0zIi8+PC9zdmc+" },
        { name: "الجدي", startDay: 22, startMonth: 12, endDay: 19, endMonth: 1, description: "شخصية طموحة، منضبطة، وصبورة. تعمل بجد لتحقيق أهدافها على المدى الطويل.", advice: "لا تنسَ أن تأخذ فترات راحة وتستمتع بثمار عملك. الحياة ليست عملًا فقط.", compatibility: "الثور، العذراء، والعقرب.", luckyColor: "الرمادي الداكن", luckyNumber: 4, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNiAzdjhtNiAwbDItMy41Ii8+PHBhdGggZD0iTTE4IDNoLTVhNCA0IDAgMCAwLTMuNDQgNyIvPjxwYXRoIGQ9Ik0zIDNoM3Y4Ii8+PHBhdGggZD0iTTMuNDcgMTguN2E0LjQgNC40IDAgMCAxIDAtNi4yIDQuMiA0LjIgMCAwIDEgNi4xIDBsMSAxdjRhMyAzIDAgMCAwIDYgMGwuNDgtLjVsMS41IDEuNUwzLjQ4IDE4Ljd6Ii8+PC9zdmc+" },
        // === تم إصلاح برج الدلو ===
        { name: "الدلو", startDay: 20, startMonth: 1, endDay: 18, endMonth: 2, description: "شخصية مبتكرة، مستقلة، وإنسانية. تفكر خارج الصندوق وتهتم بالقضايا الاجتماعية.", advice: "قد يشعر الآخرون أحيانًا ببعدك العاطفي. حاول التعبير عن مشاعرك بشكل أوضح.", compatibility: "الجوزاء، الميزان، والقوس.", luckyColor: "الفيروزي", luckyNumber: 11, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMyAxNSA0LTQgNCA0IDQtNCA0IDQiLz48cGF0aCBkPSJtMyA5IDQtNCA0IDQgNC00IDQgNCIvPjwvc3ZnPg==" },
        { name: "الحوت", startDay: 19, startMonth: 2, endDay: 20, endMonth: 3, description: "شخصية حالمة، متعاطفة، وفنية. تمتلك خيالًا واسعًا وحدسًا قويًا.", advice: "من المهم أن تضع حدودًا واضحة حتى لا تستنزف طاقتك في مساعدة الآخرين.", compatibility: "السرطان، العقرب، والثور.", luckyColor: "الأخضر البحري", luckyNumber: 7, image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgNGE5IDkgMCAxIDAgNS4yOSA4LjQ4TTIgMTJoMjBNNi44IDE4LjljLS41LTEuNC0uOC0zLS44LTQuOU0xNiA2YTkgOSAwIDAgMC0xMS4yOSA4LjQ4Ii8+PC9zdmc+" },
    ];

    const birthdateInput = document.getElementById('birthdate');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultSection = document.getElementById('result');
    const loader = document.getElementById('loader');

    const savedBirthdate = localStorage.getItem('userBirthdate');
    if (savedBirthdate) {
        birthdateInput.value = savedBirthdate;
    }

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
});
