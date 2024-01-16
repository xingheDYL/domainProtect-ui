<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>启铭星防护查询系统</h2>
        <p>
          启铭星1.1.0版本正式推出，强大的数据资源，支持输入域名查询防护产品，通过测试目前查询功能具备百分百准确性。
          <br>
          <b>功能优势：</b><br>
          1.统计了300多个防护产品信息，具有准确性，广泛性；<br>
          2.针对网宿，知道创宇，奇安信等通过cname接入的防护产品几乎全覆盖；<br>
          3.具有迭代性，不断更新，运用强大的数据支撑；<br>
          <b>目前弊端：</b><br>
          1.暂时不具备批量查询功能；<br>
          2.针对阿里云，腾讯云，云盾等通过IP接入的产品不具备查询功能，是接下来重点方向；<br>
          1.1.1版本更新预热<br>
          1.开启批量查询功能；<br>
          2.更新防护数据库<br>
          <b>问题修复：</b><br>
          1.修复了针对一部分cname识别码过长问题<br>
          2.增添了部分上海云盾产品信息
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
              <li>Mybatis-Plus</li>
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
            <el-collapse-item title="v1.1.0 - 2024-01-16">
              <ol>
                <li>完善域名解析逻辑</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.1.0 - 2024-01-15">
              <ol>
                <li>部署到云服务器</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.9 - 2024-01-14">
              <ol>
                <li>重构后端分页列表方法，优化其余代码</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.7 - 2024-01-13">
              <ol>
                <li>重构前端代码，将组件封装成公共组件</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.7 - 2024-01-12">
              <ol>
                <li>增加域名解析管理</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.6 - 2024-01-11">
              <ol>
                <li>增加域名防护管理</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.5 - 2024-01-10">
              <ol>
                <li>增加菜单管理</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.4 - 2024-01-09">
              <ol>
                <li>增加角色管理</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.3 - 2024-01-08">
              <ol>
                <li>增加部门管理</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.2 - 2023-01-07">
              <ol>
                <li>增加人员管理</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.1 - 2024-01-07">
              <ol>
                <li>增加登录校验</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.0 - 2024-01-07">
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
  name: 'Index',
  data() {
    return {
      // 版本号
      version: '1.1.1'
    }
  }
}
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
    margin-top: 0;
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

