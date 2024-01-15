<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>项目支撑管理系统</h2>
        <p>本系统主要分成项目管理、人员管理、权限控制、日志管理四个大部分。
          <br>团队管理人员可以通过项目管理、人员管理对项目和员工进行增删改查操作，将具体员工分配到某个具体的项目，设置其项目支撑时间等；
          同时根据不同的登录用户权限来展示不同的页面，方便不同职级的人员可以更快速的找到自己需求的功能以及限制部分职级人员的数据权限。
        </p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>技术选型</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4>后端技术</h4>
            <ul>
              <li>SpringBoot</li>
              <li>Spring Security</li>
              <li>JWT</li>
              <li>Mybatis</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <h4>前端技术</h4>
            <ul>
              <li>Vue</li>
              <li>Vuex</li>
              <li>Element-ui</li>
              <li>Axios</li>
              <li>...</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-divider/>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>更新日志</span>
          </div>
          <el-collapse accordion>
            <el-collapse-item title="v1.1.1 - 2023-04-25">
              <ol>
                <li>部署到云服务器</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.1.0 - 2023-04-24">
              <ol>
                <li>重构后端分页列表方法，优化其余代码</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.9 - 2023-04-23">
              <ol>
                <li>重构前端代码，将组件封装成公共组件</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.8 - 2023-04-21">
              <ol>
                <li>在项目管理中添加分配人员功能</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.7 - 2023-04-19">
              <ol>
                <li>增加菜单管理</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.6 - 2023-04-13">
              <ol>
                <li>增加项目管理基础增删改查</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.5 - 2023-04-12">
              <ol>
                <li>增加日志管理</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.4 - 2023-04-10">
              <ol>
                <li>增加角色管理</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.3 - 2023-04-08">
              <ol>
                <li>增加部门管理</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.2 - 2023-04-07">
              <ol>
                <li>增加人员管理</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.1 - 2023-04-05">
              <ol>
                <li>增加登录校验</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.0 - 2023-04-03">
              <ol>
                <li>初始化项目</li>
              </ol>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "1.1.1"
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

