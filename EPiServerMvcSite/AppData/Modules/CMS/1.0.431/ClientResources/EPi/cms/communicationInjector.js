(function() {
    if (top !== self && top.require) {
        top.require(['dojo/_base/lang', 'dojo/topic'], function(lang, topic) {
            lang.setObject('epi.publish',
                function(m, p) {
                    topic.publish(m, p);
                }, window.self);
        });
    }
})();