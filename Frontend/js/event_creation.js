document.addEventListener("DOMContentLoaded", function () {
    const eventForm = document.getElementById("eventForm");
    const organizer_id = sessionStorage.getItem("organizer_id");

    const formValidation = () => {
        const name = document.getElementById("name").value;
        const datetime = document.getElementById("datetime").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const address = document.getElementById("address").value;
        const number = document.getElementById("number").value;
        const phone = document.getElementById("phone").value;

        if (!name || !datetime || !city || !state || !address || !number || !phone) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obrigatórios',
                text: 'Por favor, preencha todos os campos obrigatórios!'
            });
            return false;
        }

        return true;
    };

    const handleEventCreation = async () => {
        if (!formValidation()) {
            return;
        }

        const formData = new FormData();

        formData.append('organizer_id', organizer_id);
        formData.append('name', document.getElementById("name").value);
        formData.append('event_datetime', document.getElementById("datetime").value);
        formData.append('city', document.getElementById("city").value);
        formData.append('state', document.getElementById("state").value);
        formData.append('address', document.getElementById("address").value);
        formData.append('number', document.getElementById("number").value);
        formData.append('complement', document.getElementById("complement").value);
        formData.append('phone', document.getElementById("phone").value);

        const imageInput = document.getElementById("image");
        if (imageInput.files.length > 0) {
            formData.append('image', imageInput.files[0]);
        }

        const token = sessionStorage.getItem('token');

        try {
            const response = await fetch('http://0.0.0.0:8000/api/v1/events/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Evento criado',
                    text: 'Seu evento foi criado com sucesso!'
                }).then(() => {
                    window.location.href = '/views/my_events.html';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: data.message || 'Ocorreu um erro ao criar o evento'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: error.message || 'Ocorreu um erro ao criar o evento'
            });
        }
    };

    eventForm.addEventListener("submit", function (event) {
        event.preventDefault();
        handleEventCreation();
    });
});
