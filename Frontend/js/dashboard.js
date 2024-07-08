document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
        window.location.href = '/views/login.html'; 
    } else {
        try {
          const name = sessionStorage.getItem("name");
            document.querySelector('.user-info span').textContent = `Bem-vindo, ${name}`;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
        }
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('.btn-logout');

    logoutButton.addEventListener('click', async function(event) {
        event.preventDefault();

            sessionStorage.removeItem('token');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('organizer_id');
            
            window.location.href = '/index.html'; 
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('.btn-logoutH');

    logoutButton.addEventListener('click', async function(event) {
        event.preventDefault();

            sessionStorage.removeItem('token');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('organizer_id');

            window.location.href = '/index.html'; 
    });
});


