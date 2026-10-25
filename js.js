
// Create event dates based on today's date
function daysFromNow(days, hour) {
    const date = new Date();

    date.setDate(date.getDate() + days);
    date.setHours(hour, 0, 0, 0);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const time = String(hour).padStart(2, "0");

    return `${year}-${month}-${day}T${time}:00`;
}

// Event data
let events = [
    {
        id: 1,
        title: "React Nairobi Meetup",
        category: "Meetup",
        date: daysFromNow(1, 18),
        venue: "Westlands, Nairobi",
        price: 500,
        spotsLeft: 40
    },
    {
        id: 2,
        title: "Intro to Git and GitHub",
        category: "Workshop",
        date: daysFromNow(3, 10),
        venue: "Kilimani, Nairobi",
        price: 0,
        spotsLeft: 25
    },
    {
        id: 3,
        title: "JavaScript Hackathon",
        category: "Hackathon",
        date: daysFromNow(9, 8),
        venue: "CBD, Nairobi",
        price: 1000,
        spotsLeft: 0
    },
    {
        id: 4,
        title: "Women in Tech Breakfast",
        category: "Meetup",
        date: daysFromNow(-6, 8),
        venue: "Westlands, Nairobi",
        price: 1500,
        spotsLeft: 0
    },
    {
        id: 5,
        title: "Building REST APIs with Django",
        category: "Workshop",
        date: daysFromNow(14, 10),
        venue: "Online",
        price: 0,
        spotsLeft: 120
    },
    {
        id: 6,
        title: "AI in Healthcare",
        category: "Talk",
        date: daysFromNow(5, 17),
        venue: "Upper Hill, Nairobi",
        price: 0,
        spotsLeft: 60
    },
    {
        id: 7,
        title: "Junior Developer Career Fair",
        category: "Career",
        date: daysFromNow(21, 9),
        venue: "CBD, Nairobi",
        price: 0,
        spotsLeft: 300
    },
    {
        id: 8,
        title: "UI/UX Design Sprint",
        category: "Workshop",
        date: daysFromNow(-20, 9),
        venue: "Kilimani, Nairobi",
        price: 2000,
        spotsLeft: 12
    },
    {
        id: 9,
        title: "Mobile Dev Meetup",
        category: "Meetup",
        date: daysFromNow(30, 18),
        venue: "Westlands, Nairobi",
        price: 500,
        spotsLeft: 35
    },
    {
        id: 10,
        title: "Cloud Computing Basics",
        category: "Workshop",
        date: daysFromNow(-1, 14),
        venue: "Online",
        price: 0,
        spotsLeft: 80
    },
    {
        id: 11,
        title: "Open Source Saturday",
        category: "Hackathon",
        date: daysFromNow(45, 9),
        venue: "Karen, Nairobi",
        price: 0,
        spotsLeft: 1
    },
    {
        id: 12,
        title: "Tech Talk: Careers in Data",
        category: "Talk",
        date: daysFromNow(0, 23),
        venue: "Online",
        price: 0,
        spotsLeft: 150
    }
];

// Get the HTML elements
const upcomingSummary = document.getElementById("upcoming-summary");
const upcomingList = document.getElementById("upcoming-list");
const searchInput = document.getElementById("search");
const categoryFilters = document.getElementById("category-filters");
const resultsCount = document.getElementById("results-count");
const eventList = document.getElementById("event-list");

// Store the selected category
let selectedCategory = "All";

// Check whether an event is upcoming
function isUpcoming(event) {
    return new Date(event.date).getTime() >= Date.now();
}

// Format the event date and time
function formatEventDate(dateString) {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

    return `${formattedDate} ${date.getFullYear()} · ${formattedTime}`;
}

// Get the day label
function getDayLabel(dateString) {
    const eventDate = new Date(dateString);
    const today = new Date();

    eventDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const difference = Math.round(
        (eventDate - today) / (1000 * 60 * 60 * 24)
    );

    if (difference === 0) {
        return "Today";
    } else if (difference === 1) {
        return "Tomorrow";
    } else {
        return `In ${difference} days`;
    }
}

// Format the event price
function formatPrice(price) {
    if (price === 0) {
        return "Free";
    }

    return `KES ${price.toLocaleString("en-KE")}`;
}

// Get all upcoming events, soonest first
function getUpcomingEvents() {
    return events
        .filter(isUpcoming)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Sort upcoming events first and past events afterward
function sortForList() {
    return [...events].sort((a, b) => {
        if (isUpcoming(a) && !isUpcoming(b)) {
            return -1;
        }

        if (!isUpcoming(a) && isUpcoming(b)) {
            return 1;
        }

        if (isUpcoming(a) && isUpcoming(b)) {
            return new Date(a.date) - new Date(b.date);
        }

        return new Date(b.date) - new Date(a.date);
    });
}

// Get categories from the event data
function getCategories() {
    const categories = events.map(event => event.category);

    return ["All", ...new Set(categories)];
}

// Create an element and add text to it
function createTextElement(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;

    if (className) {
        element.className = className;
    }

    return element;
}

// Create an event card
function createEventCard(event, isNextUp = false) {
    const card = document.createElement("div");
    card.className = "event-card";

    // Show Next up on the first upcoming event
    if (isNextUp) {
        card.appendChild(
            createTextElement("span", "Next up", "next-label")
        );
    }

    card.appendChild(
        createTextElement("h3", event.title)
    );

    card.appendChild(
        createTextElement("p", `Category: ${event.category}`)
    );

    card.appendChild(
        createTextElement("p", formatEventDate(event.date))
    );

    card.appendChild(
        createTextElement("p", `Venue: ${event.venue}`)
    );

    card.appendChild(
        createTextElement("p", `Price: ${formatPrice(event.price)}`)
    );

    card.appendChild(
        createTextElement("p", getDayLabel(event.date), "day-label")
    );

    return card;
}

// Display the next three upcoming events
function displayUpcomingEvents() {
    upcomingList.replaceChildren();

    const upcomingEvents = getUpcomingEvents();

    if (upcomingEvents.length === 0) {
        upcomingSummary.textContent =
            "No upcoming events. Check back soon.";
        return;
    }

    const nextEventLabel = getDayLabel(upcomingEvents[0].date);

    upcomingSummary.textContent =
        `${upcomingEvents.length} upcoming events. ` +
        `The next one is ${nextEventLabel.toLowerCase()}.`;

    upcomingEvents.slice(0, 3).forEach((event, index) => {
        const card = createEventCard(event, index === 0);
        upcomingList.appendChild(card);
    });
}

// Create the category filter buttons
function displayCategoryFilters() {
    categoryFilters.replaceChildren();

    getCategories().forEach(category => {
        const button = createTextElement(
            "button",
            category,
            "filter-btn"
        );

        button.type = "button";
        button.dataset.category = category;

        if (category === selectedCategory) {
            button.classList.add("active");
        }

        categoryFilters.appendChild(button);
    });
}

// Display all events
function displayAllEvents() {
    eventList.replaceChildren();

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredEvents = sortForList().filter(event => {
        const matchesSearch = event.title
            .toLowerCase()
            .includes(searchTerm);

        const matchesCategory =
            selectedCategory === "All" ||
            event.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    resultsCount.textContent =
        `${filteredEvents.length} event(s) found`;

    if (filteredEvents.length === 0) {
        const message = document.createElement("li");
        message.className = "no-results";
        message.textContent =
            `No events match "${searchInput.value.trim()}".`;

        eventList.appendChild(message);
        return;
    }

    filteredEvents.forEach(event => {
        const listItem = document.createElement("li");

        if (!isUpcoming(event)) {
            listItem.classList.add("past-event");
        }

        listItem.appendChild(
            createTextElement("h3", event.title)
        );

        listItem.appendChild(
            createTextElement("p", `Category: ${event.category}`)
        );

        listItem.appendChild(
            createTextElement("p", formatEventDate(event.date))
        );

        listItem.appendChild(
            createTextElement("p", `Venue: ${event.venue}`)
        );

        listItem.appendChild(
            createTextElement("p", `Price: ${formatPrice(event.price)}`)
        );

        // Past events display Ended
        if (!isUpcoming(event)) {
            listItem.appendChild(
                createTextElement("p", "Ended", "event-status")
            );
        } else {
            listItem.appendChild(
                createTextElement(
                    "p",
                    `Available spots: ${event.spotsLeft}`
                )
            );

            const button = createTextElement(
                "button",
                event.spotsLeft === 0 ? "Fully booked" : "Register",
                "register-btn"
            );

            button.type = "button";
            button.dataset.id = event.id;
            button.disabled = event.spotsLeft === 0;

            listItem.appendChild(button);
        }

        eventList.appendChild(listItem);
    });
}

// Register for an event
function registerForEvent(id) {
    const event = events.find(event => event.id === id);

    if (event && isUpcoming(event) && event.spotsLeft > 0) {
        event.spotsLeft--;

        // Refresh both sections to show updated information
        displayUpcomingEvents();
        displayAllEvents();
    }
}

// Search as the user types
searchInput.addEventListener("input", displayAllEvents);

// Handle category button clicks
categoryFilters.addEventListener("click", function (event) {
    if (event.target.classList.contains("filter-btn")) {
        selectedCategory = event.target.dataset.category;

        displayCategoryFilters();
        displayAllEvents();
    }
});

// Event delegation for Register buttons
eventList.addEventListener("click", function (event) {
    if (event.target.classList.contains("register-btn")) {
        const eventId = Number(event.target.dataset.id);

        registerForEvent(eventId);
    }
});

// Display the events when the page loads
displayCategoryFilters();
displayUpcomingEvents();
displayAllEvents();
