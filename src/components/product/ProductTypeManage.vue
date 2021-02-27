<template>
    <div>
        <template>
            <el-table :data="tableDate" border stripe style="width=100%">
                <el-table-column label="logo" prop="imageUrl"></el-table-column>
                <el-table-column label="产品名称" prop="name"></el-table-column>
                <el-table-column label="外部链接地址" prop="linkUrl"></el-table-column>
                <el-table-column label="优先级别" prop="orderNum"></el-table-column>
                <el-table-column label="栏目简介" prop="summary"></el-table-column>
                <el-table-column label="产品数量" prop="productNumber"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="pimary" size="mini" plain @click="handleEdit(scope.row.id)" icon="el-icon-edit">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div>
                <div>
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                    layout="prev,pager,next,total,sizes,jumper"
                    :page-sizes="[5,10,20,50]"
                    :page-size="limit"
                    :current-page="page"
                    :total="total"
                    :page-count="11"
                    ></el-pagination>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableDate:[],
            limit:10,
            page:1,
            total:0
        }
    },
    methods:{
        getProductType(){
            this.$axios.get("backstage/producttype",{
                params:{
                    page:this.page,
                    limit:this.limit
                }
            }).then(response=>{
                let msg=response.data;
                if(msg.code===0){
                    this.tableDate=msg.data;
                    this.total=msg.count;
                }else{
                    this.$message.error(msg.msg);
                }
            })
            .catch(error=>{
                console.log(error);
            })
        },
        handleCurrentChange(value){
            this.page=value;
            this.getProductType();
        },
        handleSizeChange(value){
            this.limit=value;
            this.getProductType();
        },
    },
    mounted(){
        this.getProductType();
    }
}
</script>