let seedColor = document.getElementById("seed-color")
let mode = document.getElementById("mode")
const selectionForm = document.getElementById("selection-form")
const hexDisplay = document.getElementById("hex-display")
const clipboardConfirmation = document.getElementById("clipboard-confirmation")


          
selectionForm.addEventListener("submit", function(e){
    hexDisplay.innerHTML = ""
    const fetchUrl= `https://www.thecolorapi.com/scheme?hex=${seedColor.value.slice(1,7).toUpperCase()}&mode=${mode.value}&count=5`
    // console.log(fetchUrl)
    
    fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {

     for (let colorObject in data.colors){
            const colorIndex = parseInt(colorObject)
            const schemeBlockName = `color${colorIndex + 1}`
            
            const swatchEl = document.getElementById(schemeBlockName);
            const hexValue = data.colors[colorIndex].hex.value;
            
            swatchEl.style.background = hexValue
            
            swatchEl.innerHTML = hexValue
            
            swatchEl.style.color = hexValue
            
            hexDisplay.innerHTML += `<p class="hex-value">${hexValue}</p>`
        
     }
        
 
    })
})

document.addEventListener("click", function(e){
    if (e.target.classList.contains('swatch')){
        const hex = document.getElementById(e.target.id).innerHTML
        
        navigator.clipboard.writeText(hex)
        alert(`Copied ${hex} to clipboard!`)
    }
    
})

