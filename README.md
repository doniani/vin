# 🏆 Vin - Plataforma de Acompanhamento Esportivo

<div align="center">
  <img src="public/vin-icon.svg" alt="Vin Logo" width="120" height="120">
  
  **Plataforma completa para acompanhamento de atletas estudantis e conexão com oportunidades universitárias**
  
  [![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/doniani/vin)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18.0+-61dafb)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.0+-646cff)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38bdf8)](https://tailwindcss.com/)
</div>

## 📋 Sobre o Projeto

A **Vin** é uma plataforma SaaS inovadora que permite que pais, atletas e treinadores acompanhem de forma completa a evolução esportiva e acadêmica de estudantes-atletas, facilitando a conexão com oportunidades universitárias através de insights acionáveis, benchmarks e ferramentas de comunicação.

### 🎯 Objetivo Principal
Conectar atletas estudantis com oportunidades universitárias, fornecendo uma visão 360° do desenvolvimento esportivo, acadêmico e pessoal.

## ✨ Funcionalidades Principais

### 👥 Perfis de Usuários
- **Pais/Mães**: Acompanhamento financeiro, evolução acadêmica e saúde
- **Alunos/Atletas**: Monitoramento de treinos, metas e evolução pessoal
- **Treinadores**: Feedback estruturado, comparativos e recomendações
- **Universidades/Recrutadores**: Acesso a perfis públicos (versão futura)

### 🚀 Módulos da Plataforma

#### 1. 📊 Dashboard de Evolução
- Gráficos interativos mostrando progresso ao longo do tempo
- Comparação com benchmarks de atletas que conseguiram bolsa
- Alertas de performance personalizados
- Métricas de velocidade, força e resultados de jogos

#### 2. 📅 Calendário de Oportunidades
- Deadlines de recrutamento, SAT/ACT, camps e showcases
- Alertas automáticos de janelas de contato com universidades
- Planejamento de eventos e competições
- Integração com calendários externos

#### 3. 💬 Comunicação & Visibilidade
- Compartilhamento de perfis com recrutadores
- Geração automática de highlight reels
- Área para feedback dos treinadores
- Sistema de mensagens integrado

#### 4. 🎯 Metas & Planos
- Definição de objetivos de curto, médio e longo prazo
- Planos de treino recomendados baseados em deficiências
- Integração com wearables (Apple Watch, Garmin, Whoop)
- Acompanhamento de progresso em tempo real

#### 5. 💰 Finanças & Orçamento
- Planejamento de custos de camps, viagens, equipamentos
- Alertas de bolsas e programas de auxílio disponíveis
- Controle de despesas e receitas
- Relatórios financeiros detalhados

#### 6. ⚖️ Compliance & Regras
- Monitoramento automático de regras NCAA/NAIA/NJCAA
- Checklists de elegibilidade acadêmica
- Informações sobre NIL (Name, Image, Likeness)
- Alertas de conformidade

#### 7. 🏆 Gamificação
- Badges de conquistas personalizados
- Sistema de ranking interno (opcional)
- Metas e desafios motivacionais
- Progresso visual e recompensas

## 🛠️ Tecnologias Utilizadas

### Core
- **Vite.js**: Build tool ultrarrápido
- **React 18**: Biblioteca UI moderna
- **TypeScript**: JavaScript tipado para maior confiabilidade

### Estilização
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Componentes reutilizáveis e acessíveis
- **Framer Motion**: Animações fluidas e responsivas

### Utilidades
- **React Router**: Navegação SPA
- **Lucide Icons**: Ícones modernos e consistentes
- **Class Variance**: Estilos dinâmicos
- **Recharts**: Gráficos interativos

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/doniani/vin.git
cd vin
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

### Build para Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── charts/         # Componentes de gráficos
│   └── layout/         # Componentes de layout
├── contexts/           # Contextos React (Auth, Theme)
├── pages/              # Páginas da aplicação
├── types/              # Definições de tipos TypeScript
├── utils/              # Funções utilitárias
└── assets/             # Recursos estáticos
```

## 🎨 Temas e Personalização

A plataforma suporta:
- **Tema Claro**: Interface limpa e moderna
- **Tema Escuro**: Redução de fadiga visual
- **Tema Sistema**: Segue as preferências do SO
- **Modo Responsivo**: Adaptação automática para mobile/tablet

## 📱 Responsividade

- ✅ **Desktop**: Experiência completa
- ✅ **Tablet**: Interface adaptada
- ✅ **Mobile**: Navegação otimizada
- ✅ **PWA Ready**: Preparado para instalação

## 🔧 Configuração de Desenvolvimento

### ESLint
O projeto utiliza ESLint com configurações TypeScript rigorosas para manter a qualidade do código.

### TypeScript
Configuração otimizada com path mapping e strict mode ativado.

### Tailwind CSS
Configuração customizada com variáveis CSS para temas e componentes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Doniani**
- GitHub: [@doniani](https://github.com/doniani)

## 🙏 Agradecimentos

- [React](https://reactjs.org/) - Biblioteca de interface
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes
- [Lucide](https://lucide.dev/) - Ícones

---

<div align="center">
  <p>Feito com ❤️ para o futuro dos atletas estudantis</p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div>