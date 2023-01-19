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
function sendMessage(name, tel, btn_url, pfid, templateId) {
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
    name +
    ' 알림톡 테스트입니다.","type": "ATA","kakaoOptions": {"pfId": "' +
    pfid +
    '","templateId": "' +
    templateId +
    '","buttons": [{"buttonType": "WL","buttonName": "링크테스트","linkMo": "https://' +
    btn_url +
    '", "linkPc":"https://' +
    btn_url +
    '"}]}}}';

  var data = {
    message: {
      to: tel,
      from: "01071860119",
      text: name + " 알림톡 테스트입니다.",
      type: "ATA",
      kakaoOptions: {
        pfId: pfid,
        templateId: templateId,
        buttons: [],
      },
    },
  };

  request.send(message);
  return;
}
// 결과 팝업으로 표시
function requestResult() {
  if (request.readyState == XMLHttpRequest.DONE) {
    alert(request.responseText);
  }
}
