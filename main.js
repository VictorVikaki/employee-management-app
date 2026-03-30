document.addEventListener("DOMContentLoaded", function () {
    loadContacts();

    // ================= SAVE CONTACT =================
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            console.log("Form submitted!");

            const contact = {
            idNumber: form.elements["idNumber"].value,
            firstname: form.elements["firstname"].value,
            lastname: form.elements["lastname"].value,
            gender: form.elements["gender"].value,
            phone: form.elements["phone"].value,
            email: form.elements["email"].value,
            address: form.elements["address"].value,
            dob: form.elements["dob"].value,
            position: form.elements["position"].value
            };

            let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

            contacts.push(contact);

            localStorage.setItem("contacts", JSON.stringify(contacts));

            alert("Contact added successfully!");

            form.reset();
        });
    }

    // Update dashboard counts
    function updateDashboardCounts() {
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        const positions = [...new Set(contacts.map(c => c.position))]; // unique positions
        const contactsCount = contacts.length;
        const positionsCount = positions.length;

        const contactsElem = document.getElementById("contactsCount");
        const positionsElem = document.getElementById("positionsCount");

        if(contactsElem) contactsElem.textContent = contactsCount;
        if(positionsElem) positionsElem.textContent = positionsCount;
    }

// Call on page load
document.addEventListener("DOMContentLoaded", updateDashboardCounts);

    // ================= LOAD CONTACTS =================
    function loadContacts() {
        console.log("Loading contacts..."); // 👈 DEBUG

        const tableBody = document.querySelector(".contacts-table tbody");

        console.log("Table body:", tableBody); // 👈 DEBUG

        if (!tableBody) return;

        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        console.log("Contacts:", contacts); // 👈 DEBUG

        tableBody.innerHTML = "";

        contacts.forEach((contact, index) => {
            const row = `
                <tr>
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.department}</td>
                    <td>
                        <button class="btn-secondary" onclick="viewDetails(${index})">Details</button>
                        <button class="btn-primary" onclick="editContact(${index})">Edit</button>
                        <button class="btn-danger" onclick="deleteContact(${index})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    contacts.forEach((contact, index) => {
    const row = `
        <tr>
            <td>${index + 1}</td>
            <td>${contact.firstname} ${contact.lastname}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>
                <button class="btn-secondary" onclick="viewDetails(${index})">Details</button>
                <button class="btn-primary" onclick="editContact(${index})">Edit</button>
                <button class="btn-danger" onclick="deleteContact(${index})">Delete</button>
            </td>
        </tr>
    `;
    tableBody.innerHTML += row;
});

    // Make functions global
    window.viewDetails = function (index) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        const c = contacts[index];

        alert(
            `Name: ${c.name}\nEmail: ${c.email}\nPhone: ${c.phone}\nDepartment: ${c.department}\nPosition: ${c.position}`
        );
    };

    window.editContact = function (index) {
        alert("Edit feature coming soon!");
    };

    window.deleteContact = function (index) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        if (confirm("Are you sure you want to delete?")) {
            contacts.splice(index, 1);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            loadContacts();
        }
    };

    // ================= EDIT CONTACT MODAL =================
let currentEditIndex = null;

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const closeModal = document.querySelector(".close");

window.editContact = function(index) {
    currentEditIndex = index;
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const c = contacts[index];

    // Pre-fill form
    editForm.elements["name"].value = c.name;
    editForm.elements["email"].value = c.email;
    editForm.elements["phone"].value = c.phone;
    editForm.elements["department"].value = c.department;
    editForm.elements["position"].value = c.position;

    // Show modal
    editModal.style.display = "block";
};

    // Close modal
    closeModal.onclick = function() {
        editModal.style.display = "none";
    };

    // Close modal when clicking outside
    window.onclick = function(event) {
        if(event.target == editModal) {
            editModal.style.display = "none";
        }
    };

    // Handle Save
    editForm.addEventListener("submit", function(e) {
        e.preventDefault();
        if(currentEditIndex === null) return;

        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        contacts[currentEditIndex] = {
            name: editForm.elements["name"].value,
            email: editForm.elements["email"].value,
            phone: editForm.elements["phone"].value,
            department: editForm.elements["department"].value,
            position: editForm.elements["position"].value
        };

        localStorage.setItem("contacts", JSON.stringify(contacts));
        loadContacts();
        editModal.style.display = "none";
        alert("Contact updated successfully!");
    });

    // AUTO LOAD
    loadContacts();

});
