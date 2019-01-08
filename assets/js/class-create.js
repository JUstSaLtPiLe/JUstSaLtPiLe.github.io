$(".btn-submit").click(function (){
    var formData = {
        "Name" : $("#createClassForm").find('input[name="Name"]').val(),
        "Teacher" : $("#createClassForm").find('input[name="Teacher"]').val(),
        "Status" : $("#createClassForm").find('input[name="Status"]').val(),
    };
    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_CreateClazz,
        headers: {
            "Authorization": Cookies.get("token"),
            "Role": Cookies.get("loggedUserRole"),
        },
        data: JSON.stringify(formData),
        success: function (result) {
            swal("Create New Class Successful");
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });
});
