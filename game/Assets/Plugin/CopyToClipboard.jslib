mergeInto(LibraryManager.library, {
    CopyToClipboard: function (text) {
        var str = UTF8ToString(text);
        navigator.clipboard.writeText(str).then(function() {
            console.log("Text copied to clipboard: " + str);
        }).catch(function(err) {
            console.error("Could not copy text: ", err);
        });
    }
});
