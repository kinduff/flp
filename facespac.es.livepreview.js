(function ()
    var css = '#fake, #fake video {width: 300px;height: 300px;position: relative;display: inline-block;top: 0;left; 0;margin; 0;overflow: hidden;}';
    css += '#fake video {width: 406px !important;height: 303px !important;position: absolute !important;top: 0 !important;left: 0 !important;margin-left: -50px !important;}';
    css += '#video-wrapper video {display: none;}';
    css += '.onionToggle {position: absolute;left: 0;top: 0;width: 25px;height: 25px;background-color: #3FE0FD;z-index: 20;cursor: pointer;background-image: url(http://toddhpage.com/meatspack/onion.png);background-size: 25px 25px;opacity: 0.3;}';
    css += '.onionImage {position: absolute;opacity: 0.5;z-index: 10;display: none;}';
    css += '.onionEnabled.onionImage {display: block;}';

    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        hasOnion = false;

    style.appendChild(document.createTextNode(css));
    head.appendChild(style);

    var chat = document.getElementById('chat-list');

    function get_time() {
        var c = new Date();
        var h = c.getHours();
        var m = c.getMinutes();
        mi = (m < 10 ? "0" : "") + m;
        var ap = (h < 12) ? "AM" : "PM";
        return (h % 12) + ':' + mi + ' ' + ap;
    }

    function add_fake() {
        var fake_div = document.createElement('li'),
            onionClass = (hasOnion) ? 'onionEnabled' : '';
        fake_div.id = 'fake';
        fake_div.innerHTML = document.getElementById('video-wrapper').innerHTML + "<p>" + $("#composer-message").val() + "</p><time class='timestamp'>" + get_time() + "</time>" + "<div class='onionToggle'></div>" + "<img class='onionImage " + onionClass + "' src="+$('#chat-list li').first().find('img').attr('src')+">";
        chat.insertBefore(fake_div, chat.childNodes[0]);
    }
    function fake_function() {
        var element = document.getElementById("fake");
        element.parentNode.removeChild(element);
        add_fake();
    }
    $("#composer-message").keyup(function () {
        $("#fake p").text($(this).val());
    });
    $('body').on('click', '.onionToggle', function() {
        $('.onionImage').toggleClass('onionEnabled');
        hasOnion = !hasOnion;
    });

    // http://stackoverflow.com/a/8369269
    function HandleDOM_Change() {
        fake_function()
    }
    fireOnDomChange('#chat-list', HandleDOM_Change, 100);
    function fireOnDomChange(selector, actionFunction, delay) {
        $(selector).bind('DOMSubtreeModified', fireOnDelay);

        function fireOnDelay() {
            if (typeof this.Timer == "number") {
                clearTimeout(this.Timer);
            }
            this.Timer = setTimeout(function () {
                    fireActionFunction();
                },
                delay ? delay : 333
            );
        }
        function fireActionFunction() {
            $(selector).unbind('DOMSubtreeModified', fireOnDelay);
            actionFunction();
            $(selector).bind('DOMSubtreeModified', fireOnDelay);
        }
    }
    add_fake();
})();
