<template>
  <div class="container">
    <div class="text-lint">
      <textarea
        v-model="text"
        @mousemove="showHintDetails"
        class="textedit"
        spellcheck="false"
        id="textedit">
      </textarea>
      <div
        v-for="hint in hints"
        :key="hint.start + hint.end"
        class="overlay hint"
        :class="hint.type"
      >{{ hint.precedingText }}<span class="highlight">{{ hint.text }}<div class="description">
          {{ hint.description }}</div>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
import Linter from '@/Linter';

export default {
  name: 'TextLint',
  data() {
    return {
      text: 'Welcome to Your Vue.js App without React (or Java).\n\nThis Softwre spots typos. And common errors, like "FireFox".',
    };
  },
  computed: {
    hints() {
      return Linter.lint(this.text);
    },
  },
  methods: {
    showHintDetails(event) {
      const hintElements = this.$el.querySelectorAll('.highlight');
      for (let i = 0; i < hintElements.length; i += 1) {
        const left = hintElements[i].offsetLeft;
        const right = hintElements[i].offsetLeft + hintElements[i].offsetWidth;

        const top = hintElements[i].offsetTop;
        const bottom = hintElements[i].offsetTop + hintElements[i].offsetHeight;

        if (
          left < event.x && event.x < right &&
                top < event.y && event.y < bottom
        ) {
          hintElements[i].classList.add('highlight--hovered');
        } else {
          hintElements[i].classList.remove('highlight--hovered');
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
.container {
  position: absolute;
}

.textedit, .overlay {
  position: absolute;
  font-family: Courier;
  font-size: 16px;
  width: 90vw;
  height: 400px;
  padding: 0;
  margin: 0;
  line-height: 1.5em;
  border: 1px solid #333;
  padding: 2em 1em;
}

.overlay {
  color: rgba(0, 0, 0, 0);
  pointer-events: none;
  white-space: pre-wrap;
}

.highlight {
  border-bottom: 2px solid;
  position: relative;
}

.forbidden .highlight {
  border-color: red;
}

.common-mistake .highlight {
  border-color: blue;
}

.typo .highlight {
  border-color: yellow;
}

.description {
  display: none;
  color: #333;
  position: absolute;
  padding: 0.2em;
  width: 20em;
  left: 0;
  bottom: 1.1em;
  background: #fff;
  border: 1px solid #333;
  white-space: normal;
  text-align: center;
  z-index: 1;
}

.highlight--hovered .description {
    display: block;
}
</style>
