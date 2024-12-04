const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = ""; // Stores the current input expression
let memory = 0; // Memory storage variable

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
        handleInput(key); // Numbers and basic operators
    } else if (key === "Enter") {
        handleInput("="); // Equals
    } else if (key === "Escape") {
        handleInput("C"); // Clear
    } else if (key === "r") {
        handleInput("√"); // Square root
    } else if (key === "%") {
        handleInput("%"); // Percentage
    }
});

// Function to handle calculator input
function handleInput(value) {
    if (value === "C") {
        // Clear the display and reset the expression
        expression = "";
        display.value = "";
    } else if (value === "=") {
        try {
            // Evaluate the expression using eval
            const result = eval(expression);
            display.value = result;
            expression = result.toString(); // Store the result for further calculations
        } catch {
            display.value = "Error";
            expression = "";
        }
    } else if (value === "√") {
        try {
            // Calculate the square root of the current expression
            expression = Math.sqrt(eval(expression || "0")).toString();
            display.value = expression;
        } catch {
            display.value = "Error";
            expression = "";
        }
    } else if (value === "%") {
        try {
            // Calculate percentage
            expression = (eval(expression || "0") / 100).toString();
            display.value = expression;
        } catch {
            display.value = "Error";
            expression = "";
        }
    } else if (value === "MC") {
        // Clear memory
        memory = 0;
        display.value = "Memory Cleared";
    } else if (value === "MR") {
        // Recall memory
        if (memory !== 0) {
            expression += memory.toString();
            display.value = memory;
        } else {
            display.value = "Memory Empty";
        }
    } else if (value === "M+") {
        try {
            // Add current expression to memory
            memory += eval(expression || "0");
            display.value = "Memory Added";
        } catch {
            display.value = "Error";
        }
    } else if (value === "M-") {
        try {
            // Subtract current expression from memory
            memory -= eval(expression || "0");
            display.value = "Memory Subtracted";
        } catch {
            display.value = "Error";
        }
    } else {
        // Update the expression and display it
        expression += value;
        display.value = expression;
    }
}

