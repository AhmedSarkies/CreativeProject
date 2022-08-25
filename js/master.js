// Check If There Is Local Storage Color Option
let mainColor = localStorage.getItem("color_option");
// Check If Color Option Local Storage Is Not Empty
if (mainColor !== null) {
    document.documentElement.style.setProperty('--main--color', mainColor);
    // Remove All Active Class From All Colors List Item
    document.querySelectorAll(".settings-box .settings-container .option-box .colors-list li").forEach((element) => {
        element.classList.remove("active");
        // Add Active Class On Element With Data-Color === Local Storage Item
        if (mainColor === element.dataset.color) {
            // Add Active Class
            element.classList.add("active");
        }
    });
}
// Random Background Option
let backgroundOption = true;
// Variable To Control The Background Interval
let backgroundInterval;
// Check If There Is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
    // Remove Active Class From All Spans
    document.querySelectorAll(".option-box .random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    // Add Active Class On Target Element
    if (backgroundLocalItem === "true") {
        document.querySelector(".option-box .random-backgrounds .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".option-box .random-backgrounds .no").classList.add("active");
    }
}
// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .settings-icon").onclick = function () {
    // Toggle Class Fa-Spin For Rotation On Self
    this.classList.toggle("fa-spin");
    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};
// Switch Colors
const colorsList = document.querySelectorAll(".option-box .colors-list li");
// Loop On All List Items
colorsList.forEach(li => {
    // Click On Every List Items
    li.addEventListener("click", e => {
        // Set Color On Root
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);
        // Set Color On Local Storge
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});
// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".option-box .random-backgrounds span");
// Loop On All Spans
randomBackEl.forEach(span => {
    // Click On Every Span
    span.addEventListener("click", (e) => {
        handleActive(e);
        // Chick If You Want Random Background Or Not
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// Function Randomize Imgs
function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get  Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // Change Background Image Url
            landingPage.style.backgroundImage = `url("images/${imgsArray[randomNumber]}")`;
        }, 10000);
    }
}
randomizeImgs();
// Handle Active State Function
function handleActive (e) {
    // Remove All Active Class
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });
    // Add Active Class On Target Element
    e.target.classList.add("active");
}
// Select Skills Selector
let skills = document.querySelector(".skills");
window.onscroll = function () {
    // Skills Offset Top
    let skillsOffset = skills.offsetTop;
    // Skills Outer Height
    let skillsOuterHeight = skills.offsetHeight;
    // Window Height
    let windowHeight = this.innerHeight;
    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffset + skillsOuterHeight - windowHeight - 350)) {
        let allSkills = document.querySelectorAll(".skills .skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};
// Create Pooup With The Image
let gallery = document.querySelectorAll(".gallery img");
gallery.forEach(image => {
    image.addEventListener("click", (e) => {
        // Create Overlay Element
        let overLay = document.createElement("div");
        // Add Class To Overlay
        overLay.className = "popup-overlay";
        // Append Overlay To The Body
        document.body.appendChild(overLay);
        // Create The Popup Box
        let popupBox = document.createElement("div");
        // Add Class To The Popup Box
        popupBox.className = "popup-box";
        // Heading Images
        if (image.alt !== null) {
            // Create Heading
            let imageHeading = document.createElement("h3");
            // Create Text For Heading
            let imageText = document.createTextNode(image.alt);
            // Append Text To Heading
            imageHeading.appendChild(imageText);
            // Append Heading To The Popup Box
            popupBox.appendChild(imageHeading);
        }
        // Create The Image
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = image.src;
        // Add The Image To The Popup Box
        popupBox.appendChild(popupImage);
        // Append The Popup Box To The Body
        document.body.appendChild(popupBox);
        // Create The Close Span
        let closeButton = document.createElement("span")
        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");
        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);
        // Add Class To The Close Button
        closeButton.className = "close-button"
        // Append The Close Button To The Popup Box
        popupBox.appendChild(closeButton);
    });
});
// Close Popup
document.addEventListener("click", event => {
    if (event.target.className == "close-button") {
        // Remove The Current Popup
        event.target.parentNode.remove();
        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});
// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullets");
scrollToElement(allBullets);
// Select All Links
const allLinks = document.querySelectorAll(".links a");
scrollToElement(allLinks);
// Scroll To Element Function
function scrollToElement(elements) {
    elements.forEach(element => {
        element.addEventListener("click", event => {
            event.preventDefault();
            document.querySelector(event.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}
// Bullets Option
let bulletsSpan = document.querySelectorAll(".option-box .bollets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
// Check If Bullets Option Local Storage Is Not Empty
if (bulletLocalItem !== null) {
    // Remove Active Class From All Spans
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    // Add Active Class To The Selected Span
    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".option-box .bollets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".option-box .bollets-option .no").classList.add("active");
    }
}
// Add Bullets Option To Local Storage
bulletsSpan.forEach(span => {
    span.addEventListener("click", e => {
        handleActive(e);
        // Chick If You Want Bullets Option Or Not
        if (e.target.dataset.display === "block") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
    });
});
// Reset Button
document.querySelector(".settings-box .settings-container .reset-options").addEventListener("click", () => {
    // Remove Items From Local Storage
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    // Reload Window
    document.location.reload();
});
// Toggle Menu
let toggleMenuBtn = document.querySelector(".landing-page .header-area .toggle-menu");
let spanActive = document.querySelector(".landing-page .header-area .toggle-menu span");
let toggleLinks = document.querySelector(".landing-page .header-area .links");
toggleMenuBtn.addEventListener("click", e => {
    // Stop Propagation
    e.stopPropagation();
    // Toggle Class "menu-active" On Toggle Menu
    spanActive.classList.toggle("menu-active");
    // Toggle Class "open" On Links
    toggleLinks.classList.toggle("open");
});
// Click Anywhere Outside Menu And Toggle Menu
document.addEventListener("click", e => {
    if (e.target !== toggleMenuBtn && e.target !== toggleLinks) {
        // Chick If Menu Is Opened
        if (toggleLinks.classList.contains("open")) {
            // Toggle Class "menu-active" On Toggle Menu
            spanActive.classList.toggle("menu-active");
            // Toggle Class "open" On Links
            toggleLinks.classList.toggle("open");
        }
    }
});
// Stop Propagation On Menu
toggleLinks.addEventListener("click", e => {
    e.stopPropagation();
});