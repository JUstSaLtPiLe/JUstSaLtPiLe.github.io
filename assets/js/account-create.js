$(document).ready(function () {
    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_CreateAccount,
        headers: {
            "Authorization": Cookies.get("token"),
            "Role": Cookies.get("loggedUserRole")
        },
        success: function (result) {
            var content = "";
            for(var i in result){
                content += "<div class='checkbox'>";
                content += "<label>";
                content += "<input type='checkbox' name='roleIds[]' value='" + result[i].roleId + "'>";
                content += "<span class='label-text'>" + result[i].name + "</span>";
                content += "<label>";
                content += "</div>";
            }
            $("#roleCheckboxes").html(content);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });
});

$(".btn-submit").click(function (){
    var roleIds = [];
    $.each($("#accountCreateForm").find('input[name="roleIds[]"]:checked'), function () {
       roleIds.push($(this).val());
    });
    var formData = {
        "Name" : $("#accountCreateForm").find('input[name="Name"]').val(),
        "Gender" : $("#accountCreateForm").find('input[name="Gender"]').val(),
        "Dob" : $("#accountCreateForm").find('input[name="Dob"]').val(),
        "Phone" : $("#accountCreateForm").find('input[name="Phone"]').val(),
        "Email" : $("#accountCreateForm").find('input[name="Email"]').val(),
        "Address" : $("#accountCreateForm").find('input[name="Address"]').val(),
    };
    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_CreateAccount,
        traditional: true,
        headers: {
            "Authorization": Cookies.get("token"),
            "Role": Cookies.get("loggedUserRole"),
        },
        data: JSON.stringify({
            generalInformation: formData,
            roleIds : roleIds
        }),
        success: function (result) {
            swal("Create New Account Successful");
            console.log(result);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });
});
