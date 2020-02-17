<template>
  <div class="test_page">
    <div class="container1">
      <div class="battery"></div>
    </div>

    <div class="container2">
      <div class="header"></div>
      <div class="battery"></div>
      <div class="battery_copy">
        <div class="g-wave"></div>
        <div class="g-wave"></div>
        <div class="g-wave"></div>
      </div>
    </div>

    <div class="black_bg">
      <div class="container">
        <div class="num">{{ num + '%' }}</div>
        <div class="contrast">
          <div class="circle"></div>
          <ul class="bubbles">
            <li v-for="item in 15" :key="item"></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg_clip">
      <p><span>富强 民主 文明 和谐</span></p>
      <p><span>自由 平等 公正 法制</span></p>
      <p><span>爱国 敬业 诚信 友善</span></p>
      <p><span>私はあなたが好きです</span></p>
      <p><span>愛しです</span></p>
      <p><span>ともたち</span></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0.1
    }
  },
  mounted() {
    this.numAdd();
  },
  methods: {
    numAdd() {
      let timer = setInterval(() => {
        this.num = Number(this.num);
        if (this.num < 99.9) {
          this.num = (this.num + 0.1).toFixed(1);
        } else {
          clearInterval(timer);
          timer = null;
        }
      }, 100);
    }
  }
}
</script>

<style lang="scss" scoped>
%container {
  position: relative;
  width: 140px;
  margin: 40px auto;
}
.test_page {
  display: flex;
  background: #e4e4e4;
  flex-direction: column;
}
.container1 {
  @extend %container;
  .battery {
    height: 220px;
    background-color: #fff;
    border-radius: 15px 15px 5px 5px;
    box-sizing: border-box;
    filter: drop-shadow(0 1px 3px rgba(0,0,0,0.22));  // 阴影
    z-index: 1;
    &::before {
      content: '';
      width: 26px;
      height: 10px;
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 5px 5px 0 0;
      background: rgba(240, 240, 240, .88);
    }
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 90%;
      background: linear-gradient(to bottom, #7abcff 0%, #00BCD4 44%, #2196F3 100%);
      border-radius: 0 0 5px 5px;
      animation: battery1 6s linear infinite;
      box-shadow: 0 14px 28px rgba(33, 150, 243, 0), 0 10px 10px rgba(9, 188, 215, .08);
      filter: hue-rotate(90deg);  // 色相反转
    }
  }
}

.container2 {
  @extend %container;
  .header {
    width: 26px;
    height: 10px;;
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, .88);
    border-radius: 5px 5px 0 0;
  }
  .battery_copy {
    position: absolute;
    top: 0;
    left: 0;
    height: 220px;
    width: 140px;
    border-radius: 15px 15px 5px 5px;
    overflow: hidden;
  }
  .battery {
    position: relative;
    height: 220px;
    background: #fff;
    border-radius: 15px 15px 5px 5px;
    box-sizing: border-box;
    box-shadow: 0 0 5px 2px rgba(255, 255, 255, .22);
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 80%;
      border-radius: 0 0 5px 5px;
      background: linear-gradient(to bottom, #7abcff 0%, #00BCD4 44%, #2196F3 100%);
      box-shadow: 0 14px 28px rgba(33, 150, 243, 0), 0 10px 10px rgba(9, 188, 215, 0.08);
      filter: hue-rotate(90deg);
      animation: battery1 10s linear infinite;
    }
  }
  .g-wave {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 300px;
    border-radius: 45% 47% 44% 42%;
    background: rgba(255, 255, 255, .8);
    animation: move 10s linear infinite;
    &:nth-of-type(2) {
      border-radius: 38% 46% 43% 47%;
      transform: translate(-50%, 0) rotate(-135deg);
    }
    &:nth-of-type(3) {
      border-radius: 42% 46% 37% 40%;
      transform: translate(-50%, 0) rotate(135deg);
    }
  }
}
@keyframes battery1 {
    50% {
      box-shadow: 0 14px 28px rgba(0, 150, 136, 0.83), 0px 4px 10px rgba(9, 188, 215, 0.4);
    }
    95% {
      top: 5%;
      filter: hue-rotate(0);
      border-radius: 0 0 5px 5px;
      box-shadow: 0 14px 28px rgba(4, 188, 213, .2), 0 10px 10px rgba(9, 188, 215, 0.08);
    }
    100% {
      top: 0;
      filter: hue-rotate(0);
      border-radius: 15px 15px 5px 5px;
      box-shadow: 0 14px 28px rgba(4, 188, 213, 0), 0 10px 10px rgba(9, 188, 215, 0.4);
    }
}
@keyframes move {
  100% {
    transform: translate(-50%, -180px) rotate(720deg);
  }
}
.black_bg {
  width: 100%;
  padding: 40px 0;
  min-height: 400px;
  background: #000;
  .container {
    position: relative;
    width: 300px;
    height: 400px;
    margin: 0 auto;
    .num {
      position: absolute;
      width: 100%;
      top: 27%;
      font-size: 32px;
      color: #fff;
      text-align: center;
      z-index: 1;
      user-select: none;
    }
    .contrast {
      filter: contrast(15) hue-rotate(0);
      width: 100%;
      height: 400px;
      background: #000;
      overflow: hidden;
      animation: hueRotate 10s linear infinite;
      .circle {
        position: relative;
        width: 100%;
        height: 300px;
        box-sizing: border-box;
        filter: blur(8px);
        &::before {
          content: '';
          position: absolute;
          top: 40%;
          left: 50%;
          width: 176px;
          height: 176px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: #000;
          z-index: 1;
        }
        &::after {
          content: '';
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(0);
          width: 200px;
          height: 200px;
          background: #00ff6f;
          border-radius: 42% 38% 62% 49% / 45%;
          animation: rotate 10s linear infinite;
        }
      }
      .bubbles {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 100px;
        height: 30px;
        transform: translateX(-50%);
        border-radius: 100px 100px 0 0;
        background: #00ff6f;
        filter: blur(5px);
        li {
          position: absolute;
          border-radius: 50%;
          background: #00ff6f;
        }
        @for $i from 0 through 15 {
          li:nth-child(#{$i}) {
            $width: 15 + random(15) + px;
            left: 15 + random(70) + px;
            top: 50%;
            transform: translate(-50%, -50%);
            width: $width;
            height: $width;
            animation: moveToTop #{random(6) + 3}s ease-in-out -#{random(5000)/1000}s infinite;
          }
        }
      }
    }
  }
}
@keyframes hueRotate {
  100% {
    filter: contrast(15) hue-rotate(360deg);
  }
}
@keyframes rotate {
  50% {
    border-radius: 45% / 42% 38% 58% 49%;
  }
  100% {
    transform: translate(-50%, -50%) rotate(720deg);
  }
}
@keyframes moveToTop {
  90% {
    opacity: 1;
  }
  100% {
    opacity: .1;
    transform: translate(-50%, -160px);
  }
}
.bg_clip {
  text-align: center;
  p {
    margin: 0;
    font-size: 50px;
    font-weight: bold;
    span {
      background: linear-gradient(90deg, red 0, orange 15%, yellow 30%, green 45%, teal 60%, blue 75%, purple 90% ,purple 100%);
      background-clip: text;
      color: transparent;
      animation: colorChange .5s linear infinite alternate;
    }
  }
}
@keyframes colorChange {
  0% {
    background: linear-gradient(90deg, red 0, orange 15%, yellow 30%, green 45%, teal 60%, blue 75%, purple 90% ,purple 100%);
    background-clip: text;
  }
  50% {
    background: linear-gradient(90deg, deeppink 0, yellowgreen 15%, fuchsia 30%, lime 45%, olive 60%, aqua 75%, coral 90% ,brown 100%);
    background-clip: text;
  }
  100% {
    background: linear-gradient(-90deg, red 0, orange 15%, yellow 30%, green 45%, teal 60%, blue 75%, purple 90% ,purple 100%);
    background-clip: text;
  }
}
</style>