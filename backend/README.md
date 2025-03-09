# Ex2Earn Backend

## 환경 설정

### 필수 요구사항
- Node.js (v18 이상)
- PostgreSQL
- npm

### 설치 및 실행

1. 저장소 클론
```bash
git clone [repository-url]
cd ex2earn-backend
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ex2earn?schema=public"

# JWT
JWT_SECRET="your-jwt-secret-key"

# Server
PORT=3000
MODE=dev
```

4. 데이터베이스 마이그레이션
```bash
npx prisma migrate dev
```

5. 서버 실행
```bash
npm run start
```

## API 문서
- Swagger UI: http://localhost:3000/api

## 주요 기능
- 지갑 인증 (Solana)
- JWT 기반 인증
- 사용자 프로필 관리
- 닉네임 생성/수정

## 테스트
```bash
# 단위 테스트
npm run test

# e2e 테스트
npm run test:e2e
```

## 프로젝트 구조