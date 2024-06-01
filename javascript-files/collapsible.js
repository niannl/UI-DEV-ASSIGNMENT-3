
// Toggle collapsible content
function toggleCollapsible(event, element) {
    const toggleArea = element.querySelector('.toggle-area');
    const collapsibleContent = element.querySelector('.collapsible-content');
    const arrow = element.querySelector('.drop-arrow');
    const labelHeading = element.querySelector('h');

    // Do nothing if click occured outside toggleArea
    if (!toggleArea.contains(event.target)) {
        return;
    }

    // Toggle content visbility
    if (collapsibleContent.style.maxHeight && collapsibleContent.style.maxHeight !== '0px') {
        collapsibleContent.style.maxHeight = '0';
        arrow.style.transform = 'rotate(0deg)';
        element.style.height = '50px'; 
        labelHeading.style.marginTop = '25px';
    } else {
        collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + "px";
        arrow.style.transform = 'rotate(180deg)';
        element.style.height = 'auto'; 
        labelHeading.style.marginTop = '5px';
    }
}







