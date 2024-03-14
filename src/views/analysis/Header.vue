<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><h3>2024年我国毕业生将达到1179万人比2023年增加21万人，再创新高！</h3></span>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover">
            <div>
              <el-statistic
                group-separator=","
                :precision="2"
                :value="value2"
                :title="title2"
              >
                <template slot="prefix">
                  <i class="el-icon-s-flag" style="color: red"></i>
                </template>
              </el-statistic>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div>
              <el-statistic
                group-separator=","
                :precision="2"
                :value="value3"
                :title="title3"
              >
                <template slot="suffix">
                  <i class="el-icon-star-on" style="color: red"></i>
                </template>
              </el-statistic>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div>
              <el-statistic
                group-separator=","
                :precision="2"
                decimal-separator="."
                :value="value1"
                :title="title1"
              >

                <template slot="suffix">
                  <i class="el-icon-s-flag" style="color: blue"></i>
                </template>
              </el-statistic>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      like: true,
      title3: '23年计算机专业毕业人数',
      value3: 450000,
      title2: '23年高校毕业生人数',
      value2: 11580000,
      title1: '24年预计高校毕业人数',
      value1: 11790000
    }
  }
}
</script>
<style lang="scss">
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>
