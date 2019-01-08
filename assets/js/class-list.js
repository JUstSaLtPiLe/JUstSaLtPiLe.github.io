$(document).ready(function () {
    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_ClazzsIndex,
        headers: {
            "Authorization": Cookies.get("token"),
        },
        success: function (result) {
            var content = "";
            for (var i in result){
                content += "<tr>";
                content += "<td>" + result[i].name + "</td>";
                content += "<td>" + result[i].teacher + "</td>";
                content += "<td>" + result[i].createdAt + "</td>";
                content += "<td>" + result[i].updateAt + "</td>";
                content += "<td>" + result[i].status + "</td>";
                content += "<td><a href='class-edit.html?classId=" + result[i].clazzId + "'> Edit </a>";
                content += "<a href='class-detail.html?classId=" + result[i].clazzId + "'>" + "Details </a>";
                content += "<a class='delete-class " + result[i].clazzId + "'>" + "Delete </a>";
            }
            $("#classList").html(content);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });

    $(document).on('click', '.delete-class' ,function(){
        if(confirm("Delete this class?")){
            var classId = $(this).attr("class").split(' ')[1];
            $.ajax({
                accepts: 'application/json',
                contentType: 'application/json',
                type: 'POST',
                headers: {
                    "Authorization": Cookies.get("token"),
                    "Role": Cookies.get("loggedUserRole"),
                },
                url: API_DeleteClazz,
                data: JSON.stringify(classId),
                success: function (result) {
                    alert("Deleted!");
                    window.location.reload();
                },
                error: function (xhr, textStatus, errorThrown) {
                }
            });
        }
    });
});

