<template>
    <div>
        <template>
            <Navbar />
            <main>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-2 col-lg-3"></div>
                        <div class="col-sm-8 col-lg-6">
                            <div class="a-section">
                                <div class="a-spacing-top-medium"></div>
                                <div class="row border">
                                    <div class="col-4">
                                        <div class="d-flex justify-content-center">
                                            <img :src="product.photo" alt=""  class="rounded w-100">
                                        </div>
                                    </div>
                                    <strong class="col-8">
                                        <div class="a-spacing-top-medium text-center">
                                            <h4 >Thông tin sách</h4>
                                        </div>
                                        <div class="a-spacing-top-large">
                                            <stong class="text-black-50 a-alert-content">Thể loại:</stong> <span> {{ product.category.type }}</span>
                                        </div>
                                        <div class="a-spacing-top-large">
                                            <stong class="text-black-50 a-alert-content">Tựa:</stong> <span> {{ product.title }}</span>
                                        </div>
                                        <div class="a-spacing-top-large">
                                            <stong class="text-black-50 a-alert-content">Giá:</stong> <span> {{ product.price.toLocaleString() }}VND</span>
                                        </div>
                                        <div class="a-spacing-top-large">
                                            <stong class="text-black-50 a-alert-content">Số lượng tồn:</stong> <span> {{ product.stockQuantity }}</span>
                                        </div>
                                        <div class="a-spacing-top-large">
                                            <stong class="text-black-50 a-alert-content">Tác giả:</stong> <span> {{ product.author.name }}</span>
                                        </div>
                                    </strong>
                                </div>
                                <div class="a-spacing-top-medium"></div>
                                <h3 class="text-center">Cập nhật thông tin sách</h3>
                                <form>
                                    <div class="a-spacing-top-medium">
                                        <label for="category">Thể loại</label>
                                        <select id="category" class="a-select-option text-left" v-model="categoryID">
                                            <option v-for="category in categories" :value="category._id"
                                                :key="category._id">{{ category.type }}</option>
                                        </select>
                                    </div>
                                    <div class="a-spacing-top-medium">
                                        <label for="author">Tác giả</label>
                                        <select id="author" class="a-select-option text-left" v-model="authorID">
                                            <option v-for="author in authors" :value="author._id" :key="author._id">{{
                                                author.name }}</option>
                                        </select>
                                    </div>
                                    <div class="a-spacing-top-medium">
                                        <label for="title">Tựa</label>
                                        <input type="text" id="title" class="a-input-text w-100" v-model="title"
                                            :placeholder="product.title">
                                    </div>
                                    <div class="a-spacing-top-medium">
                                        <label for="price">Giá</label>
                                        <input type="number" step="0.1" id="price" class="a-input-text w-100"
                                            v-model="price" :placeholder="product.price">
                                    </div>
                                    <div class="a-spacing-top-medium">
                                        <label for="stockQuantity">Số lượng tồn:</label>
                                        <input type="number" id="price" class="a-input-text w-100" v-model="stockQuantity"
                                            :placeholder="product.stockQuantity">
                                    </div>
                                    <div class="a-spacing-top-medium">
                                        <label for="desc">Chi tiết</label>
                                        <textarea rows="3" id="desc" class="a-input-text w-100" v-model="description"
                                            :placeholder="product.description"></textarea>
                                    </div>
                                    <hr>
                                    <div class="a-spacing-top-medium">
                                        <span class="a-button-register">
                                            <span class="a-button-inner">
                                                <span class="a-button-text" @click="onUpdateProduct">Cập nhật thông
                                                    tin</span>
                                            </span>
                                        </span>
                                    </div>
                                    <div class="a-spacing-top-medium"></div>
                                </form>
                            </div>
                        </div>
                        <div class="col-sm-2 col-lg-6"></div>
                    </div>
                </div>
            </main>
        </template>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    async asyncData({ $axios, params }) {
        try {
            let categories = $axios.$get("http://localhost:3000/api/categories");
            let authors = $axios.$get("http://localhost:3000/api/authors");
            let product = $axios.$get(`http://localhost:3000/api/products/${params.id}`);
            const [categoriesResp, authorsResp, productRespone] = await Promise.all([
                categories,
                authors,
                product
            ]);

            return {
                categories: categoriesResp.categories,
                authors: authorsResp.authors,
                product: productRespone.product
            };
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            categoryID: null,
            authorID: null,
            title: "",
            price: "",
            stockQuantity: "",
            description: "",
            selectedFile: null,
            fileName: "",
        }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.fileName = event.target.files[0].name;
        },
        async onUpdateProduct() {
            try {
                let data = {
                    title: this.title,
                    price: this.price,
                    stockQuantity: this.stockQuantity,
                    description: this.description,
                    categoryID: this.categoryID,
                    authorID: this.authorID
                };
                let result = await this.$axios.$put(`http://localhost:3000/api/products/${this.$route.params.id}`, data);
                this.$router.push('/');
            } catch (err) {
                console.log(err);
            }
        }
    }

};
</script>