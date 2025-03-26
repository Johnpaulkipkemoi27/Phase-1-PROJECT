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
    ];

    // Event listener for viewing tours
    viewToursButton.addEventListener('click', () => {
        homeSection.classList.add('hidden');
        toursSection.classList.remove('hidden');
        fetchTours(); // Fetch the tours from the "API"
    });

    // Event listener for adding a new tour
    addTourButton.addEventListener('click', () => {
        const newTour = prompt("Enter the new tour name:");
        if (newTour) {
            createTour(newTour); // Create a new tour
        }
    });

    // Fetch Tours (Read Operation)
    function fetchTours() {
        fetch('https://p-iota-two.vercel.app/tours') // Mock API endpoint
            .then(response => response.json())
            .then(data => {
                tourList.innerHTML = '';
                data.slice(0, 10).forEach((tour, index) => {
                    const tourCard = document.createElement('div');
                    tourCard.classList.add('tour-card');
                    tourCard.innerHTML = `
                        <img src="${images[index]}" alt="Tour Image" class="tour-image"/>
                        <h3>${tour.title}</h3>
                        <p>${tour.description}</p>
                        <button class="edit-tour" data-id="${tour.id}">Edit</button>
                        <button class="delete-tour" data-id="${tour.id}">Delete</button>
                    `;
                    tourList.appendChild(tourCard);
                });
                addTourEventListeners(); // Add event listeners after rendering
            })
            .catch(error => console.error('Error fetching tours:', error));
    }

    // Create Tour (Create Operation)
    function createTour(tourName) {
        const newTour = { title: tourName, body: "Tour details will be added soon." };
        fetch('https://p-iota-two.vercel.app/tours', {
            method: 'POST',
            body: JSON.stringify(newTour),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                alert("New tour added successfully!");
                fetchTours(); // Fetch tours again after creation
            })
            .catch(error => console.error('Error creating tour:', error));
    }

    // Update Tour (Update Operation)
    function updateTour(id, newTitle) {
        const updatedTour = { title: newTitle, body: "Updated details of the tour." };
        fetch(`https://p-iota-two.vercel.app/tours/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTour),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                alert("Tour updated successfully!");
                fetchTours(); // Fetch tours again after update
            })
            .catch(error => console.error('Error updating tour:', error));
    }

    // Delete Tour (Delete Operation)
    function deleteTour(id) {
        fetch(`https://p-iota-two.vercel.app/tours/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                alert("Tour deleted successfully!");
                fetchTours(); // Fetch tours again after deletion
            })
            .catch(error => console.error('Error deleting tour:', error));
    }

    // Add event listeners for edit and delete buttons
    function addTourEventListeners() {
        const editButtons = document.querySelectorAll('.edit-tour');
        const deleteButtons = document.querySelectorAll('.delete-tour');

        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tourId = button.getAttribute('data-id');
                const newTitle = prompt("Enter the new title for the tour:");
                if (newTitle) {
                    updateTour(tourId, newTitle); // Update tour
                }
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tourId = button.getAttribute('data-id');
                if (confirm("Are you sure you want to delete this tour?")) {
                    deleteTour(tourId); // Delete tour
                }
            });
        });
    }
});
