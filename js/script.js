// import functionality
import * as functionality from './functionality.js';

// import data 
import auto_type_content from "../data/auto_type_content.js";
import * as location from "../data/place.js"
import options from "../config/config.js"

// section elements
const sidebar = document.querySelector("#sidebar");
const welcome = document.querySelector("#welcome");
const instruction = document.querySelector("#instruction");
const inputs = document.querySelector("#inputs");
const form = document.querySelector("form");

// buttons elements
const sidebarButton = document.querySelector("#sidebar_button");
const welcomeButton = document.querySelector("#welcome_button");
const instructionButton = document.querySelector("#instruction_button");
const buttonDownload = document.querySelector("#button_download");

functionality.waringRemover();
functionality.startAutoType("#auto_type", auto_type_content);
functionality.loadLocation(location.place, location.placeID);

// buttons actions
sidebarButton.addEventListener("click", () => {
    sidebar.classList.add("go_left");
})
welcomeButton.addEventListener("click", () => {
    welcome.classList.add("go_left");
    instruction.classList.remove("go_right");
})
instructionButton.addEventListener("click", () => {
    instruction.classList.add("go_left")
    inputs.classList.remove("go_right");
})
buttonDownload.addEventListener("click", () => {
    if (functionality.isEmpty(form, true)) {
        const pages = ["../pages/page_one.html", "../pages/page_two.html"];
        pages.forEach((page, pageNumber) => {
            functionality.downloadPDF(form, page, ++pageNumber, options);
        })
    }
})