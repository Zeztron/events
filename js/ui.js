class UI {
    constructor() {
        // App initialization
        this.init();
    }
    // Method when app is started
    init() {
        // display categories in <select>
        this.printCategories();
        // select the results
        this.result = document.getElementById("result");
    }
    // Display events from the API
    displayEvents(events) {
        // Build the template
        let HTMLTemplate = '';
        // Loop events and print the results
        events.forEach(eventInfo => {
            HTMLTemplate += `
                <div class="col-md-4 mt-4">
                    <div class="card">
                        <div class="card-body">
                            <img class="img-fluid mg-2" src="${eventInfo.logo !== null ? eventInfo.logo.url: ""}">
                        </div>
                        <div class="card-body text-dark">
                            <div class="card-text">
                                <h2 class="text-center card-title">${eventInfo.name.text}</h2>
                                <p class="lead text-info">Event Information:</p>
                                <p>${eventInfo.description.text.substring(0,200)}...</p>
                                <span class="badge badge-info mb-4">Date & Time: ${eventInfo.start.local}</span>
                                <a href="${eventInfo.url}" target="_blank" class="btn btn-outline-info btn-block mb-4">Get Tickets</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        this.result.innerHTML = HTMLTemplate;
    }
    printCategories() {
        const categoriesList = eventbrite.getCategoriesAPI()
        .then(categories => {
            const categoriesList = categories.categories.categories;
            const categoriesSelect = document.querySelector("#category");

            categoriesList.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id;
                option.appendChild(document.createTextNode(category.name));
                categoriesSelect.appendChild(option);
            });
        })
        .catch(error => console.log(error));
    }

    printMessage(message, className) {
        // create a div
        const div = document.createElement("div");
        div.className = className;
        // add the text
        div.appendChild(document.createTextNode(message));
        // Insert into the HTML
        const searchDiv = document.querySelector("#search-events");
        searchDiv.appendChild(div);
        // remove the alert after 3 seconds
        setTimeout(() => {
            this.removeMessage();
        }, 3000);
    }
    // Remove the message
    removeMessage() {
        const alert = document.querySelector(".alert");
            if(alert) {
                alert.remove();
            }
    }
}