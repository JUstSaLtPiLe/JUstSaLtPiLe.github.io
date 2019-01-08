$(document).ready(function () {
    $("#userName").text("Welcome " + Cookies.get("loggedUserName"));
    var token = Cookies.get("token");
    var role = Cookies.get("loggedUserRole");
    if(token == null || role == null){
        alert(("You don't have permission to view this page"));
        Cookies.remove('token');
        Cookies.remove("loggedUserRole");
        Cookies.remove("loggedUserName");
        window.location.href = "login.html";
    }
    else if(role.split("#").includes("Employee") == false){
        $(".w3-green").remove();
        $("#editGradeBtn").remove();
        $(".site-sidebar").remove();
    }

    $("#logout").click(function () {
        Cookies.remove('token');
        Cookies.remove("loggedUserRole");
        Cookies.remove("loggedUserName");
        window.location.href = "/Manage_Student_Web/Resources/login.html";
    });



    $("#edit").attr("href", "account-edit.html?studentId=" + window.location.href.split("=")[1]);
    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_StudentDetails,
        headers: {
            "Authorization": Cookies.get("token"),
        },
        data: JSON.stringify(window.location.href.split("=")[1]),
        success: function (result) {
            $("#rollNumber").text(result[0].rollNumber);
            $("#studentName").text(result[0].generalInformation.name);
            $("#studentAddress").text(result[0].generalInformation.address);
            $("#studentDob").text(result[0].generalInformation.dob);
            $("#studentEmail").text(result[0].generalInformation.email);
            $("#studentPhone").text(result[0].generalInformation.phone);
            $("#studentAddress").text(result[0].generalInformation.address);
            if(result[0].generalInformation.gender == 1){
                $("#studentGender").text("Male");
            }
            else if(result[0].generalInformation.gender == 0){
                $("#studentGender").text("Female");
            }
            else {
                $("#studentGender").text("Other");
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });

    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_SubjectsIndex,
        headers: {
            "Authorization": Cookies.get("token"),
        },
        success: function (result) {
            var content = "<option value=\"\" disabled selected>Select Subject</option>\n";
            for (var i in result){
                content += "<option value='" + result[i].subjectId + "'>" + result[i].name + "</option>"
            }
            $("#select-subject-grade").html(content);
            $("#select-subject").html(content);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });

    $(".btn-submit-grade").on('click', function () {
        var grades = [];
        $(".gradeForm").each(function () {
            var formData = {
                'AccountId': window.location.href.split("=")[1],
                'SubjectId': $(this).find('select[name="SubjectId"]').val(),
                'AssignmentGrade': $(this).find('input[name="AssignmentGrade"]').val(),
                'PraticalGrade': $(this).find('input[name="PraticalGrade"]').val(),
                'TheoricalGrade': $(this).find('input[name="TheoricalGrade"]').val(),
            };
            grades.push(formData);
        });
        grades = JSON.stringify(grades);
        console.log(grades);
        if($("#gradeAction").val() == "editGrade"){
            $.ajax({
                accepts: 'application/json',
                contentType: 'application/json',
                type: 'POST',
                headers: {
                    "Authorization": Cookies.get("token"),
                    "Role": Cookies.get("loggedUserRole"),
                },
                url: API_EditGrades,
                data: grades,
                success: function (result, textStatus, jqXHR){
                    if(jqXHR.status == 204){
                        swal("Sinh viên chưa có điểm môn học này");
                    }
                    else {
                        swal("Success");
                    };
                },
                error: function (xhr, textStatus, errorThrown) {
                    if (xhr.status == 409) {
                        alert("Sinh vien da co diem mon hoc nay");
                    }
                }
            });
        }
        else {
            $.ajax({
                accepts: 'application/json',
                contentType: 'application/json',
                type: 'POST',
                headers: {
                    "Authorization": Cookies.get("token"),
                    "Role": Cookies.get("loggedUserRole"),
                },
                url: API_AddGrades,
                data: grades,
                success: function (){
                    swal("Successful");
                },
                error: function (xhr, textStatus, errorThrown) {
                    if (xhr.status == 409) {
                        alert("Sinh vien da co diem mon hoc nay");
                    }
                }
            });
        }
    });

    $('#showList').click(function(){
        $.ajax({
            type: 'POST',
            accepts: 'application/json',
            contentType: 'application/json',
            url: API_GetStudenClazzs,
            headers: {
                "Authorization": Cookies.get("token"),
            },
            data: JSON.stringify(window.location.href.split("=")[1]),
            success: function (result) {
                var content = "<option value=\"\" disabled selected>Select Class</option>\n";
                for (var i in result){
                    content += "<option value='" + result[i].clazzId + "'>" + result[i].clazz.name + "</option>"
                }
                $("#select-class").html(content);
                $("#select-class").show();
            },
            error: function () {
            }
        });
    });

    $("#select-class").on('change' , function () {
        $.ajax({
            type: 'POST',
            accepts: 'application/json',
            contentType: 'application/json',
            url: API_ClazzDetails,
            headers: {
                "Authorization": Cookies.get("token"),
            },
            data: JSON.stringify($(this).val()),
            success: function (result) {
                var content = "";
                for (var i in result.studentClazz){
                    if(result.studentClazz[i].account.status != 0 && result.studentClazz[i].status != 0){
                        content += "<tr>";
                        content += "<td>" + result.studentClazz[i].account.rollNumber + "</td>";
                        content += "<td>" + result.studentClazz[i].account.generalInformation.name + "</td>";
                        content += "<td>" + result.studentClazz[i].account.generalInformation.phone + "</td>";
                        content += "<td>" + result.studentClazz[i].account.generalInformation.email + "</td>";
                        content += "<td>" + result.studentClazz[i].account.status + "</td>";
                        content += "<td><ul>";
                        for(var j in result.studentClazz[i].account.roleAccounts){
                            content += "<li>" + result.studentClazz[i].account.roleAccounts[j].role.name + "</li>";
                        }
                        content += "</ul></td>";
                        content += "<td><a href='account-edit.html?studentId=" + result.studentClazz[i].account.accountId + "'> Edit </a>";
                        content += "<a href='student-detail.html?studentId=" + result.studentClazz[i].account.accountId + "'>" + "Details </a>";
                        content += "<a class='delete-student " + result.studentClazz[i].account.accountId + "'>" + "Delete </a>";
                        content += "<a class='delete-student-from-class " + result.studentClazz[i].account.accountId + "'>" + " Delete From Class </a>";
                        content += "</td>";
                    }
                    $("#studentList").html(content);
                    $("#list_student").show();
                }
            },
            error: function () {
            }
        });
    });

    $("#viewGradeBtn").click(function () {
       $("#select-subject").show();
       $("#gradeAction").val("viewGrade");
    });

    $("#editGradeBtn").click(function () {
        document.getElementById('id01').style.display='block';
        $("#gradeAction").val("editGrade");
    });

    $("#select-subject").on('change' , function (){
        var studentId = [];
        studentId.push($(this).val());
        studentId.push(window.location.href.split("=")[1]);
            $.ajax({
                type: 'POST',
                accepts: 'application/json',
                contentType: 'application/json',
                url: API_GetStudenGrades,
                headers: {
                    "Authorization": Cookies.get("token"),
                },
                data: JSON.stringify(studentId),
                success: function (result, textStatus, jqXHR) {
                    if(jqXHR.status == 204){
                        swal("Sinh viên chưa có điểm môn học này");
                    }
                    else{
                        var content = "";
                        content += "<tr>";
                        content += "<td class='score'>" + result.assignmentGrade + "</td>";
                        content += "<td class='score'>" + result.theoricalGrade + "</td>";
                        content += "<td class='score'>" + result.praticalGrade + "</td>";
                        content += "</tr>";
                        $("#gradeList").html(content);
                        var score = document.getElementsByClassName("score");
                        for (var i = 0 ; i < score.length; i++){
                            score[i].style.fontWeight = "bold";
                            if(score[i].innerHTML < 5){
                                score[i].style.color = "red";
                            }
                            if(score[i].innerHTML >= 5){
                                score[i].style.color = "green";
                            }
                        }
                        $("#gradeTable").show();
                    }
                },
                error: function () {
                }
            });
    });
});