AFRAME.registerComponent('accepts-clicks', {
    init: function() {
      this.el.addEventListener('touchend', handleClickEvent);
      this.el.addEventListener('click', handleClickEvent);
    },
    tick: function() {
      hideSpeechBubbleIfNoMarker();
    }
  });

  function handleClickEvent() {
    for (var i = 0; i < builders.length; i++) {
      var builder = builders[i];
      var builderMarker = document.querySelector("#" + builder.name + "-marker");
      if (builderMarker && builderMarker.object3D.visible) {
        if (searchForBuilderTool(builder)) {
          toggleSpeechBubble(builder.successDialogue);
        } else {
          toggleSpeechBubble(builder.dialogue);
        }
        break;
      }
    }
  }

  function hideSpeechBubbleIfNoMarker() {
    var shouldHide = true;
    for (var i = 0; i < builders.length; i++) {
      var builderMarker = document.querySelector("#" + builders[i].name + "-marker");
      if (builderMarker && builderMarker.object3D.visible) {
        shouldHide = false;
        break;
      }
    }
  };