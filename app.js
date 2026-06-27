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
    skills: [
      { name: "마나볼", body: "지능 결과값 +4", tags: ["마법 1", "공격"] },
      { name: "올라타기", body: "민첩 다이스 1", tags: ["SP 2", "이동"] },
      { name: "늑대 리듬 동조", body: "적 속도가 자신보다 빠를 때 받는 쾌락 데미지 +1, 동조 성공 시 매턴마다 1 SP 회복.", tags: ["회복", "동조"] },
      { name: "야수의 정수(패시브)", body: "건강 +4, 속도 -3", tags: ["패시브", "능력치"] },
    ],
  },
];

const characterState = Object.fromEntries(CHARACTERS.map((character) => [character.id, createState(character)]));
let activeCharacterId = CHARACTERS[0].id;

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
  const magicUses = Math.floor(3 + intelligence / 5);
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
    ["마법", Math.floor(3 + getTotal({ key: "intelligence" }, character) / 5)],
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
          <input class="stat-input" type="number" value="${modifier.increase}" min="0" data-stat="${stat.key}" data-kind="increase" aria-label="${stat.label} 증가" />
        </div>
        <div class="stat-cell">
          <input class="stat-input" type="number" value="${modifier.decrease}" min="0" data-stat="${stat.key}" data-kind="decrease" aria-label="${stat.label} 감소" />
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

function renderEquipment() {
  const character = getCharacter();
  document.getElementById("gearGrid").innerHTML = character.equipment
    .map((item) => {
      const isEmpty = !item.name;
      const durability = item.durability
        ? item.durability.current === null
          ? `내구도 ${item.durability.max}`
          : `내구도 ${item.durability.current}/${item.durability.max}`
        : "";
      const bonuses = Object.entries(item.stats);
      return `
        <article class="gear-card ${isEmpty ? "is-empty" : ""}">
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
    .map((skill) => `
      <article class="skill-card">
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

function renderAll() {
  renderCharacterButtons();
  renderIdentity();
  renderResources();
  renderCombatStrip();
  renderStats();
  renderEquipment();
  renderSkills();
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

function bindStatInputs() {
  document.getElementById("statTable").addEventListener("change", (event) => {
    const input = event.target.closest(".stat-input");
    if (!input) return;
    const state = getState();
    const value = Number(input.value || 0);
    state[input.dataset.stat][input.dataset.kind] = Number.isFinite(value) ? Math.max(0, value) : 0;
    renderAll();
  });
}

bindTabs();
bindSidebar();
bindStatInputs();
renderAll();
