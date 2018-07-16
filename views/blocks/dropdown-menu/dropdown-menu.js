/*
showMenu = function () {
    console.log($(this));
    setTimeout(function () {
        $(this).fadeIn();
    }, 1000);
};

*/

function showMenu(elt) {
    elt.fadeIn();
}

function hideMenu(elt) {
    elt.fadeOut();
}

var
    msgIcon = $('.js-msg-icon'),
    menu = $('.js-msg-menu');

msgIcon.click(function () {
    menu.fadeToggle();
});
