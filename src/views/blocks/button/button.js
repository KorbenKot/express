var closeBtn = document.getElementsByClassName("btn_close");

for (var i = 0; i < closeBtn.length; i++) {

    closeBtn[i].addEventListener('click', function () {
        console.log("click");

        var parent = this.parentElement;

        parent.style.position = "absolute";
        parent.style.left = "-10000";
        parent.style.opacity = "0";

        setTimeout(function () {
            parent.hidden = true;
        }, 300);
    })
}