
// navbar
function openNav() {
  document.getElementById("sidePanel").classList.add("open");
  document.getElementById("navOverlay").classList.add("visible");
  // Prevent scroll
  document.body.style.overflow = "hidden";
}

function closeNav() {
  document.getElementById("sidePanel").classList.remove("open");
  document.getElementById("navOverlay").classList.remove("visible");
  // Re-enable scroll
  document.body.style.overflow = "auto";
}



// email 
let public_key = "h3k1tX2T3DT1NPu22"; 
let service_id = "default_service"; 
let template_id = "template_d4ir7xr"; 

emailjs.init(public_key); 
document.getElementById("formsubmittion").addEventListener("submit", function (e) {
    e.preventDefault(); 

    //  form being submitted
    emailjs.sendForm(service_id, template_id, this).then(
      () => {
        alert("TRANSMISSION SUCCESSFUL!");
        this.reset();
      },
      (error) => {
        alert("FAILURE: " + JSON.stringify(error));
      }
    );
});

