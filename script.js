const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = "";
let memory = 0;

// Button click handler
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.dataset.value;
        handleInput(value);
    });
});

// Keyboard input handler
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if ((/\d|\+|-|\*|\/|\./).test(key)) {
        handleInput(key);
    } else if (key === "Enter") {
        handleInput("C");  // Clear previous calculation on Enter
    } else if (key === "Escape") {
        handleInput("C");
    } else if (key === "r") {
        handleInput("√");
    } else if (key === "%") {
        handleInput("%");
    }
});

function handleInput(value) {
    if (value === "C") {
        expression = "";
        display.value = "";
    } else if (value === "=") {
        try {
            display.value = eval(expression);
            expression = display.value;
        } catch {
            display.value = "Error";
            expression = "";
        }
    } else if (value === "√") {
        expression = Math.sqrt(eval(expression)).toString();
        display.value = expression;
    } else if (value === "%") {
        expression = (eval(expression) / 100).toString();
        display.value = expression;
    } else if (value === "MC") {
        memory = 0;
    } else if (value === "MR") {
        expression = memory.toString();
        display.value = memory;
    } else if (value === "M+") {
        memory += eval(expression);
    } else if (value === "M-") {
        memory -= eval(expression);
    } else {
        expression += value;
        display.value = expression;
    }
}
