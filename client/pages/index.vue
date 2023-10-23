<template>
  <div>
    <Navbar/>
    <main class="listingPage">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-10 col-lg-10 col-md-8 offset-lg-1 offset-md-2">
            <FeaturedProduct />
            <div class="mainResults mb-4" id="NewBooks">
              <div class="a-spacing-medium">
                <div class="bestSeller">
                  <a>Sách mới</a>
                </div>
              </div>
              <ul class="s-result-list row border rounded flex-row flex-nowrap" style="overflow-y: hidden">
                <li class="s-result-item celwidget col-lg-3 col-sm-4 col-12 py-1" v-for="product in products.slice(0, 6)"
                  :key="product._id">
                  <div class="s-item-container">
                    <div class="border rounded px-3 shadow ">
                      <div class="text-center">
                        <nuxt-link :to="`/products/${product._id}`">
                          <img :src="product.photo" alt="" class="img-fluid" style="width: 150px;">
                        </nuxt-link>
                      </div>
                      <div class="">
                        <div class="a-row a-spacing-small">
                          <nuxt-link :to="`/products/${product._id}`" class="a-link-normal">
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
            <div class="mainResults mb-4" v-for="category in categories" :key="category" :id="removeAccents(category)">
              <div class="a-spacing-medium">
                <div class="bestSeller">
                  <a>{{ category }}</a>
                </div>
              </div>
              <ul class="s-result-list row border rounded">
                <li class="s-result-item celwidget col-lg-3 col-sm-4 py-1"
                  v-for="product in products.filter(i => i.category.type == category)" :key="product._id">
                  <div class="s-item-container">
                    <div class="border rounded px-3 shadow ">
                      <div class="text-center">
                        <nuxt-link :to="`/products/${product._id}`">
                          <img :src="product.photo" alt="" class="img-fluid" style="width: 150px;">
                        </nuxt-link>
                      </div>
                      <div class="">
                        <div class="a-row a-spacing-small">
                          <nuxt-link :to="`/products/${product._id}`" class="a-link-normal">
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
  name: 'IndexPage',
  async asyncData({ $axios }) {
    try {
      let respone = await $axios.$get("/api/products");
      let allCategories = [];
      respone.products.forEach(element => {
        element.price = element.price.toLocaleString();
        if (!allCategories.includes(element.category.type)) {
          allCategories.push(element.category.type);
        }
      });
      respone.products = respone.products.reverse();
      return {
        products: respone.products,
        categories: allCategories
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods:{
    removeAccents(str) { 
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s/g,'');
    }
  }
}
</script>
