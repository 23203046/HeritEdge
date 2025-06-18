function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {
    document.getElementById("message").style.color = "green";
    document.getElementById("message").innerText = "Login successful!";
    document.getElementById("navBar").classList.remove("hidden");
    document.getElementById("loginContainer").style.display = "none";
  } else {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerText = "Invalid username or password.";
  }

  return false;
}

// Function to show one section and hide others
function showSection(sectionId) {
  const sections = ["templeSection", "foodSection","chatbotSection","feedbackSection","quizSection"]; // add more IDs later
  sections.forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");
}

// Nav button event listeners
document.querySelectorAll(".nav-bar a")[0].addEventListener('click', () => {
  showSection("templeSection");
});

document.querySelectorAll(".nav-bar a")[1].addEventListener('click', () => {
  showSection("foodSection");
});





// Food order form submission
function placeOrder() {
  alert("Order placed successfully!");
  document.querySelector('.order-form').reset();
  return false; // Prevent form refresh
}


// Add chatbot and voice recognition handling
document.querySelectorAll(".nav-bar a")[2].addEventListener('click', () => {
  showSection("chatbotSection");
});

// Simulate AI chatbot response
function sendMessage() {
  const input = document.getElementById("userInput").value.trim().toLowerCase();
  const responseBox = document.getElementById("chatResponse");

  if (input === "") {
    responseBox.innerText = "Please type or speak your question.";
    return;
  }

  let response = "I'm not sure about that. Please ask about Tamil Nadu heritage, temples, food, or festivals.";

  if (input.includes("temple")) {
    response = "Tamil Nadu is home to famous temples like Meenakshi Amman Temple, Brihadeeswara Temple, and Rameswaram.";
  } else if (input.includes("food")) {
    response = "Popular foods include Dosa, Idli, Pongal, Sambar, and Chicken 65.";
  } else if (input.includes("festival")) {
    response = "Major festivals in Tamil Nadu are Pongal, Karthigai Deepam, and Tamil New Year.";
  } else if (input.includes("culture") || input.includes("heritage")) {
    response = "Tamil Nadu has a rich cultural heritage with classical music, Bharatanatyam, temple architecture, and traditional festivals.";
  }

  responseBox.innerText = response;
  document.getElementById("userInput").value = "";
}

// Voice recognition using Web Speech API
function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Sorry, your browser does not support speech recognition.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    const voiceText = event.results[0][0].transcript;
    document.getElementById("userInput").value = voiceText;
    sendMessage();
  };

  recognition.onerror = function(event) {
    alert("Voice recognition error: " + event.error);
  };
}  

function handleFeedbackSubmit(event) {
  event.preventDefault();
  const feedbackText = document.getElementById("feedbackText").value.trim();
  if (feedbackText !== "") {
    alert("Feedback submitted successfully!");
    document.getElementById("feedbackForm").reset();
  } else {
    alert("Please enter feedback before submitting.");
  }
}




// Quiz questions
const quizQuestions = [
  {
    question: "Which temple is known as the 'Big Temple'?",
    options: ["Meenakshi Temple", "Brihadeeswarar Temple", "Kapaleeshwarar Temple", "Ranganathaswamy Temple"],
    answer: "Brihadeeswarar Temple"
  },
  {
    question: "Pongal is a festival celebrated to honor?",
    options: ["Sun God", "Rain God", "Moon", "Wind God"],
    answer: "Sun God"
  },
  {
    question: "Which classical dance form originates from Tamil Nadu?",
    options: ["Kathak", "Kuchipudi", "Bharatanatyam", "Odissi"],
    answer: "Bharatanatyam"
  },
  {
    question: "Which city is famous for 'Jigarthanda' drink?",
    options: ["Chennai", "Madurai", "Coimbatore", "Salem"],
    answer: "Madurai"
  },
  {
    question: "Which heritage site is a UNESCO World Heritage monument?",
    options: ["Shore Temple, Mahabalipuram", "Thiruvannamalai Temple", "Madurai Palace", "Ooty Lake"],
    answer: "Shore Temple, Mahabalipuram"
  }
];

let currentQuestionIndex = 0;
let userScore = 0;

function showQuizQuestion() {
  const container = document.getElementById("quizContainer");
  container.innerHTML = "";

  if (currentQuestionIndex < quizQuestions.length) {
    const q = quizQuestions[currentQuestionIndex];
    const questionHTML = `
      <div class="question-box">
        <h3>Q${currentQuestionIndex + 1}: ${q.question}</h3>
        ${q.options.map(opt => `
          <label><input type="radio" name="option" value="${opt}"> ${opt}</label>
        `).join("")}
        <button onclick="checkAnswer()">Check</button>
        <p id="feedback"></p>
      </div>
    `;
    container.innerHTML = questionHTML;
  } else {
    container.innerHTML = `<button onclick="submitQuiz()">Submit Quiz</button>`;
  }
}

function checkAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  const feedback = document.getElementById("feedback");

  if (!selected) {
    feedback.innerText = "Please select an answer.";
    feedback.className = "incorrect";
    return;
  }

  const correctAnswer = quizQuestions[currentQuestionIndex].answer;

  if (selected.value === correctAnswer) {
    feedback.innerText = "Correct!";
    feedback.className = "correct";
    userScore++;
  } else {
    feedback.innerText = `Wrong! Correct answer is: ${correctAnswer}`;
    feedback.className = "incorrect";
  }

  // Delay to next question
  setTimeout(() => {
    currentQuestionIndex++;
    showQuizQuestion();
  }, 1500);
}

function submitQuiz() {
  document.getElementById("quizContainer").classList.add("hidden");
  document.getElementById("scoreChartContainer").classList.remove("hidden");

  // Pie chart display
  const ctx = document.getElementById("scoreChart").getContext("2d");
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Correct', 'Incorrect'],
      datasets: [{
        data: [userScore, quizQuestions.length - userScore],
        backgroundColor: ['#4CAF50', '#F44336'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// Show quiz section
document.querySelectorAll(".nav-bar a")[4].addEventListener('click', () => {
  showSection("quizSection");
  currentQuestionIndex = 0;
  userScore = 0;
  document.getElementById("quizContainer").classList.remove("hidden");
  document.getElementById("scoreChartContainer").classList.add("hidden");
  showQuizQuestion();
});

function handleFeedbackSubmit(event) {
  event.preventDefault();
  const feedbackText = document.getElementById("feedbackText").value.trim();
  if (feedbackText !== "") {
    alert("Feedback submitted successfully!");
    document.getElementById("feedbackForm").reset();
  } else {
    alert("Please enter feedback before submitting.");
  }
}

// Feedback nav button
document.querySelectorAll(".nav-bar a")[3].addEventListener('click', () => {
  showSection("feedbackSection");
});

// Feedback form event
document.getElementById("feedbackForm").addEventListener("submit", handleFeedbackSubmit);
