<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="110px">
          <el-form-item label="CNAME关键词" prop="keyword">
            <el-input
              v-model="queryParams.keyword"
              placeholder="请输入CNAME关键词"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
              @clear="handleQuery"/>
          </el-form-item>
          <el-form-item label="防护产品" prop="companyProduct">
            <el-input
              v-model="queryParams.companyProduct"
              placeholder="请输入防护产品"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
              @clear="handleQuery"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate">
              修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete">
              删除
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport">导入</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出
            </el-button>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="CNAME关键词" align="center" key="keyword" prop="keyword" v-if="columns[0].visible"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="防护产品" align="center" key="companyProduct" prop="companyProduct"
                           v-if="columns[1].visible" :show-overflow-tooltip="true"/>
          <el-table-column label="企业全称" align="center" key="companyName" prop="companyName"
                           v-if="columns[2].visible" :show-overflow-tooltip="true"/>
          <el-table-column label="企业官网" align="center" key="companyWebsite" prop="companyWebsite"
                           v-if="columns[3].visible" :show-overflow-tooltip="true"/>
          <el-table-column label="企业介绍" align="center" key="companyDescription" prop="companyDescription"
                           v-if="columns[4].visible" :show-overflow-tooltip="true"/>
          <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width">
            <template v-slot="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"/>
      </el-col>
    </el-row>

    <!-- 添加或修改配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="CNAME关键词" prop="keyword">
          <el-input v-model="form.keyword" placeholder="请输入CNAME关键词"/>
        </el-form-item>
        <el-form-item label="防护产品" prop="companyProduct">
          <el-input v-model="form.companyProduct" placeholder="请输入防护产品"/>
        </el-form-item>
        <el-form-item label="企业全称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入企业全称"/>
        </el-form-item>
        <el-form-item label="企业官网" prop="companyWebsite">
          <el-input v-model="form.companyWebsite" placeholder="请输入企业官网"/>
        </el-form-item>
        <el-form-item label="企业介绍">
          <el-input v-model="form.companyDescription" type="textarea" :rows="6" placeholder="请输入企业介绍"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport"/>
            是否更新已经存在的数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
                   @click="importTemplate">下载模板
          </el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listDomainProtect,
  getDomainProtect,
  delDomainProtect,
  addDomainProtect,
  updateDomainProtect,
} from "@/api/tool/domainProtect";
import {getToken} from "@/utils/auth";

export default {
  name: "DomainProtect",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      dataList: null,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 表单参数
      form: {},
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {Authorization: "Bearer " + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/tool/domainProtect/importData"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        companyProduct: ''
      },
      // 列信息
      columns: [
        {key: 0, label: `CNAME关键词`, visible: true},
        {key: 1, label: `防护产品`, visible: true},
        {key: 2, label: `企业全称`, visible: true},
        {key: 3, label: `企业官网`, visible: true},
        {key: 4, label: `企业介绍`, visible: true}
      ],
      // 表单校验
      rules: {
        keyword: [
          {required: true, message: "CNAME关键词不能为空", trigger: "blur"}
        ],
        companyProduct: [
          {required: true, message: "防护产品不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询防护信息列表 */
    getList() {
      this.loading = true;
      listDomainProtect(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.dataList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: '',
        keyword: '',
        companyProduct: '',
        companyName: '',
        companyWebsite: '',
        companyDescription: ''
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      getDomainProtect().then(_ => {
        this.open = true;
        this.title = "添加防护信息";
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      getDomainProtect(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改防护信息";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id !== '') {
            updateDomainProtect(this.form).then(_ => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDomainProtect(this.form).then(_ => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id || this.ids;
      this.$modal.confirm('是否确认删除编号为"' + id + '"的数据项？').then(function () {
        return delDomainProtect(id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tool/domainProtect/export', {
        ...this.queryParams
      }, `域名防护信息_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "域名防护信息导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('tool/domainProtect/importTemplate', {}, `域名防护信息模版表.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", {dangerouslyUseHTMLString: true});
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  }
};
</script>
