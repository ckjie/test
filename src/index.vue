<template>
  <div class="page">
    <!-- 传入组件所需props，组件内使用slot，slot内使用了传入的props某个属性作为默认值，组件内需先在slot内绑定数据，此处赋值才生效，此处在赋值之外，还变更了slot内使用的属性名称 -->
    <!-- 使用简介插槽时，必须明确使用的是哪个插槽，直接"#="会报错 -->
    <test-slot-props :user="slotPropsUser" #default="{ user: slotPropsUser }">{{ slotPropsUser.say }}</test-slot-props>
    <div :class="[ 'include_page', {is_night_mode: isNight}]">
      <div class="night_mode" @click="changeMode">{{ isNight? '关闭' : '开启' }}简易夜间模式</div>
      <div class="fill"></div>
      <div class="referen"></div>
      <div class="aims" @click="toTestPage">我可以吸顶，非sticky实现</div>
      <div class="test_transform">
        <p>祖先元素“transform”不为“none”的时候，“fixed”定位会相对于祖先元素，而非相对于视口</p>
      </div>
      <p>名字：{{name}}</p>
      <p>年龄：{{age}}</p>
      <p>筛选名称：{{testName}}</p>
      <p>
        测试请求数据：
        <span class="result_item" v-for="(item, index) in testRequestResult" :key="index">{{ item.searchName }}</span>
      </p>
      <div class="all_box">
        <div class="box_father">
          <div class="float">
            <img src="@/assets/tx.jpg" alt="">
          </div>
          下面的文本会因为内联元素后面的“幽灵空白节点”而被挤到左边
        </div>
        <div class="bottom_content">我是下面的文本，我左边好像有什么东西</div>
      </div>
      <div class="test_absolute">
        <img src="@/assets/share.jpg" class="share" alt="" data-aaa="@/assets/share.jpg">
        <img src="@/assets/tx.jpg" class="tx" alt="">
      </div>
      <div v-for="(item, index) in woman" :key="index">{{item.name}}</div>
      <div class="bd_css"></div>
      <div class="bd_css2"></div>
      <div class="test_scroll">
        <img src="@/assets/share.jpg" class="img" alt="">
        <img src="@/assets/share.jpg" class="img" alt="">
        <img src="@/assets/share.jpg" class="img" alt="">
      </div>
      <div class="test_box_decoration_break">
        <span>这是一段很长很长很长很长很长很长很长很长很长很长很长很长的文本</span>
      </div>
      <div class="ball_list">
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="test_blur"></div>
      </div>
      <div class="bg_img"></div>
      <div class="fill"></div>
      <div class="fill"></div>
      <div class="fill"></div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex';
import testSlotProps from './components/test-slot-props';
import Vue from 'vue';
export default {
  components: {
    testSlotProps
  },
  data() {
    return {
      testName: '',
      testRequestResult: [],
      isNight: false,
      slotPropsUser: {
        name: '插槽user的昵称',
        say: '插槽user想说...'
      }
    }
  },
  mounted() {
    this.testRequest();
    console.log(process.env);
    setTimeout(() => {
      this.$store.commit('setName', '纳尼');
      this.$store.dispatch('setAgainName', '乔纳森-乔斯达');
      setTimeout(() => {
        this.testName = Vue.filter('test-filter')('螺丝');
      }, 2500)
    }, 1500)
    this.setSticky();
    this.testMethods();
    // $on('hook:')  可在传入的指定生命周期函数内，执行定义的事件，如此，则无需定义两个生命周期函数
    this.$on('hook:beforeDestroy', () => {
      console.log('注意hook:后面直接加生命周期函数，中间不可有空格');
    })
  },
  computed: {
    ...mapState({
      name: 'name'  // Object
    }),
    ...mapState([
      'age'        // Array
    ]),
    woman() {
      return this.$store.getters.customFilterUser('woman');
    }
  },
  methods: {
    // 点击使用简易夜间模式
    changeMode() {
      this.isNight = !this.isNight;
    },

    // 不使用position: sticky实现吸顶效果
    setSticky() {
      let aims = document.querySelector('.aims');
      let referen = document.querySelector('.referen');
      referen.style.top = aims.offsetTop + 'px';
      let observer = new IntersectionObserver(list => {
        list.forEach(item => {
          let top = item.boundingClientRect.top;
          if (top < 0) {
            aims.classList.add('top');
          } else {
            aims.classList.remove('top');
          }
        })
      })
      observer.observe(referen);
    },
    testRequest() {
      this.myCustom.request({
        api: '/api/xiaotang/GetHotSearchList',
        params: { type: '' }
      }).then(res => {
        if (res.data && res.data.length > 0) {
          this.testRequestResult = res.data;
        }
      })
    },
    toTestPage() {
      this.$router.push({
        name: 'test001'
      })
    },
    // js测试
    testMethods() {
      this.myCustom.get({
        url: 'https://test-mch.icard.fun/extra-configuration/extra-configuration.json'
      }).then(res => {
        console.log(res, 'rrrrr');
      }).catch(err => {
        console.log(err, 'eeeeeee');
      })
    }
  }
}
</script>

<style lang="scss">
:root {
  pointer-events: none;
}
.include_page {
  background-color: #fff;
  position: relative;
  z-index: -2;
  pointer-events: auto;
}
.is_night_mode {
  filter: invert(100%);
  img {
    filter: invert(100%);
  }
}
.night_mode {
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px 50px;
  color: #2196f3;
  cursor: pointer;
  z-index: 1;
}
.test_transform {
  transform: rotate(0);
  p {
    position: fixed;
    top: 0;
    left: 40%;
  }
}
.aims {
  width: 100%;
  text-align: center;
  background-color: #e8e8e8;
  padding: 10px 0;
  font-size: 30px;
  cursor: pointer;
  -webkit-text-fill-color: blue;  // 会覆盖“color”，权重更高
  -webkit-text-stroke: 1px red;   // 给文字描边
  color: red;
}
.fill {
  width: 100%;
  height: 200px;
}
.top {
  position: fixed;
  left: 0;
  top: 0;
}
.referen {
  position: absolute;
  left: 0;
  width: 100%;
  height: 0;
}
.result_item {
  display: inline-block;
  padding: 4px 10px;
  margin: 0 10px 10px 0;
  background-color: antiquewhite;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  font-size: medium;
}
.all_box {
  width: 240px;
}
.box_father {
  height: 64px;
  border: 1px solid #000;
}
.float {
  float: left;
}
.float img {
  width: 60px;
  height: 64px;
}
.bottom_content {
  /* clear: both; */
}
.test_absolute {
  width: 200px;
  height: 200px;
  /* border: 20px solid transparent; */
  padding: 20px;
  .tx {
    width: 100%;
    height: 100%;
  }
  .share {
    width: 40px;
    height: 40px;
    position: absolute;
    /* 可通过margin设置定位，无需设置Top、Left等，代码更简洁实用 */
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 100%;
      width: 100%;
      height: 100%;
      // background: url(require('@/assets/share.jpg')) no-repeat center center;
    }
  }
}
.bd_css {
  position: relative;
  width: 100px;
  height: 100px;
  background: #9c27b0;
  border: 20px dashed #2196f3;
}
.bd_css::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}
.bd_css2 {
  position: relative;
  top: 10px;
  width: 100px;
  height: 100px;
  background: #fff;
  background-clip: padding-box;
  border: 20px dashed #2196f3;
}
.bd_css2::before {
  content: '';
  position: absolute;
  top: -20px;
  bottom: -20px;
  left: -20px;
  right: -20px;
  background-color: #9c27b0;
  z-index: -1;
}
.test_scroll {
  margin-top: 40px;
  width: 300px;
  height: 200px;
  font-size: 0;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;  // mandatory强制滚动完成停留位置为指定位置，proximity滚动完成停留在滚动完成时的相近位置
  .img {
    width: 300px;
    height: 200px;
    padding: 0 10px;
    box-sizing: border-box;
    object-fit: cover;
    display: inline-block;
    scroll-snap-align: center;  // 滚动完成后子元素相对父盒子的对齐位置，另有 ”start“ 、 ”end“，另父盒子可使用 ”scroll-padding“，子盒子可使用 ”scroll-margin“ 添加边距
  }
}
.ball_list {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding-right: 20%;
  // margin-right: 20%;
}
.ball {
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 50%;
  background-color: #ff0000;
  transform: rotate(0) translate(-80px, 0);
  filter: hue-rotate(0) invert(100%) blur(1px);
}
.ball:nth-of-type(1) {
  animation: rotateBall 3s linear infinite;
}
.ball:nth-of-type(2) {
  animation: rotateBall 3s -1s linear infinite;
}
.ball:nth-of-type(3) {
  animation: rotateBall 3s -2s linear infinite;
}
@keyframes rotateBall {
  100% {
    filter: hue-rotate(360deg) invert(100%) blur(1px);
    transform: rotate(360deg) translate(-80px, 0);
  }
}
.test_blur {
  position: absolute;
  width: 300px;
  height: 200px;
  left: 35%;
  background: #fff;
  filter: contrast(20);
  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 40px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #333;
    filter: blur(6px);
    animation: leftBall 4s ease-out infinite;
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    top: 60px;
    right: 40px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #0000ff;
    filter: blur(6px);
    animation: rightBall 4s ease-out infinite;
    z-index: 1;
  }
  @keyframes leftBall {
    50% {
      left: 140px;
    }
  }
  @keyframes rightBall {
    50% {
      right: 140px;
    }
  }
}
.test_box_decoration_break {
  width: 200px;
  color: #fff;
  margin-left: 50px;
  span {
    padding: 0 10px;
    line-height: 1.4;
    border-radius: 20px;
    background: linear-gradient(to right, #fe5956, #5599ff);
    box-decoration-break: clone;
    -webkit-box-direction-break: clone;
  }
}
.bg_img {
  width: 300px;
  height: 200px;
  margin-left: 50px;
  margin-top: 20px;
  background: url('~@/assets/tx.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 8%;
    width: 100%;
    height: 100%;
    background: inherit;
    background-size: cover;
    z-index: -1;
    filter: blur(10px) brightness(80%) opacity(.8);
  }
}
</style>