"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
// We'll use TextGeometry for the "S" in Strudel, so we need the loader
// @ts-ignore
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { FileLoader } from "three";
import { TextureLoader } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
// @ts-ignore
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

type Mini3DButtonProps = {
    variant: "register" | "discord" | "strudel";
    onClick?: () => void;
};

export default function Mini3DButton({ variant, onClick }: Mini3DButtonProps) {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const mount = mountRef.current;

        // basic scene
        const scene = new THREE.Scene();
        scene.background = null; // transparent

        // camera: orthographic-style feel using PerspectiveCamera but close
        const camera = new THREE.PerspectiveCamera(
            35,
            1, // temporary, we'll update on resize
            0.1,
            100
        );
        camera.position.z = 4;

        // renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(200, 200); // default, will resize below
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.display = "block";
        renderer.domElement.style.cursor = "pointer";
        mount.appendChild(renderer.domElement);

        // lighting
        const light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(2, 2, 4);
        scene.add(light1);

        const light2 = new THREE.DirectionalLight(0xffffff, 0.4);
        light2.position.set(-2, -1, -3);
        scene.add(light2);

        const group = new THREE.Group();
        scene.add(group);

        // helper to create a ticket/pass shape for "register" variant
        function makePassShape() {
            const geo = new THREE.BoxGeometry(2, 1.2, 0.2);
            const mat = new THREE.MeshStandardMaterial({
                color: 0x00ffaa,
                metalness: 0.3,
                roughness: 0.25,
                emissive: 0x003322,
                emissiveIntensity: 0.6,
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.scale.set(1, 1, 0.4);
            mesh.userData.isMain = true;
            return mesh;
        }

        function makeDiscordIcon(
            callback: (
                iconGroup: THREE.Group,
                boundsHelper: THREE.Box3Helper
            ) => void
        ) {
            const fileLoader = new FileLoader();
            const svgLoader = new SVGLoader();

            fileLoader.load(
                "/icons/discord-white-icon.svg",
                (svgText: any) => {
                    // parse raw SVG markup ourselves
                    const data = svgLoader.parse(svgText as string);

                    const iconGroup = new THREE.Group();

                    for (const path of data.paths) {
                        const shapes = path.toShapes(true);

                        console.log("SVG path", {
                            color: path.color,
                            shapesCount: shapes.length,
                        });

                        for (const shape of shapes) {
                            // We'll keep it FLAT + BASIC so lighting cannot kill it:
                            const geoFront = new THREE.ShapeGeometry(shape);
                            const matFront = new THREE.MeshBasicMaterial({
                                color: 0x5865f2,
                                side: THREE.DoubleSide,
                            });
                            const frontMesh = new THREE.Mesh(geoFront, matFront);
                            iconGroup.add(frontMesh);

                            const geoBack = new THREE.ShapeGeometry(shape);
                            const matBack = new THREE.MeshBasicMaterial({
                                color: 0x3340a8,
                                side: THREE.DoubleSide,
                            });
                            const backMesh = new THREE.Mesh(geoBack, matBack);
                            backMesh.position.z = -0.5;
                            backMesh.rotation.y = Math.PI;
                            iconGroup.add(backMesh);
                        }
                    }

                    console.log(
                        "iconGroup children after FLAT build:",
                        iconGroup.children.length
                    );

                    // Give it some tilt so it's not perfectly edge-on:
                    iconGroup.rotation.set(Math.PI / 8, Math.PI / 8, 0);

                    // Compute bounds, so we can normalize size and build a helper box
                    const preBox = new THREE.Box3().setFromObject(iconGroup);

                    const size = new THREE.Vector3();
                    const center = new THREE.Vector3();
                    preBox.getSize(size);
                    preBox.getCenter(center);

                    // Bring the visual center to origin
                    iconGroup.position.x = -center.x;
                    iconGroup.position.y = -center.y;
                    iconGroup.position.z = -center.z;

                    // Normalize scale so the biggest dimension is about 3 world units
                    const maxDim = Math.max(size.x, size.y, size.z || 1);
                    const target = 3.0;
                    const s = target / maxDim;
                    iconGroup.scale.setScalar(s);

                    // Nudge toward camera
                    iconGroup.position.z += 0.5;

                    // Make a box helper so we can SEE where it thinks it is
                    const finalBox = new THREE.Box3().setFromObject(iconGroup);
                    const boundsHelper = new THREE.Box3Helper(finalBox, 0x00ff00);

                    console.log("final bounds", {
                        size: finalBox.getSize(new THREE.Vector3()),
                        min: finalBox.min,
                        max: finalBox.max,
                    });

                    callback(iconGroup, boundsHelper);
                },
                undefined,
                (err: any) => {
                    console.error("FileLoader SVG failed", err);
                }
            );
        }



        function makeDiscordIconPlane(callback: (iconGroup: THREE.Group) => void) {
            const texLoader = new TextureLoader();

            texLoader.load(
                "/icons/discord.png",
                (map: any) => {
                    map.colorSpace = THREE.SRGBColorSpace;

                    // 1. FRONT FACE
                    const planeGeo = new THREE.PlaneGeometry(1, 1);
                    const planeMatFront = new THREE.MeshBasicMaterial({
                        map,
                        transparent: true,
                        side: THREE.FrontSide,
                    });
                    const frontMesh = new THREE.Mesh(planeGeo, planeMatFront);

                    // 2. BACK FACE (flip UV so it's readable-ish from behind)
                    const planeMatBack = new THREE.MeshBasicMaterial({
                        map,
                        transparent: true,
                        side: THREE.FrontSide,
                    });
                    const backMesh = new THREE.Mesh(planeGeo, planeMatBack);
                    backMesh.rotation.y = Math.PI;      // flip horizontally
                    backMesh.position.z = -0.05;        // slight thickness offset

                    // 3. EDGE RIM (simple thin ring so it feels like a chip)
                    // We'll approximate the rim as a cylinder ring instead of true outline
                    const rimGeo = new THREE.CylinderGeometry(
                        0.5, // radiusTop
                        0.5, // radiusBottom
                        0.05, // height (thickness)
                        32,   // radial segments
                        1,
                        true  // openEnded: true -> just the side wall, no caps
                    );
                    const rimMat = new THREE.MeshBasicMaterial({
                        color: 0x5865f2,
                    });
                    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
                    rimMesh.rotation.x = Math.PI / 2; // lay it flat so cylinder edge matches the plane
                    rimMesh.position.z = -0.025;      // center between front/back

                    // group them
                    const iconGroup = new THREE.Group();
                    iconGroup.add(frontMesh);
                    iconGroup.add(backMesh);
                    iconGroup.add(rimMesh);

                    // tilt a bit so it looks dimensional even before spin
                    iconGroup.rotation.set(Math.PI / 8, Math.PI / 8, 0);

                    // scale overall token size in world units
                    const tokenSize = 1.6; // tweak this for bigger/smaller
                    iconGroup.scale.set(tokenSize, tokenSize, tokenSize);

                    // push toward camera so it's not clipped by near plane
                    iconGroup.position.z = 0.5;

                    callback(iconGroup);
                },
                undefined,
                (err: any) => {
                    console.error("Texture load failed for discord.png", err);
                }
            );
        }


        function makeDiscordIcon3D(
            callback: (iconLogo: THREE.Group, helper: THREE.Box3Helper) => void
        ) {
            const fileLoader = new FileLoader();
            const svgLoader = new SVGLoader();

            fileLoader.load(
                "/icons/discord-white-icon.svg",
                (svgText) => {
                    const data = svgLoader.parse(svgText as string);

                    const iconGroup = new THREE.Group();

                    for (const path of data.paths) {
                        const shapes = path.toShapes(true);

                        for (const shape of shapes) {
                            // Pull bevels way back down so we don't introduce something
                            // degenerate. Keep depth high so it's chunky.
                            const geo = new THREE.ExtrudeGeometry(shape, {
                                depth: 1.0,            // thick, so it's obviously 3D
                                bevelEnabled: true,
                                bevelThickness: 0.05,  // small again
                                bevelSize: 0.05,
                                bevelSegments: 2,
                            });

                            const mat = new THREE.MeshStandardMaterial({
                                color: 0xff00ff,          // magenta debug
                                emissive: 0xff00ff,
                                emissiveIntensity: 0.6,
                                metalness: 0.2,
                                roughness: 0.3,
                                side: THREE.DoubleSide,
                            });

                            const mesh = new THREE.Mesh(geo, mat);
                            iconGroup.add(mesh);
                        }
                    }

                    // --- CENTER & SCALE ---

                    // compute bounds in its current local space
                    const preBox = new THREE.Box3().setFromObject(iconGroup);
                    const size = new THREE.Vector3();
                    const center = new THREE.Vector3();
                    preBox.getSize(size);
                    preBox.getCenter(center);

                    // recenter pivot to origin
                    iconGroup.position.x = -center.x;
                    iconGroup.position.y = -center.y;
                    iconGroup.position.z = -center.z;

                    // scale so it fits in card
                    const maxDim = Math.max(size.x, size.y, size.z || 1);
                    const target = 2.0; // 2 world units across
                    const s = target / maxDim;
                    iconGroup.scale.setScalar(s);

                    // NOW do NOT tilt. Keep facing camera.
                    // IMPORTANT: we won't rotate here.

                    // put in front of camera a bit
                    iconGroup.position.set(-1, -0.5, 0.5);

                    // helper box so we can SEE where three thinks it is
                    const finalBox = new THREE.Box3().setFromObject(iconGroup);
                    const helper = new THREE.Box3Helper(finalBox, 0x00ff00);

                    console.log("FINAL DEBUG after extrude:", {
                        sizeBeforeScale: { x: size.x, y: size.y, z: size.z },
                        maxDim,
                        scaleUsed: s,
                        groupPos: {
                            x: iconGroup.position.x,
                            y: iconGroup.position.y,
                            z: iconGroup.position.z,
                        },
                    });

                    callback(iconGroup, helper);
                },
                undefined,
                (err) => {
                    console.error("FileLoader SVG failed", err);
                }
            );
        }







        // helper to create text mesh for "S"
        function makeStrudelText(callback: (mesh: THREE.Mesh) => void) {
            const loader = new FontLoader();
            loader.load(
                "/fonts/helvetiker_bold.typeface.json",
                (font: any) => {
                    const geo = new TextGeometry("S", {
                        font: font,
                        size: 2,
                        depth: 0.5,
                        curveSegments: 1,
                        bevelEnabled: true,
                        bevelThickness: 0.05,
                        bevelSize: 0.05,
                        bevelOffset: 0,
                        bevelSegments: 5
                    });
                    geo.computeBoundingBox();
                    geo.center();

                    const mat = new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        metalness: 0.5,
                        roughness: 0.2,
                        emissive: 0xffc744,
                        emissiveIntensity: 0.5,
                    });

                    const mesh = new THREE.Mesh(geo, mat);
                    mesh.userData.isMain = true;
                    callback(mesh);
                }
            );
        }

        const debugMat = new THREE.MeshBasicMaterial({ color: 0xff00ff });
        const debugGeo = new THREE.BoxGeometry(1, 1, 1);
        const debugCube = new THREE.Mesh(debugGeo, debugMat);
        // create geometry depending on variant
        if (variant === "discord") {
            makeDiscordIcon3D((iconLogo, helper) => {
                group.add(iconLogo);
            });
        }
        else if (variant === "register") {
            // Neon pass/badge
            const pass = makePassShape();
            group.add(pass);

            // Optional small accent strip like a barcode / ticket edge:
            const barGeo = new THREE.BoxGeometry(0.1, 0.9, 0.1);
            const barMat = new THREE.MeshStandardMaterial({
                color: 0x002211,
                emissive: 0x00ffaa,
                emissiveIntensity: 1.0,
                metalness: 0.2,
                roughness: 0.4,
            });
            const bar = new THREE.Mesh(barGeo, barMat);
            bar.position.set(0.9, 0, 0.3);
            group.add(bar);
        } else if (variant === "strudel") {
            // We'll async-load text "S"
            makeStrudelText((mesh) => {
                group.add(mesh);
            });
        }

        // track hover state manually
        let hover = false;
        let scaleTarget = 1;

        function handleEnter() {
            hover = true;
            scaleTarget = 1.15;
        }

        function handleLeave() {
            hover = false;
            scaleTarget = 1;
        }

        function handleClick() {
            onClick?.();
        }

        renderer.domElement.addEventListener("pointerenter", handleEnter);
        renderer.domElement.addEventListener("pointerleave", handleLeave);
        renderer.domElement.addEventListener("click", handleClick);

        // resize handling
        function resize() {
            const rect = mount.getBoundingClientRect();
            const size = Math.min(rect.width, 200); // keep it square-ish
            renderer.setSize(size, size);
            camera.aspect = 1;
            camera.updateProjectionMatrix();
        }
        resize();
        window.addEventListener("resize", resize);

        // animate
        const clock = new THREE.Clock();
        let frameId: number;

        function animate() {
            const t = clock.getElapsedTime();

            group.rotation.y = t * 0.6;
            group.rotation.x = Math.sin(t * 0.5) * 0.2;

            const current = group.scale.x;
            const next = current + (scaleTarget - current) * 0.15;
            group.scale.set(next, next, next);

            frameId = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        // cleanup
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", resize);
            renderer.domElement.removeEventListener("pointerenter", handleEnter);
            renderer.domElement.removeEventListener("pointerleave", handleLeave);
            renderer.domElement.removeEventListener("click", handleClick);
            renderer.dispose();
            mount.removeChild(renderer.domElement);
        };
    }, [variant, onClick]);

    return (
        <div
            ref={mountRef}
            className={`
        w-full
        rounded-lg
        bg-black/40
        border border-white/10
        flex
        items-center
        justify-center
        overflow-hidden
        cursor-pointer
        aspect-square
      `}
        />
    );
}
