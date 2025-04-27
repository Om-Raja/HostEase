// Show/hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
  }
  
  // Profile icon toggle
  document.getElementById('profileIcon').addEventListener('click', () => {
    showSection('profileSection');
  });
  








// query pop up


  document.getElementById('queryForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
  
    if (this.checkValidity()) {
      // If form is valid, show Bootstrap modal
      const modal = new bootstrap.Modal(document.getElementById('queryModal'));
      modal.show();
      this.reset(); // Reset form after showing modal
    } else {
      this.reportValidity(); // Show validation messages if not valid
    }
  });
  

  // leave pop up

  document.getElementById('leaveForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    if (this.checkValidity()) {
      const modal = new bootstrap.Modal(document.getElementById('leaveModal'));
      modal.show();
      this.reset();
    } else {
      this.reportValidity();
    }
  });
  

  // complaint pop up

  document.getElementById('complaintForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (this.checkValidity()) {
      const modal = new bootstrap.Modal(document.getElementById('complaintModal'));
      modal.show();
      this.reset(); // Optional: clear the form
      window.location.reload();
    } else {
      this.reportValidity(); // Show built-in HTML validation
    }
  });





//   main section 


  const form = document.getElementById("profileForm");
  const saveBtn = document.getElementById("saveBtn");
  const editBtn = document.getElementById("editBtn");
  const preview = document.getElementById("profilePreview");

  const fields = ["crn", "profileName", "roomNo", "course", "branch", "mobile", "profileEmail", "address"];

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (form.checkValidity()) {
      fields.forEach(id => {
        const value = document.getElementById(id).value;
        localStorage.setItem(id, value);
        document.getElementById(id).disabled = true;
      });

      const fileInput = document.getElementById("profilePic");
      if (fileInput.files.length) {
        const reader = new FileReader();
        reader.onload = function (e) {
          localStorage.setItem("profileImage", e.target.result);
          preview.src = e.target.result;
          preview.classList.remove("d-none");
        };
        reader.readAsDataURL(fileInput.files[0]);
      }

      document.getElementById("profilePic").disabled = true;
      saveBtn.classList.add("d-none");
      editBtn.classList.remove("d-none");
    } else {
      form.reportValidity();
    }
  });

  editBtn.addEventListener("click", () => {
    fields.forEach(id => document.getElementById(id).disabled = false);
    document.getElementById("profilePic").disabled = false;

    saveBtn.classList.remove("d-none");
    editBtn.classList.add("d-none");
  });

  // Load from localStorage on page load
  window.addEventListener("DOMContentLoaded", () => {
    fields.forEach(id => {
      const val = localStorage.getItem(id);
      if (val) {
        document.getElementById(id).value = val;
        document.getElementById(id).disabled = true;
      }
    });

    const img = localStorage.getItem("profileImage");
    if (img) {
      preview.src = img;
      preview.classList.remove("d-none");
      document.getElementById("profilePic").disabled = true;
      saveBtn.classList.add("d-none");
      editBtn.classList.remove("d-none");
    }
  });






