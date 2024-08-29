import * as fs from 'fs';
import * as path from 'path';
import { Membro } from './membros';
import { Livro } from './livros';
import prompt from 'prompt-sync';

const teclado = prompt();

class Emprestimo {
    private _idCliente: number;
    private _idLivro: number;
    private _dataEmprestimo: Date;
    private _dataDevolucao: Date;
    private _status: string;

    constructor(idCliente: number, idLivro: number, dataEmprestimo: Date, dataDevolucao: Date, status: string) {
        this._idCliente = idCliente;
        this._idLivro = idLivro;
        this._dataEmprestimo = dataEmprestimo;
        this._dataDevolucao = dataDevolucao;
        this._status = status;
    }

    static cadastrarEmprestimo() {
        let idCliente: number;
        while (true) {
            Membro.carregarMembrosCSV()
            idCliente = +teclado("Informe a matrícula do cliente: ")
            if (idCliente > 0) {
                break;
            } else {
                console.log("Matrícula inválida! Deve existir.")
            }
        }

        let idLivro: number;
        while (true) {
            Livro.carregarLivrosCSV()
            idLivro = +teclado("Informe o ID do livro: ")
            if (idLivro > 0) {
                break;
            } else {
                console.log("ID inválido! Deve existir.")
            }
        }

        let dataEmprestimo: Date;
        while (true) {
            dataEmprestimo = new Date(teclado("Informe a data de empréstimo (dd/mm/aaaa): "))
            if (dataEmprestimo.toString() !== "Invalid Date") {
                break;
            } else {
                console.log("Data inválida! Informe a data no formato dd/mm/aaaa.")
            }
        }

        let dataDevolucao: Date;
        while (true) {
            dataDevolucao = new Date(teclado("Informe a data de devolução (dd/mm/aaaa): "))
            if (dataDevolucao.toString() !== "Invalid Date" && dataDevolucao > dataEmprestimo) {
                break;
            } else {
                console.log("Data inválida! A data de devolução deve ser maior que a data de empréstimo e no formato dd/mm/aaaa.")
            }
        }

        let status: string;
        while (true) {
            status = teclado("Informe o status do empréstimo (Ativo/Inativo): ").toLowerCase();
            if (status === 'ativo' || status === 'inativo') {
                break;
            } else {
                console.log("Status inválido! Deve ser 'Ativo' ou 'Inativo'.")
            }
        }

        const novoEmprestimo = new Emprestimo(idCliente, idLivro, dataEmprestimo, dataDevolucao, status);
        this.salvarEmprestimoCSV(novoEmprestimo);
        return novoEmprestimo;
    }

    exibirEmprestimo() {
        console.log(`Matricula do Cliente: ${this._idCliente}`);
        console.log(`ID do Livro: ${this._idLivro}`);
        console.log(`Data de Empréstimo: ${this._dataEmprestimo.toISOString()}`);
        console.log(`Data de Devolução: ${this._dataDevolucao.toISOString()}`);
        console.log(`Status: ${this._status}`);
    }

    static salvarEmprestimoCSV(emprestimo: Emprestimo) {
        const pastaData = path.join('.', 'data');
        const caminhoArquivo = path.join(pastaData, 'emprestimos.csv');

        if (!fs.existsSync(pastaData)) {
            fs.mkdirSync(pastaData);
        }

        const dados = `${emprestimo._idCliente},${emprestimo._idLivro},${emprestimo._dataEmprestimo.toISOString()},${emprestimo._dataDevolucao.toISOString()},${emprestimo._status}\n`;
        fs.appendFileSync(caminhoArquivo, dados, 'utf-8');
    }

    static listarEmprestimosAtivos() {
        const caminhoArquivo = path.join('.', 'data', 'emprestimos.csv');

        if (fs.existsSync(caminhoArquivo)) {
            const data = fs.readFileSync(caminhoArquivo, 'utf-8');
            const linhas = data.split('\n').filter(linha => linha.trim() !== '');

            const emprestimosAtivos = linhas.map((linha, indice) => {
                const [idCliente, idLivro, dataEmprestimo, dataDevolucao, status] = linha.split(',');
                if (status.trim() === 'ativo') {
                    return { indice: indice + 1, idCliente, idLivro, dataEmprestimo, dataDevolucao, status };
                }
                return null;
            }).filter(emprestimo => emprestimo !== null);

            console.table(emprestimosAtivos);
        } else {
            console.log("Ainda não existem empréstimos cadastrados!");
        }
    }

    static registrarDevolucao(idEmprestimo: number) {
        const caminhoArquivo = path.join('.', 'data', 'emprestimos.csv');
        const emprestimos: string[] = [];

        if (fs.existsSync(caminhoArquivo)) {
            const data = fs.readFileSync(caminhoArquivo, 'utf-8');
            const linhas = data.split('\n').filter(linha => linha.trim() !== '');

            linhas.forEach((linha, indice) => {
                if (indice === idEmprestimo - 1) {
                    const [idCliente, idLivro, dataEmprestimo, dataDevolucao, status] = linha.split(',');
                    emprestimos.push(`${idCliente},${idLivro},${dataEmprestimo},${dataDevolucao},inativo`);
                } else {
                    emprestimos.push(linha);
                }
            });
        }

        fs.writeFileSync(caminhoArquivo, emprestimos.join('\n'), 'utf-8');
    }

    static listarHistoricoEmprestimos() {
        const caminhoArquivo = path.join('.', 'data', 'emprestimos.csv');

        if (fs.existsSync(caminhoArquivo)) {
            const data = fs.readFileSync(caminhoArquivo, 'utf-8');
            const linhas = data.split('\n').filter(linha => linha.trim() !== '');

            const historico = linhas.map((linha, indice) => {
                const [idCliente, idLivro, dataEmprestimo, dataDevolucao, status] = linha.split(',');
                return { indice: indice + 1, idCliente, idLivro, dataEmprestimo, dataDevolucao, status };
            });

            console.table(historico);
        } else {
            console.log("Ainda não existem empréstimos cadastrados!");
        }
    }
}

export { Emprestimo };
