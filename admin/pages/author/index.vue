<template>
    <div>
        <template>
            <Navbar />
            <main>
                <b-modal id="modal" size="lg" scrollable title="Thêm tác giả" header-text-variant="white">
                    <main>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">
                                    <div class="a-section">
                                        <form>
                                            <div class="a-spacing-top-medium">
                                                <label for="type">Tên</label>
                                                <input type="text" id="type" class="a-input-text w-100" v-model="name">
                                                <p class="a-alert-content text-danger" v-if="nameErr">*Tên tác giả không thể
                                                    để trống!</p>
                                            </div>
                                            <div class="a-spacing-top-medium">
                                                <label for="type">Tiểu sử</label>
                                                <input type="text" id="type" class="a-input-text w-100" v-model="about">
                                                <p class="a-alert-content text-danger" v-if="aboutErr">*Tiểu sử không thể để
                                                    trống!</p>
                                            </div>
                                            <div class="a-spacing-top-medium">
                                                <label>Hình ảnh</label>
                                                <p class="a-alert-content text-danger" v-if="imageErr">*Vui lòng thêm hình ảnh sách</p>
                                                <div class="a-row a-spacing-top-medium d-flex">
                                                    <label for="photo" class="choosefile-button mr-2">
                                                        <i class="fal fa-plus"></i>
                                                        <input type="file" id="photo" @change="onFileSelected">
                                                    </label>
                                                    <div>
                                                        <img :src="image" style="max-width: 110px; max-height: 110px;">
                                                        <p class="text-center font-weight-bold">{{ fileName }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <template #modal-footer>
                        <div class="w-25">
                            <b-button size="sm" class="float-right a-button-buy-again text-dark font-weight-bold"
                                @click="onAddAuthor">
                                Thêm tác giả
                            </b-button>
                        </div>
                    </template>
                </b-modal>
                <div class="container-fluid c-section">
                    <div class="row">
                        <div class="col-sm-2 col-lg-3"></div>
                        <div class="col-sm-8 col-lg-6">
                            <div class="a-spacing-top-medium"></div>
                            <h3>Thêm tác giả</h3>
                            <b-button v-b-modal.modal class="a-button-buy-again w-auto text-dark font-weight-bold">Thêm tác giả</b-button>
                            <br>
                            <hr>
                            <div>
                                <h3>Danh sách tác giả</h3>
                                <table class="table table-bordered table-striped">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col" class=" w-50">Tên tác giả</th>
                                            <th scope="col" colspan="2" class="text-center">Tùy chỉnh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(author, index) in authors" :key="author._id">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ author.name }}</td>
                                            <td class=" text-center">
                                                <nuxt-link :to="`/author/${author._id}`"
                                                    class="a-button-history mx-auto">Sửa</nuxt-link>
                                            </td>
                                            <td class=" text-center">
                                                <a class="a-button-history mx-auto"
                                                    @click="onDeleteAuthor(author.name, author._id, index)">Xóa</a>
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
            let respone = await $axios.$get('http://localhost:3000/api/authors');
            return {
                authors: respone.authors
            }
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            name: "",
            about: "",
            selectedFile: null,
            fileName: "",
            image: "",
            nameErr: false,
            aboutErr: false,
            imageErr: false,

        }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.fileName = event.target.files[0].name;
            this.image = URL.createObjectURL(event.target.files[0]);
        },
        async onAddAuthor() {
            this.nameErr = (this.name.length == 0);
            this.aboutErr = (this.about.length == 0);
            this.imageErr = (this.selectedFile == null);
            if (!this.nameErr && !this.aboutErr && !this.imageErr) {
                try {
                    let data = new FormData();
                    data.append("name", this.name);
                    data.append("about", this.about);
                    data.append("photo", this.selectedFile, this.selectedFile.name);
                    let respone = await this.$axios.$post('http://localhost:3000/api/authors', data);
                    this.authors.push(this.name);
                    this.$router.go();
                } catch (err) {
                    console.log(err);
                }
            }
        },
        async onDeleteAuthor(name, id, index) {
            if (confirm("Bạn có chắc muốn xóa tác giả \"" + name + "\" ?")) {
                try {
                    let respone = await this.$axios.$delete(`/api/authors/${id}`);
                    this.$router.go();
                    if (respone.status) {
                        this.products.splice(index, 1)
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
}
</script>