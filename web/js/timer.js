$(function(){
    function timer(settings){
        var config = {
            endDate: '2017-08-21 15:46',
            timeZone: 'America/Los_Angeles',
            hours: $('#hours'),
            minutes: $('#minutes'),
            seconds: $('#seconds'),
        };
        function prependZero(number){
            return number < 10 ? '0' + number : number;
        }
        $.extend(true, config, settings || {});
        var currentTime = moment();
        var endDate = moment.tz(config.endDate, config.timeZone);
        var diffTime = endDate.valueOf() - currentTime.valueOf();
        var duration = moment.duration(diffTime, 'milliseconds');
        var months = duration.months();
        var days = duration.days();
        var interval = 1000;
        var subMessage = $('.sub-message');
        var clock = $('.clock');
        if(diffTime < 0){
            endEvent(subMessage, config.newSubMessage, clock);
            return;
        }
        $('#months').text(prependZero(months));
        if(days > 0){
            $('#days').text(prependZero(days));
            $('.days').css('display', 'inline-block');
        }
        var intervalID = setInterval(function(){
            duration = moment.duration(duration - interval, 'milliseconds');
            var hours = duration.hours(),
                minutes = duration.minutes(),
                seconds = duration.seconds();
            days = duration.days();
            if(hours  <= 0 && minutes <= 0 && seconds  <= 0 && days <= 0){
                clearInterval(intervalID);
                endEvent(subMessage, config.newSubMessage, clock);
                window.location.reload();
            }
            if(days === 0){r 
                $('.days').hide();
            }
            $('#days').text(prependZero(days));
            config.hours.text(prependZero(hours));
            config.minutes.text(prependZero(minutes));
            config.seconds.text(prependZero(seconds));
        }, interval);
    }
    function endEvent($el, newText, hideEl){
        $el.text(newText);
        hideEl.hide();
    }
    timer();
});
