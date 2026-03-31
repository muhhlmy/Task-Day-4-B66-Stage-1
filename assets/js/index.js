// ======================================
// VARIABLES
// ======================================
const inputProjectName = document.getElementById("projectName");
const inputProjectDescription = document.getElementById("projectDescription");
const inputProjectStartDate = document.getElementById("projectStartDate");
const inputProjectEndDate = document.getElementById("projectEndDate");
const inputProjectImage = document.getElementById("projectImage");
const form = document.getElementById("projectForm");

// Wadah untuk menyimpan Object setiap Project
let projects = [];

// ======================================
// FUNCTIONS
// ======================================
function renderProjects() {
  const projectsContainer = document.getElementById("projectContainer");
  let projectHTML = "";

  if (projects.length === 0) {
    projectHTML = `
    <h5 class="text-center text-secondary w-100 mt-5">
      Belum ada project saat ini.
      <br>
      Silakan tambahkan project baru di atas.
    </h5>
    `;
  } else {
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];

      let techIconsHTML = "";
      if (project.techNodeJs == true) {
        techIconsHTML += '<i class="fa-brands fa-node-js fs-4 p-1"></i> ';
      }
      if (project.techNextJs == true) {
        techIconsHTML += '<span class="fw-bold fs-6 p-1">Next.JS</span> ';
      }
      if (project.techReactJs == true) {
        techIconsHTML += '<i class="fa-brands fa-react fs-4 p-1"></i> ';
      }
      if (project.techTypescript == true) {
        techIconsHTML += '<span class="fw-bold fs-6 p-1">TS</span> ';
      }

      projectHTML += `
      <div class="col-12 col-md-6 col-lg-4 projectCard">
        <div class="card h-100 shadow-sm border-0 rounded-4 p-3 bg-white">
          <img
            src="${project.image}"
            class="card-img-top rounded-3"
            alt="Project Image"
            style="object-fit: cover; height: 200px"
          />
          <div class="card-body px-0 pb-0 text-start d-flex flex-column">
            <a href="#" class="text-decoration-none text-dark">
              <h5 class="card-title fw-bold mb-1">
                ${project.name}
              </h5>
            </a>
            <p class="text-secondary small mb-3">Duration: ${project.duration}</p>
            <p
              class="card-text text-secondary mb-4"
              style="
                display: -webkit-box;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
              "
            >
              ${project.description}
            </p>
            
            <div class="mb-3 text-secondary d-flex align-items-center gap-2">
               ${techIconsHTML}
            </div>

            <div class="d-flex gap-2 w-100 mt-auto">
              <button class="btn btn-outline-dark w-100 rounded-pill">
                Edit
              </button>
              <button class="btn btn-dark w-100 rounded-pill">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    }
  }

  projectsContainer.innerHTML = projectHTML;
}

function calculateDurationReadable(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end - start; // Hasilnya dalam miliseconds
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Konversi ke hari

  const months = Math.floor(days / 30); // Konversi sederhana ke bulan

  return `${months} bulan`;
}

// ======================================
// EVENTS HANDLER
// ======================================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //Ambil nilai checked (true/false) dari checkbox teknologi
  let nodejs = document.getElementById("nodejs").checked;
  let nextjs = document.getElementById("nextjs").checked;
  let reactjs = document.getElementById("reactjs").checked;
  let typescript = document.getElementById("typescript").checked;

  //Image Handler
  let imageFile = inputProjectImage.files[0];
  let imageUrl = "";

  if (imageFile) {
    imageUrl = URL.createObjectURL(imageFile);
  } else {
    imageUrl = `http://placehold.co/600x400?text=${inputProjectName.value}`;
  }

  //Menyimpan Object ke dalam Projects
  const newProject = {
    name: inputProjectName.value,
    description: inputProjectDescription.value,
    duration: calculateDurationReadable(
      inputProjectStartDate.value,
      inputProjectEndDate.value,
    ),
    //Menyimpan nilai true/false dari tangkapan checkbox
    techNodeJs: nodejs,
    techNextJs: nextjs,
    techReactJs: reactjs,
    techTypescript: typescript,
    //Menyimpan Gambar
    image: imageUrl,
  };

  //Masukkan data baru ke Projects
  projects.push(newProject);
  console.log("Data Project saat ini:", projects);

  // Menampilkan data ke html
  renderProjects();
});

// ======================================
// INITIALIZATIONS
// ======================================
renderProjects();
