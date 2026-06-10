// Mock Data for 1st Year Internships
const internships = [
    {
        id: 1,
        title: "Frontend Web Developer (Intern)",
        company: "TechNova Solutions",
        logo: "T",
        platform: "Internshala",
        category: "Development",
        stipendType: "Paid",
        stipend: "₹5,000 / month",
        duration: "3 Months",
        location: "Remote",
        tags: ["HTML/CSS", "React Basic", "1st Year Eligible"],
        applyLink: "https://internshala.com/"
    },
    {
        id: 2,
        title: "Google STEP Intern (2026)",
        company: "Google",
        logo: "G",
        platform: "Company Website",
        category: "Development",
        stipendType: "Paid",
        stipend: "Competitive",
        duration: "12 Weeks",
        location: "Hybrid (Bangalore/Hyderabad)",
        tags: ["DSA", "Mentorship", "1st/2nd Year Only"],
        applyLink: "https://buildyourfuture.withgoogle.com/programs/step/"
    },
    {
        id: 3,
        title: "Student Campus Ambassador",
        company: "GeeksforGeeks",
        logo: "GfG",
        platform: "Company Website",
        category: "Campus Ambassador",
        stipendType: "Performance Based",
        stipend: "Swags & Goodies",
        duration: "6 Months",
        location: "Your Campus",
        tags: ["Leadership", "Networking", "Beginner Friendly"],
        applyLink: "https://www.geeksforgeeks.org/campus-ambassador-program/"
    },
    {
        id: 4,
        title: "Open Source Contributor (GSoC Prep)",
        company: "Cloud Native Computing Foundation",
        logo: "CN",
        platform: "GitHub",
        category: "Open Source",
        stipendType: "Unpaid",
        stipend: "Unpaid (Learning)",
        duration: "Self-Paced",
        location: "Remote",
        tags: ["Git/GitHub", "Linux", "Open Source"],
        applyLink: "https://summerofcode.withgoogle.com/"
    },
    {
        id: 5,
        title: "UI/UX Design Intern",
        company: "Pixelate Agency",
        logo: "P",
        platform: "Internshala",
        category: "Design",
        stipendType: "Paid",
        stipend: "₹8,000 / month",
        duration: "2 Months",
        location: "Remote",
        tags: ["Figma", "Design Systems", "Portfolio required"],
        applyLink: "https://internshala.com/internships/design-internship"
    },
    {
        id: 6,
        title: "Campus Lead",
        company: "Microsoft Learn",
        logo: "MS",
        platform: "Company Website",
        category: "Campus Ambassador",
        stipendType: "Performance Based",
        stipend: "Certificate & Credits",
        duration: "1 Year",
        location: "Your Campus",
        tags: ["Community", "Microsoft Tech", "Beginner Friendly"],
        applyLink: "https://studentambassadors.microsoft.com/"
    }
];

// DOM Elements
const gridContainer = document.getElementById('internshipGrid');
const searchInput = document.getElementById('searchInput');
const checkboxes = document.querySelectorAll('.filter-checkbox');
const resultsCount = document.getElementById('resultsCount');

// Render Cards
function renderInternships(data) {
    gridContainer.innerHTML = '';
    
    if (data.length === 0) {
        gridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fa-solid fa-ghost" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>No opportunities found matching your filters.</p>
            </div>
        `;
        resultsCount.innerText = "0 matches found";
        return;
    }

    resultsCount.innerText = `${data.length} opportunities found`;

    data.forEach(job => {
        const div = document.createElement('div');
        div.className = 'card';
        
        let tagsHtml = '';
        job.tags.forEach(tag => {
            const isEligible = tag.includes('1st Year') || tag.includes('Beginner');
            tagsHtml += `<span class="tag ${isEligible ? 'eligible' : ''}">${tag}</span>`;
        });

        div.innerHTML = `
            <div>
                <div class="card-header">
                    <div class="company-logo">${job.logo}</div>
                    <span class="card-platform">${job.platform}</span>
                </div>
                <h3 class="card-title">${job.title}</h3>
                <div class="card-company">${job.company}</div>
                
                <div class="card-details">
                    <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                    <span><i class="fa-solid fa-wallet"></i> ${job.stipend}</span>
                    <span><i class="fa-regular fa-clock"></i> ${job.duration}</span>
                </div>
                
                <div class="card-tags">
                    ${tagsHtml}
                </div>
            </div>
            
            <div class="card-actions">
                <a href="${job.applyLink}" class="btn-apply" target="_blank" rel="noopener noreferrer">Apply Now</a>
            </div>
        `;
        
        gridContainer.appendChild(div);
    });
}

// Filter Logic
function filterData() {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Get checked values
    const checkedFilters = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const filtered = internships.filter(job => {
        // Search text filter
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) || 
                              job.company.toLowerCase().includes(searchTerm) ||
                              job.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        // Filter groups (Category, Platform, StipendType)
        // If a checkbox within a group is checked and it matches the job, keep it.
        const matchesCategory = checkedFilters.includes(job.category);
        const matchesPlatform = checkedFilters.includes(job.platform);
        const matchesStipend = checkedFilters.includes(job.stipendType);
        
        // Note: For realistic filtering, if all checkboxes in a group are unchecked, we might want to exclude everything, 
        // which this logic handles (matchesX will be false if group is completely unchecked).
        return matchesSearch && matchesCategory && matchesPlatform && matchesStipend;
    });

    renderInternships(filtered);
}

// Event Listeners
searchInput.addEventListener('input', filterData);
checkboxes.forEach(cb => cb.addEventListener('change', filterData));

// Initial Render
renderInternships(internships);
