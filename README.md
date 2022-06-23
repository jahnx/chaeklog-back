# 책로그 Chaeklog - Back
- 읽은 책과 문장을 기록하는 게시판 형태의 1인 토이프로젝트입니다.
- 개발 인원: 1명
- 개발 기간: 2022.06.07 ~ 2022.06.20
- 기술 스택: TypeScript, NestJS, TypeORM, MySQL
- 배포: AWS - EC2 & RDS
- [프론트 레포](https://github.com/jahnx/chaeklog-front)
- [명세서 겸 회고록](https://velog.io/@jahnx/%EC%B1%85%EB%A1%9C%EA%B7%B8-Chaeklog)

## 구현 기능 목록
### 1. User

- 회원가입
    - 이메일 형식 패턴 적용
    - 이메일 중복 불가
    - 비밀번호&확인이 다르면 가입 실패
    - 비밀번호는 8~20자, 영문 대/소문자, 숫자, 특수문자 사용
- 로그인/로그아웃
    - 메일과 비밀번호가 일치하지 않으면 로그인 실패

### 2. Book

- 책
    - C : 카카오 도서검색 API를 활용한 검색(GET) 후 기록 생성(POST)
    - R : 유저가 기록한 책 전체 조회 및 상세 조회(GET)
    - U : 독서 기간 수정(PATCH)
    - D : 책 기록 삭제(DELETE)
- 필사
    - C : 해당 책 필사 생성(POST)
    - R : 책별 필사 조회(GET)
    - U : 페이지 혹은 문장 수정(PATCH)
    - D : 필사 삭제(DELETE)

## 폴더 구조
```bash
src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── auth
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── dto
│   │   └── auth-credential.dto.ts
│   ├── get-user.decorator.ts
│   ├── jwt.strategy.ts
│   ├── user.entity.ts
│   └── user.repository.ts
├── books
│   ├── books.controller.ts
│   ├── books.module.ts
│   ├── books.service.ts
│   ├── dto
│   │   ├── create-book.dto.ts
│   │   ├── note.dto.ts
│   │   └── update-book.dto.ts
│   ├── entity
│   │   ├── book.entity.ts
│   │   └── note.entity.ts
│   ├── kakaoSearchAPI.ts
│   └── repository
│       ├── book.repository.ts
│       └── note.repository.ts
└── main.ts
```

## DB설계
<img src="https://velog.velcdn.com/images/jahnx/post/72c77249-f1bf-4669-96dd-a95bbf44f7fe/image.png" width="700" height="auto">

## API 설계
<img src="https://velog.velcdn.com/images/jahnx/post/cf98852f-a5c3-4b56-8700-f7b3ad78a921/image.png" width="700" height="auto">
<img src="https://velog.velcdn.com/images/jahnx/post/caf8d569-1a10-42cf-bece-7107f0e58794/image.png" width="700" height="auto">
