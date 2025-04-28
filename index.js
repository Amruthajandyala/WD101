 window.onload = function() {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      for (const user of storedUsers) {
        insertRow(user);
      }
    };

    document.getElementById('registrationForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const acceptTerms = document.getElementById('acceptTerms').checked;

      if (!validateAge(dob)) {
        alert("Age must be between 18 and 55 years.");
        return;
      }

      const user = { name, email, password, dob, acceptTerms };
      insertRow(user);

      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      storedUsers.push(user);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      this.reset();
    });

    function validateAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age >= 18 && age <= 55;
    }

    function insertRow(user) {
      const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
      const newRow = table.insertRow();

      newRow.insertCell(0).innerText = user.name;
      newRow.insertCell(1).innerText = user.email;
      newRow.insertCell(2).innerText = user.password;
      newRow.insertCell(3).innerText = user.dob;
      newRow.insertCell(4).innerText = user.acceptTerms ? "true" : "false";
    }
