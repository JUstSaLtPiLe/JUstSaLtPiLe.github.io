$(document).ready(function () {
    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_ClazzDetails,
        headers: {
            "Authorization": Cookies.get("token"),
        },
        data: JSON.stringify(window.location.href.split("=")[1]),
        success: function (result) {
            $("#editClassForm").find('input[name="Name"]').val(result.clazz.name);
            $("#editClassForm").find('input[name="Teacher"]').val(result.clazz.teacher);
            $("#editClassForm").find('input[type="radio"]').each(function () {
                if(result.clazz.status == $(this).val()){
                    $(this).prop('checked', true);
                }
            });
            console.log(result.clazz.status)
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });

    $(".btn-submit").click(function (){
        var formData = {
            "Name" : $("#editClassForm").find('input[name="Name"]').val(),
            "Teacher" : $("#editClassForm").find('input[name="Teacher"]').val(),
            "Status" : $("#editClassForm").find('input[name="Status"]:checked').val(),
            "ClazzId" : window.location.href.split("=")[1],
        };
            $.ajax({
                type: 'POST',
                accepts: 'application/json',
                contentType: 'application/json',
                url: API_EditClazz,
                headers: {
                    "Authorization": Cookies.get("token"),
                    "Role": Cookies.get("loggedUserRole")
                },
                data: JSON.stringify(formData),
                success: function (result) {
                    swal("Success")
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert("error");
                }
            });
    });
});