export class Question {
    constructor(quest, choices){
        this.quest = quest
        this.choices = choices
    }

    getChoiceScore(choice){
        let score
        this.choices.forEach((c, index) => {
            if(choice === c)
                score = this.choices.length - index
        });
        return score
    }
}