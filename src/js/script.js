let loginSuccess = sessionStorage.getItem("loginSuccess") || false;

const developer = function () {
    console.log("Project: JS-INCLUDE");
}

const openModalBox = () => {
    $('#sepet').modal('show');
}

const pagelLibrary = () => {
    //library select 2 call
    $(".select2").select2({ allowClear: false });
}

const actionButton = () => {
    $('#action-button .btn').click(function () {
        $('#action-button .btn').removeClass("action-active");
        $(this).addClass("action-active");

        $('#data-table .table-div').removeClass("open");
        $('#data-table #' + $(this).attr("data-id") + '.table-div').addClass("open");
    });
}

const triggerSelect = (select) => {
    $("#" + select).select2("open");
}

const toggleMenu = () => {
    $('#wrapper-contain').toggleClass('open-menu')
}

const login = () => {
    $("#login").on("submit", function (event) {
        event.preventDefault();

        const $inputs = $("#" + $(this).attr("id") + " :input");

        const values = {};
        $inputs.each(function () {
            values[this.name] = $(this).val();
        });

        if (values.username === "admin" && values.password === "admin") {
            loginSuccess = true;

            sessionStorage.setItem("token", "token");
            sessionStorage.setItem("loginSuccess", loginSuccess);
            console.log("login: ", loginSuccess);
            location.replace("page.html");
        }
    });
}

const includeHTML = () => {
    let z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("js-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Bu sayfayı bulamadık!";
                    }
                    elmnt.removeAttribute("js-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            pagelLibrary();
            actionButton();
            return;
        }
    }
};

document.addEventListener("DOMContentLoaded", function () {
    developer();
    login();
    loginSuccess ? includeHTML() : undefined;
})