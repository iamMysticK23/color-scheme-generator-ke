const BASE_URL = "https://www.thecolorapi.com/scheme"

async function generateColorScheme() {
    const schemeType = document.getElementById('colorSchemeType').value
    const hexColor = document.getElementById('colorPicker').value

    const apiUrl = `${BASE_URL}?hex=${hexColor.replace('#', '')}&mode=${schemeType}&count=6`

    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data)

        const colorsArray = data.colors
        displayColors(colorsArray)
    } catch (error) {
        console.error("Error fetching color scheme", error)
    }
}

function displayColors(colors) {
    const panel = document.getElementById('colorPanel')
    panel.innerHTML = ''

    colors.forEach(color => {
        const container = document.createElement('div')
        container.className = 'color-container'

        const div = document.createElement('div')
        div.className = 'color-box'
        div.style.backgroundColor = color.hex.value

        const hexCode = document.createElement('div')
        hexCode.className = 'color-code'
        hexCode.textContent = color.hex.value

        // Add click event listener to each color-code element
        hexCode.addEventListener('click', () => {
            const colorText = hexCode.textContent
            
            // Use the Clipboard API to copy the color code to the clipboard
            navigator.clipboard.writeText(colorText)
                .then(() => {
                    console.log(`Copied to clipboard: ${colorText}`)
                    showAlertMessage()
                })
                .catch(error => {
                    console.error('Clipboard writeText failed:', error)
                })
        })

        container.appendChild(div)
        container.appendChild(hexCode)
        panel.appendChild(container)
    })
    function showAlertMessage(){
        alert("Copied to clipboard")
    }
}