(function ($) {

    $(document).ready(function() {

        /* ---------------------------------------------- */
        /*                   DATEPICKER                   */
        /* ---------------------------------------------- */

        $.fn.datepicker.languages['ru-RU'] = {
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            weekStart: 1,
            startView: 0,
            yearFirst: false,
            yearSuffix: ''
        };

        $.fn.datepicker.setDefaults({
            language: 'ru-RU',
            format: 'dd.mm.YYYY',
            autoHide: true,
        });

        var datapickerBtn = $('.js-datepicker-icon'),
            birthdayPicker = $('.text-field__input_birthday').eq(0),
            birthdayPickerOptions = {
                startView: 2,
                date: new Date(1990, 1, 1),
                endDate: '1.1.'+ new Date().getFullYear() - 10,
                startDate: '1.1.1941',
                trigger: datapickerBtn
            }

        birthdayPicker.datepicker('update');
        birthdayPicker.datepicker(birthdayPickerOptions);

        birthdayPicker.on('pick.datepicker', function () {
            $(this).closest('.text-field').addClass('not-empty');
        });

        /* ---------------------------------------------- */
        /*                  PHONE INPUT                   */
        /* ---------------------------------------------- */

        var phoneInput = $('.text-field__input_phone');
            options = {
                onlyCountries: ["ru", "by", "ua", "kz", "il", "md", "kg", "de", "ge", "am", "az", "lt", "lv", "ee", "it", "bg", "th"],
                preferredCountries: ["ru", "ua", "by", "kz"],
                allowDropdown: true
            };

        phoneInput.intlTelInput(options);

        function pnoneValidation() {

            var number = phoneInput.intlTelInput("getNumber");

            if (phoneInput.intlTelInput('isValidNumber')) {
                return true;
            } else {
                return false;
            }
        }

        var parsePhone = function(data) {
            reg = /\D/g;
            var num = data.replace(reg, "");
            return num;
        };

        // ALL FIELD WITH DATA MARK --> NOT-EMPTY

        var parentDOM = document.getElementsByClassName('form_settings')[0];
        var fields = parentDOM.getElementsByClassName('text-field');
            fields = Array.prototype.slice.call(fields);

        var fieldInput = parentDOM.getElementsByClassName('text-field__input');
            fieldInput = Array.prototype.slice.call(fieldInput);

        fieldInput.forEach(function(e) {
            if (e.value) {
                e.closest('.text-field').classList.add('not-empty');
            }
        });

        /* ---------------------------------------------- */
        /*                   VALIDATION                   */
        /* ---------------------------------------------- */

        function validateForm(event) {

            console.log('VALIDATION!');

            var error = false;

            fieldInput.forEach(function(e) {

                var
                    parent = e.closest('.text-field'),
                    errorClass = 'error',
                    successClass = 'success',
                    elementName = e.getAttribute('name');

                if (e.value) {
                    e.closest('.text-field').classList.add('not-empty');
                }

                if (elementName == 'firstName' || elementName == 'lastName') {
                    checkField(!e.value);
                }

                if (elementName == 'birthday') {
                    checkField(!checkdate(e.value));
                }

                if (elementName == "phone") {
                    checkField(!pnoneValidation());
                }

                if (elementName == "email") {
                    checkField(!checkmail(e.value));
                }

                function checkField(b) {
                    if (b) {
                        parent.classList.add(errorClass);
                        error = true;
                    } else {
                        parent.classList.add(successClass);
                        parent.classList.remove(errorClass);
                    }
                }
            });

            if (error) {
                return false;
            } else {
                return true;
            }
        }

        /* FOCUS AND BLUR FIELDS */

        var errorClass = 'error',
            successClass = 'success',
            focusClass = 'focus',
            activeClass = 'active';

        $('.text-field__input').focus(function() {

            var element = $(this),
                elementName = $(this).attr('name'),
                parent = $(this).closest('.text-field');

                parent.removeClass(errorClass);
                parent.addClass(focusClass);
        });

        $('.text-field__input').on('blur', function(e) {

            var element = $(this),
                parent = $(this).closest('.text-field'),
                elementName = $(this).attr("name");

            if (element.val()) {
                parent.addClass('not-empty');
            } else parent.removeClass('not-empty');

            parent.on('click', function (e) {
                if (!$(e.target).hasClass('selected-flag')) {
                    parent.removeClass(focusClass);
                } else element.focus();
            })
        });

        /* ---------------------------------------------- */
        /*                   SUBMIT                       */
        /* ---------------------------------------------- */

        $('.form__fields').submit(function(e) {

            e.preventDefault();

            if (validateForm()) {

                console.log('FORM SENDING');

                var phone = parsePhone($('[name = phone]').val())

                var
                    data_client = {
                        'name'      : $('[name = firstName]').val(),
                        'lastName'  : $('[name = lastName]').val(),
                        'phone'     : phone,
                        'email'     : $('[name = email]').val(),
                        'notify'    : $('[name = notify]').prop('checked'),
                        'sms'         : $('[name = sms]').prop('checked'),
                        'birthday'    : $('[name = birthday]').val(),
                        'speciality'  : $('[name = speciality]').val(),
                        'institution' : $('[name = institution]').val(),
                        'course'      : $('[name = course]').val()
                    };

                console.log(data_client);

                sendData(data_client);

                function sendData(data) {
                    var XHR = new XMLHttpRequest();
                    var FD  = new FormData();

                    for(name in data) {
                        FD.append(name, data[name]);
                    }

                    XHR.addEventListener('load', function(event) {
                        alert('УСПЭХ');
                    });

                    XHR.addEventListener('error', function(event) {
                        alert('ОШИБКА ОТПРАВКИ');
                    });

                    XHR.open('POST', 'https://example.com/cors.php');
                    XHR.send(FD);
                }

                function ajaxError() {

                    openModal('callback-error');

                    $('.js-button').prop("disabled", false);
                    $('.js-wait').hide();
                }

                $('.js-button').prop("disabled", true);
                $('.js-wait').show();
            }

            else console.log('SUBMIT STOPPED');
        });
    });

    /* ---------------------------------------------- */
    /*                Модальные окна                  */
    /* ---------------------------------------------- */

  /*  function openModal(modal) {
        var thisModal = modal;
        $(".js-modal-layer").addClass("active");
        $('.js-modal').each(function() {
            $(this).hide();
            if ($(this).data("modal") == thisModal) {
                $(this).show().animate({
                    opacity: 1
                }, 600);
            }
        });
    }

    function closeModal() {
        $('.js-modal').each(function() {
            $(this).animate({
                opacity: 0
            }, 600, function() {
                $(this).hide();
                $(".js-modal-layer").removeClass("active");
            });
        });
    }

    $('.js-modal-open').click(function(event) {
        var thisModal = $(this).data("modal");
        openModal(thisModal);
        event.preventDefault();
    });

    $('.js-modal-close').click(function(event) {
        closeModal();
        event.preventDefault();
    });

    */

    $("[rel = numeric]").each(function(indx, element) {
        $(element).keydown(function(event) {
            // Разрешаем: backspace, delete, tab и escape, точка, точка numpad
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 190 || event.keyCode == 110 / 46 ||
                // Разрешаем: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // Разрешаем: home, end, влево, вправо
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // Ничего не делаем
                return;
            } else {
                // Обеждаемся, что это цифра, и останавливаем событие keypress
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        });
    });

    $("[rel = phone]").each(function(indx, element) {
        $(element).keydown(function(event) {
            // Разрешаем: space, backspace, delete, tab и escape, numpad -, numpad +,
            if (event.keyCode == 32 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 109 / 109 || event.keyCode == 107 / 107 ||
                //+ =, + = firefox, - _, - _ firefox
                event.keyCode == 187 || event.keyCode == 61 || event.keyCode == 189 || event.keyCode == 173 ||
                // Разрешаем: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // Разрешаем: home, end, влево, вправо
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // Ничего не делаем
                return;
            } else {
                // Обеждаемся, что это цифра, и останавливаем событие keypress
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        });
    });

    checknum = function(value) {
        reg = /^[+]{0,1}[0-9]*$/;
        if (value.match(reg)) {
            return true;
        } else {
            return false;
        }
    };

    checkmail = function(value) {
        reg = /^((([a-z]|[0-9]|!|#|$|%|&|'|\*|\+|-|\/|=|\?|\^|_|`|{|\||}|~)+(\.([a-z]|[0-9]|!|#|$|%|&|'|\*|\+|-|\/|=|\?|\^|_|`|{|\||}|\.|~)+)*)@((((([a-z]|[0-9])([a-z]|[0-9]|-){0,61}([a-z]|[0-9])\.))*([a-z]|[0-9])([a-z]|[0-9]|-){0,61}([a-z]|[0-9])\.)[\w]{2,4}|(((([0-9]){1,3}\.){3}([0-9]){1,3}))|(\[((([0-9]){1,3}\.){3}([0-9]){1,3})])))$/i;
        if (!value.match(reg)) {
            return false;
        } else {
            return true;
        }
    };

    checkdate = function(value) {
        reg = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
        if (!value.match(reg)) {
            return false;
        } else {
            return true;
        }
    };

}(jQuery));