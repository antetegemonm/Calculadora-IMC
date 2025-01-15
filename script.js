function mostrarPeso(e) {
    e.preventDefault();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const resultadoDiv = document.getElementById('resultado');
    const mensagensAntigas = resultadoDiv.querySelectorAll('p');
    mensagensAntigas.forEach(mensagem => mensagem.remove());

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        const mensagemErro = document.createElement('p');
        mensagemErro.style.color = "red";
        mensagemErro.textContent = "Por favor, insira valores válidos!";
        resultadoDiv.insertBefore(mensagemErro, resultadoDiv.querySelector('h5'));
        return;
    }

    const imc = peso / (altura * altura);
    const classificacao = imc < 18.5 ? "Abaixo do peso" :
                          imc < 24.9 ? "Peso normal" :
                          imc < 29.9 ? "Sobrepeso" : "Obesidade";

    const mensagemResultado = document.createElement('p');
    mensagemResultado.innerHTML = `Seu IMC é <strong>${imc.toFixed(2)}</strong> (${classificacao})`;
    mensagemResultado.style.opacity = "0";
    mensagemResultado.style.transition = "opacity 300ms ease-in";
    resultadoDiv.insertBefore(mensagemResultado, resultadoDiv.querySelector('h5'));
    setTimeout(() => {
        mensagemResultado.style.opacity = "1";
    }, 10);

    mostrarConteudo(classificacao); // Exibe a seção correspondente
}

function mostrarInfo(e) {
    e.preventDefault();
    const infos = document.querySelector('.infos');
    const botao = document.getElementById('infos');
    const calculadora = document.querySelector('.calculadora');

    if (infos.style.visibility === 'visible') {
        calculadora.style.left = '580px';
        infos.style.visibility = 'hidden';
        infos.style.opacity = '0';
        infos.style.left = '200px';
        botao.textContent = 'Saber mais';
    } else {
        calculadora.style.left = '380px';
        infos.style.visibility = 'visible';
        infos.style.opacity = '1';
        infos.style.left = '380px';
        botao.textContent = 'Ler menos';
    }
}

function mostrarConteudo(classificacao) {
    const textos = document.querySelectorAll('.infos > div');
    textos.forEach(texto => {
        texto.classList.remove('visible');
    });

    // Exibe o conteúdo baseado na classificação
    if (classificacao === "Abaixo do peso") {
        document.querySelector('.abaixo').classList.add('visible');
    } else if (classificacao === "Peso normal") {
        document.querySelector('.normal').classList.add('visible');
    } else if (classificacao === "Sobrepeso") {
        document.querySelector('.Sobrepeso').classList.add('visible');
    } else if (classificacao === "Obesidade") {
        document.querySelector('.obesidade').classList.add('visible');
    }
}

document.getElementById('calcular').addEventListener('click', mostrarPeso);
document.getElementById('infos').addEventListener('click', mostrarInfo);
