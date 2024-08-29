class Pessoa {
    protected _nome: string;
    protected _endereco: string;
    protected _telefone: number;

    constructor(nome: string, endereco: string, telefone: number) {
        this._nome = nome;
        this._endereco = endereco;
        this._telefone = telefone;
    }

    get nome(): string {
        return this._nome;
    }

    get endereco(): string {
        return this._endereco;
    }

    get telefone(): number {
        return this._telefone;
    }

    exibirPessoa() {
        console.log("Nome: ", this._nome);
        console.log("Endereço: ", this._endereco);
        console.log("Telefone: ", this._telefone);
    }
}

export { Pessoa };
