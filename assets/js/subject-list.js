$(document).ready(function () {
    $.ajax({
        type: 'GET',
        accepts: 'application/json',
        contentType: 'application/json',
        url: API_SubjectsIndex,
        headers: {
            "Authorization": Cookies.get("token"),
        },
        success: function (result) {
            var content = "";
            for (var i in result){
                content += "<tr>";
                content += "<td>" + result[i].name + "</td>";
                content += "<td><a href='#'> Edit </a>";
                content += "<a href='#'> Details </a>";
                content += "<a href='#'> Delete </a>";
                content += "</td>";
                content += "</tr>";
            }
            $("#listSubjects").html(content);
            console.log(result)
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });
});