document.addEventListener("DOMContentLoaded", function () {
	const sceneEl = document.querySelector('a-scene');
	const arSystem = sceneEl.systems["mindar-image-system"];
	const exampleTarget = document.querySelector('.example-target');
	const exampleBuilder = document.querySelector('.example-builder');
	const exampleTool = document.querySelector('.example-tool')
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
	// detect click event
	exampleBuilder.addEventListener("click", event => {
		console.log("builder click");
		builders.forEach(function (builder) {
			var builderElem = document.querySelector("#" + builder.name + "-img");
			if (builderElem && builderElem.object3D.visible) {
				if (searchForBuilderTool(builder)) {
					toggleSpeechBubble(builder.successDialogue);
				} else {
					toggleSpeechBubble(builder.dialogue);
				}
			}
		})
	})

	exampleTool.addEventListener("click", event => {
		console.log("tool click");
		tools.forEach(function (tool) {
			var toolMarker = document.querySelector("#" + tool.name + "-img");
			if (toolMarker && toolMarker.object3D.visible) {
				toggleSpeechBubble(tool.dialogue);
				if (!userState.hasBuilderTool(tool)) userState.addTool(tool);
			}
		});
	});
});


function toggleSpeechBubble(dialogue) {
	console.log("toggling speech bubble")
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

// function hideSpeechBubbleIfNoMarker() {
// 	var speechBubble = document.querySelector(".speech-bubble");
// 	if (speechBubble.style.display === 'none' || !speechBubble.style.display) return;

// 	var shouldHide = true;
// 	builders.forEach(function (builder) {
// 		var builderMarker = document.querySelector("#" + builder.name + "-img");
// 		if (builderMarker && builderMarker.object3D.visible) shouldHide = false;
// 	});

// 	tools.forEach(function (tool) {
// 		var toolMarker = document.querySelector("#" + tool.name + "-img");
// 		if (toolMarker && toolMarker.object3D.visible) shouldHide = false;
// 	});

// 	if (shouldHide) speechBubble.style.display = 'none';
// };