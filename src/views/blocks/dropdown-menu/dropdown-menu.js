/*
 * jQuery Dropdown: A simple dropdown plugin
 *
 * Contribute: https://github.com/claviska/jquery-dropdown
 *
 * @license: MIT license: http://opensource.org/licenses/MIT
 *
 * MODIFIED BY -ALEX.D 19.07.2018- -ZAO-
 *
 */
if (jQuery) (function ($) {

    $.extend($.fn, {
        jqDropdown: function (method, data) {

            switch (method) {
                case 'show':
                    show(null, $(this));
                    return $(this);
                case 'hide':
                    hide();
                    return $(this);
                case 'attach':
                    return $(this).attr('data-jq-dropdown', data);
                case 'detach':
                    hide();
                    return $(this).removeAttr('data-jq-dropdown');
                case 'disable':
                    return $(this).addClass('dropdown-disabled');
                case 'enable':
                    hide();
                    return $(this).removeClass('dropdown-disabled');
            }
        }
    });

    function show(event, object) {

        var trigger = event ? $(this) : object,
            jqDropdown = $(trigger.attr('data-jq-dropdown')),
            isOpen = trigger.hasClass('dropdown-open');

        // In some cases we don't want to show it
        if (event) {
            if ($(event.target).hasClass('dropdown-ignore')) return;

            event.preventDefault();
            event.stopPropagation();
        } else {
            if (trigger !== object.target && $(object.target).hasClass('dropdown-ignore')) return;
        }
        hide();

        if (isOpen || trigger.hasClass('dropdown-disabled')) return;

        // Show it
        trigger.addClass('dropdown-open');
        jqDropdown
            .slideToggle(200)
            .data('jq-dropdown-trigger', trigger)
            .show();

        // Position it
        position();

        // Trigger the show callback
        jqDropdown
            .trigger('show', {
                jqDropdown: jqDropdown,
                trigger: trigger
            });
    }

    function hide(event) {

        // In some cases we don't hide them
        var targetGroup = event ? $(event.target).parents().addBack() : null;

        // Are we clicking anywhere in a jq-dropdown?
        if (targetGroup && targetGroup.is('.dropdown')) {
            // Is it a jq-dropdown menu?
            if (targetGroup.is('.dropdown-menu')) {
                // Did we click on an option? If so close it.
                if (!targetGroup.is('A')) return;
            } else {
                // Nope, it's a panel. Leave it open.
                return;
            }
        }

        // Hide any jq-dropdown that may be showing
        $(document).find('.dropdown:visible').each(function () {
            var jqDropdown = $(this);
            jqDropdown
                .hide()
                .removeData('jq-dropdown-trigger')
                .trigger('hide', {jqDropdown: jqDropdown});
        });

        // Remove all jq-dropdown-open classes
        $(document).find('.dropdown-open').removeClass('dropdown-open');
    }

    function position() {

        var jqDropdown = $('.dropdown:visible').eq(0),
            trigger = jqDropdown.data('jq-dropdown-trigger'),
            hOffset = trigger ? parseInt(trigger.attr('data-horizontal-offset') || 0, 10) : null,
            vOffset = trigger ? parseInt(trigger.attr('data-vertical-offset') || 0, 10) : null;

        if (jqDropdown.length === 0 || !trigger) return;

        // Position the jq-dropdown relative-to-parent...

        if (jqDropdown.hasClass('dropdown-relative')) {
            console.log('...Position the jq-dropdown relative-to-parent...');
            jqDropdown.css({
                left: jqDropdown.hasClass('dropdown-anchor-right') ?
                    trigger.position().left - (jqDropdown.outerWidth(true) - trigger.outerWidth(true)) - parseInt(trigger.css('margin-right'), 10) + hOffset :
                    trigger.position().left + parseInt(trigger.css('margin-left'), 10) + hOffset,
                top: trigger.position().top + trigger.outerHeight(true) - parseInt(trigger.css('margin-top'), 10) + vOffset
            });
        } else {

            var dropdownBtn = $('.dropdown-open'),
                ava = $('.dropdown-open > .avatar');

            if (ava.length !== 0) dropdownBtn = ava;

            /* OFFSET WITH TRIANGLE POSITION
            20 <- width of trangle
            0.1 = 10% <- right position of trangle on menu
            */

            var hOffset = dropdownBtn.offset().left + (dropdownBtn.width() / 2) - jqDropdown.width() + (jqDropdown.width() * 0.1) + 20;
            var vOffset = dropdownBtn.offset().top + dropdownBtn.outerHeight(true);

            jqDropdown.css({
                left: hOffset,
                top: vOffset
            });
        }
    }

    $(document).on('click.dropdown', '[data-jq-dropdown]', show);
    $(document).scroll('[data-jq-dropdown]', hide);
    $(document).click('[data-jq-dropdown]', hide);
    $(window).on('resize', position);


    /* TIMER CLOSE */

    /*
      var timer;

        $(document).on({
            mouseenter: function(event) {
                clearTimeout(timer);
            },
            mouseleave: function() {
                timer = setTimeout(function() {
                    hide();
                }, 300);
            }
        }, '[data-jq-dropdown]');

        $(document).on({
            mouseenter: function(event) {
                clearTimeout(timer);
            },
            mouseleave: function() {
                timer = setTimeout(function() {
                    hide();
                }, 300);
            }
        }, '.dropdown');*/

})(jQuery);
