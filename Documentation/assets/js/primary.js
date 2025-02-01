// Brand
const nameOfBrand = "tigmatemplate";
document.querySelectorAll('.name-of-brand').forEach(function (item) {
    let content = document.createTextNode(nameOfBrand);
    item.appendChild(content);
})

// The date of this year
const dateOfThisYear = new Date();
let year = dateOfThisYear.getFullYear();
document.querySelectorAll('.get-full-year').forEach(function (item) {
    let content = document.createTextNode(year);
    item.appendChild(content);
})




// ------------------------     This is for the specific requirement's page      ------------------------

// ----- Glide ----- 
const glideClass = document.querySelectorAll('.glide-class');
if (glideClass) {
    glideClass.forEach(ele => {
        ele.classList.add("d-none");    
    })
}



// ----- Typed ----- 
const typedClass = document.querySelectorAll('.typed-class');
if (typedClass) {
    typedClass.forEach(ele => {
        ele.classList.add("d-none");    
    })
}


// ----- ContactSection ----- 
const contactSectionClass = document.querySelectorAll('.contact-section-class');
if (contactSectionClass) {
    contactSectionClass.forEach(ele => {
        ele.classList.add("d-none");    
    })
}



// ----- Contact ----- 
const contactClass = document.querySelectorAll('.contact-class');
if (contactClass) {
    contactClass.forEach(ele => {
        ele.classList.add("d-none");    
    })
}




// ----- Booking ----- 
const bookingClass = document.querySelectorAll('.booking-class');
if (bookingClass) {
    bookingClass.forEach(ele => {
        ele.classList.add("d-none");    
    })
}



// ----- Mailchimp ----- 
const mailchimpClass = document.querySelectorAll('.mailchimp-class');
if (mailchimpClass) {
    mailchimpClass.forEach(ele => {
        ele.classList.add("d-none");    
    })
}


// ----- side bar start backend php ----- 
const sideBarStartBackendPhp = document.querySelectorAll('.side-bar-start-backend-php');
if (sideBarStartBackendPhp) {
    sideBarStartBackendPhp.forEach(ele => {
        ele.classList.add("d-none");    
    })
}



// ----- plugins countdown timer ----- 
const pluginsCountdownTimerClass = document.querySelectorAll('.plugins-countdown-timer-class');
if (pluginsCountdownTimerClass) {
    pluginsCountdownTimerClass.forEach(ele => {
        ele.classList.add("d-none");    
    })
}



// ----- plugins embed videos ----- 
const pluginsEmbedVideosClass = document.querySelectorAll('.plugins-embed-videos-class');
if (pluginsEmbedVideosClass) {
    pluginsEmbedVideosClass.forEach(ele => {
        ele.classList.add("d-none");    
    })
}


// ----- plugins google maps ----- 
const pluginsGoogleMapsClass = document.querySelectorAll('.plugins-google-maps-class');
if (pluginsGoogleMapsClass) {
    pluginsGoogleMapsClass.forEach(ele => {
        ele.classList.add("d-none");    
    })
}


// ----- plugins particles ----- 
const pluginsParticlesClass = document.querySelectorAll('.plugins-particles-class');
if (pluginsParticlesClass) {
    pluginsParticlesClass.forEach(ele => {
        ele.classList.add("d-none");    
    })
}


// ----- color modes dark light autos -----
// const colorModesDarkLightAutosClass = document.querySelectorAll('.color-modes-dark-light-auto-class');
// if (colorModesDarkLightAutosClass) {
//     colorModesDarkLightAutosClass.forEach(ele => {
//         ele.classList.add("d-none");    
//     })
// }

