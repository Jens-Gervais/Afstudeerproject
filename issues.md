``
<a-entity id="king-img" class="example-target" mindar-image-target="targetIndex:  0">
  <a-plane id="king" class="clickable example-builder" src="#king" position="0 0 0" height="1.5" width="1" rotation="0 0 0"></a-plane>
</a-entity>

<a-entity id="ace-img" class="example-target" mindar-image-target="targetIndex: 1">
  <a-gltf-model class="clickable example-tool" rotation="0 0 0 " position="0 0 0.1" scale="0.005 0.005 0.005" src="#avatarModel" animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate">
</a-entity>
```

works perfectly, replacing gltf model with plane freaks out