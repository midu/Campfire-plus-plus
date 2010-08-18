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
        add_default_highlight = function () {
            if (chat) {
                $('words-to-highlight').value = chat.username;
                set_highlight_words();
            }
        },
        set_highlight_words = function () {
          highlight_words = $('words-to-highlight').value.split(' ');
          set_regexp();
        },
        highlight_config = function () {
            var html = '<div class="participants">\
              <div>\
                <h3>Highlight (cfpp)</h3>\
              </div>\
              <div id="participants">\
                <ul class="participant-list">\
                    <li class="user nubbin_region">\
                        <span class="name">Hightlight words</span>\
                    </li>\
                    <li class="user nubbin_region">\
                        <input type="text" id="words-to-highlight" />\
                    </li>\
              </ul>\
              </div>\
            </div>';
            
            $('participants').insert({"after": html});
            add_default_highlight();

            $('words-to-highlight').observe('blur', function (e) {
                set_highlight_words();
            });
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
        set_regexp = function () {
            regexp = new RegExp("(" + highlight_words.join('|') + ")", "gim");
        },
        highlight_words = [],
        regexp = null;

    set_regexp();
    add_styles();
    highlight_config();

    if (typeof chat.events.messagesInserted != "undefined") {
        chat.events.messagesInserted.push(messages_inserted);
    } else {
        chat.events.messagesInserted = [messages_inserted]
    }  
})();
