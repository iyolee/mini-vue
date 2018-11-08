# mini-vue

A mini Vue Framework.

### run

```
npm install
npm run dev
```

Generating a file `vue.js` in the `dist` directory.

### build

```
npm install
npm run build
```

Generating a file `vue.min.js` in the `dist` directory.

### Usage

```html
<div id="app">
  <p>{{person.name}}</p>
  <p v-text="msg"></p>
  <p>{{msg}}</p>
  <p v-html="msg"></p>
  <input type="text" v-model="msg">
  <button v-on:click="clickMe">按钮</button>
</div>
```

```js
<script type="text/javascript" src="./dist/vue.min.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      msg: 'hello vue',
      person: {
        name: 'leeper'
      }
    },
    methods: {
      clickMe() {
        this.msg = 'hello world',
        this.person.name = 'Jenkin Lee'
      }
    }
  })
</script>
```

### LICENSE

**MIT**
