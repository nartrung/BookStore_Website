<template>
  <div>
    <Navbar />
    <main class="listingPage">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-10 col-lg-10 col-md-8 offset-lg-1 offset-md-2">
            <div class="mainResults my-4" id="NewBooks">
              <div class="a-spacing-medium">
                <div class="bestSeller">
                  <a>Kết quả tìm kiếm</a>
                </div>
              </div>
              <ul class="s-result-list row border flex-row flex-nowrap" style="overflow-y: hidden">
                <li class="s-result-item celwidget col-lg-3 col-sm-4 col-12 py-1" v-for="product in products"
                  :key="product._id">
                  <div class="s-item-container">
                    <div class="border px-3">
                      <div class="text-center">
                        <nuxt-link :to="`/products/${product.objectID}`">
                          <img :src="product.photo" alt="" class="img-fluid" style="width: 150px;">
                        </nuxt-link>
                      </div>
                      <div class="">
                        <div class="a-row a-spacing-small">
                          <nuxt-link :to="`/products/${product.objectID}`" class="a-link-normal">
                            <h2 class="a-size-medium">
                              <div class="truncated">{{ product.title }}</div>

                              <span class="a-letter-space"></span>
                              <span class="a-letter-space"></span>
                            </h2>
                          </nuxt-link>
                        </div>
                        <div class="a-row a-spacing-small">
                          <span class="a-size-small a-color-secondar">Tác giả</span>
                          <span class="a-size-small a-color-secondar">
                            <nuxt-link :to="`/products/${product._id}/#aboutAuthor`"
                              class="a-link-normal a-text-normal">{{ product.author.name }}</nuxt-link>
                          </span>
                        </div>
                        <div class="a-row">
                          <span class="a-size-small">Giá</span>
                        </div>
                        <div>
                          <div class="a-row a-spacing-none">
                            <a href="#" class="a-link-normal a-text-normal">
                              <span class="a-color-base sx-zero-spacing">
                                <span class="sx-price sx-price-large">
                                  <span class="sx-price-whole">{{ product.price }}</span>
                                  <sup class="sx-price-currency">VND</sup>
                                </span>
                              </span>
                            </a>
                            <span class="a-letter-space"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <hr>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>

export default {
  watchQuery: ["title"],

  async asyncData({ $axios, query }) {
    try {
      let products = await $axios.$post("/api/search", { title: query.title });
      return {
        products
      };
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    removeAccents(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s/g, '');
    }
  }
}
</script>
