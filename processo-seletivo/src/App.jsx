import './App.css';
import { Component } from "react";

export default class Repositorios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaRepositorios: [],
            usuario: ''
        }
    };

    atualizaEstadoPesquisa = async (event) => {
        await this.setState({
            usuario: event.target.value
        });

        console.log(this.state.usuario);
    }

    buscarUsuarioRepositorios = async (event) => {
        event.preventDefault()

        console.log('Chamada da API do GitHub.')

        fetch(`https://api.github.com/users/${this.state.usuario}/repos?per_page=10`)
            .then(resposta => resposta.json())
            .then(dados => this.setState({ listaRepositorios: dados }))
            .catch(erro => console.log(erro))

        await console.log(this.state.listaRepositorios)
    }

    render() {
        return (
            <div>
                <header className='header'>
                    <h1>GitHub - Repositories</h1>
                </header>
                <main>
                    <section className="busca">
                        <h2>Usuário a ser buscado</h2>
                        <form onSubmit={this.buscarUsuarioRepositorios}>
                            <div className="form">
                                <input onChange={this.atualizaEstadoPesquisa} type="text" placeholder="Digite um usuário" />
                                <button type="submit" disabled={this.state.usuario === '' ? 'none' : ''}>Buscar</button>
                            </div>
                        </form>
                    </section>
                    <section className="lista">
                        <h2>Lista de Repositorios</h2>
                        <table id="tabela-lista">
                            <thead>
                                <tr>
                                    <th>Repositórios de {this.state.usuario}</th>
                                    <th>Criador</th>
                                    <th>Descrição</th>
                                    <th>Tamanho</th>
                                    <th>Criado em</th>
                                </tr>
                            </thead>
                            <tbody id="tabela-lista-corpo">
                                {
                                    this.state.listaRepositorios.map((Repositorio) => {
                                        return (
                                            <tr key={Repositorio.id}>
                                                <td>{Repositorio.name}</td>
                                                <td>{Repositorio.owner.login}</td>
                                                <td>{Repositorio.description}</td>
                                                <td>{Repositorio.size}</td>
                                                <td>{Repositorio.created_at}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        );
    }
}