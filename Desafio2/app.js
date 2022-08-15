import { questionsArray } from "./choices.js";
import { Poll } from './modules/Poll.js'

const main = () => {
    const poll = new Poll(questionsArray)

    console.log(poll)
    console.log('Score ', poll.questions[0].getChoiceScore('Genial'))
}

main()