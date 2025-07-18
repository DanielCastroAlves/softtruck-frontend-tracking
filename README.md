# 🚚 Softtruck Frontend Tracking

Simulador visual e interativo de rastreamento veicular baseado em dados GPS reais. A aplicação exibe um carro animado em sprite 3D, movendo-se sobre o mapa com base na direção e velocidade reais, com HUD informativo, seleção de trajetos, suporte multilíngue e painel responsivo.

Desenvolvido como solução ao **teste técnico de front-end da Softruck Brasil**.

---

## 🎯 Objetivo do teste

> Criar uma tela com um mapa que faça a animação da imagem no sprite baseada na direção do carro.

### Tarefas bônus incluídas:
- Utilização da **velocidade real** do veículo para controle da animação
- **Seleção dinâmica de trajetos** pelo usuário

---

## ✅ Funcionalidades entregues

- [x] Sprite animado com 120 frames e rotação baseada na direção real
- [x] Animação proporcional à **velocidade do trajeto**
- [x] Troca entre múltiplos percursos com seletor intuitivo
- [x] HUD com velocidade, tempo parado, tempo rodando e ângulo de direção
- [x] Interface multilíngue: 🇧🇷 Português, 🇺🇸 Inglês e 🇪🇸 Espanhol
- [x] Painel de controle e HUD responsivos (mobile / desktop)
- [x] Estilos modulares com SCSS
- [x] Arquitetura escalável com contextos, hooks e paginação dedicada

---

## 🚀 Como executar o projeto

```bash
# Clone o repositório
git clone https://github.com/DanielCastroAlves/softtruck-frontend-tracking.git

cd softtruck-frontend-tracking

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

> 💡 Requisitos: Node.js 18+

---

## 🔀 Modos de execução

O projeto pode funcionar em **dois modos**:

- ✅ **Modo real** (ativo por padrão): utiliza os pontos brutos do GPS como vieram no JSON.
- 🧪 **Modo beta** (opcional): aplica "snapping" via OSRM para suavizar o trajeto com base na malha viária real.

> Este modo é **experimental**: tenta suavizar a rota alinhando os pontos às ruas reais com OSRM, mas pode gerar resultados imprecisos e não é o padrão do sistema.


---

## 🧠 Tecnologias e decisões

| Tecnologia              | Justificativa |
|-------------------------|---------------|
| **React + Vite**        | Setup moderno com ótimo desempenho e suporte nativo a TypeScript |
| **Leaflet + React-Leaflet** | Renderização de mapas 2D sem dependência de tokens pagos (ex: Mapbox) |
| **Turf.js**             | Cálculo de distância, interpolação e ângulo com precisão |
| **Material UI (MUI)**   | Componentes acessíveis e responsivos com baixo esforço |
| **SCSS Modules**        | Organização local de estilos com escopo isolado |
| **react-i18next**       | Internacionalização robusta com fallback e múltiplos idiomas |
| **OSRM API (beta)**     | Tentativa de suavização de rotas via rede viária real (não finalizada) |

---

## 🌐 Idiomas suportados

- 🇧🇷 Português
- 🇺🇸 Inglês
- 🇪🇸 Espanhol

Troque o idioma a qualquer momento usando o seletor no painel lateral.

---

## 📁 Estrutura do projeto

```
src/
├── assets/                # Sprites e ícones
├── components/            # Car, HUD, Painel, Botões, etc.
├── page/MapView/          # Tela principal com mapa e lógica de simulação
├── contexts/              # GpsContext e SimulationContext
├── data/                  # Arquivos JSON e mock de rotas
├── hooks/                 # useCarAnimation (movimentação)
├── services/              # Carregamento de rotas
├── utils/                 # Cálculos, formatação e snapping
├── config/                # Configurações fixas (ex: map.ts)
├── i18n/                  # Traduções pt, en, es
├── types/                 # Tipagens globais
└── main.tsx               # Inicialização do app
```

---

## 📊 Fluxo do sistema

1. Dados GPS são carregados (modo real ou beta)
2. Rota é renderizada no mapa e o usuário pode trocá-la dinamicamente
3. O carro é animado com base na direção (`turf.bearing`) 
4. HUD exibe status: tempo rodando, velocidade 
5. Controles permitem centralizar, pausar, trocar rota e mudar idioma

---

## 📄 Planejamento e arquitetura

As decisões técnicas, estruturação e etapas estão documentadas no arquivo:

📁 [`PLANEJAMENTO.md`](./PLANEJAMENTO.md)

---

## 👤 Autor

Desenvolvido por **Daniel Castro Alves**  
📧 [danielvortex@hotmail.com](mailto:danielvortex@hotmail.com)  
🔗 [linkedin.com/in/danielcfalves](https://linkedin.com/in/danielcfalves)

---

## 📝 Licença

MIT — livre para uso, modificação e distribuição.
