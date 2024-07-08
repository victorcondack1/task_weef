
document.addEventListener("DOMContentLoaded", function () {
    const registerUser = () => {
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirmaSenha = document.getElementById("confirma-senha").value;

        if (!nome || !email || !senha || !confirmaSenha) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obrigatórios',
                text: 'Por favor, preencha todos os campos obrigatórios!'
            });
            return;
        }

        if (senha !== confirmaSenha) {
            Swal.fire({
                icon: 'error',
                title: 'Senhas não conferem',
                text: 'A senha e a confirmação de senha devem ser iguais!'
            });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Email inválido',
                text: 'Por favor, insira um email válido!'
            });
            return;
        }

        if (senha.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Senha curta',
                text: 'A senha deve ter no mínimo 6 caracteres!'
            });
            return;
        }

        const userData = {
            name: nome,
            email: email,
            password: senha,
            password_confirmation: confirmaSenha
        };

        fetch('http://0.0.0.0:8000/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao registrar usuário');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado',
                text: 'Seu cadastro foi realizado com sucesso!'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById("nome").value = '';
                    document.getElementById("email").value = '';
                    document.getElementById("senha").value = '';
                    document.getElementById("confirma-senha").value = '';
    
                    window.location.href = '/views/login.html';
                }
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: error.message
            });
        });
    };

    document.querySelector(".submit-cadastro").addEventListener("click", function (event) {
        registerUser();
    });

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
});
