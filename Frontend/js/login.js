document.addEventListener("DOMContentLoaded", function () {
    const togglePasswordVisibility = (inputId, toggleBtn) => {
        const input = document.getElementById(inputId);
        const icon = toggleBtn.querySelector(".material-symbols-outlined");

        if (input.type === "password") {
            input.type = "text";
            icon.textContent = "visibility_off";
        } else {
            input.type = "password";
            icon.textContent = "visibility";
        }
    };

    document.querySelectorAll(".btn-showsenha").forEach(button => {
        button.addEventListener("click", function () {
            const inputId = button.parentElement.querySelector("input").id;
            togglePasswordVisibility(inputId, button);
        });
    });

    const formValidation = () => {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if (!email || !senha) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obrigatórios',
                text: 'Por favor, preencha todos os campos obrigatórios!'
            });
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        if (!formValidation()) {
            return;
        }

        const userData = {
            email: document.getElementById("email").value,
            password: document.getElementById("senha").value
        };

        try {
            const response = await fetch('http://0.0.0.0:8000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Erro ao realizar login');
            }
            const data = await response.json();
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('name', data.user.name);
            sessionStorage.setItem('organizer_id', data.user.organizer_id)

            Swal.fire({
                icon: 'success',
                title: 'Login realizado',
                
                text: 'Você foi autenticado com sucesso!'
            }).then((result) => {
                if (result.isConfirmed || result.dismiss) {
                    document.getElementById("email").value = '';
                    document.getElementById("senha").value = '';

                    window.location.href = '/views/dashboard.html'; 
                }
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Atenção!',
                text:  'Não foi possível efetuar o login, por favor, verifique as informações inseridas'
            });
        }
    };

    document.querySelector(".form-login").addEventListener("submit", function (event) {
        event.preventDefault();
        handleLogin();
    });
});
