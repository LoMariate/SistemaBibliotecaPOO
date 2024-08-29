// 2. **Cadastro de Membros**
//      - Adicionar novo membro (com atributos como nome, número de matrícula, endereço, telefone).
//      - Listar todos os membros cadastrados.
//      - Atualizar informações de um membro.
//      - Remover um membro do cadastro.

import { Pessoa } from './pessoa'
import prompt from 'prompt-sync'
import fs from 'fs'
import path from 'path'


const teclado = prompt()

class Membro extends Pessoa{

    private _NumMatricula: number;
    private static matriculasUsadas: Set<number> = new Set()

    constructor(nome: string, NumMatricula: number, endereco: string, telefone: number){
        super(nome, endereco, telefone)
        this._NumMatricula = NumMatricula
    }

    static CadastrarMembro(){
        let nome: string
            while (true){
                nome = teclado("Informe o nome do membro novo: ")               
                if (nome.length > 0){
                    break;
                }else{
                    console.log("Nome Inválido, por favor insira um novo nome")
                }
            }
        let NumMatricula: number
            while (true){
                // Matricula deve ser um número inteiro  aleatorio entre 1 e 1000
                // Matricula NÃO pode ser repetida
                NumMatricula = Math.floor(Math.random() * 1000) + 1
                if (!Membro.matriculasUsadas.has(NumMatricula)){
                    Membro.matriculasUsadas.add(NumMatricula)
                    break;
                }
            }

        let endereco: string
            while (true){
                endereco = teclado("Informe o endereço do membro novo: ")               
                if (endereco.length > 0){
                    break;
                }else{
                    console.log("Endereço Inválido, por favor insira um novo endereço")
                }
            }
        let telefone: number
           while (true){
                telefone = +teclado("Informe um Nº de telefone (9 Digitos): ")
                if (telefone.toString().length === 9){
                    break;
                } else {
                    console.log("Telefone inválido! Deve conter 9 dígitos.")
                }
        }
        return new Membro(nome, NumMatricula, endereco, telefone)
    }

    get numMatricula(): number {
        return this._NumMatricula
    }

    exibirMembro(NMatMembroE: number) {
        console.log("Nome: ", this._nome)
        console.log("Nº de Matrícula: ", NMatMembroE)
        console.log("Endereço: ", this._endereco)
        console.log("Telefone: ", this._telefone)
    }

    static atualizarMembroCSV(NMatMembro: number, membroAtualizado: Membro){
        const caminhoArquivo = path.join('.', 'data', 'membros.csv')
        const membros: string[] = []

        if (fs.existsSync(caminhoArquivo)){
            Membro.matriculasUsadas.delete(membroAtualizado._NumMatricula) // Retorna a matricula gerada pela funcão CadastrarMembro

            const data = fs.readFileSync(caminhoArquivo, 'utf-8')
            const linhas = data.split('\n').filter(linha => linha.trim() !== '')

            linhas.forEach((linha) => {
                const [NOME, NumMatricula, ENDERECO, TELEFONE] = linha.split(',')
                if (parseInt(NumMatricula) === NMatMembro){
                    membros.push(`${membroAtualizado._nome},${NMatMembro},${membroAtualizado._endereco},${membroAtualizado._telefone}`)
                } else {
                    membros.push(linha)
                }
            })
        }

        fs.writeFileSync(caminhoArquivo, membros.join('\n'), 'utf-8')
    }
    
    
    static removerMembroCSV(NMatMembro: number){
        const caminhoArquivo = path.join('.', 'data', 'membros.csv')
        const membros: string[] = []

        if (fs.existsSync(caminhoArquivo)){
            const data = fs.readFileSync(caminhoArquivo, 'utf-8');
            const linhas = data.split('\n').filter(linha => linha.trim() !== '')

            linhas.forEach((linha) => {
               const [NOME, NumMatricula, ENDERECO, TELEFONE] = linha.split(',')
               if (parseInt(NumMatricula) !== NMatMembro){
                   membros.push(linha)
               }
            })
        }

        fs.writeFileSync(caminhoArquivo, membros.join('\n'), 'utf-8')

        Membro.matriculasUsadas.delete(NMatMembro) // Remove a matricula do conjunto para que possa ser usada novamente
    }

    // Método para salvar os membros cadastrados
    static salvarMembrosCSV(membros: Membro) {
        const pastaData = path.join('.', 'data')
        const caminhoArquivo = path.join(pastaData, 'membros.csv')

        if (!fs.existsSync(pastaData)) {
            fs.mkdirSync(pastaData)
        }

        let dados = `${membros._nome},${membros._NumMatricula},${membros._endereco},${membros._telefone}\n`

        if (fs.existsSync(caminhoArquivo)){
            const data = fs.readFileSync(caminhoArquivo, 'utf-8')
            const linhas = data.split('\n').filter(linha => linha.trim() !== '')

            if (linhas.length > 0 && linhas[linhas.length - 1].trim() !== ''){
                dados = `\n${dados}`
            }
        }

        fs.appendFileSync(caminhoArquivo, dados, 'utf-8')
    }

    static carregarMembrosCSV(){
        const caminhoArquivo = path.join('.', 'data', 'membros.csv')
        const membros: any[] = []
        let indice = 1

        if (fs.existsSync(caminhoArquivo) && fs.statSync(caminhoArquivo).size > 0){
            const data = fs.readFileSync(caminhoArquivo, 'utf-8')
            const linhas = data.split('\n')
            linhas.forEach(linha => {
                if (linha) {
                    const [NOME, NumMatricula, ENDERECO, TELEFONE] = linha.split(',')
                    membros.push({'#': indice++, NOME, NumMatricula, ENDERECO, TELEFONE });
                }
            })

            console.table(membros)
        } else {
            console.log("Ainda não existem membros cadastrados")
        }
    }
}

export  { Membro }