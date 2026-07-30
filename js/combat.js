// ==================== 战斗系统 ====================
let combatState=null;

function startCombat(combatDef){
  combatState={enemy:{...combatDef},turn:0,playerBuffs:[],enemyBuffs:[],combatDef};
  const out=document.getElementById('story-output');
  out.innerHTML+='<span class="divider">◆ ◇ ◆</span><br>';
  out.innerHTML+='<span class="battle">⚔️ 战斗开始！对手：'+combatDef.name+' | HP：'+combatDef.hp+'</span><br><br>';
  out.scrollTop=out.scrollHeight;
  showCombatChoices();
}

function showCombatChoices(){
  const panel=document.getElementById('choice-panel');
  const e=combatState.enemy;
  panel.innerHTML='<span class="choices-title">⚔️ 战斗回合 | '+e.name+' HP：'+e.hp+'/'+combatState.combatDef.hp+'</span>';
  player.apertureSlots.filter(g=>g).forEach((gu,i)=>{
    const btn=document.createElement('button');
    btn.className='choice-btn';
    btn.innerHTML='🐛 <span class="gu-name">'+gu.name+'</span> — '+gu.effect+' | 消耗'+gu.essence+'真元';
    btn.onclick=()=>{useGuInCombat(i)};
    if(player.essence<gu.essence)btn.disabled=true;
    panel.appendChild(btn);
  });
  const basicBtn=document.createElement('button');
  basicBtn.className='choice-btn';basicBtn.textContent='👊 普通攻击（无消耗）';
  basicBtn.onclick=()=>{basicAttack()};panel.appendChild(basicBtn);
  player.killerMoves.forEach(km=>{
    const kmData=KILLER_MOVES[km];if(!kmData)return;
    const hasGu=player.apertureSlots.some(g=>g&&g.name===kmData.req);
    const btn=document.createElement('button');btn.className='choice-btn';
    btn.innerHTML='✨ <span class="cultivation">'+km+'</span> — '+kmData.desc+' | 消耗'+kmData.essence+'真元';
    btn.onclick=()=>{useKillerMove(km)};
    if(!hasGu||player.essence<kmData.essence)btn.disabled=true;
    panel.appendChild(btn);
  });
}

function basicAttack(){
  const dmg=Math.max(1,player.atk-combatState.enemy.def+Math.floor(Math.random()*5));
  combatState.enemy.hp-=dmg;
  addCombatLog('你对'+combatState.enemy.name+'造成了'+dmg+'点伤害！');
  checkCombatEnd();if(combatState)enemyTurn();
}
function useGuInCombat(idx){
  const gu=player.apertureSlots[idx];if(!gu||player.essence<gu.essence)return;
  player.essence-=gu.essence;let dmg=gu.atk||0;
  dmg=Math.max(1,dmg-combatState.enemy.def+Math.floor(Math.random()*8));
  combatState.enemy.hp-=dmg;
  addCombatLog('你使用<span class="gu-name">'+gu.name+'</span>造成'+dmg+'点伤害！');
  if(gu.poison){combatState.enemyBuffs.push({type:'poison',dmg:gu.poison,duration:gu.poisonDuration});addCombatLog(combatState.enemy.name+'中毒了！每回合损失'+gu.poison+'生命');}
  if(gu.slow){combatState.enemyBuffs.push({type:'slow',amount:gu.slow,duration:2});}
  if(gu.type==='buff'){combatState.playerBuffs.push({type:'def',amount:gu.def||0,duration:gu.duration||3});if(gu.atk)combatState.playerBuffs.push({type:'atk',amount:gu.atk,duration:gu.duration||3});addCombatLog('你的防御和攻击提升了！');}
  if(gu.type==='heal'){player.hp+=gu.heal||20;if(player.hp>player.maxHp)player.hp=player.maxHp;addCombatLog('你恢复了'+(gu.heal||20)+'生命！');}
  checkCombatEnd();if(combatState)enemyTurn();
}
function useKillerMove(kmName){
  const kmData=KILLER_MOVES[kmName];if(!kmData)return;
  player.essence-=kmData.essence;
  let dmg=Math.floor(player.atk*kmData.multiplier)-combatState.enemy.def+Math.floor(Math.random()*10);
  dmg=Math.max(1,dmg);combatState.enemy.hp-=dmg;
  addCombatLog('<span class="cultivation">✨ '+kmName+'！</span>造成<span class="highlight">'+dmg+'</span>点伤害！');
  checkCombatEnd();if(combatState)enemyTurn();
}
function enemyTurn(){
  combatState.enemyBuffs=combatState.enemyBuffs.filter(b=>{if(b.type==='poison'){combatState.enemy.hp-=b.dmg;addCombatLog(combatState.enemy.name+'受到'+b.dmg+'点中毒伤害');}b.duration--;return b.duration>0;});
  if(combatState.enemy.hp<=0){checkCombatEnd();return;}if(!combatState)return;
  let playerDef=player.def;combatState.playerBuffs.forEach(b=>{if(b.type==='def')playerDef+=b.amount});
  const dmg=Math.max(1,combatState.enemy.atk-playerDef+Math.floor(Math.random()*5));player.hp-=dmg;
  addCombatLog(combatState.enemy.name+'攻击你造成'+dmg+'点伤害！');
  if(player.storyFlags.learnedHealing){player.hp+=3;if(player.hp>player.maxHp)player.hp=player.maxHp;}
  combatState.playerBuffs=combatState.playerBuffs.filter(b=>{b.duration--;return b.duration>0;});
  if(player.hp<=0){
    if(player.apertureSlots.some(g=>g&&g.name==='涅槃蛊')){player.hp=Math.floor(player.maxHp*0.5);addCombatLog('<span class="highlight">🦅 涅槃蛊发动！你浴火重生！</span>');updateUI();showCombatChoices();return;}
    if(player.apertureSlots.some(g=>g&&g.name==='金蝉蛊')){player.hp=1;addCombatLog('<span class="highlight">🦗 金蝉蛊发动！金蝉脱壳！</span>');updateUI();showCombatChoices();return;}
    addCombatLog('<span class="danger">你倒下了...</span>');endCombat(false);return;
  }updateUI();showCombatChoices();
}
function addCombatLog(msg){const out=document.getElementById('story-output');out.innerHTML+='<span class="battle">'+msg+'</span><br>';out.scrollTop=out.scrollHeight;}
function checkCombatEnd(){if(combatState.enemy.hp<=0){addCombatLog('<span class="highlight">🎉 你击败了'+combatState.enemy.name+'！</span>');endCombat(true);}}
function endCombat(won){
  const def=combatState.combatDef;combatState=null;
  const out=document.getElementById('story-output');out.innerHTML+='<span class="divider">◆ ◇ ◆</span><br>';out.scrollTop=out.scrollHeight;
  updateUI();
  if(won&&def.onWin){
    if(def.reward==='gu'||def.reward==='both'){if(def.rewardGu)addGuToInventory(def.rewardGu);}
    if(def.reward==='special'||def.reward==='both'){if(def.specialReward==='nirvana')addGuToInventory('涅槃蛊');}
    if(def.rewardGold)player.gold+=def.rewardGold;addLog('loot','战斗胜利！');
    if(def.onWin==='defeatedStoneDemon'&&!player.achievements.includes('石魔杀手'))player.achievements.push('石魔杀手');
    if(def.onWin==='blessedCoreWin'&&!player.achievements.includes('福地之主'))player.achievements.push('福地之主');
    if(def.onWin==='banditDefeated'&&!player.achievements.includes('为民除害'))player.achievements.push('为民除害');
    renderNode(def.onWin);
  }else if(!won){player.hp=Math.floor(player.maxHp*0.3);player.essence=Math.floor(player.maxEssence*0.3);renderNode('villageHub');addLog('system','战斗失败，返回山寨休整');}
}