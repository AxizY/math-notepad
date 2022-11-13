var mode = "editing";
var scriptHidden = false;
const boxes = Array.from(document.getElementById("windows").children);
var registers = {};

function toggleMode() {
    if(mode == "editing") {
        mode = "viewing";
        viewing();
    } else {
        mode = "editing";
        editing();
    }
}

function toggleScript() {
    scriptHidden = !scriptHidden;
    if(scriptHidden) {
        boxes[1].style.display = "block";
        boxes[0].style.marginRight = "2.5px";
        boxes[0].style.width = "50%";
    } else {
        boxes[1].style.display = "none";
        boxes[0].style.marginRight = "5px";
        boxes[0].style.width = "100%";
    }
}

// make a function takes in a string equation and returns the result of the expression, there will only be + and - signs
// and only 2 numbers
function calculate(equation) {
    console.log(equation);
    if(equation.includes("u")) return 0;
    // split by + and -
    if(equation.includes("+")) {
        var split = equation.split("+");
        return parseInt(split[0]) + parseInt(split[1]);
    } else if(equation.includes("-")) {
        var split = equation.split("-");
        return parseInt(split[0]) - parseInt(split[1]);
    }
    if(equation.includes("+")) {
        var split = equation.split("+");
        return parseInt(split[0]) + parseInt(split[1]);
    }
    if(equation.includes("-")) {
        var split = equation.split("-");
        return parseInt(split[0]) - parseInt(split[1]);
    }
    return parseInt(equation);
}

function updateRegisters() {
    var script = boxes[1];
    // find the equal sign and set the register before equal to the result of the registesr after equal
    // the things after the equal sign can be added together and subtracted from each other
    // for each line
    var lines = script.innerText.split("\n");
    for(var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var left = line.split("=")[0].trim();
        var right = line.split("=")[1].trim();
        var rightEquation = "";
        // convert the right side to an equation
        for(var j = 0; j < right.length; j++) {
            if(right[j] == " " || right[j] == "$") {
                continue;
            }
            if(right[j] == "+") {
                rightEquation += " + ";
            } else if(right[j] == "-") {
                rightEquation += " - ";
            } else {
                rightEquation += registers[right[j]].trim();
            }
        }
        var result = calculate(rightEquation);

        registers[left.charAt(1)] = result;
    }

    var spans = Array.from(boxes[0].children);
    spans.forEach(span => {
        if(span.tagName == "SPAN") {
            var symbol = span.getAttribute("data-symbol");
            var value = registers[symbol];
            span.innerText = value;
        } else if(span.tagName == "DIV") { 
            var nSpan = span.children[0];
            var symbol = nSpan.getAttribute("data-symbol");
            var value = registers[symbol];
            nSpan.innerText = value;
        }
    });
}

function viewing() {
    boxes.forEach(box => {
        box.setAttribute("contenteditable", "false");
    });

    var matches = boxes[0].innerHTML.match(/\$[a-z0-9]/g);
    for(var i = 0; i < matches.length; i++) {
        var match = matches[i];
        var symbol = match.substring(1);
        var element = `<span contenteditable="true" data-symbol="${symbol}" class="registers">..</span>`;
        boxes[0].innerHTML = boxes[0].innerHTML.replace(match, element);
    }
    $(".registers").on("input", function() {
        var symbol = $(this).data("symbol");
        var value = $(this).text();
        registers[symbol] = value;
        updateRegisters();
    });
}

function editing() {
    boxes.forEach(box => {
        box.setAttribute("contenteditable", "true");
    });
    
    var spans = Array.from(boxes[0].children);
    spans.forEach(span => {
        if(span.tagName == "SPAN") {
            var symbol = span.getAttribute("data-symbol");
            var element = `$`+symbol;
            span.outerHTML = element;
        } else if(span.tagName == "DIV") { // simplify this later
            var nSpan = span.children[0];
            var symbol = nSpan.getAttribute("data-symbol");
            var element = `$`+symbol;
            nSpan.outerHTML = element;
        }
    });
}
