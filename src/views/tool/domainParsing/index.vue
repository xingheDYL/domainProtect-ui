<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 style="text-align: center"
                 label-width="80px">
          <el-form-item label="域名" prop="keyword">
            <el-input
              v-model="queryParams.domain" placeholder="请输入域名" clearable style="width: 240px"
              @keyup.enter.native="handleQuery" @clear="handleQuery"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">解析</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
          <right-toolbar :showSearch.sync="showSearch" :columns="columns"></right-toolbar>
        </el-form>
        <el-table v-loading="dataLoading" :data="dataList">
          <el-table-column label="域名" align="center" key="domain" prop="domain" v-if="columns[0].visible"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="CNAME关键词" align="center" key="keyword" prop="keyword" v-if="columns[1].visible"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="防护产品" align="center" key="companyProduct" prop="companyProduct"
                           v-if="columns[2].visible" :show-overflow-tooltip="true"/>
          <el-table-column label="企业全称" align="center" key="companyName" prop="companyName"
                           v-if="columns[3].visible" :show-overflow-tooltip="true"/>
          <el-table-column label="企业官网" align="center" key="companyWebsite" prop="companyWebsite"
                           v-if="columns[4].visible" :show-overflow-tooltip="true"/>
          <el-table-column label="企业介绍" align="center" key="companyDescription" prop="companyDescription"
                           v-if="columns[5].visible" :show-overflow-tooltip="true"/>
          <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width">
            <template v-slot="scope">
              <el-button :disabled="scope.row.keyword===''||scope.row.keyword ===null" size="mini" type="text"
                         icon="el-icon-edit" @click="handleUpdate(scope.row)">详情
              </el-button>
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

    <!-- 详情对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="域名" prop="domain">
          <template v-slot="scope">
            <el-input v-model="scope.row.domain" readonly/>
          </template>
        </el-form-item>
        <el-form-item label="CNAME关键词" prop="keyword">
          <el-input v-model="form.keyword" readonly/>
        </el-form-item>
        <el-form-item label="防护产品" prop="companyProduct">
          <el-input v-model="form.companyProduct" readonly/>
        </el-form-item>
        <el-form-item label="企业全称" prop="companyName">
          <el-input v-model="form.companyName" readonly/>
        </el-form-item>
        <el-form-item label="企业官网" prop="companyWebsite">
          <el-input v-model="form.companyWebsite" type="textarea" :rows="4" readonly/>
        </el-form-item>
        <el-form-item label="企业介绍">
          <el-input v-model="form.companyDescription" type="textarea" :rows="6" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关 闭</el-button>
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
  getDomainProtect, getDomainProtectByDomain
} from "@/api/tool/domainProtect";
import {getToken} from "@/utils/auth";

export default {
  name: "DomainParsing",
  data() {
    return {
      // 遮罩层
      dataLoading: false,
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
      // 表单参数
      form: {
        domain: ''
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的数据
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
        domain: ''
      },
      // 列信息
      columns: [
        {key: 0, label: `域名`, visible: true},
        {key: 1, label: `CNAME关键词`, visible: true},
        {key: 2, label: `防护产品`, visible: true},
        {key: 3, label: `企业全称`, visible: true},
        {key: 4, label: `企业官网`, visible: true},
        {key: 5, label: `企业介绍`, visible: true}
      ]
    };
  },
  methods: {
    /** 查询防护信息列表 */
    getList() {
      this.dataLoading = true;
      listDomainProtect(this.queryParams).then(response => {
          this.dataList = response.rows;
          this.total = response.total;
          this.dataLoading = false;
        }
      );
    },
    // 表单重置
    reset() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        domain: ''
      }
    },
    /** 解析按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.dataLoading = true;
      getDomainProtectByDomain(this.queryParams.domain).then(response => {
          this.dataList = response.rows;
          this.total = response.total;
          this.dataLoading = false;
        }
      ).catch(e => {
        this.dataLoading = false;
        console.error(e.msg)
      });
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.reset();
      this.dataList = [];
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log(row)
      const id = row.id;
      getDomainProtect(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "查看域名解析信息";
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "域名解析导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('tool/domainProtect/importTemplate2', {}, `域名解析模版表.xlsx`)
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
