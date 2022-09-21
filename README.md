# Babylon Animation Issue

## Demo app to debug an ES6 issue

I'm having an issue with mesh animations not being loaded when using ES6 modules.

This is a sample project to replicate the issue with minimal code.

## Steps to reproduce
1. npm i
2. npm run build
3. python3 -m http.server 3000 (or whatever local fileserver you have)
4. Open in web browser (tested with Firefox Developer Edition 105.0b9)
5. Console output:
Animation groups in the scene: main.js:1:2074854
Array []
main.js:1:2074900
Animation groups returned from ImportMeshAsync: main.js:1:2074931
Array [ {…} ]
main.js:1:2074994
Animations for mesh named __root__ main.js:1:2075055
Array []
main.js:1:2075104
Animations for mesh named 3dmflogo main.js:1:2075055
Array []
main.js:1:2075104

## Desired output - scene should have 1 animation group and mesh named 3dmflogo should have 1 animation
Animation groups in the scene: main.js:1:2074854
Array [ {…} ]
main.js:1:2074900
Animation groups returned from ImportMeshAsync: main.js:1:2074931
Array [ {…} ]
main.js:1:2074994
Animations for mesh named __root__ main.js:1:2075055
Array []
main.js:1:2075104
Animations for mesh named 3dmflogo main.js:1:2075055
Array [ {…} ]
main.js:1:2075104

### Note: the model passes the glTF Validator with this result:
{
    "uri": "3d_model_foundry_logo.glb",
    "mimeType": "model/gltf-binary",
    "validatorVersion": "2.0.0-dev.3.8",
    "validatedAt": "2022-09-21T04:49:21.501Z",
    "issues": {
        "numErrors": 0,
        "numWarnings": 0,
        "numInfos": 0,
        "numHints": 4,
        "messages": [
            {
                "code": "BUFFER_VIEW_TARGET_MISSING",
                "message": "bufferView.target should be set for vertex or index data.",
                "severity": 3,
                "pointer": "/meshes/0/primitives/0/attributes/POSITION"
            },
            {
                "code": "BUFFER_VIEW_TARGET_MISSING",
                "message": "bufferView.target should be set for vertex or index data.",
                "severity": 3,
                "pointer": "/meshes/0/primitives/0/attributes/NORMAL"
            },
            {
                "code": "BUFFER_VIEW_TARGET_MISSING",
                "message": "bufferView.target should be set for vertex or index data.",
                "severity": 3,
                "pointer": "/meshes/0/primitives/0/attributes/TEXCOORD_0"
            },
            {
                "code": "BUFFER_VIEW_TARGET_MISSING",
                "message": "bufferView.target should be set for vertex or index data.",
                "severity": 3,
                "pointer": "/meshes/0/primitives/0/indices"
            }
        ],
        "truncated": false
    },
    "info": {
        "version": "2.0",
        "generator": "Khronos glTF Blender I/O v1.6.16",
        "resources": [
            {
                "pointer": "/buffers/0",
                "mimeType": "application/gltf-buffer",
                "storage": "glb",
                "byteLength": 677016
            },
            {
                "pointer": "/images/0",
                "mimeType": "image/png",
                "storage": "buffer-view",
                "image": {
                    "width": 1024,
                    "height": 1024,
                    "format": "rgb",
                    "primaries": "srgb",
                    "transfer": "srgb",
                    "bits": 8
                }
            }
        ],
        "animationCount": 1,
        "materialCount": 1,
        "hasMorphTargets": false,
        "hasSkins": false,
        "hasTextures": true,
        "hasDefaultScene": true,
        "drawCallCount": 1,
        "totalVertexCount": 7684,
        "totalTriangleCount": 12864,
        "maxUVs": 1,
        "maxInfluences": 0,
        "maxAttributes": 3
    }
}