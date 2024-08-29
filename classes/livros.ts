import prompt from 'prompt-sync' 
import fs from 'fs'
import path from 'path'

const teclado = prompt()

class Livro {
    private _titulo: string
    private _autor: string
    private _isbn: number
    private _anoPublicacao: number

    constructor(titulo: string, autor: string, isbn: number, anoPublicacao: number) {
        this._titulo = titulo
        this._autor = autor
        this._isbn = isbn
        this._anoPublicacao = anoPublicacao
    }

    static cadastrarLivro() {
        let titulo: string; 
            while (true) {
                titulo = teclado("Informe o título do livro: ")
                if (titulo.length > 0) {
                    break;
                } else {
                    console.log("Título inválido! Deve conter ao menos um caractere.")
                }
            }

        let autor: string;
            while (true) {
                autor = teclado("Informe o autor do livro: ")
                if (autor.length > 0) {
                    break;
                } else {
                    console.log("Autor inválido! Deve conter ao menos um caractere.")
                }
            }

        let isbn: number;
            while (true) {
                isbn = +teclado("Informe o ISBN do livro: ")
                if (isbn.toString().length === 10 || isbn.toString().length === 13) {
                    break;
                } else {
                    console.log("ISBN inválido! Deve conter 10 ou 13 dígitos.")
                }
            }

        let anoPublicacao: number;
        const anoAtual = new Date().getFullYear()
            while (true) {
                anoPublicacao = +teclado("Informe o ano de publicação do livro: ")
                if (anoPublicacao <= anoAtual) {
                    break;
                } else {
                    console.log("Ano de publicação inválido! Deve ser menor ou igual ao ano atual.")
                }
            }

        return new Livro(titulo, autor, isbn, anoPublicacao)  
    }

    exibirLivro() {
        console.log("Título: ", this._titulo)
        console.log("Autor: ", this._autor)
        console.log("ISBN: ", this._isbn)
        console.log("Ano de publicação: ", this._anoPublicacao)
    }

    static atualizarLivroCSV(idLivro: number, livroAtualizado: Livro){
        const caminhoArquivo = path.join('.', 'data', 'livros.csv')
        const livros: string[] = []
    
        if (fs.existsSync(caminhoArquivo)){
            const data = fs.readFileSync(caminhoArquivo, 'utf-8')
            const linhas = data.split('\n').filter(linha => linha.trim() !== '')  
            linhas.forEach((linha, index) => {
                if (index + 1 === idLivro) {
                    const dados = `${livroAtualizado._titulo},${livroAtualizado._autor},${livroAtualizado._isbn},${livroAtualizado._anoPublicacao}`
                    livros.push(dados)
                } else {
                    livros.push(linha)
                }
            });
        }
        fs.writeFileSync(caminhoArquivo, livros.join('\n'), 'utf-8')
    }

    static removerLivroCSV(idLivro: number){
        const caminhoArquivo = path.join('.', 'data', 'livros.csv')
        const livros: string[] = []

        if (fs.existsSync(caminhoArquivo)){
            const data = fs.readFileSync(caminhoArquivo, 'utf-8');
            const linhas = data.split('\n').filter(linha => linha.trim() !== '')
            linhas.forEach((linha, index) => {
                if (index + 1 !== idLivro) {
                    livros.push(linha)
                }
            })
        }
        fs.writeFileSync(caminhoArquivo, livros.join('\n'), 'utf-8')
    }

    static salvarLivroCSV(livro: Livro){
        const pastaData = path.join('.', 'data')                     
        const caminhoArquivo = path.join(pastaData, 'livros.csv')
    
        if (!fs.existsSync(pastaData)){                             
            fs.mkdirSync(pastaData)
        }
    
        let dados = `${livro._titulo},${livro._autor},${livro._isbn},${livro._anoPublicacao}\n`;
    
        if (fs.existsSync(caminhoArquivo)) {
            const data = fs.readFileSync(caminhoArquivo, 'utf-8');
            const linhas = data.split('\n').filter(linha => linha.trim() !== '')
    
            if (linhas.length > 0 && linhas[linhas.length - 1].trim() !== '') {
                dados = `\n${dados}`
            }
        }
    
        fs.appendFileSync(caminhoArquivo, dados, 'utf-8')
    }

    static carregarLivrosCSV(){
        const caminhoArquivo = path.join('.', 'data', 'livros.csv')
        const livros: any[] = []
        let indice = 1

        if (fs.existsSync(caminhoArquivo) && fs.statSync(caminhoArquivo).size > 0){
            const data = fs.readFileSync(caminhoArquivo, 'utf-8')
            const linhas = data.split('\n')
            linhas.forEach(linha => {
                if (linha) {
                    const [TITULO, AUTOR, ISBN, ANO_DE_PUBLICACAO] = linha.split(',')
                    livros.push({'#': indice++, TITULO, AUTOR, ISBN, ANO_DE_PUBLICACAO: parseInt(ANO_DE_PUBLICACAO) });
                }
            })

            console.table(livros)
        } else {
            console.log("Ainda não existem livros cadastrados!")
        }
    }

}

export { Livro }