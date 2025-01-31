// För roboto font från Google Fonts.
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";

const searchINPUT = document.getElementById("search"); // Deklarerar sökfältets element.
const sortCodeBTN = document.getElementById("sort-code");
const sortCourseNameBTN = document.getElementById("sort-coursename");
const sortProgressionBTN = document.getElementById("sort-progression");
const table = document.getElementById("table-body");   // Deklarerar tabellkroppens element.

// En funktion som startar vid inladdning av sidan. Dens primära uppgift är att anropa funktionerna getData och renderTableContent. 
window.onload = async () => {
    try {
        const data = await getData(); // <------------------------- Väntar på att data ska returneras.
        // console.table(data);
        // Lägger till en input lyssnare på sökfältet.
        searchINPUT.addEventListener("input", () => {
            filterTable(data);
        });

        // Eventlyssnare för sortering. sortTable tar två parametrar, data och vilken kolumn det handlar om.
        sortCodeBTN.addEventListener("click", () => {
            sortTable(data, "code");
        });

        sortCourseNameBTN.addEventListener("click", () => {
            sortTable(data, "coursename");
        });

        sortProgressionBTN.addEventListener("click", () => {
            sortTable(data, "progression");
        });

        renderTableContent(data); // Renderar ut vid första inladdningen av sidan.
    } catch (error) {
        console.error(error);
    }
}

// Sorterar datan beroende på vilken kolumnknapp som trycktes på.
function sortTable(data, n) {
    let sortedRowsData = data;

    switch (n) {
        case "code":
            if (sortCodeBTN.className === "button up") {
                sortedRowsData = data.sort((a, b) => (a.code > b.code) ? 1 : -1);
                sortCodeBTN.className = "button down";
                sortCodeBTN.textContent = "Stigande";
            } else if (sortCodeBTN.className === "button down") {
                sortedRowsData = data.sort((a, b) => (b.code > a.code) ? 1 : -1);
                sortCodeBTN.className = "button up";
                sortCodeBTN.textContent = "Fallande";
            }
            break;
        case "coursename":
            if (sortCourseNameBTN.className === "button up") {
                sortedRowsData = data.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1);
                sortCourseNameBTN.className = "button down";
                sortCourseNameBTN.textContent = "Stigande";
            } else if (sortCourseNameBTN.className === "button down") {
                sortedRowsData = data.sort((a, b) => (b.coursename > a.coursename) ? 1 : -1);
                sortCourseNameBTN.className = "button up";
                sortCourseNameBTN.textContent = "Fallande";
            }
            break;
        case "progression":
            if (sortProgressionBTN.className === "button up") {
                sortedRowsData = data.sort((a, b) => (a.progression > b.progression) ? 1 : -1);
                sortProgressionBTN.className = "button down";
                sortProgressionBTN.textContent = "Stigande";
            } else if (sortProgressionBTN.className === "button down") {
                sortedRowsData = data.sort((a, b) => (b.progression > a.progression) ? 1 : -1);
                sortProgressionBTN.className = "button up";
                sortProgressionBTN.textContent = "Fallande";
            }
            break;
        default:
            console.log("!?");
            break;
    }
    filterTable(sortedRowsData);
}

// Filtrerar utefter vad textsträngarna innehåller.
function filterTable(data) {
    const phrase = searchINPUT.value;
    const filteredData = data.filter(fd => fd.code.toLowerCase().includes(phrase.toLowerCase()) || fd.coursename.toLowerCase().includes(phrase.toLowerCase()));
    // Ifall sökrutan blir tom ska alla tabellrader synas.
    if (phrase === "") {
        renderTableContent(data);
    } else {
        renderTableContent(filteredData);
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