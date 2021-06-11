import { Component, OnInit } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;
  questions = [{ 
    "id": "1",
    "text": "test question 1 text",
    "answers": [{"text": "flexbox can do some pretty awesome things when you mix flex alignments with auto margins. Shown below are three examples of controlling flex items via auto margins: default (no auto margin), pushing two items to the right (.me-auto), and pushing two items to the left (.ms-auto).", 
                  "correct": true, 
                  "explanation": "Answer 1 is false/correct because of reasons"},
                  {"text": "Answer 2 text", 
                  "correct": false, 
                  "explanation": "Answer 2 is false/correct because of reasons"},
                  {"text": "Answer 3 text", 
                  "correct": false, 
                  "explanation": "Answer 3 is false/correct because of reasons"},
                  {"text": "Answer 4 text", 
                  "correct": false, 
                  "explanation": "Answer 4 is false/correct because of reasons"}]
  },
  { 
    "id": "2",
    "imgSrc": "https://images.ctfassets.net/lzny33ho1g45/T5qqQQVznbZaNyxmHybDT/b76e0ff25a495e00647fa9fa6193a3c2/best-url-shorteners-00-hero.png?w=1520&fm=jpg&q=30&fit=thumb&h=760",
    "text": "test question 2 text",
    "answers": [{"text": "flexbox can do some pretty awesome things when you mix flex alignments with auto margins. Shown below are three examples of controlling flex items via auto margins: default (no auto margin), pushing two items to the right (.me-auto), and pushing two items to the left (.ms-auto).", 
                  "correct": true, 
                  "explanation": "Answer 1 is false/correct because of reasons"},
                  {"text": "Answer 2 text", 
                  "correct": false, 
                  "explanation": "Answer 2 is false/correct because of reasons"},
                  {"text": "Answer 3 text", 
                  "correct": false, 
                  "explanation": "Answer 3 is false/correct because of reasons"},
                  {"text": "Answer 4 text", 
                  "correct": false, 
                  "explanation": "Answer 4 is false/correct because of reasons"}]
  },{ 
    "id": "3",
    "text": "test question 3 text",
    "answers": [{"text": "flexbox can do some pretty awesome things when you mix flex alignments with auto margins. Shown below are three examples of controlling flex items via auto margins: default (no auto margin), pushing two items to the right (.me-auto), and pushing two items to the left (.ms-auto).", 
                  "correct": true, 
                  "explanation": "Answer 1 is false/correct because of reasons"},
                  {"text": "Answer 2 text", 
                  "correct": false, 
                  "explanation": "Answer 2 is false/correct because of reasons"},
                  {"text": "Answer 3 text", 
                  "correct": false, 
                  "explanation": "Answer 3 is false/correct because of reasons"},
                  {"text": "Answer 4 text", 
                  "correct": false, 
                  "explanation": "Answer 4 is false/correct because of reasons"}]
  },{ 
    "id": "4",
    "text": "test question 4 text",
    "answers": [{"text": "flexbox can do some pretty awesome things when you mix flex alignments with auto margins. Shown below are three examples of controlling flex items via auto margins: default (no auto margin), pushing two items to the right (.me-auto), and pushing two items to the left (.ms-auto).", 
                  "correct": true, 
                  "explanation": "Answer 1 is false/correct because of reasons"},
                  {"text": "Answer 2 text", 
                  "correct": false, 
                  "explanation": "Answer 2 is false/correct because of reasons"},
                  {"text": "Answer 3 text", 
                  "correct": false, 
                  "explanation": "Answer 3 is false/correct because of reasons"},
                  {"text": "Answer 4 text", 
                  "correct": false, 
                  "explanation": "Answer 4 is false/correct because of reasons"}]
  },{ 
    "id": "5",
    "text": "question 5 text",
    "answers": [{"text": "flexbox can do some pretty awesome things when you mix flex alignments with auto margins. Shown below are three examples of controlling flex items via auto margins: default (no auto margin), pushing two items to the right (.me-auto), and pushing two items to the left (.ms-auto).", 
                  "correct": true, 
                  "explanation": "Answer 1 is false/correct because of reasons"},
                  {"text": "Answer 2 text", 
                  "correct": false, 
                  "explanation": "Answer 2 is false/correct because of reasons"},
                  {"text": "Answer 3 text", 
                  "correct": false, 
                  "explanation": "Answer 3 is false/correct because of reasons"},
                  {"text": "Answer 4 text", 
                  "correct": false, 
                  "explanation": "Answer 4 is false/correct because of reasons"}]
  }
];

  // quiz configuration, input for quizComponent
  quiz = {
    "sections": [{"progress": "100", "id": "1", "name": "Section 1: Topic header/name"},
    {"progress": "20", "id": "2", "name": "Section 2: Topic header/name"},
    {"progress": "60", "id": "3", "name": "Section 3: Topic header/name"}], // section/topic id+index object array
    "sectionOrder": "sequential", // sequential|random|reverse
    "numberOfQuestions": 5, //questions per section 1|5|10|20|50|all
  };

  totalSections: number = 1;
  currentSection: any;
  currentQuestion: any;


  constructor() { }

  ngOnInit(): void {
    this.totalSections = this.quiz.sections.length;
    this.currentSection = this.quiz.sections[0];
    this.currentQuestion = {"number": 0, "question": this.questions[0]};
  }

  

  getQuestionTotal(){
    this.quiz.sections.length * this.quiz.numberOfQuestions;
  }

}
