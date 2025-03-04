// source code per il syntax highlighting : 
// https://www.codeproject.com/Articles/5361561/Syntax-Highlightning-for-Textarea-HTML

tArea = document.getElementById('jsonForm')
preCode = document.getElementById('showCode')
example = document.getElementById('example')

function highlightJS() {
    document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
    })  
}

function updateCode() {
                 
    let content = tArea.value;

    preCode.innerHTML = content;
    delete preCode.dataset.highlighted
    highlightJS();

}

tArea.addEventListener("input", () => {
    updateCode();
})

tArea.addEventListener("scroll", () => {
    preCode.scrollTop = textarea1.scrollTop;
    preCode.scrollLeft = textarea1.scrollLeft;
});

tArea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        let cursorPos = tArea.selectionStart;
        let prevLine = tArea.value.substring(0, cursorPos).split('\n').slice(-1)[0];
        let indent = prevLine.match(/^\s*/)[0];
        tArea.setRangeText('\n' + indent, cursorPos, cursorPos, 'end');
        updateCode();
        return;
    }
});

tArea.addEventListener('keydown', function (e) {

    if (e.key === "Tab" && !e.shiftKey &&
        tArea.selectionStart == tArea.selectionEnd) {
        e.preventDefault();
        let cursorPosition = tArea.selectionStart;
        let newValue = tArea.value.substring(0, cursorPosition) + "    " +
        tArea.value.substring(cursorPosition);
        tArea.value = newValue;
        tArea.selectionStart = cursorPosition + 4;
        tArea.selectionEnd = cursorPosition + 4;   
        updateCode();
        return;
    }
});


tArea.addEventListener('keydown', function (e) {

if (e.key === "Tab" && e.shiftKey &&

    tArea.selectionStart == tArea.selectionEnd) {
    e.preventDefault();
    let cursorPosition = tArea.selectionStart;
    let leadingSpaces = 0;
    for (let i = 0; i < 4; i++) {
        if (tArea.value[cursorPosition - i - 1] === " ") {
            leadingSpaces++;
        } else {
            break;
        }
    }

    if (leadingSpaces > 0) {
        let newValue = tArea.value.substring(0, cursorPosition - leadingSpaces) +
        tArea.value.substring(cursorPosition);
        tArea.value = newValue;
        tArea.selectionStart = cursorPosition - leadingSpaces;
        tArea.selectionEnd = cursorPosition - leadingSpaces;
    }


    updateCode();
    return;
}

})



document.addEventListener("DOMContentLoaded", function () {
    fetch('./fetchJsonFiles').then(response => response.json()).then(files => {
        console.log(files)
        const selezione = document.getElementById('selezionaFile')
        files.forEach(file => {
            console.log(file)
            const option = document.createElement('option');
            option.value = file;
            option.textContent = file;
            selezione.appendChild(option);
        });
    })
})

hljs.highlightElement(example)