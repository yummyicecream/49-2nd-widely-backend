# 49-2nd-widely
- 생활용품 쇼핑몰 [와이즐리](https://wisely.store/) 클론 프로젝트
- 디자인/기획 부분을 클론함과 동시에 추가로 구현하고 싶은 내용을 개발하고자 하였습니다.

## 개발 인원 및 기간
- 개발기간 : 2023/09/18 ~ 2023/10/06 (총 2주)
- 개발 인원 : 프론트엔드 3명, 백엔드 4명
- [프론트엔드 github 링크](https://github.com/wecode-bootcamp-korea/49-2nd-widely-frontend) <br>

## 담당 기능
- 고은채 : user - 회원가입/로그인 <br>
- 이준호 : product - 메인페이지, 상세페이지 <br>
- 차승혁 : cart - 장바구니 / Project Manager<br>
- 정현우 : order - 주문서, 결제<br>

## 데모 영상
<br>

# 적용 기술 및 구현 기능
## 적용 기술
- Front-End : React.js, sass
- Back-End : Node.js, Express.js, Bcrypt, My SQL
- Common : RESTful API <br>

  
## 구현 기능
### 👩‍💻 user
-
-
-
### 🎁 product
-
-
-
### 🛒 cart
-
-
-
### 💸 order
- 주문페이지에 보여지는 장바구니, 주문자, 배송지, 결제(포인트) 모두 하나의 api로 호출 
- 주문하기 api 호출 시 order 관련 정보를 저장함과 동시에 cart에 담긴 제품의 상태를 주문 완료로 변경, 결제 시 사용하고자 입력한 포인트 만큼 삭감
- 배송지 추가 api 호출 시 새로운 배송지 정보를 저장, 배송지 삭제 api 호출 시 기존에 저장한 주소 정보를 삭제

# Reference
- 이 프로젝트는 [와이즐리](https://wisely.store/)를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
