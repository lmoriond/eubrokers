
// button back to top
//Get the button
let btnBackToTop = document.querySelector(".btn-back-to-top")

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    if (btnBackToTop !== null) {
        scrollbtnBackToTopFun();
    }
};

function scrollbtnBackToTopFun() {
    if ( document.body.scrollTop > 800 || document.documentElement.scrollTop > 800 ) {
        btnBackToTop.style.display = "flex";
    } else {
        btnBackToTop.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
if (btnBackToTop !== null) {
    btnBackToTop.addEventListener("click", backToTop);
}

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Enable tooltips 
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// Enable popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// Toasts
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}


// Choices
const elements = document.querySelectorAll('.choices');
elements.forEach(ele => {
    new Choices(ele, {
        removeItemButton: true,  
    });
})


if (document.getElementById('typed')) {
  var typed = new Typed("#typed", {
    stringsElement: '#typed-strings',
    typeSpeed: 90,
    backSpeed: 90,
    backDelay: 200,
    startDelay: 500,
    loop: true
  });
}

const allSideBarStartTags = document.querySelectorAll('.active-start-hover')

if (window.matchMedia('(max-width: 992px)').matches) {

    allSideBarStartTags.forEach(function(element) {
        // Add the data-bs-toggle attribute
        element.setAttribute('data-bs-toggle', 'offcanvas');
        // Add the data-bs-target attribute
        element.setAttribute('data-bs-target', '#navbarNavOffcanvas');
    });

}
    
window.addEventListener('resize', function() {
    if (window.matchMedia('(max-width: 992px)').matches) {

        allSideBarStartTags.forEach(function(element) {
            // Add the data-bs-toggle attribute
            element.setAttribute('data-bs-toggle', 'offcanvas');
            // Add the data-bs-target attribute
            element.setAttribute('data-bs-target', '#navbarNavOffcanvas');
        });

    } else {
        allSideBarStartTags.forEach(function(element) {
            // Add the data-bs-toggle attribute
            element.removeAttribute('data-bs-toggle');
            // Add the data-bs-target attribute
            element.removeAttribute('data-bs-target');
        });
    }

});


