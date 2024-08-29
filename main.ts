import prompt from 'prompt-sync'
import { Livro } from './classes/livros'
import { Membro } from './classes/membros'
import { Emprestimo } from './classes/emprestimos'

const teclado = prompt()

const interfaceBiblio = "|---------------Sistema de Biblioteca---------------|"
const interfaceLivro = "|----------------Cadastro de livros-----------------|"
const interfaceMembro = "|----------------Cadastro de membros----------------|"
const interfaceEmprestimo = "|-----------Gerenciamento de empréstimos------------|"
const interfacetraco = "|---------------------------------------------------|"

while (true) {
    console.clear()
    console.log(interfaceBiblio)
    console.log("| 1. Cadastro de livros                             |")
    console.log("| 2. Cadastro de membros                            |")
    console.log("| 3. Gerenciamento de empréstimos                   |")
    console.log("| 0. Sair                                           |")
    console.log(interfacetraco)
    
    let escolha: number = +teclado("Informe sua escolha: ")
    
    switch (escolha) {
        case 1:
            while (true) {
                console.clear()
                console.log(interfaceLivro)
                console.log("| 1. Adicionar novo livro                           |")
                console.log("| 2. Listar todos os livros cadastrados             |")
                console.log("| 3. Atualizar informações de um livro              |")
                console.log("| 4. Remover um livro do cadastro                   |")
                console.log("| 0. Voltar                                         |")
                console.log(interfacetraco)

                let escolhaLivro: number = +teclado("Informe sua escolha: ")

                switch (escolhaLivro) {
                    case 1:
                        console.clear()
                        console.log(interfaceLivro)

                        console.log("| Adicionar novo livro                              |")
                        const novoLivro = Livro.cadastrarLivro()
                        Livro.salvarLivroCSV(novoLivro)
                        
                        console.log("| Livro cadastrado com sucesso!                     |")
                        novoLivro.exibirLivro()
                        
                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar...")
                        break;
                    case 2:
                        console.clear()
                        console.log(interfaceLivro)
                        
                        console.log("| Listagem de livros cadastrados                    |")
                        Livro.carregarLivrosCSV()
                        
                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar...")
                        break;
                    case 3:
                        console.clear()
                        console.log(interfaceLivro)
                        console.log("| Qual livro deseja atualizar?                      |")
                        
                        console.log(interfacetraco)
                        console.log("| Listagem de livros cadastrados                    |")
                        Livro.carregarLivrosCSV()
                        let idLivro: number = +teclado("| Informe o ID do livro...:                         |")
                        
                        console.log(interfacetraco)
                        console.log("| Informe os novos dados do livro:                  |")
                        console.log(interfacetraco)                        
                        const livroAtualizado = Livro.cadastrarLivro()
                        Livro.atualizarLivroCSV(idLivro, livroAtualizado)
                        
                        console.log("| Livro atualizado com sucesso!                     |")
                        livroAtualizado.exibirLivro()
                        
                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar...")
                        break;
                    case 4:
                        console.clear()
                        console.log(interfaceLivro)
                        console.log("| Qual livro deseja remover?                        |")
                        
                        console.log(interfacetraco)
                        console.log("| Listagem de livros cadastrados                    |")
                        Livro.carregarLivrosCSV()
                        let idLivroRemover: number = +teclado("| Informe o ID do livro...:                         |")
                        Livro.removerLivroCSV(idLivroRemover)
                        
                        console.log(interfacetraco)
                        console.log("| Livro removido com sucesso!                       |")
                        

                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar...")
                        break;
                    case 0:
                        console.clear()
                        break;    
                }
            
                if (escolhaLivro === 0) {
                    break;
                }
            }
            
        break;    
        case 2:
            while (true) {
                console.clear()
                console.log(interfaceMembro)
                console.log("| 1. Adicionar novo membro                          |")
                console.log("| 2. Listar todos os membros cadastrados            |")
                console.log("| 3. Atualizar informações de um membro             |")
                console.log("| 4. Remover um membro do cadastro                  |")
                console.log("| 0. Voltar                                         |")
                console.log(interfacetraco)

                let escolhaMembro: number = +teclado("Informe sua escolha: ")

                switch (escolhaMembro) {
                    case 1:
                        console.clear()
                        console.log(interfaceMembro)

                        const novoMembro = Membro.CadastrarMembro()
                        Membro.salvarMembrosCSV(novoMembro)

                        

                        console.log("| Membro cadastrado com sucesso!                    |")
                        let NMatMembro: number = novoMembro.numMatricula
                        novoMembro.exibirMembro(NMatMembro)

                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar")
                        break;
                    case 2:
                        console.clear()
                        console.log(interfaceMembro)
                            
                        console.log("| Listagem de Membros cadastrados                   |")
                        Membro.carregarMembrosCSV()
                        
                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar...")
                        break;
                    case 3:
                        console.clear()
                        console.log(interfaceMembro)
                        console.log("| Atualizar informações de qual membro:             |")

                        console.log(interfacetraco)
                        console.log("| Listagem de membros cadastrados                   |")
                        Membro.carregarMembrosCSV()
                        let NMatMembroA: number = +teclado("| Informe o N° de matricula do membro...:           |")

                        console.log(interfacetraco)
                        console.log("| Informe os novos dados do membro:                 |")
                        console.log(interfacetraco)
                        const membroAtualizado = Membro.CadastrarMembro()
                        Membro.atualizarMembroCSV(NMatMembroA, membroAtualizado)

                        console.log("| Membro atualizado com sucesso!                    |")
                        membroAtualizado.exibirMembro(NMatMembroA)
                        
                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar...")
                        break;
                    case 4:
                        console.clear()
                        console.log(interfaceMembro)
                        console.log("| Qual membro deseja remover?                       |")
                        
                        console.log(interfacetraco)
                        console.log("| Listagem de membros cadastrados                   |")
                        Membro.carregarMembrosCSV()
                        let NMatMembroRemover: number = +teclado("| Informe o N° de matricula do membro...:           |")
                        Membro.removerMembroCSV(NMatMembroRemover)

                        console.log(interfacetraco)
                        console.log("| Membro removido com sucesso!                      |")

                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar...")
                        break;
                    case 0:
                        console.clear()
                        break;
                    }

                if (escolhaMembro === 0) {
                    break;
                }
            }

        break;
        case 3:
            while (true) {
                console.clear()
                console.log(interfaceEmprestimo)
                console.log("| 1. Realizar empréstimo de um livro para um membro |")
                console.log("| 2. Listar todos os empréstimos ativos             |")
                console.log("| 3. Registrar devolução de um livro                |")
                console.log("| 4. Listar histórico de empréstimos                |")
                console.log("| 0. Voltar                                         |")
                console.log(interfacetraco)

                let escolhaEmprestimo: number = +teclado("Informe sua escolha: ")

                switch (escolhaEmprestimo) {
                    case 1:
                        console.clear()
                    
                        console.log(interfaceEmprestimo)
                        console.log("| Realizar empréstimo de um livro para um membro    |")
                        const novoEmprestimo = Emprestimo.cadastrarEmprestimo()
                        
                        console.log(interfacetraco)
                        console.log("| Empréstimo realizado com sucesso!                 |")
                        novoEmprestimo.exibirEmprestimo()    
                        
                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar...")
                        break;
                    case 2:
                        console.clear()
                        console.log(interfaceEmprestimo)
                        console.log("| Listar todos os empréstimos ativos                |")
                        Emprestimo.listarEmprestimosAtivos()

                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar...")
                        break;
                    case 3:
                        console.clear()
                        console.log(interfaceEmprestimo)
                        console.log("| Registrar devolução de um livro                   |")
                        Emprestimo.listarEmprestimosAtivos()
                        const idEmprestimo: number = +teclado("Informe o ID do empréstimo: ")
                        Emprestimo.registrarDevolucao(idEmprestimo)

                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar...")
                        break;
                    case 4:
                        console.clear()
                        console.log(interfaceEmprestimo)
                        console.log("| Listar histórico de empréstimos                   |")
                        Emprestimo.listarHistoricoEmprestimos()
                        console.log(interfacetraco)
                        teclado("Pressione Enter para continuar...")
                        break;
                    case 0:
                        console.clear()
                        break;       
                }

                if (escolhaEmprestimo === 0) {
                    break;
                }
            }
            break;
        case 0:
            console.log("Saindo do sistema...")
            process.exit();
    }
}
