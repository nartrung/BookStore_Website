<template>
    <div>
        <template>
            <Navbar />
            <main>
                <div class="container-fluid c-section">
                    <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6">
                            <div class="a-spacing-top-medium"></div>
                            <h3>Chỉnh sửa thông tin tác giả</h3>
                            <div class="a-alert-content text-success font-weight-bold">{{ message }}</div>
                            <div class="d-flex justify-content-center">
                                <img :src="author.photo" alt="" width="200px" class="rounded-circle">
                            </div>
                            <form>
                                <div class="a-spacing-top-medium">
                                    <label for="type">Tên</label>
                                    <input type="text" id="type" class="a-input-text w-100" v-model="name" :placeholder="author.name">
                                </div>
                                <div class="a-spacing-top-medium">
                                    <label for="type">Tiểu sử</label>
                                    <textarea type="text" id="type" class="a-input-text w-100" v-model="about" :placeholder="author.about" style="height: 10em !important;"></textarea>
                                </div>
                                <hr>
                                <div class="a-spacing-top-medium">
                                    <span class="a-button-register">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onUpdateAuthor">Cập nhật</span>
                                        </span>
                                    </span>
                                </div>
                            </form>
                        </div>
                        <div class="col-sm-3"></div>
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
            let respone = await $axios.$get(`http://localhost:3000/api/authors/${params.id}`);
            return {
                author: respone.author
            };
        } catch (err) {
            console.log(err);
        }
    },
    data(){
        return{
            name: "",
            about: "",
            message: ""
        }
    },
    methods:{
        async onUpdateAuthor(){
            try{
                let data = {
                name: this.name,
                about: this.about,
            };
            let result = await this.$axios.$put(`/api/authors/${this.$route.params.id}`, data);
            this.message = "Thông tin tác giả đã được cập nhật"
            }
            catch(err){
                console.log(err);
            }
        }
    }

};
</script>