function UserState() {
    this.tools = [];
    this.coins = 0;
}

UserState.prototype.addTool = function (tool) {
    this.tools.push(tool);
}

UserState.prototype.addCoins = function (tool) {
    if (!tool.rewarded) {
        this.coins += tool.reward;
        tool.rewarded = true;
    }
}

UserState.prototype.getCoins = function () {
    return this.coins
}

UserState.prototype.hasBuilderTool = function (builder) {
    return builder.tool && this.tools.includes(builder.tool.name);
}

var userState = new UserState();
