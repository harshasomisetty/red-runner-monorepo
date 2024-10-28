/*
 * Copyright 2020, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var WebGLCopyAndPaste = {
  $WebGLCopyAndPaste: {
    data: null,
  },

  initWebGLCopyAndPaste: function (cutCopyCallback, pasteCallback) {
    WebGLCopyAndPaste.data = {
      initialized: false,
      cutCopyFunc: cutCopyCallback,
      pasteFunc: pasteCallback,
    };

    if (!WebGLCopyAndPaste.data.initialized) {
      window.addEventListener('copy', function (e) {
        e.preventDefault();
        if (WebGLCopyAndPaste.data.clipboardStr) {
          e.clipboardData.setData(
            'text/plain',
            WebGLCopyAndPaste.data.clipboardStr,
          );
          console.log(
            'Copy event handled, text:',
            WebGLCopyAndPaste.data.clipboardStr,
          );
        }
      });
    }
    WebGLCopyAndPaste.data.initialized = true;
  },

  passCopyToBrowser: function (stringPtr) {
    var str = UTF8ToString(stringPtr);
    console.log('Attempting to copy:', str);

    // Store the string
    WebGLCopyAndPaste.data.clipboardStr = str;

    // Create and configure a temporary element
    var tempInput = document.createElement('textarea');
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    tempInput.style.top = '0';
    tempInput.style.left = '0';
    tempInput.value = str;

    // Add to DOM
    document.body.appendChild(tempInput);

    // Select the text
    tempInput.focus();
    tempInput.select();

    try {
      // Try the copy command
      var successful = document.execCommand('copy');
      console.log(successful ? 'Copy successful' : 'Copy unsuccessful');

      // If execCommand failed, try clipboard API
      if (!successful && navigator.clipboard) {
        navigator.clipboard
          .writeText(str)
          .then(function () {
            console.log('Clipboard API: Copy successful');
          })
          .catch(function (err) {
            console.error('Clipboard API failed:', err);
          });
      }
    } catch (err) {
      console.error('Copy failed:', err);
    }

    // Cleanup
    document.body.removeChild(tempInput);
  },
};

autoAddDeps(WebGLCopyAndPaste, '$WebGLCopyAndPaste');
mergeInto(LibraryManager.library, WebGLCopyAndPaste);
