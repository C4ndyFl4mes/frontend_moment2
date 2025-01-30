const searchINPUT = document.getElementById("search"); // Deklarerar sökfältets element.
const table = document.getElementById("table-body");   // Deklarerar tabellkroppens element.

// En funktion som startar vid inladdning av sidan. Dens primära uppgift är att anropa funktionerna getData och renderTableContent. 
window.onload = async () => {
    try {
        const data = await getData(); // <------------------------- Väntar på att data ska returneras.
        // console.table(data);
        // Lägger till en input lyssnare på sökfältet. Filtrerar utefter vad textsträngarna innehåller.
        searchINPUT.addEventListener("input", () => {
            const phrase = searchINPUT.value;
            const filteredData = data.filter(fd => fd.code.toLowerCase().includes(phrase.toLowerCase()) || fd.coursename.toLowerCase().includes(phrase.toLowerCase()));
            // Ifall sökrutan blir tom ska alla tabellrader synas.
            if (phrase === "") {
                renderTableContent(data);
            } else {
                renderTableContent(filteredData);
            }
        });
        renderTableContent(data); // Renderar ut vid första inladdningen av sidan.
    } catch (error) {
        console.error(error);
    }
}

// Hämtar data från extern json-fil.
async function getData() {
    try {
        const resp = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json"); // Hämtar.
        return await resp.json(); // Väntar på response och konverterar JSON till en JS array av objekt och därefter returnerar.

    } catch (error) {
        console.error(error);
    }

}

// Renderar/uppdaterar tabellinnehållet.
function renderTableContent(data) {
    table.innerHTML = "";
    data.forEach(rowData => {
        table.innerHTML += `<tr><td>${rowData.code}</td><td>${rowData.coursename}</td><td>${rowData.progression}</td></tr>`
    });
}