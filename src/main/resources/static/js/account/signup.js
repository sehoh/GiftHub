window.onload = function () {
    document.getElementById("auth-phone").style.visibility = "hidden";
    document.getElementById("result-confirmPassword-label").style.visibility="hidden";
    document.getElementById("result-email-label").style.visibility="hidden";
    document.getElementById("result-nickname-label").style.visibility="hidden";
    document.getElementById("result-tel-label").style.visibility="hidden";

    $("#signup-btn").click(function (e) {
        e.preventDefault();
        signup();
    });


    $('#email').on('change', function () {
        emailCheck();
    });

    $('#password').on('change', function () {
        passwordCheck();
        confirmPasswordCheck();

    });

    $('#confirm-password').on('change', function () {
        confirmPasswordCheck();

    });

    $('#nickname').on('change', function (){
        nicknameCheck();

    })
    $('#tel').on('change', function (){
        telCheck();
    })

    $('#birth-date').on('change', function (){
        birthCheck();
    })



}


function passwordCheck(){
    let password = $("#password").val();
    let regExp = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    let label = document.getElementById("result-Password-label");

    if(regExp.test(password)) {
        label.innerText = '비밀번호가 유효합니다.';
        label.style.color = 'green';
    } else {
        label.innerText = '비밀번호가 규칙에 맞지 않습니다.  8자 이상, 특수문자를 포함해 주세요, 공백은 제외해주세요';
        label.style.color= 'red';
    }
    if(password==''|| password==null){
        label.innerText="";
    }
}

function  confirmPasswordCheck(){
 let data={
     password: $("#password").val(),
     confirmPassword: $("#confirm-password").val()
 };
 $.ajax({
     type:"post",
     url: "/signup/confirmpassword/check",
     data: JSON.stringify(data),
     // data: data,
     contentType: "application/json; charset=utf-8",
     dataType: "json",
     success: function (jsonData) {
         console.log(jsonData);
         checkResult(jsonData);
     },
     error: function (error) {
         console.log(error)
         checkResult(error.responseJSON);
     }
 });
}

function emailCheck() {
    let data = {
        email: $("#email").val()
    };

    $.ajax({
        type: "post",
        url: "/signup/email/check",
        data: JSON.stringify(data),
        // data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (jsonData) {
            console.log(jsonData);
            checkResult(jsonData);
        },
        error: function (error) {
            console.log(error)
            checkResult(error.responseJSON);
        }
    });
}

function nicknameCheck() {
    let data = {
        nickname: $("#nickname").val()
    };

    $.ajax({
        type: "post",
        url: "/signup/nickname/check",
        data: JSON.stringify(data),
        // data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (jsonData) {
            console.log(jsonData);
            checkResult(jsonData);
        },
        error: function (error) {
            console.log(error)
            checkResult(error.responseJSON);
        }
    });
}
function telCheck() {
    let label=document.getElementById("result-tel2-label");
    let regExp= /^01([0|1|6|7|8|9]?)-([0-9]{4})-([0-9]{4})\S*$/;
    let data = {
        tel: $("#tel").val()
    };
    if(regExp.test(data.tel)){
        label.innerText="옳바른 형태입니다"
        label.style.color="green"
    }else{
        label.innerText=" 전화번호 형태를 지켜주세요 'xxx-xxxx-xxxx' "
        label.style.color="red"
    }


    $.ajax({
        type: "post",
        url: "/signup/tel/check",
        data: JSON.stringify(data),
        // data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (jsonData) {
            console.log(jsonData);
            checkResult(jsonData);
        },
        error: function (error) {
            console.log(error)
            checkResult(error.responseJSON);
        }
    });
}


function checkResult(result) {
    let label = document.getElementById("result-" + result.target + "-label");
    if (result.status == "success") {
        label.setAttribute('style', 'color: green');
        label.innerText = result.message;

    }

    if (result.status == "error") {
        label.setAttribute('style', 'color: red;');
        label.innerText = result.message;
    }

    label.innerText = result.message;
}
function birthCheck(){
    let birth = $("#birth-date").val();
    let birthlabel=document.getElementById("result-birth-date-label");
    let regExp = /^\S*\d{8}$/;

    if(birth === "" || birth === null){ // 먼저 null 또는 빈 문자열 확인
         document.getElementById("result-birth-date-label").style.visibility="hidden"
     } else if(regExp.test(birth)){
        birthlabel.innerText = "감사합니다";
        birthlabel.style.color = 'green';
    } else {
        birthlabel.innerText = "8자리 데로 입력해주십시오.";
        birthlabel.style.color = 'red';
    }
}

// function telCheck2(){
// document.getElementById("auth-phone").style.visibility="visible"
//     document.getElementById("result-tel2-label").style.display="none"
//     document.getElementById("result-tel-label").style.display="none"
//     let tel=$("#tel").val();
//   $.ajax({
//       type:"post",
//       url: "/check/sendSMS",
//       data: {tel: tel},
//       contentType: "application/json; charset=utf-8",
//       dataType: "json",
//
//   })
// }



function signup() {

    let year = $("#birth-date").val().substring(0, 4);
    let birthdate = $("#birth-date").val().substring(4);

    let data = {
        email: $("#email").val(),
        password: $("#password").val(),
        confirmPassword: $("#confirm-password").val(),
        name: $("#name").val(),
        nickname: $("#nickname").val(),
        tel: $("#tel").val(),
        gender: $("#gender").val(),
        year: year,
        birthdate: birthdate
    }



    $.ajax({
        type: "post",
        url: "http://localhost:8081/signup/submit",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (jsonData) {
            console.log(jsonData);
        },

        error: function (error) {
            var errorMessages = error.responseJSON;
            errorMessages.forEach(function (msg){
                alert(msg);
            });

        }
    });
}

