// TODO: This code does not properly populate meshes.animations and scene.animationGroups is not automatically populated
// It does work in the playground: https://playground.babylonjs.com/#IRBUI4#1
// It also works when importing the non-es6 version of babylonjs
//import * as BABYLON from 'babylonjs';
//import 'babylonjs-loaders';

// TODO: I'm not sure if order matters here.
// There are a few unused imports here that I am using in the full project and left in for completeness
import '@babylonjs/core/Animations/animatable';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Animation } from '@babylonjs/core/Animations/animation';
import { AnimationGroup } from '@babylonjs/core/Animations/animationGroup';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
//import '@babylonjs/loaders/glTF/2.0/glTFLoader'; // << This was the issue
import '@babylonjs/loaders/glTF';
import '@babylonjs/core/Helpers/sceneHelpers';

async function createScene(canvas: HTMLCanvasElement, engine: Engine): Promise<Scene> {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new Scene(engine);

  //Adding an Arc Rotate Camera
  var camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 0.25, Vector3.Zero(), scene);
  camera.minZ = 0.01;
  camera.maxZ = 10;
  camera.lowerRadiusLimit = 0.2;
  camera.upperRadiusLimit = 0.75;
  camera.wheelPrecision = 1000;
  camera.attachControl(canvas, false);

  var url = 'https://cdn.3dmodelfoundry.com/images/env/amazon-1k.env';
  var envTexture = new CubeTexture(url, scene);
  scene.createDefaultSkybox(envTexture, true, undefined, 0.2);

  const sceneResult = await SceneLoader.ImportMeshAsync(
    '',
    'https://cdn.3dmodelfoundry.com/models/3dmf/irrlnvn6kuqm/3d/',
    '3d_model_foundry_logo.glb',
    scene,
  );
  console.log('Animation groups in the scene:');
  console.log(scene.animationGroups);
  console.log('Animation groups returned from ImportMeshAsync:');
  console.log(sceneResult.animationGroups);
  sceneResult.meshes.forEach(m => {
    console.log('Animations for mesh named ' + m.name);
    console.log(m.animations);
  });

  return scene;
}

async function initBabylonViewer() {
  const canvas = document.getElementById('viewer') as HTMLCanvasElement;
  const engine = new Engine(canvas, true);
  const scene = await createScene(canvas, engine);

  engine.runRenderLoop(function () {
    scene.render();
  });

  // Window resize pass to canvas to adjust aspect ratio
  window.addEventListener('resize', async event => {
    console.log('resize engine');
    engine.resize();
  });
}

/**
 * MAIN
 */
document.body.onload = () => {
  initBabylonViewer();
};
