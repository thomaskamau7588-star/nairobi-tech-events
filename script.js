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
