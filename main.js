window.addEventListener('scroll', reveal);

function reveal(){
  var reveals = document.querySelectorAll('.reveal');
  for (var i = 0; i < reveals.length; i++){
   var windowheight = window.innerHeight;
   var revealtop = reveals[i].getBoundingClientRect().top;
   var revealpoint = 150;

  if(revealtop < windowheight - revealpoint){
    reveals[i].classList.add('active');
   }
  else{
    reveals[i].classList.remove('active');
   }
 }
}

const hamburger = document.querySelector('.hamburger');
const hamburgerMenu = document.querySelector('.hamburger-menu');

  hamburger.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('show');
  hamburger.querySelector('i').classList.toggle('bx-menu');
  hamburger.querySelector('i').classList.toggle('bx-x');
});

//filter input contact
const contactInput = document.getElementById('contact');
const formGroup = contactInput.parentElement;
const contactError = document.createElement('div');
contactError.id = 'contactError';
formGroup.appendChild(contactError);

contactInput.addEventListener('input', () => {
  if (contactInput.validity.patternMismatch) {
    contactError.textContent = 'Only numbers and the "+" symbol are allowed.';
    contactError.style.display = 'block'; 
  } else {
    contactError.style.display = 'none'; 
  }
});

const emailInput = document.getElementById('email');
const formGroupEmail = emailInput.parentElement; 
const emailError = document.createElement('div'); 
emailError.id = 'contactError';

formGroupEmail.appendChild(emailError); 

emailInput.addEventListener('input', () => {
  if (emailInput.validity.typeMismatch) {
    emailError.textContent = 'Please enter a valid email address.';
    emailError.style.display = 'block'; 
  } else {
    emailError.style.display = 'none'; 
  }
});

//charcount at message
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('charCount');

messageTextarea.addEventListener('input', () => {
  const currentLength = messageTextarea.value.length;
  const maxLength = messageTextarea.maxLength;
  charCount.textContent = `${currentLength}/${maxLength}`;
});

//modal credit
var modal = document.getElementById("modal-credits");
var btn = document.getElementById("open-modal");

btn.onclick = function() {
    modal.style.display = "block";
}

// submit form to gmail
const scriptURL = 'https://script.google.com/macros/s/AKfycbw68BOPhSZNM868AVv7NQU-tfV73GQgKEvcs6sjVqezZkQ2wxEz-4muLi4EsI0TeTZqgQ/exec'; // URL Apps Script
const form = document.forms['contact-nub'];
const modalContainer = document.getElementById('modal-container');
const modalTittle = document.getElementById("modal-tittle");
const modalMessage = document.getElementById("modal-message");
const successIcon = document.querySelector(".success-icon");
const failIcon = document.querySelector(".fail-icon");
const body = document.body;

// Show modal function
function showModal() {
  modalContainer.classList.add('box');
  body.classList.add('modal-active');
}
// Close modal function
function closeModal() {
  modalContainer.classList.remove('box');
  body.classList.remove('modal-active');
}

  async function sendContactForm() {
    // Input Sanitization (validation)
    const sanitizedData = {
    fullname: encodeURIComponent(form.fullname.value),
    contactNo: encodeURIComponent(form.contactNo.value), 
    email: encodeURIComponent(form.email.value), 
    subject: encodeURIComponent(form.subject.value),
    message: encodeURIComponent(form.message.value)
    };

    const ipAddress = await getIPAddress(); 

    // Create FormData with sanitized data
    const formData = new FormData();
    for (const key in sanitizedData) {
    formData.append(key, sanitizedData[key]);
    }
    formData.append('ipAddress', ipAddress);

    try {
      // fetch
      const response = await fetch(scriptURL, { method: 'POST', body: formData });
      const data = await response.json();
      if (data.result === 'success') {
        successIcon.style.display = "block";
        failIcon.style.display = "none";
        modalTittle.textContent = "Success";
        modalMessage.textContent = "Thank you! Your message has been received. We will contact you soon.";
        form.reset();
      } 
      else {
        failIcon.style.display = "block";
        successIcon.style.display = "none";
        modalTittle.textContent = "Error!";
        modalMessage.textContent = "Oops.. something went wrong. Please send again. Error: " + data.error;
        console.error('Error!', data.error);
      }
      showModal();
      form.reset();
    }

      catch (error) {
        console.error('Error!', error.message);
        showModal();
      }
      finally {
        document.getElementById("loading-spinner"). style.display = "none";
        document.getElementById('submit').style.display = 'block';
      };
  }

  async function getIPAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return null; 
    }
  }

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('submit').style.display = 'none';
  document.getElementById("loading-spinner"). style.display = "block";
  sendContactForm();
  });

  document.addEventListener('click', (event) => {
    const modalContent = document.querySelector('.modal2');
    if (!modalContent.contains(event.target)) {
    closeModal();
    }
  });
});
  
  window.onclick = function(event) {
      if (event.target == modal) { 
      modal.style.display = "none";
    }
  }

// auto hide footer
// Select all element input and textarea
const inputFields = document.querySelectorAll('input, textarea');
const footer = document.querySelector('.footer');

// Add event listener fo every input field
if (window.innerWidth <= 768) {
inputFields.forEach(input => {
  input.addEventListener('focusin', () => {
    // Hide the footer when the keyboard appears
    footer.style.display = 'none';
  });

  input.addEventListener('focusout', () => {
    // Re-show footer when keyboard disappears
    footer.style.display = 'flex'; 
  });
});
}

function openPreviewPopup(link, event) {
  event.preventDefault()
  const url = link.dataset.url;
  const previewFrame = document.getElementById('previewFrame');
  previewFrame.src = url;
  document.getElementById('previewPopup').style.display = 'block';
  document.body.classList.add('no-scroll');
}

function closePreviewPopup() {
  document.getElementById('previewPopup').style.display = 'none';
  document.getElementById('previewFrame').src = '';
  document.body.classList.remove('no-scroll');
}
