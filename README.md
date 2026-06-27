# 리아 TRPG 상태창

GitHub Pages에 올려서 사용할 수 있는 정적 캐릭터 프로필입니다.

## 구성

- `index.html`: 상태창 화면
- `styles.css`: 반응형 UI 스타일
- `app.js`: 장비 보정, 상태 변화, 합계 계산
- `assets/ria.png`: 캐릭터 프로필 이미지

## 배포

1. 이 폴더를 GitHub 저장소로 업로드합니다.
2. 저장소 Settings > Pages에서 배포 브랜치를 선택합니다.
3. `index.html`이 루트에 있으므로 별도 빌드 없이 바로 열립니다.

## 데이터 수정

기본 능력치, 장비, 스킬은 `app.js` 상단의 `stats`, `equipment`, `skills` 배열에서 수정할 수 있습니다.
