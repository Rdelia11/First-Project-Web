import React, {Component} from 'react';

class AR extends Component {
  render() {
    return (
      <div id="AR">
        <p>view your product in AR...</p>
        <hr></hr>
        <a-scene>
          {/* <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box> */}
          {/* <a-sphere position="0 1.25 -5" radius="1.25" color="#FFFFFF"></a-sphere> */}
          {/* <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder> */}
          <a-plane position="0 0 -4" rotation="-90 0 0" width="9" height="5" color="#7BC8A4"></a-plane>
          <a-sky color="#ECECEC"></a-sky>
          {/* <a-mountain color="#663300" shadowColor="#cc6600"></a-mountain> */}
          {/* <a-assets>
              <a-asset-item position="0 1 -5" id="footballBall" src="./3Dmodels/scene.gltf">
              </a-asset-item>
          </a-assets> */}
          <a-entity text="value: Hello, World!;"></a-entity>
        </a-scene>
      </div>
    )
  }
}

export default AR;
