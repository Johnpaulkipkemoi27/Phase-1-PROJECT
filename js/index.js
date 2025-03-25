document.addEventListener('DOMContentLoaded', () => {
    const viewToursButton = document.getElementById('view-tours');
    const addTourButton = document.getElementById('add-tour');
    const tourList = document.getElementById('tour-list');
    const toursSection = document.getElementById('tours');
    const homeSection = document.getElementById('home');

    // Array of beautiful image URLs for tours
    const images = [
        './images/safari.jpg',  // Safari
        "https://i.pinimg.com/736x/5a/66/d1/5a66d1526d38f309dbe4b84b786bbdb4.jpg",  // Beach
        "https://i.pinimg.com/736x/4a/8c/80/4a8c8041a8802e73171865eb4a38c941.jpg",  // Mountain
        "https://i.pinimg.com/736x/6a/fb/ea/6afbea984e655d849413f8f4239fa275.jpg",  // City view
        "https://i.pinimg.com/736x/41/5e/f8/415ef8b0b37ee736ac026644d5f945a6.jpg",  // Forest hike
        "https://i.pinimg.com/736x/37/c6/3d/37c63d81dd5a067d87a440a95ef2ad8d.jpg",  // Desert tour
        "https://i.pinimg.com/736x/93/98/1f/93981fda1884e466f53b039ba9d08170.jpg",  // Lake view
        "https://i.pinimg.com/736x/04/af/8f/04af8f55d834435ee58b247b277a5f74.jpg",  // Island tour
        "https://i.pinimg.com/736x/6d/51/40/6d5140c75b0b0daa3545bfd18d2d5e00.jpg",  // Hiking
        "https://i.pinimg.com/736x/cd/d6/b7/cdd6b7d99fd609fa065bc38c73fac6c9.jpg"   // culture
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
        fetch('http://localhost:3000/tours') // Mock API endpoint
            .then(response => response.json())
            .then(data => {
                tourList.innerHTML = '';
                data.slice(0, 10).forEach((tour, index) => {
                    const tourCard = document.createElement('div');
                    tourCard.classList.add('tour-card');
                    tourCard.innerHTML = `
                        <img src="${images[index]}" alt="Tour Image" class="tour-image"/>
                        <h3>${tour.title}</h3>
                        <p>${tour.body}</p>
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
        fetch('http://localhost:3000/tours', {
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
        fetch(`https://localhost:3000/tours/${id}`, {
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
        fetch(`https://localhost:3000/tours/${id}`, {
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
