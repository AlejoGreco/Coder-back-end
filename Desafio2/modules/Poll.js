export class Poll {
    constructor(questions){
        this.questions = questions
        this.currentIndex = 0
        this.score = 0
    }

    getCurrentQuestion(){
        return this.questions[this.currentIndex]
    }

    upDateScoreAndContinue(answer){
        this.score += this.getCurrentQuestion().getChoicheScore(answer)
        this.currentIndex++
    }

    isEnded(){
        return this.currentIndex === this.questions.length
    }
}