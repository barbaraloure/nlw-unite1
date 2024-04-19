let participantes = [
    { 
      nome: "Diego Fernandes",
      email: "diegofernandes@gmail.com",
      dataInscricao: new Date(2024, 2, 28, 19, 20),
      dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    { 
      nome: "Mayk Brito",
      email: "maykbrito@gmail.com",
      dataInscricao: new Date(2024, 1, 2, 9, 20),
      dataCheckIn: new Date(2024, 1, 5, 20, 0)
    },
    { 
      nome: "Ana Silva",
      email: "anasilva@example.com",
      dataInscricao: new Date(2024, 3, 10, 14, 30),
      dataCheckIn: new Date(2024, 3, 15, 10, 45)
    },
    { 
      nome: "João Santos",
      email: "joaosantos@example.com",
      dataInscricao: new Date(2024, 4, 5, 10, 15),
      dataCheckIn: new Date(2024, 4, 8, 16, 20)
    },
    { 
      nome: "Maria Oliveira",
      email: "mariaoliveira@example.com",
      dataInscricao: new Date(2024, 5, 20, 16, 45),
      dataCheckIn: new Date(2024, 5, 25, 13, 10)
    },
    { 
      nome: "Pedro Costa",
      email: "pedrocosta@example.com",
      dataInscricao: new Date(2024, 6, 1, 12, 10),
      dataCheckIn: new Date(2024, 6, 6, 18, 30)
    },
    { 
      nome: "Carla Ramos",
      email: "carlaramos@example.com",
      dataInscricao: new Date(2024, 7, 8, 18, 20),
      dataCheckIn: new Date(2024, 7, 13, 9, 15)
    },
    { 
      nome: "Rafael Sousa",
      email: "rafaelsousa@example.com",
      dataInscricao: new Date(2024, 8, 3, 20, 5),
      dataCheckIn: new Date(2024, 8, 8, 14, 40)
    },
    { 
      nome: "Sara Martins",
      email: "saramartins@example.com",
      dataInscricao: new Date(2024, 9, 12, 15, 40),
      dataCheckIn: new Date(2024, 9, 17, 11, 20)
    },
    { 
      nome: "António Mendes",
      email: "antoniomendes@example.com",
      dataInscricao: new Date(2024, 10, 25, 11, 55),
      dataCheckIn: new Date(2024, 10, 30, 17, 50)
    }
  
  ]; 
  
  const criarNovoParticipante = (participante) => {
    const dataInscricao= dayjs(Date.now())
    .to(participante.dataInscricao)
  
     let dataCheckIn= dayjs(Date.now())
     .to(participante.dataCheckIn)
  
     if(participante.dataCheckIn == null) {
        dataCheckIn = `
      <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)">
  
      Confirmar check-in
      </button>
        `
     }
    return`
    <tr>
      <td>
        <strong>
        ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td> ${dataInscricao}</td>
      <td> ${dataCheckIn}</td>
    </tr>
    `
  }
  
  const atualizarLista = (participantes) => {
    let output = ""
    // estrutura de repetição = loop
    for(let participante of participantes) {
     output = output + criarNovoParticipante(participante)
    }
    //substituir informação HTML
    document
    .querySelector('tbody')
    .innerHTML = output
  }
  
  atualizarLista(participantes)
  
  const adicionarParticipante = (event) => {
    event.preventDefault()
  
    const dadosDoFormulario = new FormData(event.target)
  
    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null
    }
  
    // verificar se o participane ja existe
    const partcipanteExiste = participantes.find(
      (p) => p.email == participante.email
  
    )
  
    if(partcipanteExiste) {
      alert('Email já cadastrado')
      return
    }
  
    participantes = [participante, ... participantes]
    atualizarLista(participantes)
  
    // limpar formulario
      event.target.querySelector('[name="nome"]').value = ""
      event.target.querySelector('[name="email"]').value = ""
  }
  
  
  
  
  const fazerCheckIn = (event) => {
    // confirmar se quer o checkin
    const mensagemConfirmacao = 'Tem certeza que deseja fazer check-in?'
  
    if(confirmar(mensagemConfirmacao) == false) {
      return
    }
    // encontrar o participante dentro da lista
    const participante = participantes.find(
      (p) => p.email == event.target.dataset.email
    )
  // atualizar o checkin do participante
    participante.dataCheckIn = new Date()
  
    // atualizar lista de partcipantes
    atualizarLista(participantes)
  }