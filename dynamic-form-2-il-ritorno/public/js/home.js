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