(function() {
    var users = [],
        room = location.pathname.split('/').last(), // last() is from prototype
        add_styles = function() {
            var head = document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                rules = document.createTextNode('.cfpp-hl{ display:inline-block; border: 1px solid red; font-weight: bold; }');

            style.type = 'text/css';
            if(style.styleSheet)
                style.styleSheet.cssText = rules.nodeValue;
            else style.appendChild(rules);
            head.appendChild(style);  
        },
        highlight = function(message) {
            var txt = message.bodyCell.children[0].innerHTML;
            message.bodyCell.children[0].innerHTML = txt.replace(regexp, "<span class=\"cfpp-hl\">$1</span>");
        },
        messages_inserted = function(messages) {
            var i = 0;
            messages.each(function(message) {
                highlight(message);
            })
        },
        highlight_words = [
            'midu',
            'stefano',
            'ballabeni'
        ],
        regexp = new RegExp("(" + highlight_words.join('|') + ")", "gim");

    add_styles();

    if (typeof chat.events.messagesInserted != "undefined") {
        chat.events.messagesInserted.push(messages_inserted);
    } else {
        chat.events.messagesInserted = [messages_inserted]
    }  
})();
