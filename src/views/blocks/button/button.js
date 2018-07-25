var closeBtn = document.getElementsByClassName("btn_close");
console.log("worked!");

for (var i = 0; i < closeBtn.length; i++) {

    console.log(closeBtn[1]);


    closeBtn[i].onclick = function () {
        console.log("click");

        var parent = this.parentElement;

        parent.style.position = "absolute";
        parent.style.left = "-10000";
        parent.style.opacity = "0";

        setTimeout(function () {
            parent.style.display = "none";
        }, 300);
    }
}