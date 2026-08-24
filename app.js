let questionBank = {};
let subjectList = [];
let novels = [];
let waecBank = {};

fetch("/api/data").then(r => r.json()).then(data => {
  questionBank = data.questionBank;
  subjectList = data.subjects;
  novels = data.novels || [];
  waecBank = data.waec || {};
  renderHomeSubjects();
}).catch(error => {
  console.error("Failed to load app data:", error);
});

function renderHomeSubjects() {
  const home = document.getElementById("home-subjects");

  if (home) {
    home.innerHTML = subjectList
      .map(subject => '<div class="subject">' + subject + '</div>')
      .join('');
  }
}

let lastSelectedSubjects = [0];
let resetSubjectsAfterExit = false;

  function updateSelection() {
  const selected = document.querySelectorAll(
    '#selection input[type="checkbox"]:checked'
  );

  const count = document.getElementById('selection-count');

  if (count) {
    count.textContent = selected.length + ' / 4 selected';
  }
}

function resetPracticeState() {
  questions = [];
  currentQuestion = 0;
  score = 0;
  answers = {};
  savedProgress = {};
  subjectPositions = {};

  Object.keys(subjectRanges).forEach(key => {
    delete subjectRanges[key];
  });
}

function practiceAgain() {

  resetPracticeState();
  lastSelectedSubjects = [];
  resetSubjectsAfterExit = false;

  document.getElementById('selection').innerHTML =
    '<div class="card">' +
    '<h2>Choose Your Subjects 📚</h2>' +
    '<p>Select exactly 4 subjects for your practice test.</p>' +
    '<div class="subjects">' +
    subjectList.map((subject, index) =>
      '<label class="subject">' +
      '<input type="checkbox" value="' + index + '"' +
      (!resetSubjectsAfterExit && lastSelectedSubjects.includes(index) ? ' checked' : '') +
      (subject === "English Language" ? ' checked disabled onclick="return false;"' : '') +
      ' onchange="updateSelection()">' +
      subject +
      '</label>'
    ).join('') +
    '</div>' +
    '<p class="selection-count" id="selection-count">' +
    '0 / 4 selected' +
    '</p>' +
    '<button class="start-btn" onclick="beginTest()">Start Test</button>' +
    '<button class="back-btn" onclick="goHome()">← Back</button>' +
    '</div>';

  document.getElementById('selection').style.display = 'block';

  updateSelection();

  window.scrollTo(0, 0);


}

    document.getElementById('settings-button').onclick = function() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('settings').style.display = 'block';
  window.scrollTo(0, 0);
};


function applyDarkMode(enabled) {
  document.body.classList.toggle('dark-mode', enabled);
  document.body.style.background = enabled ? '#121212' : '';
  document.body.style.color = enabled ? '#ffffff' : '';

  document.querySelectorAll('.card').forEach(card => {
    card.style.background = enabled ? '#1e1e1e' : '';
    card.style.color = enabled ? '#ffffff' : '';
  });
}

const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeSlider = document.getElementById('dark-mode-slider');

function updateDarkModeToggle(enabled) {
  if (!darkModeToggle || !darkModeSlider) return;

  darkModeToggle.checked = enabled;
  darkModeSlider.style.background = enabled ? '#333' : '#ccc';
  darkModeSlider.style.boxShadow = enabled
    ? 'inset 25px 0 0 #fff'
    : 'none';
}

if (darkModeToggle) {
  darkModeToggle.onchange = function() {
    const enabled = darkModeToggle.checked;

    localStorage.setItem('anox-dark-mode', enabled);
    applyDarkMode(enabled);
    updateDarkModeToggle(enabled);
  };
}

const savedDarkMode =
  localStorage.getItem('anox-dark-mode') === 'true';

applyDarkMode(savedDarkMode);
updateDarkModeToggle(savedDarkMode);


const fontSizeButton = document.getElementById('font-size-button');

if (fontSizeButton) {
  fontSizeButton.onclick = function() {

    const overlay = document.createElement('div');

    overlay.id = 'font-size-popup';

    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';

    overlay.innerHTML =
      '<div style="background:white;width:85%;max-width:360px;padding:25px;border-radius:18px;text-align:center;">' +
      '<h2>FONT SIZE</h2>' +
      '<button class="start-btn font-choice" data-size="small" style="width:100%;margin-top:10px;">Small</button>' +
      '<button class="start-btn font-choice" data-size="medium" style="width:100%;margin-top:10px;">Medium</button>' +
      '<button class="start-btn font-choice" data-size="large" style="width:100%;margin-top:10px;">Large</button>' +
      '<button id="close-font-size" class="back-btn" style="width:100%;margin-top:15px;">Cancel</button>' +
      '</div>';

    document.body.appendChild(overlay);

    document.querySelectorAll('.font-choice').forEach(button => {
      button.onclick = function() {
        saveFontSize(button.dataset.size);
        overlay.remove();
      };
    });

    document.getElementById('close-font-size').onclick = function() {
      overlay.remove();
    };
  };
}


function applyFontSize(size) {
  const sizes = {
    small: '14px',
    medium: '16px',
    large: '19px'
  };

  document.documentElement.style.fontSize =
    sizes[size] || sizes.medium;
}

function saveFontSize(size) {
  localStorage.setItem('anox-font-size', size);
  applyFontSize(size);
}

const savedFontSize =
  localStorage.getItem('anox-font-size') || 'medium';

applyFontSize(savedFontSize);


function updateBestJambScore() {
  const jambScore = Math.round((score / 180) * 400);

  const savedBest =
    Number(localStorage.getItem('anox-best-jamb-score') || 0);

  if (jambScore > savedBest) {
    localStorage.setItem('anox-best-jamb-score', jambScore);
  }

  const best =
    Math.max(jambScore, savedBest);

  const progressBest =
    document.getElementById('progress-best');

  if (progressBest) {
    progressBest.textContent = best + ' / 400';
  }
}

function loadBestJambScore() {
  const best =
    Number(localStorage.getItem('anox-best-jamb-score') || 0);

  const progressBest =
    document.getElementById('progress-best');

  if (progressBest) {
    progressBest.textContent = best + ' / 400';
  }
}

loadBestJambScore();


function startPractice() {
  if (subjectList.length === 0) {
    alert('Loading subjects, please try again in a moment.');
    return;
  }

  document.getElementById('home').style.display = 'none';
  practiceAgain();
}

    function goHome() {
      document.getElementById('selection').style.display = 'none';
      document.getElementById('settings').style.display = 'none';
      document.getElementById('novels').style.display = 'none';
      document.getElementById('waec').style.display = 'none';
      document.getElementById('home').style.display = 'block';

      window.scrollTo(0, 0);
    }

   window.updateSelection = function() {    
  const selected = document.querySelectorAll(
        '#selection input[type="checkbox"]:checked'
      );

      const count = document.getElementById('selection-count');

      count.textContent = selected.length + ' / 4 selected';
      
const checkboxes = document.querySelectorAll(
        '#selection input[type="checkbox"]'
      );

      checkboxes.forEach(input => {

        if (!input.checked && selected.length >= 4) {
          input.disabled = true;
        } else {
          input.disabled = false;
        }

    });
    }

    let questions = [];
let currentQuestion = 0;
let score = 0;
let answers = {};
let savedProgress = {};
let subjectPositions = {};
const subjectRanges = {};
let selectedSubjects = [];
let timerInterval = null;

    function beginTest() {  
  const selected = document.querySelectorAll(
    '#selection input[type="checkbox"]:checked'
  );

  // removed

  if (selected.length !== 4) {
    alert('Please select exactly 4 subjects.');
    return;
  }


selectedSubjects = Array.from(selected).map(input => {
  return subjectList[Number(input.value)];
});

lastSelectedSubjects = Array.from(selected).map(input =>
  Number(input.value)
);

  
  selectedSubjects.forEach(subject => {

  if (questionBank[subject]) {

    const required = subject === "English Language" ? 60 : 40;

    let selectedQuestions;

    if (subject === "English Language") {

      const comprehension = questionBank[subject]
        .filter(question => question.type === "comprehension");

      const normalQuestions = questionBank[subject]
        .filter(question => question.type !== "comprehension")
        .sort(() => Math.random() - 0.5);

      selectedQuestions = [
        ...comprehension.slice(0, 5),
        ...normalQuestions.slice(0, required - 5)
      ];

    } else {

      const shuffled = [...questionBank[subject]]
        .sort(() => Math.random() - 0.5);

      selectedQuestions = shuffled.slice(0, required);
    }

    selectedQuestions.forEach(question => {

      questions.push({
        ...question,
        subject: subject
      });

    });
  }

});

  if (questions.length === 0) {
    alert('Questions for your selected subjects are not available yet.');
    return;
  }

  
  let timeLeft = 2 * 60 * 60;

  timerInterval = setInterval(() => {

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const timer = document.getElementById('timer');

    if (timer) {
      timer.textContent =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Time is up!');
      document.getElementById("selection").innerHTML =
        '<div class="card" style="text-align:center;">' +
        '<h2>Time is up! ⏰</h2>' +
        '<p>Your score:</p>' +
        '<h1>' + score + ' / ' + questions.length + '</h1>' +
        '</div>';
      return;
    }

    timeLeft--;

  }, 1000);

  
  let start = 0;

  selectedSubjects.forEach(subject => {
    const count = subject === "English Language" ? 60 : 40;

    subjectRanges[subject] = {
      start: start,
      end: start + count - 1
    };

    subjectPositions[subject] = 0;
    start += count;
  });

  document.getElementById("selection").innerHTML =
  '<div class="card">' +
  '<div id="exam-topbar" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">' +
'<button id="exam-back-button" type="button" style="font-size:28px;border:none;background:none;cursor:pointer;padding:0;">←</button>' +
'<div id="subject-tabs"></div>' +
'<button id="calculator-button" type="button" style="font-size:22px;border:none;background:none;cursor:pointer;">🧮</button>' +
'</div>' +
'<div id="timer" style="text-align:center;font-size:24px;font-weight:bold;margin:15px 0;">02:00:00</div>' +
'<p id="question-subject"></p>' +  
'<h2 id="question-number"></h2>' +
  '<div id="question-passage"></div>' + '<p id="question-text"></p>' +
  '<div id="answer-options"></div>' +
  '<div id="question-numbers"></div>' +
'<button id="next-button" class="start-btn" style="margin-top:20px;">Next</button>' +
'<button class="back-btn" style="margin-top:10px;" onclick="confirmFinish()">Finish</button>' +
'</div>';

//alert('DEBUG: questions=' + questions.length + ' current=' + currentQuestion);
showQuestion();

document.getElementById('exam-back-button').onclick = function() {

  const overlay = document.createElement('div');

  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.55)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';
  overlay.style.padding = '20px';
  overlay.style.boxSizing = 'border-box';

  const darkMode = document.body.classList.contains('dark-mode');

  const cardBackground = darkMode ? '#1e1e1e' : 'white';
  const cardColor = darkMode ? '#ffffff' : '#111111';
  const cancelBackground = darkMode ? '#2a2a2a' : 'white';
  const cancelColor = darkMode ? '#ffffff' : '#111111';
  const cancelBorder = darkMode ? '#555555' : '#d7deea';
  const messageColor = darkMode ? '#cccccc' : '#666666';

  overlay.innerHTML =
    '<div style="background:' + cardBackground + ';color:' + cardColor + ';width:100%;max-width:380px;border-radius:20px;padding:25px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.25);">' +
    '<div style="font-size:42px;margin-bottom:10px;">⚠️</div>' +
    '<h2 style="margin:0 0 10px;">Exit Practice?</h2>' +
    '<p style="margin:0 0 25px;color:' + messageColor + ';">Are you sure you want to exit this practice?</p>' +
    '<div style="display:flex;gap:10px;">' +
    '<button id="cancel-exit" style="flex:1;padding:13px;border:1px solid ' + cancelBorder + ';border-radius:12px;background:' + cancelBackground + ';color:' + cancelColor + ';font-size:16px;">Cancel</button>' +
    '<button id="confirm-exit" style="flex:1;padding:13px;border:none;border-radius:12px;background:#0b5cff;color:white;font-size:16px;">Exit Practice</button>' +
    '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  document.getElementById('cancel-exit').onclick = function() {
    overlay.remove();
  };

  document.getElementById('confirm-exit').onclick = function() {
    clearInterval(timerInterval);

    questions = [];
    currentQuestion = 0;
    score = 0;
    answers = {};
    savedProgress = {};
    subjectPositions = {};

    Object.keys(subjectRanges).forEach(key => {
      delete subjectRanges[key];
    });

    resetSubjectsAfterExit = true;
    overlay.remove();
    practiceAgain();
  };

};

document.getElementById('next-button').addEventListener('click', function() {
  window.nextQuestion();
});

document.getElementById('calculator-button').addEventListener('click', function() {

  if (document.getElementById('calculator-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'calculator-overlay';

  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.right = '0';
  overlay.style.width = '55%';
  overlay.style.height = '60%';
  overlay.style.background = 'white';
  overlay.style.zIndex = '10000';
  overlay.style.padding = '15px';
  overlay.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  overlay.style.borderRadius = '0 0 0 18px';

  overlay.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;">' +
      '<strong style="font-size:20px;">Calculator</strong>' +
      '<button id="calculator-close" type="button" style="font-size:22px;border:none;background:none;">✕</button>' +
    '</div>' +

    '<input id="calculator-display" type="text" readonly ' +
      'style="width:100%;font-size:24px;text-align:right;margin:15px 0;padding:10px;border:1px solid #ccc;border-radius:8px;">' +

    '<div id="calculator-buttons" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">' +
      '<button data-value="7">7</button>' +
      '<button data-value="8">8</button>' +
      '<button data-value="9">9</button>' +
      '<button data-value="/">÷</button>' +

      '<button data-value="4">4</button>' +
      '<button data-value="5">5</button>' +
      '<button data-value="6">6</button>' +
      '<button data-value="*">×</button>' +

      '<button data-value="1">1</button>' +
      '<button data-value="2">2</button>' +
      '<button data-value="3">3</button>' +
      '<button data-value="-">−</button>' +

      '<button data-value="0">0</button>' +
      '<button data-value=".">.</button>' +
      '<button id="calculator-equals">=</button>' +
      '<button data-value="+">+</button>' +

      '<button id="calculator-clear" style="grid-column:span 2;">C</button>' +
      '<button id="calculator-backspace">⌫</button>' +
    '</div>';

  document.body.appendChild(overlay);

  const display = document.getElementById('calculator-display');

  overlay.querySelectorAll('[data-value]').forEach(button => {
    button.onclick = function() {
      display.value += button.dataset.value;
    };
  });

  document.getElementById('calculator-clear').onclick = function() {
    display.value = '';
  };

  document.getElementById('calculator-backspace').onclick = function() {
    display.value = display.value.slice(0, -1);
  };

  document.getElementById('calculator-equals').onclick = function() {
    try {
      if (!display.value) return;

      display.value = Function(
        '"use strict"; return (' + display.value + ')'
      )();
    } catch {
      display.value = 'Error';
    }
  };

  document.getElementById('calculator-close').onclick = function() {
    overlay.remove();
  };

});

document.querySelector('.back-btn').onclick = function() {
  window.confirmFinish();
};

}

function showQuestion() {
    const question = questions[currentQuestion];

    subjectPositions[question.subject] =
      currentQuestion - subjectRanges[question.subject].start;

    savedProgress[question.subject] =
      subjectPositions[question.subject];

    document.getElementById('question-subject').textContent =
      question.subject;

    const range = subjectRanges[question.subject];

    const localNumber =
      currentQuestion - range.start + 1;

    document.getElementById('question-number').textContent =
      'Question ' + localNumber + ' of ' +
      (range.end - range.start + 1);

    const passageContainer =
      document.getElementById('question-passage');

    if (question.type === 'comprehension' && question.passage) {
      passageContainer.textContent = question.passage;
      passageContainer.style.display = 'block';
      passageContainer.style.padding = '15px';
      passageContainer.style.margin = '15px 0';
      passageContainer.style.border = '1px solid #d7deea';
      passageContainer.style.borderRadius = '12px';
      passageContainer.style.lineHeight = '1.6';
      passageContainer.style.background = 'transparent';
    } else {
      passageContainer.textContent = '';
      passageContainer.style.display = 'none';
    }

    document.getElementById('question-text').textContent =
      question.question;

    const optionsContainer =
      document.getElementById('answer-options');

    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {

      const button = document.createElement('button');

      button.textContent = option;

      button.style.width = '100%';
      button.style.padding = '15px';
      button.style.marginTop = '10px';
      button.style.border = '1px solid #d7deea';
      button.style.borderRadius = '12px';
      button.style.background = 'white';
      button.style.fontSize = '16px';

      if (answers[currentQuestion] !== undefined) {
        if (index === answers[currentQuestion]) {
          button.style.border = '3px solid #0b5cff';
        }
      }

      button.onclick = () => {

        const previousAnswer = answers[currentQuestion];

        // Remove the selection indicator from all options
        optionsContainer
          .querySelectorAll('button')
          .forEach(btn => {
            btn.style.border = '1px solid #d7deea';
          });

        // Update the score when changing an existing answer
        if (previousAnswer !== undefined) {
          if (previousAnswer === question.answer) {
            score--;
          }
        }

        answers[currentQuestion] = index;

        // Show only which option the user selected
        button.style.border = '3px solid #0b5cff';

        if (index === question.answer) {
          score++;
        }

        updateQuestionNumbers();
      };

      optionsContainer.appendChild(button);
    });

    updateSubjectTabs();
    updateQuestionNumbers();
  }

  function updateSubjectTabs() {

    const tabs = document.getElementById('subject-tabs');

    tabs.innerHTML = '';

    selectedSubjects.forEach(subject => {

      const button = document.createElement('button');

      button.textContent = subject;

      button.style.margin = '4px';
      button.style.padding = '8px 12px';
      button.style.borderRadius = '10px';
      button.style.border = '1px solid #d7deea';

      button.onclick = () => {

        const range = subjectRanges[subject];

         currentQuestion =
         range.start + (savedProgress[subject] || 0);

        showQuestion();
      };

      tabs.appendChild(button);
    });
  }

  function updateQuestionNumbers() {

    const container =
      document.getElementById('question-numbers');

    const subject =
      questions[currentQuestion].subject;

    const range = subjectRanges[subject];

    container.innerHTML = '';

    for (
      let i = range.start;
      i <= range.end;
      i++
    ) {

      const button = document.createElement('button');

      button.textContent =
        i - range.start + 1;

      button.style.margin = '3px';
      button.style.padding = '8px 10px';
      button.style.borderRadius = '8px';
      button.style.border = '1px solid #d7deea';

      if (answers[i] !== undefined) {
        button.classList.add('answered');
      }

      if (i === currentQuestion) {
        button.style.fontWeight = 'bold';
        button.style.border = '2px solid #000';
      }

      button.onclick = () => {
  currentQuestion = i;
  savedProgress[subject] = i - range.start;
  showQuestion();
  };

      container.appendChild(button);
    }
  }

window.nextQuestion = function() {


    const subject =
      questions[currentQuestion].subject;

    const range = subjectRanges[subject];

    if (currentQuestion < range.end) {

  currentQuestion++;
  savedProgress[subject] =
    currentQuestion - range.start;

  showQuestion();
  return;
}

    const subjectIndex =
      selectedSubjects.indexOf(subject);

    if (subjectIndex < selectedSubjects.length - 1) {

      const nextSubject =
        selectedSubjects[subjectIndex + 1];

      currentQuestion =
        subjectRanges[nextSubject].start +
        subjectPositions[nextSubject];

      showQuestion();
      return;
    }

    document.getElementById("selection").innerHTML =
      '<div class="card" style="text-align:center;">' +
      '<h2>Test Complete 🎉</h2>' +
'<p>Your score:</p>' +
'<h1>' + score + ' / ' + questions.length + '</h1>' +
'<button class="start-btn" onclick="showCorrections()">' +
'View Corrections</button>' +
'<button class="start-btn" onclick="resetPracticeState(); practiceAgain()" style="margin-top:20px;">' +
  'Practice Again</button>' +
 '</div>';

}

 window.showCorrections = function() {  

    let html =
      '<div class="card">' +
      '<h2>Corrections 📖</h2>';

    questions.forEach((question, index) => {

      const userAnswer = answers[index];
      const correctAnswer = question.answer;

      html +=
        '<div style="margin-top:20px;padding:15px;border:1px solid #ddd;border-radius:12px;">' +
        '<b>Question ' + (index + 1) + '</b>' +
        '<p>' + question.question + '</p>' +
        '<p>Your answer: ' +
        (userAnswer !== undefined
          ? question.options[userAnswer]
          : 'Not answered') +
        '</p>' +
        '<p>Correct answer: ' +
        question.options[correctAnswer] +
        '</p>' +
        '</div>';

    });

    html +=
  '<button class="start-btn" onclick="showResults()" style="margin-top:20px;">' +
  '← Back to Results</button>' +
  '<button class="start-btn" onclick="resetPracticeState(); practiceAgain()" style="margin-top:10px;">' +
  'Practice Again</button>' +
  '</div>';    

    document.getElementById("selection").innerHTML = html;
  }

    window.confirmFinish = function() {

  const overlay = document.createElement('div');

  overlay.id = 'finish-confirmation';

  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.5)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';

  overlay.innerHTML =
    '<div style="background:white;width:85%;max-width:360px;padding:25px;border-radius:18px;text-align:center;">' +
    '<h2>ARE YOU SURE?</h2>' +
    '<p>Are you sure you want to finish the test?</p>' +
    '<div style="display:flex;gap:10px;margin-top:20px;">' +
    '<button id="cancel-finish" class="back-btn" style="flex:1;">NO</button>' +
    '<button id="confirm-finish" class="start-btn" style="flex:1;">YES</button>' +
    '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  document.getElementById('cancel-finish').onclick = function() {
    overlay.remove();
  };

  document.getElementById('confirm-finish').onclick = function() {
    overlay.remove();
    clearInterval(timerInterval);
    updateBestJambScore();
    showResults();
  };
}

  window.showResults = function() {

    document.getElementById("selection").innerHTML =
      '<div class="card" style="text-align:center;">' +
      '<h2>Test Complete 🎉</h2>' +
      '<p>Your score:</p>' +
      '<h1>' + score + ' / 180</h1>' +
      '<p style="font-size:18px;font-weight:bold;">JAMB Score: ' +
      Math.round((score / 180) * 400) + ' / 400</p>' +
      '<button class="start-btn" onclick="showCorrections()">' +
      'View Corrections</button>' +
      '<button class="start-btn" onclick="practiceAgain()" style="margin-top:10px;">' +
      'Practice Again</button>' +
      '</div>';
  }


   // Splash screen is handled by CSS animation.



function openWaec() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('selection').style.display = 'none';
  document.getElementById('settings').style.display = 'none';
  document.getElementById('novels').style.display = 'none';

  const waecScreen = document.getElementById('waec');
  if (!waecScreen) return;

  waecScreen.style.display = 'block';

  const subjects = [
    "English Language",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Economics",
    "Government",
    "Literature in English",
    "Geography",
    "Commerce",
    "Accounting",
    "Agricultural Science",
    "Computer Studies",
    "Civic Education",
    "History"
  ];

  const list = document.getElementById('waec-subjects');

  list.innerHTML = subjects.map(subject =>
    '<button class="start-btn" type="button" ' +
    'style="width:100%;margin-top:12px;text-align:left;" ' +
    'onclick="startWaecPractice(\'' + subject.replace("'", "\\'") + '\')">' +
    '📝 ' + subject +
    '</button>'
  ).join('');
}


let waecQuestions = [];
let waecCurrentQuestion = 0;
let waecAnswers = {};
let waecSubject = '';

function startWaecPractice(subject) {
  const bank = waecBank[subject];

  if (!bank || bank.length === 0) {
    alert('No WAEC questions available for ' + subject + ' yet.');
    return;
  }

  waecSubject = subject;

  // Shuffle all questions and randomly select 30 for this attempt
  waecQuestions = [...bank]
    .sort(() => Math.random() - 0.5)
    .slice(0, 30);

  waecCurrentQuestion = 0;
  waecAnswers = {};

  document.getElementById('home').style.display = 'none';
  document.getElementById('waec').style.display = 'none';
  document.getElementById('settings').style.display = 'none';
  document.getElementById('novels').style.display = 'none';
  document.getElementById('selection').style.display = 'block';

  showWaecQuestion();
}

function showWaecQuestion() {
  const question = waecQuestions[waecCurrentQuestion];

  if (!question) {
    finishWaecTest();
    return;
  }

  const selection = document.getElementById('selection');

  selection.innerHTML =
    '<div class="card">' +
      '<button class="syllabus-back-icon" type="button" onclick="event.preventDefault(); event.stopPropagation(); confirmWaecExit(); return false;">←</button>' +
      '<p style="margin-top:10px;">WAEC Practice • ' + waecSubject + '</p>' +
      '<h2>Question ' + (waecCurrentQuestion + 1) + ' of ' +
        waecQuestions.length + '</h2>' +
      '<p style="font-size:18px;font-weight:600;">' +
        question.question +
      '</p>' +
      '<div id="waec-answer-options"></div>' +
      '<button id="waec-next-button" class="start-btn" ' +
        'style="width:100%;margin-top:20px;" disabled>' +
        (waecCurrentQuestion === waecQuestions.length - 1
          ? 'Finish Test'
          : 'Next Question') +
      '</button>' +
    '</div>';

  const options = document.getElementById('waec-answer-options');

  question.options.forEach((option, index) => {
    const button = document.createElement('button');

    button.type = 'button';
    button.textContent = option;
    button.style.width = '100%';
    button.style.padding = '15px';
    button.style.marginTop = '10px';
    button.style.border = '1px solid #d7deea';
    button.style.borderRadius = '12px';
    const darkMode = document.body.classList.contains('dark-mode');

    button.style.background = darkMode ? '#1f2937' : 'white';
    button.style.color = darkMode ? 'white' : '#172033';
    button.style.fontSize = '16px';

    button.onclick = function() {
      waecAnswers[waecCurrentQuestion] = index;

      const darkMode = document.body.classList.contains('dark-mode');

      options.querySelectorAll('button').forEach(btn => {
        btn.style.background = darkMode ? '#1f2937' : 'white';
        btn.style.color = darkMode ? 'white' : '#172033';
      });

      button.style.background = darkMode ? '#334d70' : '#e4ecff';
      button.style.color = darkMode ? 'white' : '#172033';

      document.getElementById('waec-next-button').disabled = false;
    };

    options.appendChild(button);
  });

  document.getElementById('waec-next-button').onclick = function() {
    if (waecAnswers[waecCurrentQuestion] === undefined) return;

    waecCurrentQuestion++;
    showWaecQuestion();
  };
}

function finishWaecTest() {
  let score = 0;

  waecQuestions.forEach((question, index) => {
    if (waecAnswers[index] === question.answer) {
      score++;
    }
  });

  document.getElementById('selection').innerHTML =
    '<div class="card" style="text-align:center;">' +
      '<h2>WAEC Test Complete 🎉</h2>' +
      '<p>Your score:</p>' +
      '<h1>' + score + ' / ' + waecQuestions.length + '</h1>' +
      '<button class="start-btn" style="width:100%;" ' +
        'onclick="showWaecCorrections()">' +
        'View Corrections</button>' +
      '<button class="back-btn" style="width:100%;margin-top:10px;" ' +
        'onclick="openWaec()">' +
        'Back to WAEC</button>' +
    '</div>';
}

function showWaecCorrections() {
  let html =
    '<div class="card">' +
      '<h2>WAEC Corrections</h2>';

  waecQuestions.forEach((question, index) => {
    const chosen = waecAnswers[index];

    html +=
      '<div style="text-align:left;margin-top:25px;">' +
        '<p><strong>Question ' + (index + 1) + '</strong></p>' +
        '<p>' + question.question + '</p>' +
        '<p>Your answer: ' +
          (chosen !== undefined ? question.options[chosen] : 'Not answered') +
        '</p>' +
        '<p>Correct answer: <strong>' +
          question.options[question.answer] +
        '</strong></p>' +
      '</div>';
  });

  html +=
    '<button class="back-btn" style="width:100%;margin-top:20px;" ' +
      'onclick="openWaec()">← Back to WAEC</button>' +
    '</div>';

  document.getElementById('selection').innerHTML = html;
}

let waecPracticeActive = false;

window.addEventListener('popstate', function() {
  if (waecPracticeActive) {
    history.pushState(null, '', location.href);
    confirmWaecExit();
  }
});

function confirmWaecExit() {
  const oldOverlay = document.getElementById('waec-exit-confirmation');
  if (oldOverlay) oldOverlay.remove();

  const overlay = document.createElement('div');
  overlay.id = 'waec-exit-confirmation';

  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.55)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';
  overlay.style.padding = '20px';
  overlay.style.boxSizing = 'border-box';

  const darkMode = document.body.classList.contains('dark-mode');
  const cardBackground = darkMode ? '#1e1e1e' : 'white';
  const cardColor = darkMode ? '#ffffff' : '#111111';
  const cancelBackground = darkMode ? '#2a2a2a' : 'white';
  const cancelColor = darkMode ? '#ffffff' : '#111111';
  const cancelBorder = darkMode ? '#555555' : '#d7deea';
  const messageColor = darkMode ? '#cccccc' : '#666666';

  overlay.innerHTML =
    '<div style="background:' + cardBackground + ';color:' + cardColor + ';width:100%;max-width:380px;border-radius:20px;padding:25px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.25);">' +
      '<div style="font-size:42px;margin-bottom:10px;">⚠️</div>' +
      '<h2 style="margin:0 0 10px;">Exit WAEC Practice?</h2>' +
      '<p style="margin:0 0 25px;color:' + messageColor + ';">Are you sure you want to exit this practice?</p>' +
      '<div style="display:flex;gap:10px;">' +
        '<button id="waec-cancel-exit" style="flex:1;padding:13px;border:1px solid ' + cancelBorder + ';border-radius:12px;background:' + cancelBackground + ';color:' + cancelColor + ';font-size:16px;">Cancel</button>' +
        '<button id="waec-confirm-exit" style="flex:1;padding:13px;border:none;border-radius:12px;background:#0b5cff;color:white;font-size:16px;">Exit Practice</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  document.getElementById('waec-cancel-exit').onclick = function() {
    overlay.remove();
  };

  document.getElementById('waec-confirm-exit').onclick = function() {
    overlay.remove();

    waecQuestions = [];
    waecCurrentQuestion = 0;
    waecAnswers = {};
    waecSubject = '';
    waecPracticeActive = false;

    const selection = document.getElementById('selection');
    if (selection) {
      selection.innerHTML = '';
      selection.style.display = 'none';
    }

    document.getElementById('waec').style.display = 'none';
    document.getElementById('home').style.display = 'block';

    window.scrollTo(0, 0);
  };
}


function openNovels() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('selection').style.display = 'none';
  document.getElementById('settings').style.display = 'none';

  const novelsScreen = document.getElementById('novels');
  if (!novelsScreen) return;

  novelsScreen.style.display = 'block';

  novelsScreen.innerHTML =
    '<div class="card">' +
      '<button class="syllabus-back-icon" type="button" onclick="goHome()">←</button>' +
      '<h2>📚 JAMB Novels</h2>' +
      '<p>Select a novel to view its summary.</p>' +
      '<div id="novels-list"></div>' +
    '</div>';

  const list = document.getElementById('novels-list');

  if (novels.length === 0) {
    list.innerHTML =
      '<p style="text-align:center;margin-top:20px;">No novels available yet.</p>';
  } else {
    list.innerHTML = novels.map((novel, index) =>
      '<button class="start-btn" type="button" ' +
      'style="width:100%;margin-top:12px;text-align:left;" ' +
      'onclick="openNovel(' + index + ')">' +
      '📖 ' + novel.title +
      '<br><small>' + novel.author + '</small>' +
      '</button>'
    ).join('');
  }

  window.scrollTo(0, 0);
}

function openNovel(index) {
  const novel = novels[index];
  if (!novel) return;

  const container = document.getElementById('novels');
  if (!container) return;

  const charactersHTML = novel.characters
    ? novel.characters.map(character =>
        '<p style="text-align:left;margin:10px 0;">' +
        '<strong>' + character.name + '</strong> — ' +
        character.role +
        '</p>'
      ).join('')
    : '<p>No character information available yet.</p>';

  container.innerHTML =
    '<div class="card">' +
      '<button class="syllabus-back-icon" type="button" onclick="openNovels()">←</button>' +
      '<h2>📖 ' + novel.title + '</h2>' +
      '<p><strong>Author:</strong> ' + novel.author + '</p>' +
      '<h3 style="text-align:left;margin-top:24px;">Summary</h3>' +
      '<p style="text-align:left;line-height:1.7;">' +
        (novel.summary || 'Summary coming soon.') +
      '</p>' +
      '<h3 style="text-align:left;margin-top:24px;">Main Characters</h3>' +
      charactersHTML +
    '</div>';

  window.scrollTo(0, 0);
}
