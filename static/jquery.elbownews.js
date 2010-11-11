(function($) {
    $.fn.elbownews = function (options) {
        var defaults = { onClass:  'active', offClass: 'inactive' }
        var options =  $.extend(defaults, options);
        
        var onClass = options.onClass;
        var offClass = options.offClass;

        var keepChanging = true;
        // in seconds
        var changeTimeout = 10;

        // to keep track of the number of links and input elements
        var maxId = 1;
        var curId = 1;

        var setSelectedId = function(oldId, newId) {
            var oldElem = $("#" + oldId);
            var newElem = $("#" + newId);

            $(oldElem).removeClass(onClass);
            $(oldElem).addClass(offClass);

            $(newElem).removeClass(offClass);
            $(newElem).addClass(onClass);

            $(newElem).show();
            $(oldElem).hide();
        };

        var updateMessage = function() {
            if (keepChanging) 
                $("#messages").html("<p>Press any key to <b>STOP</b> news rotation...</p>");
            else
                $("#messages").html("<p>Press any key to <b>START</b> news rotation...</p>");
        };

        var update = function() {
            if (keepChanging) {
                var oldId = curId;

                curId = curId + 1;
                if (curId > maxId)
                    curId = 1;

                setSelectedId(oldId, curId);
                console.log(curId + " " + oldId + " " + maxId);
            }
        };

        function updateMessage() {
            if (keepChanging) 
                $("#messages").html("<p>Press any key to <b>STOP</b> news rotation...</p>");
            else
                $("#messages").html("<p>Press any key to <b>START</b> news rotation...</p>");
        }

        function update() {
            if (keepChanging) {
                var oldId = curId;

                curId = curId + 1;
                if (curId > maxId)
                    curId = 1;

                setSelectedId(oldId, curId);
                console.log(curId + " " + oldId + " " + maxId);
            }
        }

        // main code
        $(".entry").each(function(idx, elem) {
                idx++;

                $(elem).attr('id', idx);

                if (idx === 1)
                    $(elem).addClass(onClass);
                else {
                    $(elem).addClass(offClass);
                    $(elem).hide();
                }

            maxId = idx;
        });

        setInterval(update, 1000 * changeTimeout);

        updateMessage();

        $(document).keydown(function(e) {
            // XXX: right now we do not need to know which key the user decided
            // to press, may be useful in the future
            var key = 0;
            if (e == null)
                key = event.keyCode;
            else
                // mozilla
                key = e.which;

            keepChanging = !keepChanging;

            updateMessage();
        });

        return this;
    }
})(jQuery);
