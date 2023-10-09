# 49-2nd-widely
- 생활용품 쇼핑몰 [와이즐리](https://wisely.store/) 클론 프로젝트
- 디자인/기획 부분을 클론함과 동시에 추가로 구현하고 싶은 내용을 개발하고자 하였습니다.

## 개발 인원 및 기간
- 개발기간 : 2023/09/18 ~ 2023/10/06 (총 2주)
- 개발 인원 : 프론트엔드 3명, 백엔드 4명
> Product Manager: 김기영(F) <br />
> Project Manager: 차승혁(B) <br />
> Teammates: 박민재(F), 이청원(F) / 정현우(B), 이준호(B), 고은채(B)<br />
- [프론트엔드 github 링크](https://github.com/wecode-bootcamp-korea/49-2nd-widely-frontend) <br>

## 담당 기능
- 고은채 : user - 회원가입/로그인 <br>
- 이준호 : product - 메인페이지, 상세페이지 <br>
- 차승혁 : cart - 장바구니 / Project Manager<br>
- 정현우 : order - 주문서, 결제<br>

## 데모 영상

https://github.com/wecode-bootcamp-korea/49-2nd-widely-backend/assets/120547603/86baf1b2-3567-43c9-86c4-9ff3dfceb479


# 적용 기술 및 구현 기능
## 적용 기술
- Front-End : React.js, sass, slick, trello, react-daum-postcode, react-router-dom, swiper
- Back-End : Node.js, Express.js, Bcrypt, My SQL, Nodemailer
- Common : RESTful API <br>

## 데이터베이스
![image](https://github.com/wecode-bootcamp-korea/49-2nd-widely-backend/assets/124764329/fa9fc799-3d92-4e3b-b4de-fdab1fc80dc7) <br>


## 구현 기능
### 👩‍💻 user
- 회원가입 시 입력된 정보를 기반으로 유저 등록
- 로그인 시 가입된 유저를 체크 후 토큰 발급
- 아이디 찾기 시 동일한 유저가 있는지 체크 후 결과 값 반환
- 비밀번호 찾기 시 임시 비밀번호를 생성, 수정 후 메일로 전송
  
### 🎁 product
- 카테고리 조회, 전체 조회, 카테고리 내 소분류 기능을 하나의 쿼리와 여러개의 쿼리빌더들의 조합으로 기능을 구현
- 제품명을 기준으로 검색값을 request하여 해당 상품들을 조회하는 기능을 구현
- 상세상품 조회 구현
- 신제품은 달력 기준 해당하는 주에 업데이트된 제품들을 상단으로 노출시킴

### 🛒 cart
- 장바구니 api 를 호출 시 상세페이지에서 넘겨주는 prouducts 정보를 장바구니에 추가, 수정, 삭제, 조회
- 장바구니에 담겨있는 동일 상품을 insert할 시 동일 상품의 count값만 증가
- 삭제를 전체삭제와 선택삭제 구분 / token 값이 없을 시 상품을 담을 수 없음
### 💸 order
- 주문페이지에 보여지는 장바구니, 주문자, 배송지, 결제(포인트) 모두 하나의 api로 호출 
- 주문하기 api 호출 시 order 관련 정보를 저장함과 동시에 cart에 담긴 제품의 상태를 주문 완료로 변경, 결제 시 사용하고자 입력한 포인트 만큼 삭감
- 배송지 추가 api 호출 시 새로운 배송지 정보를 저장, 배송지 삭제 api 호출 시 기존에 저장한 주소 정보를 삭제 <br>

## Naming convention

### Branch & PR & Commit

*  Branch는 기능별로 구분합니다.
```
feature/user
feature/login
fix/cart
```
  
*  Commit 메세지는 구분이 용이하도록 말머리와 함께 작성합니다. 
```
🎉 Init: 프로젝트 시작
✨ Feat: 새로운 기능 추가
🔨Chore: 자잘한 수정사항
🚧 Modify : 수정 (JSON 데이터 포맷 변경 등 )
🗃 DB : 데이터베이스 관련 수정
``` 

# Reference
- 이 프로젝트는 [와이즐리](https://wisely.store/)를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
