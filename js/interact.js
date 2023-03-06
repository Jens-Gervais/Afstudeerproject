var interval_timer;
document.addEventListener("DOMContentLoaded", function () {
    const sceneEl = document.querySelector('a-scene');
    const arSystem = sceneEl.systems["mindar-image-system"];
    const exampleTarget = document.querySelector('.example-target');
    //    const exampleTargetTool = document.querySelector('.example-target-tool');
    const exampleBuilder = document.querySelector('.example-builder');
    const exampleTool = document.querySelector('.example-tool');
    let health = document.getElementById("health");

    // arReady event triggered when ready
    sceneEl.addEventListener("arReady", (event) => {
        console.log("MindAR is ready")
    });
    // arError event triggered when something went wrong. Mostly browser compatbility issue
    sceneEl.addEventListener("arError", (event) => {
        console.log("MindAR failed to start")
    });
    // detect target found
    exampleTarget.addEventListener("targetFound", event => {
        console.log("target found");
    });
    // detect target lost
    exampleTarget.addEventListener("targetLost", event => {
        console.log("target lost");
    });
    //    //detect tool target found
    //    exampleTargetTool.addEventListener("targetFound", event => {
    //        console.log("Tool target found");
    //        healthContainer.style.display = 'block';
    //    });
    //    // detect tool target lost
    //    exampleTargetTool.addEventListener("targetLost", event => {
    //        console.log("Tool target lost");
    //        healthContainer.style.display = 'none';
    //    });

    // detect click event builder
    exampleBuilder.addEventListener("click", event => {
        console.log("builder click");
        builders.forEach(function (builder) {
            var builderElem = document.querySelector("#" + builder.name + "-img");
            if (builderElem && builderElem.object3D.visible) {
                if (searchForBuilderTool(builder)) {
                    toggleSpeechBubble(builder.successDialogue);
                    updateCoins(builder.tool);
                } else {
                    toggleSpeechBubble(builder.dialogue);
                }
            }
        })
    })

    //detect click event tool
    exampleTool.addEventListener("click", event => {
        console.log("tool click");
        tools.forEach(function (tool) {
            var toolElem = document.querySelector("#" + tool.name + "-img");
            if (toolElem && toolElem.object3D.visible) {
                tool.clickCount++
                if (tool.clickCount <= 2) {
                    toggleSpeechBubble(tool.dialogue);
                } else if (tool.clickCount >= 2 && tool.clickCount <= 11) {
                    updateHealth(tool);
                    health.style.display = 'block';
                } else {
                    health.style.display = 'none';
                    toggleSpeechBubble(tool.successDialogue);
                    if (!userState.hasBuilderTool(tool)) userState.addTool(tool);
                }
            }
        });
    });
});


function toggleSpeechBubble(dialogue) {
    console.log("toggling speech bubble");
    var speechBubble = document.querySelector(".speech-bubble");
    if (speechBubble.style.display === 'none' || !speechBubble.style.display) {
        speechBubble.innerHTML = dialogue;
        speechBubble.style.display = 'block';
    } else {
        speechBubble.style.display = 'none';
    }
};

function searchForBuilderTool(builder) {
    return userState.tools.some(function (tool) {
        return tool.name === builder.tool.name;
    });
};

interval_timer = setInterval(function () {
    var speechBubble = document.querySelector(".speech-bubble");
    if (speechBubble.style.display === 'none' || !speechBubble.style.display) return;

    var shouldHide = true;
    builders.forEach(function (builder) {
        var builderMarker = document.querySelector("#" + builder.name + "-img");
        if (builderMarker && builderMarker.object3D.visible) shouldHide = false;
    });

    tools.forEach(function (tool) {
        var toolMarker = document.querySelector("#" + tool.name + "-img");
        if (toolMarker && toolMarker.object3D.visible) shouldHide = false;
    });

    if (shouldHide) speechBubble.style.display = 'none';
}, 5000);

function updateCoins(tool) {
    console.log("Adding " + tool.reward + " coins");
    userState.addCoins(tool);
    var coins = userState.getCoins();

    var coinsBubble = document.querySelector("#coins");
    coinsBubble.innerHTML = coins;

    var progressBar = document.querySelector("#progress");
    progressBar.ariaValueNow = coins;
    progressBar.style.width = (coins / progressBar.ariaValueMax) * 100 + "%";
};

function updateHealth(tool) {
    console.log("Updating health");
    let health = document.getElementById("health")
    health.value--
}
