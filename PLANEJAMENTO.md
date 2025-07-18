# 🧠 Planejamento de Desenvolvimento — Desafio Front-End Softruck

Este documento descreve o raciocínio e as decisões técnicas que fundamentaram o desenvolvimento do projeto **Softtruck Frontend Tracking**, criado como solução para o desafio técnico de front-end da Softruck Brasil.

---

## 📋 Interpretação do Enunciado

### Requisitos principais

- Criar uma **tela com mapa**
- Animação de **carro em sprite sheet** com base na **direção**
- Utilização de **dados geográficos reais e imagem sprite fornecida**

### Tarefas bônus

- Utilizar a **velocidade real** para controlar a animação
- Permitir que o usuário **selecione o trajeto**

### Critérios de avaliação

- Internacionalização da interface
- Padrões de código e organização
- Estilização com SCSS
- Histórico de versionamento claro e incremental

---

## 🧱 Quebra do Problema em Partes

1. **Renderização do mapa e rota**  
   → Exibir as rotas a partir de dados GPS reais em um mapa interativo

2. **Animação direcional com sprite**  
   → Fazer o carro se mover com base no ângulo entre os pontos (bearing)

3. **Velocidade baseada em dados reais**  
   → Animação proporcional à velocidade real informada nos dados

4. **Seleção de trajetos**  
   → Usuário pode trocar o percurso com botão seletor

5. **HUD e painel de controle**  
   → Exibir velocidade, tempo rodando/parado, ângulo e permitir controle da simulação

6. **Detecção de paradas**  
   → Marcar automaticamente locais onde o veículo ficou parado por tempo mínimo

7. **Internacionalização (i18n)**  
   → Interface traduzida em tempo real entre PT, EN e ES

8. **Boas práticas arquiteturais**  
   → Separação de contextos, hooks, componentes, estilos e dados

---

## 🧠 Decisões Técnicas e Justificativas

| Tecnologia               | Motivo da escolha |
|--------------------------|-------------------|
| **React + Vite**         | Stack moderno e rápido, ótimo DX com suporte nativo a TypeScript |
| **TypeScript**           | Segurança, tipagem e escalabilidade |
| **Leaflet.js**           | Biblioteca leve de mapas, sem dependência de APIs pagas |
| **@turf/**               | Cálculo de distância, ângulo e interpolação geográfica |
| **SCSS Modules**         | Escopo local de estilos por componente |
| **MUI (Material UI)**    | Componentes acessíveis e responsivos, com rapidez de entrega |
| **react-i18next**        | Internacionalização fluida e profissional |
| **OSRM API (opcional)**  | Suavização beta das rotas via rede viária — funcionalidade experimental |

> ❗️ O uso do OSRM foi tentado como alternativa para suavizar os pontos do GPS com base nas ruas do mapa, mas foi mantido como recurso **beta e não ativo por padrão**, devido a limitações no traçado gerado.

---

## 📁 Organização Planejada

```bash
src/
├── assets/               # Sprite do carro e ícones
├── components/           # Carro, HUD, botões, painel lateral
├── page/MapView/         # Tela principal com simulação
├── contexts/             # GPS e simulação global
├── data/                 # Arquivos de rotas e pontos GPS
├── hooks/                # Lógica de animação (useCarAnimation)
├── services/             # Carregamento e seleção de rotas
├── utils/                # Funções auxiliares e snapping (OSRM)
├── config/               # Configurações de mapa
├── i18n/                 # Traduções pt, en, es
├── types/                # Tipagens customizadas
└── main.tsx              # Inicialização do app
```

---

## 🧩 Etapas do Desenvolvimento

1. Setup do projeto com Vite + React + TypeScript + SCSS
2. Renderização inicial do mapa com rota básica
3. Implementação da animação do carro via sprite sheet e rotação com `bearing`
4. Aplicação da lógica de movimento com base em velocidade real
5. Criação do painel com HUD e controles da simulação
6. Detecção de paradas automáticas por tempo parado
7. Internacionalização com `react-i18next` (PT, EN, ES)
8. Organização dos estilos com SCSS modules
9. Tentativa de suavização de rota com OSRM (modo beta)
10. Ajustes finais de UI e responsividade

---

## 🔄 Versionamento e Padrões

- Commits com convenção semântica: `feat:`, `fix:`, `chore:`, `refactor:`, etc.
- Componentização com responsabilidade única (SRP)
- Código dividido por domínio (mapa, HUD, painel, controle, simulação)

---

## 🧭 Resultado Esperado

O projeto buscou entregar uma solução:

- Técnica, limpa e escalável
- Fiel aos requisitos do desafio
- Visualmente clara e responsiva
- Com internacionalização real e estrutura extensível

---

## 📝 Observações Finais

O planejamento guiou o desenvolvimento com clareza e margem para ajustes. Alguns elementos evoluíram além do escopo original, como a detecção de paradas, suporte multilíngue com 3 idiomas e organização avançada da arquitetura. A tentativa de suavização com OSRM foi implementada como recurso opcional e documentada como beta.

