<template>
  <section class="container">
    <div class="content-container">
      <section class="menu-container">
        <div class="menu-type">
          <div class="menu-item card-view">
            <el-select v-model="value" placeholder="卡片浏览">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="menu-item">
            <span>搜索:</span>
            <input type="text" placeholder="" class="moon-search-input">
          </div>
        </div>
        
        <div class="menu-type sort-view">
          <div class="menu-item">
          
            <el-select v-model="sort_value" placeholder="排序">
              <el-option
                v-for="item in sortOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="menu-item">
            <span class="cart-num">10</span>
            <img src="../../assets/cart.jpg" alt="" class="cart" style="cursor: pointer;">
          </div>
        </div>
      </section>
      <section v-if="value==='2'">
        <Table></Table>
      </section>
      <section class="list-container" v-else>
        <div class="list-item" v-for="(item,index) in productLists" :key="index">
          <p class="item-avatar">
            <span>{{ item.des }}</span>
          </p>
          <p class="item-name">{{ item.seq }}</p>
          <p class="item-parice">¥ {{item.price}}</p>
        </div>
        
      </section>
      <section class="load-more">
        <p>加载更多</p>
      </section>
    </div>
  </section>
</template>

<script>
import Table from '~/components/product/table'

export default {
  name: 'product-list',
  components: {
    Table,
  },
  data () {
    return{
      value: '',
      sort_value: '',
      options: [{
        value: '1',
        label: '卡片浏览'
      }, {
        value: '2',
        label: '列表浏览'
      }],
      sortOption: [{
        value: '3',
        label: '字母排序'
      }, {
        value: '4',
        label: '价格排序'
      }],
      productLists: [{
        des: 'long and conplex name',
        seq: 'JDV-V-675',
        price: '400',
      }, {
        des: 'long and conplex name',
        seq: 'JDV-V-675',
        price: '400',
      }, {
        des: 'long and conplex name',
        seq: 'JDV-V-675',
        price: '400',
      }, {
        des: 'long and conplex name',
        seq: 'JDV-V-675',
        price: '400',
      }, {
        des: 'long and conplex name',
        seq: 'JDV-V-675',
        price: '400',
      }, ]
    }
  }
}
</script>


<style lang="less" scoped>
.menu-container{
  padding: 0 30px;
}
.container{
  background: #f6f6f6;
}
.content-container{
  max-width: 1300px;
}
.menu-type{
  display: flex;
  justify-content: space-between;
  background: #f6f6f6;
  max-width: 1300px;
  padding: 6px 0;
}
.list-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .list-item{
    width: 200px;
    height: 200px;
    margin: 5px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: #d1d1d1 0px 1px 2px 0px;
    display: flex;
    flex-direction: column;
    .item-avatar{
      margin: 20px 0;
      padding: 4px;
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: #c3c3c3;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        color: #5b5e61;
        display: block;
        text-align: center;
      }
    }
    p{
      align-self:center;
      margin: 5px 0;
    }
    .item-name{
      color: #60c3d2;
    }
    
  }
}
.load-more{
  width: 100%;
  padding: 10px 0;
  p{
    margin: 0 auto;
    width: 240px;
    height: 30px;
    border-radius: 30px;
    border: 2px solid #60c3d2;
    color: #60c3d2;
    text-align: center;
    line-height: 26px;
  }
}
// 菜单栏

.moon-search-input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #60c3d2;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 24px;
    line-height: 24px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 60%;
}

.menu-item{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  span{
    padding: 0 5px;
    font-size: 14px;
  }
  .cart-num{
    width: 36px;
    height: 18px;
    border-radius: 18px;
    text-align: center;
    font-size: 14px;
    background: #60c3d2;
    color: #fff;
    cursor: pointer;
  }

  .cart {
      padding-right: 24px;
      width: 54px;
    }
}
.card-view{
  input::-webkit-input-placeholder {
      color: red;
      font-size: 12px;
      text-align: right;
     }
}


</style>
<style lang="less">
.menu-type{
  .el-input__icon {
      height: 100%;
      width: 25px;
      text-align: center;
      -webkit-transition: all .3s;
      transition: all .3s;
      line-height: 31px;
  }
  .el-select-dropdown__item.selected {
    color: #60c3d2;
    font-weight: 700;
  }
}
.sort-view{
  padding-left:16px;
  .menu-item{
    padding-left:30px;
  }
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 2px solid #60c3d2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 31px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 80%;
  }

}
.card-view{
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #f6f6f6;
    background-image: none;
    border-radius: 4px;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 31px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  input::-webkit-input-placeholder ,input{
      font-weight:bold;
      text-align: center;
     }
}

</style>

