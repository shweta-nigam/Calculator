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
        try {
            expression = Math.sqrt(eval(expression)).toString();
            display.value = expression;
        } catch {
            display.value = "Error";
            expression = "";
        }
    } else if (value === "%") {
        try {
            expression = (eval(expression) / 100).toString();
            display.value = expression;
        } catch {
            display.value = "Error";
            expression = "";
        }
    } else if (value === "MC") {
        memory = 0; // Reset memory
        display.value = "Memory Cleared";
    } else if (value === "MR") {
        if (memory !== 0) {
            expression += memory.toString(); // Append memory to expression
            display.value = expression;
        } else {
            display.value = "Memory Empty";
        }
    } else if (value === "M+") {
        try {
            memory += eval(expression || "0"); // Add current expression to memory
            display.value = "Memory: " + memory;
        } catch {
            display.value = "Error";
        }
    } else if (value === "M-") {
        try {
            memory -= eval(expression || "0"); // Subtract current expression from memory
            display.value = "Memory: " + memory;
        } catch {
            display.value = "Error";
        }
    } else {
        expression += value; // Append value to the expression
        display.value = expression;
    }
}
