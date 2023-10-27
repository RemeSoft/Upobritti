// PDF Generator Options
export default {
    margin: 10,
    filename: "page.pdf",
    image: {
        type: "jpeg",
        quality: 1
    },
    html2canvas: {
        scale: 2
    },
    jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
    },
    pagebreak: {
        mode: ['css', 'legacy']
    }
}