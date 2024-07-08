document.addEventListener("DOMContentLoaded", async function () {
    const token = sessionStorage.getItem('token');
    const organizerId = sessionStorage.getItem('organizer_id');

    const fetchEvents = async () => {
        try {
            const response = await fetch(`http://0.0.0.0:8000/api/v1/events/organizer/${organizerId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar eventos');
            }

            const data = await response.json();

            document.getElementById('totalEvents').textContent = data.eventos.length;

            const today = new Date().toISOString().slice(0, 10);
            const eventsToday = data.eventos.filter(event => event.event_datetime.slice(0, 10) === today);
            document.getElementById('eventsToday').textContent = eventsToday.length;

            const upcomingEvents = data.eventos.filter(event => new Date(event.event_datetime) > new Date());
            document.getElementById('upcomingEvents').textContent = upcomingEvents.length;

            const eventsByMonth = {};
            data.eventos.forEach(event => {
                const month = new Date(event.event_datetime).toLocaleString('default', { month: 'long' });
                if (!eventsByMonth[month]) {
                    eventsByMonth[month] = 0;
                }
                eventsByMonth[month]++;
            });

        
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao buscar eventos. Por favor, tente novamente mais tarde.'
            });
        }
    };

    await fetchEvents();
});
