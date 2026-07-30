const STORY = {
  'start':{
    text:'<span class="narrate">天空阴沉，古月山寨笼罩在薄雾之中。\n\n你——古月方源，古月山寨的一名普通少年，今日正是你参加"开窍大典"的日子。成功开窍，便能踏上蛊师之路；失败，则终生为凡。</span>\n\n<span class="system">族长古月博的声音在山寨广场上回荡："今日，是我古月山寨一年一度的开窍大典！凡年满十五岁的少年，皆可上前一试！"</span>\n\n你站在人群中，心跳如鼓。前方，那枚散发着幽光的"启灵蛊"正等待着你的触碰。',
    choices:[
      {text:'🎯 勇敢上前，触碰启灵蛊',next:'openAperture'},
      {text:'🤔 先观察其他人开窍的结果',next:'observeFirst'},
      {text:'💪 暗自运转体内气血，尝试自行冲窍',next:'selfOpen'},
    ]
  },
  'openAperture':{
    text:'<span class="narrate">你深吸一口气，迈步上前。手掌触碰到启灵蛊的瞬间，一股暖流涌入体内！</span>\n\n<span class="highlight">嗡——！</span>\n\n你的体内仿佛打开了一扇门！空窍——开辟成功！\n\n<span class="system">启灵蛊的光芒包裹着你，你感觉到自己的空窍中涌动着真元。古月博族长赞许地点头："很好，方源，你的空窍资质不错，有五成空窍！"</span>\n\n<span class="loot">🎉 你正式成为一名蛊师！修为：一转·初阶</span>\n\n<span class="system">族长赐予了你一只入门蛊虫——月光蛊。</span>',
    choices:[
      {text:'✨ 接受月光蛊，开始修炼',next:'receiveMoonlight',reward:{gu:'月光蛊'}},
      {text:'🙏 谦逊推辞，请求自行寻找蛊虫',next:'refuseGu'},
    ],
    onEnter(){player.storyFlags.openedAperture=true;player.storyFlags.apertureQuality='五成';addLog('system','空窍开辟！容量：5')},
  },
  'observeFirst':{
    text:'<span class="narrate">你选择暂退一步，观察他人。几名少年先后上前。</span>\n\n古月赤虎——开辟失败，黯然退下。\n古月兰——成功开辟，三成空窍。\n古月铁——开辟失败。\n\n<span class="system">你注意到，那些内心平静、气息沉稳的人成功率更高。这个发现让你多了一分把握。</span>\n\n终于轮到了你。',
    choices:[{text:'🎯 怀着信心，上前触碰启灵蛊',next:'openAperture'},]
  },
  'selfOpen':{
    text:'<span class="narrate">你暗中运转体内气血，试图不依靠启灵蛊自行冲开空窍！</span>\n\n<span class="danger">剧痛传来！</span>这几乎是自杀行为——但你咬牙坚持。\n\n就在你即将昏厥的瞬间，体内某处轰然洞开！\n\n<span class="highlight">自行开窍成功！</span>\n\n<span class="system">虽然痛苦万分，但你的空窍比常人更大——高达七成空窍！古月博族长大惊失色："自...自行开窍？！此子不凡！"</span>\n\n<span class="loot">🎉 你成为了山寨中的传奇！修为：一转·初阶 | 空窍容量：7</span>',
    choices:[{text:'✨ 虽然虚弱，但自豪地接受这份力量',next:'selfOpenReward',reward:{gu:'月光蛊',gu2:'铁骨蛊'}},],
    onEnter(){player.storyFlags.openedAperture=true;player.storyFlags.apertureQuality='七成';player.apertureSize=7;player.hp-=20;addLog('system','自行开窍成功！空窍容量：7（-20生命）')},
  },
  'receiveMoonlight':{
    text:'<span class="narrate">你将月光蛊收入空窍。这只蛊虫通体银白，散发着柔和的月光。从今日起，你便是一名真正的蛊师了。</span>\n\n<span class="system">接下来，你需要选择自己的修炼方向。古月山寨周围危机四伏，但也充满机遇。</span>',
    choices:[
      {text:'🏔️ 前往山寨外的翠微山历练',next:'cuishanMountain'},
      {text:'📚 去藏经阁学习蛊师基础知识',next:'library'},
      {text:'🤝 与其他少年蛊师交流切磋',next:'sparWithPeers'},
      {text:'🕵️ 探索山寨中的秘密',next:'villageSecret'},
    ]
  },
  'selfOpenReward':{
    text:'<span class="narrate">你获得了月光蛊和铁骨蛊。虽然身体虚弱，但双蛊在手，空窍广阔，前途不可限量。</span>\n\n<span class="system">古月博族长私下找到你："方源，你的天赋非同寻常。我有一事相托..."</span>',
    choices:[
      {text:'👂 认真倾听族长的委托',next:'chiefQuest'},
      {text:'🏔️ 先养好伤，独自去翠微山历练',next:'cuishanMountain'},
    ]
  },
  'refuseGu':{
    text:'<span class="narrate">你谦逊地推辞了族长的赏赐。"族长，我想靠自己的力量去寻找属于自己的蛊虫。"</span>\n\n<span class="system">族长微微一愣，随即笑道："好志气！那就去后山的蛊虫培育场自己挑选一只吧。"</span>\n\n你来到培育场，这里有几种入门蛊虫可供选择。',
    choices:[
      {text:'🌙 选择月光蛊（攻击型）',next:'receiveMoonlight',reward:{gu:'月光蛊'}},
      {text:'🦴 选择铁骨蛊（防御型）',next:'receiveMoonlight',reward:{gu:'铁骨蛊'}},
      {text:'🌿 选择春风蛊（治疗型）',next:'receiveMoonlight',reward:{gu:'春风蛊'}},
    ],
    onEnter(){player.storyFlags.openedAperture=true;player.storyFlags.apertureQuality='五成';addLog('system','自主选择蛊虫')},
  },
  'library':{
    text:'<span class="narrate">藏经阁中，古老的竹简堆积如山。你翻阅着关于蛊虫培育、真元修炼的基础法门。</span>\n\n<span class="system">你学到了重要的知识：\n• 蛊虫需要喂养真元才能成长\n• 不同蛊虫之间可以融合，产生更强大的蛊虫\n• 修为分为九转，每提升一转都需要渡劫\n• 仙道杀招是将蛊虫之力发挥到极致的秘法</span>\n\n<span class="loot">知识就是力量！你感觉对蛊道的理解加深了。</span>',
    choices:[
      {text:'🏔️ 带着新知识，前往翠微山历练',next:'cuishanMountain'},
      {text:'🧪 尝试用学到的知识融合蛊虫',next:'fusionAttempt1',condition:()=>player.inventory.filter(g=>g.rank<=2).length>=2},
      {text:'🤝 去和其他蛊师交流',next:'sparWithPeers'},
    ]
  },
  'sparWithPeers':{
    text:'<span class="narrate">演武场上，几名少年蛊师正在互相切磋。</span>\n\n古月赤虎虽然开窍失败，但他身体强壮，凭借蛮力也能一战。\n古月兰则驱使着她的"春风蛊"为大家治疗。\n\n<span class="system">你参与了几场切磋，对自己的蛊虫运用有了更深的理解。</span>',
    choices:[
      {text:'⚔️ 挑战古月赤虎（切磋战斗）',next:'fightRedTiger'},
      {text:'💬 向古月兰请教治疗之术',next:'learnHealing'},
      {text:'🏔️ 独自前往翠微山',next:'cuishanMountain'},
    ]
  },
  'villageSecret':{
    text:'<span class="narrate">夜深人静，你悄悄探索山寨中的隐秘角落。在后山的一处废弃矿洞中，你发现了一些不寻常的痕迹...</span>\n\n<span class="danger">矿洞深处传来低沉的嘶吼声！一只野生的"毒牙蛊"正盘踞在此！</span>',
    choices:[
      {text:'⚔️ 尝试收服这只蛊虫',next:'tamePoisonFang'},
      {text:'🏃 安全起见，悄悄退出去',next:'cuishanMountain'},
      {text:'🔍 继续深入矿洞探索',next:'mineDeep'},
    ]
  },
  'chiefQuest':{
    text:'<span class="narrate">族长的表情严肃："近来翠微山中出现了一只狂暴的石魔，已经伤了好几个采药的族人。我需要你去调查此事。作为回报，我会赐予你一件装备。"</span>\n\n<span class="system">这是你的第一个任务！</span>',
    choices:[
      {text:'✅ 接受任务——前往翠微山调查石魔',next:'cuishanMountain',setFlag:'chiefQuestAccepted'},
      {text:'🕵️ 先做好万全准备再出发',next:'prepareForQuest'},
    ]
  },
  'prepareForQuest':{
    text:'<span class="narrate">你花时间调整状态，将月光蛊和铁骨蛊的真元补满。准备好了再出发。</span>\n\n<span class="system">（生命和真元已恢复满）</span>',
    choices:[{text:'🏔️ 准备就绪，前往翠微山',next:'cuishanMountain'},],
    onEnter(){player.hp=player.maxHp;player.essence=player.maxEssence;updateUI()},
  },
  'cuishanMountain':{
    text:'<span class="narrate">翠微山，古月山寨外最大的山脉。山中妖兽横行，但也孕育着无数天材地宝。蛊虫在这里自然生长，是蛊师们历练的天堂——也是地狱。</span>\n\n山脚下，你看到三条道路：\n• <span class="highlight">东边</span>通往密林深处，据说有珍稀蛊虫出没\n• <span class="highlight">西边</span>通往一处废弃矿场，有石魔活动的痕迹\n• <span class="highlight">北边</span>通往山顶，灵气最为充沛',
    choices:[
      {text:'🌲 向东——深入密林寻找蛊虫',next:'forestEast'},
      {text:'⛏️ 向西——前往废弃矿场（石魔任务）',next:'mineWest'},
      {text:'⛰️ 向北——攀登山顶吸收灵气',next:'mountainTop'},
      {text:'🏠 返回山寨休整',next:'villageHub'},
    ]
  },
  'fightRedTiger':{text:'<span class="narrate">古月赤虎咧嘴一笑："方源，让我看看你有多大的本事！"</span>',choices:[{text:'⚔️ 开始切磋！',next:null,combat:{name:'古月赤虎',hp:40,atk:6,def:2,reward:'exp',rewardGold:10,onWin:'sparWin'}},]},
  'sparWin':{text:'<span class="narrate">你击败了古月赤虎！他虽然输了，但反而大笑起来："好！方源，你果然厉害！以后我们一起历练！"</span>\n\n<span class="loot">在切磋中，你对蛊虫的运用更加娴熟了。攻击力+3</span>',choices:[{text:'🏔️ 前往翠微山历练',next:'cuishanMountain'},{text:'🤝 与赤虎结伴同行',next:'cuishanMountain'},],onEnter(){player.atk+=3;player.storyFlags.sparWon=true;addLog('system','切磋获胜！攻击力+3');updateUI()}},
  'learnHealing':{text:'<span class="narrate">古月兰温柔地教你一些治疗技巧。虽然你没有治疗类蛊虫，但这些知识仍然有用。</span>\n\n<span class="loot">你学会了基础的急救知识。战斗中每回合恢复3点生命。</span>',choices:[{text:'🏔️ 前往翠微山历练',next:'cuishanMountain'},],onEnter(){player.storyFlags.learnedHealing=true;addLog('system','学会急救！战斗中每回合恢复3点生命')}},
  'tamePoisonFang':{text:'<span class="narrate">你小心翼翼地靠近毒牙蛊。这只蛊虫感受到了你的杀意，猛地扑了过来！</span>',choices:[{text:'⚔️ 战斗！收服毒牙蛊',next:null,combat:{name:'野生毒牙蛊',hp:35,atk:10,def:1,poison:5,reward:'gu',rewardGu:'毒牙蛊',onWin:'tamedPoisonFang'}},]},
  'tamedPoisonFang':{text:'<span class="highlight">成功收服毒牙蛊！</span>\n\n<span class="narrate">毒牙蛊在你的空窍中安静下来，成为了你的力量。</span>',choices:[{text:'🔍 继续探索矿洞',next:'mineDeep'},{text:'🏠 返回山寨修整',next:'villageHub'},]},
  'mineDeep':{text:'<span class="narrate">你向矿洞深处走去。黑暗中，前方隐隐有光芒闪烁...</span>\n\n<span class="loot">你发现了一处小型灵石矿脉！采集到了30枚灵石！</span>',choices:[{text:'💰 采集灵石后返回',next:'villageHub'},{text:'🔍 继续深入探索',next:'mineDeep2'},],onEnter(){player.gold+=30;addLog('loot','发现灵石矿脉！+30灵石');updateUI()}},
  'mineDeep2':{text:'<span class="narrate">矿洞最深处，你发现了一具古老的骸骨。骸骨手中紧握着一本残破的典籍...</span>\n\n<span class="loot">获得《杀招残卷》！记载了"月光斩"的修炼方法！</span>',choices:[{text:'📖 学习杀招——月光斩',next:'learnMoonSlash'},{text:'💰 带着典籍返回山寨',next:'villageHub'},],onEnter(){player.storyFlags.foundKillerMoveScroll=true;addLog('loot','发现杀招残卷！')}},
  'learnMoonSlash':{text:'<span class="narrate">你按照残卷上的记载运转真元。月光蛊在空窍中光芒大放！</span>\n\n<span class="highlight">习得仙道杀招——「月光斩」！</span>\n\n<span class="system">月光斩：需要月光蛊，攻击力×2.5倍，消耗15真元</span>',choices:[{text:'🏠 满载而归，返回山寨',next:'villageHub'},],onEnter(){if(!player.killerMoves.includes('月光斩'))player.killerMoves.push('月光斩');addLog('cultivation','习得杀招：月光斩！');}},
  'mineWest':{
    text:'<span class="narrate">废弃矿场中到处是碎石和废弃的矿车。地面有巨大的脚印——石魔就在附近。</span>\n\n<span class="danger">前方传来沉重的脚步声！一只高达三米的石魔正朝你走来！</span>',
    choices:[
      {text:'⚔️ 正面迎战石魔！',next:null,combat:{name:'石魔',hp:80,atk:15,def:8,reward:'both',rewardGold:50,rewardGu:'石皮蛊',onWin:'defeatedStoneDemon'}},
      {text:'🏃 石魔太强了，暂时撤退',next:'cuishanMountain'},
      {text:'🧠 用计谋引诱石魔落入陷阱',next:'trapStoneDemon'},
    ]
  },
  'defeatedStoneDemon':{text:'<span class="highlight">石魔轰然倒地！</span>\n\n<span class="narrate">你击败了石魔，从它的核心中取得了一只"石皮蛊"。这是非常实用的防御蛊虫。</span>\n\n<span class="loot">🎉 获得石皮蛊！+50灵石！</span>',choices:[{text:'🏠 回山寨向族长报告',next:'reportToChief'},{text:'⛰️ 继续在翠微山探索',next:'cuishanMountain'},],onEnter(){player.storyFlags.defeatedStoneDemon=true;addLog('loot','击败石魔！获得石皮蛊+50灵石');updateUI()}},
  'trapStoneDemon':{text:'<span class="narrate">你利用矿场中的废弃矿车和绳索设置了一个陷阱。石魔笨拙地踩入陷阱，被绳索绊倒！</span>\n\n<span class="system">石魔暂时失去了平衡，防御力大幅下降！</span>',choices:[{text:'⚔️ 趁机攻击！',next:null,combat:{name:'石魔（失衡）',hp:80,atk:15,def:2,reward:'both',rewardGold:50,rewardGu:'石皮蛊',onWin:'defeatedStoneDemon'}},]},
  'forestEast':{text:'<span class="narrate">密林中古木参天，阳光透过树叶洒下斑驳的光影。空气中弥漫着浓郁的灵气。</span>\n\n<span class="system">你发现树上有一只散发着红光的蛊虫——火球蛊！但旁边还有一只守护的妖兽。</span>',choices:[{text:'⚔️ 击败守护妖兽，夺取火球蛊',next:null,combat:{name:'焰尾貂',hp:50,atk:14,def:3,reward:'gu',rewardGu:'火球蛊',onWin:'gotFireball'}},{text:'🤫 悄悄靠近，尝试偷取',next:'stealFireball'},{text:'🌲 继续深入密林',next:'forestDeep'},]},
  'gotFireball':{text:'<span class="highlight">获得火球蛊！</span>\n\n<span class="narrate">火球蛊通体赤红，散发着灼热的气息。这是一只二转攻击型蛊虫，威力不俗。</span>',choices:[{text:'🌲 继续深入密林',next:'forestDeep'},{text:'🏠 返回山寨',next:'villageHub'},]},
  'stealFireball':{text:'<span class="narrate">你屏住呼吸，轻手轻脚地靠近。就在你即将得手时——焰尾貂突然惊醒！</span>',choices:[{text:'⚔️ 正面战斗！',next:null,combat:{name:'焰尾貂',hp:50,atk:14,def:3,reward:'gu',rewardGu:'火球蛊',onWin:'gotFireball'}},]},
  'forestDeep':{text:'<span class="narrate">深入密林，灵气愈发浓郁。前方出现了一处天然形成的灵泉！</span>\n\n<span class="loot">在灵泉旁修炼，你真元恢复速度翻倍。你发现灵泉旁生长着罕见的"冰晶蛊"！</span>',choices:[{text:'💎 尝试收服冰晶蛊',next:'tameIceCrystal'},{text:'🧘 在灵泉边修炼（恢复全部真元）',next:'meditateSpring'},{text:'🏠 标记位置后返回山寨',next:'villageHub'},],onEnter(){player.storyFlags.foundSpring=true;addLog('system','发现灵泉！')}},
  'tameIceCrystal':{text:'<span class="narrate">冰晶蛊静静地漂浮在灵泉上方，散发着寒气。这是一只二转蛊虫，需要用真元引导来收服。</span>',choices:[{text:'💎 消耗10真元引导冰晶蛊',next:'gotIceCrystal',cost:{essence:10}},{text:'⚔️ 强行收服',next:null,combat:{name:'冰晶蛊',hp:30,atk:16,def:0,reward:'gu',rewardGu:'冰晶蛊',onWin:'gotIceCrystal2'}},]},
  'gotIceCrystal':{text:'<span class="highlight">成功收服冰晶蛊！</span>\n\n<span class="narrate">冰晶蛊安静地悬浮在你的掌心，寒气内敛。这是一只强大的控制型蛊虫。</span>',choices:[{text:'🧘 在灵泉边修炼',next:'meditateSpring'},{text:'🏠 返回山寨',next:'villageHub'},]},
  'gotIceCrystal2':{text:'<span class="highlight">强行收服成功！冰晶蛊被你的实力折服。</span>',choices:[{text:'🧘 在灵泉边修炼',next:'meditateSpring'},{text:'🏠 返回山寨',next:'villageHub'},]},
  'meditateSpring':{text:'<span class="narrate">你在灵泉边盘膝打坐。浓郁的灵气涌入体内，真元迅速恢复。</span>\n\n<span class="system">真元完全恢复！修为略有精进。</span>',choices:[{text:'⛰️ 继续探索翠微山',next:'cuishanMountain'},{text:'🏠 返回山寨',next:'villageHub'},],onEnter(){player.essence=player.maxEssence;addLog('system','在灵泉修炼：真元完全恢复');updateUI()}},
  'mountainTop':{
    text:'<span class="narrate">你攀登至翠微山顶。云雾缭绕，灵气如潮水般涌动。在这里修炼事半功倍。</span>\n\n山顶有一处古老的石台，上面刻着模糊的文字。似乎是一处远古蛊师留下的传承之地。',
    choices:[
      {text:'🧘 在石台上修炼（提升修为）',next:'cultivateAtPeak'},
      {text:'🔍 研究石台上的文字',next:'studyAncientText'},
      {text:'🌄 眺望四周，寻找机缘',next:'peakScout'},
    ]
  },
  'cultivateAtPeak':{text:'<span class="narrate">你盘膝坐在石台上，引导天地灵气灌入空窍。真元如沸水般翻涌！</span>\n\n<span class="cultivation">修为精进！你感觉到一转初阶的瓶颈正在松动...</span>',choices:[{text:'🧘 继续冲击瓶颈',next:'breakthroughAttempt1'},{text:'⛰️ 先稳固修为',next:'cuishanMountain'},],onEnter(){player.storyFlags.cultivatedAtPeak=true;addLog('cultivation','在山顶修炼，修为精进')}},
  'studyAncientText':{
    text:'<span class="narrate">你仔细研究石台上的文字。虽然大多数已经模糊不清，但你还是辨认出了一些内容。</span>\n\n<span class="cultivation">石台上记载着一位远古蛊师的修炼心得："欲速则不达，修蛊之道，根基为先。空窍乃蛊师之本，当循序渐进，不可贪多。"</span>\n\n<span class="system">你领悟到了修炼的真谛。空窍容量永久+2！</span>',
    choices:[{text:'🧘 在领悟中修炼',next:'cultivateAtPeak'},{text:'🌄 眺望四周寻找机缘',next:'peakScout'},],
    onEnter(){player.apertureSize+=2;addLog('cultivation','研究古文字，空窍容量+2！');updateUI();},
  },
  'breakthroughAttempt1':{text:'<span class="narrate">你集中全部精神，引导真元冲击经脉。空窍中的真元如洪水般汹涌！</span>\n\n<span class="cultivation">轰！经脉贯通！</span>\n\n<span class="highlight">突破成功！修为提升至：一转·中阶！</span>\n\n<span class="system">生命+20，真元+10，攻击+3，防御+2</span>',choices:[{text:'✨ 感受突破后的力量，继续冒险',next:'mountainTop2'},],onEnter(){player.rankSub=1;player.maxHp+=20;player.hp=player.maxHp;player.maxEssence+=10;player.essence=player.maxEssence;player.atk+=3;player.def+=2;addLog('cultivation','突破！修为：一转·中阶');updateUI();},condition(){return player.rankSub===0},},
  'mountainTop2':{text:'<span class="narrate">突破后，你对周围的感知更加敏锐。你发现山顶另一侧有一处隐秘的洞穴。</span>',choices:[{text:'🕳️ 探索隐秘洞穴',next:'secretCave'},{text:'🏠 返回山寨',next:'villageHub'},]},
  'secretCave':{text:'<span class="narrate">洞穴中，你发现了一具坐化的蛊师遗骸。他身前似乎是一位三转蛊师。</span>\n\n<span class="loot">遗骸旁放着一只保存完好的蛊虫——雷击蛊（三转）！还有一本修炼笔记。</span>',choices:[{text:'⚡ 收下雷击蛊',next:'gotThunder',reward:{gu:'雷击蛊'}},{text:'📖 先阅读修炼笔记',next:'readNotes'},]},
  'gotThunder':{text:'<span class="highlight">获得三转蛊虫——雷击蛊！</span>\n\n<span class="narrate">雷击蛊威力强大，是你目前最强的攻击蛊虫。</span>',choices:[{text:'📖 阅读修炼笔记',next:'readNotes'},{text:'🏠 返回山寨',next:'villageHub'},]},
  'readNotes':{text:'<span class="narrate">笔记中记载了这位蛊师的修炼心得，以及关于"蛊虫融合"的秘法。</span>\n\n<span class="system">你学会了蛊虫融合的基础方法！现在可以在山寨中进行蛊虫融合了。</span>',choices:[{text:'🏠 带着收获返回山寨',next:'villageHub'},],onEnter(){player.storyFlags.canFuse=true;addLog('system','学会蛊虫融合！')}},
  'peakScout':{text:'<span class="narrate">站在山顶眺望，你发现远处有一处被迷雾笼罩的山谷。那里应该就是传说中的"迷雾福地"——一处未被开发的福地！</span>\n\n<span class="system">福地中蕴含着大量天材地宝和稀有蛊虫。但同时也危险重重。</span>',choices:[{text:'🌫️ 前往迷雾福地探险',next:'mistBlessedLand'},{text:'🧘 先在山顶修炼',next:'cultivateAtPeak'},{text:'🏠 记下位置，先回山寨准备',next:'villageHub'},],onEnter(){player.storyFlags.discoveredBlessedLand=true;addLog('system','发现迷雾福地！')}},
  'villageHub':{
    text:'<span class="narrate">古月山寨——你的家园。这里的族人都认识你，山寨虽小但五脏俱全。</span>\n\n你可以：\n• 去<span class="highlight">商铺</span>购买蛊虫和装备\n• 去<span class="highlight">融合室</span>融合蛊虫\n• 去<span class="highlight">藏经阁</span>学习知识\n• 去<span class="highlight">任务堂</span>接取任务\n• 或再次前往翠微山和福地',
    choices:[
      {text:'🏪 前往商铺',next:'shop'},
      {text:'🔥 前往融合室',next:'fusionRoom',condition:()=>player.storyFlags.canFuse},
      {text:'📋 前往任务堂',next:'questHall'},
      {text:'🏔️ 前往翠微山',next:'cuishanMountain'},
      {text:'🌫️ 前往迷雾福地',next:'mistBlessedLand',condition:()=>player.storyFlags.discoveredBlessedLand},
      {text:'📚 再去藏经阁',next:'library2'},
    ]
  },
  'fusionRoom':{
    text:'<span class="narrate">融合室中摆放着各种器具。在这里，你可以将两只蛊虫融合成一只更强大的蛊虫。</span>\n\n<span class="system">可用的融合配方：</span>\n• 月光蛊 + 火球蛊 → 日月光蛊（二转）\n• 铁骨蛊 + 石皮蛊 → 不坏蛊（二转）\n• 毒牙蛊 + 冰晶蛊 → 寒毒蛊（三转）\n• 火球蛊 + 雷击蛊 → 雷火蛊（三转）\n• 春风蛊 + 血炼蛊 → 甘霖蛊（二转）',
    choices:[{text:'🔥 打开融合界面',next:null,fusion:true},{text:'👈 返回山寨',next:'villageHub'}]},
  'shop':{
    text:'<span class="narrate">山寨商铺，老板是一位退役的老蛊师。他的货物虽不多，但都是精品。</span>\n\n<span class="system">当前灵石：'+player.gold+'</span>',
    choices:[
      {text:'💊 春风蛊 - 30灵石（治疗）',next:null,buy:{item:'春风蛊',price:30}},
      {text:'🛡️ 铁骨蛊 - 30灵石（防御）',next:null,buy:{item:'铁骨蛊',price:30}},
      {text:'⚔️ 精铁剑 - 50灵石（武器，攻击+10）',next:null,buy:{item:'精铁剑',price:50,type:'equip',slot:'weapon',stats:{atk:10}}},
      {text:'🛡️ 藤甲 - 40灵石（防具，防御+8）',next:null,buy:{item:'藤甲',price:40,type:'equip',slot:'armor',stats:{def:8}}},
      {text:'💍 蓄元戒 - 60灵石（饰品，真元+20）',next:null,buy:{item:'蓄元戒',price:60,type:'equip',slot:'accessory',stats:{maxEssence:20}}},
      {text:'👈 离开商铺',next:'villageHub'},
    ]
  },
  'library2':{text:'<span class="narrate">你再次来到藏经阁。这次你找到了一本关于"福地探险"的书籍。</span>\n\n<span class="system">书中记载：福地是蛊师死后空窍所化的小世界，其中蕴含大量资源。但福地中常有守护兽和陷阱，需要小心应对。</span>',choices:[{text:'🏠 返回山寨中心',next:'villageHub'},]},
  'questHall':{
    text:'<span class="narrate">任务堂中张贴着各种委托：</span>\n\n1. <span class="highlight">采集灵草</span> - 去翠微山采集10株灵草（奖励：20灵石）\n2. <span class="danger">剿灭山贼</span> - 山寨外有山贼出没（奖励：50灵石+随机蛊虫）\n3. <span class="cultivation">探索福地</span> - 调查迷雾福地的秘密（奖励：100灵石+稀有装备）',
    choices:[
      {text:'🌿 接取采集灵草任务',next:'herbQuest'},
      {text:'⚔️ 接取剿灭山贼任务',next:'banditQuest'},
      {text:'🌫️ 接取探索福地任务',next:'mistBlessedLand',condition:()=>player.storyFlags.discoveredBlessedLand},
      {text:'👈 返回',next:'villageHub'},
    ]
  },
  'herbQuest':{text:'<span class="narrate">你来到翠微山采集灵草。虽然不算危险，但需要细心寻找。</span>',choices:[{text:'🔍 仔细搜索灵草',next:'herbFound'},]},
  'herbFound':{text:'<span class="narrate">你找到了足够的灵草。任务完成！</span>\n\n<span class="loot">获得20灵石奖励！</span>',choices:[{text:'🏠 返回山寨',next:'villageHub'},],onEnter(){player.gold+=20;addLog('loot','任务完成：+20灵石');updateUI()}},
  'banditQuest':{text:'<span class="narrate">山寨外，一伙山贼正在劫掠过往行人。领头的是一个强壮的大汉。</span>\n\n<span class="danger">山贼头领发现了你："小子，不想死就滚远点！"</span>',choices:[{text:'⚔️ 为民除害！',next:null,combat:{name:'山贼头领',hp:60,atk:18,def:4,reward:'both',rewardGold:50,rewardGu:'血炼蛊',onWin:'banditDefeated'}},{text:'🧠 智取——假装投降然后偷袭',next:'banditTrick'},]},
  'banditDefeated':{text:'<span class="highlight">山贼被击溃！</span>\n\n<span class="narrate">你不仅完成了任务，还缴获了山贼的财物。</span>\n\n<span class="loot">获得血炼蛊和50灵石！</span>',choices:[{text:'🏠 返回山寨领赏',next:'villageHub'},],onEnter(){player.gold+=50;addLog('loot','剿灭山贼：血炼蛊+50灵石');updateUI()}},
  'banditTrick':{text:'<span class="narrate">你假装投降，趁山贼头领不备发起突袭！</span>',choices:[{text:'⚔️ 突袭出手！',next:null,combat:{name:'山贼头领（被偷袭）',hp:60,atk:18,def:1,reward:'both',rewardGold:50,rewardGu:'血炼蛊',onWin:'banditDefeated'}},]},
  'reportToChief':{text:'<span class="narrate">你向族长报告了石魔已被消灭的消息。族长大喜："干得好！方源，你是我古月山寨的骄傲！"</span>\n\n<span class="loot">族长奖励了你50灵石，并赐予你一件藤甲。</span>',choices:[{text:'🏠 返回山寨中心',next:'villageHub'},],onEnter(){player.gold+=50;player.equipment.armor='藤甲';player.def+=8;addLog('loot','族长奖励：50灵石+藤甲');updateUI()}},
  'mistBlessedLand':{
    text:'<span class="narrate">迷雾福地——一位陨落蛊师的空窍所化的小世界。踏入其中，浓雾笼罩四周，伸手不见五指。</span>\n\n<span class="system">福地分为三层：外围、内围、核心。越深入越危险，但收获也越丰厚。</span>',
    choices:[
      {text:'🌲 探索福地外围',next:'blessedOuter'},
      {text:'🏛️ 深入福地内围',next:'blessedInner',condition:()=>player.rank>=2||player.storyFlags.blessedOuterCleared},
      {text:'💎 前往福地核心',next:'blessedCore',condition:()=>player.rank>=3||player.storyFlags.blessedInnerCleared},
      {text:'🏠 离开福地',next:'villageHub'},
    ]
  },
  'blessedOuter':{text:'<span class="narrate">福地外围生长着大量灵草和低阶蛊虫。你看到几只野生蛊虫在草丛中穿梭。</span>',choices:[{text:'🔍 搜寻可用物资',next:'blessedOuterLoot'},{text:'⚔️ 挑战外围守护兽——雾狼',next:null,combat:{name:'雾狼',hp:70,atk:20,def:5,reward:'gu',rewardGu:'金刚蛊',onWin:'blessedOuterWin'}},]},
  'blessedOuterLoot':{text:'<span class="loot">你采集到了大量灵草和灵石！+40灵石，获得春风蛊！</span>',choices:[{text:'⚔️ 挑战雾狼',next:null,combat:{name:'雾狼',hp:70,atk:20,def:5,reward:'gu',rewardGu:'金刚蛊',onWin:'blessedOuterWin'}},{text:'🏠 离开福地',next:'villageHub'},],onEnter(){player.gold+=40;addLog('loot','福地探索：+40灵石+春风蛊');updateUI()}},
  'blessedOuterWin':{text:'<span class="highlight">击败雾狼！获得金刚蛊（三转）！</span>\n\n<span class="system">福地外围已被你清理干净。</span>',choices:[{text:'🏛️ 深入福地内围',next:'blessedInner'},{text:'🏠 返回山寨',next:'villageHub'},],onEnter(){player.storyFlags.blessedOuterCleared=true;addLog('loot','获得金刚蛊（三转）！');updateUI()}},
  'blessedInner':{text:'<span class="narrate">福地内围，灵气浓度是外界的数倍。前方有一座残破的宫殿，散发着古老的气息。</span>\n\n<span class="danger">宫殿中盘踞着一只强大的守护兽——雾蛟！</span>',choices:[{text:'⚔️ 挑战雾蛟',next:null,combat:{name:'雾蛟',hp:120,atk:28,def:10,reward:'special',rewardGold:80,specialReward:'equip',onWin:'blessedInnerWin'}},{text:'🔍 先搜索宫殿外围',next:'blessedInnerLoot'},{text:'🏠 暂时撤退',next:'villageHub'},]},
  'blessedInnerLoot':{text:'<span class="loot">在宫殿外围发现了前人遗留的宝物！获得100灵石和蓄元戒！</span>',choices:[{text:'⚔️ 现在挑战雾蛟',next:null,combat:{name:'雾蛟',hp:120,atk:28,def:10,reward:'special',rewardGold:80,specialReward:'equip',onWin:'blessedInnerWin'}},],onEnter(){player.gold+=100;if(!player.equipment.accessory){player.equipment.accessory='蓄元戒';player.maxEssence+=20;player.essence+=20;}addLog('loot','发现宝物！+100灵石+蓄元戒');updateUI()}},
  'blessedInnerWin':{text:'<span class="highlight">击败雾蛟！</span>\n\n<span class="narrate">雾蛟消散后，留下了一枚"蛟龙鳞甲"——这是一件稀有防具！</span>\n\n<span class="loot">获得蛟龙鳞甲（防具，防御+20）！+80灵石！</span>',choices:[{text:'💎 前往福地核心',next:'blessedCore'},{text:'🏠 返回山寨',next:'villageHub'},],onEnter(){player.storyFlags.blessedInnerCleared=true;player.equipment.armor='蛟龙鳞甲';player.def+=20;player.gold+=80;addLog('loot','击败雾蛟！蛟龙鳞甲+80灵石');updateUI()}},
  'blessedCore':{text:'<span class="narrate">福地核心——这里曾是那位陨落蛊师生前修炼的地方。中央有一处祭坛，上面悬浮着一枚光芒四射的蛊虫！</span>\n\n<span class="highlight">那是...涅槃蛊（四转）！传说中的保命神蛊！</span>\n\n<span class="danger">但祭坛前，守护着最后一道关卡——雾龙！这是福地中最强大的存在。</span>',choices:[{text:'⚔️ 与雾龙决一死战！',next:null,combat:{name:'雾龙',hp:200,atk:40,def:15,reward:'special',rewardGold:200,specialReward:'nirvana',onWin:'blessedCoreWin'}},{text:'🧠 尝试绕开雾龙偷取涅槃蛊',next:'stealNirvana'},{text:'🏠 实力不足，回去准备',next:'villageHub'},]},
  'blessedCoreWin':{text:'<span class="highlight">雾龙在光芒中消散！</span>\n\n<span class="narrate">你走到祭坛前，涅槃蛊自动飞入你的空窍。一股温暖的力量包裹全身。</span>\n\n<span class="loot">🎉 获得涅槃蛊（四转）！+200灵石！</span>\n\n<span class="system">你感受到了福地的认可——从此你可以随时进入此地修炼。</span>',choices:[{text:'✨ 大获全胜，凯旋而归',next:'ending_victory'},],onEnter(){player.storyFlags.blessedCoreCleared=true;player.gold+=200;addLog('loot','获得涅槃蛊（四转）！+200灵石！');if(!player.achievements.includes('福地之主'))player.achievements.push('福地之主');updateUI();},},
  'stealNirvana':{text:'<span class="narrate">你小心翼翼地绕到祭坛后方。雾龙似乎没有注意到你...</span>\n\n就在你即将碰到涅槃蛊时——<span class="danger">雾龙猛然转身！</span>',choices:[{text:'⚔️ 暴露了！正面迎战雾龙！',next:null,combat:{name:'雾龙',hp:200,atk:40,def:15,reward:'special',rewardGold:200,specialReward:'nirvana',onWin:'blessedCoreWin'}},]},
  'ending_victory':{
    text:'<span class="narrate">你带着涅槃蛊和无数战利品回到了古月山寨。全寨上下为你欢呼！</span>\n\n<span class="highlight">古月博族长激动地说："方源！你不仅是我们山寨的骄傲，更是未来的蛊道之星！"</span>\n\n<span class="narrate">你的名字开始在各大山寨中流传。一位从底层崛起的少年蛊师，凭借智慧和勇气，征服了翠微山，踏平了迷雾福地。</span>\n\n<span class="cultivation">但这仅仅是开始。九转之路漫漫，五域之大无边际。你的传奇，才刚刚翻开第一页...</span>\n\n<span class="divider">━━━━━━━━━━━━━━━━━━━━━━</span>\n<span class="highlight">🏆 结局达成：福地征服者</span>\n<span class="system">你已经完成了游戏的当前内容。但冒险可以继续——探索更多区域，融合更强蛊虫，挑战更高修为！</span>',
    choices:[
      {text:'🔄 继续冒险（自由探索）',next:'villageHub'},
      {text:'🏆 查看成就',next:null,showAchievements:true},
      {text:'🔄 重新开始（保留成就）',next:'start'},
    ],
    onEnter(){if(!player.achievements.includes('福地征服者'))player.achievements.push('福地征服者');}
  },
  'fusionAttempt1':{text:'<span class="narrate">你尝试按照藏经阁中学到的基础方法融合蛊虫。</span>',choices:[{text:'🔥 打开融合界面',next:null,fusion:true},{text:'👈 返回',next:'library'},]},
};