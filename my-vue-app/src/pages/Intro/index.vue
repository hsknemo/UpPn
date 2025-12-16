
<script setup>

  const mineRef = ref()
  const readmd = async function(callback) {
    callback(await import('./mine.md'))
  }

  const delay = async ms => new Promise(resolve => {
    setTimeout(resolve, ms)
  })

  readmd(async target => {
    if (localStorage.getItem('writed')) {
      mineRef.value = target.html
      return
    }
    localStorage.setItem('writed', true)
    for (let i = 0; i < target.html.length; i++) {
      await delay(1000 / 60)
      mineRef.value += target.html[i]
    }
    mineRef.value = target.html
  })


</script>
<template>
  <div class="max-full intro-container" >
    <div v-html="mineRef" v-highlight></div>
  </div>
</template>


<style lang="scss" scoped>

@mixin hover-highlight-text($startColor:#e7ff00, $endColor:#f46527) {
  &:hover {
    background-image: linear-gradient(to right,  $startColor, $endColor);
    background-clip: text;
    color: transparent;
  }
}
.intro-container {
  width: 50%;
  padding: 1.2em;
  box-sizing: border-box;




  ::v-deep {
    h1, h2, h3, h4, h5, h6 {
      a {
        display: none;
      }
    }
    p {
      margin-top: 2em;
      color: var(--half-gray-128);
    }

    a {
      color: var(--md-h1-color);
    }

    .keyword, .keyword a {
      transition: all .3s;
    }
    .keyword {
      color: var(--md-h1-color);
      @include hover-highlight-text();
      a {
        @include hover-highlight-text();
      }

    }

    ul {
      color: var(--half-gray-128);
      margin-top: 10px;
      font-family: var(--common-font-family);
      margin-left: 1.5em;
    }
    p {
        font-family: 'inter var', 'sans-serif';
        line-height: 1.6;
        letter-spacing: 1px;
      }
    h1 {
      font-size: var(--intro-h1-size);
      color: var(--intro-h1);
      transform: translateX(0);
      //animation: rightToLeft ease-in-out .6s forwards 2;
    }
  }

}


@keyframes rightToLeft {
  0% {
    transform: translateX(0)
  }

  20% {
    transform: translateX(20px)
  }

  50% {
    transform: translateX(0px)
  }

  70% {
    transform: translateX(20px)
  }

  100% {
    transform: translateX(0px)
  }
}
</style>
