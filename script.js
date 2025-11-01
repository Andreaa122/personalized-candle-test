document.addEventListener('DOMContentLoaded', () => {
  // DOM references (must match your HTML)
  const userInfoForm      = document.getElementById('user-info-form');
  const userInfoSection   = document.getElementById('user-info-section');
  const quizSection       = document.getElementById('quiz-section');
  const quizForm          = document.getElementById('quiz-form');
  const questionsContainer= document.getElementById('questions');
  const resultSection     = document.getElementById('result-section');
  const resultDiv         = document.getElementById('result');
  const restartBtn        = document.getElementById('restart-btn');

  // QUESTIONS: 23 items (labels can be edited freely)
  const questions = [
    { text: "When you listen to sad songs, how do you feel?", options: ["I skip them","I enjoy them","I feel they talk about me"] },
    { text: "Do you check your phone waiting for someone’s message?", options: ["No","Sometimes","Yes, often"] },
    { text: "How long does it take you to fall asleep?", options: ["Few minutes","Some time","Very long"] },
    { text: "When you wake up, how do you feel?", options: ["Fresh","Okay","Tired"] },
    { text: "When someone says something small to you (like 'you look tired' or 'why are you quiet?'), do you start to feel worried or nervous?", options: ["No","Sometimes","Yes"] },
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
    { text: "When you see things you want to buy for yourself, what do you feel?", options: ["I can get them easily","I think a little about how to get money","I worry a lot about how to pay"] },
    { text: "Do you often think about what you will do next year or in the future?", options: ["No, I don’t think","Sometimes I think","Yes, I think a lot"] },
    { text: "When you imagine living alone, what comes to your mind first?", options: ["I feel excited and ready","I feel okay but need money","I feel worried or stressed"] }
  ];

  // Build quiz UI (radio values are 0,1,2)
  function buildQuiz() {
    questionsContainer.innerHTML = '';
    questions.forEach((q, idx) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'question';
      qDiv.innerHTML = `<h3>${idx + 1}. ${q.text}</h3>`;

      const optsDiv = document.createElement('div');
      optsDiv.className = 'options';

      q.options.forEach((opt, j) => {
        // value j = 0..2 (scoring)
        const radioName = `q${idx}`;
        const radioId = `q${idx}_opt${j}`;
        const label = document.createElement('label');
        label.innerHTML = `<input id="${radioId}" type="radio" name="${radioName}" value="${j}"> ${opt}`;
        optsDiv.appendChild(label);
      });

      qDiv.appendChild(optsDiv);
      questionsContainer.appendChild(qDiv);
    });
  }

  // Start quiz: intercept form submit to prevent reload
  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !email || !phone) {
      alert('Please fill name, email and phone to start the quiz.');
      return;
    }

    // Save user info to quizSection dataset for later use
    quizSection.dataset.name = name;
    quizSection.dataset.email = email;
    quizSection.dataset.phone = phone;

    // Hide user info and show quiz
    userInfoSection.style.display = 'none';
    quizSection.style.display = 'block';

    // Build quiz only once
    buildQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Submit quiz answers
  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Ensure all questions answered
    for (let i = 0; i < questions.length; i++) {
      const sel = document.querySelector(`input[name="q${i}"]:checked`);
      if (!sel) {
        alert(`Please answer question ${i + 1} before submitting.`);
        const qEl = document.querySelectorAll('.question')[i];
        if (qEl) qEl.scrollIntoView({behavior:'smooth', block:'center'});
        return;
      }
    }

    // Calculate total score (0..46)
    let totalScore = 0;
    const answers = []; // store numeric answers by index
    for (let i = 0; i < questions.length; i++) {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      const val = Number(selected.value); // 0,1,2
      answers.push(val);
      totalScore += val;
    }

    // Shortcut variable for question answers (by index)
    const q3  = answers[2];  // question 3 (index 2)
    const q4  = answers[3];
    const q7  = answers[6];
    const q8  = answers[7];
    const q9  = answers[8];
    const q12 = answers[11];
    const q13 = answers[12];
    const q15 = answers[14];
    const q18 = answers[17];
    const q20 = answers[19];

    // Determine candle based on the rules you provided
    let candleName = '';
    // 1 - Insomnia rule (Q3 Very long or Some time -> q3 >=1 ; Q13 sometimes or yes a lot -> q13 >=1)
    if ((q3 >= 1 || q13 >= 1) && totalScore <= 20) {
      candleName = 'Good Night Candle 🕯️ (Insomnia)';
    }
    // 2 - Loneliness rule (Q8 a bit sad or very sad -> q8 >=1 OR Q20 yes -> q20 == 2) if score <=10 => Warm Hug
    else if ((q8 >= 1 || q20 === 2) && totalScore <= 10) {
      candleName = 'Warm Hug Candle 🕯️ (Lonely)';
    }
    // 3 - Focus rule (Q15 a little or no -> q15 >=1 OR Q7 yes -> q7 == 2) if score <=10 => FOCUS candle
    else if ((q15 >= 1 || q7 === 2) && totalScore <= 10) {
      candleName = 'FOCAS Candle 🕯️ (Focus)';
    }
    // 4 - Low energy rule (Q4 tired -> q4 == 2 OR Q9 often -> q9 == 2 OR Q12 I don’t want to do it -> q12 == 2 OR Q18 No -> q18 == 2)
    else if ((q4 === 2 || q9 === 2 || q12 === 2 || q18 === 2) && totalScore <= 20) {
      candleName = 'Get UP Candle 🕯️ (Low energy)';
    }
    // Score-based fallback (use these ranges you gave)
    else {
      if (totalScore <= 10) {
        candleName = 'No candle — you are okay 💛';
      } else if (totalScore <= 20) {
        candleName = 'Calm Moment Candle 🕯️ (Stress & anxiety & overthinking)';
      } else if (totalScore <= 30) {
        candleName = 'Recharge Candle 🕯️ (Exhausted)';
      } else { // 31..46
        candleName = 'Joy Candle 🕯️ (Depression / low mood — may need support)';
      }
    }

    // Prepare result display (show user's name too)
    const userName = quizSection.dataset.name || '';
    resultDiv.innerHTML = `
      <div class="result">
        <h2>Thank you, ${escapeHtml(userName)}!</h2>
        <p><strong>Your candle match:</strong> ${candleName}</p>
        <p><strong>Your score:</strong> ${totalScore} / 46</p>
      </div>
    `;

    // Hide quiz, show result
    quizSection.style.display = 'none';
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });

    // --- OPTIONAL: send result by EmailJS (if configured) ---
    // Uncomment and replace SERVICE_ID and TEMPLATE_ID if you set EmailJS up
    /*
    const userEmail = quizSection.dataset.email || '';
    const userPhone = quizSection.dataset.phone || '';
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      user_name: userName,
      user_email: userEmail,
      user_phone: userPhone,
      quiz_score: totalScore,
      candle_name: candleName
    }).then(() => {
      console.log('Email sent ok');
    }).catch(err => {
      console.error('Email error', err);
    });
    */
  });

  // Restart button
  restartBtn.addEventListener('click', () => {
    userInfoForm.reset();
    quizForm.reset();
    resultDiv.innerHTML = '';
    resultSection.style.display = 'none';
    quizSection.style.display = 'none';
    userInfoSection.style.display = 'block';
    delete quizSection.dataset.name;
    delete quizSection.dataset.email;
    delete quizSection.dataset.phone;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // small helper: escape HTML for safe display (name)
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[s]);
  }
});
