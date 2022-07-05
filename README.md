## This project is for demonstration purposes only.

## use the following steps to run this project
  - `npm install`: to install dependencies for *web-ide* project and *web-server* project using pnpm, if pnpm is not installed globally, please install it first or change corresponding scripts to use other package manager like npm or yarn
  - `npm run init`: this project has a zipped chrome devtools ui package at web-server/inspector.zip, this step is to unzip the package
  - `npm run start`: to start the web-server and web-ide

## implementation

  - web-ide
    - monaco editor, using @monaco-editor/react

  - web-server
    - use `node --inspect-brk` to start a debugging node instance
    - use koa and koa-websocket to forwarding websocket messages between chrome devtools and debugging node instance
      - [why?](#why)

## something found during implementing this demo

- chrome-devtools-frontend is not usable directly

- chrome devtools frontend can be built step by step like below:
  - install depot_tools by cloning repo and set PATH
  - install gn by cloning repo and run python build/gen.py(or python3 build/gen.py)
  - build chrome devtools frontend following this doc https://chromium.googlesource.com/devtools/devtools-frontend/+/refs/heads/chromium/3965/README.md

<span id="why"></span>
- chrome devtools cannot connect to node instance running in debugging mode
  - maybe node doesn't allow this happening for safety concern

- need to initialize a ws proxy between devtools frontend and node instance

- ```node --inspect-brk=9222 index.js``` if node is already inspecting on the specified port, it will execute the script without waiting for the debugger to connect

- when redirecting CDP message between web socket instances, the message is originally Buffer type, we need to convert it to string type before sending.