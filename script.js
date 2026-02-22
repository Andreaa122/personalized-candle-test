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
  { text: "When you listen to sad songs, how do you feel?", options: ["I just skip them", "I enjoy them", "I feel they reflect me deeply"] },
  { text: "Do you check your phone waiting for someone’s message?", options: ["I don’t check", "Sometimes I check", "I check constantly and feel anxious"] },
  { text: "How long does it take you to fall asleep?", options: ["I fall asleep quickly", "It takes me a while", "I struggle and lie awake"] },
  { text: "When you wake up, how do you feel?", options: ["Fresh and energized", "Okay, not fully awake", "Tired and sluggish"] },
  { text: "When someone says something small to you (like you look tired or Are you okay), do you feel worried?", options: ["Not at all", "Sometimes a little", "Yes, I feel concerned"] },
  { text: "When you sit in a quiet place, what happens in your mind?", options: ["My thoughts are calm", "I have many thoughts", "I recall things I’d rather forget"] },
  { text: "Do you forget where you put things often?", options: ["Rarely or never", "Sometimes", "Yes, frequently"] },
  { text: "How do you feel when your friends go out without you?", options: ["Fine", "A little sad", "Very sad or left out"] },
  { text: "How often do you feel your body is heavy or slow?", options: ["Never", "Sometimes", "Often"] },
  { text: "When was the last time you felt excited for something?", options: ["Today", "Last week", "I can’t remember the last time"] },
  { text: "Do you think a lot about past people or memories?", options: ["Rarely", "Sometimes", "Very often"] },
  { text: "When you look at your to-do list, what do you feel?", options: ["Ready to start", "Unsure", "I don’t want to do it"] },
  { text: "Do you stay awake at night thinking?", options: ["Rarely", "Sometimes", "Yes, often"] },
  { text: "Do you feel happy when people are around you?", options: ["Yes, very happy", "Sometimes", "Not really"] },
  { text: "When you try to study or work, can you focus?", options: ["Yes, easily", "A little", "No, I get distracted"] },
  { text: "Do you feel tired even after resting or sleeping?", options: ["No, fully rested", "Sometimes", "Yes, still tired"] },
  { text: "How often do you smile during your day?", options: ["A lot", "Sometimes", "Rarely"] },
  { text: "Do you find it easy to start your day?", options: ["Yes, easily", "Sometimes", "No, I struggle"] },
  { text: "When someone asks 'How are you?', what do you say?", options: ["I feel great", "I feel okay", "I just say 'fine'"] },
  { text: "Do you feel like you need to disappear for a while to rest?", options: ["No", "Sometimes", "Yes, very much"] },
  { text: "When you see things you want to buy, what do you feel?", options: ["I can get them easily", "I think a little before", "I worry a lot"] },
  { text: "Do you often think about what you will do next year or in the future?", options: ["Rarely", "Sometimes", "Very often"] },
  { text: "When you imagine living alone, what comes to your mind first?", options: ["I feel excited and ready", "I feel okay but need money", "I feel worried or stressed"] }
];

  const questions_ar = [
  { text: "عندما تستمع إلى الأغاني الحزينة، كيف تشعر؟", options: ["أتجاوزها فقط", "أستمتع بها", "أشعر أنها تعكسني بعمق"] },
  { text: "هل تتحقق من هاتفك انتظاراً لرسالة شخص ما؟", options: ["لا أتحقق", "أتحقق أحياناً", "أتحقق باستمرار وأشعر بالقلق"] },
  { text: "كم من الوقت يستغرقك للنوم؟", options: ["أنام بسرعة", "يستغرق الأمر بعض الوقت", "أجد صعوبة وأبقى مستيقظاً"] },
  { text: "عندما تستيقظ، كيف تشعر؟", options: ["نشاط وحيوية", "حسناً، لست منتعشاً بالكامل", "تعب وكسل"] },
  { text: "عندما يقول لك شخص شيئاً بسيطاً، هل تشعر بالقلق؟", options: ["لا على الإطلاق", "أحياناً قليلاً", "نعم، أشعر بالقلق"] },
  { text: "عندما تجلس في مكان هادئ، ماذا يحدث في ذهنك؟", options: ["أفكاري هادئة", "أفكر كثيراً", "أتذكر أشياء أفضل لو نسيتها"] },
  { text: "هل تنسى أين وضعت الأشياء غالباً؟", options: ["نادراً أو أبداً", "أحياناً", "نعم، كثيراً"] },
  { text: "كيف تشعر عندما يخرج أصدقاؤك بدونك؟", options: ["بخير", "حزين قليلاً", "حزين جداً أو مهمل"] },
  { text: "كم مرة تشعر أن جسمك ثقيل أو بطيء؟", options: ["أبداً", "أحياناً", "غالباً"] },
  { text: "متى كانت آخر مرة شعرت بالحماس لشيء؟", options: ["اليوم", "الأسبوع الماضي", "لا أتذكر آخر مرة"] },
  { text: "هل تفكر كثيراً في أشخاص أو ذكريات من الماضي؟", options: ["نادراً", "أحياناً", "كثيراً"] },
  { text: "عندما تنظر إلى قائمة المهام، ماذا تشعر؟", options: ["جاهز للبدء", "غير متأكد", "لا أرغب في القيام بها"] },
  { text: "هل تبقى مستيقظاً في الليل تفكر؟", options: ["نادراً", "أحياناً", "نعم، كثيراً"] },
  { text: "هل تشعر بالسعادة عندما يكون الناس حولك؟", options: ["نعم، سعيد جداً", "أحياناً", "ليس حقاً"] },
  { text: "عندما تحاول الدراسة أو العمل، هل يمكنك التركيز؟", options: ["نعم، بسهولة", "قليلاً", "لا، أشتت انتباهي"] },
  { text: "هل تشعر بالتعب حتى بعد الراحة أو النوم؟", options: ["لا، منتعش تماماً", "أحياناً", "نعم، لا زلت متعباً"] },
  { text: "كم مرة تبتسم خلال يومك؟", options: ["كثيراً", "أحياناً", "نادراً"] },
  { text: "هل تجد أنه من السهل بدء يومك؟", options: ["نعم، بسهولة", "أحياناً", "لا، أجد صعوبة"] },
  { text: "عندما يسألك أحدهم 'كيف حالك؟' ماذا تقول؟", options: ["أشعر بأنني بخير", "أشعر بحالة جيدة", "أقول فقط 'تمام'"] },
  { text: "هل تشعر أنك بحاجة للاختفاء لبعض الوقت للراحة؟", options: ["لا", "أحياناً", "نعم، كثيراً"] },
  { text: "عندما ترى أشياء تريد شرائها لنفسك، ماذا تشعر؟", options: ["يمكنني الحصول عليها بسهولة", "أفكر قليلاً قبل الشراء", "أقلق كثيراً حول كيفية الدفع"] },
  { text: "هل تفكر غالباً فيما ستفعله في السنة القادمة أو المستقبل؟", options: ["نادراً", "أحياناً", "كثيراً"] },
  { text: "عندما تتخيل العيش وحدك، ما أول ما يخطر في بالك؟", options: ["أشعر بالحماس والاستعداد", "أشعر بخير لكن أحتاج المال", "أشعر بالقلق أو التوتر"] }
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

  // ================= SCIENTIFIC SCORING ENGINE =================

// 1️⃣ Indicator flags (from answers)
const insomnia   = (q3 >= 1 || q13 >= 1);
const lonely     = (q8 >= 1 || q20 === 2);
const lowFocus   = (q15 >= 1 || q7 === 2);
const lowEnergy  = (q4 === 2 || q9 === 2 || q12 === 2 || q18 === 2);

// 2️⃣ Weight constants
const W = {
  CHEER_UP: 0.75,
  RECHARGE: 1.0,
  CALM: 1.0,
  GOOD_NIGHT: 1.2,
  GET_UP: 1.2,
  HUG_YOU: 1.3,
  FOCAS: 1.3,
  NO_CANDLE: 0.6
};

// 3️⃣ Indicator functions
const I = {
  CHEER_UP:   totalScore >= 31,
  RECHARGE:   totalScore >= 21 && totalScore <= 30,
  CALM:       totalScore >= 11 && totalScore <= 20,
  GOOD_NIGHT: insomnia && totalScore <= 20,
  GET_UP:     lowEnergy && totalScore <= 20,
  HUG_YOU:    lonely && totalScore <= 10,
  FOCAS:      lowFocus && totalScore <= 10
};

// 4️⃣ Raw weights
const raw = {
  CHEER_UP:   I.CHEER_UP   ? W.CHEER_UP   : 0,
  RECHARGE:   I.RECHARGE   ? W.RECHARGE   : 0,
  CALM:       I.CALM       ? W.CALM       : 0,
  GOOD_NIGHT: I.GOOD_NIGHT ? W.GOOD_NIGHT : 0,
  GET_UP:     I.GET_UP     ? W.GET_UP     : 0,
  HUG_YOU:    I.HUG_YOU    ? W.HUG_YOU    : 0,
  FOCAS:      I.FOCAS      ? W.FOCAS      : 0
};

// 5️⃣ No-candle logic
const sumRaw = Object.values(raw).reduce((a,b)=>a+b,0);
if(sumRaw === 0){
  raw.NO_CANDLE = W.NO_CANDLE;
}

// 6️⃣ Normalize
const totalWeight = Object.values(raw).reduce((a,b)=>a+b,0);
const probabilities = {};
for(const k in raw){
  probabilities[k] = raw[k] / totalWeight;
}

// 7️⃣ Weighted random pick
function pickWeighted(obj){
  let r = Math.random();
  let acc = 0;
  for(const k in obj){
    acc += obj[k];
    if(r <= acc) return k;
  }
}

const picked = pickWeighted(probabilities);

// 8️⃣ Map to existing UI strings (UNCHANGED)
let candleName = '';
let emotion = '';

switch(picked){
  case 'GOOD_NIGHT':
    candleName = 'Good Night Candle 🕯️';
    emotion = 'Insomnia';
    break;
  case 'GET_UP':
    candleName = 'GET UP Candle 🕯️';
    emotion = 'Low energy';
    break;
  case 'HUG_YOU':
    candleName = 'HUG YOU Candle 🕯️';
    emotion = 'Lonely';
    break;
  case 'FOCAS':
    candleName = 'FOCAS Candle 🕯️';
    emotion = 'to Focus';
    break;
  case 'CALM':
    candleName = 'CALM MOMENTS Candle 🕯️';
    emotion = 'Stress & anxiety & overthinking';
    break;
  case 'RECHARGE':
    candleName = 'Re-charge-me Candle 🕯️';
    emotion = 'Exhausted';
    break;
  case 'CHEER_UP':
    candleName = 'CHEER UP 🕯️';
    emotion = 'Depression';
    break;
  default:
    candleName = 'No candle — you are okay 💛';
    emotion = 'None';
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




