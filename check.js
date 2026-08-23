const questionBank = ${JSON.stringify(questionBank)};

  const subjectList = ${JSON.stringify(subjects)};
   let lastSelectedSubjects = [0];

  function practiceAgain() {

  document.getElementById('selection').innerHTML =
    '<div class="card">' +
    '<h2>Choose Your Subjects 📚</h2>' +
    '<p>Select exactly 4 subjects for your practice test.</p>' +
    '<div class="subjects">' +
    subjectList.map((subject, index) =>
      '<label class="subject">' +
      '<input type="checkbox" value="' + index + '"' +
      (lastSelectedSubjects.includes(index) ? ' checked' : '') +
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

    function startPractice() {  
    document.getElementById('home').style.display = 'none';
      document.getElementById('selection').style.display = 'block';
      updateSelection();

      window.scrollTo(0, 0);
    }

    function goHome() {
      document.getElementById('selection').style.display = 'none';
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

    function beginTest() {
      
  const selected = document.querySelectorAll(
    '#selection input[type="checkbox"]:checked'
  );

  // removed

  if (selected.length !== 4) {
    alert('Please select exactly 4 subjects.');
    return;
  }

let selectedSubjects;

selectedSubjects = Array.from(selected).map(input => {
  return subjectList[Number(input.value)];
});

lastSelectedSubjects = Array.from(selected).map(input =>
  Number(input.value)
);

  let questions = [];

  selectedSubjects.forEach(subject => {

  if (questionBank[subject]) {

    const required = subject === "English Language" ? 60 : 40;

    const shuffled = [...questionBank[subject]]
      .sort(() => Math.random() - 0.5);

    shuffled.slice(0, required).forEach(question => {

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

    let currentQuestion = 0;
  let score = 0;
  const answers = {};
  const savedProgress = {};  
const subjectPositions = {};

  let timeLeft = 2 * 60 * 60;

  const timerInterval = setInterval(() => {

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

  const subjectRanges = {};

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
  '<div id="subject-tabs"></div>' +
'<div id="timer" style="text-align:center;font-size:24px;font-weight:bold;margin:15px 0;">02:00:00</div>' +
'<p id="question-subject"></p>' +  
'<h2 id="question-number"></h2>' +
  '<p id="question-text"></p>' +
  '<div id="answer-options"></div>' +
  '<div id="question-numbers"></div>' +
  '<button id="next-button" class="start-btn" style="margin-top:20px;" onclick="nextQuestion()">Next</button>' +
'<button class="back-btn" style="margin-top:10px;" onclick="confirmFinish()">Finish</button>' +
'</div>';  

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
        button.disabled = true;

        if (index === answers[currentQuestion]) {
          button.style.background =
            index === question.answer ? '#d8f8df' : '#ffdcdc';
        }
      }

      button.onclick = () => {

        if (answers[currentQuestion] !== undefined) return;

        answers[currentQuestion] = index;

        if (index === question.answer) {
          score++;
          button.style.background = '#d8f8df';
        } else {
          button.style.background = '#ffdcdc';
        }

        optionsContainer
          .querySelectorAll('button')
          .forEach(btn => btn.disabled = true);

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

    container.innerHTML =
      '<p style="margin-top:20px;"><b>' +
      subject + ' Questions</b></p>';

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
        button.style.background = '#d8f8df';
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

    showQuestion();

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
'<button class="start-btn" onclick="practiceAgain()" style="margin-top:20px;">' +
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
  '<button class="start-btn" onclick="practiceAgain()" style="margin-top:10px;">' +
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
    showResults();
  };
}

  window.showResults = function() {

    document.getElementById("selection").innerHTML =
      '<div class="card" style="text-align:center;">' +
      '<h2>Test Complete 🎉</h2>' +
      '<p>Your score:</p>' +
      '<h1>' + score + ' / ' + questions.length + '</h1>' +
      '<button class="start-btn" onclick="showCorrections()">' +
      'View Corrections</button>' +
      '<button class="start-btn" onclick="practiceAgain()" style="margin-top:10px;">' +
      'Practice Again</button>' +
      '</div>';
  }


   // Splash screen is handled by CSS animation.

