// JavaScript Document
function startLoaderAjax(selector) {
    if (selector == 'body') {
        $("body").append("<div class='ajax_loader_42160' style='background-color:rgb(0,0,0,0.7);position:fixed;top:0;bottom:0;width:100%;height:100%;z-index:99999999;display:none;'><div style='margin:200px auto; width:300px;'><div class='loader123'><i class='fa fa-cog fa-4x yellow123'></i><i class='fa fa-cog fa-4x black123'></i></div></div></div>");
    } else {
        $("#" + selector).append("<img class='ajax_loader_42160' src='" + SITE_THEME + "img/header_loader.gif' alt='ddsa'>");
    }

    // $("body").append("<div id='ajax_loader_42160' style='background:black;opacity:0.7;position:fixed;top:0;bottom:0;width:100%;height:100%;z-index:99999999;display:none;'><div style='margin:200px auto; width:300px;'><img width='300' src='"+SITE_UPLOAD+"loading_home.gif' alt=''></div></div>");
    $(".ajax_loader_42160").show();
}
function stopLoaderAjax() {
    setTimeout(function () {
        $(".ajax_loader_42160").hide();
        $(".ajax_loader_42160").remove();
    }, 500);

}
function ajaxCall(url, param, selector) {
    //check_login();
    var tmpData = "";
    if (selector == "" || selector == undefined) {
        selector = "body";
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        data: param,
        beforeSend: function () {
            startLoaderAjax(selector);
        },
        success: function (data) {
            stopLoaderAjax();
            if (data != '') {
                tmpData = JSON.parse(data);
            }
        }
    });
    //stopLoaderAjax();
    return tmpData;
}
function ajaxCall_file(url, param, selector) {
    //check_login();
    var tmpData = "";
    if (selector == "" || selector == undefined) {
        selector = "body";
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: false,
                    processData: false,
        data: param,
        beforeSend: function () {
            startLoaderAjax(selector);
        },
        success: function (data) {
            stopLoaderAjax();
            if (data != '') {
                tmpData = JSON.parse(data);
            }
        }
    });
    //stopLoaderAjax();
    return tmpData;
}
function ajaxCall1(url, param) {
    var tmpData = "";
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        data: param,
        success: function (data) {

            if (data != '') {
                tmpData = JSON.parse(data);
            }
        }
    });
    //stopLoaderAjax();
    return tmpData;
}
function check_login() {
    var res = ajaxCall1(SITE_URL + "reseller/check_login", { 'a': 'a' });
    if (res == false) {
        window.location.replace(SITE_URL);
    }
}
function showNotification(returnData) {
    var htmlString = '<div class="alert alert-' + returnData.cls + '"><button class="close" data-dismiss="alert" type="button">×</button><strong>' + returnData.msg + '</strong></div>';
    $("#alertDiv").html(htmlString);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
jQuery.validator.addMethod("noSpace", function (value, element) {
    if(value==''){
        return true;
    }
    return value.indexOf(" ") < 0 && value != "";
}, "Space not allowed in this field.");

jQuery.validator.addMethod("checkOtherCard", function (value, element) {
    var isSuccess = false;
    $.ajax({
        url: SITE_URL+"card/checkOtherCard",
        data: {
            phoneNumber: $("#phoneNumber").val()
        },
        async: false,
        type: "POST",
        success: function (response) {
            data=JSON.parse(response);
            if(data.responsecode==true){
                isSuccess = true; 
                $('#companyName_div').show();
            }else{
                isSuccess = false;
            }
            $("#old_created").html(data.html);
        }
    });
    return isSuccess;
}, "Sorry, this User name is already exist.");

$.validator.addMethod("pwcheck", function (value) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(value) // has a digit
}, 'Password between 8 and 20 characters; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace.');
