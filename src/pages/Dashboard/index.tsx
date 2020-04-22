import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { FiChevronRight, FiX } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@RepositoryExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@RepositoryExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  const handleAddRepository = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      if (!newRepo) {
        setInputError('Digite o autor/nome do repositório');
        return;
      }

      const repoAlreadyExist = repositories.find(
        repo => repo.full_name.toLowerCase() === newRepo,
      );

      if (repoAlreadyExist) {
        setInputError('Este repositório já foi cadastrado');
        return;
      }

      try {
        const response = await api.get<Repository>(`repos/${newRepo}`);

        const repository = response.data;

        setRepositories([...repositories, repository]);
        setNewRepo('');
        setInputError('');
      } catch (err) {
        setInputError('Erro na busca por esse repositório');
      }
    },
    [newRepo, repositories],
  );

  const handleRemoveRepository = useCallback(
    (id: string) => {
      setRepositories(repositories.filter(repo => repo.full_name !== id));
    },
    [repositories],
  );

  return (
    <>
      <img src={logoImg} alt="Logo" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repo => (
          <div key={repo.full_name}>
            <FiX
              size={20}
              onClick={() => handleRemoveRepository(repo.full_name)}
            />
            <a href="/">
              <img src={repo.owner.avatar_url} alt="Douglas Tesch" />
              <div>
                <strong>{repo.full_name}</strong>
                <p>{repo.description}</p>
              </div>

              <FiChevronRight size={24} />
            </a>
          </div>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
