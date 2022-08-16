import { questionsArray } from "./choices.js";
import { Poll } from './modules/Poll.js'
import { UI } from "./modules/UI.js";

const main = () => {
    const poll = new Poll(questionsArray)
    const ui = new UI()

    ui.showQuestion(poll.getCurrentQuestion().quest)
}

main()