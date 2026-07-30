// ==================== 物品/装备/空窍管理 ====================
function addGuToInventory(guName){
  const data=GU_DATABASE[guName];if(!data)return;
  const gu={name:guName,rank:data.rank,type:data.type,effect:data.effect,atk:data.atk||0,def:data.def||0,essence:data.essence||5,poison:data.poison||0,poisonDuration:data.poisonDuration||0,slow:data.slow||0,duration:data.duration||0,heal:data.heal||0,revive:data.revive||0,desc:data.desc};
  player.inventory.push(gu);
  if(player.apertureSlots.length<player.apertureSize){player.apertureSlots.push(gu);addLog('system','已将'+guName+'自动装备到空窍');}
  else{addLog('system','获得'+guName+'（空窍已满，需手动管理）');}updateUI();
}

function handleBuy(buy){
  if(player.gold<buy.price){addLog('system','灵石不足！需要'+buy.price+'灵石');renderNode('shop');return;}
  player.gold-=buy.price;
  if(buy.type==='equip'){
    if(buy.slot==='weapon'){player.equipment.weapon=buy.item;player.atk+=buy.stats.atk||0;}
    if(buy.slot==='armor'){player.equipment.armor=buy.item;player.def+=buy.stats.def||0;}
    if(buy.slot==='accessory'){player.equipment.accessory=buy.item;player.maxEssence+=buy.stats.maxEssence||0;player.essence+=buy.stats.maxEssence||0;}
    addLog('loot','购买装备：'+buy.item);
  }else{addGuToInventory(buy.item);addLog('loot','购买蛊虫：'+buy.item);}
  updateUI();renderNode('shop');
}

function toggleEquip(idx){
  const gu=player.inventory[idx];if(!gu)return;
  const slotIdx=player.apertureSlots.indexOf(gu);
  if(slotIdx>=0){player.apertureSlots.splice(slotIdx,1);addLog('system','卸下蛊虫：'+gu.name);}
  else{if(player.apertureSlots.length>=player.apertureSize){addLog('system','空窍已满！请先卸下其他蛊虫');return;}
    player.apertureSlots.push(gu);addLog('system','装备蛊虫：'+gu.name);}
  updateUI();showInventory();
}
function unequipGu(idx){if(idx<player.apertureSlots.length){const gu=player.apertureSlots[idx];player.apertureSlots.splice(idx,1);addLog('system','卸下蛊虫：'+gu.name);updateUI();}}