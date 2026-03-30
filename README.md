# EMPLOYEE MANAGEMENT APP

A simple yet functional **Employee Management System (EMS)** built using **HTML, CSS, and JavaScript**. This project demonstrates core front-end development concepts including DOM manipulation, local storage, form handling, and dynamic UI updates.

## Features (MVP)

### Core Functionality

* Add new contacts
* View all contacts in a table
* Edit existing contacts (via modal popup)
* Delete contacts
* View contact details

### Dashboard

* Displays:
  * Total number of contacts
  * Total number of unique positions
* “More Info +” buttons:
  * Navigate to detailed views

### Data Persistence

* Uses **Local Storage** to store contacts
* Data remains even after page refresh

### Navigation Layout

* Combined **Navbar + Sidebar (Inverted L layout)**
* Sidebar includes:
  * Profile section (image, name, status)
  * Links:
    * Home
    * Add New Contact
    * View Contacts

## Pages Overview

### 1. Home Page (`index.html`)

* Dashboard cards:
  * Number of Contacts
  * Number of Positions
* Interactive “More Info +” buttons

### 2. Add New Contact (`new-contact.html`)

Form includes:
* ID Number
* First Name
* Last Name
* Gender (Radio buttons)
* Phone
* Email
* Address
* Date of Birth
* Position (Dropdown)

### 3. View Contacts (`view-contacts.html`)

* Table columns:
  * No.
  * Name
  * Phone
  * Email
  * Actions
  
* Actions:
  * View Details
  * Edit (Modal)
  * Delete
  
* Supports filtering (e.g. by position)

## How It Works

### Local Storage Structure

Contacts are stored as an array of objects:

```json
[
  {
    "idNumber": "12345678",
    "firstname": "John",
    "lastname": "Doe",
    "gender": "Male",
    "phone": "0712345678",
    "email": "john@gmail.com",
    "dob": "2000-01-01",
    "department": "HR",
    "position": "Manager"
  }
]
```

### Data Flow

1. User fills form → submits
2. Data saved to `localStorage`
3. Redirect to contacts page
4. Table dynamically renders stored data

## JavaScript Functionality

### Core Functions

* `getContacts()` → Fetch contacts from local storage
* `saveContacts(data)` → Save contacts
* `loadContacts()` → Render contacts in table
* `updateDashboardCounts()` → Update dashboard stats

### Actions

* `viewDetails(index)` → Shows contact info
* `editContact(index)` → Opens modal with pre-filled data
* `deleteContact(index)` → Removes contact

## Styling

### CSS Features

* Responsive layout
* Flexbox for alignment
* CSS Variables for theming

## Project Structure

```
project-folder/
│
├── index.html
├── new-contact.html
├── view-contacts.html
├── styles.css
├── main.js
└── images/
```

## Handling Sensitive Files

If using personal images:

1. Add to `.gitignore`

```
images/profile.jpg
```

2. Or use placeholder images for public repos

## Getting Started

1. Clone the repository

```bash
git clone <your-repo-link>
```

2. Open project folder
```
cd employee-management-app
```

3. Run using Live Server (VS Code extension) or paste the code below on your preferred browser
```
http://127.0.0.1:3000/index.html
```

## License

This project uses [MIT License](https://opensource.org/license/mit).
