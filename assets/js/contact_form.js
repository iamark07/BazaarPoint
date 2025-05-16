document.addEventListener("DOMContentLoaded", function () {
  const inquiryForm = document.querySelector("#inquiry_form form");

  const name = document.querySelector(".inquiry-name");
  const email = document.querySelector(".inquiry-email");
  const phone = document.querySelector(".inquiry-phone");
  const message = document.querySelector(".inquiry-message");

  const errorName = document.querySelector(".inquiry-error-name");
  const errorEmail = document.querySelector(".inquiry-error-email");
  const errorPhone = document.querySelector(".inquiry-error-phone");
  const errorMessage = document.querySelector(".inquiry-error-message");

  // ✅ Realtime restriction
  name.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, "");
  });

  phone.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  inquiryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    errorName.textContent = "";
    errorEmail.textContent = "";
    errorPhone.textContent = "";
    errorMessage.textContent = "";

    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = message.value.trim();

    const nameRegex = /^[A-Za-z\s]{3,60}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const phoneRegex = /^[6-9][0-9]{9}$/;

    if (nameValue === "") {
      errorName.textContent = "Full Name is required.";
      isValid = false;
    } else if (!nameRegex.test(nameValue)) {
      errorName.textContent = "Only alphabets allowed (3-60 characters).";
      isValid = false;
    }

    if (emailValue === "") {
      errorEmail.textContent = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      errorEmail.textContent = "Invalid email format.";
      isValid = false;
    }

    if (phoneValue === "") {
      errorPhone.textContent = "Phone number is required.";
      isValid = false;
    } else if (!phoneRegex.test(phoneValue)) {
      errorPhone.textContent =
        "Enter a valid 10-digit number starting with 6-9.";
      isValid = false;
    }

    if (messageValue.length < 10) {
      errorMessage.textContent = "Message must be at least 10 characters.";
      isValid = false;
    }

    if (isValid) {
        const success_contact_Message = document.getElementById("success_contact_Message");
        success_contact_Message.classList.remove("hidden");
        success_contact_Message.textContent = "Form submitted successfully!";
        
        inquiryForm.reset();
    
        // Auto hide after 5 seconds
        setTimeout(() => {
            success_contact_Message.classList.add("hidden");
        }, 5000);
    }
    
  });
});
