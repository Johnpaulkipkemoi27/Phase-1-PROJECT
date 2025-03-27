document.addEventListener('DOMContentLoaded', () => {
    const viewToursButton = document.getElementById('view-tours');
    const addTourButton = document.getElementById('add-tour');
    const tourList = document.getElementById('tour-list');
    const toursSection = document.getElementById('tours');
    const homeSection = document.getElementById('home');
    const baseURL='https://p-iota-two.vercel.app/tours';
    // Array of beautiful image URLs for tours
    const images = [
        './images/safari.jpg',  // Safari
        './images/beach.jpg',  // Beach
        './images/mountain.jpg',  // Mountain
        './images/cityview.jpg',  // City view
        './images/foresthike.jpg',  // Forest hike
        './images/deserttour.jpg',  // Desert tour
        './images/lakeview.jpg',  // Lake view
        './images/islandtour.jpg',  // Island tour
        './images/hiking.jpg',  // Hiking
        './images/culture.jpg',  // culture
        './images/Resort.jpg',  // Resort tour
        './images/pyramids.jpg',  // Pyramids tour
        './images/skiing.jpg',  // Skiing
        './images/cruise.jpg',  // cruise
        './images/adventure.jpg',  // Adventure 
    ];

    // Event listener for viewing tours
    viewToursButton.addEventListener('click', () => {
        homeSection.classList.add('hidden');
        toursSection.classList.remove('hidden');
        fetchTours(); 
    });

    // Event listener for adding a new tour
    addTourButton.addEventListener('click', () => {
        const newTour = prompt("Enter the new tour name:");
        if (newTour) {
            createTour(newTour); 
        }
    });

    // Fetch Tours (Read Operation)
    function fetchTours() {
        fetch(baseURL)
            .then(response => response.json())
            .then(data => {
                tourList.innerHTML = '';
                data.slice(0, 30).forEach((tour,index) => {
                    const tourCard = document.createElement('div');
                    tourCard.classList.add('tour-card');
                    tourCard.innerHTML = `
                        <img src="${images[index]}" alt="Tour Image" class="tour-image"/>
                        <h3>${tour.title}</h3>
                        <h3>${tour.price}</h3>
                        <p>${tour.description}</p>
                        <h3>${tour.location}</h3>             
                        <button class="book-tour" data-id="${tour.id}">Book</button>
                        <button class="delete-tour" data-id="${tour.id}">Delete</button>
                    `;
                    tourList.appendChild(tourCard);
                });
                addTourEventListeners(); 
            })
            .catch(error => console.error('Error fetching tours:', error));
    }
    // 

    // Create Tour (Create Operation)
    function createTour(tourName) {
        const newTour = { title: tourName, body: "Tour details will be added soon." };
        fetch(`${baseURL}/${id}`,{
             method: 'POST',
            body: JSON.stringify(newTour),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                alert("New tour added successfully!");
                fetchTours(); 
            })
            .catch(error => console.error('Error creating tour:', error));
    }

    // Book Tour (Update Operation)
    function bookTour(id, newTitle) {
        const bookedTour = { title: newTitle, body: "Booked tour." };
        fetch(`${baseURL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(bookedTour),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                alert("Tour booked successfully!");
                fetchTours(); 
            })
            .catch(error => console.error('Error booking tour:', error));
    }

    // Delete Tour (Delete Operation)
    function deleteTour(id) {
        fetch(`${baseURL}/${id}`,{
            method: 'DELETE'
        })
            .then(() => {
                alert("Tour deleted successfully!");
                fetchTours(); 
            })
            .catch(error => console.error('Error deleting tour:', error));
    }

    // Add event listeners for book and delete buttons
    function addTourEventListeners() {
        const bookButtons = document.querySelectorAll('.book-tour');
        const deleteButtons = document.querySelectorAll('.delete-tour');

        bookButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tourId = button.getAttribute('data-id');
                const newTitle = prompt("Enter the Travel date:");
                if (newTitle) {
                    bookTour(tourId, newTitle); 
                }
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tourId = button.getAttribute('data-id');
                if (confirm("Are you sure you want to delete this tour?")) {
                    deleteTour(tourId); 
                }
            });
        });
    }
});
