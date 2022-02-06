class ValidaFormulario {
    constructor(){
        this.formulario = document.querySelector('.formulario')

        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    };

    handleSubmit(e){
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasValidas();

        if(camposValidos && senhasValidas){
            alert('Formulário enviado!')
            this.formulario.submit();
        }
    }

    senhasValidas(){
        let valid = true;
        const senha = this.formulario.querySelector('.senha1');
        const repetirSenha = this.formulario.querySelector('.senha2');

        if(senha.value !== repetirSenha.value){
            valid = false;
            this.criaErro(senha, 'Campos "Senha" e "Repetir Senha" precisam ser iguais')
            this.criaErro(repetirSenha, 'Campos "Senha" e "Repetir Senha" precisam ser iguais')
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false;
            this.criaErro(senha, 'Senha precisa ter entre 6-12 caracteres')
        }

        return valid;
    };

    camposSaoValidos() {
        let valid = true;
    
        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
          errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerText; 
            if(!campo.value){
                this.criaErro(campo, `Campo "${label}" não pode estar em branco`);
                valid = false;
            }

            if(campo.classList.contains('cpf')){
                if(!this.validaCPF(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false;
            }
        }
        return valid;
    }

    validaUsuario(campo){
        const usuario = campo.value;
        let valid = true;
        if(usuario.length < 3 || usuario.length > 12){
            this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres')
            valid = false;
        }
        if(!usuario.match(/^[a-zA-z0-9]+$/g)){
            this.criaErro(campo, 'Usuário precisa conter apenas letras e/ou numeros')
            valid = false;
        }

        return valid;
    }

    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value);
        if(!cpf.valida()){
            this.criaErro(campo, 'CPF Inválido!');
            return false;

        }
        return true;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
      }
}

const valida = new ValidaFormulario();