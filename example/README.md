# Default character dance game

Open **index.html** in a current desktop Chrome or Edge browser. The UI defaults to English; use the top language button to switch to Chinese. Music starts automatically when allowed by your browser. If blocked, click Enable sound or interact with the page. It is a single HTML file containing the game, Three.js, the supplied video/audio and the default character with its captured body/finger motion. No server, API key, installation or internet connection is required. GitHub's file page displays source: download the HTML before opening it.

- **Play:** enter each direction sequence using arrow keys or WASD, then press Space when the marker reaches the bright zone. Phones have direction buttons and a Space button.
- **Modes:** Easy, Challenge and automatic Demo. Demo scores do not update player records.
- **Controls:** pause/resume, restart, sound, camera and expandable original video.
- **Stage:** procedural blue-white concert lights, abstract LED wall and reflective floor; no logo or poster inputs.

Input: user-supplied `198749558-1-208.mp4`, 22.395 seconds, with its original soundtrack. The existing capture for this exact video was reused; no new paid capture was submitted. The default GLB's geometry/rig is retained and its previously captured body/finger animation is baked into the embedded model. Motion is scaled to the video's duration; existing ground repair can flatten airborne movement. The chart uses an automatically estimated tempo of about 109 BPM and offset 0.15 seconds, not an official song chart or manually certified transcription.

The HTML is approximately 12 MB. It runs locally; browser recording/export is not part of this game. Performance depends on WebGL support and device capability. Browser-local high scores may behave differently under file URLs or privacy settings.

Three.js license is provided alongside the HTML. The MIT code license does not grant rights to the supplied music/video or default character. No public hosting is implied by this local example.

## 中文使用说明

双击 **index.html**，使用 Chrome 或 Edge 打开，默认英文，可通过顶部按钮切换中文，再点击“开始跳舞”。先输入方向组合，再在亮区按空格；手机使用底部方向按钮和卡点按钮。可选择轻松、挑战或自动演示模式，演示不会写入玩家最高分。

示例包含原视频及原声、default GLB 角色的真实身体与手指动作，以及无需额外图片的蓝白演出舞台，离线可用。这次复用了同一视频已有的动捕结果，没有新增付费动捕。节拍约 109 BPM，为自动估计；现有接地修复可能压低跳跃高度。

## Validation

Verified in desktop Chrome from a file URL with external networking blocked: full 9-round demo (9 PERFECT, no missed rounds), demo score isolation, manual keyboard scoring, duplicate-hit prevention, pause/resume, restart, changing finger poses and finite bone transforms. A 390×844 viewport passed layout and touch-direction checks. Other browsers/devices have not been certified.

Music preview loops while idle without scoring. Starting a round restarts the source from zero; pause and mute remain available. Language switches do not restart the game.
