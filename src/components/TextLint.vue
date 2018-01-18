<template>
  <div class="container">
    <div class="text-lint">
      <textarea v-model="text" class="textedit" spellcheck="false" id="textedit"></textarea>
      <div v-for="hint in hints" class="overlay" id="overlay">
        {{ hint.precedingText }}<span class="highlight">{{ hint.text }}</span>.
      </div>
    </div>
  </div>
</template>

<script>
import Linter from './Linter';

export default {
  name: 'TextLint',
  data() {
    return {
      text: 'Welcome to Your Vue.js App without React',
    };
  },
  computed: {
    hints() {
      return Linter.lint(this.text);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: absolute;
}

.textedit, .overlay {
  position: absolute;
  font-family: Courier;
  font-size: 16px;
  width: 400px;
  height: 400px;
  padding: 0;
  margin: 0;
  line-height: 1em;
  border: 1px solid #333;
  padding: 1em;
}

.overlay {
  color: rgba(0, 0, 0, 0);
  pointer-events: none;
}

.highlight:hover {
  background: red;
}

.highlight {
  border-bottom: 1px solid red;
}
</style>
