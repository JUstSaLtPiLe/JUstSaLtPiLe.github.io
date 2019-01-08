var API_LOGIN = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/Login";
var API_AccountsIndex = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/AccountsIndex";
var API_ClazzsIndex = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/ClazzsIndex";
var API_SubjectsIndex = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/SubjectsIndex";
var API_CreateAccount = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/CreateAccount";
var API_CreateClazz = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/CreateClazz";
var API_CreateSubject = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/CreateSubject";
var API_ClazzDetails = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/ClazzDetails";
var API_StudentDetails = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/StudentDetails";
var API_EditAccount = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/EditAccount";
var API_AddSubjects = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/AddSubjects";
var API_AddStudents = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/AddStudents";
var API_AddGrades = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/AddGrades";
var API_DeleteClazz = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/DeleteClazz";
var API_DeleteStudentFromClazz = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/DeleteStudentFromClazz";
var API_DeleteSubject = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/DeleteSubject";
var API_DeleteSubjectFromClazz = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/DeleteSubjectFromClazz";
var API_DeleteAccount = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/DeleteAccount";
var API_GetStudenClazzs = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/GetStudenClazzs";
var API_EditGrades = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/EditGrades";
var API_EditClazz = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/EditClazz";
var API_GetStudenGrades = "https://studentresourcesapi.azurewebsites.net/api/StudentResourcesAPI/GetStudenGrades";

$(document).on('click', '.delete-student' ,function(){
    if(confirm("Delete this Student?")){
        var accountId = $(this).attr("class").split(' ')[1];
        $.ajax({
            accepts: 'application/json',
            contentType: 'application/json',
            type: 'POST',
            headers: {
                "Authorization": Cookies.get("token"),
                "Role": Cookies.get("loggedUserRole"),
            },
            url: API_DeleteAccount,
            data: JSON.stringify(accountId),
            success: function (result) {
                alert("Deleted");
                window.location.reload();

            },
            error: function (xhr, textStatus, errorThrown) {
            }
        });
    }
});

$(document).on('click', '.delete-student-from-class' ,function(){
    if(confirm("Delete this Student From Class?")){
        var studentClazz = {
            "AccountId" : $(this).attr("class").split(' ')[1],
            "ClazzId" : window.location.href.split("=")[1],
        };
        $.ajax({
            accepts: 'application/json',
            contentType: 'application/json',
            type: 'POST',
            headers: {
                "Authorization": Cookies.get("token"),
                "Role": Cookies.get("loggedUserRole"),
            },
            url: API_DeleteStudentFromClazz,
            data: JSON.stringify(studentClazz),
            success: function (result) {
                alert("Deleted Student From Class");
                window.location.reload();
            },
            error: function (xhr, textStatus, errorThrown) {
            }
        });
    }
});

$(document).on('click', '.delete-subject' ,function(){
    if(confirm("Delete this Subject?")){
        var subjectId = $(this).attr("class").split(' ')[1];
        $.ajax({
            accepts: 'application/json',
            contentType: 'application/json',
            type: 'POST',
            headers: {
                "Authorization": Cookies.get("token"),
                "Role": Cookies.get("loggedUserRole"),
            },
            url: API_DeleteSubject,
            data: JSON.stringify(subjectId),
            success: function (result) {
                alert("Deleted");
                window.location.reload();
            },
            error: function (xhr, textStatus, errorThrown) {
            }
        });
    }
});

$(document).on('click', '.delete-subject-from-class' ,function(){
    if(confirm("Delete this Subject From Class?")){
        var clazzSubject = {
            "SubjectId" : $(this).attr("class").split(' ')[1],
            "ClazzId" : window.location.href.split("=")[1],
        };
        $.ajax({
            accepts: 'application/json',
            contentType: 'application/json',
            type: 'POST',
            headers: {
                "Authorization": Cookies.get("token"),
                "Role": Cookies.get("loggedUserRole"),
            },
            url: API_DeleteSubjectFromClazz,
            data: JSON.stringify(clazzSubject),
            success: function (result) {
                alert("Deleted Subject From Class");
                window.location.reload();
            },
            error: function (xhr, textStatus, errorThrown) {
            }
        });
    }
});