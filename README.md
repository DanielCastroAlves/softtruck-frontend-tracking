```markdown
# 🚚 Softtruck Front-End Tracking

Simulador de rastreamento veicular desenvolvido em React + Leaflet, com animação baseada em dados GPS reais e foco em experiência de usuário e performance.

## 📦 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Leaflet](https://leafletjs.com/) + React Leaflet
- [MUI (Material UI)](https://mui.com/)
- [i18next](https://react.i18next.com/) para internacionalização
- [Turf.js](https://turfjs.org/) para geocálculos e interpolação de rota
- [OpenStreetMap](https://www.openstreetmap.org/) como fonte de tiles
- Arquivos `.json` com dados GPS enriquecidos

## 🚀 Funcionalidades

- Animação fluida de veículo com base em dados GPS reais
- Interface responsiva e mobile-first
- Painel com:
  - Controle de velocidade do veículo
  - Botão para centralizar no carro
  - Troca de rotas (mockadas)
  - HUD com dados de tempo parado, tempo rodando, velocidade e ângulo
- Renderização de rota interpolada e suavizada com snapping
- Internacionalização (🇧🇷 PT-BR / 🇺🇸 EN-US)
- Arquitetura modularizada com:
  - Hooks reutilizáveis (`useCarAnimation`)
  - Separação de camadas: `features`, `components`, `hooks`, `contexts`, `services` e `utils`

## 📂 Estrutura de Pastas

```

src/
├── components/
│   ├── Car/
│   ├── Dashboard/
│   ├── FollowCarControl/
│   └── StopFollowOnZoom/
├── features/
│   └── MapView/
├── hooks/
│   └── useCarAnimation.ts
├── i18n/
│   ├── index.ts
│   ├── en.json
│   └── pt.json
├── services/
│   └── useRouteData.ts
├── utils/
│   └── fetchRouteSnap.ts
├── contexts/
│   └── GpsContext.tsx
├── data/
│   └── frontend\_data\_gps\_enriched\_with\_address.json

````

## ⚙️ Rodando o projeto localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/softtruck-frontend-tracking.git
cd softtruck-frontend-tracking
````

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com a seguinte variável (se necessário):

```

4. Rode a aplicação:

```bash
npm run dev
```

5. Acesse em: [http://localhost:5173](http://localhost:5173)

## 📌 Requisitos Atendidos

Este projeto foi desenvolvido como parte de um desafio técnico com os seguintes focos:

* ✅ Roteamento animado com dados reais
* ✅ Estrutura modular e bem organizada
* ✅ Visual limpo, moderno e responsivo
* ✅ Internacionalização
* ✅ Interatividade com controle de simulação

## 🧠 Autor

**Daniel Castro**

* GitHub: [@DanielCastroAlves](https://github.com/DanielCastroAlves)
* LinkedIn: [linkedin.com/in/danielcastroalves](https://linkedin.com/in/danielcastroalves)


