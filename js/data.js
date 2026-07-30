// ==================== 游戏核心数据 ====================
const RANK_NAMES = ['','一转','二转','三转','四转','五转','六转','七转','八转','九转'];
const RANK_SUB = ['初阶','中阶','高阶','巅峰'];
const APTITUDE = ['丁等','丙等','乙等','甲等'];

const player = {
  name:'古月方源',
  rank:1, rankSub:0,
  hp:100, maxHp:100,
  essence:50, maxEssence:50,
  atk:5, def:2,
  gold:0,
  apertureSize:5,
  apertureSlots:[],
  inventory:[],
  equipment:{weapon:null,armor:null,accessory:null},
  achievements:[],
  killerMoves:[],
  storyFlags:{},
  combatCooldown:0,
  aptitude:'未知', // 甲等/乙等/丙等/丁等
  branch:'方之一脉', // 家族分支
};

const GU_DATABASE = {
  // 原有一转蛊虫
  '月光蛊':{rank:1,type:'attack',effect:'造成15点伤害',atk:15,essence:5,desc:'吸收月光精华，释放出一道银色光束攻击敌人。古月一族最常见的基础蛊。'},
  '铁骨蛊':{rank:1,type:'buff',effect:'防御+5，持续3回合',def:5,duration:3,essence:8,desc:'让骨骼变得如钢铁般坚硬。'},
  '春风蛊':{rank:1,type:'heal',effect:'恢复20点生命',heal:20,essence:6,desc:'引来一缕春风，治愈伤势。'},
  '毒牙蛊':{rank:1,type:'attack',effect:'造成12点伤害并中毒',atk:12,poison:5,poisonDuration:3,essence:7,desc:'蕴含剧毒的蛊虫，咬伤敌人。'},
  '石皮蛊':{rank:1,type:'buff',effect:'防御+8，持续3回合',def:8,duration:3,essence:8,desc:'皮肤化为石质，刀枪不入。'},
  // 新增一转蛊虫
  '力蛊':{rank:1,type:'buff',effect:'攻击+10，持续3回合',atk:10,duration:3,essence:8,desc:'增幅肉身力量的基础蛊虫。古月一族战士必炼。'},
  '青茅蛊':{rank:1,type:'buff',effect:'防御+6，持续3回合',def:6,duration:3,essence:7,desc:'以青茅草为引炼制的防御蛊虫，山寨中家庭常备。'},
  '酒虫':{rank:1,type:'heal',effect:'恢复25真元',healEssence:25,essence:5,desc:'外形如酒曲的奇特蛊虫。方源前世凭借它快速积累真元。'},
  // 原有二转蛊虫
  '金蝉蛊':{rank:2,type:'special',effect:'脱壳保命，免疫一次致命伤害',essence:15,desc:'金蝉脱壳，保命神蛊。'},
  '火球蛊':{rank:2,type:'attack',effect:'造成25点火焰伤害',atk:25,essence:10,desc:'喷吐炙热火球，焚烧一切。'},
  '冰晶蛊':{rank:2,type:'attack',effect:'造成20点伤害并减速',atk:20,slow:2,essence:9,desc:'释放极寒冰晶，冻结敌人。'},
  '血炼蛊':{rank:2,type:'heal',effect:'消耗10生命恢复30生命',heal:30,cost:10,essence:12,desc:'以血为引，加速恢复。'},
  // 新增二转蛊虫
  '剑光蛊':{rank:2,type:'attack',effect:'造成30点伤害',atk:30,essence:12,desc:'化为一道剑光斩杀敌人。白凝冰的招牌蛊虫之一。'},
  '炼神蛊':{rank:2,type:'special',effect:'提升空窍容量+1',apertureUp:1,essence:20,desc:'淬炼精神力的稀有蛊虫，可永久扩展空窍容量。'},
  // 原有三转蛊虫
  '雷击蛊':{rank:3,type:'attack',effect:'造成40点雷击伤害',atk:40,essence:18,desc:'引动天雷，劈击敌人。'},
  '金刚蛊':{rank:3,type:'buff',effect:'防御+20，攻击+10，持续3回合',def:20,atk:10,duration:3,essence:20,desc:'金刚之力加持，攻防一体。'},
  // 新增三转蛊虫
  '希望蛊':{rank:3,type:'special',effect:'全属性+5，持续5回合',atk:5,def:5,duration:5,essence:25,desc:'十大奇蛊之一。寄托希望之力，全面增幅蛊师战力。极难炼制。'},
  // 原有四转及以上
  '涅槃蛊':{rank:4,type:'special',effect:'死亡时自动复活并恢复50%生命',revive:0.5,essence:30,desc:'凤凰涅槃，浴火重生。'},
  '春秋蝉':{rank:5,type:'special',effect:'逆转时光，回到500年前（剧情道具）',essence:50,desc:'十大奇蛊排名第七。需要献祭生命才能驱动。方源前世屠杀了数十万人方炼制而成。'},
};

const FUSION_RECIPES = [
  {inputs:['月光蛊','火球蛊'],output:'日月光蛊',outputRank:2,type:'attack',effect:'造成30点光焰伤害',atk:30,essenceCost:12},
  {inputs:['铁骨蛊','石皮蛊'],output:'不坏蛊',outputRank:2,type:'buff',effect:'防御+15，免疫中毒',def:15,duration:4,essenceCost:14},
  {inputs:['毒牙蛊','冰晶蛊'],output:'寒毒蛊',outputRank:3,type:'attack',effect:'造成25伤害+重度中毒',atk:25,poison:10,poisonDuration:3,essenceCost:16},
  {inputs:['火球蛊','雷击蛊'],output:'雷火蛊',outputRank:3,type:'attack',effect:'造成50点雷火伤害',atk:50,essenceCost:22},
  {inputs:['春风蛊','血炼蛊'],output:'甘霖蛊',outputRank:2,type:'heal',effect:'恢复40点生命',heal:40,essenceCost:10},
  {inputs:['金刚蛊','不坏蛊'],output:'金刚不坏蛊',outputRank:4,type:'buff',effect:'防御+30，攻击+20，持续4回合',def:30,atk:20,duration:4,essenceCost:28},
  {inputs:['日月光蛊','雷火蛊'],output:'天威蛊',outputRank:4,type:'attack',effect:'造成70点毁灭伤害',atk:70,essenceCost:30},
  {inputs:['寒毒蛊','天威蛊'],output:'灭世蛊',outputRank:5,type:'attack',effect:'造成100点伤害+全负面状态',atk:100,essenceCost:45},
  // 新增融合配方
  {inputs:['力蛊','月光蛊'],output:'月力蛊',outputRank:2,type:'attack',effect:'造成25点伤害并提升攻击',atk:25,buffAtk:5,essenceCost:10},
  {inputs:['剑光蛊','雷击蛊'],output:'雷剑蛊',outputRank:3,type:'attack',effect:'造成55点雷剑伤害',atk:55,essenceCost:20},
  {inputs:['酒虫','春风蛊'],output:'醉仙蛊',outputRank:2,type:'heal',effect:'恢复30生命+15真元',heal:30,healEssence:15,essenceCost:12},
];

const KILLER_MOVES = {
  '月光斩':{req:'月光蛊',multiplier:2.5,essence:15,desc:'以月光蛊为核心，凝聚月光之力斩出致命一击。'},
  '雷火天降':{req:'雷火蛊',multiplier:3,essence:25,desc:'雷火蛊全力催发，天降雷火毁灭一切。'},
  '天威浩荡':{req:'天威蛊',multiplier:4,essence:40,desc:'引动天地之威，释放灭世一击。'},
  '不灭金身':{req:'金刚不坏蛊',multiplier:5,essence:30,desc:'金刚不坏，万法不侵。'},
  // 新增杀招
  '剑光分化':{req:'剑光蛊',multiplier:3,essence:20,desc:'以剑光蛊为引，分化为三道剑光斩击敌人。白凝冰的招牌杀招。'},
  '雷剑合一':{req:'雷剑蛊',multiplier:3.5,essence:30,desc:'雷剑蛊的终极运用，将雷霆与剑光融合为一击。'},
};