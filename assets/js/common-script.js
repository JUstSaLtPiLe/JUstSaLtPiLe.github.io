$(document).ready(function () {
    $("#userName").text("Welcome " + Cookies.get("loggedUserName"));
    var token = Cookies.get("token");
    var role = Cookies.get("loggedUserRole");
    if(token == null || role == null || role.split("#").includes("Employee") == false){
        alert(("You don't have permission to view this page"));
        Cookies.remove('token');
        Cookies.remove("loggedUserRole");
        Cookies.remove("loggedUserName");
        window.location.href = "login.html";
    }

    $("#logout").click(function () {
        Cookies.remove('token');
        Cookies.remove("loggedUserRole");
        Cookies.remove("loggedUserName");
        window.location.href = "/Manage_Student_Web/Resources/login.html";
    });
});