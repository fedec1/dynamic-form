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
    codeBlock.scrollTop = textarea1.scrollTop;
    codeBlock.scrollLeft = textarea1.scrollLeft;
});

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