mergeInto(LibraryManager.library, {
  CopyToClipboard: function (text) {
    var str = UTF8ToString(text);

    // Create a temporary input element
    var tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-1000px';
    tempInput.value = str;

    // Add to the document
    document.body.appendChild(tempInput);

    // Select the text
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    try {
      // Execute copy command
      var successful = document.execCommand('copy');
      if (successful) {
        console.log('Text successfully copied to clipboard');
      } else {
        console.warn('Unable to copy text to clipboard');
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    // Clean up
    document.body.removeChild(tempInput);
  },
});
