const quizData = [
    {
      question: "HTML'in açılımı nedir?",
      a: "HyperText Markup Language",
      b: "High Technical Modern Language",
      c: "HyperTransfer Markup Language",
      d: "HyperText Making Language",
      e: "Home Tool Markup Language",
      correct: "a"
    },
    {
      question: "Aşağıdakilerden hangisi HTML'de bir başlık etiketidir?",
      a: "<paragraph>",
      b: "<header>",
      c: "<h1>",
      d: "<title>",
      e: "<heading>",
      correct: "c"
    },
    {
      question: "HTML'de bir bağlantı (link) oluşturmak için hangi etiket kullanılır?",
      a: "<link>",
      b: "<a>",
      c: "<href>",
      d: "<url>",
      e: "<hyperlink>",
      correct: "b"
    },
    {
      question: "HTML'de resim eklemek için hangi etiket kullanılır?",
      a: "<image>",
      b: "<picture>",
      c: "<photo>",
      d: "<img>",
      e: "<graphics>",
      correct: "d"
    },
    {
      question: "HTML formlarında kullanıcıdan metin girişi almak için hangi etiket kullanılır?",
      a: "<textbox>",
      b: "<input type=\"text\">",
      c: "<textinput>",
      d: "<textfield>",
      e: "<form>",
      correct: "b"
    },
    {
      question: "Aşağıdakilerden hangisi HTML'de bir tabloyu tanımlar?",
      a: "<table>",
      b: "<grid>",
      c: "<data>",
      d: "<tab>",
      e: "<spreadsheet>",
      correct: "a"
    },
    {
      question: "HTML belgesinin başlık kısmını tanımlayan etiket hangisidir?",
      a: "<header>",
      b: "<head>",
      c: "<title>",
      d: "<top>",
      e: "<h1>",
      correct: "b"
    },
    {
      question: "HTML'de sırasız liste oluşturmak için hangi etiket kullanılır?",
      a: "<list>",
      b: "<ol>",
      c: "<ul>",
      d: "<dl>",
      e: "<li>",
      correct: "c"
    },
    {
      question: "Aşağıdakilerden hangisi HTML belgesinin kök elemanıdır?",
      a: "<body>",
      b: "<head>",
      c: "<document>",
      d: "<root>",
      e: "<html>",
      correct: "e"
    },
    {
      question: "HTML'de paragraf oluşturmak için hangi etiket kullanılır?",
      a: "<p>",
      b: "<para>",
      c: "<paragraph>",
      d: "<text>",
      e: "<section>",
      correct: "a"
    }
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const e_text = document.getElementById('e_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

loadQuiz()
function loadQuiz() {
    const currentQuizData = quizData[currentQuiz]
    
    deselectedAnswers()
    
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
    e_text.innerText = currentQuizData.e
  }

function deselectedAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false))
}

function getSelected() {
  let answer

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id
    }
  })
  return answer
}

submitBtn.addEventListener('click', () => {
  const answer = getSelected()

  //console.log(answer)

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++
    }
    currentQuiz++

    if (currentQuiz < quizData.length) {
      loadQuiz()
    } else {
      quiz.innerHTML = `
      <h2> Test tamamlandı, ${score * 10} puan aldınız🥳 </h2>
      <button class="submit" onClick="location.reload()"> Tekrar Dene 🌀  </button>

    `
    }
  }
})

