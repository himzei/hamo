// api key
const api_key = "NCSJTUHVWWQ0EWKT";
// api secret
const api_secret = "AU16IKRS7CVUPXXWOWP3ECGMEFBB7VCQ";
// header authoriztion
function getAuthorization() {
  let salt = getSalt(); // 랜덤값 30자
  let date = getDate(); // 오늘 날짜
  let value = date + salt; // 오늘날짜 + 랜덤값 30자
  let signature = getSignature(value, api_secret);
  let authoriztion =
    "HMAC-SHA256 apiKey=" +
    api_key +
    ", date=" +
    date +
    ", salt=" +
    salt +
    ", signature=" +
    signature;
  return authoriztion;
}
// salt 랜덤 값 30자 생성
function getSalt() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 30; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// 오늘 날짜 가져오기
function getDate() {
  let today = new Date();
  return today.toISOString();
}
// 시그니쳐 헤더 검증
function getSignature(value, key) {
  let signature = CryptoJS.HmacSHA256(value, key);
  return signature;
}

var request;
// 플러스친구 GET
function getPlusfriend(pfid) {
  let url = "https://api.solapi.com/kakao/v1/plus-friends/" + pfid;

  request = new XMLHttpRequest();

  if (!request) {
    alert("request create fail");
    return;
  }

  let authoriztion = getAuthorization();

  request.onreadystatechange = requestResult;
  request.open("GET", url);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", authoriztion);
  request.send();
}
// 플러스 친구 정보 모두가져오기
function getPlusfriends() {
  let url = "https://api.solapi.com/kakao/v1/plus-friends";

  request = new XMLHttpRequest();

  if (!request) {
    alert("request create fail");
    return;
  }

  let authoriztion = getAuthorization();

  request.onreadystatechange = requestResult;
  request.open("GET", url);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", authoriztion);
  request.send();
}
// 알림톡 템플릿
function getTemplate(templateId) {
  let url = "https://api.solapi.com/kakao/v1/templates/" + templateId;

  request = new XMLHttpRequest();

  if (!request) {
    alert("request create fail");
    return;
  }

  let authoriztion = getAuthorization();

  request.onreadystatechange = requestResult;
  request.open("GET", url);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", authoriztion);
  request.send();
}
// 모든 템플릿 정보를 가져온다
function getTemplates() {
  let url = "https://api.solapi.com/kakao/v1/templates";

  request = new XMLHttpRequest();

  if (!request) {
    alert("request create fail");
    return;
  }

  let authoriztion = getAuthorization();

  request.onreadystatechange = requestResult;
  request.open("GET", url);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", authoriztion);
  request.send();
}
// 알림톡 보낸다
function sendMessage(이름, tel, 문의유형, pfid, templateId) {
  let url = "https://api.solapi.com/messages/v4/send";

  request = new XMLHttpRequest();

  if (!request) {
    alert("request create fail");
    return;
  }

  let authoriztion = getAuthorization();

  request.onreadystatechange = requestResult;
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", authoriztion);

  var message =
    '{"message": {"to": "' +
    tel +
    '","from": "01071860119","text": "' +
    이름 +
    '스마트한 공간 설계 하모와 함께 하세요.","type": "ATA","kakaoOptions": {"pfId": "' +
    pfid +
    '","templateId": "' +
    templateId +
    '","buttons": [{"buttonType": "WL",	"buttonName": "링크테스트",	"linkMo": "https://hamo.fun", "linkPc":"https://hamo.fun"}]}}}';

  // var data = {
  //   message: {
  //     to: tel,
  //     from: "01071860119",
  //     text: `스마트한 공간 설계 하모와 함께하세요.\n\n ${이름} 고객님 하모 ${문의유형} 상담신청이 접수 되었습니다.\n\n 입력하신 연락처로 최대한 빨리 연락 드리겠습니다.\n\n 하모를 이용해 주셔서 감사합니다.`,
  //     type: "ATA",
  //     kakaoOptions: {
  //       pfId: pfid,
  //       templateId: templateId,
  //       buttons: [],
  //     },
  //   },
  // };

  request.send(message);
  return;
}
// 결과 팝업으로 표시
function requestResult() {
  if (request.readyState == XMLHttpRequest.DONE) {
    alert(request.responseText);
  }
}
