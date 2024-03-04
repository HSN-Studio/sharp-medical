// q: how to get first array item?

import {
  usStates,
  usCities,
} from "https://sharpmedicalstaffing.com/wp-content/themes/sharp/sharp-medical/constants/index.js";

const usCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
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

new MultiSelectTag("specialty", {
  rounded: true, // default true
  shadow: true, // default false
  placeholder: "Select or Search Specialty", // default Search...
  tagColor: {
    textColor: "rgb(33, 37, 41)",
    borderColor: "#18b9e2",
    bgColor: "#80e0dc",
  },

  onChange: function (values) {
    // Get Selected specialty options from Input
    const specialtyParameters = decodeURIComponent(
      values
        .map((paramObj) => {
          return paramObj.value;
        })
        .join(",")
      // .toLowerCase()
    );
    // Get the current URL
    let url = new URL(window.location.href);

    // Update the "specialty" URL parameter value
    url.searchParams.set("specialty", specialtyParameters);
    // Delete URL parameter if not present
    if (specialtyParameters === "") {
      url.searchParams.delete("specialty");
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
  const specialty = document.getElementById("specialty").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("discipline", discipline);
  urlParams.set("specialty", specialty);
  urlParams.set("city", city);
  urlParams.set("state", state);

  history.replaceState(null, null, "?" + urlParams.toString());
}

// Get Last Modified Date
document.querySelector("#last-modified").addEventListener("change", (e) => {
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
    specialty: urlParams.get("specialty")?.toString()?.split(",") || null,
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
    Specialty: parameters.specialty,
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

// Update Current Job in Quick Apply
const quickApplyCurrentItem = document.querySelector(
  ".quick-apply-current-item-view"
);

const updateCurrentQuickApplyItem = (listing, data = null) => {
  const quickApplyJobDetailsLink = document.querySelector(
    ".quick-apply-full-job-details-link"
  );
  quickApplyCurrentItem.innerHTML = "";
  let jobHtml = "";
  if (listing) {
    const listingAttributes = listing.dataset;
    const {
      id,
      title,
      start,
      city,
      state,
      weeklyrate,
      weeklyhours,
      shift,
      lastmodifieddate,
      description,
      discipline,
      specialty,
    } = listingAttributes;
    jobHtml = `
    <div class="quick-apply-job-title h3">${title}</div>
    <div class="quick-apply-job-weekly-rate gradient-text h5"><strong>${usCurrencyFormatter.format(
      Number(weeklyrate).toFixed(2)
    )}
    </strong> wk</div>
    <div class="flex flex-wrap gap-4 mt-8">
        <div class="quick-apply-job-location"><strong>Location: </strong>${city}, ${state}</div>
        <div class="quick-apply-job-shift"><strong>Shift: </strong>${shift}</div>
    <div class="flex flex-wrap gap-4">
        <div class="quick-apply-job-start-date"><strong>Start Date: </strong>${start}</div>
        <div class="quick-apply-job-last-modified"><strong>Last Updated: </strong>${new Date(
          lastmodifieddate
        ).toLocaleString()}</div>
        </div>
    </div>
        <div class="quick-apply-job-id w-full my-2"><strong>Job ID:</strong> ${id} </div>
        <div class="quick-apply-job-description my-2"><strong>Description: </strong>${description}</div>
`;
    quickApplyJobDetailsLink.href = `https://sharpmedicalstaffing.com/apply-to-travel-medical-job/?discipline=${discipline}&specialty=${specialty}&city=${city}&state=${state}&id=${id}`;
  }
  if (data) {
    const {
      id,
      title,
      specialty,
      start,
      city,
      state,
      weeklyRate,
      weeklyHours,
      description,
      shift,
      lastModifiedDate,
      discipline,
    } = data;
    jobHtml = `
    <div class="quick-apply-job-title h3">${title}</div>
    <div class="quick-apply-job-weekly-rate gradient-text h5"><strong>${usCurrencyFormatter.format(
      Number(weeklyRate).toFixed(2)
    )}
    </strong> wk</div>
    <div class="flex flex-wrap gap-4 mt-8">
        <div class="quick-apply-job-location"><strong>Location: </strong>${city}, ${state}</div>
        <div class="quick-apply-job-shift"><strong>Shift: </strong>${shift}</div>
    <div class="flex flex-wrap gap-4">
        <div class="quick-apply-job-start-date"><strong>Start Date: </strong>${new Date(
          start
        ).toLocaleString()}</div>
        <div class="quick-apply-job-last-modified"><strong>Last Updated: </strong>${new Date(
          lastModifiedDate
        ).toLocaleString()}</div>
        </div>
    </div>

        <div class="quick-apply-job-id w-full my-2"><strong>Job ID:</strong> ${id} </div>
        <div class="quick-apply-job-description my-2"><strong>Description: </strong>${description}</div>
`;
    quickApplyJobDetailsLink.href = `https://sharpmedicalstaffing.com/find-travel-medical-job/?discipline=${discipline}&specialty=${specialty}&id=${id}`;
  }

  quickApplyCurrentItem.innerHTML = jobHtml;
};
// Toggle Active Class on Job Row
let allListings = document.querySelectorAll("li.grid-listing-row");
const attachEventToAllListings = () => {
  allListings.forEach((listing) => {
    listing.addEventListener("click", (e) => {
      document
        .querySelectorAll("li.grid-listing-row")
        .forEach((listing) => listing.classList.remove("current-selected-row"));
      e.currentTarget.classList.add("current-selected-row");
      updateCurrentQuickApplyItem(listing);
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
      jobLocation.className = "flex flex-wrap gap-4 job-location";
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
        "<p><strong>Weekly Rate:</strong>" +
        usCurrencyFormatter.format(Number(job.weeklyRate).toFixed(2)) +
        "</p>";
      const weeklyHours = document.createElement("div");
      weeklyHours.className = "flex flex-col job-weekly-hours";
      weeklyHours.innerHTML =
        "<p><strong>Weekly Hours:</strong> " + job.weeklyHours + "</p>";

      jobLocation.appendChild(location);
      jobLocation.appendChild(shift);
      jobLocation.appendChild(weeklyRate);
      jobLocation.appendChild(weeklyHours);

      jobDetails.appendChild(jobTitleId);
      jobDetails.appendChild(jobLocation);
      const interestedLink = document.createElement("a");
      interestedLink
        ? (interestedLink.href = `https://sharpmedicalstaffing.com/apply-to-travel-medical-job/?discipline=${job.discipline}&specialty=${job.specialty}&city=${job.city}&state=${job.state}&id=${job.id}`)
        : null;
      interestedLink ? (interestedLink.target = "_blank") : null;
      const interestedLinkBtn = `<div class="interested-btn-container max-sm:flex md:hidden"><button class="btn-gradient btn-lg rounded-pill hover-highlight quick-apply-submit-button">Interested</button></div>`;
      interestedLink ? (interestedLink.innerHTML = interestedLinkBtn) : null;
      li.appendChild(jobDetails);
      li.appendChild(interestedLink);

      document.querySelector(".jobs").appendChild(li);
      msgBox.classList.remove("flex");
      msgBox.classList.add("hidden");

      // Update Quick Apply Job with first Search Result
      index === 0 && updateCurrentQuickApplyItem(false, data.jobs[0]);
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
  const specialty = urlParams.has("specialty")
    ? urlParams.get("specialty").split(",")
    : null;
  const city = urlParams.has("city") ? urlParams.get("city").split(",") : null;
  const state = urlParams.has("state")
    ? urlParams.get("state").split(",")
    : null;

  // Create the statement
  let statement = "Travel";
  if (specialty && specialty.length === 1) {
    statement += " " + specialty[0];
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

// Fetch Function
const fetchData = async (endpoint) => {
  return await fetch(endpoint)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error Fetching Data, Response not ok!");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
};
// Function to delete parameter
function removeUrlParameter(key) {
  // Get the current URL
  let url = window.location.href;

  // Remove the parameter and its value
  url = url
    .replace(new RegExp("[?&]" + key + "=[^&#]*(#.*)?$"), "$1")
    .replace(new RegExp("([?&])" + key + "=[^&]*&"), "$1");

  // If the parameter was the only one in the URL, remove the '?' or '&' at the end
  url = url.replace(/(\?|&)$/, "");

  // Update the URL without refreshing the page
  window.history.replaceState({ path: url }, "", url);
}
// Function to create/update multi select
const updateMultiSelect = (specialties) => {
  //remove previous
  document.querySelector("#specialty+.mult-select-tag").remove();

  new MultiSelectTag("specialty", {
    rounded: true, // default true
    shadow: true, // default false
    placeholder: "Select or Search Specialty", // default Search...
    tagColor: {
      textColor: "rgb(33, 37, 41)",
      borderColor: "#18b9e2",
      bgColor: "#80e0dc",
    },
    onChange: function (values) {
      // Get Selected specialty options from Input
      const specialtyParameters = decodeURIComponent(
        values
          .map((paramObj) => {
            return paramObj.value;
          })
          .join(",")
        // .toLowerCase()
      );
      // Get the current URL
      let url = new URL(window.location.href);

      // Update the "specialty" URL parameter value
      url.searchParams.set("specialty", specialtyParameters);
      // Delete URL parameter if not present
      if (specialtyParameters === "") {
        url.searchParams.delete("specialty");
      }
      //update URL
      history.replaceState(null, null, url);
    },
  });
};
// Update Specialty Options on Discipline Parameter Change
const updateSpecialtyOptions = () => {
  const specialtyInput = document.querySelector("#specialty");
  const urlParams = new URLSearchParams(window.location.search);
  removeUrlParameter("specialty");
  // removeUrlParameter("specialty");
  const discipline = urlParams.has("discipline")
    ? urlParams.get("discipline").split(",")
    : null;
  specialtyInput.innerHTML = "";
  if (discipline) {
    discipline.forEach((discipline) => {
      fetch(
        `https://sharpjobs.azurewebsites.net/api/specialty?discipline=${discipline}`
      )
        .then((res) => res.json())
        .then((specialties) => {
          specialties.forEach((specialty) => {
            const option = document.createElement("option");
            option.value = specialty.name; // Set the value attribute
            option.textContent = specialty.name; // Set the text content
            specialtyInput.appendChild(option); // Append the option to the select element
          });
          updateMultiSelect(specialties);
        });
    });
  }
  if (!discipline) {
    fetch(`https://sharpjobs.azurewebsites.net/api/specialty`)
      .then((res) => res.json())
      .then((specialties) => {
        specialties.forEach((specialty) => {
          const option = document.createElement("option");
          option.value = specialty.name; // Set the value attribute
          option.textContent = specialty.name; // Set the text content
          specialtyInput.appendChild(option); // Append the option to the select element
        });
        updateMultiSelect(specialties);
      });
  }
};
// watchURLParameterChanges();
let urlParams2 = new URLSearchParams(window.location.search);
const observer = new MutationObserver(function (mutations) {
  // Array of URL parameters to watch for changes
  const parametersToWatch = [
    "discipline",
    "specialty",
    "city",
    "state",
    "lastmodified",
  ];

  // Function to check if any watched parameter has changed
  async function checkParameterChanges() {
    const currentParams = new URLSearchParams(window.location.search);
    for (const param of parametersToWatch) {
      if (urlParams2.get(param) !== currentParams.get(param)) {
        urlParams2 = currentParams;
        param == "discipline" && updateSpecialtyOptions();
        skip = 100;
        updatePageTitle();

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
function checkIfFooterInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - rect.height
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
const jobsFiltersContainer = document.querySelector(".jobs-filters-container");
const quickApplyContainer = document.querySelector(".quick-apply-container");
const footer = document.querySelector("#footer");
window.addEventListener("scroll", async function () {
  let scrollHeight = document.documentElement.scrollHeight;
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let clientHeight = document.documentElement.clientHeight;
  if (
    elementInViewport(jobsFiltersContainer) ||
    elementInViewport(msgBox) ||
    checkIfFooterInViewport(footer)
  ) {
    quickApplyContainer.classList.remove("quick-apply-container-fixed");
  } else {
    !quickApplyContainer.classList.contains("quick-apply-container-fixed") &&
      quickApplyContainer.classList.add("quick-apply-container-fixed");
  }
  if (elementInViewport(loadMoreBtn) && totalRecords > 0 && prevReqCompleted) {
    prevReqCompleted = false;
    const data = await getJobs(skip);
    renderJobs(data);
    skip += 100;
  }
});

/* Highlight Hover Effect  */

// const quickApplySubmit = document.querySelector(".quick-apply-submit");
// const quickApplySubmitHighlight = document.querySelector(".highlight");

// quickApplySubmit.addEventListener("mousemove", (e) => {
//   let rect = e.target.getBoundingClientRect();
//   const left = e.clientX - rect.left;
//   const top = e.clientY - rect.top;
//   quickApplySubmitHighlight.style.top = `${top}px`;
//   quickApplySubmitHighlight.style.left = `${left}px`;
// });
