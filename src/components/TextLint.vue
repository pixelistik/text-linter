<template>
  <div class="container">
    <div class="text-lint">
      <textarea v-model="text" class="textedit" spellcheck="false" id="textedit"></textarea>
      <div
        v-for="hint in hints"
        :key="hint.start + hint.end"
        class="overlay hint"
        :class="hint.type"
      >{{ hint.precedingText }}<span class="highlight">{{ hint.text }}</span>
        <div class="description">{{ hint.description }}</div>
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
  width: 400px;
  height: 400px;
  padding: 0;
  margin: 0;
  line-height: 1.4em;
  border: 1px solid #333;
  padding: 1em;
}

.overlay {
  color: rgba(0, 0, 0, 0);
  pointer-events: none;
  white-space: pre-wrap;
}

.highlight {
  border-bottom: 1px solid;
}

.forbidden .highlight {
  border-color: red;
}

.description {
  display: inline-block;
  color: #333;
  position: absolute;
  left: 400px;
  width: 400px;
  margin-left: 1.2em;
  background: #fff;
}
</style>
