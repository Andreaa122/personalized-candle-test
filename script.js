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

  // QUESTIONS
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

  // Build quiz UI
  function buildQuiz() {
    questionsContainer.innerHTML = '';
    questions.forEach((q, idx) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'question';
      qDiv.innerHTML = `<h3>${idx + 1}. ${q.text}</h3>`;

      const optsDiv = document.createElement('div');
      optsDiv.className = 'options';

      q.options.forEach((opt, j) => {
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

  // Start quiz
  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !email || !phone) {
      alert('Please fill name, email and phone to start the quiz.');
      return;
    }

    quizSection.dataset.name = name;
    quizSection.dataset.email = email;
    quizSection.dataset.phone = phone;

    userInfoSection.style.display = 'none';
    quizSection.style.display = 'block';
    buildQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Submit quiz
  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    for (let i = 0; i < questions.length; i++) {
      const sel = document.querySelector(`input[name="q${i}"]:checked`);
      if (!sel) {
        alert(`Please answer question ${i + 1} before submitting.`);
        document.querySelectorAll('.question')[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }

    let totalScore = 0;
    const answers = [];
    for (let i = 0; i < questions.length; i++) {
      const val = Number(document.querySelector(`input[name="q${i}"]:checked`).value);
      answers.push(val);
      totalScore += val;
    }

    const q3  = answers[2];
    const q4  = answers[3];
    const q7  = answers[6];
    const q8  = answers[7];
    const q9  = answers[8];
    const q12 = answers[11];
    const q13 = answers[12];
    const q15 = answers[14];
    const q18 = answers[17];
    const q20 = answers[19];

   // ... (start of quizForm.addEventListener('submit', ...)

// ... (answers and totalScore calculation)

// ... (q3, q4, etc., variable definitions)

let candleName = '';
let emotion = '';

if ((q3 >= 1 || q13 >= 1) && totalScore <= 20) {
  candleName = 'Good Night Candle 🕯️';
  emotion = 'Insomnia';
} else if ((q8 >= 1 || q20 === 2) && totalScore <= 10) {
  candleName = 'HUG YOU Candle 🕯️';
  emotion = 'Lonely';
} else if ((q15 >= 1 || q7 === 2) && totalScore <= 10) {
  candleName = 'FOCAS Candle 🕯️';
  emotion = 'Focus';
} else if ((q4 === 2 || q9 === 2 || q12 === 2 || q18 === 2) && totalScore <= 20) {
  candleName = 'GET UP Candle 🕯️';
  emotion = 'Low energy';
} else {
  // This is the totalScore-based fallback logic
  if (totalScore <= 10) {
    candleName = 'No candle — you are okay 💛';
    emotion = 'None'; // Set emotion to None or similar
  } else if (totalScore <= 20) {
    candleName = 'CALM MOMENTS Candle 🕯️';
    emotion = 'Stress & anxiety & overthinking';
  } else if (totalScore <= 30) {
    candleName = 'Recharge Candle 🕯️';
    emotion = 'Exhausted';
  } else {
    // This is the final and highest score block (totalScore > 30)
    candleName = 'CHEER UP 🕯️';
    emotion = 'Depression'; // This assignment is now correctly isolated
  }
}

// ... (end of candle determination and start of Google Sheet fetch)

// --- Send data to Google Sheet ---
const userName = quizSection.dataset.name || '';
const userEmail = quizSection.dataset.email || '';
const userPhone = quizSection.dataset.phone || '';



// --- Send data to Google Sheet ---
// ... (your existing user info and score variables)

const scriptURL = "https://script.google.com/macros/s/AKfycbxWIr0svgEIDUoLb8hGINvB1GoY2IkerSJHCBsHaRPCGhvzLDBUArNuzaktZP9rbftk/exec";

const formData = new FormData();
formData.append("name", userName);
formData.append("email", userEmail);
formData.append("phone", userPhone);
formData.append("score", totalScore);
formData.append("result", candleName);
formData.append("timestamp", new Date().toLocaleString());

fetch(scriptURL, {
  method: "POST",
  body: formData,
})
.then((response) => {
  // Check for successful HTTP status (200-299)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // If successful, log the confirmation
  console.log("✅ Data sent to Google Sheet successfully!");
})
.catch((error) => {
  console.error("❌ Error sending data to Google Sheet:", error);
  // Optional: Add an alert for the user if the data fails to send
  alert("There was an issue saving your data. Please try again."); 
});

// ... (rest of your result display code)

    // Show result
resultDiv.innerHTML = `
  <div class="result">
    <h2>Thank you, ${escapeHtml(userName)}!</h2>
    ${totalScore > 10 ? `<p><strong> I am sorry : </strong> ${emotion}</p>` : ''}
    <p><strong>You need :</strong> ${candleName}</p>
    <p>
      <a href="https://merakistore.myeasyorders.com" target="_blank" style="color: #8b5cf6; text-decoration: none; font-weight: bold;">
        Visit MERAKI Candles 💜
      </a>
    </p>
  </div>
`;


    quizSection.style.display = 'none';
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
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

  // helper: escape HTML
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[s]);
  }
});
