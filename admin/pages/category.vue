<template>
    <div>
        <template>
            <Navbar />
            <main>
                <div class="container-fluid c-section">
                    <div class="row">
                        <div class="col-sm-2 col-lg-3"></div>
                        <div class="col-sm-8 col-lg-6">
                            <div class="a-spacing-top-medium"></div>
                            <h3>Thêm danh mục sách mới</h3>
                            <form>
                                <div class="a-spacing-top-medium">
                                    <label for="type">Loại</label>
                                    <input type="text" ref="type" class="a-input-text w-100" v-model="type"
                                        @keyup="checkDuplicated">
                                </div>
                                <div class="mt-2 d-flex align-items-center"> <span
                                        class="a-alert-content text-danger font-weight-bold">{{ msg }} </span>  <i ref="icon"
                                        class='d-none text-danger bx bxs-x-circle' style="margin-top: 3px;"></i></div>

                                <hr>
                                <div class="a-spacing-top-medium">
                                    <div class="w-auto">
                                        <b-button class="a-button-buy-again w-auto text-dark font-weight-bold"
                                            @click="onAddCategory">Thêm danh mục</b-button>
                                    </div>
                                </div>
                            </form>
                            <br>
                            <div>
                                <h3>Danh sách các danh mục</h3>
                                <table class="table table-bordered table-striped">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Loại</th>
                                            <th scope="col" class="text-center">Tùy chỉnh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(category, index) in categories" :key="category._id">
                                            <th scope="row" class="w-25">{{ index + 1 }}</th>
                                            <td class="catgoriesName" ref="catgoriesName">{{ category.type }}</td>
                                            <td class="w-25 text-center">
                                                <a class="a-button-history mx-auto"
                                                    @click="onDeleteCategory(category._id,category.type, index)">Xóa</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-sm-2 col-lg-3"></div>
                    </div>
                </div>
            </main>
        </template>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    async asyncData({ $axios }) {
        try {
            let respone = await $axios.$get('http://localhost:3000/api/categories');
            return {
                categories: respone.categories
            }
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            type: "",
            msg: "",
            duplicated: false,
        }
    },
    methods: {
        async checkDuplicated() {
            this.duplicated = false;
            let inputFormValue = this.$refs.type;
            let icon = this.$refs.icon;
            let arrCate = this.$refs.catgoriesName;
            for (let i = 0; i < arrCate.length; i++) {
                if (inputFormValue.value.toLowerCase() == arrCate[i].innerText.toLowerCase())
                    this.duplicated = true;
            }
            if (this.duplicated) {
                inputFormValue.classList.add("border-danger");
                icon.classList.remove("d-none");
                this.msg = "*Tên danh mục đã tồn tại";
            } else {
                inputFormValue.classList.remove("border-danger");
                icon.classList.add("d-none");
                this.msg = "";
            }
        },
        async onAddCategory() {
            if (this.duplicated) {
                alert("Danh mục đã có, không thể thêm!");
            }else if(this.type.length == 0){
                this.msg = "Tên danh mục không thể để trống";
            }else{
                try {
                    let data = { type: this.type }
                    let respone = await this.$axios.$post('http://localhost:3000/api/categories', data);
                    this.categories.push(data);
                    this.$router.go();
                } catch (err) {
                    console.log(err);
                }
            }
        },
        async onDeleteCategory(id,type, index) {
            try {
                if(confirm('Bạn có chắc muốn xóa danh mục "' + type + '" ?')){
                    let respone = await this.$axios.$delete(`http://localhost:3000/api/categories/${id}`);
                    this.$router.go();
                    if (respone.status) {
                        this.products.splice(index, 1)
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

    }
}
</script>