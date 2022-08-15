import { Question } from "./modules/Question.js";
import { data } from "./data.js";

export const questionsArray = data.map(d => new Question(d.question, d.choices))