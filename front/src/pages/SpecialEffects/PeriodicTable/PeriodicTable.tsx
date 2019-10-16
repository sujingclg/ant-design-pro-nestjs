import React from "react";
import * as THREE from 'three';
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import GridContent from "@/components/PageHeaderWrapper/GridContent";
import TWEEN from './Tween';
import tableData from './tableData';
import styles from "./index.less";

interface PeriodicTableProps {
}


class PeriodicTable extends React.Component<PeriodicTableProps, {}> {

  private readonly container: React.RefObject<HTMLDivElement>;
  private readonly objects: THREE.Object3D[];
  private readonly targets: { [key: string]: THREE.Object3D[] };
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: CSS3DRenderer;
  private controls?: TrackballControls;

  readonly state: Readonly<{}>;

  constructor(props: PeriodicTableProps) {
    super(props);
    this.container = React.createRef();
    this.objects = [];
    this.targets = {table: [], sphere: [], helix: [], grid: []};
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera();
    this.renderer = new CSS3DRenderer();
    this.state = {};
  }

  componentDidMount() {
    this.init();
    this.animate();
  }

  init = () => {
    const rootDom = this.container.current;
    const elmWidth = parseInt(window.getComputedStyle(rootDom!).width!);
    const elmHeight = parseInt(window.getComputedStyle(rootDom!).height!);
    // const elmWidth = 400;
    // const elmHeight = 300;
    console.log(elmHeight, elmWidth);
    this.camera.fov = 40;
    this.camera.aspect = elmWidth / elmHeight;
    this.camera.near = 1;
    this.camera.far = 10000;
    this.camera.position.z = 3000;

    // init
    for (let i = 0; i < tableData.length; i += 5) {
      const element = document.createElement('div');
      element.className = styles.element;
      element.style.backgroundColor = `rgba(127, 127, 0, ${Math.random() * 0.5 + 0.5})`;

      const number = document.createElement('div');
      number.className = styles.number;
      number.textContent = ((i / 5) + 1).toString();
      element.appendChild(number);

      const symbol = document.createElement('div');
      symbol.className = styles.symbol;
      symbol.textContent = tableData[i].toString();
      element.appendChild(symbol);

      const details = document.createElement('div');
      details.className = styles.details;
      details.innerHTML = tableData[i + 1] + '<br>' + tableData[i + 2];
      element.appendChild(details);

      const object = new CSS3DObject(element);
      object.position.x = Math.random() * 4000 - 2000;
      object.position.y = Math.random() * 4000 - 2000;
      object.position.z = Math.random() * 4000 - 2000;
      this.scene.add(object);
      this.objects.push(object);

      // table
      const object2 = new THREE.Object3D();
      // @ts-ignore
      object2.position.x = tableData[i + 3] * 140 - 1350;  // table[i+3]取得此元素属于第几列, 每个元素宽120 设置为140保证间距有20
      object2.position.y = -tableData[i + 4] * 180 + 990;  // table[i+4]取得此元素属于第几行, 每个元素高160 设置为140保证间距有20
      this.targets.table.push(object2);
    }

    // sphere
    for (let i = 0, len = this.objects.length; i < len; i++) {
      const phi = Math.acos(-1 + (2 * i) / len);
      const theta = Math.sqrt(len * Math.PI) * phi;
      const object = new THREE.Object3D();
      object.position.setFromSpherical(new THREE.Spherical(800, phi, theta));
      const vector = new THREE.Vector3().copy(object.position).multiplyScalar(2);
      object.lookAt(vector);
      this.targets.sphere.push(object);
    }

    // helix
    for (let i = 0, len = this.objects.length; i < len; i++) {
      const theta = i * 0.175 + Math.PI;
      const y = -i * 8 + 450;
      const object = new THREE.Object3D();
      // object.position.setFromCylindricalCoords(900, theta, y);
      object.position.setFromCylindrical(new THREE.Cylindrical(900, theta, y));
      const vector = new THREE.Vector3(
        object.position.x * 2,
        object.position.y,
        object.position.z * 2
      );
      object.lookAt(vector);
      this.targets.helix.push(object);
    }

    // grid
    for (let i = 0, len = this.objects.length; i < len; i++) {
      const object = new THREE.Object3D();
      object.position.x = (i % 5) * 400 - 800;  // 一行五元素, 间距400
      object.position.y = -Math.floor(i / 5) % 5 * 400 + 800;  // 一列5元素, 间距400
      object.position.z = -Math.floor(i / 25) * 1000 + 2000;  // 一页25元素, 间距1000
      this.targets.grid.push(object);
    }

    this.renderer.setSize(elmWidth, elmHeight);
    rootDom!.appendChild(this.renderer.domElement);

    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 500;
    this.controls.maxDistance = 6000;

    this.controls.addEventListener('change', this.canvasRender);

    this.transform(this.targets.table, 3000);
    window.addEventListener('resize', this.onWindowResize, false);
  };

  transform = (targets: THREE.Object3D[], duration: number) => {
    TWEEN.removeAll();

    for (let i = 0, len = this.objects.length; i < len; i++) {
      const object = this.objects[i];
      const target = targets[i];

      // @ts-ignore
      new TWEEN.Tween(object.position).to({
        x: target.position.x,
        y: target.position.y,
        z: target.position.z,
      }, Math.random() * duration + duration).easing(
        TWEEN.Easing.Exponential.InOut
      ).start();

      // @ts-ignore
      new TWEEN.Tween(object.rotation).to({
        x: target.rotation.x,
        y: target.rotation.y,
        z: target.rotation.z,
      }, Math.random() * duration + duration).easing(
        TWEEN.Easing.Exponential.InOut
      ).start();
    }

    // @ts-ignore
    new TWEEN.Tween(this).to({}, duration * 2).onUpdate(this.canvasRender).start();
  };

  onWindowResize = () => {
    const rootDom = this.container.current;
    const elmWidth = parseInt(window.getComputedStyle(rootDom!).width!);
    const elmHeight = parseInt(window.getComputedStyle(rootDom!).height!);
    this.camera.aspect = elmWidth / elmHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(elmWidth, elmHeight);
    this.canvasRender();
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    TWEEN.update();
    this.controls!.update();
  };

  canvasRender = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <GridContent>
        <div style={{position: 'relative', overflow: 'hidden', width: '1024px'}}>
          <div ref={this.container} style={{backgroundColor: '#000', height: '80vh'}}/>
          <div className={styles.menu}>
            <button
              className={styles.button}
              onClick={()=>{
                this.transform(this.targets.table, 2000);
              }}
            >
              TABLE
            </button>
            <button
              className={styles.button}
              onClick={()=>{
                this.transform(this.targets.sphere, 2000);
              }}
            >
              SPHERE
            </button>
            <button
              className={styles.button}
              onClick={()=>{
                this.transform(this.targets.helix, 2000);
              }}
            >
              HELIX
            </button>
            <button
              className={styles.button}
              onClick={()=>{
                this.transform(this.targets.grid, 2000);
              }}
            >
              GRID
            </button>
          </div>
        </div>

      </GridContent>
    )
  }
}

export default PeriodicTable;