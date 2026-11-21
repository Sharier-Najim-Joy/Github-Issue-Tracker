let allIssues = [];

const createLabels = (arr) => {
    const element = arr.map(
        (ele) =>
            `<span class="btn border border-red-200 bg-red-50 text-red-500 rounded-full px-3 py-1 text-sm">${ele}</span>`,
    );
    return element.join(" ");
};

const loadingSpinner = (status) => {
    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("displayCard").classList.add("hidden");
    } else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("displayCard").classList.remove("hidden");
    }
};

const loadAllIssue = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const response = await fetch(url);
    const data = await response.json();
    const allData = data.data;
    // console.log(allData);
    allIssues = allData;
    showIssues(allIssues);
};

const removeActive = () => {
    const removeButtons = document.querySelectorAll(".group-button");
    removeButtons.forEach((btn) => {
        btn.classList.remove("active");
    });
};

const showIssues = (issues) => {
    loadingSpinner(true);
    // console.log(issues);
    const card = document.getElementById("displayCard");
    card.innerHTML = "";
    // card.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3";
    const totalIssue = document.getElementById("total-issue");
    totalIssue.innerText = issues.length;

    if (issues.length === 0) {
        card.innerHTML = `
       <div class="text-2xl font-bold p-10 flex justify-center items-center w-full">
                <h1 class="text-center text-red-500">Noting to Find It!!!</h1>
            </div>
        `;
        loadingSpinner(false);
        return;
    }

    issues.map((issue) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div
                        class="card bg-white border border-gray-200 border-t-4 ${issue.status === "open" ? "border-t-[#00A96E]" : "border-t-[#A855F7]"} shadow-md rounded-xl overflow-hidden w-full h-full" onclick="singleData(${issue.id})"
                    >
                        <!-- Card Body -->
                        <div class="card-body p-5">
                            <!-- Status & Priority -->
                            <div class="flex justify-between items-center">
                                <!-- Status Icon -->
                                <div
                                    class="w-8 h-8 rounded-full flex items-center justify-center"
                                >
                                ${issue.status === "open" ? '<img src="./assets/Open-Status.png" alt=""></img>' : '<img src="./assets/Closed- Status .png" alt=""></img>'}
                                
                                </div>

                                <!-- Priority -->

                                ${
                                    issue.priority === "high"
                                        ? ` <span class="bg-red-50 text-red-500 rounded-full px-6 py-1 text-sm font-medium">
                                            ${issue.priority}
                                        </span>`
                                        : ""
                                }
                                ${
                                    issue.priority === "medium"
                                        ? ` <span class="bg-orange-50 text-orange-500 rounded-full px-6 py-1 text-sm font-medium">
                                            ${issue.priority}
                                        </span>`
                                        : ""
                                }
                                ${
                                    issue.priority === "low"
                                        ? ` <span class="bg-gray-50 text-gray-500 rounded-full px-6 py-1 text-sm font-medium">
                                            ${issue.priority}
                                        </span>`
                                        : ""
                                }
                                
                             
                            </div>

                            <!-- Title -->
                            <h2
                                class="text-lg font-semibold text-gray-800 leading-6 mt-2"
                            >
                                ${issue.title}
                            </h2>

                            <!-- Description -->
                            <p class="text-gray-500 text-base leading-5">
                                 ${issue.description}
                            </p>

                            <!-- Labels -->
                            <div class="flex flex-wrap gap-2 mt-2">
                            ${createLabels(issue.labels)}
                            </div>
                        </div>

                        <!-- Card Footer -->
                        <div class="border-t border-gray-200 px-5 py-4">
                            <p class="text-sm text-gray-500">#${issue.id} by  ${issue.author}</p>

                            <p class="text-sm text-gray-500 mt-2">  ${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
                        </div>
                    </div>
        `;
        card.append(div);
        loadingSpinner(false);
    });
};

const singleData = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const items = data.data;
    detailsInModal(items);
};

const detailsInModal = (item) => {
    // console.log(item);
    const detailContainer = document.getElementById("details-container");
    detailContainer.innerHTML = `
     <div class="p-3 sm:p-6">
                    <!-- Content Wrapper -->
                    <div
                        class="border border-dotted border-blue-400 p-3 sm:p-5"
                    >
                        <!-- Title -->
                        <h2
                            class="text-xl sm:text-2xl font-bold text-gray-800 mb-2 break-words"
                        >
                            ${item.title}
                        </h2>

                        <!-- Status -->
                        <div
                            class="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mb-5 sm:mb-7"
                        >
                            <span
                                class="badge badge-success text-white border-none shrink-0"
                            >
                                ${item.status}
                            </span>

                            <span>•</span>

                            <span class="break-words">
                                Opened by ${item.author}
                            </span>

                            <span>•</span>

                            <span class="shrink-0">
                                ${new Date(item.createdAt).toLocaleDateString(
                                    "en-US",
                                )}
                            </span>
                        </div>

                        <!-- Labels -->
                        <div class="flex flex-wrap gap-2 mb-5 sm:mb-7">
                            ${createLabels(item.labels)}
                        </div>

                        <!-- Description -->
                        <p
                            class="text-gray-500 text-base md:text-lg leading-relaxed mb-5 sm:mb-7 break-words"
                        >
                            ${item.description}
                        </p>

                        <!-- Assignee & Priority -->
                        <div
                            class="bg-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-5 rounded-lg"
                        >
                            <!-- Assignee -->
                            <div class="min-w-0">
                                <p class="text-gray-500 mb-1">Assignee:</p>

                                <h3
                                    class="font-semibold text-gray-800 text-base sm:text-lg break-words"
                                >
                                    ${item.assignee || item.author}
                                </h3>
                            </div>

                            <!-- Priority -->
                            <div class="min-w-0">
                                <p class="text-gray-500 mb-1">Priority:</p>

                                ${
                                    item.priority === "high"
                                        ? `
                                <span
                                    class="bg-red-50 text-red-500 rounded-full px-6 py-1 text-sm font-medium inline-block"
                                >
                                    ${item.priority}
                                </span>
                                `
                                        : ""
                                } ${
                                    item.priority === "medium"
                                        ? `
                                <span
                                    class="bg-orange-50 text-orange-500 rounded-full px-6 py-1 text-sm font-medium inline-block"
                                >
                                    ${item.priority}
                                </span>
                                `
                                        : ""
                                } ${
                                    item.priority === "low"
                                        ? `
                                <span
                                    class="bg-gray-50 text-gray-500 rounded-full px-6 py-1 text-sm font-medium inline-block"
                                >
                                    ${item.priority}
                                </span>
                                `
                                        : ""
                                }
                            </div>
                        </div>

                        <!-- Close Button -->
                        <div class="modal-action mt-5 sm:mt-7">
                            <form method="dialog" class="w-full sm:w-auto">
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn w-full sm:w-auto">
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

    `;

    document.getElementById("my_modal_5").showModal();
};

document.getElementById("all-button").addEventListener("click", (e) => {
    removeActive();

    // const clickBtn = document.getElementById("all-button");
    e.target.classList.add("active");
    showIssues(allIssues);
});

document.getElementById("open-button").addEventListener("click", (e) => {
    removeActive();

    // const clickBtn = document.getElementById("open-button");
    e.target.classList.add("active");
    const openIssues = allIssues.filter((issue) => issue.status === "open");
    showIssues(openIssues);
});

document.getElementById("closed-button").addEventListener("click", (e) => {
    removeActive();

    // const clickBtn = document.getElementById("closed-button");
    e.target.classList.add("active");
    const closedIssues = allIssues.filter((issue) => issue.status === "closed");
    showIssues(closedIssues);
});

loadAllIssue();

document
    .getElementById("searchInput")
    .addEventListener("input", async (event) => {
        removeActive();
        const searchText = event.target.value.toLowerCase();
        const url =
            searchText === ""
                ? "https://phi-lab-server.vercel.app/api/v1/lab/issues"
                : `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
        const response = await fetch(url);
        const data = await response.json();
        showIssues(data.data);
    });
