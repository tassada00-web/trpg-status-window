const STAT_DEFS = [
  { key: "hp", label: "체력", cap: 30, tone: "#b53858" },
  { key: "stamina", label: "스테미나", cap: 30, tone: "#3f8d6a" },
  { key: "strength", label: "힘", cap: 12, tone: "#b98d3e" },
  { key: "vitality", label: "건강", cap: 12, tone: "#3f8d6a" },
  { key: "speed", label: "속도", cap: 12, tone: "#3db6c7" },
  { key: "precision", label: "정밀", cap: 12, tone: "#4f3a80" },
  { key: "intelligence", label: "지능", cap: 12, tone: "#3db6c7" },
  { key: "wisdom", label: "지혜", cap: 12, tone: "#4f3a80" },
  { key: "charm", label: "매력", cap: 12, tone: "#b53858" },
  { key: "damage", label: "데미지", cap: 12, tone: "#b53858" },
  { key: "offhandDamage", label: "데미지(보조)", cap: 10, tone: "#b98d3e" },
  { key: "armor", label: "방어력", cap: 10, tone: "#1d2230" },
];

const STAT_LABELS = Object.fromEntries(STAT_DEFS.map((stat) => [stat.key, stat.label]));
const EDITABLE_STAT_DEFS = STAT_DEFS.filter((stat) => !["hp", "stamina"].includes(stat.key));
const GM_PASSWORD = "960929";
const SAVE_KEY = "trpg-status-window:data:v1";
const BAG_CATEGORIES = [
  { key: "equipment", label: "장비" },
  { key: "consumables", label: "소모품" },
  { key: "materials", label: "재료" },
  { key: "quest", label: "특수(퀘스트)" },
];

const RIA_BAG = {
  money: 0,
  equipment: [
    { name: "가죽 주머니", note: "무언가 담을 수 있다.", tags: ["가방"] },
    { name: "고블린 대장 몽둥이(부실해지기시작)", note: "+3데미지\n기습하는 경우 기절" },
    { name: "가죽 손목 보호대", note: "낡았지만 튼튼한 가죽 보호대. 착용 시 방어력 소폭 상승" },
    { name: "어느 주인 없는 여자 속옷", note: "장착/쓰레기" },
    { name: "여성용 경량 가죽 갑옷", note: "가슴과 복부를 보호하는 가죽 갑옷. 찢어진 부분이 있지만 수선하면 사용할 수 있습니다." },
    { name: "모험가 부츠", note: "튼튼한 가죽 부츠." },
    { name: "소드 오프 샷건", note: "근접사격 2발 소모. 힘다이스 25% 이하 시 넘어짐 자신에게 부여" },
  ],
  consumables: [
    { name: "밧줄", note: "무언가 묶을 수 있다." },
    { name: "정체불명의 열쇠", note: "녹슬었지만 튼튼해 보임(폐광)" },
    { name: "소형 마나 포션", quantity: 1, note: "푸른색 액체가 담긴 작은 유리병. MP 15 회복" },
    { name: "여행자용 건빵", note: "딱딱하게 굳은 건빵 두 조각. 비상 식량" },
    { name: "야수 각성 주사기", quantity: 2, note: "보라색 액체가 든 주사기. 사용 시 일시적으로 힘과 민첩이 폭발적으로 상승하지만, 4턴 후 고통 및 탈진 부여" },
    { name: "미완성 주문서(환각 쾌락 강화 - 사용 불가)" },
    { name: "조악한 환각 최음제", quantity: 1 },
  ],
  materials: [
    { name: "거친 가죽 조각", quantity: 2, note: "재봉 기초 재료" },
    { name: "열쇠 꾸러미", note: "최면술사에서 획득" },
    { name: "화염 탄알", quantity: 10, note: "6데미지+지속화염" },
    { name: "강철 탄알", quantity: 35, note: "10데미지" },
    { name: "녹슨 탄알", quantity: 4, note: "6데미지" },
    { name: "은반지", note: "단순한 디자인의 은반지. 안쪽에 이니셜 'J & M'이 새겨져 있습니다. 상점 판매가 약 40페니 예상" },
    { name: "구겨진 편지", note: "피와 흙으로 얼룩져 내용을 알아보기 힘듭니다. '...광산... 비밀 입구... 조심...'이라는 단어만 간신히 읽을 수 있습니다." },
    { name: "이상한 지도 조각", note: "피가 묻어 잘 보이지 않지만, 숲 안쪽의 특정 지점을 표시한 듯한 낡은 지도 조각입니다." },
    { name: "고블린의 보물 지도 조각 A", note: "조교병이 숨기고 있던 낡은 지도 조각. 다른 조각들과 합치면 고블린 소굴 깊은 곳에 숨겨진 '무언가'의 위치를 알 수 있습니다." },
  ],
  quest: [],
};

const HAYUL_BAG = {
  money: 97,
  equipment: [
    { name: "낡은 고블린 단검", note: "무기, 힘 2" },
  ],
  consumables: [
    { name: "붕대", quantity: 2, note: "출혈 상태이상 해제/감소 가능" },
    { name: "조잡한 회복약", quantity: 1, note: "사용 시 체력 5 회복, 단 20% 확률로 구역질 상태이상" },
    { name: "하급 해독제", quantity: 2 },
    { name: "시원한 과일수", quantity: 3, tags: ["현재 보급"] },
    { name: "질 좋은 횃불", quantity: 3, tags: ["현재 보급"] },
    { name: "가벼운 붕대", quantity: 3, tags: ["현재 보급"] },
  ],
  materials: [
    { name: "마력석 조각", quantity: 1 },
  ],
  quest: [
    { name: "맑은 액체 유리병", quantity: 1, note: "정체 불명 - 감별 필요" },
  ],
};

const CHARACTERS = [
  {
    id: "ria",
    name: "리아",
    sigil: "리",
    image: "./assets/ria.png",
    role: "총사",
    tendency: "냉정함",
    bases: {
      hp: 30,
      stamina: 30,
      strength: 6,
      vitality: 6,
      speed: 8,
      precision: 7,
      intelligence: 6,
      wisdom: 6,
      charm: 6,
      damage: 0,
      offhandDamage: 0,
      armor: 0,
    },
    baseLabels: {
      damage: "x",
      offhandDamage: "x",
      armor: "x",
    },
    skillBonuses: {},
    initialState: {
      hp: { decrease: 0 },
      stamina: { decrease: 9 },
    },
    equipment: [
      { slot: "머리", name: "", stats: {}, durability: null },
      { slot: "외투", name: "탐험가의 망토", stats: { speed: 1 }, durability: { max: 10, current: null } },
      { slot: "상의", name: "징 박힌 가죽 갑옷", stats: { speed: -1, armor: 4 }, durability: { max: 32, current: 32 } },
      { slot: "하의", name: "팬티 스타킹", stats: {}, durability: { max: 5, current: 5 } },
      { slot: "신발", name: "강화된 가죽 부츠", stats: { speed: 1, armor: 1 }, durability: { max: 30, current: 30 } },
      { slot: "장갑", name: "가죽 장갑", stats: { precision: 1 }, durability: { max: 10, current: 10 } },
      { slot: "반지", name: "신속의 반지", stats: { speed: 2 }, durability: null },
      { slot: "목걸이", name: "", stats: {}, durability: null },
      { slot: "귀걸이", name: "", stats: {}, durability: null },
      { slot: "팔찌", name: "", stats: {}, durability: null },
      { slot: "주무기", name: "개량형 강선 머스킷 (40/40)", stats: { speed: -1, damage: 8 }, durability: { max: 40, current: 40 } },
      { slot: "보조무기", name: "날이 잘 선 손도끼 (20/15)", stats: { offhandDamage: 3 }, durability: { max: 20, current: 15 } },
    ],
    bag: {
      ...RIA_BAG,
    },
    skills: [
      { name: "총사", body: "힘다이스 없이 탄알효과만 발동", tags: ["직업"] },
      { name: "개머리판 공격 1t", body: "힘 50% 값만큼 피해, 힘 값 2배 차이경우 넉백", tags: ["공격"] },
      { name: "소매치기", body: "후퇴 판정 전투 종료 후 일부분 보상 획득", tags: ["탐색"] },
      { name: "원숭이", body: "나무 시도 시 한턴만 턴 소모 없음", tags: ["이동"] },
      { name: "지형 활용 (1회 판정)", body: "주변 환경(장애물/나무/암석 등) 활용 시 회피 판정 +2", tags: ["회피", "+2"] },
      { name: "방해 사격", body: "(정밀 vs 건강, SP 2 소모) 적 1체의 다음 2턴까지 행동에 -2", tags: ["SP 2", "디버프"] },
      { name: "더블탭", body: "(SP 2 소모) 두번 공격 (스킬 개별 각각 사용가능) 명중률 -2", tags: ["SP 2", "공격"] },
      { name: "서툰 속사술", body: "(SP 5 소모) 장전 시간 1턴 -> 0턴. 사격 후 즉시 재장전 가능.", tags: ["SP 5", "장전"] },
      { name: "무기 효과", body: "개량형 강선 머스킷: 상대와 자신의 거리 N(빈칸 갯수)일 때 N-1만큼 정밀이 증가합니다.", tags: ["머스킷"] },
      { name: "탄알", body: "철제 탄알 31 / 8데미지", tags: ["소모품", "31"] },
    ],
  },
  {
    id: "luna",
    name: "루나",
    sigil: "루",
    image: "./assets/luna.png",
    role: "마나볼",
    tendency: "미입력",
    bases: {
      hp: 30,
      stamina: 30,
      strength: 6,
      vitality: 6,
      speed: 6,
      precision: 6,
      intelligence: 8,
      wisdom: 6,
      charm: 9,
      damage: 0,
      offhandDamage: 0,
      armor: 0,
    },
    baseLabels: {
      damage: "x",
      offhandDamage: "x",
      armor: "x",
    },
    skillBonuses: {
      vitality: 4,
      speed: -3,
    },
    initialState: {
      hp: { decrease: 0 },
      stamina: { decrease: 0 },
    },
    equipment: [
      { slot: "머리", name: "", stats: {}, durability: null },
      { slot: "외투", name: "", stats: {}, durability: null },
      { slot: "상의", name: "로브", stats: {}, durability: null },
      { slot: "하의", name: "", stats: {}, durability: null },
      { slot: "신발", name: "", stats: {}, durability: null },
      { slot: "장갑", name: "", stats: {}, durability: null },
      { slot: "반지", name: "", stats: {}, durability: null },
      { slot: "목걸이", name: "", stats: {}, durability: null },
      { slot: "귀걸이", name: "", stats: {}, durability: null },
      { slot: "팔찌", name: "", stats: {}, durability: null },
      { slot: "주무기", name: "완드", stats: { damage: 1 }, durability: null },
      { slot: "보조무기", name: "", stats: {}, durability: null },
    ],
    bag: {
      money: 0,
      equipment: [],
      consumables: [],
      materials: [],
      quest: [],
    },
    skills: [
      { name: "마나볼", body: "지능 결과값 +4", tags: ["마법 1", "공격"] },
      { name: "올라타기", body: "민첩 다이스 1", tags: ["SP 2", "이동"] },
      { name: "늑대 리듬 동조", body: "적 속도가 자신보다 빠를 때 받는 쾌락 데미지 +1, 동조 성공 시 매턴마다 1 SP 회복.", tags: ["회복", "동조"] },
      { name: "야수의 정수(패시브)", body: "건강 +4, 속도 -3", tags: ["패시브", "능력치"] },
    ],
  },
  {
    id: "bom-hayul",
    name: "봄하율",
    sigil: "봄",
    image: "./assets/bom-hayul.png",
    role: "회복 마법사",
    tendency: "외유내강",
    bases: {
      hp: 30,
      stamina: 30,
      strength: 6,
      vitality: 6,
      speed: 6,
      precision: 6,
      intelligence: 6,
      wisdom: 6,
      charm: 6,
      damage: 0,
      offhandDamage: 0,
      armor: 0,
    },
    baseLabels: {
      damage: "x",
      offhandDamage: "x",
      armor: "x",
    },
    skillBonuses: {},
    initialState: {
      hp: { decrease: 0 },
      stamina: { decrease: 0 },
    },
    equipment: [
      { slot: "머리", name: "", stats: {}, durability: null },
      { slot: "외투", name: "", stats: {}, durability: null },
      { slot: "상의", name: "프릴드레스", stats: {}, durability: { max: 15, current: 15 } },
      { slot: "하의", name: "", stats: {}, durability: null },
      { slot: "신발", name: "", stats: {}, durability: null },
      { slot: "장갑", name: "", stats: {}, durability: null },
      { slot: "반지", name: "", stats: {}, durability: null },
      { slot: "목걸이", name: "", stats: {}, durability: null },
      { slot: "귀걸이", name: "", stats: {}, durability: null },
      { slot: "팔찌", name: "", stats: {}, durability: null },
      { slot: "주무기", name: "거울 니샤 +1 (붉은 박쥐 마석 인첸트)", stats: { damage: 1 }, durability: null },
      { slot: "보조무기", name: "", stats: {}, durability: null },
    ],
    bag: {
      ...HAYUL_BAG,
    },
    skills: [
      {
        name: "여우비lv2",
        body: "힐진화. 주문횟수 1 소모. 지능다이스로 자신 포함 모든 아군 회복 및 적 전체 피해 +2 (정밀 vs 속도).",
        tags: ["마법 1"],
      },
      {
        name: "거울 파편 장벽",
        body: "주문횟수 1 소모. 아군 전체가 공격받을 때 지능결과 /2 만큼 1회 차단.",
        tags: ["마법 1"],
      },
      {
        name: "수호의 빛",
        body: "패시브. 아군 치명타 피격 시 전투당 1회, 주문횟수 소모 없이 거울 파편 장벽 자동 발동.",
        tags: ["패시브"],
      },
      {
        name: "거울 니샤 효과",
        body: "회복 마법 효과량 +2. 매 턴 시작 시 본인 체력 1 자동 회복.",
        tags: ["장비 효과"],
      },
      {
        name: "거울 니샤 효과",
        body: "인접 아군이 출혈 상태일 경우 회복 마법으로 출혈 1스택을 추가 제거.",
        tags: ["장비 효과"],
      },
    ],
  },
];

const savedState = loadSavedData();
const characterState = Object.fromEntries(CHARACTERS.map((character) => [character.id, createState(character)]));
applySavedState(savedState);
let activeCharacterId = CHARACTERS[0].id;
let activeBagCategory = BAG_CATEGORIES[0].key;
let isGmMode = false;
let activeEditor = null;
let hasUnsavedChanges = false;

function createState(character) {
  const state = Object.fromEntries(
    STAT_DEFS.map((stat) => [
      stat.key,
      {
        increase: 0,
        decrease: 0,
      },
    ]),
  );

  Object.entries(character.initialState || {}).forEach(([key, value]) => {
    state[key] = {
      ...state[key],
      ...value,
    };
  });

  return state;
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeStats(stats) {
  return Object.entries(stats || {}).reduce((result, [key, value]) => {
    if (!EDITABLE_STAT_DEFS.some((stat) => stat.key === key)) return result;
    const number = normalizeNumber(value);
    if (number !== 0) {
      result[key] = number;
    }
    return result;
  }, {});
}

function normalizeBagItem(item) {
  if (typeof item === "string") {
    return { name: item, quantity: 1, note: "", tags: [] };
  }

  const quantity = Math.max(1, normalizeNumber(item?.quantity ?? item?.count ?? 1, 1));
  return {
    name: item?.name || "",
    quantity,
    note: item?.note || item?.body || "",
    tags: Array.isArray(item?.tags) ? item.tags.filter(Boolean) : [],
  };
}

function normalizeBag(bag = {}) {
  return {
    money: Math.max(0, normalizeNumber(bag.money ?? bag.penny ?? bag.pennies, 0)),
    ...Object.fromEntries(
      BAG_CATEGORIES.map((category) => [
        category.key,
        Array.isArray(bag[category.key]) ? bag[category.key].map(normalizeBagItem) : [],
      ]),
    ),
  };
}

function mergeBagData(baseBag, savedBag) {
  const base = normalizeBag(baseBag);
  const saved = normalizeBag(savedBag);
  const savedHasMoney = ["money", "penny", "pennies"].some((key) => Object.prototype.hasOwnProperty.call(savedBag || {}, key));
  return {
    money: savedHasMoney ? saved.money : base.money,
    ...Object.fromEntries(
      BAG_CATEGORIES.map((category) => [
        category.key,
        saved[category.key].length ? saved[category.key] : base[category.key],
      ]),
    ),
  };
}

function loadSavedData() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
    if (!saved) return null;

    (saved.characters || []).forEach((savedCharacter) => {
      const character = CHARACTERS.find((item) => item.id === savedCharacter.id);
      if (!character) return;

      if (Array.isArray(savedCharacter.equipment)) {
        character.equipment = savedCharacter.equipment.map((item) => ({
          slot: item.slot || "",
          name: item.name || "",
          stats: normalizeStats(item.stats),
          durability: item.durability || null,
        }));
      }

      if (Array.isArray(savedCharacter.skills)) {
        character.skills = savedCharacter.skills.map((skill) => ({
          name: skill.name || "",
          body: skill.body || "",
          tags: Array.isArray(skill.tags) ? skill.tags.filter(Boolean) : [],
        }));
      }

      if (savedCharacter.bag) {
        character.bag = mergeBagData(character.bag, savedCharacter.bag);
      }

      if (savedCharacter.skillBonuses) {
        character.skillBonuses = normalizeStats(savedCharacter.skillBonuses);
      }

      if (typeof savedCharacter.role === "string") character.role = savedCharacter.role;
      if (typeof savedCharacter.tendency === "string") character.tendency = savedCharacter.tendency;
    });

    return saved.characterState || null;
  } catch (error) {
    console.warn("Saved data could not be loaded.", error);
    return null;
  }
}

function applySavedState(saved) {
  if (!saved) return;

  Object.entries(saved).forEach(([characterId, savedCharacterState]) => {
    if (!characterState[characterId]) return;
    Object.entries(savedCharacterState || {}).forEach(([statKey, savedStat]) => {
      if (!characterState[characterId][statKey]) return;
      characterState[characterId][statKey].increase = normalizeNumber(savedStat.increase);
      characterState[characterId][statKey].decrease = normalizeNumber(savedStat.decrease);
    });
  });
}

function saveGameData() {
  try {
    const payload = {
      savedAt: new Date().toISOString(),
      characters: CHARACTERS.map((character) => ({
        id: character.id,
        role: character.role,
        tendency: character.tendency,
        equipment: cloneData(character.equipment),
        bag: cloneData(normalizeBag(character.bag)),
        skills: cloneData(character.skills),
        skillBonuses: cloneData(character.skillBonuses),
      })),
      characterState: cloneData(characterState),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    hasUnsavedChanges = false;
    showSaveStatus("저장됨");
    renderGmState();
  } catch (error) {
    console.error("Save failed.", error);
    showSaveStatus("저장 실패");
  }
}

function markDirty() {
  hasUnsavedChanges = true;
  showSaveStatus("저장 필요");
  renderGmState();
}

function showSaveStatus(message) {
  const status = document.getElementById("saveStatus");
  if (!status) return;
  status.textContent = message;
}

function getCharacter() {
  return CHARACTERS.find((character) => character.id === activeCharacterId) || CHARACTERS[0];
}

function getState() {
  return characterState[getCharacter().id];
}

function sumStats(items) {
  return items.reduce((totals, item) => {
    Object.entries(item.stats || {}).forEach(([key, value]) => {
      totals[key] = (totals[key] || 0) + value;
    });
    return totals;
  }, {});
}

function getTotal(stat, character = getCharacter()) {
  const state = characterState[character.id][stat.key];
  const gear = sumStats(character.equipment)[stat.key] || 0;
  const skill = character.skillBonuses[stat.key] || 0;
  return character.bases[stat.key] + gear + skill + state.increase - state.decrease;
}

function formatSigned(value) {
  if (!value) return "0";
  return value > 0 ? `+${value}` : `${value}`;
}

function formatBase(character, stat) {
  return character.baseLabels[stat.key] || `${character.bases[stat.key]}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function setSidebar(open) {
  document.body.classList.toggle("sidebar-open", open);
  document.getElementById("characterSidebar").classList.toggle("is-open", open);
  document.getElementById("characterSidebar").setAttribute("aria-hidden", open ? "false" : "true");
  document.getElementById("sidebarToggle").setAttribute("aria-expanded", open ? "true" : "false");
}

function setGmDialog(open) {
  const dialog = document.getElementById("gmDialog");
  const input = document.getElementById("gmPasswordInput");
  const error = document.getElementById("gmError");
  dialog.hidden = !open;
  document.body.classList.toggle("gm-dialog-open", open);

  if (open) {
    input.value = "";
    error.textContent = "";
    window.setTimeout(() => input.focus(), 0);
  }
}

function renderGmState() {
  document.body.classList.toggle("gm-mode", isGmMode);
  const button = document.getElementById("gmLoginButton");
  const saveButton = document.getElementById("saveButton");
  button.textContent = isGmMode ? "GM 모드" : "GM 로그인";
  button.classList.toggle("is-active", isGmMode);
  button.setAttribute("aria-disabled", isGmMode ? "true" : "false");
  saveButton.hidden = !isGmMode;
  saveButton.classList.toggle("has-changes", hasUnsavedChanges);
  saveButton.textContent = hasUnsavedChanges ? "저장하기 *" : "저장하기";
  if (!isGmMode) {
    showSaveStatus("");
  }
}

function renderCharacterButtons() {
  document.getElementById("characterButtons").innerHTML = CHARACTERS.map((character) => {
    const isActive = character.id === activeCharacterId;
    return `
      <button class="character-button ${isActive ? "is-active" : ""}" type="button" data-character="${character.id}" aria-pressed="${isActive ? "true" : "false"}">
        <span>${character.sigil}</span>
        <strong>${character.name}</strong>
      </button>
    `;
  }).join("");
}

function renderIdentity() {
  const character = getCharacter();
  document.title = `${character.name} 상태창`;
  document.getElementById("characterName").textContent = character.name;
  document.getElementById("characterSigil").textContent = character.sigil;
  document.getElementById("characterRole").textContent = character.role;
  document.getElementById("characterTendency").textContent = character.tendency;

  const portrait = document.getElementById("portraitImage");
  portrait.src = character.image;
  portrait.alt = `${character.name} 캐릭터 프로필`;
}

function renderResources() {
  const character = getCharacter();
  const hp = getTotal({ key: "hp" }, character);
  const stamina = getTotal({ key: "stamina" }, character);
  const intelligence = getTotal({ key: "intelligence" }, character);
  const magicUses = Math.floor(5 + intelligence / 5);
  const resources = [
    { label: "체력", value: hp, max: character.bases.hp, tone: "#b53858", soft: "#f09aae" },
    { label: "스테미나", value: stamina, max: character.bases.stamina, tone: "#3f8d6a", soft: "#8fd0b4" },
    { label: "마법 가능횟수", value: magicUses, max: 6, tone: "#4f3a80", soft: "#9c86d9" },
  ];

  document.getElementById("resourceList").innerHTML = resources
    .map((item) => {
      const percent = clamp((item.value / item.max) * 100, 0, 100);
      const valueText = item.label === "마법 가능횟수" ? `${item.value}` : `${item.value} / ${item.max}`;
      return `
        <div class="resource-row" style="--tone: ${item.tone}; --tone-soft: ${item.soft}; --meter: ${percent}%">
          <div class="resource-topline">
            <dt>${item.label}</dt>
            <dd>${valueText}</dd>
          </div>
          <dd class="meter" aria-hidden="true"><span></span></dd>
        </div>
      `;
    })
    .join("");
}

function renderCombatStrip() {
  const character = getCharacter();
  const metrics = [
    ["주무기", getTotal({ key: "damage" }, character)],
    ["보조무기", getTotal({ key: "offhandDamage" }, character)],
    ["방어력", getTotal({ key: "armor" }, character)],
    ["마법", Math.floor(5 + getTotal({ key: "intelligence" }, character) / 5)],
  ];

  document.getElementById("combatStrip").innerHTML = metrics
    .map(([label, value]) => `
      <div class="combat-metric">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `)
    .join("");
}

function renderStats() {
  const character = getCharacter();
  const state = getState();
  const gearBonus = sumStats(character.equipment);
  const renderModifierCell = (stat, modifier, kind, label) => {
    if (!isGmMode) {
      return `<span class="readonly-number">${modifier[kind]}</span>`;
    }

    return `<input class="stat-input" type="number" value="${modifier[kind]}" min="0" data-stat="${stat.key}" data-kind="${kind}" aria-label="${stat.label} ${label}" />`;
  };
  const head = `
    <div class="stat-row is-head" aria-hidden="true">
      <div class="stat-cell">능력치</div>
      <div class="stat-cell">기본</div>
      <div class="stat-cell">장비</div>
      <div class="stat-cell">스킬</div>
      <div class="stat-cell">증가</div>
      <div class="stat-cell">감소</div>
      <div class="stat-cell">결과</div>
      <div class="stat-cell">표시</div>
    </div>
  `;

  const rows = STAT_DEFS.map((stat) => {
    const gear = gearBonus[stat.key] || 0;
    const skill = character.skillBonuses[stat.key] || 0;
    const total = getTotal(stat, character);
    const modifier = state[stat.key];
    const percent = clamp((Math.max(total, 0) / stat.cap) * 100, 0, 100);
    return `
      <div class="stat-row">
        <div class="stat-cell stat-name">${stat.label}</div>
        <div class="stat-cell stat-value">${formatBase(character, stat)}</div>
        <div class="stat-cell stat-value">${formatSigned(gear)}</div>
        <div class="stat-cell stat-value">${formatSigned(skill)}</div>
        <div class="stat-cell">
          ${renderModifierCell(stat, modifier, "increase", "증가")}
        </div>
        <div class="stat-cell">
          ${renderModifierCell(stat, modifier, "decrease", "감소")}
        </div>
        <div class="stat-cell stat-value stat-result">${total}</div>
        <div class="stat-cell bar-cell" style="--bar-tone: ${stat.tone}; --stat-meter: ${percent}%">
          <div class="mini-bar" aria-hidden="true"><span></span></div>
        </div>
      </div>
    `;
  }).join("");

  document.getElementById("statTable").innerHTML = head + rows;
  document.getElementById("damageTakenLabel").textContent = state.hp.decrease;
  document.getElementById("staminaSpentLabel").textContent = state.stamina.decrease;
}

function refreshComputedFields() {
  const character = getCharacter();
  const state = getState();
  const rows = document.querySelectorAll(".stat-row:not(.is-head)");

  STAT_DEFS.forEach((stat, index) => {
    const row = rows[index];
    if (!row) return;

    const total = getTotal(stat, character);
    const percent = clamp((Math.max(total, 0) / stat.cap) * 100, 0, 100);
    row.children[6].textContent = total;
    row.children[7].style.setProperty("--stat-meter", `${percent}%`);
  });

  document.getElementById("damageTakenLabel").textContent = state.hp.decrease;
  document.getElementById("staminaSpentLabel").textContent = state.stamina.decrease;
  renderResources();
  renderCombatStrip();
}

function renderEquipment() {
  const character = getCharacter();
  document.getElementById("gearGrid").innerHTML = character.equipment
    .map((item, index) => {
      const isEmpty = !item.name;
      const durability = item.durability
        ? item.durability.current === null
          ? `내구도 ${item.durability.max}`
          : `내구도 ${item.durability.current}/${item.durability.max}`
        : "";
      const bonuses = Object.entries(item.stats);
      return `
        <article class="gear-card ${isEmpty ? "is-empty" : ""} ${isGmMode ? "is-editable" : ""}" data-equipment-index="${index}" tabindex="${isGmMode ? "0" : "-1"}">
          <div class="gear-head">
            <div>
              <span class="slot">${item.slot}</span>
              <p class="gear-name">${isEmpty ? "비어 있음" : item.name}</p>
            </div>
            <span class="durability">${durability}</span>
          </div>
          <div class="bonus-list">
            ${
              bonuses.length
                ? bonuses
                    .map(([key, value]) => `<span class="${value < 0 ? "penalty" : ""}">${STAT_LABELS[key]} ${formatSigned(value)}</span>`)
                    .join("")
                : "<span>보정 없음</span>"
            }
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSkills() {
  const character = getCharacter();
  document.getElementById("skillGrid").innerHTML = character.skills
    .map((skill, index) => `
      <article class="skill-card ${isGmMode ? "is-editable" : ""}" data-skill-index="${index}" tabindex="${isGmMode ? "0" : "-1"}">
        <div class="skill-head">
          <p class="skill-name">${skill.name}</p>
        </div>
        <p class="skill-body">${skill.body}</p>
        <div class="skill-tags">
          ${skill.tags.map((tag) => `<span class="skill-tag">${tag}</span>`).join("")}
        </div>
      </article>
    `)
    .join("");
}

function formatPenny(value) {
  return `${new Intl.NumberFormat("ko-KR").format(Math.max(0, normalizeNumber(value)))} 페니`;
}

function renderBag() {
  const character = getCharacter();
  const bag = normalizeBag(character.bag);
  character.bag = bag;
  const activeCategory = BAG_CATEGORIES.find((category) => category.key === activeBagCategory) || BAG_CATEGORIES[0];
  const items = bag[activeCategory.key] || [];

  document.getElementById("bagWallet").innerHTML = isGmMode
    ? `
      <span>소지금</span>
      <label class="bag-money-control">
        <input class="bag-money-input" type="number" min="0" value="${bag.money}" aria-label="소지금 페니" />
        <span class="bag-money-unit">페니</span>
      </label>
    `
    : `
      <span>소지금</span>
      <strong>${formatPenny(bag.money)}</strong>
    `;

  document.getElementById("bagToolbar").innerHTML = isGmMode
    ? `
      <button class="bag-add-button" type="button" data-bag-add="${activeCategory.key}">
        ${activeCategory.label} 추가
      </button>
    `
    : "";

  document.getElementById("bagCategories").innerHTML = BAG_CATEGORIES.map((category) => {
    const isActive = category.key === activeCategory.key;
    const count = bag[category.key].length;
    return `
      <button class="bag-category ${isActive ? "is-active" : ""}" type="button" role="tab" aria-selected="${isActive ? "true" : "false"}" data-bag-category="${category.key}">
        <span>${category.label}</span>
        <strong>${count}</strong>
      </button>
    `;
  }).join("");

  document.getElementById("bagList").innerHTML = items.length
    ? items
        .map((item, index) => {
          const quantity = item.quantity !== 1 ? `<span class="bag-quantity">x${item.quantity}</span>` : "";
          const tags = (item.tags || []).map((tag) => `<span class="skill-tag">${escapeHtml(tag)}</span>`).join("");
          return `
            <article class="bag-card ${isGmMode ? "is-editable" : ""}" data-bag-category="${activeCategory.key}" data-bag-index="${index}" tabindex="${isGmMode ? "0" : "-1"}">
              <div class="bag-card-head">
                <p class="gear-name">${escapeHtml(item.name || "이름 없는 물품")}</p>
                ${quantity}
              </div>
              ${item.note ? `<p class="bag-note">${escapeHtml(item.note)}</p>` : ""}
              ${tags ? `<div class="skill-tags">${tags}</div>` : ""}
            </article>
          `;
        })
        .join("")
    : `
      <div class="bag-empty">
        <strong>${activeCategory.label}</strong>
        <span>아직 등록된 물품 없음</span>
      </div>
    `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setEditDialog(open) {
  const dialog = document.getElementById("editDialog");
  dialog.hidden = !open;
  document.body.classList.toggle("edit-dialog-open", open);

  if (!open) {
    activeEditor = null;
  }
}

function equipmentOptionRow(key = "strength", value = 0) {
  const options = EDITABLE_STAT_DEFS.map((stat) => `
    <option value="${stat.key}" ${stat.key === key ? "selected" : ""}>${stat.label}</option>
  `).join("");

  return `
    <div class="option-row equipment-option-row">
      <select class="option-stat" aria-label="능력치 선택">${options}</select>
      <input class="option-value" type="number" value="${Number(value) || 0}" aria-label="능력치 수치" />
      <button class="icon-action option-remove" type="button" aria-label="옵션 제거">×</button>
    </div>
  `;
}

function skillOptionRow(value = "") {
  return `
    <div class="option-row skill-option-row">
      <input class="option-tag" type="text" value="${escapeHtml(value)}" aria-label="스킬 옵션" />
      <button class="icon-action option-remove" type="button" aria-label="옵션 제거">×</button>
    </div>
  `;
}

function bagCategoryOptions(selectedKey = activeBagCategory) {
  return BAG_CATEGORIES.map((category) => `
    <option value="${category.key}" ${category.key === selectedKey ? "selected" : ""}>${category.label}</option>
  `).join("");
}

function openEquipmentEditor(index) {
  if (!isGmMode) return;

  const character = getCharacter();
  const item = character.equipment[index];
  if (!item) return;

  activeEditor = { type: "equipment", index };
  document.getElementById("editDialogKicker").textContent = item.slot || "장비";
  document.getElementById("editDialogTitle").textContent = "장비 수정";
  document.getElementById("editOptionsTitle").textContent = "능력치 옵션";
  document.getElementById("addOptionButton").textContent = "능력치 추가";
  document.getElementById("editFields").innerHTML = `
    <label class="edit-field">
      <span>이름</span>
      <input id="editName" type="text" value="${escapeHtml(item.name)}" />
    </label>
  `;

  const rows = Object.entries(item.stats || {});
  document.getElementById("editOptions").innerHTML = rows.length
    ? rows.map(([key, value]) => equipmentOptionRow(key, value)).join("")
    : equipmentOptionRow();

  setEditDialog(true);
  window.setTimeout(() => document.getElementById("editName").focus(), 0);
}

function openSkillEditor(index) {
  if (!isGmMode) return;

  const character = getCharacter();
  const skill = character.skills[index];
  if (!skill) return;

  activeEditor = { type: "skill", index };
  document.getElementById("editDialogKicker").textContent = "스킬";
  document.getElementById("editDialogTitle").textContent = "스킬 수정";
  document.getElementById("editOptionsTitle").textContent = "스킬 옵션";
  document.getElementById("addOptionButton").textContent = "옵션 추가";
  document.getElementById("editFields").innerHTML = `
    <label class="edit-field">
      <span>이름</span>
      <input id="editName" type="text" value="${escapeHtml(skill.name)}" />
    </label>
    <label class="edit-field">
      <span>내용</span>
      <textarea id="editBody" rows="4">${escapeHtml(skill.body)}</textarea>
    </label>
  `;

  document.getElementById("editOptions").innerHTML = (skill.tags || []).length
    ? skill.tags.map((tag) => skillOptionRow(tag)).join("")
    : skillOptionRow();

  setEditDialog(true);
  window.setTimeout(() => document.getElementById("editName").focus(), 0);
}

function openBagItemEditor(categoryKey, index = null) {
  if (!isGmMode) return;

  const character = getCharacter();
  character.bag = normalizeBag(character.bag);
  const isNew = index === null;
  const item = isNew
    ? { name: "", quantity: 1, note: "", tags: [] }
    : character.bag[categoryKey]?.[index];
  if (!item) return;

  const category = BAG_CATEGORIES.find((entry) => entry.key === categoryKey) || BAG_CATEGORIES[0];
  activeEditor = { type: "bag", categoryKey, index };
  document.getElementById("editDialogKicker").textContent = category.label;
  document.getElementById("editDialogTitle").textContent = isNew ? "물품 추가" : "물품 수정";
  document.getElementById("editOptionsTitle").textContent = "태그";
  document.getElementById("addOptionButton").textContent = "태그 추가";
  document.getElementById("editFields").innerHTML = `
    <label class="edit-field">
      <span>분류</span>
      <select id="editBagCategory">${bagCategoryOptions(categoryKey)}</select>
    </label>
    <label class="edit-field">
      <span>이름</span>
      <input id="editName" type="text" value="${escapeHtml(item.name)}" />
    </label>
    <label class="edit-field">
      <span>수량</span>
      <input id="editQuantity" type="number" min="1" value="${Math.max(1, normalizeNumber(item.quantity, 1))}" />
    </label>
    <label class="edit-field">
      <span>설명</span>
      <textarea id="editBody" rows="4">${escapeHtml(item.note)}</textarea>
    </label>
    ${
      isNew
        ? ""
        : `<button class="danger-action" id="deleteBagItemButton" type="button">물품 삭제</button>`
    }
  `;

  document.getElementById("editOptions").innerHTML = (item.tags || []).length
    ? item.tags.map((tag) => skillOptionRow(tag)).join("")
    : skillOptionRow();

  setEditDialog(true);
  window.setTimeout(() => document.getElementById("editName").focus(), 0);
}

function addEditorOption() {
  if (!activeEditor) return;

  const options = document.getElementById("editOptions");
  options.insertAdjacentHTML("beforeend", activeEditor.type === "equipment" ? equipmentOptionRow() : skillOptionRow());
}

function applyEquipmentEditor() {
  const character = getCharacter();
  const item = character.equipment[activeEditor.index];
  if (!item) return;

  item.name = document.getElementById("editName").value.trim();
  item.stats = {};

  document.querySelectorAll(".equipment-option-row").forEach((row) => {
    const key = row.querySelector(".option-stat").value;
    const value = normalizeNumber(row.querySelector(".option-value").value);
    if (!key || value === 0) return;
    item.stats[key] = (item.stats[key] || 0) + value;
  });
}

function applySkillEditor() {
  const character = getCharacter();
  const skill = character.skills[activeEditor.index];
  if (!skill) return;

  skill.name = document.getElementById("editName").value.trim();
  skill.body = document.getElementById("editBody").value.trim();
  skill.tags = Array.from(document.querySelectorAll(".option-tag"))
    .map((input) => input.value.trim())
    .filter(Boolean);
}

function applyBagItemEditor() {
  const character = getCharacter();
  character.bag = normalizeBag(character.bag);
  const nextCategoryKey = document.getElementById("editBagCategory").value;
  const item = {
    name: document.getElementById("editName").value.trim(),
    quantity: Math.max(1, normalizeNumber(document.getElementById("editQuantity").value, 1)),
    note: document.getElementById("editBody").value.trim(),
    tags: Array.from(document.querySelectorAll(".option-tag"))
      .map((input) => input.value.trim())
      .filter(Boolean),
  };

  if (activeEditor.index === null) {
    character.bag[nextCategoryKey].push(item);
    activeBagCategory = nextCategoryKey;
    return;
  }

  if (activeEditor.categoryKey === nextCategoryKey) {
    character.bag[nextCategoryKey][activeEditor.index] = item;
    activeBagCategory = nextCategoryKey;
    return;
  }

  character.bag[activeEditor.categoryKey].splice(activeEditor.index, 1);
  character.bag[nextCategoryKey].push(item);
  activeBagCategory = nextCategoryKey;
}

function deleteBagItem() {
  if (!activeEditor || activeEditor.type !== "bag" || activeEditor.index === null) return;

  const character = getCharacter();
  character.bag = normalizeBag(character.bag);
  character.bag[activeEditor.categoryKey].splice(activeEditor.index, 1);
  markDirty();
  setEditDialog(false);
  renderAll();
}

function applyEditor() {
  if (!activeEditor) return;

  if (activeEditor.type === "equipment") {
    applyEquipmentEditor();
  } else if (activeEditor.type === "skill") {
    applySkillEditor();
  } else if (activeEditor.type === "bag") {
    applyBagItemEditor();
  }

  markDirty();
  setEditDialog(false);
  renderAll();
}

function renderAll() {
  renderGmState();
  renderCharacterButtons();
  renderIdentity();
  renderResources();
  renderCombatStrip();
  renderStats();
  renderEquipment();
  renderSkills();
  renderBag();
}

function bindTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      document.querySelectorAll(".tab").forEach((button) => {
        const selected = button === tab;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-selected", selected ? "true" : "false");
      });
      document.querySelectorAll(".panel").forEach((panel) => {
        const active = panel.dataset.panel === target;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });
    });
  });
}

function bindBagTabs() {
  document.getElementById("bagCategories").addEventListener("click", (event) => {
    const button = event.target.closest(".bag-category");
    if (!button) return;
    activeBagCategory = button.dataset.bagCategory;
    renderBag();
  });
}

function bindSidebar() {
  document.getElementById("sidebarToggle").addEventListener("click", () => {
    setSidebar(!document.body.classList.contains("sidebar-open"));
  });
  document.getElementById("sidebarBackdrop").addEventListener("click", () => setSidebar(false));
  document.getElementById("characterButtons").addEventListener("click", (event) => {
    const button = event.target.closest(".character-button");
    if (!button) return;
    activeCharacterId = button.dataset.character;
    renderAll();
    setSidebar(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setSidebar(false);
    }
  });
}

function bindGmAuth() {
  document.getElementById("gmLoginButton").addEventListener("click", () => {
    if (isGmMode) return;
    setGmDialog(true);
  });

  document.getElementById("gmCloseButton").addEventListener("click", () => setGmDialog(false));

  document.getElementById("gmDialog").addEventListener("click", (event) => {
    if (event.target.id === "gmDialog") {
      setGmDialog(false);
    }
  });

  document.getElementById("gmForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("gmPasswordInput");
    const error = document.getElementById("gmError");

    if (input.value === GM_PASSWORD) {
      isGmMode = true;
      setGmDialog(false);
      renderAll();
      return;
    }

    error.textContent = "비밀번호가 맞지 않습니다.";
    input.select();
  });
}

function bindSave() {
  document.getElementById("saveButton").addEventListener("click", () => {
    if (!isGmMode) return;
    saveGameData();
  });
}

function bindEditors() {
  document.getElementById("gearGrid").addEventListener("click", (event) => {
    const card = event.target.closest(".gear-card");
    if (!card || !isGmMode) return;
    openEquipmentEditor(Number(card.dataset.equipmentIndex));
  });

  document.getElementById("gearGrid").addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    const card = event.target.closest(".gear-card");
    if (!card || !isGmMode) return;
    event.preventDefault();
    openEquipmentEditor(Number(card.dataset.equipmentIndex));
  });

  document.getElementById("skillGrid").addEventListener("click", (event) => {
    const card = event.target.closest(".skill-card");
    if (!card || !isGmMode) return;
    openSkillEditor(Number(card.dataset.skillIndex));
  });

  document.getElementById("skillGrid").addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    const card = event.target.closest(".skill-card");
    if (!card || !isGmMode) return;
    event.preventDefault();
    openSkillEditor(Number(card.dataset.skillIndex));
  });

  document.getElementById("bagToolbar").addEventListener("click", (event) => {
    const button = event.target.closest("[data-bag-add]");
    if (!button || !isGmMode) return;
    openBagItemEditor(button.dataset.bagAdd, null);
  });

  document.getElementById("bagList").addEventListener("click", (event) => {
    const card = event.target.closest(".bag-card");
    if (!card || !isGmMode) return;
    openBagItemEditor(card.dataset.bagCategory, Number(card.dataset.bagIndex));
  });

  document.getElementById("bagList").addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    const card = event.target.closest(".bag-card");
    if (!card || !isGmMode) return;
    event.preventDefault();
    openBagItemEditor(card.dataset.bagCategory, Number(card.dataset.bagIndex));
  });

  document.getElementById("bagWallet").addEventListener("input", (event) => {
    const input = event.target.closest(".bag-money-input");
    if (!input || !isGmMode) return;
    const character = getCharacter();
    character.bag = normalizeBag(character.bag);
    character.bag.money = Math.max(0, normalizeNumber(input.value));
    markDirty();
  });

  document.getElementById("bagWallet").addEventListener("change", (event) => {
    const input = event.target.closest(".bag-money-input");
    if (!input || !isGmMode) return;
    const character = getCharacter();
    character.bag = normalizeBag(character.bag);
    character.bag.money = Math.max(0, normalizeNumber(input.value));
    renderBag();
  });

  document.getElementById("addOptionButton").addEventListener("click", addEditorOption);
  document.getElementById("editCloseButton").addEventListener("click", () => setEditDialog(false));
  document.getElementById("editCancelButton").addEventListener("click", () => setEditDialog(false));

  document.getElementById("editDialog").addEventListener("click", (event) => {
    if (event.target.id === "editDialog") {
      setEditDialog(false);
    }
  });

  document.getElementById("editOptions").addEventListener("click", (event) => {
    const removeButton = event.target.closest(".option-remove");
    if (!removeButton) return;
    removeButton.closest(".option-row").remove();
  });

  document.getElementById("editFields").addEventListener("click", (event) => {
    if (!event.target.closest("#deleteBagItemButton")) return;
    deleteBagItem();
  });

  document.getElementById("editForm").addEventListener("submit", (event) => {
    event.preventDefault();
    applyEditor();
  });
}

function bindStatInputs() {
  const applyInput = (input) => {
    if (!input || !isGmMode) return;
    const state = getState();
    const value = Number(input.value || 0);
    state[input.dataset.stat][input.dataset.kind] = Number.isFinite(value) ? Math.max(0, value) : 0;
    markDirty();
  };

  document.getElementById("statTable").addEventListener("input", (event) => {
    const input = event.target.closest(".stat-input");
    applyInput(input);
    if (input) refreshComputedFields();
  });

  document.getElementById("statTable").addEventListener("change", (event) => {
    const input = event.target.closest(".stat-input");
    applyInput(input);
    if (!input) return;
    renderAll();
  });
}

bindTabs();
bindBagTabs();
bindSidebar();
bindGmAuth();
bindSave();
bindEditors();
bindStatInputs();
renderAll();
