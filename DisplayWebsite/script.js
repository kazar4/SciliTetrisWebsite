let toggleOn = false;
const buttonContainer = document.querySelector('.button-container');
const originalButtonDetails = buttonContainer.innerHTML;
const mainButton = document.getElementById('main-button');
const positions = ['arc-1', 'arc-2', 'arc-3'];
const positionsText = ['tech details!', 'the project!', 'photos'];
const links = ["./tech.html", "./about.html", "./photos.html"];

let bgVideo = document.getElementById("bg");

let caughtPromise = false;

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

bgVideo.play().catch(() => {
    caughtPromise = true;
    let warningText = "";

    if (isIOS) {
        warningText =
          "On iPhone, autoplay may be blocked when Low Power Mode is on. \n Please disable to play background video";
      } else {
        warningText =
          "Autoplay is disabled by your browser or power settings. \n Please disable to play background video";
      }

      window.onload = function () {
        setTimeout(function () {
            customAlert(warningText);
        }, 1000);
      };
});


window.onload = function () {

    let warningText = ""

    setTimeout(function () {
        if (caughtPromise == false && (bgVideo.paused || bgVideo.readyState < 2)) {
            let warningText = "";
            if (isIOS) {
                warningText =
                "On iPhone, autoplay may be blocked when Low Power Mode is on. \n Please disable to play background video";
            } else {
                warningText =
                "Autoplay is disabled by your browser or power settings. \n Please disable to play background video";
            }
        }

        customAlert(warningText);

    }, 1000);
  };


function customAlert(message) {
    // const overlay = document.getElementById("custom-alert-overlay");
    // const msg = document.getElementById("custom-alert-message");
    // const ok = document.getElementById("custom-alert-ok");
    // const box = document.getElementById("custom-alert-box");
    // Create overlay container
    const overlay = document.createElement("div");
    overlay.id = "custom-alert-overlay";

    // Create the alert box
    const box = document.createElement("div");
    box.id = "custom-alert-box";

    // Message
    const msg = document.createElement("p");
    msg.id = "custom-alert-message";
    msg.textContent = message;

    // OK button
    const btn = document.createElement("button");
    btn.id = "custom-alert-ok";
    btn.textContent = "OK";

    // Close alert
    btn.addEventListener("click", () => {
        overlay.remove();
    });

    // Build DOM structure
    box.appendChild(msg);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.getElementById("popupContainer").appendChild(overlay);
  
    //overlay.style.display = "flex";

    msg.innerHTML = "TEEEEST if there is an alert"

    overlay.classList.add("active");
    box.style.display = "block";
  
    ok.onclick = () => {
     //overlay.style.display = "none";
     overlay.classList.remove("active");
     box.style.display = "none";
    
    };
  }

// Apparently works for android
// if ('connection' in navigator && navigator.connection.saveData) {
//     alert("Data Saver mode is enabled. Background video may not play.");
// }

function changeLocation(i) {
    console.log("hi")
    console.log("going to " + links[i])
    window.location = links[i];
}

function toggleButton() {
    if (!toggleOn) {
        toggleOn = true;

        for (let i = 0; i < 3; i++) {
            const newButton = document.createElement('button');

            newButton.classList.add('arc', 'glow-on-hover', 'show');
            newButton.setAttribute("onclick", `changeLocation("${i}");`);
            newButton.innerHTML = '<span> ' + positionsText[i] + '</span>';

            buttonContainer.insertBefore(newButton, mainButton.nextSibling);

            setTimeout(() => {
                const buttons = document.getElementsByClassName('arc');
                for (let j = 0; j < buttons.length; j++) {
                    buttons[j].style.opacity = "1";
                    buttons[j].style.zIndex = "0";
                    buttons[j].classList.add(positions[j])
                }
            }, 300)

        }
    } else {
        toggleOn = false;
        setTimeout(() => {
            const buttons = document.getElementsByClassName('arc');
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].style.opacity = "0";
                buttons[j].style.zIndex = "-1";
                buttons[j].classList.remove(positions[j])
            }
            setTimeout(() => {
                buttonContainer.innerHTML = originalButtonDetails;
            }, 300)
        }, 300)
    }
};

