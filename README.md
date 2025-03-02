# 한입 크기로 잘라 먹는 next.js

## 사전 렌더링

브라우저의 요청에 사전에 렌더링이 완료된 HTML을 응답하는 렌더링 방식

Client Side Rendering의 단점을 효율적으로 해결하는 기술

![Image](https://github.com/user-attachments/assets/b68fc273-4c37-4509-8f00-6ed361b2a2f7)

### CSR

React.js 앱의 기본적인 렌더링 방식
클라이언트에서 직접 화면을 렌더링 방식

![Image](https://github.com/user-attachments/assets/46d6feac-a438-4bdb-8698-cd6fedef7b47)

![Image](https://github.com/user-attachments/assets/b17bc4b8-3984-428c-b886-fc074dd6109c)

장점

페이지 이동이 매우 빠르고 쾌적하다는 장점이 있음

단점

초기 접속 속도가 느려진다.

FCP(First Contentful Paint)

"요청 시작" 시점으로부터 컨텐츠가 화면에 처음 나타나는데 걸리는 시간

요청시작 <-> 컨텐츠 렌더링

![Image](https://github.com/user-attachments/assets/81d3d2c9-44c2-4988-99db-c32dc30a018f)

![Image](https://github.com/user-attachments/assets/294005fc-64be-4b7b-aa7c-5f41f0270dc9)

TTI는 html 파일 요소를 렌더링 받고 상호작용이 가능한 시간까지 걸리는 시간(이것이 완료되야 비로써 인터렉션이 가능한 상태)

한 입 크기로 잘라먹는 Next.js 강의에 사용되는 백엔드 서버입니다.  
Node.js 20(or LTS) 이상의 버전이 필요합니다. (24.06.03 기준)

## 시작하기 (Getting Started)

### 1. 코드를 다운로드하세요

이 저장소를 Clone 또는 Fork 하세요 (별표도 찍어주시면 정말 감사 ... 👍)

<img width="1483" alt="image" src="https://github.com/winterlood/onebite-books-server/assets/46296754/6e984ada-dc30-46a8-8cf2-abaf4c6feae9">

### 2. 의존성 설치

로컬에서 다음 명령어를 통해 의존성을 모두 설치하세요

```
> npm install
```

### 3. Supabse 설정하기

Supabase에 가입한 다음 새로운 프로젝트를 생성합니다.

프로젝트 생성이 완료되었다면 Settings 페이지로 이동한 다음  
좌측 사이드바의 `Configuration > Database` 섹션에서 `Connection String`을 복사합니다.  
(하단의 그림 자료 참고)

<img width="1361" alt="image" src="https://github.com/winterlood/onebite-books-server/assets/46296754/8576abcd-084a-4648-a8a7-7c15adb821a3">

복사한 `Connection String`을 `.env` 파일을 생성하여 다음과 같이 붙여넣습니다.

```
// .env
DATABASE_URL="방금 복사한 Connection String"
```

이때 `Connection String`의 `[YOUR-PASSWORD]` 부분을 자신이 설정한 비밀번호로 수정합니다.

<details>
<summary><b>비밀번호를 까먹었다면?</b></summary>
<div markdown="1">

앞서 `Connection String`을 복사한 페이지에서 드래그를 내려보면 아래 그림과 같이 `Reset Password` 버튼을 발견할 수 있습니다.  
해당 버튼을 클릭해 새로운 비밀번호로 재 설정한 다음 `.env` 파일에 붙여넣습니다.

<img width="1333" alt="image" src="https://github.com/winterlood/onebite-books-server/assets/46296754/effe86fe-8b0d-43a4-9368-6bf2a0b42806">

</div>
</details>

### 4. 데이터베이스 스키마 설정하기

다음 명령어를 입력해 데이터베이스(Supabase) 스키마를 자동 설정합니다.

```
npx prisma db push
```

### 5. 시드 데이터 삽입하기

다음 명령어를 입력해 시드(기초) 데이터를 데이터베이스에 삽입합니다.

> (참고) 삽입되는 시드 데이터는 프로젝트 `prisma/seed/data.ts` 파일에서 확인할 수 있습니다.

```
npm run seed
```

### 6. 서버 실행하기

다음 명령어를 통해 프로젝트를 빌드한 다음 서버를 실행합니다.

```
> npm run build
> npm run start
```

(참고) 개발모드로 서버를 실행하고 싶다면 다음 명령어를 입력합니다.

```
> npm run start:dev
```

### 7. 데이터베이스 실시간 확인하기

다음 명령어를 입력하면 데이터베이스를 실시간으로 조회가능한 URL로 접속됩니다.

```
npx prisma studio
```

<img width="1222" alt="image" src="https://github.com/winterlood/onebite-books-server/assets/46296754/5c06d9aa-8f8b-4d9d-9763-9408e1724b13">

### 8. API 문서 확인하기

다음 주소로 접속하면 Swagger로 제작된 API 문서를 확인하실 수 있습니다.  
단 서버가 가동중일 때에만 동작하니 꼭 서버를 가동한 뒤 접속해주세요!

**http://localhost:12345/api**

<img width="1496" alt="image" src="https://github.com/winterlood/onebite-books-server/assets/46296754/e55f176b-8641-4484-bf36-9a3bc7590ac5">

퍼즈 풀기

dashbord-> 해당 프로젝트 선택 -> Restore Project button 클릭

![Image](https://github.com/user-attachments/assets/3cea1692-2cf8-4159-9c18-2da9c60c8161)

![Image](https://github.com/user-attachments/assets/d18f61c2-0057-4606-b7b9-5a02718dfb57)

## ISR(증분 정적 재성성)

단순히 그냥 ssg 방식으로 생성된 정적 페이지를 일정 시간을 주기로 다시 생성하는 방식

ssg는 최신 데이터 방식을 업데이트하기 어렵다는 단점

유통 기한을 설정할 수 있다.

그 이후에는 다시 새롭게 해당 페이지를 정적으로 생성

![Image](https://github.com/user-attachments/assets/9d858de0-bcce-4208-b080-bb56719d61b9)

ISR 증분 정적 재성성에 적합하다.
ssg 방식

### ISR 주문형 재 검증

시간 기반의 ISR을 적용하기 어려운 페이지도 존재 함.

시간과 관계없이 사용자의 행동에 따라 데이터가 업데이트 되는 페이지

커뮤니티 사이트의 게시글 페이지

- 게시글 수정: 페이지 데이터를 업데이트 함.
- 게시글 삭제: 페이지 데이터 삭제

![Image](https://github.com/user-attachments/assets/e61ce096-644f-41d2-9c06-6639955ddacb)

![Image](https://github.com/user-attachments/assets/0d56a0fa-1318-4447-84bf-da6fbd1a6c1c)

SSR로 처리하면 안되나?

![Image](https://github.com/user-attachments/assets/4aa5631c-41be-4cbb-8ac6-6009e6b534ad)

동시접속자가 많다고 한다면 서버 부하 단점..

### On-Demand ISR

요청을 받을 때 마다 페이지를 다시 생성하는 ISR

![Image](https://github.com/user-attachments/assets/70ae44c2-3d36-4024-9f56-369e06de507d)

## React Server Component

서버측에서만 실행되는 컴포넌트

페이지의 대부분을 서버 컴포넌트로 구성할 것을 권장
클라이언트 컴포넌트는 꼭 필요한 경우에만 사용할 것

상호 작용 client component
searchBar
입력하고 state에 보건 enter onKeydown 이벤트 실행

상호 작용 x server component
header,
추천,
모든 도서,
각 도서의 List
Link는 html 고유의 기능

## Server Component 주의 사항

1. 서버 컴포넌트에는 브라우저에서 실행될 코드가 포함되면 안된다

react hook이나 이벤트 핸들러 사용 x

브라우저에서 실행되는 기능을 담고 있는 라이브러리

2. 클라이언트 컴포넌트는 클라이언트에서만 실행되지 않는다.

사전 렌더링을 위해 서버에서 1번 실행
하이드레이션을 위해 브라우저에서 1번 실행
= 서버와 클라이언트에서 모두 실행됨

3. 클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없다.

Next.js는 자동으로 서버 컴포넌트를 클라이언트 컴포넌트로 변경함.

client에서 어쩔 수 없이 sever component를 사용해야할 경우
children props로 받을 경우 client component로 변경되지 않는다.

4. 서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화 되지 않는 props는 전달 불가하다.

직렬화 되지 않은 props

직렬화

객체, 배열, 클래스 등의 복잡한 구조의 데이터를 네트워크 상으로 전송하기 위해 아주 단순한 형태(문자열,byte)로 변환하는 것

함수는 직렬화가 불가능 함

rsc payload

- React Server Componet의 순수한 데이터(결과물)
- React Server Component를 직렬화 한 결과

- 서버 컴포넌트의 렌더링 결과
- 연결된 클라이언트 컴포넌트의 위치
- 클라이언트 컴포넌트에게 전달하는 props 값

## 데이터 페칭(Server component 도입으로 많은 변화)

async를 사용하여 서버 컴포넌트에 넣어 데이터를 직접 불러옴.

클라이언트 컴포넌트에서는 async 키워드를 사용할 수 없었음.

브라우저에서 동작시 문제를 일으킬 수 있기 때문에 권장되지 않음.

Next.js 공식문서
데이터는 필요한 곳에서 직접 불러와라.
