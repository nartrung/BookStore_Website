<template>
  <div>
    <template>
      <Navbar />
      <main>
        <b-modal id="modal" size="lg" scrollable title="Thêm sách" header-text-variant="white">
          <main>
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="a-section">
                    <form>
                      <div class="a-spacing-top-medium">
                        <label for="category">Thể loại</label>
                        <select id="category" class="a-select-option text-left" v-model="categoryID">
                          <option v-for="category in categories" :value="category._id" :key="category._id" @click.prevent>
                            {{
                              category.type }}</option>
                        </select>
                      </div>
                      <div class="a-spacing-top-medium">
                        <label for="author">Tác giả</label>
                        <select id="author" class="a-select-option text-left" v-model="authorID">
                          <option v-for="author in authors" :value="author._id" :key="author._id">{{ author.name }}
                          </option>
                        </select>
                      </div>
                      <div class="a-spacing-top-medium">
                        <label for="title">Tựa</label>
                        <input type="text" id="title" class="a-input-text w-100" v-model="title">
                      </div>
                      <div class="a-spacing-top-medium">
                        <label for="price">Giá</label>
                        <input type="number" step="0.1" id="price" class="a-input-text w-100" v-model="price">
                      </div>
                      <div class="a-spacing-top-medium">
                        <label for="stockQuantity">Số lượng thêm</label>
                        <input type="number" id="price" class="a-input-text w-100" v-model="stockQuantity">
                      </div>
                      <div class="a-spacing-top-medium">
                        <label for="desc">Chi tiết</label>
                        <textarea rows="3" id="desc" placeholder="Chi tiết về sách" class="a-input-text w-100"
                          v-model="description">
                                        </textarea>
                      </div>
                      <div class="a-spacing-top-medium">
                        <label>Thêm hình ảnh</label>
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
                      <div class="a-spacing-top-medium"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <template #modal-footer>
            <div class="w-25">
              <b-button size="sm" class="float-right a-button-buy-again text-dark font-weight-bold" @click="onAddProduct">
                Thêm sách
              </b-button>
            </div>
          </template>
        </b-modal>
        <div class="a-spacing-large"></div>
        <div class="container-fluid browsing-history">
          <div class="row">
            <div class="col-sm-8 col-8">
              <h1 class="a-size-large a-spacing-none a-text-normal">Tất cả sách</h1>
              <div class="a-spacing-large"></div>
              <!-- Button -->
              <b-button v-b-modal.modal class="a-button-buy-again w-auto text-dark font-weight-bold">Thêm sách</b-button>
              <!-- Listing page -->
            </div>
          </div>
        </div>
        <hr>
        <div class="a-spacing-large"></div>
        <div class="container-fluid browsing-history">
          <div class="row">
            <div v-for="(product, index) in products" :key="product._id" class="col-xl-2 col-lg-3 col-sm-4 col-6 br bb">
              <div class="history-box">
                <a href="#" class="a-link-normal">
                  <img :src="product.photo" class="img-fluid" alt="" style="height: 420px; width: 270px;">
                </a>
                <div class="a-spacing-top-base asin-title">
                  <span class="a-text-normal">
                    <div class="p13n-sc-truncated">{{ product.title }}</div>
                  </span>
                </div>
                <div class="a-row">
                  <a href="">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </a>
                  <span class="a-letter-space"></span>
                </div>
                <div class="a-row">
                  <span class="a-size-base a-color-price">
                    <span class="p13n-sc-price">${{ product.price }}</span>
                  </span>
                </div>
                <div class="a-row">
                  <nuxt-link :to="`/products/${product._id}`" class="a-button-history margin-right-10">Cập nhật thông
                    tin</nuxt-link>
                  <a href="#" class="a-button-history margin-right-10"
                    @click="onDeleteProduct(product._id, index)">Xóa</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let products = await $axios.$get("http://localhost:3000/api/products");
      let categories = $axios.$get("http://localhost:3000/api/categories");
      let authors = $axios.$get("http://localhost:3000/api/authors");
      const [productsResp, categoriesResp, authorsResp] = await Promise.all([
        products,
        categories,
        authors
      ]);
      return {
        products: productsResp.products,
        categories: categoriesResp.categories,
        authors: authorsResp.authors
      };
    } catch (err) {

    }
  },
  data() {
    return {
      categoryID: null,
      authorID: null,
      title: "",
      price: 0,
      stockQuantity: 1,
      description: "",
      selectedFile: null,
      fileName: "",
      image: "",
    }
  },
  methods: {
    async onDeleteProduct(id, index) {
      if (confirm("Are you sure?")) {
        try {
          let respone = await this.$axios.$delete(`/products/${id}`);
          if (respone.status) {
            this.products.splice(index, 1)
          }
        } catch (err) {
          console.log(err);
        }
      }

    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.image = URL.createObjectURL(event.target.files[0])
    },
    async onAddProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("price", this.price);
      data.append("stockQuantity", this.stockQuantity);
      data.append("description", this.description);
      data.append("authorID", this.authorID);
      data.append("categoryID", this.categoryID);
      data.append("photo", this.selectedFile, this.selectedFile.name);

      let result = await this.$axios.$post('http://localhost:3000/api/products', data);
      this.$router.go();
    }

  }
}
</script>
