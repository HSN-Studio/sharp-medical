import {
  usStates,
  usCities,
} from "https://sharpmedicalstaffing.com/wp-content/themes/sharp/sharp-medical/constants/index.js";

const urlParams = new URLSearchParams(window.location.search);
// Discipline Filter
// const disciplineSelectElement = document.getElementById("discipline");
// // Get the state parameter value from the URL
// const selectedDisciplines = urlParams
//   .getAll("discipline")
//   .map((discipline) => discipline.toLowerCase());
// disciplines.forEach((discipline) => {
//   const option = document.createElement("option");
//   option.value = discipline;
//   option.textContent = discipline;
//   citiesSelectElement.appendChild(option);
//   if (selectedDisciplines.includes(discipline.toLowerCase())) {
//     option.selected = true;
//   }
// });
new MultiSelectTag("discipline", {
  rounded: true, // default true
  shadow: true, // default false
  placeholder: "Select or Search Discipline", // default Search...
  tagColor: {
    textColor: "rgb(33, 37, 41)",
    borderColor: "#18b9e2",
    bgColor: "#80e0dc",
  },
  onChange: function (values) {
    // Get Selected Discipline options from Input
    const disciplineParameters = decodeURIComponent(
      values
        .map((paramObj) => {
          return paramObj.value;
        })
        .join(",")
      // .toLowerCase()
    );
    // Get the current URL
    let url = new URL(window.location.href);

    // Update the "discipline" URL parameter value
    url.searchParams.set("discipline", disciplineParameters);
    // Delete URL parameter if not present
    if (disciplineParameters === "") {
      url.searchParams.delete("discipline");
    }
    //update URL
    history.replaceState(null, null, url);
  },
});

new MultiSelectTag("speciality", {
  rounded: true, // default true
  shadow: true, // default false
  placeholder: "Select or Search Speciality", // default Search...
  tagColor: {
    textColor: "rgb(33, 37, 41)",
    borderColor: "#18b9e2",
    bgColor: "#80e0dc",
  },

  onChange: function (values) {
    // Get Selected speciality options from Input
    const specialityParameters = decodeURIComponent(
      values
        .map((paramObj) => {
          return paramObj.value;
        })
        .join(",")
      // .toLowerCase()
    );
    // Get the current URL
    let url = new URL(window.location.href);

    // Update the "speciality" URL parameter value
    url.searchParams.set("speciality", specialityParameters);
    // Delete URL parameter if not present
    if (specialityParameters === "") {
      url.searchParams.delete("speciality");
    }
    //update URL
    history.replaceState(null, null, url);
  },
});

const statesSelectElement = document.getElementById("state");
// Get the state parameter value from the URL
const selectedStates = urlParams
  .getAll("state")
  .map((state) => state.split(","));
// Lower case removed from state

for (const [abbr, name] of Object.entries(usStates)) {
  const option = document.createElement("option");
  option.value = abbr;
  option.textContent = name;
  selectedStates.forEach((state) => {
    if (state.includes(abbr)) {
      option.selected = true;
    }
  });
  statesSelectElement.appendChild(option);
}
new MultiSelectTag("state", {
  rounded: true, // default true
  shadow: true, // default false
  placeholder: "Select or Search State", // default Search...
  tagColor: {
    textColor: "rgb(33, 37, 41)",
    borderColor: "#18b9e2",
    bgColor: "#80e0dc",
  },
  onChange: function (values) {
    // Get Selected Discipline options from Input
    const stateParameters = decodeURIComponent(
      values
        .map((paramObj) => {
          return paramObj.value;
        })
        .join(",")
    );
    // Get the current URL
    let url = new URL(window.location.href);

    // Update the "state" URL parameter value
    url.searchParams.set("state", stateParameters);
    // Delete URL parameter if not present
    if (stateParameters === "") {
      url.searchParams.delete("state");
    }
    //update URL
    history.replaceState(null, null, url);
  },
});
const citiesSelectElement = document.getElementById("city");
// Get the state parameter value from the URL
const selectedCities = urlParams.getAll("city").map((city) => city.split(","));
usCities.forEach((city) => {
  const option = document.createElement("option");
  option.value = city;
  option.textContent = city;
  citiesSelectElement.appendChild(option);
  selectedCities.forEach((selectedCity) => {
    if (selectedCity.includes(city)) {
      option.selected = true;
    }
  });
  // if (selectedCities.includes(city)) {
  //   option.selected = true;
  // }
});
new MultiSelectTag("city", {
  rounded: true, // default true
  shadow: true, // default false
  placeholder: "Select or Search City", // default Search...
  tagColor: {
    textColor: "rgb(33, 37, 41)",
    borderColor: "#18b9e2",
    bgColor: "#80e0dc",
  },
  onChange: function (values) {
    // Get Selected City options from Input
    const cityParameters = decodeURIComponent(
      values
        .map((paramObj) => {
          return paramObj.value;
        })
        .join(",")
      // .toLowerCase()
    );
    // Get the current URL
    let url = new URL(window.location.href);

    // Update the "city" URL parameter value
    url.searchParams.set("city", cityParameters);
    // Delete URL parameter if not present
    if (cityParameters === "") {
      url.searchParams.delete("city");
    }
    //update URL
    history.replaceState(null, null, url);
  },
});

// Function to update URL parameters
function updateUrlParams() {
  const discipline = document.getElementById("discipline").value;
  const speciality = document.getElementById("speciality").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("discipline", discipline);
  urlParams.set("speciality", speciality);
  urlParams.set("city", city);
  urlParams.set("state", state);

  history.replaceState(null, null, "?" + urlParams.toString());
}

// Get Last Modified Date
document.querySelector("#last-modified").addEventListener("change", (e) => {
  console.log(e.target.value);
  const lastModifiedParameter = e.target.value;
  let url = new URL(window.location.href);

  // Update the "last Modified" URL parameter value
  url.searchParams.set("lastmodified", lastModifiedParameter);
  // Delete URL parameter if not present
  if (lastModifiedParameter === "") {
    url.searchParams.delete("lastmodified");
  }
  //update URL
  history.replaceState(null, null, url);
});

// Function to get Jobs Data using URL Parameters
let totalRecords = 1;
let startRecord = 1;
let prevReqCompleted = true;
const getJobs = (skip = 0, removePrev = false) => {
  msgBox.classList.add("flex");
  msgBox.classList.remove("hidden");
  msgSpan.textContent = "Searching for Jobs...";
  loader.classList.remove("hidden");
  // Remove Previously Loaded Jobs
  if (removePrev) jobsContainer.innerHTML = "";
  // Get the URL parameters and set them to null if they are not provided
  const urlParams = new URLSearchParams(window.location.search);
  const parameters = {
    discipline: urlParams.get("discipline")?.toString()?.split(",") || null,
    speciality: urlParams.get("speciality")?.toString()?.split(",") || null,
    city: urlParams.get("city")?.toString()?.split(",") || null,
    state: urlParams.get("state")?.toString()?.split(",") || null,
    lastmodified: urlParams.get("lastmodified") || null,
  };

  // Prepare the request body
  const requestBody = JSON.stringify({
    LastModifiedDate: parameters.lastmodified,
    Skip: skip,
    Take: 100,
    Discipline: parameters.discipline,
    Specialty: parameters.speciality,
    City: parameters.city,
    State: parameters.state,
  });

  // Prepare fetch options
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  };
  // Execute the request
  const data = fetch(
    "https://sharpjobs.azurewebsites.net/api/jobs",
    fetchOptions
  )
    .then((response) => response.json())
    .then((data) => {
      prevReqCompleted = true;
      totalRecords = data?.totalRecords;

      if (data?.jobs?.length > 0) {
        startRecord = data.startRecord;
        return data;
      }
      if (data.startRecord > 0 && data.totalRecords < 1) {
        msgSpan.textContent = "End of results.";
        loader.classList.add("hidden");
      } else {
        msgSpan.textContent =
          "Sorry, we couldn't find any matching jobs for your search.";
        loader.classList.add("hidden");
      }
      // Process the response data
    })
    .catch((error) => console.error("Error:", error));
  return data;
};
// Render the Jobs
const jobsContainer = document.querySelector(".jobs");
const msgBox = document.querySelector(".message-box");
const msgSpan = document.querySelector(".message");
const loader = document.querySelector(".loader");
// Toggle Active Class on Job Row
let allListings = document.querySelectorAll("li.grid-listing-row");
const attachEventToAllListings = () => {
  allListings.forEach((listing) => {
    listing.addEventListener("click", (e) => {
      document
        .querySelectorAll("li.grid-listing-row")
        .forEach((listing) => listing.classList.remove("current-selected-row"));
      e.currentTarget.classList.add("current-selected-row");
    });
  });
};
attachEventToAllListings();
let loadMoreBtn = document.querySelector("#load-more-btn");
const renderJobs = (data, updateExistingList = true) => {
  // Update message
  if (data && data.jobs && Array.isArray(data.jobs) && data.jobs.length > 0) {
    // Add Updated Jobs
    msgBox.classList.remove("flex");
    msgBox.classList.add("hidden");
    data.jobs.forEach((job, index) => {
      const classList =
        index === 0 && !updateExistingList
          ? "grid-listing-row current-selected-row"
          : "grid-listing-row";
      const li = document.createElement("li");
      li.className = classList;

      for (const [key, value] of Object.entries(job)) {
        li.setAttribute("data-" + key, value);
      }

      const jobDetails = document.createElement("div");
      jobDetails.className = "job-details flex flex-col gap-4";

      const jobTitleId = document.createElement("div");
      jobTitleId.className = "flex flex-col job-title-id";
      const title = document.createElement("h3");
      title.className = "text-lg font-bold";
      title.textContent = job.title;
      const jobId = document.createElement("p");
      jobId.innerHTML = "<strong>Job ID:</strong> " + job.id;

      jobTitleId.appendChild(title);
      jobTitleId.appendChild(jobId);

      const jobLocation = document.createElement("div");
      jobLocation.className = "flex gap-4 job-location";
      const location = document.createElement("div");
      location.className = "flex flex-col";
      location.innerHTML =
        "<p><strong>Location:</strong> " + job.city + ", " + job.state + "</p>";
      const shift = document.createElement("div");
      shift.className = "flex flex-col job-shift";
      shift.innerHTML = "<p><strong>Shift:</strong> " + job.shift + "</p>";
      const weeklyRate = document.createElement("div");
      weeklyRate.className = "flex flex-col job-weekly-rate";
      weeklyRate.innerHTML =
        "<p><strong>Weekly Rate:</strong> $" +
        job.weeklyRate.toFixed(2) +
        "</p>";
      const weeklyHours = document.createElement("div");
      weeklyHours.className = "flex flex-col job-weekly-hours";
      weeklyHours.innerHTML =
        "<p><strong>Weekly Hours:</strong> " + job.weeklyHours + "</p>";

      jobLocation.appendChild(location);
      jobLocation.appendChild(shift);
      jobLocation.appendChild(weeklyRate);
      jobLocation.appendChild(weeklyHours);

      const jobDescription = document.createElement("div");
      jobDescription.className = "job-description";
      jobDescription.innerHTML =
        "<p><strong>Job Description:</strong> " + job.description + "</p>";

      jobDetails.appendChild(jobTitleId);
      jobDetails.appendChild(jobLocation);
      jobDetails.appendChild(jobDescription);

      li.appendChild(jobDetails);
      document.querySelector(".jobs").appendChild(li);
      msgBox.classList.remove("flex");
      msgBox.classList.add("hidden");
      allListings = document.querySelectorAll("li.grid-listing-row");
      attachEventToAllListings();
    });
  } else if (data?.startRecord <= data?.endRecord) {
    msgSpan.textContent =
      "Sorry, we couldn't find any matching jobs for your search.";
    msgBox.classList.remove("hidden");
    msgBox.classList.add("flex");
    loader.classList.add("hidden");
  }
};
// Update Page Title on Parameters Change
// Get the URL parameters
const updatePageTitle = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const discipline = urlParams.has("discipline")
    ? urlParams.get("discipline").split(",")
    : null;
  const speciality = urlParams.has("speciality")
    ? urlParams.get("speciality").split(",")
    : null;
  const city = urlParams.has("city") ? urlParams.get("city").split(",") : null;
  const state = urlParams.has("state")
    ? urlParams.get("state").split(",")
    : null;

  // Create the statement
  let statement = "Travel";
  if (speciality && speciality.length === 1) {
    statement += " " + speciality[0];
  }
  if (discipline && discipline.length === 1) {
    statement += " " + discipline[0];
  }
  statement += " Jobs";
  if (city && city.length === 1) {
    statement += " In " + city[0];
  } else if (state && state.length === 1) {
    statement += " In " + state[0];
  }
  document.querySelector(".page-title").textContent = statement;
};

// watchURLParameterChanges();
let urlParams2 = new URLSearchParams(window.location.search);
const observer = new MutationObserver(function (mutations) {
  // Array of URL parameters to watch for changes
  const parametersToWatch = [
    "discipline",
    "speciality",
    "city",
    "state",
    "lastmodified",
  ];

  // Function to check if any watched parameter has changed
  async function checkParameterChanges() {
    const currentParams = new URLSearchParams(window.location.search);
    for (const param of parametersToWatch) {
      if (urlParams2.get(param) !== currentParams.get(param)) {
        skip = 100;
        updatePageTitle();
        urlParams2 = currentParams;

        const data = await getJobs(0, true);
        renderJobs(data, false);
        break;
      }
    }
  }
  // Check for changes initially
  checkParameterChanges();
});
const config = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
};

// start listening to changes
observer.observe(document, config);

// Load more jobs on scroll
let skip = 100;
function checkIfElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  );
}
window.addEventListener("scroll", async function () {
  let scrollHeight = document.documentElement.scrollHeight;
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let clientHeight = document.documentElement.clientHeight;
  if (
    checkIfElementInViewport(loadMoreBtn) &&
    totalRecords > 0 &&
    prevReqCompleted
  ) {
    prevReqCompleted = false;
    const data = await getJobs(skip);
    renderJobs(data);
    skip += 100;
  }
});
