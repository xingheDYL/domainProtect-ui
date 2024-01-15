<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
      <el-form-item label="项目支撑时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="支撑开始日期"
          end-placeholder="支撑结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="userProjectList">
      <el-table-column label="序号" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" align="center" prop="projectName"/>
      <el-table-column label="项目负责人" align="center" prop="projectLeaderName"/>
      <el-table-column label="项目状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_project_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="项目支撑时间" align="center" prop="supportStartTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.supportStartTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目结束时间" align="center" prop="supportEndTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.supportEndTime) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
    />
    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-120px;margin-top:30px;">
        <el-button @click="close()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  listUserProject
} from "@/api/system/user";

export default {
  name: "QueryUserProject",
  dicts: ['sys_project_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 项目表格数据
      // projects: [],
      // 项目表格数据
      userProjectList: [],
      // 日期范围
      dateRange: [],
      // 显示搜索条件
      showSearch: true,
      // 分页参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: undefined
      },
      // // 表单参数
      // form: {},
    };
  },
  created() {
    const userId = this.$route.params && this.$route.params.userId;
    if (userId) {
      this.queryParams.userId = userId;
      this.getList();
    }
  },
  methods: {
    getList() {
      this.loading = true;
      listUserProject(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
        this.userProjectList = response.rows;
        this.total = response.total;
        this.$nextTick(() => {
          this.userProjectList.forEach((row) => {
            if (row.flag) {
              this.$refs.table.toggleRowSelection(row);
            }
          });
        });
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.loading = true;
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 返回按钮 */
    close() {
      const obj = {path: "/system/user"};
      this.$tab.closeOpenPage(obj);
    },
  }
};
</script>
