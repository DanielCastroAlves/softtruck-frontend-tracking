Claro! Aqui está a versão **atualizada e completa** do seu `README.md`, agora com:

- Checklist técnico completo
- Fluxo real do sistema
- Referência à API externa (OpenRouteService)
- Explicação sobre `.env`
- Justificativas das bibliotecas usadas

---

````markdown
# 🚚 Softtruck Frontend Tracking

Simulador visual e interativo de rastreamento veicular baseado em dados GPS reais, com animação sprite fluida, seleção de rotas, controle de velocidade, internacionalização e painel informativo.

Desenvolvido como solução ao **teste técnico de front-end da Softruck Brasil**.

---

## ✅ Objetivo do desafio

> Criar uma tela com um mapa que faça a animação da imagem no sprite com base na direção do carro.
>
> Tarefas bônus:
>
> - Utilizar a **velocidade** do veículo para controlar a animação
> - Permitir ao usuário selecionar qual **trajeto** será exibido

---

## 🧪 Checklist técnico

| Requisito                                      | Status   |
| ---------------------------------------------- | -------- |
| Mapa com sprite animado por direção            | ✅ Feito |
| Velocidade real afeta deslocamento             | ✅ Feito |
| Seleção de trajetos dinâmicos                  | ✅ Feito |
| Internacionalização (pt/en)                    | ✅ Feito |
| SCSS modularizado                              | ✅ Feito |
| Padrões de código e componentização            | ✅ Feito |
| Uso de versionamento com commits bem definidos | ✅ Feito |
| Justificativa técnica das escolhas no README   | ✅ Feito |
| Uso opcional de API externa (OpenRouteService) | ✅ Feito |

---

## 🚀 Como rodar o projeto

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/softtruck-frontend-tracking.git
cd softtruck-frontend-tracking

# 2. Instale as dependências
npm install

# 3. Rode em ambiente de desenvolvimento
npm run dev
```
````

> 💡 Requisitos: Node.js 18+

---

## 🔐 Variáveis de ambiente

Se quiser utilizar o **snapping de rota via OpenRouteService (ORS)**, crie um arquivo `.env` na raiz com:

```bash
VITE_ORS_API_KEY=your_api_key_here
```

> O uso da API do ORS é **opcional**. O sistema funciona mesmo sem esse recurso.

---

## 🔍 Tecnologias utilizadas

| Tecnologia              | Justificativa                                                                  |
| ----------------------- | ------------------------------------------------------------------------------ |
| React + Vite            | Performance e simplicidade no desenvolvimento com TypeScript moderno           |
| Leaflet + React-Leaflet | Mapa interativo sem dependência de tokens pagos (ex: Mapbox)                   |
| Turf.js                 | Cálculo de distância, suavização e direção geográfica com precisão             |
| SCSS Modules            | Organização local dos estilos e reaproveitamento com isolamento por componente |
| Material UI (MUI)       | Componentes visuais prontos e responsivos, com visual consistente              |
| react-i18next           | Internacionalização profissional com suporte a fallback e namespaces           |

---

## 🌐 Internacionalização

A interface possui suporte a dois idiomas:

- 🇧🇷 Português
- 🇺🇸 Inglês

Você pode alternar o idioma usando o seletor no painel lateral.

---

## 📁 Estrutura de pastas

```bash
src/
├── App.tsx
├── main.tsx
├── assets/
│   └── cars.png
├── components/
│   ├── Car/
│   ├── Dashboard/
│   │   ├── components/
│   │   └── styles/
│   ├── HUD/
│   ├── MapView/
│   ├── RouteMarkers/
│   ├── FollowCarControl/
│   └── StopFollowOnZoom/
├── config/
├── contexts/
├── data/
│   └── frontend_data_gps.json
├── hooks/
│   └── useCarAnimation.ts
├── services/
│   └── useRouteData.ts
├── utils/
│   ├── fetchRouteSnap.ts     
│   ├── angle.ts
│   └── format.ts
├── i18n/
│   ├── en.json
│   └── pt.json
└── types/
```

---

## 🔁 Fluxo do sistema

1. **Carga de dados GPS**: JSON simulado com rotas e pontos
2. **Seleção de rota**: via painel (`RouteSelector`)
3. **Interpolação e rotação**: calculada com `turf.along` + `turf.bearing`
4. **Sprite animado**: 120 frames para cada ângulo de direção, renderizado por `Car.tsx`
5. **Detecção de paradas**: velocidade zero por tempo mínimo gera marcador vermelho
6. **HUD em tempo real**: velocidade, tempo rodando/parado, ângulo atual
7. **Controle do mapa**: seguir veículo, pausar, resetar, mudar idioma

---

## 📄 Planejamento

Ver arquivo [`PLANEJAMENTO.md`](./PLANEJAMENTO.md) para detalhes de decisões de arquitetura, tarefas e organização do desenvolvimento.

---

## 📫 Contato

Desenvolvido por Daniel Castro Alves
📧 [danielvortex@hotmail.com](mailto:danielvortex@hotmail.com)
🌐 [LinkedIn](https://www.linkedin.com/in/daniel-castro-alves)

---

## 📝 Licença

MIT License — Livre para uso, modificação e distribuição.

```

```
