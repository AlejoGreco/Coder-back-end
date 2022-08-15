export class Question {
    constructor(quest, choices){
        this.quest = quest
        this.choices = choices
    }

    getChoiceScore(choice){
        this.choices.forEach((c, index) => {
            if(choice === c)
                return (this.choices.length - index)
        });
    }
}