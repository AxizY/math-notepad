var mode = "editing";
const boxes = Array.from(document.getElementById("windows").children);
// start off with all textboxes editable, then when mode is switched, parse the text inside
// change textboxes to non editable, and then surround the $n parts with <div content-editable..>

function toggleMode() {
    if(mode == "editing") {
        mode = "viewing";
        viewing();
    } else {
        mode = "editing";
        editing();
    }
}

function viewing() {
    boxes.forEach(box => {
        box.setAttribute("content-editable", "false");
        // do the parse thing here for the text
        // inside of the textbox, create a new element with background, content editable etc. in the place
        // of where the $n is
    });
}

function editing() {
    boxes.forEach(box => {
        box.setAttribute("content-editable", "true");
        // do the reverse, unparse it
    });
}