# electron-snake

A simple canvas-based version of the classic Snake game, packaged with Electron.
Hit Enter to begin; use arrow keys or WASD to steer; R to restart if you crash.
Note that the snake advances on a timed game loop: the controls change the
direction of your next step.

Core game logic can be found in `src`, naturally. Since I wrote this code within
a three-hour window, you will note that test coverage is decent for the inner
classes such as `Snake` and `Game`, but testing and architecture fall off as I
rushed to hook up the game logic to a renderer and UI.

The application makes use of a Canvas helper class, `Blockboard`, which I had
written for other projects.

Feel free to tweak the defaults at the top of `src/game.js`.

# Usage

```bash
git clone https://github.com/amacdougall/electron-snake # or download and extract the zipfile
npm install
npm start
```
