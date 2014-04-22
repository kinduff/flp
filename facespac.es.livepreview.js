(function () {
    var css = '#fake, #fake video {';
    css += 'width: 300px;';
    css += 'height: 300px;';
    css += 'position: relative;';
    css += 'display: inline-block;';
    css += 'top: 0;';
    css += 'left; 0;';
    css += 'margin; 0;';
    css += 'overflow: hidden;';
    css += '}';
    css += '#fake video {';
    css += 'width: 406px !important;';
    css += 'height: 303px !important;';
    css += 'position: absolute !important;';
    css += 'top: 0 !important;';
    css += 'left: 0 !important;';
    css += 'margin-left: -50px !important;';
    css += '}';
    css += '#video-wrapper video { display: none; }';
 
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
 
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
        var fake_div = document.createElement('li');
        fake_div.id = 'fake';
        fake_div.innerHTML = document.getElementById('video-wrapper').innerHTML + "<p>" + $("#composer-message").val() + "</p><time class='timestamp'>" + get_time() + "</time>";
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
