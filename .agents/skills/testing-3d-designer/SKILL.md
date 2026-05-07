---
name: testing-3d-designer
description: Test the /designer local 3D house/flat design studio end-to-end. Use when validating room/object editing, 2D/3D rendering, import/export, or AI design suggestions.
---

# Testing the 3D Designer

## Devin Secrets Needed
- `GEMINI_API_KEY` (optional): enables Gemini-backed AI suggestions. If unavailable, `/api/designer/assistant` should fall back to local heuristic suggestions.

## Setup
1. Install dependencies from the repo root:
   ```bash
   npm install
   ```
2. Start the local app:
   ```bash
   npm run dev
   ```
3. For VM GUI testing where default Chrome/WebGL is unavailable, launch Chrome with SwiftShader:
   ```bash
   DISPLAY=:0 /usr/bin/google-chrome-stable --remote-debugging-port=29230 --user-data-dir=/home/ubuntu/.browser_data_dir_swiftshader --no-first-run --no-default-browser-check --ignore-gpu-blocklist --enable-webgl --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --new-window http://localhost:3000/designer
   ```
4. If Chrome is not installed in the VM, install the official `.deb` and `wmctrl` before recording GUI tests:
   ```bash
   sudo apt-get update
   sudo apt-get install -y wmctrl
   curl -L -o /home/ubuntu/google-chrome-stable_current_amd64.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
   sudo apt-get install -y /home/ubuntu/google-chrome-stable_current_amd64.deb
   ```

## Golden Path
1. Open `http://localhost:3000/designer` and confirm the project panel, 2D plan, 3D preview, inspector, object catalog, and AI assistant render.
2. Add a room, divide it, and confirm the room count/area and both 2D and 3D previews update.
3. Add an object from the catalog, select it in the 2D plan, then verify inspector controls such as copy, rotate, lock/unlock, color, and delete.
4. Rename the project and refresh the page; confirm the project name, rooms, and objects persist.
5. Export JSON, click Sample to reset, then import the exported file and confirm the layout restores.
6. Click "Improve this design" and verify the assistant returns a summary and actionable suggestions. The provider badge may say Gemini when `GEMINI_API_KEY` is available or local fallback otherwise.

## Known Testing Notes
- In GPU-limited VMs, Three.js may fail to create a WebGL context unless Chrome is launched with SwiftShader flags.
- A hard refresh may be needed after a VM process restart if Chrome restores to the Next.js dynamic loading fallback.
- `GET /favicon.ico 500` may appear in dev-server logs and does not necessarily block the `/designer` route.
