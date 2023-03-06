var builders = [],
    tools = [];

function ARModel(name, dialogue, succesDialogue) {
    this.name = name;
    this.dialogue = dialogue;
    this.successDialogue = succesDialogue
}

ARModel.prototype.speak = function () {
    return this.dialogue;
}

//Builder model
function Builder(name, dialogue, tool, successDialogue) {
    ARModel.call(this, name, dialogue, successDialogue);
    this.tool = tool;
}

Builder.prototype = Object.create(ARModel.prototype);

//Tool model
function Tool(name, dialogue, succesDialogue, reward, rewarded) {
    ARModel.call(this, name, dialogue, succesDialogue);
    this.clickCount = 0;
    this.reward = reward;
    this.rewarded = false;
}

Tool.prototype = Object.create(ARModel.prototype);

function initiateModels() {
    var buildersArray = [
        {
            name: 'king',
            dialogue: 'The joker stole my artifact, find him and bring it back!',
            tool: new Tool('joker', 'No way I give you this artifact for free, fight me or fail!', 'You beat me... here is the artifact...', 5),
            successDialogue: 'Thank you! Here are 5 coins.'
        }
    ];

    buildersArray.forEach(function (builder) {
        builders.push(new Builder(builder.name, builder.dialogue, builder.tool, builder.successDialogue));
        if (builder.tool) tools.push(builder.tool);
    });

    console.log('builders', builders);
    console.log('tools', tools)
}

initiateModels();
