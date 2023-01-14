const btn = document.querySelector('.ChangeColorBtn')
const colorGrid = document.querySelector('.colorGrid')
const colorValue = document.querySelector('.colorValue')
const clipboard = document.querySelector('.clipboard')


btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    }, async (injectionResults) => {
        const [data] = injectionResults;
        if (data.result) {
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorGrid.style.border = "2px solid #ffffff";
            colorValue.innerText = color;
            clipboard.style.backgroundColor = "#1ed760";
            clipboard.innerText = "Copied to Clipboard!";

            try{
                await navigator.clipboard.writeText(color);
            }catch(err){
                console.log(err);
            }
        }
        console.log(injectionResults);
    }
    );
});

async function pickColor() {
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    } catch (err) {
        console.log(err);
    }
}