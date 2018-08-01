<template>
  <div class="productDetail">
    <div class="header">
      <div class="leftSide">
        <span class="title mr10">浏览产品</span>
        <i class="el-icon-caret-right mr10"></i>
        <span class="mr10">TSD-104</span>
      </div>
      <div class="rigthSide">
        <div class="counter" style="cursor: pointer;">10</div>
        <img src="../../assets/cart.jpg" alt="" class="cart" style="cursor: pointer;">
      </div>
    </div>
    <div class="subTitle">Acidibacillus sulfuroxidans (TSD-104)</div>
    <div class="content">
      <el-row>
        <el-col :sm="24" :md="20">
          <div class="leftContent">
            <ul class="tabs">
              <li @click="changeTabs('baseInfo')" :class="{ active: tabsType === 'baseInfo' }">基本信息</li>
              <li @click="changeTabs('cultivating')" :class="{ active: tabsType === 'cultivating' }">培养方式</li>
              <li @click="changeTabs('history')" :class="{ active: tabsType === 'history' }">历史</li>
            </ul>
            <div class="mainContent">
              <div v-if="tabsType==='baseInfo'"> 
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="name" width="130"></el-table-column>
                  <el-table-column prop="inf" ></el-table-column>
                </el-table>
              </div>
              <div v-else-if="tabsType==='cultivating'">
                cultivating
              </div>
              <div v-else-if="tabsType==='history'">
                history
              </div>
            </div>
          </div>
        </el-col>
        <el-col :sm="24" :md="4">
          <div class="rightContent">
            <div class="part">
              <div>产品名</div>
              <div>Acidibacillus sulfuro-xidans(TSD-104)</div>
            </div>
            <div class="part">
              <div>产品单价</div>
              <div>¥600</div>
            </div>
            <div class="part">
              <div>数量</div>
              <div class="numInput">
                <el-input v-model="counter" placeholder="请输入数量"></el-input>
                <i class="el-icon-caret-top numadd" @click="addnum()"></i>
                <i class="el-icon-caret-bottom numminus" @click="minusnum()"></i>
              </div>
            </div>
            <div class="addCart">加入购物车</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'header',
  data () {
    return {
      tableData: [{
        name: '菌种分离度',
        inf: 'Y002'
      }, {
        name: '生物安全级别',
        inf: '上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄'
      }, {
        name: '产品状态',
        inf: '冷冻'
      }, {
        name: '产品状态',
        inf: '冷冻'
      }, {
        name: '产品状态',
        inf: '冷冻'
      }, {
        name: '产品状态',
        inf: '冷冻'
      }, {
        name: '产品状态',
        inf: '冷冻'
      }],
      tabsType: 'baseInfo',
      counter: 1
    }
  },
  methods: {
    changeTabs (type) {
      this.tabsType = type
    },
    addnum () {
      this.counter = ++this.counter
    },
    minusnum () {
      if(this.counter <= 1) return
      this.counter = --this.counter
    }
  }
}
</script>
<style lang='less'>
  .productDetail .el-table thead {
    display: none;
  }
  .productDetail .el-table td {
    vertical-align: top;
    border-bottom: 1px solid #b8b8b8;
    &:first-child {
      font-weight: 700;
    }
  }
  .productDetail .el-table::before {
    height: 0;
  }
  .productDetail .el-input__inner {
    color: #52c0d0;
    font-weight: 700;
    width: 120px;
    height: 32px;
    border-radius: 16px;
  }
</style>
<style lang="less" scoped>
// @import url('../../styles/mixins.less');
  .mr10 {
    margin-right: 10px;
  }
  .productDetail {
    background: #f4f4f4;
    position: relative;
    box-sizing: content-box;
    max-width: 1300px;
    margin: 0 auto;
    .header {
      color: #52c0d0;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .rigthSide {
        position: relative;
        .counter {
          font-size: 14px;
          background: #52c0d0;
          display: inline-block;
          border-radius: 10px;
          width: 40px;
          height: 20px;
          color: #fff;
          text-align: center;
          margin-right: 36px;
        }
        .cart {
          position: absolute;
          top: -2px;
          right: 2px;
          width: 30px;
        }
      }
    }
    .subTitle {
      line-height: 50px;
    }
    .content {
      position: relative;
      overflow: hidden;
      // display: flex;
      .leftContent {
        // float: left;
        // width: calc(100% - 270px);
        // flex: 1;
        margin-right: 20px;
        .tabs {
          overflow: hidden;
          padding-left: 0;
          width: 100%;
          li {
            float: left;
            text-align: center;
            width: 110px;
            background: #383d41;
            color: #fff;
            line-height: 30px;
            margin-left: 2px;
            font-weight: 700;
            font-size: 12px;
            cursor: pointer;
            &.active {
              background: #fff;
              color: #52c0d0;
            }
          }
        }
        .mainContent {
          background-color: #fff;
          padding: 30px 24px;
        }
      }
      .rightContent {
        // float: right;
        margin-top: 30px;
        // width: 250px;
        border: 1px solid;
        background: #383d41;
        padding: 40px 20px;
        color: #fff;
        font-weight: 700;
        .part {
          font-size: 16px;
          margin-bottom: 50px;
          div:first-child {
            color: #52c0d0;
            font-size: 12px;
            margin-bottom: 4px;
            font-weight: 700;
          }
          .numInput {
            position: relative;
            max-width: 120px;
            .numadd, .numminus {
              position: absolute;
              right: 10px;
              font-size: 18px;
              color: #52c0d0;
              cursor: pointer;
            }
            .numadd {
              top: 0px;
            }
            .numminus {
              bottom: 6px;
            }
          }
        }
        .addCart{
          background: #5dc2d1;
          line-height: 36px;
          border-radius: 18px;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          // max-width: 160px;
          // margin: 0 auto;
          // .btn_d()
        }
      }
    }
  }
  @media (max-width: 992px) {
    .productDetail .content .leftContent {
      margin-right: 0;
    }
  }
</style>


