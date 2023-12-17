/* Vamos criar as referências e pegar os elementos */

let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionsButtons = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".option-button-align");
let spacingButtons = document.querySelectorAll(".option-button-spacing");
let formatButtons = document.querySelectorAll(".option-button-format");
let scriptButtons = document.querySelectorAll(".option-button-script");

/* Lista de Fontes */
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "Cursive",
];

//Configuração inicial
const initializer = () => {
  // Essa função é chamada inicialmente para configurar alguns aspectos da interface.
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  // Criar opções para nomes de fontes
  fontList.forEach((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  // Tamanho da Fonte
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  // Tamanho padrão
  fontSizeRef.value = 3;
};

// Lógica Principal
const modifyText = (command, value) => {
  writingArea.focus(); // Garante que o foco está na área de escrita
  document.execCommand(command, false, value);
};

// Exemplo de uso:
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, null);
  });
});

// Alterar a cor
advancedOptionsButtons.forEach((button) => {
  button.addEventListener("input", () => {
    modifyText(button.id, button.value);
  });
});

// Adicionando link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, userLink);
  }
});

// Função highlighter - Destaca ou remove destaque de botões
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = button.classList.contains("active");
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

// Função auxiliar para remover destaque de todos os botões no array
const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer();
