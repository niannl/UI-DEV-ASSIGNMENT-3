

function toggleCollapsible(element) {
    const toggleArea = element.querySelector('.toggle-area');
    const collapsibleContent = element.querySelector('.collapsible-content');
    const arrow = element.querySelector('.drop-arrow');
    const labelHeading = element.querySelector('h');

    if (!toggleArea.contains(event.target)) {
        return; // If not, do nothing
    }

    if (collapsibleContent.style.maxHeight && collapsibleContent.style.maxHeight !== '0px') {
        collapsibleContent.style.maxHeight = '0';
        arrow.style.transform = 'rotate(0deg)';
        element.style.height = '50px'; // Collapse back to default height
        labelHeading.style.marginTop = '25px';
    } else {
        collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + "px";
        arrow.style.transform = 'rotate(180deg)';
        element.style.height = 'auto'; // Expand to fit content
        labelHeading.style.marginTop = '5px';
    }
}







