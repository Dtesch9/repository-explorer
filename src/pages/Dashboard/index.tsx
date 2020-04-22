import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => (
  <>
    <img src={logoImg} alt="Logo" />
    <Title>Explore repositórios no Github</Title>

    <Form>
      <input placeholder="Digite o nome do repositório" />
      <button type="submit">Pesquisar</button>
    </Form>

    <Repositories>
      <a href="/">
        <img
          src="https://api.adorable.io/avatars/55/abott@adorable.png"
          alt="Douglas Tesch"
        />
        <div>
          <strong>Dtesch/fastfeet</strong>
          <p>Best delivery option you have ever known</p>
        </div>

        <FiChevronRight size={24} />
      </a>

      <a href="/">
        <img
          src="https://api.adorable.io/avatars/55/abott@adorable.png"
          alt="Douglas Tesch"
        />
        <div>
          <strong>Dtesch/fastfeet</strong>
          <p>Best delivery option you have ever known</p>
        </div>

        <FiChevronRight size={24} />
      </a>
    </Repositories>
  </>
);

export default Dashboard;
