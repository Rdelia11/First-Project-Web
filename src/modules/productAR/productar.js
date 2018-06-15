import React, {Component} from 'react'

class ProductAR extends Component {
  render (){
    return(
      <a-scene background="color: #ECECEC">
        <a-plane position="0 0 -6" rotation="-90 0 0" width="10" height="10" color="#7BC8A4"></a-plane>

        <a-assets>
          <img id="soccerBallTexture" src="./soccerBallTexture.jpg" alt="texture"/>
        </a-assets>

        <a-sphere src="#soccerBallTexture" position="0 1 -6" rotation="0 0 0" scale="1 1 1">
          <a-animation attribute="rotation" to="0 360 0" direction="normal" dur="8000"
          repeat="indefinite"></a-animation>
        </a-sphere>

        <a-text value="soccer ball" color="#000"
        position="-1 0.3 -3" scale="1.5 1.5 1.5"></a-text>

        <a-text value="Decathlon is hiring ... come and join us !" color="#000"
        position="3 0.3 -5" scale="1.5 1.5 1.5" rotation="0 90 0"></a-text>

      </a-scene>
    )
  }
}

export default ProductAR;
