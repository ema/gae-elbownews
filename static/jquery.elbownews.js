(function($) {
    $.fn.elbownews = function (options) {
        var defaults = { onClass:  'active', offClass: 'inactive' }
        var options =  $.extend(defaults, options);
        
        var onClass = options.onClass;
        var offClass = options.offClass;

        var keepChanging = true;
        // in seconds
        var changeTimeout = 3;

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

        setInterval(update, 1000 * changeTimeout);

        $(document).keydown(function(e) {
            var key = 0;
            if (e == null)
                key = event.keyCode;
            else
                // mozilla
                key = e.which;

            keepChanging = !keepChanging;
        });

        return this;
    }
})(jQuery);
