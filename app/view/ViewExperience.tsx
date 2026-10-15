"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  AnimationMixer,
  Box3,
  CanvasTexture,
  Color,
  DirectionalLight,
  GridHelper,
  Group,
  HemisphereLight,
  LoadingManager,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  RepeatWrapping,
  SRGBColorSpace,
  SkinnedMesh,
  Vector3,
  WebGLRenderer,
  type AnimationClip,
  type Material,
  type Object3D,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { CloudUpload, Eye, FolderOpen, ImagePlus, Maximize2, Minimize2, RotateCcw, X } from "lucide-react";

const supportedFormats = [
  "GLB",
  "GLTF",
  "FBX",
  "OBJ",
  "STL",
  "PLY",
  "DAE",
  "3DS",
  "USDZ",
  "VOX",
  "PCD",
  "BVH",
  "3MF",
  "STEP",
  "IGES",
  "DWG",
  "DXF",
  "SAT",
  "SLDPRT",
  "SLDASM",
];

const fileFormatDetails = [
  { extension: "GLB", extLabel: ".glb", purpose: "Browser-ready 3D package used for web previews, AR, and game assets." },
  { extension: "GLTF", extLabel: ".gltf", purpose: "Lightweight 3D exchange format common in web apps and real-time rendering." },
  { extension: "FBX", extLabel: ".fbx", purpose: "Used in Autodesk workflows for animation, game assets, and design reviews." },
  { extension: "OBJ", extLabel: ".obj", purpose: "Popular mesh format for modeling, scanning, and 3D content pipelines." },
  { extension: "STL", extLabel: ".stl", purpose: "Common in 3D printing, prototyping, and rapid manufacturing workflows." },
  { extension: "PLY", extLabel: ".ply", purpose: "Often used for scanned geometry and point-cloud style mesh data." },
  { extension: "DAE", extLabel: ".dae", purpose: "COLLADA format used for cross-tool asset exchange in 3D pipelines." },
  { extension: "3DS", extLabel: ".3ds", purpose: "Legacy 3D Studio format still seen in older asset libraries and exports." },
  { extension: "USDZ", extLabel: ".usdz", purpose: "Used for AR and iOS/macOS product previews in quick-look experiences." },
  { extension: "VOX", extLabel: ".vox", purpose: "Voxel format used in voxel art, games, and procedural environment assets." },
  { extension: "PCD", extLabel: ".pcd", purpose: "Point-cloud format used in LiDAR, scanning, and 3D capture workflows." },
  { extension: "BVH", extLabel: ".bvh", purpose: "Motion capture format used for animation and character movement capture." },
  { extension: "3MF", extLabel: ".3mf", purpose: "3D manufacturing format used for printing and additive fabrication." },
  { extension: "STEP", extLabel: ".step, .stp", purpose: "Engineering CAD exchange format used in manufacturing and product design." },
  { extension: "IGES", extLabel: ".iges, .igs", purpose: "Neutral CAD format commonly used to share solid models between systems." },
  { extension: "DWG", extLabel: ".dwg", purpose: "Autodesk drawing format used in drafting and technical design files." },
  { extension: "DXF", extLabel: ".dxf", purpose: "CAD exchange format used for 2D/3D drafting across design tools." },
  { extension: "SAT", extLabel: ".sat", purpose: "Solid modeling format used in CAD interoperability and design review." },
  { extension: "SLDPRT", extLabel: ".sldprt", purpose: "SolidWorks part files used in mechanical design and manufacturing." },
  { extension: "SLDASM", extLabel: ".sldasm", purpose: "SolidWorks assembly files used for product and mechanism assemblies." },
];
const supportedExtensions = new Set(supportedFormats.map((format) => format.toLowerCase()));

export default function ViewExperience() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const resourceInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const textureInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [resourceFiles, setResourceFiles] = useState<File[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isFormatsOpen, setIsFormatsOpen] = useState(false);

  function selectFile(selectedFile: File | undefined) {
    if (!selectedFile) return;

    const extension = getExtension(selectedFile.name);
    if (!supportedExtensions.has(extension)) {
      setFile(null);
      setValidationError(`Use a ${supportedFormats.join(", ")} file to preview it here.`);
      return;
    }

    setValidationError(null);
    setResourceFiles([]);
    setFile(selectedFile);
  }

  function resetFile() {
    setFile(null);
    setResourceFiles([]);
    setValidationError(null);
    if (inputRef.current) inputRef.current.value = "";
    if (resourceInputRef.current) resourceInputRef.current.value = "";
    if (folderInputRef.current) folderInputRef.current.value = "";
    if (textureInputRef.current) textureInputRef.current.value = "";
  }

  function addResources(files: FileList | null) {
    const selectedResources = Array.from(files ?? []);
    setResourceFiles((currentResources) => mergeResourceFiles(currentResources, selectedResources));
  }

  return (
    <>
      <section className="relative z-10 w-full max-w-[820px] text-center">
        <h1 className="mt-2 bg-gradient-to-b from-white via-[#F2F6FF] to-[#A9C6FF] bg-clip-text text-[1.7rem] font-extrabold tracking-tight text-transparent drop-shadow-[0_4px_18px_rgba(84,122,255,0.22)] md:text-[2.2rem]">View Model</h1>
        <p className="mt-2 text-[0.88rem] text-[#9DB9EE]">Preview 3D models in your browser</p>
      </section>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={supportedFormats.map((format) => `.${format.toLowerCase()}`).join(",")}
        className="sr-only"
        onChange={(event) => selectFile(event.target.files?.[0])}
      />
      <input
        ref={resourceInputRef}
        type="file"
        multiple
        accept="*/*"
        className="sr-only"
        onChange={(event) => {
          addResources(event.target.files);
          event.target.value = "";
        }}
      />
      <input
        ref={folderInputRef}
        type="file"
        multiple
        className="sr-only"
        onChange={(event) => {
          addResources(event.target.files);
          event.target.value = "";
        }}
      />
      <input
        ref={textureInputRef}
        type="file"
        multiple
        accept="image/*,.tga,.dds,.ktx,.ktx2"
        className="sr-only"
        onChange={(event) => {
          addResources(event.target.files);
          event.target.value = "";
        }}
      />

      {file ? (
        <section className="relative z-10 mt-6 w-full max-w-none">
          <div className="relative isolate flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[16px] border border-white/[0.12] bg-[linear-gradient(135deg,rgba(38,52,82,0.84),rgba(22,31,52,0.88)_54%,rgba(15,22,39,0.9))] px-3 py-3 shadow-[0_12px_30px_rgba(2,6,23,0.28),0_0_18px_rgba(95,132,255,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent sm:px-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-white/25 bg-[linear-gradient(135deg,#2FE5FF_0%,#2D8EFF_55%,#3658D8_100%)] shadow-[0_9px_20px_rgba(32,140,255,0.3),inset_0_1px_0_rgba(255,255,255,0.42)]">
                <Eye size={21} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[0.84rem] font-bold text-white">{file.name}</p>
                <p className="mt-0.5 text-[0.7rem] text-[#9FB0D4]">
                  {formatFileSize(file.size)} · {getExtension(file.name).toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {["gltf", "fbx"].includes(getExtension(file.name)) ? (
                <>
                  <button
                    type="button"
                    onClick={() => resourceInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-[9px] border border-cyan-300/20 bg-cyan-300/5 px-3 py-2 text-[0.75rem] font-semibold text-[#C7F4FF] transition hover:border-cyan-300/45 hover:bg-cyan-300/10"
                  >
                    <ImagePlus size={14} />
                    Add linked files
                  </button>
                  {getExtension(file.name) === "gltf" ? (
                    <button
                      type="button"
                      onClick={() => {
                        const folderInput = folderInputRef.current;
                        if (!folderInput) return;
                        folderInput.setAttribute("webkitdirectory", "");
                        folderInput.click();
                      }}
                      className="inline-flex items-center gap-2 rounded-[9px] border border-cyan-300/20 bg-cyan-300/5 px-3 py-2 text-[0.75rem] font-semibold text-[#C7F4FF] transition hover:border-cyan-300/45 hover:bg-cyan-300/10"
                    >
                      <FolderOpen size={14} />
                      Add GLTF folder
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => textureInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-[9px] border border-cyan-300/20 bg-cyan-300/5 px-3 py-2 text-[0.75rem] font-semibold text-[#C7F4FF] transition hover:border-cyan-300/45 hover:bg-cyan-300/10"
                  >
                    <ImagePlus size={14} />
                    Add texture files
                  </button>
                </>
              ) : null}
              <button
                type="button"
                onClick={resetFile}
                className="inline-flex items-center gap-2 rounded-[9px] border border-white/15 bg-white/5 px-3 py-2 text-[0.75rem] font-semibold text-[#DCE8FF] transition hover:border-cyan-300/35 hover:bg-white/10"
              >
                <RotateCcw size={14} />
                New model
              </button>
            </div>
          </div>
          {["gltf", "fbx"].includes(getExtension(file.name)) ? (
            <div className="mt-2 flex min-h-5 items-center gap-2 px-1 text-[0.72rem] text-[#9FB0D4]">
              {resourceFiles.length ? (
                <>
                  <ImagePlus size={13} className="text-cyan-200" />
                  <span title={resourceFiles.map((resource) => resource.name).join(", ")}>
                    {resourceFiles.length} linked file{resourceFiles.length === 1 ? "" : "s"} attached — {resourceFiles.slice(0, 3).map((resource) => resource.name).join(", ")}
                    {resourceFiles.length > 3 ? `, and ${resourceFiles.length - 3} more` : ""}.
                  </span>
                  <button type="button" onClick={() => setResourceFiles([])} className="ml-1 text-[#C7F4FF] hover:text-white" aria-label="Remove linked files">
                    <X size={14} />
                  </button>
                </>
              ) : (
                <span>
                  {getExtension(file.name) === "gltf"
                    ? "For GLTF, add linked files individually, texture files, or their whole folder."
                    : "For FBX, add any linked texture files used by the model."}
                </span>
              )}
            </div>
          ) : null}

          <ModelPreview
            key={`${file.name}-${file.lastModified}-${resourceFiles.map((resource) => `${resource.name}-${resource.lastModified}`).join("|")}`}
            file={file}
            resourceFiles={resourceFiles}
          />
        </section>
      ) : (
        <section className="relative z-10 mt-6 w-full max-w-[700px]">
          <label
            htmlFor={inputId}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              selectFile(event.dataTransfer.files[0]);
            }}
            className="group relative isolate flex min-h-[200px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border border-white/[0.1] bg-[linear-gradient(135deg,rgba(41,49,82,0.72),rgba(25,32,56,0.8)_52%,rgba(18,21,37,0.86))] pt-6 text-center shadow-[0_14px_32px_rgba(2,6,23,0.26),0_0_18px_rgba(110,126,255,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[46%] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] before:opacity-70 hover:-translate-y-0.5 hover:border-cyan-200/25 hover:shadow-[0_16px_36px_rgba(6,182,212,0.1),0_0_22px_rgba(110,126,255,0.1),inset_0_1px_0_rgba(255,255,255,0.12)]"
          >
            <div className="group relative z-10 flex h-[64px] w-[64px] items-center justify-center rounded-[18px] border border-white/25 bg-[linear-gradient(135deg,#6647C8_0%,#326EC8_52%,#00AACB_100%)] shadow-[0_12px_26px_rgba(51,100,210,0.35),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_18px_34px_rgba(51,100,210,0.42),0_0_22px_rgba(96,165,255,0.22),inset_0_1px_0_rgba(255,255,255,0.5)] before:absolute before:-inset-2 before:rounded-[22px] before:bg-cyan-400/15 before:blur-xl before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
              <CloudUpload size={31} strokeWidth={2.05} className="relative z-10 text-white transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h2 className="relative z-10 mt-4 text-[1.18rem] font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.28)]">Drop your 3D model here</h2>
            <p className="relative z-10 mt-1.5 text-[0.84rem] text-[#AAC0EA]">or click to browse</p>
            <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-1 px-3 pb-5 pt-3">
              {supportedFormats.map((format) => (
                <span key={format} className="rounded-[8px] border border-white/[0.1] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.035))] px-2 py-[5px] text-[0.66rem] font-medium tracking-[0.03em] text-[#C9D7F3] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  {format}
                </span>
              ))}
            </div>
          </label>
          {validationError ? <p className="mt-3 text-center text-[0.8rem] font-medium text-rose-300">{validationError}</p> : null}
        </section>
      )}

      {!file ? (
        <section className="relative z-10 mt-7 grid w-full max-w-[760px] gap-3 md:grid-cols-3">
          <TipCard
            icon={
              <Image
                src="/view-model-mouse.png"
                alt="Mouse drag icon"
                width={42}
                height={42}
                className="h-[42px] w-[42px] object-contain"
              />
            }
            label="Drag to rotate"
          />
          <TipCard
            icon={
              <Image
                src="/view-model-zoom.png"
                alt="Zoom icon"
                width={42}
                height={42}
                className="h-[42px] w-[42px] object-contain"
              />
            }
            label="Scroll to zoom"
          />
          <TipCard
            icon={
              <Image
                src="/view-model-right-click.png"
                alt="Right click icon"
                width={42}
                height={42}
                className="h-[42px] w-[42px] object-contain"
              />
            }
            label="Right-click pan"
          />
        </section>
      ) : null}

      <div className="relative z-10 mt-7 w-full max-w-[760px]">
        <button
          type="button"
          onClick={() => setIsFormatsOpen((value) => !value)}
          aria-expanded={isFormatsOpen}
          className="flex w-full items-center justify-between rounded-[12px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,28,49,0.9),rgba(12,19,31,0.92))] px-4 py-3 text-left text-[0.95rem] font-semibold text-[#EEF6FF] shadow-[0_8px_24px_rgba(2,6,23,0.18),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl"
        >
          <span>File Formats</span>
          <span className={`text-lg leading-none text-[#C9D9F5] transition-transform duration-200 ${isFormatsOpen ? "rotate-180" : "rotate-0"}`}>
            ▾
          </span>
        </button>

        {isFormatsOpen ? (
          <div className="mt-3 rounded-[16px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,31,53,0.75),rgba(12,19,31,0.9))] p-4 shadow-[0_10px_26px_rgba(2,6,23,0.2)] backdrop-blur-xl">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {fileFormatDetails.map(({ extension, extLabel, purpose }) => (
                <div key={extension} className="rounded-[10px] border border-white/8 bg-white/[0.02] px-3 py-2.5">
                  <div className="mb-1 text-[0.72rem] font-bold tracking-[0.08em] text-[#A8C7FF]">
                    <span className="uppercase">{extension}</span>
                    <span className="ml-1 lowercase text-[#A8C7FF]">— {extLabel.toLowerCase()}</span>
                  </div>
                  <p className="text-[0.78rem] leading-5 text-[#D7E2FA]">{purpose}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

    </>
  );
}

function ModelPreview({ file, resourceFiles }: { file: File; resourceFiles: File[] }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationMixerRef = useRef<AnimationMixer | null>(null);
  const animationClipsRef = useRef<AnimationClip[]>([]);
  const modelSceneRef = useRef<Object3D | null>(null);
  const previewSceneRef = useRef<Scene | null>(null);
  const sourceMaterialsRef = useRef<Map<Mesh, Material | Material[]>>(new Map());
  const previewMaterialsRef = useRef<Material[]>([]);
  const wireframeOverlaysRef = useRef<Array<{ overlay: Mesh; sourceMesh: Mesh }>>([]);
  const uvCheckerTextureRef = useRef<CanvasTexture | null>(null);
  const viewResetRef = useRef<{ position: Vector3; target: Vector3 } | null>(null);
  const animationSelectId = useId();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState("Preparing model preview...");
  const [loadingProgress, setLoadingProgress] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modelDetails, setModelDetails] = useState<ModelDetails | null>(null);
  const [animationOptions, setAnimationOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [selectedAnimation, setSelectedAnimation] = useState("");
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [displayMode, setDisplayMode] = useState<"textured" | "wireframe" | "uv">("textured");
  const supportsMaterialInspection = ["glb", "gltf", "fbx"].includes(getExtension(file.name));

  function changeDisplayMode(mode: "textured" | "wireframe" | "uv") {
    const modelScene = modelSceneRef.current;
    const sourceMaterials = sourceMaterialsRef.current;
    if (!modelScene || mode === displayMode) return;

    wireframeOverlaysRef.current.forEach(({ overlay }) => {
      overlay.removeFromParent();
      const lineMaterials = Array.isArray(overlay.material) ? overlay.material : [overlay.material];
      lineMaterials.forEach((material) => material.dispose());
    });
    wireframeOverlaysRef.current = [];
    sourceMaterials.forEach((materials, mesh) => {
      mesh.material = materials;
    });
    previewMaterialsRef.current.forEach((material) => material.dispose());
    previewMaterialsRef.current = [];

    if (mode !== "textured") {
      sourceMaterials.forEach((materials, mesh) => {
        const materialList = Array.isArray(materials) ? materials : [materials];
        if (mode === "wireframe") {
          const surfaceMaterial = new MeshBasicMaterial({
            color: "#ffffff",
            side: materialList[0]?.side,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1,
          });
          previewMaterialsRef.current.push(surfaceMaterial);
          mesh.material = surfaceMaterial;

          const wireframeMaterial = new MeshBasicMaterial({
            color: "#000000",
            side: materialList[0]?.side,
            wireframe: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -1,
          });
          const wireframe = mesh instanceof SkinnedMesh
            ? new SkinnedMesh(mesh.geometry, wireframeMaterial)
            : new Mesh(mesh.geometry, wireframeMaterial);
          if (wireframe instanceof SkinnedMesh && mesh instanceof SkinnedMesh) {
            wireframe.bind(mesh.skeleton, mesh.bindMatrix);
            wireframe.bindMode = mesh.bindMode;
            wireframe.bindMatrixInverse.copy(mesh.bindMatrixInverse);
            wireframe.morphTargetInfluences = mesh.morphTargetInfluences;
            wireframe.morphTargetDictionary = mesh.morphTargetDictionary;
          }
          wireframe.renderOrder = 1;
          wireframe.matrixAutoUpdate = false;
          wireframe.matrix.copy(mesh.matrix);
          wireframe.matrixWorldNeedsUpdate = true;
          mesh.parent?.add(wireframe);
          previewMaterialsRef.current.push(wireframeMaterial);
          wireframeOverlaysRef.current.push({ overlay: wireframe, sourceMesh: mesh });
          return;
        }

        const previewList = materialList.map((sourceMaterial) => {
          const checkerMaterial = new MeshBasicMaterial({
            map: uvCheckerTextureRef.current,
            side: sourceMaterial.side,
          });
          previewMaterialsRef.current.push(checkerMaterial);
          return checkerMaterial;
        });
        mesh.material = Array.isArray(materials) ? previewList : previewList[0];
      });
    }

    if (previewSceneRef.current) {
      previewSceneRef.current.background = new Color(mode === "wireframe" ? "#f1f1f1" : "#0D0D1A");
    }
    setDisplayMode(mode);
  }

  useEffect(() => {
    const container = containerRef.current;
    const preview = previewRef.current;
    if (!container || !preview) return;

    animationMixerRef.current = null;
    animationClipsRef.current = [];
    modelSceneRef.current = null;
    previewSceneRef.current = null;
    sourceMaterialsRef.current = new Map();
    previewMaterialsRef.current = [];
    wireframeOverlaysRef.current = [];
    uvCheckerTextureRef.current = null;
    let animationFrame = 0;
    let active = true;
    let model: Object3D | undefined;
    let animatedRoot: Object3D | undefined;
    let removedGroundMeshes: Object3D[] = [];
    let loadFinished = false;
    const modelUrl = URL.createObjectURL(file);
    const resourceUrls = new Map<string, string>();
    resourceFiles.forEach((resourceFile) => {
      const resourceUrl = URL.createObjectURL(resourceFile);
      resourceUrls.set(normalizeResourcePath(resourceFile.name), resourceUrl);
      if (resourceFile.webkitRelativePath) {
        resourceUrls.set(normalizeResourcePath(resourceFile.webkitRelativePath), resourceUrl);
      }
    });
    const revokeObjectUrls = () => {
      URL.revokeObjectURL(modelUrl);
      new Set(resourceUrls.values()).forEach((resourceUrl) => URL.revokeObjectURL(resourceUrl));
    };
    const loadingManager = new LoadingManager();
    loadingManager.onStart = (_url, itemsLoaded, itemsTotal) => {
      if (!active) return;
      setLoadingStatus("Loading model resources...");
      setLoadingProgress(Math.round((itemsLoaded / itemsTotal) * 100));
    };
    loadingManager.onProgress = (_url, itemsLoaded, itemsTotal) => {
      if (!active) return;
      setLoadingStatus(`Loading resources (${itemsLoaded} of ${itemsTotal})...`);
      setLoadingProgress(Math.round((itemsLoaded / itemsTotal) * 100));
    };
    loadingManager.onLoad = () => {
      if (!active) return;
      setLoadingStatus("Finishing model preview...");
      setLoadingProgress(100);
    };
    loadingManager.onError = (url) => {
      if (!active) return;
      const resourceName = url.split(/[\\/]/).pop() || "a linked resource";
      setLoadingStatus(`Could not load ${resourceName}.`);
    };
    loadingManager.setURLModifier((requestedUrl) => {
      const requestedPath = normalizeResourcePath(requestedUrl);
      const requestedName = normalizeResourcePath(requestedUrl.split(/[\\/]/).pop() ?? "");
      const resourceUrl = findResourceUrl(resourceUrls, requestedPath, requestedName);
      if (resourceUrl) return resourceUrl;
      return requestedUrl;
    });
    const scene = new Scene();
    scene.background = new Color("#0D0D1A");
    previewSceneRef.current = scene;
    const camera = new PerspectiveCamera(42, 1, 0.1, 1000);
    camera.position.set(6.8, 4.8, 6.8);
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.domElement.className = "h-full w-full touch-none";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;
    controls.rotateSpeed = 0.62;
    controls.zoomSpeed = 0.8;
    controls.panSpeed = 0.7;
    controls.minDistance = 2;
    controls.maxDistance = 20;
    scene.add(new HemisphereLight("#B8E2FF", "#141126", 2.2));
    const keyLight = new DirectionalLight("#D9F8FF", 3.5);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);
    const rimLight = new DirectionalLight("#5AA9C9", 1.6);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const grid = new GridHelper(18, 24, "#3C617D", "#1B2B3A");
    (Array.isArray(grid.material) ? grid.material : [grid.material]).forEach((material) => {
      material.transparent = true;
      material.opacity = 0.74;
    });
    scene.add(grid);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let previousFrameTime: number | undefined;
    const render = (time: number) => {
      const delta = previousFrameTime === undefined ? 0 : Math.min((time - previousFrameTime) / 1000, 0.1);
      previousFrameTime = time;
      controls.update();
      animationMixerRef.current?.update(delta);
      scene.updateMatrixWorld(true);
      wireframeOverlaysRef.current.forEach(({ overlay, sourceMesh }) => {
        overlay.matrix.copy(sourceMesh.matrix);
        overlay.visible = sourceMesh.visible;
        overlay.matrixWorldNeedsUpdate = true;
      });
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };
    animationFrame = requestAnimationFrame(render);

    void loadModel(file, modelUrl, loadingManager, resourceUrls, setLoadingStatus)
      .then((loadedModel) => {
        if (!active) {
          disposeObject(loadedModel.scene);
          return;
        }
        removedGroundMeshes = removeOversizedGroundMeshes(loadedModel.scene);
        modelSceneRef.current = loadedModel.scene;
        loadedModel.scene.traverse((object) => {
          if (object instanceof Mesh) {
            sourceMaterialsRef.current.set(object, object.material);
          }
        });
        if (supportsMaterialInspection) {
          uvCheckerTextureRef.current = createUvCheckerTexture();
        }
        model = frameModel(loadedModel.scene, camera, controls, grid);
        viewResetRef.current = { position: camera.position.clone(), target: controls.target.clone() };
        scene.add(model);
        setModelDetails(getModelDetails(loadedModel.scene, loadedModel.animations));
        if (loadedModel.animations.length) {
          animatedRoot = loadedModel.scene;
          animationMixerRef.current = new AnimationMixer(loadedModel.scene);
          animationClipsRef.current = loadedModel.animations;
          setAnimationOptions(loadedModel.animations.map((clip, index) => ({
            value: String(index),
            label: clip.name || `Animation ${index + 1}`,
          })));
          setSelectedAnimation("0");
        }
        setIsLoading(false);
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        if (loadError instanceof MissingGltfResourcesError) {
          setError(`Select the linked files required by this GLTF: ${loadError.resources.join(", ")}`);
          return;
        }
        if (loadError instanceof UnsupportedPreviewFormatError) {
          setError(`${loadError.extension.toUpperCase()} files are not supported for preview yet. Try GLB, GLTF, FBX, OBJ, STL, or PLY.`);
          return;
        }
        setError("Could not load this model. Check that the file is valid and all linked resources are available.");
      })
      .finally(() => {
        loadFinished = true;
        if (active) setIsLoading(false);
        if (!active) {
          revokeObjectUrls();
        }
      });

    const syncFullscreenState = () => setIsFullscreen(document.fullscreenElement === preview);
    document.addEventListener("fullscreenchange", syncFullscreenState);

    return () => {
      active = false;
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      viewResetRef.current = null;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.dispose();
      controlsRef.current = null;
      animationMixerRef.current?.stopAllAction();
      if (animatedRoot) animationMixerRef.current?.uncacheRoot(animatedRoot);
      animationMixerRef.current = null;
      animationClipsRef.current = [];
      sourceMaterialsRef.current.forEach((materials, mesh) => {
        mesh.material = materials;
      });
      wireframeOverlaysRef.current.forEach(({ overlay }) => {
        overlay.removeFromParent();
      });
      wireframeOverlaysRef.current = [];
      previewMaterialsRef.current.forEach((material) => material.dispose());
      previewMaterialsRef.current = [];
      uvCheckerTextureRef.current?.dispose();
      uvCheckerTextureRef.current = null;
      sourceMaterialsRef.current.clear();
      modelSceneRef.current = null;
      previewSceneRef.current = null;
      if (model) disposeObject(model);
      removedGroundMeshes.forEach(disposeObject);
      renderer.dispose();
      renderer.domElement.remove();
      if (loadFinished) {
        revokeObjectUrls();
      }
    };
  }, [file, resourceFiles, supportsMaterialInspection]);

  return (
    <div className="mt-3">
      <div
        ref={previewRef}
        className="relative h-[420px] overflow-hidden rounded-[17px] border border-[#2d3a52] bg-[#0D0D1A] shadow-[0_14px_28px_rgba(2,6,23,0.26),0_0_16px_rgba(100,120,255,0.08)] [&:fullscreen]:h-screen [&:fullscreen]:w-screen [&:fullscreen]:max-h-none [&:fullscreen]:rounded-none md:h-[520px]"
      >
        <div ref={containerRef} className="absolute inset-0" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const reset = viewResetRef.current;
              const controls = controlsRef.current;
              if (!reset || !controls) return;
              controls.object.position.copy(reset.position);
              controls.target.copy(reset.target);
              controls.update();
            }}
            disabled={isLoading || Boolean(error)}
            className="inline-flex items-center gap-1.5 rounded-[8px] border border-white/10 bg-[#151524]/90 px-2.5 py-2 text-xs font-medium text-[#DCE8FF] backdrop-blur transition hover:border-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw size={13} />
            Reset view
          </button>
          <button
            type="button"
            onClick={() => {
              const action = isFullscreen ? document.exitFullscreen() : previewRef.current?.requestFullscreen();
              void action?.catch(() => setError("Fullscreen mode is unavailable in this browser."));
            }}
            className="inline-flex items-center gap-1.5 rounded-[8px] border border-white/10 bg-[#151524]/90 px-2.5 py-2 text-xs font-medium text-[#DCE8FF] backdrop-blur transition hover:border-cyan-300/40"
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          </button>
        </div>
        {supportsMaterialInspection ? (
          <div className="absolute bottom-3 right-3 flex max-w-[calc(100%-1.5rem)] items-center gap-1 rounded-[9px] border border-white/10 bg-[#151524]/90 p-1 backdrop-blur">
            {([
              ["textured", "Textured"],
              ["wireframe", "Wireframe"],
              ["uv", "UV checker"],
            ] as const).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => changeDisplayMode(mode)}
                disabled={isLoading || Boolean(error)}
                aria-pressed={displayMode === mode}
                className={`rounded-[7px] px-2.5 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  displayMode === mode
                    ? "bg-gradient-to-r from-[#7858F4] to-[#16BFE8] text-white"
                    : "text-[#DCE8FF] hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}
        {animationOptions.length ? (
          <div className="absolute right-3 top-14 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-[10px] border border-white/10 bg-[#151524]/90 p-2 backdrop-blur sm:top-3">
            <label htmlFor={animationSelectId} className="sr-only">Choose model animation</label>
            <select
              id={animationSelectId}
              value={selectedAnimation}
              onChange={(event) => {
                animationMixerRef.current?.stopAllAction();
                setIsAnimationPlaying(false);
                setSelectedAnimation(event.target.value);
              }}
              className="min-w-0 max-w-[min(52vw,220px)] rounded-[7px] border border-white/10 bg-[#202238] px-2.5 py-2 text-xs text-white outline-none focus:border-cyan-300/50"
            >
              {animationOptions.map((animation) => (
                <option key={animation.value} value={animation.value}>{animation.label}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                const mixer = animationMixerRef.current;
                const clip = animationClipsRef.current[Number(selectedAnimation)];
                if (!mixer || !clip) return;
                if (isAnimationPlaying) {
                  mixer.stopAllAction();
                  setIsAnimationPlaying(false);
                } else {
                  mixer.stopAllAction();
                  mixer.clipAction(clip).reset().play();
                  setIsAnimationPlaying(true);
                }
              }}
              className="shrink-0 rounded-[7px] bg-gradient-to-r from-[#7858F4] to-[#16BFE8] px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110"
            >
              {isAnimationPlaying ? "Stop" : "Run animation"}
            </button>
          </div>
        ) : null}
        {isLoading ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0D0D1A]/75 px-5 backdrop-blur-[2px]">
            <div className="w-full max-w-sm rounded-[14px] border border-white/10 bg-[#151524]/95 p-4 shadow-xl">
              <div className="flex items-center justify-between gap-3 text-sm font-medium text-[#EAF1FF]">
                <span>{loadingStatus}</span>
                {loadingProgress !== null ? <span className="text-xs text-[#AFC5E8]">{loadingProgress}%</span> : null}
              </div>
              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Model loading progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={loadingProgress ?? undefined}
              >
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-[#7858F4] to-[#16BFE8] transition-[width] duration-300 ${loadingProgress === null ? "w-1/3 animate-pulse" : ""}`}
                  style={loadingProgress === null ? undefined : { width: `${loadingProgress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-[#9FB0D4]">Large models and texture files may take a moment.</p>
            </div>
          </div>
        ) : null}
        {error ? <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0D0D1A]/85 px-6 text-center"><p className="max-w-md text-sm leading-6 text-rose-200">{error}</p></div> : null}
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-[7px] border border-white/10 bg-[#151524]/85 px-2.5 py-1.5 text-[0.68rem] font-medium text-[#B8C3DB] backdrop-blur">
          ↻ Rotate · Scroll to zoom · Right-click to pan
        </div>
      </div>
      {modelDetails ? (
        <section className="mt-3 rounded-[14px] border border-white/10 bg-[linear-gradient(135deg,rgba(20,31,53,0.85),rgba(12,19,31,0.92))] p-3 shadow-[0_10px_24px_rgba(2,6,23,0.16)]">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#AFC5E8]">Model details</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            <ModelDetail label="Dimensions (model units)" value={`${formatDimension(modelDetails.dimensions.x)} × ${formatDimension(modelDetails.dimensions.y)} × ${formatDimension(modelDetails.dimensions.z)}`} />
            <ModelDetail label="Meshes" value={String(modelDetails.meshCount)} />
            <ModelDetail label="Materials" value={String(modelDetails.materialCount)} />
            <ModelDetail label="Vertices" value={formatCount(modelDetails.vertexCount)} />
            <ModelDetail label="Triangles" value={formatCount(modelDetails.triangleCount)} />
            <ModelDetail label="Polygons (triangulated)" value={formatCount(modelDetails.polygonCount)} />
            <ModelDetail
              label="Animation duration"
              value={selectedAnimation && modelDetails.animationDurations.length
                ? `${modelDetails.animationDurations[Number(selectedAnimation)].toFixed(2)} s`
                : modelDetails.animationDurations.length
                  ? `${modelDetails.animationDurations[0].toFixed(2)} s`
                  : "None"}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}

type ModelDetails = {
  dimensions: Vector3;
  meshCount: number;
  materialCount: number;
  vertexCount: number;
  triangleCount: number;
  polygonCount: number;
  animationDurations: number[];
};

function ModelDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[9px] border border-white/[0.07] bg-white/[0.025] px-3 py-2">
      <p className="text-[0.65rem] text-[#9FB0D4]">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-[#EAF1FF]">{value}</p>
    </div>
  );
}

function getModelDetails(root: Object3D, animations: AnimationClip[]): ModelDetails {
  root.updateMatrixWorld(true);
  const dimensions = new Box3().setFromObject(root).getSize(new Vector3());
  let meshCount = 0;
  let vertexCount = 0;
  let triangleCount = 0;
  const materials = new Set<Material>();
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    meshCount += 1;
    const geometry = object.geometry;
    const position = geometry.getAttribute("position");
    vertexCount += position?.count ?? 0;
    const elementCount = geometry.index?.count ?? position?.count ?? 0;
    const drawStart = geometry.drawRange.start;
    const availableCount = Math.max(0, elementCount - drawStart);
    const drawCount = Number.isFinite(geometry.drawRange.count)
      ? Math.min(availableCount, geometry.drawRange.count)
      : availableCount;
    triangleCount += Math.floor(drawCount / 3);
    const meshMaterials = Array.isArray(object.material) ? object.material : [object.material];
    meshMaterials.forEach((material) => materials.add(material));
  });

  return {
    dimensions,
    meshCount,
    materialCount: materials.size,
    vertexCount,
    triangleCount,
    polygonCount: triangleCount,
    animationDurations: animations.map((animation) => animation.duration),
  };
}

function formatDimension(value: number) {
  return Number.isFinite(value) ? value.toFixed(2) : "0.00";
}

function formatCount(value: number) {
  return new Intl.NumberFormat().format(value);
}

function createUvCheckerTexture() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create the UV checker texture.");

  const cells = 8;
  const cellSize = 64;
  const colors = ["#ff3b30", "#ff9f0a", "#30d158", "#0a84ff", "#bf5af2", "#ffd60a"];
  canvas.width = cells * cellSize;
  canvas.height = cells * cellSize;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "bold 18px sans-serif";

  for (let row = 0; row < cells; row += 1) {
    for (let column = 0; column < cells; column += 1) {
      const x = column * cellSize;
      const y = row * cellSize;
      const colorIndex = (row * 3 + column * 5) % colors.length;
      context.fillStyle = colors[colorIndex];
      context.fillRect(x, y, cellSize, cellSize);
      context.strokeStyle = "#10131d";
      context.lineWidth = 2;
      context.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
      context.fillStyle = "rgba(0, 0, 0, 0.72)";
      context.fillRect(x + 5, y + 5, 22, 18);
      context.fillStyle = "#ffffff";
      context.font = "bold 12px sans-serif";
      context.fillText(String(row * cells + column + 1), x + 16, y + 14);
      context.font = "bold 18px sans-serif";
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

async function loadModel(
  file: File,
  modelUrl: string,
  loadingManager: LoadingManager,
  resourceUrls: Map<string, string>,
  onStatus: (status: string) => void,
): Promise<{ scene: Object3D; animations: AnimationClip[] }> {
  switch (getExtension(file.name)) {
    case "glb": {
      const gltf = await new GLTFLoader(loadingManager).loadAsync(modelUrl);
      return { scene: gltf.scene, animations: gltf.animations };
    }
    case "gltf": {
      // Parsing the text directly keeps every linked URI (such as
      // textures/diffuse.png) intact. The LoadingManager can then map it to
      // the local files selected by the user, rather than resolving it against
      // a temporary blob URL.
      onStatus("Reading GLTF manifest...");
      const gltfText = await file.text();
      const resolvedGltf = resolveGltfResources(gltfText, resourceUrls);
      const loader = new GLTFLoader(loadingManager);
      onStatus("Parsing model and loading linked resources...");
      return await parseGltf(loader, resolvedGltf);
    }
    case "fbx": {
      const fbx = await new FBXLoader(loadingManager).loadAsync(modelUrl);
      return { scene: fbx, animations: fbx.animations };
    }
    case "obj":
      return { scene: await new OBJLoader().loadAsync(modelUrl), animations: [] };
    case "stl": {
      const geometry = await new STLLoader().loadAsync(modelUrl);
      geometry.computeVertexNormals();
      return {
        scene: new Mesh(geometry, new MeshStandardMaterial({ color: "#B7D8EA", metalness: 0.2, roughness: 0.48 })),
        animations: [],
      };
    }
    case "ply": {
      const geometry = await new PLYLoader().loadAsync(modelUrl);
      geometry.computeVertexNormals();
      return {
        scene: new Mesh(geometry, new MeshStandardMaterial({ color: "#B7D8EA", metalness: 0.15, roughness: 0.52, vertexColors: geometry.hasAttribute("color") })),
        animations: [],
      };
    }
    default:
      throw new UnsupportedPreviewFormatError(getExtension(file.name));
  }
}

class UnsupportedPreviewFormatError extends Error {
  constructor(readonly extension: string) {
    super(`Preview is not supported for .${extension} files.`);
    this.name = "UnsupportedPreviewFormatError";
  }
}

class MissingGltfResourcesError extends Error {
  constructor(readonly resources: string[]) {
    super("GLTF references files that have not been selected.");
    this.name = "MissingGltfResourcesError";
  }
}

function resolveGltfResources(gltfText: string, resourceUrls: Map<string, string>) {
  const document = JSON.parse(gltfText) as {
    buffers?: Array<{ uri?: unknown }>;
    images?: Array<{ uri?: unknown }>;
  };
  const missingResources = new Set<string>();
  const resolveUri = (uri: unknown) => {
    if (typeof uri !== "string" || /^(data:|[a-z][a-z\d+.-]*:|\/\/)/i.test(uri)) return uri;
    const requestedPath = normalizeResourcePath(uri);
    const requestedName = normalizeResourcePath(uri.split(/[\\/]/).pop() ?? "");
    const resourceUrl = findResourceUrl(resourceUrls, requestedPath, requestedName);
    if (resourceUrl) return resourceUrl;

    missingResources.add(uri);
    return uri;
  };

  document.buffers?.forEach((buffer) => {
    buffer.uri = resolveUri(buffer.uri);
  });
  document.images?.forEach((image) => {
    image.uri = resolveUri(image.uri);
  });

  if (missingResources.size) throw new MissingGltfResourcesError([...missingResources]);
  return JSON.stringify(document);
}

function parseGltf(loader: GLTFLoader, gltfText: string) {
  return new Promise<{ scene: Object3D; animations: AnimationClip[] }>((resolve, reject) => {
    loader.parse(gltfText, "", (gltf) => resolve({ scene: gltf.scene, animations: gltf.animations }), reject);
  });
}

function frameModel(model: Object3D, camera: PerspectiveCamera, controls: OrbitControls, grid: GridHelper) {
  const holder = new Group();
  holder.add(model);
  holder.updateMatrixWorld(true);

  const box = new Box3().setFromObject(holder);
  if (box.isEmpty()) throw new Error("Empty model");
  const center = box.getCenter(new Vector3());
  const size = box.getSize(new Vector3());
  const largestDimension = Math.max(size.x, size.y, size.z);
  // Use an overview scale on first load. The model remains easy to inspect via
  // scroll zoom, while the initial view retains the spacious grid composition.
  const scale = 2.3 / largestDimension;

  // Scale and translate the wrapper together, so models exported far from
  // their origin stay centered on the grid instead of floating off-screen.
  holder.scale.setScalar(scale);
  holder.position.copy(center).multiplyScalar(-scale);
  holder.updateMatrixWorld(true);

  const scaledBox = new Box3().setFromObject(holder);
  grid.position.y = scaledBox.min.y;
  const scaledSize = scaledBox.getSize(new Vector3());
  const fittedDimension = Math.max(scaledSize.y, scaledSize.x / camera.aspect, scaledSize.z / camera.aspect);
  const distance = (fittedDimension / (2 * Math.tan((camera.fov * Math.PI) / 360))) * 1.3;
  const target = new Vector3(0, (scaledBox.min.y + scaledBox.max.y) / 2, 0);
  // Start directly in front of the model so the ground grid is level and
  // symmetrical; orbit controls still let the user inspect any angle.
  const cameraDirection = new Vector3(0, 0.55, 1).normalize();
  const overviewDistance = Math.max(distance, 4.5);
  camera.position.copy(target).add(cameraDirection.multiplyScalar(overviewDistance));
  controls.minDistance = Math.max(overviewDistance * 0.2, 1.2);
  controls.maxDistance = Math.max(overviewDistance * 5, 20);
  controls.target.copy(target);
  controls.update();
  return holder;
}

function removeOversizedGroundMeshes(model: Object3D) {
  const meshes: Array<{ mesh: Mesh; size: Vector3 }> = [];

  model.updateMatrixWorld(true);
  model.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    const size = new Box3().setFromObject(child).getSize(new Vector3());
    meshes.push({ mesh: child, size });
  });

  const largestNonGroundArea = Math.max(
    1,
    ...meshes
      .filter(({ size }) => !isFlatGround(size))
      .map(({ size }) => size.x * size.z),
  );

  const removed: Object3D[] = [];
  meshes.forEach(({ mesh, size }) => {
    const groundArea = size.x * size.z;
    // CAD and FBX exports often include a huge, almost-flat presentation floor.
    // It makes the useful object appear tiny, so use our own grid instead.
    if (isFlatGround(size) && groundArea > largestNonGroundArea * 4) {
      mesh.removeFromParent();
      removed.push(mesh);
    }
  });

  return removed;
}

function isFlatGround(size: Vector3) {
  const narrowestHorizontalDimension = Math.min(size.x, size.z);
  const widestDimension = Math.max(size.x, size.z);
  return narrowestHorizontalDimension > 0 && size.y <= widestDimension * 0.02;
}

function disposeObject(object: Object3D) {
  object.traverse((child) => {
    const mesh = child as Mesh;
    mesh.geometry?.dispose();
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.filter(Boolean).forEach((material) => (material as Material).dispose());
  });
}

function getExtension(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

function normalizeResourcePath(path: string) {
  try {
    const cleaned = decodeURIComponent(path)
      .split(/[?#]/)[0]
      .replace(/\\/g, "/")
      .replace(/^\.\//, "")
      .toLowerCase();
    const withoutBlob = cleaned.replace(/^blob:[^/]+/, "");
    const relativePath = withoutBlob.match(/^(?:[a-z]+:)?\/\/[^/]+(.*)$/i)?.[1] ?? withoutBlob;
    return relativePath.replace(/^\/+/, "");
  } catch {
    const cleaned = path.split(/[?#]/)[0].replace(/\\/g, "/").replace(/^\.\//, "").toLowerCase();
    const withoutBlob = cleaned.replace(/^blob:[^/]+/, "");
    const relativePath = withoutBlob.match(/^(?:[a-z]+:)?\/\/[^/]+(.*)$/i)?.[1] ?? withoutBlob;
    return relativePath.replace(/^\/+/, "");
  }
}

function mergeResourceFiles(currentResources: File[], addedResources: File[]) {
  const uniqueResources = new Map<string, File>();
  [...currentResources, ...addedResources].forEach((resource) => {
    const key = normalizeResourcePath(resource.webkitRelativePath || resource.name);
    uniqueResources.set(key, resource);
  });
  return [...uniqueResources.values()];
}

function findResourceUrl(resourceUrls: Map<string, string>, requestedPath: string, requestedName: string) {
  const exactMatch = resourceUrls.get(requestedPath) || resourceUrls.get(requestedName);
  if (exactMatch) return exactMatch;

  // Browsers can turn a relative glTF URI into an absolute blob URL before it
  // reaches the manager. Match its trailing path as well as the original URI.
  for (const [resourcePath, resourceUrl] of resourceUrls) {
    if (requestedPath.endsWith(`/${resourcePath}`) || resourcePath.endsWith(`/${requestedName}`)) {
      return resourceUrl;
    }
  }

  return undefined;
}

function formatFileSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function TipCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="relative flex h-[110px] items-center justify-center overflow-hidden rounded-[18px] border border-white/[0.18] bg-[linear-gradient(135deg,rgba(36,48,72,0.74),rgba(18,25,42,0.82))] shadow-[0_10px_28px_rgba(2,6,23,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/18 before:to-transparent">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <div className="relative flex h-[42px] w-[42px] items-center justify-center">
          {icon}
        </div>
        <span className="text-[0.82rem] font-medium tracking-[-0.01em] text-[#EAF1FF]">{label}</span>
      </div>
    </div>
  );
}
