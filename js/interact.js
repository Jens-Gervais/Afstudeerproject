document.addEventListener("DOMContentLoaded", function() {
	const sceneEl = document.querySelector('a-scene');
	const arSystem = sceneEl.systems["mindar-image-system"];
	const exampleTarget = document.querySelector('#example-target');
	const examplePlane = document.querySelector('#example-plane');
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
	examplePlane.addEventListener("click", event => {
	  console.log("plane click");
	});
});