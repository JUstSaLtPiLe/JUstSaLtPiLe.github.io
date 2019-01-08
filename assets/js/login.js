$(".btn-submit").click(function (){
    var formData = {
        "RollNumber" : $("#loginForm").find('input[name="RollNumber"]').val(),
        "Password" : $("#loginForm").find('input[name="Password"]').val()
    };
    console.log(formData);
    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_LOGIN,
        data: JSON.stringify(formData),
        success: function (result, textStatus, jqXHR) {

            if(jqXHR.status == 204){
                swal("Account not exist");
            }
            else {
                Cookies.set("token" , result.credential.accessToken);
                Cookies.set("loggedUserRole" , result.roles);
                Cookies.set("loggedUserName" , result.name);
                if(Cookies.get("loggedUserRole") != null && Cookies.get("loggedUserRole").split("#").includes("Employee") == false){
                    window.location.href = "student-detail.html?studentId=" + $("#loginForm").find('input[name="RollNumber"]').val().replace("b19aptech", "");
                }
                else{
                    window.location.href = "class-list.html";
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401){
                swal("Wrong Password");
            }
        }
    });
});
