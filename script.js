        // Default admin credentials (in a real application, these would be stored securely on a server)
        const adminUser = { username: "admin", password: "admin" };
        
        // Sample initial personnel data
        let personnelData = [
            {
                id: 1,
                name: "John Doe",
                position: "Software Developer",
                department: "IT",
                email: "john.doe@example.com",
                phone: "555-123-4567",
                address: "123 Main St, Anytown, USA",
                hireDate: "2022-01-15",
                salary: 75000
            },
            {
                id: 2,
                name: "Jane Smith",
                position: "HR Manager",
                department: "HR",
                email: "jane.smith@example.com",
                phone: "555-987-6543",
                address: "456 Oak Ave, Somewhere, USA",
                hireDate: "2020-06-22",
                salary: 85000
            }
        ];
        
        // Login function
        function login() {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const loginError = document.getElementById("loginError");
            
            if (username === adminUser.username && password === adminUser.password) {
                document.getElementById("loginPage").style.display = "none";
                document.getElementById("dashboard").style.display = "block";
                loadPersonnelData();
            } else {
                loginError.style.display = "block";
                loginError.textContent = "Invalid username or password";
            }
        }
        
        // Logout function
        function logout() {
            document.getElementById("loginPage").style.display = "flex";
            document.getElementById("dashboard").style.display = "none";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            document.getElementById("loginError").style.display = "none";
        }
        
        // Switch tabs
        function switchTab(tabId) {
            const tabs = document.querySelectorAll(".tab");
            const tabContents = document.querySelectorAll(".tab-content");
            
            tabs.forEach(tab => tab.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));
            
            if (tabId === "personnelList") {
                tabs[0].classList.add("active");
                tabContents[0].classList.add("active");
                loadPersonnelData();
            } else {
                tabs[1].classList.add("active");
                tabContents[1].classList.add("active");
            }
        }
        
        // Load personnel data into the table
        function loadPersonnelData(data = personnelData) {
            const tableBody = document.getElementById("personnelTableBody");
            tableBody.innerHTML = "";
            
            data.forEach(person => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${person.id}</td>
                    <td>${person.name}</td>
                    <td>${person.position}</td>
                    <td>${person.department}</td>
                    <td>${person.email}</td>
                    <td class="action-buttons">
                        <button class="edit-btn" onclick="openEditModal(${person.id})">Edit</button>
                        <button class="delete-btn" onclick="deletePersonnel(${person.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
        
        // Search personnel
        function searchPersonnel() {
            const searchTerm = document.getElementById("searchInput").value.toLowerCase();
            
            if (searchTerm === "") {
                loadPersonnelData();
                return;
            }
            
            const filteredData = personnelData.filter(person => 
                person.name.toLowerCase().includes(searchTerm) ||
                person.position.toLowerCase().includes(searchTerm) ||
                person.department.toLowerCase().includes(searchTerm) ||
                person.email.toLowerCase().includes(searchTerm)
            );
            
            loadPersonnelData(filteredData);
        }
        
        // Add new personnel
        document.getElementById("addPersonnelForm").addEventListener("submit", function(e) {
            e.preventDefault();
            
            const newPersonnel = {
                id: personnelData.length > 0 ? Math.max(...personnelData.map(p => p.id)) + 1 : 1,
                name: document.getElementById("newName").value,
                position: document.getElementById("newPosition").value,
                department: document.getElementById("newDepartment").value,
                email: document.getElementById("newEmail").value,
                phone: document.getElementById("newPhone").value,
                address: document.getElementById("newAddress").value,
                hireDate: document.getElementById("newHireDate").value,
                salary: parseFloat(document.getElementById("newSalary").value)
            };
            
            personnelData.push(newPersonnel);
            
            // Reset form
            document.getElementById("addPersonnelForm").reset();
            
            // Show success message
            const successMsg = document.getElementById("addSuccess");
            successMsg.style.display = "block";
            successMsg.textContent = "Personnel added successfully!";
            
            setTimeout(() => {
                successMsg.style.display = "none";
                switchTab("personnelList");
            }, 2000);
        });
        
        // Open edit modal
        function openEditModal(id) {
            const person = personnelData.find(p => p.id === id);
            if (!person) return;
            
            document.getElementById("editId").value = person.id;
            document.getElementById("editName").value = person.name;
            document.getElementById("editPosition").value = person.position;
            document.getElementById("editDepartment").value = person.department;
            document.getElementById("editEmail").value = person.email;
            document.getElementById("editPhone").value = person.phone;
            document.getElementById("editAddress").value = person.address;
            document.getElementById("editHireDate").value = person.hireDate;
            document.getElementById("editSalary").value = person.salary;
            
            document.getElementById("editModal").style.display = "flex";
        }
        
        // Close modal
        function closeModal() {
            document.getElementById("editModal").style.display = "none";
        }
        
        // Update personnel
        document.getElementById("editPersonnelForm").addEventListener("submit", function(e) {
            e.preventDefault();
            
            const id = parseInt(document.getElementById("editId").value);
            const index = personnelData.findIndex(p => p.id === id);
            
            if (index !== -1) {
                personnelData[index] = {
                    id: id,
                    name: document.getElementById("editName").value,
                    position: document.getElementById("editPosition").value,
                    department: document.getElementById("editDepartment").value,
                    email: document.getElementById("editEmail").value,
                    phone: document.getElementById("editPhone").value,
                    address: document.getElementById("editAddress").value,
                    hireDate: document.getElementById("editHireDate").value,
                    salary: parseFloat(document.getElementById("editSalary").value)
                };
                
                loadPersonnelData();
                closeModal();
            }
        });
        
        // Delete personnel
        function deletePersonnel(id) {
            if (confirm("Are you sure you want to delete this personnel?")) {
                personnelData = personnelData.filter(p => p.id !== id);
                loadPersonnelData();
            }
        }
        
        // Close modal if clicked outside
        window.onclick = function(event) {
            const modal = document.getElementById("editModal");
            if (event.target === modal) {
                closeModal();
            }
        }
        
        // Initialize search input event
        document.getElementById("searchInput").addEventListener("keyup", function(e) {
            if (e.key === "Enter") {
                searchPersonnel();
            }
        });