// auto typing functionality
function startAutoType(id, strings) {
    const typed = new Typed(id, {
        strings,
        typeSpeed: 50,
        showCursor: false,
    });
}

// location load functionality
function loadLocation(place, placeID) {
    for (const property in placeID) {
        const array = placeID[property];
        array.forEach((id, index) => {

            // division insertion
            if (index === 0) {
                const elementDivision = document.getElementById(id);
                for (const division in place) elementDivision.options[elementDivision.options.length] = new Option(division, division);

                // adding click listener
                elementDivision.addEventListener('change', (event) => {
                    const value = event.target.value;
                    const elementDistrict = document.getElementById(array[index + 1]);
                    elementDistrict.length = 1;
                    for (const district in place[value]) // district insertion
                        elementDistrict.options[elementDistrict.options.length] = new Option(district, district);
                })

            } else if (index === 1) {
                const elementDistrict = document.getElementById(id);

                // adding click listener
                elementDistrict.addEventListener('change', (event) => {
                    const districtValue = event.target.value;
                    const divisionValue = document.getElementById(array[index - 1]).value;
                    const elementUpozila = document.getElementById(array[index + 1]);
                    elementUpozila.length = 1;

                    for (const index in place[divisionValue][districtValue]) { // load upozlia
                        const upozilaValue = place[divisionValue][districtValue][index];
                        elementUpozila.options[elementUpozila.options.length] = new Option(upozilaValue, upozilaValue)
                    }
                })
            }
        });
    }
}

// PDF download functionality
async function downloadPDF(form, page, pageNumber, options) {
    try {
        const informationOBJECT = {};
        const information = new FormData(form);

        // Getting all information
        information.forEach(function (value, key) {
            informationOBJECT[key] = ": " + value;
        });

        // Fetch the HTML content
        const response = await fetch(page);
        if (!response.ok) {
            throw new Error(`Failed to fetch HTML content. Status: ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const document = parser.parseFromString(html, 'text/html');

        for (const key in informationOBJECT) {
            const td = document.getElementById(key);
            if (td) {
                td.textContent = informationOBJECT[key];
            }
        }

        const serializer = new XMLSerializer();
        const htmlString = serializer.serializeToString(document);

        const container = document.createElement("div");
        container.innerHTML = htmlString;

        // Create and export the PDF
        const pdfOptions = {
            ...options,
            filename: `document${pageNumber}.pdf`
        };

        await html2pdf().from(container).set(pdfOptions).toPdf().get('pdf').then(pdf => {
            pdf.setFontSize(10);
            if (pageNumber == 1) {
                pdf.text(`1`, 104, 285);
            } else {
                pdf.text(`2`, 104, 285);
            }

        }).save();

    } catch (error) {
        console.error("Error creating PDF:", error);
    }
}

// check empty
function isEmpty(form, check) {
    const information = new FormData(form);
    information.forEach(function (value, key) {
        const element = document.getElementById(key);
        if (element.hasAttribute("required") && value.trim() === "") {
            element.classList.add("warning");
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    });
    const isEmpty = document.querySelectorAll(".warning").length === 0;
    return check ? isEmpty : true;
}

// waring remover
function waringRemover() {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach(element => {
        element.addEventListener("click", (element) => {
            element.target.classList.remove("warning");
        })
    })
}

// function others others department handler
function showOthers() {
    const inputs = document.querySelectorAll("select");
    inputs.forEach(element => {
        element.addEventListener("change", (e) => {
            if (e.target.value === "others") {
                const id = `others_${e.target.id}`;
                document.getElementById(id).style.display = "block";
            }
        })
    });
}

function othersHandler() {
    const prefix = "others_";
    const othersArray = ["previous_edu_technology", "present_edu_technology"];
    othersArray.forEach(id => {
        const element = document.getElementById(prefix + id);
        const select = document.getElementById(id);
        const option = select.querySelector("option[value='others']");
        element.addEventListener("input", (e) => {
            option.value = e.target.value;
            option.text = e.target.value;
        })
    })
}

export {
    startAutoType,
    loadLocation,
    downloadPDF,
    isEmpty,
    waringRemover,
    showOthers,
    othersHandler
}