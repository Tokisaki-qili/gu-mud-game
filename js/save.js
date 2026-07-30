// ==================== 存档系统 ====================
const SAVE_KEY='gu_mud_save_v2';
const AUTO_SAVE_KEY='gu_mud_autosave_v2';
const MAX_SAVES=5;

function saveGame(slot){
  if(!slot) slot=0;
  const saveData={
    version:2,timestamp:new Date().toLocaleString('zh-CN'),
    player:{
      rank:player.rank,rankSub:player.rankSub,
      hp:player.hp,maxHp:player.maxHp,essence:player.essence,maxEssence:player.maxEssence,
      atk:player.atk,def:player.def,gold:player.gold,apertureSize:player.apertureSize,
      apertureSlotNames:player.apertureSlots.map(g=>g?g.name:null).filter(Boolean),
      inventoryNames:player.inventory.map(g=>g.name),
      equipment:{...player.equipment},achievements:[...player.achievements],
      killerMoves:[...player.killerMoves],storyFlags:{...player.storyFlags},
    },
    currentNode,storyHTML:document.getElementById('story-output').innerHTML,
  };
  const key=slot===0?AUTO_SAVE_KEY:(SAVE_KEY+'_'+slot);
  localStorage.setItem(key,JSON.stringify(saveData));
  addLog('system',slot===0?'💾 自动存档成功！':'💾 存档位 '+slot+' 保存成功！');
  return true;
}
function autoSave(){saveGame(0);}

function loadGame(){
  const box=document.getElementById('modal-box');
  document.getElementById('modal-overlay').classList.add('active');
  let html='<h3>📂 读取存档</h3>';let hasAny=false;
  const autoData=localStorage.getItem(AUTO_SAVE_KEY);
  if(autoData){hasAny=true;try{
    const d=JSON.parse(autoData);
    html+='<button onclick="restoreSave(\''+AUTO_SAVE_KEY+'\')" style="display:block;width:100%;text-align:left;padding:12px;margin:6px 0;background:rgba(240,232,216,0.5);border:1px solid var(--border);color:var(--ink);border-radius:4px;cursor:pointer">🟢 <b>自动存档</b><br><span style="font-size:12px;color:#8a6a30">'+d.timestamp+' | 修为：'+RANK_NAMES[d.player.rank]+'·'+RANK_SUB[d.player.rankSub]+' | 灵石：'+d.player.gold+'</span></button>';
  }catch(e){}}
  for(let i=1;i<=MAX_SAVES;i++){const key=SAVE_KEY+'_'+i;const data=localStorage.getItem(key);
    if(data){hasAny=true;try{const d=JSON.parse(data);
      html+='<button onclick="restoreSave(\''+key+'\')" style="display:block;width:100%;text-align:left;padding:12px;margin:6px 0;background:rgba(240,232,216,0.5);border:1px solid var(--border);color:var(--ink);border-radius:4px;cursor:pointer">📁 <b>存档位 '+i+'</b><br><span style="font-size:12px;color:#8a6a30">'+d.timestamp+' | 修为：'+RANK_NAMES[d.player.rank]+'·'+RANK_SUB[d.player.rankSub]+' | 灵石：'+d.player.gold+'</span></button>';
    }catch(e){}}}
  if(!hasAny){html+='<p style="color:#8a6a30;">暂无存档。冒险后会自动存档。</p>';}
  html+='<br><div style="display:flex;gap:6px;flex-wrap:wrap">';
  for(let i=1;i<=MAX_SAVES;i++){html+='<button onclick="saveGame('+i+');closeModal()" style="flex:1;min-width:40px;padding:8px">💾 存档'+i+'</button>';}
  html+='</div><br><button onclick="closeModal()" style="width:100%">关闭</button>';
  box.innerHTML=html;
}

function restoreSave(key){
  const raw=localStorage.getItem(key);if(!raw)return;
  try{const d=JSON.parse(raw);const p=d.player;
    player.rank=p.rank;player.rankSub=p.rankSub;player.hp=p.hp;player.maxHp=p.maxHp;
    player.essence=p.essence;player.maxEssence=p.maxEssence;player.atk=p.atk;player.def=p.def;
    player.gold=p.gold;player.apertureSize=p.apertureSize;
    player.equipment={...p.equipment};player.achievements=[...p.achievements];
    player.killerMoves=[...p.killerMoves];player.storyFlags={...p.storyFlags};
    player.inventory=[];p.inventoryNames.forEach(name=>{const data=GU_DATABASE[name];if(data){player.inventory.push({name,rank:data.rank,type:data.type,effect:data.effect,atk:data.atk||0,def:data.def||0,essence:data.essence||5,poison:data.poison||0,poisonDuration:data.poisonDuration||0,slow:data.slow||0,duration:data.duration||0,heal:data.heal||0,revive:data.revive||0,desc:data.desc});}});
    player.apertureSlots=[];p.apertureSlotNames.forEach(name=>{const gu=player.inventory.find(g=>g.name===name);if(gu&&player.apertureSlots.length<player.apertureSize){player.apertureSlots.push(gu);}});
    currentNode=d.currentNode;document.getElementById('story-output').innerHTML=d.storyHTML||'';
    closeModal();updateUI();
    addLog('system','📂 存档读取成功！欢迎回来，蛊师 '+player.name);
    const node=getNode(currentNode);if(node)renderChoices(node);
  }catch(e){addLog('system','❌ 存档损坏，无法读取');}
}

function hasSaveData(){for(let i=1;i<=MAX_SAVES;i++){if(localStorage.getItem(SAVE_KEY+'_'+i))return true;}return!!localStorage.getItem(AUTO_SAVE_KEY);}