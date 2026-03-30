document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const tableBody = document.querySelector(".contacts-table tbody");
    const editModal = document.getElementById("editModal");
    const editForm = document.getElementById("editForm");
    const closeModal = document.querySelector(".close");
    let currentEditIndex = null;

    const getContacts = () => JSON.parse(localStorage.getItem("contacts")) || [];
    const saveContacts = (data) => localStorage.setItem("contacts", JSON.stringify(data));

    const loadContacts = () => {
        if (!tableBody) return;
        const contacts = getContacts();
        tableBody.innerHTML = "";
        contacts.forEach((c, i) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${c.firstname} ${c.lastname}</td>
                    <td>${c.phone}</td>
                    <td>${c.email}</td>
                    <td>
                        <button class="btn-secondary" onclick="viewDetails(${i})">Details</button>
                        <button class="btn-primary" onclick="editContact(${i})">Edit</button>
                        <button class="btn-danger" onclick="deleteContact(${i})">Delete</button>
                    </td>
                </tr>`;
        });
    };

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const contact = {
                firstname: form.firstname.value,
                lastname: form.lastname.value,
                phone: form.phone.value,
                email: form.email.value,
                position: form.position.value
            };
            const contacts = getContacts();
            contacts.push(contact);
            saveContacts(contacts);
            alert("Contact added!");
            window.location.href = "view-contacts.html";
        });
    }

    window.viewDetails = (i) => {
        const c = getContacts()[i];
        alert(`Name: ${c.firstname} ${c.lastname}\nPhone: ${c.phone}\nEmail: ${c.email}\nPosition: ${c.position}`);
    };

    window.deleteContact = (i) => {
        const contacts = getContacts();
        if (confirm("Delete this contact?")) {
            contacts.splice(i, 1);
            saveContacts(contacts);
            loadContacts();
        }
    };

    window.editContact = (i) => {
        currentEditIndex = i;
        const c = getContacts()[i];
        editForm.firstname.value = c.firstname;
        editForm.lastname.value = c.lastname;
        editForm.phone.value = c.phone;
        editForm.email.value = c.email;
        editForm.position.value = c.position;
        editModal.style.display = "block";
    };

    if (closeModal) closeModal.onclick = () => editModal.style.display = "none";
    window.onclick = (e) => { if (e.target === editModal) editModal.style.display = "none"; }

    if (editForm) {
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (currentEditIndex === null) return;
            const contacts = getContacts();
            contacts[currentEditIndex] = {
                ...contacts[currentEditIndex],
                firstname: editForm.firstname.value,
                lastname: editForm.lastname.value,
                phone: editForm.phone.value,
                email: editForm.email.value,
                position: editForm.position.value
            };
            saveContacts(contacts);
            loadContacts();
            editModal.style.display = "none";
            alert("Updated!");
        });
    }

    function updateDashboard() {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        let totalEmployees = contacts.length;

        let positions = new Set();
        contacts.forEach(contact => {
            if (contact.position) {
            positions.add(contact.position);
            }
        });

        let totalPositions = positions.size;

        document.getElementById("employeeCount").textContent = totalEmployees;
        document.getElementById("positionCount").textContent = totalPositions;
    }

    window.onload = function() {
        updateDashboard();
    };

    loadContacts();
});
