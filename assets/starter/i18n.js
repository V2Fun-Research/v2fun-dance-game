// UI text bindings update in place; switching language never restarts the game.
const dictionary={"Enable sound":"点击开启音乐","Dance Live": "舞力现场", "Own the Stage": "舞力全开", "Own the ": "舞力", "Stage": "全开", "Toggle sound": "切换声音", "Sound ON": "声音 ON", "Sound OFF": "声音 OFF", "Pause Ⅱ": "暂停 Ⅱ", "Resume ▶": "继续 ▶", "View ↻": "视角 ↻", "Ready to hit the beat?": "准备好踩准节拍？", "Direction combos × timed hits": "方向组合 × 空格卡点", "SCORE": "SCORE / 得分", "BEST": "BEST / 最高分", "Combo": "当前连击", "Accuracy": "命中准确率", "Challenge": "挑战", "Easy": "轻松", "Demo": "演示", "3 directions per round, with a wider timing window.": "每组 3 个方向，更宽松的卡点判定。", "4–5 directions per round, with tighter timing.": "每组 4–5 个方向，挑战更精准的卡点。", "Automatic play. Enjoy the full dance.": "自动完成按键，欣赏完整舞蹈。", "The original dance video": "舞蹈来自这段视频", "Music and motion play in sync": "音乐与动作同步播放", "Show video ↗": "展开原视频 ↗", "Hide video ↙": "收起原视频 ↙", "Loading dance…": "正在加载舞蹈…", "Arrows / WASD · SPACE to hit · P to pause": "方向键 / WASD 输入 · SPACE 卡点 · P 暂停", "Enter the arrows, then press Space in the bright zone": "先完成方向组合，再在亮区按下空格", "Ready when you are": "等待开始", "HIT": "卡点", "Local dance game · Three.js": "本地舞蹈游戏 · Three.js", "You owned the stage.": "漂亮，舞台属于你。", "Best combo": "最高连击", "Dance again ↗": "再次登台 ↗", "Back to stage": "返回舞台", "Dance track": "舞蹈曲目", "Video motion capture": "视频动捕舞蹈", "Character and motion ready": "角色与舞蹈已就绪", "Start dancing ↗": "开始跳舞 ↗", "Restart ↻": "重新开始 ↻", "Feel the music. Get ready.": "跟着音乐，准备出发", "FEEL THE BEAT · GET READY": "跟上节拍 · 准备登台", "Press Resume to play": "点击继续播放", "Keep going. Next round coming up": "继续，下一组马上开始", "Early · ": "稍早 · ", "Late · ": "稍晚 · ", "Ready! Press Space in the bright zone": "准备好了！亮区按空格", "Keep entering the arrows": "继续输入方向组合", "Wrong direction. Start this sequence again": "方向不对，从这一组开头重来", "Too early. Wait for the bright zone": "太早了，等白线到亮区", "Finish the arrow sequence": "完成方向组合", "Enter the arrow sequence": "输入方向组合", "Demo · not saved to best score": "自动演示 · 不计入最高分", "Easy · stage complete": "轻松模式 · 舞台完成", "Challenge · stage complete": "挑战模式 · 舞台完成", "Video unavailable. Check assets/source.mp4": "原视频无法播放，请检查 assets/source.mp4", "Dance loading failed: ": "舞蹈加载失败：", "Loading failed. Please reload": "加载失败，请刷新", " BPM · LIVE DANCE": " BPM · 舞蹈现场", "Default character · body & hand capture · ": "默认角色 · 身体与手指动捕 · ", "Video motion capture · ": "视频动捕 · ", " s": " 秒", "DEFAULT · Captured dance": "DEFAULT · 视频舞蹈", "READY TO DANCE": "准备跳舞", "ROUND ": "回合 ", "COMBO": "连击", "PERFECT!": "完美！", "GOOD": "良好", "MISS": "错过", "TOO EARLY": "太早了", "PAUSED": "已暂停", "START!": "开始！", "LIVE PERFORMANCE": "现场演出", "YOUR STAGE. YOUR MOMENT.": "你的舞台，你的时刻。", "LIVE DANCE STAGE": "现场舞蹈舞台", "THE NIGHT IS YOURS.": "今夜，舞台属于你。", "YOUR SESSION": "你的舞台", "LIVE STAGE": "现场舞台", "THE ORIGINAL": "原始视频", "FEEL THE BEAT. OWN THE STAGE.": "跟随节拍，掌控舞台。", "STAGE COMPLETE": "舞台完成", "PERFECT": "完美", "✦ GROOVE ENERGY ✦": "✦ 节拍能量 ✦", "YOUR VIDEO. YOUR STAGE.": "你的视频，你的舞台。"};
let language='en';
const sources=new WeakMap();
const entries=Object.entries(dictionary).sort((a,b)=>b[0].length-a[0].length);
const chinese=entries.map(([en,zh])=>[zh,en]).sort((a,b)=>b[0].length-a[0].length);
function makeTranslator(list){
 const map=new Map(list),keys=[...map.keys()].sort((a,b)=>b.length-a.length);
 const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const regex=new RegExp(keys.map(escape).join('|'),'g');
 return text=>text.replace(regex,key=>map.get(key));
}
const english=makeTranslator(chinese),toChinese=makeTranslator(entries);
function translate(text){return language==='en'?text:toChinese(text)}
function refresh(){
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){
  if(node.parentElement?.closest('script,style,[data-no-translate]'))continue;
  let binding=sources.get(node);
  if(!binding||binding.last!==node.nodeValue)binding={source:english(node.nodeValue)};
  const value=translate(binding.source);if(node.nodeValue!==value)node.nodeValue=value;
  binding.last=value;sources.set(node,binding);
 }
 document.documentElement.lang=language==='en'?'en':'zh-CN';
 const button=document.getElementById('language');button.textContent=language==='en'?'中文':'English';button.setAttribute('aria-label',language==='en'?'Switch to Chinese':'切换为英文');
 document.getElementById('sound').title=language==='en'?'Toggle sound':'切换声音';
 document.title=language==='en'?'V2Fun Dance Game':'V2Fun 劲舞团游戏';
}
export function initLanguage(){
 const observer=new MutationObserver(()=>{observer.disconnect();refresh();observe()});
 const observe=()=>observer.observe(document.body,{subtree:true,childList:true,characterData:true});
 document.getElementById('language').onclick=()=>{language=language==='en'?'zh':'en';observer.disconnect();refresh();observe()};
 refresh();observe();
 return {get language(){return language},refresh};
}
