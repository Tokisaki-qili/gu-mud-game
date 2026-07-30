// ==================== UI 系统 ====================
function updateUI(){
  // 先构建状态元素
  buildPlayerStats();
  // 移动端底部状态条
  document.getElementById('msb-rank').textContent=RANK_NAMES[player.rank]+'·'+RANK_SUB[player.rankSub];
  document.getElementById('msb-hp').textContent=player.hp+'/'+player.maxHp;
  document.getElementById('msb-essence').textContent=player.essence+'/'+player.maxEssence;
  document.getElementById('msb-gold').textContent=player.gold;
  // 桌面空窍列表
  const guList=document.getElementById('gu-list');
  guList.innerHTML='';
  player.apertureSlots.forEach((gu,i)=>{
    if(!gu)return;
    const div=document.createElement('div');
    div.className='inv-item gu-rank'+gu.rank;
    div.innerHTML='🐛 <span class="gu-name">'+gu.name+'</span> <span style="font-size:11px;color:#8a7a60">'+RANK_NAMES[gu.rank]+'</span>';
    div.title=gu.desc||'';
    div.onclick=()=>{unequipGu(i)};
    guList.appendChild(div);
  });
  if(player.apertureSlots.length===0)guList.innerHTML='<span style="color:#8a7a60;font-size:12px;">空窍中暂无蛊虫</span>';
  // 成就
  const achList=document.getElementById('achievement-list');
  achList.innerHTML='';
  player.achievements.forEach(a=>{
    const span=document.createElement('span');
    span.className='achievement-badge';span.textContent=a;
    achList.appendChild(span);
  });
}
function buildPlayerStats(){
  const container=document.getElementById('player-stats');
  container.innerHTML=
    '<div class="stat-row"><span class="stat-label">姓名</span><span class="stat-value">'+player.name+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">修为</span><span class="stat-value rank" id="stat-rank">'+RANK_NAMES[player.rank]+'·'+RANK_SUB[player.rankSub]+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">生命</span><span class="stat-value health" id="stat-hp">'+player.hp+'/'+player.maxHp+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">真元</span><span class="stat-value essence" id="stat-essence">'+player.essence+'/'+player.maxEssence+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">灵石</span><span class="stat-value gold" id="stat-gold">'+player.gold+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">攻击</span><span class="stat-value" id="stat-atk">'+player.atk+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">防御</span><span class="stat-value" id="stat-def">'+player.def+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">空窍容量</span><span class="stat-value" id="stat-aperture">'+player.apertureSlots.length+'/'+player.apertureSize+'</span></div>';
  // 移动端同步
  document.getElementById('mobile-stats').innerHTML=
    '<div class="stat-row"><span class="stat-label">姓名</span><span class="stat-value">'+player.name+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">修为</span><span class="stat-value rank">'+RANK_NAMES[player.rank]+'·'+RANK_SUB[player.rankSub]+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">生命</span><span class="stat-value health">'+player.hp+'/'+player.maxHp+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">真元</span><span class="stat-value essence">'+player.essence+'/'+player.maxEssence+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">灵石</span><span class="stat-value gold">'+player.gold+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">攻击</span><span class="stat-value">'+player.atk+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">防御</span><span class="stat-value">'+player.def+'</span></div>'+
    '<div class="stat-row"><span class="stat-label">空窍容量</span><span class="stat-value">'+player.apertureSlots.length+'/'+player.apertureSize+'</span></div>';
  const mgl=document.getElementById('mobile-gu-list');mgl.innerHTML='';
  player.apertureSlots.forEach((gu,i)=>{if(!gu)return;const div=document.createElement('div');div.className='inv-item gu-rank'+gu.rank;div.innerHTML='🐛 <span class="gu-name">'+gu.name+'</span> '+RANK_NAMES[gu.rank];div.onclick=()=>{unequipGu(i)};mgl.appendChild(div);});
  const mal=document.getElementById('mobile-achi-list');mal.innerHTML='';
  player.achievements.forEach(a=>{const span=document.createElement('span');span.className='achievement-badge';span.textContent=a;mal.appendChild(span);});
}

function showInventory(){
  const box=document.getElementById('modal-box');
  document.getElementById('modal-overlay').classList.add('active');
  let html='<h3>🎒 蛊虫袋</h3>';
  if(player.inventory.length===0){html+='<p>蛊虫袋空空如也</p>';}else{
    player.inventory.forEach((gu,i)=>{
      const equipped=player.apertureSlots.includes(gu);
      html+='<div style="padding:8px;margin:4px 0;background:rgba(240,232,216,'+(equipped?'0.8':'0.3')+');border-left:3px solid '+(equipped?'#40a040':'#c0b090')+';cursor:pointer" onclick="toggleEquip('+i+')">🐛 <span class="gu-name">'+gu.name+'</span> '+RANK_NAMES[gu.rank]+' | '+gu.effect+' | 消耗'+gu.essence+'真元'+(equipped?' <span style="color:#40a040">[已装备]</span>':'')+'</div>';
    });
  }
  html+='<p style="color:#8a6a30;font-size:12px;">点击蛊虫装备/卸下（容量：'+player.apertureSlots.length+'/'+player.apertureSize+'）</p><br><button onclick="closeModal()">关闭</button>';
  box.innerHTML=html;
}
function showAperture(){
  const box=document.getElementById('modal-box');document.getElementById('modal-overlay').classList.add('active');
  let html='<h3>💠 空窍</h3><p>容量：<b>'+player.apertureSlots.length+'/'+player.apertureSize+'</b></p><p>资质：<b>'+(player.storyFlags.apertureQuality||'未知')+'</b></p><div style="margin:10px 0">';
  for(let i=0;i<player.apertureSize;i++){const gu=player.apertureSlots[i];html+=gu?'<span class="gu-slot filled" title="'+gu.name+'" onclick="unequipGu('+i+');closeModal()">🐛</span>':'<span class="gu-slot"></span>';}
  html+='</div><br><button onclick="closeModal()">关闭</button>';box.innerHTML=html;
}
function showEquipment(){
  const box=document.getElementById('modal-box');document.getElementById('modal-overlay').classList.add('active');
  let html='<h3>⚔️ 装备</h3>';
  html+='<div style="padding:8px;margin:4px 0;background:rgba(240,232,216,0.5)"><b>武器：</b>'+(player.equipment.weapon||'无')+'</div>';
  html+='<div style="padding:8px;margin:4px 0;background:rgba(240,232,216,0.5)"><b>防具：</b>'+(player.equipment.armor||'无')+'</div>';
  html+='<div style="padding:8px;margin:4px 0;background:rgba(240,232,216,0.5)"><b>饰品：</b>'+(player.equipment.accessory||'无')+'</div>';
  html+='<br><button onclick="closeModal()">关闭</button>';box.innerHTML=html;
}
function showAchievements(){
  const box=document.getElementById('modal-box');document.getElementById('modal-overlay').classList.add('active');
  let html='<h3>🏆 成就</h3>';
  if(player.achievements.length===0){html+='<p>暂无成就，继续冒险吧！</p>';}else{player.achievements.forEach(a=>{html+='<div style="padding:6px;margin:3px 0;background:rgba(200,60,30,0.05);border-radius:3px">🏆 '+a+'</div>';});}
  html+='<br><button onclick="closeModal()">关闭</button>';box.innerHTML=html;
}
function showHelp(){
  const box=document.getElementById('modal-box');document.getElementById('modal-overlay').classList.add('active');
  box.innerHTML='<h3>❓ 游戏帮助</h3><p><b>基本玩法：</b>阅读故事文本，从选项中选择行动。</p><p><b>空窍系统：</b>空窍是装备蛊虫的空间，容量有限。</p><p><b>蛊虫系统：</b>分攻击/防御/治疗/特殊四种类型。</p><p><b>融合系统：</b>两只蛊虫可融合成更强的蛊虫。</p><p><b>杀招系统：</b>强力技能，需特定蛊虫支持。</p><p><b>修为系统：</b>一转至九转，每转分初阶/中阶/高阶/巅峰。</p><p><b>福地系统：</b>分外围/内围/核心三层。</p><p><b>存档系统：</b>localStorage 本地存储，关闭浏览器不丢失。</p><br><button onclick="closeModal()">关闭</button>';
}
function closeModal(){document.getElementById('modal-overlay').classList.remove('active');}
function toggleMobilePanel(){
  const drawer=document.getElementById('mobile-drawer');
  const overlay=document.getElementById('mobile-drawer-overlay');
  if(drawer.classList.contains('active')){drawer.classList.remove('active');overlay.classList.remove('active');}
  else{drawer.classList.add('active');overlay.classList.add('active');}
}
function addLog(type,msg){
  const out=document.getElementById('story-output');
  const clsMap={system:'system',loot:'loot',cultivation:'cultivation'};
  const cls=clsMap[type]||'narrate';
  out.innerHTML+='<span class="'+cls+'">['+type+'] '+msg+'</span><br>';
  out.scrollTop=out.scrollHeight;
}