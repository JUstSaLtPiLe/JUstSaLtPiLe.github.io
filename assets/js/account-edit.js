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
            $("#editForm").find('input[name="Phone"]').val(result[0].generalInformation.phone);
            $("#editForm").find('input[name="Email"]').val(result[0].generalInformation.email);
            $("#editForm").find('input[name="Address"]').val(result[0].generalInformation.address);
            $("#editForm").find('input[type="checkbox"]').each(function () {
                for(var i in result[0].roleAccounts){
                    if(result[0].roleAccounts[i].roleId == $(this).val()){
                        $(this).prop('checked', true);
                    }
                }
            });
            $("#editForm").find('input[type="radio"]').each(function () {
                if(result[0].status == $(this).val()){
                    $(this).prop('checked', true);
                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });

    $(".btn-submit").click(function (){
        var roleIds = [];
        $.each($("#editForm").find('input[name="roleIds[]"]:checked'), function () {
            roleIds.push($(this).val());
        });
        var formData = {
            "Phone" : $("#editForm").find('input[name="Phone"]').val(),
            "Email" : $("#editForm").find('input[name="Email"]').val(),
            "Address" : $("#editForm").find('input[name="Address"]').val(),
        };
        var password = $("#editForm").find('input[name="Password"]').val();
        var status = $("#editForm").find('input[name="Status"]:checked').val();
        var accountId = window.location.href.split("=")[1];
        if(roleIds.length <= 0){
            swal("Phải chọn ít nhất 1 role");
        }
        else{
            $.ajax({
                type: 'POST',
                accepts: 'application/json',
                contentType: 'application/json',
                url: API_EditAccount,
                headers: {
                    "Authorization": Cookies.get("token"),
                },
                data: JSON.stringify({
                    generalInformation: formData,
                    roleIds : roleIds,
                    password: password,
                    accountId: accountId,
                    status: status,
                }),
                success: function (result) {
                    console.log(result);
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert("error");
                }
            });
        }
    });
});