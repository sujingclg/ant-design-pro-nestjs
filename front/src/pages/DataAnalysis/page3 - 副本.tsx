import React from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import WaterWave from "./WaterWave";
// import {Stage, Layer, Rect, Text, Group, Shape} from "react-konva";
// import Konva from "konva";

// class ColoredRect extends React.Component {
//   state = {
//     color: 'green'
//   };
//   handleClick = () => {
//     this.setState({
//       color: Konva.Util.getRandomColor()
//     });
//   };
//   render() {
//     return (
//       <Rect
//         x={20}
//         y={20}
//         width={50}
//         height={50}
//         fill={this.state.color}
//         shadowBlur={5}
//         onClick={this.handleClick}
//       />
//     );
//   }
// }

export default () => {
  return (
    <div style={{backgroundColor: '#FFF', width: '400px', height: '400px'}}>
      <WaterWave sideLength={400}/>
      {/*<Stage width={window.innerWidth} height={window.innerHeight}>*/}
        {/*<Layer>*/}
          {/*<Text text="Try click on rect" />*/}
          {/*<ColoredRect />*/}
        {/*</Layer>*/}
        {/*<Layer>*/}
          {/*<Group>*/}
            {/*<Rect x={10} y={100} width={400 * 0.5} height={50} fill="skyblue" cornerRadius={25}/>*/}
            {/*<Rect x={10} y={100} width={400} height={50} strokeWidth={10} stroke="#aaa" cornerRadius={25}/>*/}
          {/*</Group>*/}
        {/*</Layer>*/}
        {/*<Layer>*/}
          {/*<Shape*/}
            {/*sceneFunc={function (context) {*/}
              {/*context.beginPath();*/}
              {/*context.moveTo(20, 50);*/}
              {/*context.lineTo(220, 80);*/}
              {/*context.quadraticCurveTo(150, 100, 260, 170);*/}
              {/*context.closePath();*/}
              {/*// special Konva.js method*/}
              {/*context.fillStrokeShape(this);*/}
            {/*}}*/}
            {/*fill="#00D2FF"*/}
            {/*stroke="black"*/}
            {/*strokeWidth={4}*/}
          {/*/>*/}
        {/*</Layer>*/}
      {/*</Stage>*/}
    </div>
  )
}