import { questionsArray } from "./choices.js";
import { Poll } from './modules/Poll.js'
import { UI } from "./modules/UI.js";

const renderApp = (poll, ui) => {
    if(poll.isEnded()){
        ui.showScore(poll.calcResult())
    }
    else{
        ui.showQuestion(poll.getCurrentQuestion().quest)
        ui.showChoices(poll.getCurrentQuestion().choices, answer => {
            poll.upDateScoreAndContinue(answer)
            renderApp(poll, ui)
        })
        ui.showProgress(poll.currentIndex + 1, poll.questions.length)
    }
}

const main = () => {
    const poll = new Poll(questionsArray)
    const ui = new UI()

    renderApp(poll, ui)
}

main()