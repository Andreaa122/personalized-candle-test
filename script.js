document.addEventListener('DOMContentLoaded', () => {
  let currentLang = 'en'; // default language

  // DOM references
  const userInfoForm      = document.getElementById('user-info-form');
  const userInfoSection   = document.getElementById('user-info-section');
  const langSection       = document.getElementById('lang-section');
  const quizSection       = document.getElementById('quiz-section');
  const quizForm          = document.getElementById('quiz-form');
  const questionsContainer= document.getElementById('questions');
  const resultSection     = document.getElementById('result-section');
  const resultDiv         = document.getElementById('result');
  const restartBtn        = document.getElementById('restart-btn');

  const userData = {};

  // Questions bilingual
  const questions_en = [
    { text: "When you listen to sad songs, how do you feel?", options: ["I skip them","I enjoy them","I feel they talk about me"] },
    { text: "Do you check your phone waiting for someone’s message?", options: ["No","Sometimes","Yes, often"] },
    { text: "How long does it take you to fall asleep?", options: ["Few minutes","Some time","Very long"] },
    { text: "When you wake up, how do you feel?", options: ["Fresh","Okay","Tired"] },
    { text: "When someone says something small to you, do you feel worried?", options: ["No","Sometimes","Yes"] },
    { text: "When you sit in a quiet place, what happens in your mind?", options: ["Calm thoughts","Many thoughts","I remember things I want to forget"] },
    { text: "Do you forget where you put things often?", options: ["No","Sometimes","Yes"] },
    { text: "How do you feel when your friends go out without you?", options: ["Fine","A bit sad","Very sad"] },
    { text: "How often do you feel your body is heavy or slow?", options: ["Never","Sometimes","Often"] },
    { text: "When was the last time you felt excited for something?", options: ["Today","Last week","I don’t remember"] },
    { text: "Do you think a lot about past people or memories?", options: ["No","Sometimes","Yes, a lot"] },
    { text: "When you look at your to-do list, what do you feel?", options: ["Ready to start","Not sure","I don’t want to do it"] },
    { text: "Do you stay awake at night thinking?", options: ["No","Sometimes","Yes, a lot"] },
    { text: "Do you feel happy when people are around you?", options: ["Yes","Sometimes","Not really"] },
    { text: "When you try to study or work, can you focus?", options: ["Yes","A little","No"] },
    { text: "Do you feel tired even after resting or sleeping?", options: ["No","Sometimes","Yes"] },
    { text: "How often do you smile during your day?", options: ["A lot","Sometimes","Rarely"] },
    { text: "Do you find it easy to start your day?", options: ["Yes","Sometimes","No"] },
    { text: "When someone asks 'How are you?', what do you say?", options: ["I’m great","I’m okay","I just say 'fine'"] },
    { text: "Do you feel like you need to disappear for a while to rest?", options: ["No","Sometimes","Yes"] },
    { text: "When you see things you want to buy, what do you feel?", options: ["I can get them easily","I think a little","I worry a lot"] },
    { text: "Do you often think about what you will do next year or in the future?", options: ["No, I don’t think","Sometimes I think","Yes, I think a lot"] },
    { text: "When you imagine living alone, what comes to your mind first?", options: ["I feel excited and ready","I feel okay but need money","I feel worried or stressed"] }
  ];

  const questions_ar = [
    { text: "عندما تستمع إلى الأغاني الحزينة، كيف تشعر؟", options: ["أتجاوزها","أستمتع لها","أشعر أنها تتحدث عني"] },
    { text: "هل تتحقق من هاتفك انتظاراً لرسالة شخص ما؟", options: ["لا","أحياناً","نعم غالباً"] },
    { text: "كم من الوقت يستغرقك للنوم؟", options: ["دقائق قليلة","بعض الوقت","وقت طويل"] },
    { text: "عندما تستيقظ، كيف تشعر؟", options: ["نشاط","حسناً","تعب"] },
    { text: "عندما يقول لك شخص شيئاً بسيطاً، هل تشعر بالقلق؟", options: ["لا","أحياناً","نعم"] },
    { text: "عندما تجلس في مكان هادئ، ماذا يحدث في ذهنك؟", options: ["أفكار هادئة","أفكار كثيرة","أتذكر أشياء أريد نسيانها"] },
    { text: "هل تنسى أين وضعت الأشياء غالباً؟", options: ["لا","أحياناً","نعم"] },
    { text: "كيف تشعر عندما يخرج أصدقاؤك بدونك؟", options: ["بخير","حزين قليلاً","حزين جداً"] },
    { text: "كم مرة تشعر أن جسمك ثقيل أو بطيء؟", options: ["أبداً","أحياناً","غالباً"] },
    { text: "متى كانت آخر مرة شعرت بالحماس لشيء؟", options: ["اليوم","الأسبوع الماضي","لا أتذكر"] },
    { text: "هل تفكر كثيراً في أشخاص أو ذكريات من الماضي؟", options: ["لا","أحياناً","نعم، كثير"] },
    { text: "عندما تنظر إلى قائمة المهام، ماذا تشعر؟", options: ["جاهز للبدء","لست متأكداً","لا أرغب في فعلها"] },
    { text: "هل تبقى مستيقظاً في الليل تفكر؟", options: ["لا","أحياناً","نعم، كثيراً"] },
    { text: "هل تشعر بالسعادة عندما يكون الناس حولك؟", options: ["نعم","أحياناً","ليس حقاً"] },
    { text: "عندما تحاول الدراسة أو العمل، هل يمكنك التركيز؟", options: ["نعم","قليلاً","لا"] },
    { text: "هل تشعر بالتعب حتى بعد الراحة أو النوم؟", options: ["لا","أحياناً","نعم"] },
    { text: "كم مرة تبتسم خلال يومك؟", options: ["كثيراً","أحياناً","نادراً"] },
    { text: "هل تجد أنه من السهل بدء يومك؟", options: ["نعم","أحياناً","لا"] },
    { text: "عندما يسألك أحدهم 'كيف حالك؟' ماذا تقول؟", options: ["أنا بخير","أنا جيد","أقول فقط 'تمام'"] },
    { text: "هل تشعر أنك بحاجة للاختفاء لبعض الوقت للراحة؟", options: ["لا","أحياناً","نعم"] },
    { text: "عندما ترى أشياء تريد شرائها لنفسك، ماذا تشعر؟", options: ["يمكنني الحصول عليها بسهولة","أفكر قليلاً","أقلق كثيراً حول كيفية الدفع"] },
    { text: "هل تفكر غالباً فيما ستفعله في السنة القادمة أو المستقبل؟", options: ["لا، لا أفكر","أحياناً أفكر","نعم، أفكر كثيراً"] },
    { text: "عندما تتخيل العيش وحدك، ما أول ما يخطر في بالك؟", options: ["أشعر بالحماس والاستعداد","أشعر بخير لكن أحتاج المال","أشعر بالقلق أو التوتر"] }
  ];

  // --- Step 1: Submit user info ---
  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if(!name || !email || !phone){
      alert(currentLang === 'ar' ? 'يرجى ملء جميع الحقول.' : 'Please fill all fields.');
      return;
    }

    userData.name = name;
    userData.email = email;
    userData.phone = phone;

    // Hide user info and show fullscreen language page
    userInfoSection.style.display = 'none';
    langSection.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Disable scrolling
  });

  // --- Step 2: Set language and start quiz ---
  window.setLanguage = function(lang){
    currentLang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    langSection.style.display = 'none';
    quizSection.style.display = 'block';
    document.body.style.overflow = 'auto'; // Restore scrolling
    buildQuiz();
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  // --- Build Quiz ---
  function buildQuiz(){
    const list = currentLang === 'ar' ? questions_ar : questions_en;
    questionsContainer.innerHTML = '';

    list.forEach((q,i) => {
      const div = document.createElement('div');
      div.className = 'question';
      div.innerHTML = `<h3>${i+1}. ${q.text}</h3>`;

      q.options.forEach((opt,j)=>{
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="q${i}" value="${j}"> ${opt}`;
        div.appendChild(label);
      });

      questionsContainer.appendChild(div);
    });
  }

  // --- Submit Quiz ---
  quizForm.addEventListener('submit', e=>{
    e.preventDefault();
    const list = currentLang === 'ar' ? questions_ar : questions_en;
    let totalScore = 0;
    const answers = [];

    for(let i=0;i<list.length;i++){
      const sel = document.querySelector(`input[name="q${i}"]:checked`);
      if(!sel){
        alert(currentLang === 'ar' ? `يرجى الإجابة على السؤال ${i+1}` : `Please answer question ${i+1}`);
        document.querySelectorAll('.question')[i].scrollIntoView({behavior:'smooth', block:'center'});
        return;
      }
      const val = Number(sel.value);
      answers.push(val);
      totalScore += val;
    }

    // Candle logic
    const [q3,q4,q7,q8,q9,q12,q13,q15,q18,q20] = [
      answers[2], answers[3], answers[6], answers[7], answers[8],
      answers[11], answers[12], answers[14], answers[17], answers[19]
    ];

    let candleName = '', emotion = '';

    if ((q3 >= 1 || q13 >= 1) && totalScore <= 20) {
      candleName = 'Good Night Candle 🕯️'; emotion = 'Insomnia';
    } else if ((q8 >= 1 || q20 === 2) && totalScore <= 10) {
      candleName = 'HUG YOU Candle 🕯️'; emotion = 'Lonely';
    } else if ((q15 >= 1 || q7 === 2) && totalScore <= 10) {
      candleName = 'FOCAS Candle 🕯️'; emotion = 'to Focus';
    } else if ((q4 === 2 || q9 === 2 || q12 === 2 || q18 === 2) && totalScore <= 20) {
      candleName = 'GET UP Candle 🕯️'; emotion = 'Low energy';
    } else {
      if(totalScore <= 10){ candleName='No candle — you are okay 💛'; emotion='None'; }
      else if(totalScore <= 20){ candleName='CALM MOMENTS Candle 🕯️'; emotion='Stress & anxiety & overthinking'; }
      else if(totalScore <= 30){ candleName='Re-charge-me Candle 🕯️'; emotion='Exhausted'; }
      else{ candleName='CHEER UP 🕯️'; emotion='Depression'; }
    }

    // Send data to Google Sheet
    const scriptURL = "https://script.google.com/macros/s/AKfycbxWIr0svgEIDUoLb8hGINvB1GoY2IkerSJHCBsHaRPCGhvzLDBUArNuzaktZP9rbftk/exec";
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("score", totalScore);
    formData.append("result", candleName);
    formData.append("timestamp", new Date().toLocaleString());

    fetch(scriptURL, { method: "POST", body: formData })
      .then(res => { if(!res.ok) throw new Error(res.status); console.log('✅ Data sent!'); })
      .catch(err => { console.error('❌ Error:', err); alert(currentLang==='ar'?'حدث خطأ أثناء حفظ بياناتك':'Error saving your data'); });

    // Display result
    resultDiv.innerHTML = `
      <div class="result">
        <h2>${currentLang==='ar'?'شكراً لك':'Thank you'}, ${escapeHtml(userData.name)}!</h2>
        ${emotion!=='None'?`<p><strong>${currentLang==='ar'?'آسف :':'I am sorry :'}</strong> ${emotion}</p>`:''}
        <p><strong>${currentLang==='ar'?'أنت بحاجة إلى':'You need'}:</strong> ${candleName}</p>
        <p><a href="https://merakistore.myeasyorders.com" target="_blank" style="color:#8b5cf6; font-weight:bold; text-decoration:none;">Visit MERAKI Store 💜</a></p>
      </div>
    `;

    quizSection.style.display='none';
    resultSection.style.display='block';
    resultSection.scrollIntoView({behavior:'smooth'});
  });

  // --- Restart ---
  restartBtn.addEventListener('click', ()=>{
    userInfoForm.reset();
    quizForm.reset();
    resultDiv.innerHTML='';
    resultSection.style.display='none';
    quizSection.style.display='none';
    langSection.style.display='none';
    userInfoSection.style.display='block';
    document.body.style.overflow = 'auto'; // Restore scrolling
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // --- Helper ---
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }
});
