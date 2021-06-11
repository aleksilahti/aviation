import { Component, OnInit } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  faQuestionCircle = faQuestionCircle;
  question = { 
    "text": "test question text",
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

  // quiz configuration, input for quizComponent
  quiz = {
    "sections": [1, 5, 7], // section/topic id array
    "sectionOrder": "sequential", // sequential|random|reverse
    "numberOfQuestions": "5", //questions per section 1|5|10|20|50|all
    "totalNumberOfQuestions": 15, // sections.length * numberOfQuestions
  }




  constructor() { }

  ngOnInit(): void {
  }

}
