// ==================== 渲染引擎 ====================
let currentNode='start';

function getNode(nodeId){
  if(!STORY[nodeId])return STORY['villageHub'];
  return STORY[nodeId];
}

function renderNode(nodeId){
  currentNode=nodeId;
  const node=getNode(nodeId);
  if(node.condition && !node.condition()){renderNode('villageHub');return;}
  if(node.onEnter)node.onEnter();
  const out=document.getElementById('story-output');
  const divider='<span class="divider">◆ ◇ ◆</span>';
  out.innerHTML+=divider+'<br>'+node.text.replace(/\n/g,'<br>')+'<br><br>';
  out.scrollTop=out.scrollHeight;
  renderChoices(node);
  updateUI();
  if(nodeId!=='start' && !combatState) autoSave();
}

function renderChoices(node){
  const panel=document.getElementById('choice-panel');
  panel.innerHTML='<span class="choices-title">— 请选择你的行动 —</span>';
  if(!node.choices)return;
  const validChoices=node.choices.filter(c=>{
    if(c.condition && !c.condition())return false;
    return true;
  });
  if(validChoices.length===0){validChoices.push(...node.choices);}
  validChoices.forEach((c)=>{
    const btn=document.createElement('button');
    btn.className='choice-btn';
    btn.textContent=c.text;
    btn.onclick=()=>{handleChoice(c)};
    panel.appendChild(btn);
  });
}

function handleChoice(choice){
  if(!choice)return;
  if(choice.reward){
    if(choice.reward.gu)addGuToInventory(choice.reward.gu);
    if(choice.reward.gu2)addGuToInventory(choice.reward.gu2);
  }
  if(choice.cost){
    if(choice.cost.essence)player.essence-=choice.cost.essence;
    if(player.essence<0)player.essence=0;
  }
  if(choice.setFlag)player.storyFlags[choice.setFlag]=true;
  if(choice.combat){startCombat(choice.combat);return;}
  if(choice.buy){handleBuy(choice.buy);return;}
  if(choice.fusion){showFusion();return;}
  if(choice.showAchievements){showAchievements();return;}
  renderNode(choice.next||currentNode);
}