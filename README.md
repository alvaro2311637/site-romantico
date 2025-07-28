# Álvaro ❤️ Gabriella - Landing Page Romântica com Mini-Jogo

Uma experiência digital única e romântica criada especialmente para o casal Álvaro e Gabriella, agora com um mini-jogo interativo da memória!

## 🌟 Características

### Design
- **Paleta de cores**: Rosa claro, branco e toques dourados
- **Tipografia**: Fontes elegantes (Dancing Script, Playfair Display, Inter)
- **Estilo**: Minimalista, delicado e sofisticado
- **Animações**: Partículas flutuantes, efeitos de hover e transições suaves

### Funcionalidades
- **Seção Hero**: Nomes do casal com animações românticas
- **Mini-Jogo da Memória**: Jogo interativo com ícones românticos
- **Transição Suave**: Do jogo para a galeria de fotos
- **Galeria Interativa**: 4 imagens com modal de visualização
- **Navegação**: Setas, teclado e gestos touch
- **Responsividade**: Adaptação perfeita para todos os dispositivos
- **Performance**: Código otimizado e carregamento rápido

## 🎮 Mini-Jogo da Memória

### Como Funciona
1. **Objetivo**: Encontrar todos os 4 pares de ícones românticos
2. **Ícones**: Corações (❤️), Alianças (💍), Beijos (💋), Casal (👫)
3. **Mecânica**: Clique em duas cartas para virá-las
4. **Vitória**: Ao completar todos os pares, desbloqueie a galeria
5. **Contador**: Acompanhe seus movimentos
6. **Reiniciar**: Botão para começar novamente

### Características do Jogo
- **Embaralhamento**: Cartas são embaralhadas a cada partida
- **Animações 3D**: Efeito de virar cartas em 3D
- **Feedback Visual**: Animações de acerto e erro
- **Efeito de Celebração**: Confetes ao completar o jogo
- **Transição Elegante**: Animação suave para revelar a galeria

## 📱 Responsividade

O site foi desenvolvido com abordagem mobile-first e inclui:

- **Desktop**: Layout completo com todas as animações
- **Tablet**: Adaptação da grid do jogo e tamanhos de fonte
- **Mobile**: Interface otimizada para touch e telas pequenas

### Breakpoints
- `768px`: Tablet e dispositivos médios
- `480px`: Smartphones e dispositivos pequenos

## 🚀 Performance

### Otimizações Implementadas
- **Lazy loading** para imagens
- **Preload** das imagens da galeria
- **Debounce** para eventos de redimensionamento
- **CSS otimizado** com variáveis e animações eficientes
- **JavaScript modular** com funções bem estruturadas
- **Animações GPU-aceleradas** para melhor performance

### Métricas Esperadas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🎨 Estrutura de Arquivos

```
alvaro-gabriella-landing/
├── index.html          # Estrutura principal
├── style.css           # Estilos e animações
├── script.js           # Interatividade e jogo
├── images/             # Galeria de fotos
│   ├── image1.jpeg     # Foto do casal 1
│   ├── image2.jpeg     # Foto do casal 2
│   ├── image3.jpeg     # Foto do casal 3
│   └── image4.jpeg     # Foto do casal 4
└── README.md           # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Flexbox, Grid, animações 3D e variáveis CSS
- **JavaScript ES6+**: Lógica do jogo e interatividade
- **Google Fonts**: Tipografia elegante

## 📋 Funcionalidades Detalhadas

### Seção Hero
- Animação de entrada suave
- Coração pulsante
- Nomes com gradiente animado
- Símbolo do infinito rotativo
- Indicador de scroll para o jogo

### Mini-Jogo da Memória
- 8 cartas (4 pares) com ícones românticos
- Algoritmo Fisher-Yates para embaralhamento
- Animações 3D de flip das cartas
- Sistema de pontuação por movimentos
- Detecção automática de vitória
- Efeito de confetes na conclusão
- Botão de reiniciar jogo

### Galeria (Pós-Jogo)
- Revelada apenas após completar o jogo
- Grid responsiva
- Efeitos de hover elegantes
- Modal com navegação
- Suporte a teclado (setas, ESC)
- Gestos touch (swipe)
- Overlay romântico

### Animações
- Partículas flutuantes de fundo
- Efeito parallax sutil
- Transições suaves entre seções
- Animações de entrada
- Micro-interações
- Confetes de celebração

## 🔧 Personalização

### Cores
As cores podem ser facilmente alteradas modificando as variáveis CSS em `:root`:

```css
:root {
    --primary-pink: #f8d7da;
    --soft-pink: #fce4ec;
    --light-pink: #fdf2f8;
    --gold: #d4af37;
    /* ... */
}
```

### Conteúdo
- **Nomes**: Alterar no HTML (linha 25-29)
- **Frase romântica**: Modificar no HTML (linha 31)
- **Mensagem do jogo**: Editar no HTML (linha 46-47)
- **Mensagem do rodapé**: Editar no HTML (linha final)

### Jogo
- **Ícones**: Modificar os emojis nas cartas (HTML)
- **Número de pares**: Ajustar no HTML e JavaScript
- **Dificuldade**: Alterar tempo de visualização das cartas

### Imagens
Substituir os arquivos na pasta `images/` mantendo os nomes:
- `image1.jpeg`
- `image2.jpeg`
- `image3.jpeg`
- `image4.jpeg`

## 🌐 Compatibilidade

### Navegadores Suportados
- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

### Dispositivos
- **Desktop**: 1920x1080 e superiores
- **Laptop**: 1366x768 e superiores
- **Tablet**: 768x1024 (iPad e similares)
- **Mobile**: 375x667 (iPhone e Android)

## 🎯 Fluxo da Experiência

1. **Chegada**: Usuário vê a seção hero romântica
2. **Convite**: Scroll ou clique leva ao mini-jogo
3. **Diversão**: Jogo da memória com tema romântico
4. **Recompensa**: Ao vencer, galeria é desbloqueada
5. **Memórias**: Visualização das fotos especiais do casal
6. **Encerramento**: Mensagem carinhosa no rodapé

## 💝 Detalhes Especiais

Esta landing page foi criada com muito carinho e atenção aos detalhes para capturar a essência do amor entre Álvaro e Gabriella. O mini-jogo adiciona um elemento lúdico e interativo, tornando a experiência ainda mais especial e memorável. Cada animação, cor e elemento foi pensado para transmitir romance, elegância e a alegria de um relacionamento especial.

---

*"Feitos um para o outro" ❤️*

