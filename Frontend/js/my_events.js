document.addEventListener("DOMContentLoaded", function () {
    const organizer_id = sessionStorage.getItem("organizer_id");
    const token = sessionStorage.getItem('token');
    const eventsList = document.getElementById("eventsList");
    const userName = document.getElementById("userName");

    const loadEvents = async () => {
        try {
            const response = await fetch(`http://0.0.0.0:8000/api/v1/events/organizer/${organizer_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar eventos');
            }

            const data = await response.json();
            displayEvents(data.eventos);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: error.message || 'Ocorreu um erro ao buscar os eventos'
            });
        }
    };

    const displayEvents = (events) => {
        eventsList.innerHTML = '';
        if (events.length === 0) {
            eventsList.innerHTML = '<p>Nenhum evento encontrado.</p>';
            return;
        }

        events.forEach(event => {
            const eventElement = document.createElement("div");
            eventElement.classList.add("event-item");
            eventElement.innerHTML = `
                <h2>${event.name}</h2>
                <p>Data: ${new Date(event.event_datetime).toLocaleDateString()}</p>
                <p>Local: ${event.city}, ${event.state}</p>
                <img src="${event.image_url}" alt="Imagem do Evento" class="event-image">
                <div class="event-actions">
                    <a href="#" class="btn btn-sm btn-edit">Editar</a>
                    <a href="#" class="btn btn-sm btn-delete">Excluir</a>
                </div>
            `;
            eventsList.appendChild(eventElement);
        eventElement.querySelector(".btn-edit").addEventListener("click", () => editEvent(event));
        eventElement.querySelector(".btn-delete").addEventListener("click", () => deleteEvent(event.id));
        });
    };

    const loadUserInfo = () => {
        const userNameFromSession = sessionStorage.getItem("name");
        if (userNameFromSession) {
            userName.textContent = `Bem-vindo, ${userNameFromSession}`;
        }
    };

   const editEvent = (event) => {
    Swal.fire({
        title: 'Editar Evento',
        html: `
            <input type="text" id="edit-name" class="swal2-input" value="${event.name}">
            <input type="datetime-local" id="edit-datetime" class="swal2-input" value="${new Date(event.event_datetime).toISOString().slice(0, 16)}">
            <input type="text" id="edit-city" class="swal2-input" value="${event.city}">
            <input type="text" id="edit-state" class="swal2-input" value="${event.state}">
            <input type="text" id="edit-address" class="swal2-input" value="${event.address}">
            <input type="text" id="edit-number" class="swal2-input" value="${event.number}">
            <input type="text" id="edit-complement" class="swal2-input" value="${event.complement}">
            <input type="text" id="edit-phone" class="swal2-input" value="${event.phone}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            return {
                name: document.getElementById('edit-name').value,
                event_datetime: document.getElementById('edit-datetime').value,
                city: document.getElementById('edit-city').value,
                state: document.getElementById('edit-state').value,
                address: document.getElementById('edit-address').value,
                number: document.getElementById('edit-number').value,
                complement: document.getElementById('edit-complement').value,
                phone: document.getElementById('edit-phone').value,
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const updatedEvent = result.value;
            fetch(`http://0.0.0.0:8000/api/v1/events/${event.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...updatedEvent,
                    organizer_id: sessionStorage.getItem("organizer_id")
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.mensagem) {
                    Swal.fire('Sucesso', data.mensagem, 'success').then(() => {
                        loadEvents();
                    });
                } else {
                    Swal.fire('Erro', data.erro, 'error');
                }
            })
            .catch(error => {
                Swal.fire('Erro', error.message, 'error');
            });
        }
    });
};

const deleteEvent = (eventId) => {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://0.0.0.0:8000/api/v1/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.mensagem) {
                    Swal.fire('Excluído!', data.mensagem, 'success').then(() => {
                        loadEvents();
                    });
                } else {
                    Swal.fire('Erro', data.erro, 'error');
                }
            })
            .catch(error => {
                Swal.fire('Erro', error.message, 'error');
            });
        }
    });
};

    

    loadUserInfo();
    loadEvents();
});
