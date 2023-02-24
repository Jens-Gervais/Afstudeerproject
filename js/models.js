var builders = [],
    tools = [];

function ARModel(name, dialogue) {
    this.name = name;
    this.dialogue = dialogue;
}

ARModel.prototype.speak = function() {
    return this.dialogue;   
}

//Builder model
function Builder(name, dialogue, tool, successDialogue) {
    ARModel.call(this, name, dialogue);
    this.tool = tool;
    this.successDialogue = successDialogue;
}

Builder.prototype = Object.create(ARModel.prototype);

//Tool model
function Tool(name, dialogue) {
    ARModel.call(this, name, dialogue);
}

Tool.prototype = Object.create(ARModel.prototype);

function initiateModels() {
    var buildersArray = [
      {
        name: 'king',
        dialogue: 'It\'s short king spring, find the Joker!',
        tool: new Tool('joker', 'You have found the Joker! Return the peasant'),
        successDialogue: 'Miauwpoeskonijn you found him, here are 3 coins'
      }
    ];

    buildersArray.forEach(function(builder){
        builders.push(new Builder(builder.name, builder.dialogue, builder.tool, builder.successDialogue));
        if (builder.tool) tools.push(builder.tool);
    });

    console.log('builders', builders);
    console.log('tools', tools)
}

initiateModels();
