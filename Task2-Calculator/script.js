let shouldResetDisplay = false;

function clearDisplay() {
    document.getElementById('display').innerText = '0';
    shouldResetDisplay = false;
}

function clearEntry() {
    document.getElementById('display').innerText = '0';
    shouldResetDisplay = false;
}

function deleteLast() {
    const display = document.getElementById('display');
    if (display.innerText.length === 1 || shouldResetDisplay) {
        display.innerText = '0';
        shouldResetDisplay = false;
    } else {
        display.innerText = display.innerText.slice(0, -1);
    }
}

function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (display.innerText === '0' || shouldResetDisplay) {
        display.innerText = value;
        shouldResetDisplay = false;
    } else {
        display.innerText += value;
    }
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.innerText = eval(display.innerText.replace('÷', '/').replace('×', '*'));
        shouldResetDisplay = true;
    } catch {
        display.innerText = 'Error';
        shouldResetDisplay = true;
    }
}


