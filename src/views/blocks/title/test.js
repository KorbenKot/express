
function dragstart(e) {
    console.log('drag start');

    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.setData('text/html', '<p>put me here!</p>');
    console.log('yep');
    e.dataTransfer.dropEffect = "copy";

}
function ondropThis(e) {
    e.preventDefault();
    console.log('ondropThis');
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
}

function ondragoverThis(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.style.borderColor = '#f00';
}

