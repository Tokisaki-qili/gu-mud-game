// ==================== 融合+杀招系统 ====================
let currentFusionOutput=null;

function showFusion(){
  const box=document.getElementById('modal-box');
  document.getElementById('modal-overlay').classList.add('active');
  let html='<h3>🔥 蛊虫融合</h3><p style="color:#8a6a30;font-size:13px;">选择两只蛊虫进行融合（融合后原蛊虫消失）</p>';
  const available=player.inventory.slice();
  if(available.length<2){html+='<p style="color:#c04040;">需要至少两只蛊虫才能融合！</p>';}
  else{
    html+='<p style="margin-top:8px;">可用的融合配方：</p>';
    FUSION_RECIPES.forEach(recipe=>{
      const hasAll=recipe.inputs.every(name=>available.some(g=>g.name===name));
      html+='<button '+(hasAll?'':'disabled ')+'onclick="executeFusion('+FUSION_RECIPES.indexOf(recipe)+')">';
      html+=recipe.inputs.join(' + ')+' → <span class="gu-name">'+recipe.output+'</span>（'+RANK_NAMES[recipe.outputRank]+'）';
      if(!hasAll)html+=' <span style="color:#c04040;">（材料不足）</span>';
      html+='</button>';
    });
  }
  html+='<br><button onclick="closeModal()">关闭</button>';
  box.innerHTML=html;
}

function executeFusion(recipeIdx){
  const recipe=FUSION_RECIPES[recipeIdx];
  if(!recipe)return;
  const g1=player.inventory.find(g=>g.name===recipe.inputs[0]);
  const g2=player.inventory.find(g=>g.name===recipe.inputs[1]);
  if(!g1||!g2)return;
  player.inventory=player.inventory.filter(g=>g!==g1&&g!==g2);
  player.apertureSlots=player.apertureSlots.map(g=>(g===g1||g===g2)?null:g).filter(Boolean);
  const newGu={name:recipe.output,rank:recipe.outputRank,type:recipe.type,effect:recipe.effect,atk:recipe.atk||0,def:recipe.def||0,essence:recipe.essenceCost||10,poison:recipe.poison||0,poisonDuration:recipe.poisonDuration||0,desc:'融合蛊虫，威力强大',heal:recipe.type==='heal'?recipe.atk||0:0,slow:0,duration:recipe.type==='buff'?4:0,revive:0};
  player.inventory.push(newGu);
  if(player.apertureSlots.length<player.apertureSize){player.apertureSlots.push(newGu);}
  addLog('loot','✨ 融合成功！获得 <span class="gu-name">'+recipe.output+'</span>（'+RANK_NAMES[recipe.outputRank]+'）！');
  if(!player.achievements.includes('蛊虫炼师'))player.achievements.push('蛊虫炼师');
  closeModal();updateUI();renderNode('villageHub');
}

function showKillerMoves(){
  const box=document.getElementById('modal-box');
  document.getElementById('modal-overlay').classList.add('active');
  let html='<h3>✨ 仙道杀招</h3>';
  if(player.killerMoves.length===0){html+='<p>尚未习得任何杀招。探索世界寻找杀招秘籍吧！</p>';}
  else{
    Object.keys(KILLER_MOVES).forEach(km=>{
      const kmData=KILLER_MOVES[km];
      const hasGu=player.apertureSlots.some(g=>g&&g.name===kmData.req);
      html+='<div style="padding:8px;margin:5px 0;background:rgba(240,232,216,0.5);border-left:3px solid '+(hasGu?'#6a3db8':'#c0b090')+'"><span class="cultivation">'+km+'</span><br>需求：<span class="gu-name">'+kmData.req+'</span> '+(hasGu?'✅':'❌')+'<br>消耗：'+kmData.essence+'真元 | '+kmData.desc+'</div>';
    });
  }
  html+='<br><button onclick="closeModal()">关闭</button>';
  box.innerHTML=html;
}