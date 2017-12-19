$( document ).ready(function() {
    $(window).resize(function() {
        handleResize();
    });


    var triggerMobileVersion =  $(window).width() > 1000 ? true : false;

    $content_datepicker =  $('.content__datepicker');
    $input_checkIn      =  $('.datepicker.check-in');
    $input_checkOut     =  $('.datepicker.check-out');
    $checkOutWeekday    =  $('#checkOutWeekday');
    $checkInWeekday     =  $('#checkInWeekday');

    //MOBILE VERSION
    $date_in        = $('.content__selectors-cell.check-in .big');
    $month_short_in = $('.content__selectors-cell.check-in .month');
    $day_short_in   = $('.content__selectors-cell.check-in .day');

    $date_out        = $('.content__selectors-cell.check-out .big');
    $month_short_out = $('.content__selectors-cell.check-out .month');
    $day_short_out   = $('.content__selectors-cell.check-out .day');

    var kids_template = '<div class="kids_age-list-item">\n' +
        '                                        <select class="counter-field_num kids">\n' +
        '                                            <option value="0"><1</option>\n' +
        '                                            <option value="1">1</option>\n' +
        '                                            <option value="2">2</option>\n' +
        '                                            <option value="3">3</option>\n' +
        '                                            <option value="4">4</option>\n' +
        '                                            <option value="5">5</option>\n' +
        '                                            <option value="6">6</option>\n' +
        '                                            <option value="7">7</option>\n' +
        '                                            <option value="8">8</option>\n' +
        '                                            <option value="9">9</option>\n' +
        '                                            <option value="10">10</option>\n' +
        '                                            <option value="11">11</option>\n' +
        '                                            <option value="12">12</option>\n' +
        '                                            <option value="13">13</option>\n' +
        '                                            <option value="14">14</option>\n' +
        '                                            <option value="15">15</option>\n' +
        '                                            <option value="16">16</option>\n' +
        '                                            <option value="17">17</option>\n' +
        '                                        </select>\n' +
        '                                    </div>';

    function setDate(startDate, endDate) {
        if(triggerMobileVersion) {
            $date_in.text($.datepicker.formatDate('dd', startDate));
            $month_short_in.text($.datepicker.formatDate('M', startDate));
            $day_short_in.text($.datepicker.formatDate('D', startDate));

            $date_out.text($.datepicker.formatDate('dd', endDate));
            $month_short_out.text($.datepicker.formatDate('M', endDate));
            $day_short_out.text($.datepicker.formatDate('D', endDate));
        } else {
            $checkInWeekday.text($.datepicker.formatDate('DD', startDate));
            $checkOutWeekday.text($.datepicker.formatDate('DD', endDate));
        }
        $input_checkIn.val($.datepicker.formatDate('dd M yy', startDate));
        $input_checkOut.val($.datepicker.formatDate('dd M yy', endDate));

    }

    function calcDiff(startDate, endDate) {
        var diff  = Math.floor((endDate.getTime() - startDate.getTime()) / 86400000); // ms per day

        $('.separate span').text(diff);
    }

    function handleResize() {
        if($( window ).width() > 1000 && triggerMobileVersion) {
            triggerMobileVersion = false;
            console.log('reinitializing to big');
            $content_datepicker.removeClass('hasDatepicker').empty();

            $content_datepicker.datepicker({
                range: 'period',
                numberOfMonths: 2,
                onSelect: function(dateText, inst, extensionRange) {
                    setDate(extensionRange.startDate, extensionRange.endDate);
                    calcDiff(extensionRange.startDate, extensionRange.endDate);
                }
            });
        } else if($(window).width() <  1000 && !triggerMobileVersion) {
            triggerMobileVersion = true;
            console.log('reinitializing to small');
            $content_datepicker.removeClass('hasDatepicker').empty();

            $content_datepicker.datepicker({
                range: 'period',
                numberOfMonths: 1,
                onSelect: function(dateText, inst, extensionRange) {
                    setDate(extensionRange.startDate, extensionRange.endDate);
                    calcDiff(extensionRange.startDate, extensionRange.endDate);
                }
            });
        }

        $content_datepicker.datepicker('setDate', ['+4d', '+8d']);
        var extensionRange = $content_datepicker.datepicker('widget').data('datepickerExtensionRange');
        setDate(extensionRange.startDate, extensionRange.endDate);
        calcDiff(extensionRange.startDate, extensionRange.endDate);
    }

    function kidsInputHandler(kids_amount, operation) {
        var current_kids_inputs = $('.kids_age-list-item').length;
        if(operation == 'add') {
            for(var i = 0; i < kids_amount - current_kids_inputs; i++ ) {
                $('.kids_age-list').append(kids_template);
            }
        } else {
            for(var i = 0; i < current_kids_inputs - kids_amount; i++ ) {
                $('.kids_age-list-item').last().remove();
            }
        }
    }

    handleResize();


    $selected_rooms  = $('.counter-fields[data-targ="room"] .counter-field_num');
    $selected_adults = $('.counter-fields[data-targ="adults"] .counter-field_num');
    $selected_kids   = $('.counter-fields[data-targ="kids"] .counter-field_num');

    $kids_frame      = $('.kids_age');

    var dictionary = {
        room: {
            1: 'номер, ',
            2: 'номер(-ов), '
        },
        adults: {
            1: 'взрослый, ',
            2: 'взрослых'
        },
        kids: {
            0: 'детей',
            1: 'ребёнок',
            2: 'детей'
        }
    };


    $(".сell-results").on('click', function () {
        $(".content__persons_frame").toggleClass('active');
    });

    $('.content__selectors-date').on('click', function () {
        $('.content__datepicker').toggleClass('inactive');
    });

    $(".counter-field").on('click', function (e) {
        e.preventDefault();
        var $fieldset =  $(this).parent();
        var $fieldset_num = $fieldset.find('.counter-field_num');
        var current_class='';
        var current_num = $fieldset_num.text();
        var target = $fieldset.data("targ");

        if($(this).hasClass('remove')) {
            current_class = 'remove';
            if(target=="kids" && current_num != 0) {
                $fieldset_num.text(current_num - 1);
                if($fieldset_num.text() == 0) {
                    $(this).addClass('inactive');
                }

            } else if(target!="kids" && current_num != 1) {
                $fieldset_num.text(current_num - 1);
                if($fieldset_num.text() == 1) {
                    $(this).addClass('inactive');
                }
            }

            $('.cell-results.'+target+'').text( $fieldset_num.text() + ' ' + ( $fieldset_num.text() != 1 ? dictionary[target][2] : dictionary[target][ $fieldset_num.text()]));
            $fieldset.find('.counter-field.add').removeClass('inactive')
        }

        if($(this).hasClass('add') && current_num != 9){
            current_class = 'add';

            $fieldset_num.text(Number(current_num) + 1);
           if( $fieldset_num.text() == 9) {
               $(this).addClass('inactive');
           }


            $('.cell-results.'+target+'').text( $fieldset_num.text() + ' ' + ( $fieldset_num.text() != 1 ? dictionary[target][2] : dictionary[target][ $fieldset_num.text()]));
            $fieldset.find('.counter-field.remove').removeClass('inactive')
        }

        if(target == "kids") {
            kidsInputHandler($fieldset_num.text(), current_class);
        }

        if($selected_kids.text() != 0) {
            $kids_frame.removeClass('inactive');
        } else {
            $kids_frame.addClass('inactive');
        }
    });

    $('.content__selectors-button').on('click', function() {
        var data = {
            data : {
                rooms: $selected_rooms.text(),
                adults: $selected_adults.text(),
                kids: {
                    amount: $selected_kids.text(),
                    ages: []
                },
                check_in_date:  $input_checkIn.val(),
                check_out_date: $input_checkOut.val()
            }
        };

        if(data.data.kids.amount) {
            $('.kids_age-list-item option:selected').map(function () {
                data.data.kids.ages.push(this.value)
            });
            console.log(data);
        }

        $.ajax({
            type: 'POST',
            url: 'test_ajax.php',
            data: data,
            success: function(data){
                $('.content-description').html(data);
            }
        });
    })
});
