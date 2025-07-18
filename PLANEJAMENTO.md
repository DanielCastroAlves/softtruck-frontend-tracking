````markdown
# 🧠 Planejamento de Desenvolvimento — Desafio Front-End Softruck

Este documento representa o levantamento e as decisões de planejamento tomadas com base no enunciado do teste técnico da Softruck Brasil. O objetivo é mostrar como o desafio foi compreendido, decomposto em tarefas e estruturado tecnicamente para garantir clareza, escalabilidade e foco nas entregas solicitadas.

---

## 📋 Interpretação do Enunciado

### Requisitos principais

- Criar uma **tela com mapa**
- Animação de **carro com sprite** baseada na **direção**
- Basear-se em **dados geográficos e imagem sprite fornecida**

### Tarefas bônus

- Utilizar a **velocidade** real do veículo para controlar o tempo de deslocamento
- Permitir o usuário **selecionar qual trajeto** será animado

### Critérios de avaliação

- Internacionalização dos textos
- Utilização de bons padrões de código
- Utilização de SCSS
- Versionamento claro e progressivo

---

## 🧱 Quebra do Problema em Partes

1. **Mapa interativo com rota**  
   → Exibir um mapa e desenhar rotas a partir dos dados GPS

2. **Animação do carro com direção**  
   → Mostrar um carro animado seguindo a rota e girando de acordo com o ângulo

3. **Velocidade dinâmica**  
   → Ajustar a animação à velocidade real entre os pontos GPS

4. **Seleção de trajeto**  
   → Ter uma interface que permita escolher entre múltiplas rotas

5. **Interface de controle (HUD e botões)**  
   → Exibir dados como velocidade, tempo, ângulo, play/pause/reset

6. **Internacionalização**  
   → Permitir trocar idioma (PT ↔ EN) sem recarregar a página

7. **Boas práticas de arquitetura**  
   → Separar componentes, hooks, contextos e estilos de forma escalável

---

## 🧠 Decisões Técnicas e Justificativas

| Tecnologia               | Motivo da escolha                                                       |
| ------------------------ | ----------------------------------------------------------------------- |
| **React + Vite**         | Stack moderna, rápida, com suporte completo a TypeScript e excelente DX |
| **TypeScript**           | Segurança, legibilidade e intellisense                                  |
| **Leaflet.js**           | Biblioteca leve e gratuita para mapas, sem tokens externos obrigatórios |
| **@turf/**               | Cálculos de rota, direção, distância e suavização com precisão          |
| **SCSS Modules**         | Organização local de estilos por componente                             |
| **MUI (Material UI)**    | Rapidez no desenvolvimento de UI responsiva e acessível                 |
| **react-i18next**        | Biblioteca madura para internacionalização e fallback automático        |
| **OpenRouteService API** | Utilizada opcionalmente para "snapping" realista das rotas no mapa      |

---

## 📁 Organização Planejada

```bash
src/
├── assets/               # Sprite do carro
├── components/           # Car, MapView, HUD, Controles
├── contexts/             # GPS e simulação (via Context API)
├── data/                 # JSON com pontos GPS
├── hooks/                # useCarAnimation para controlar movimento
├── services/             # Carregamento e seleção de rotas
├── utils/                # Cálculos, snapping, formatação
├── i18n/                 # Traduções pt/en
├── types/                # Tipagens customizadas
└── styles/               # SCSS modularizado (dentro de componentes)
```
````

---

## 🧩 Etapas previstas (em ordem lógica)

1. Setup inicial com Vite + React + TS + SCSS
2. Renderizar o mapa com rota estática
3. Criar animação do carro com sprite baseado na direção (bearing)
4. Implementar lógica de movimentação com base em velocidade real
5. Criar painel com controles (play/pause/reset + HUD + seletor de rota)
6. Implementar internacionalização com `react-i18next`
7. Integrar API do ORS (opcional)
8. Refatorar estilos para SCSS modules
9. Revisar responsividade e refinar UI

---

## 🔄 Versionamento e Padrões

- Commits com convenção semântica (`feat:`, `fix:`, `docs:`, `refactor:` etc.)
- Separação clara entre estrutura, lógica e estilos
- Manutenção da coesão por responsabilidade (SRP)

---

## 🧭 Resultado Esperado

Um simulador veicular funcional que demonstra:

- Compreensão do problema e domínio técnico
- Capacidade de decompor tarefas e organizá-las
- Solução fluida, performática e escalável
- Interface responsiva e internacionalizada

---

## 📝 Observações Finais

O planejamento acima foi usado como guia, com espaço para adaptações conforme surgiram necessidades (ex: detecção de paradas, HUD mais avançado, snapping com ORS). A documentação, código-fonte e estrutura refletem esse raciocínio técnico progressivo.

```

```
