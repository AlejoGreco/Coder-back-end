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
        this.score += this.getCurrentQuestion().getChoiceScore(answer)
        this.currentIndex++
    }

    isEnded(){
        return this.currentIndex === this.questions.length
    }

    getMaxScore(){
        let acc = 0
        this.questions.forEach(q => {
            acc += q.choices.length
        })
        return acc
    }

    calcResult(){
        return Math.round(((this.score / this.getMaxScore()) * 100))
    }
}