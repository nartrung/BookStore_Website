<template>
    <div>
        <Navbar />
        <main style="min-height: 83vh;">
            <div class="shopping-cart mt-3">
                <div class="container-fluid c-section">
                    <div class="row">
                        <div class="col-lg-9 col-md-7">
                            <div class="c-section a-spacing-top-base">
                                <div class="a-row sc-cart-header sc-compact-bottom">
                                    <h2>Giỏ hàng</h2>
                                </div>
                                <div class="sc-list-head">
                                    <div class="text-right a-spacing-top-micro">
                                        <span class="a-color-secondary">Giá</span>
                                    </div>
                                </div>
                                <div class="sc-list-body" v-for="product in getCart" :key="product._id">
                                    <div class="sc-list-item-border">
                                        <div class="a-row a-spacing-top-base a-spacing-large">
                                            <div class="row">
                                                <div class="col-md-2 col-2">
                                                    <nuxt-link :to="`/products/${product._id}`" class="a-link-normal">
                                                        <img :src="product.photo" class="img-fluid w-100 ">
                                                    </nuxt-link>
                                                </div>
                                                <div class="col-sm-8 col-6">
                                                    <div class="a-spacing-mini">
                                                        <a href="#"
                                                            class="a-link-normal a-size-medium a-text-bold">{{ product.title }}</a>
                                                        <div class="a-size-base sc-product-creator">viết bởi
                                                            {{ product.author.name }}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span class="a-size-small a-color-secondary sc-product-binding">Bìa
                                                            mềm</span>
                                                    </div>
                                                    <div class="a-spacing-large"></div>
                                                    <div>
                                                        <span
                                                            class="a-size-small a-color-success sc-product-availability">Còn
                                                            hàng (Tồn: {{ product.stockQuantity }})</span>
                                                    </div>
                                                    <div class="a-spacing-large"></div>
                                                    <div class="sc-action-links">
                                                        Số lượng mua:
                                                        <input type="number" @change="onChangeQuantity($event, product)"
                                                            style="width: 50px;" min="1" :value="product.quantity">

                                                        &nbsp;&nbsp;
                                                        <span>|</span>
                                                        &nbsp;
                                                        <span class="a-size-small">
                                                            <a href="#" @click="$store.commit('removeProduct', product)">Xóa
                                                                khỏi giỏ hàng</a>
                                                        </span>
                                                        &nbsp;
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div class="col-sm-2 col-4 tr sm-txt-r">
                                                    <p class="a-spacing-small">
                                                        <span
                                                            class="a-size-medium a-color-price sc-price sc-white-space-nowrap sc-product-price sc-price-sign a-text-bold">{{ (product.price
                                                                * product.quantity).toLocaleString() }} VND</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="a-spacing-none a-spacing-top-mini">
                                        <span class="a-size-medium">Tổng số ({{ getCartLength }} sản phẩm)</span>
                                        <span class="a-color-price a-text-bold">
                                            <span class="a-size-medium a-color-price">{{ getCartTotalPrice }} VND</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-5">
                            <div class="a-box-group" style="margin-bottom: 14px;">
                                <div class="a-box a-color-alternate-background">
                                    <div class="a-box-inner">
                                        <div class="a-spacing-large">
                                            <p class="a-spacing-none a-spacing-top-none">
                                                <span class="a-size-medium">
                                                    <span>Tạm tính:</span>
                                                    <span class="a-color-price a-text-bold">
                                                        <span class="a-size-medium a-color-price">{{ getCartTotalPrice }}
                                                            VND</span>
                                                    </span>
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <span class="a-spacing-small a-button-primary a-button-icon">
                                                <span class="a-button-inner">
                                                    <template v-if="getCartLength > 0">
                                                        <nuxt-link to="/placeorder" class="a-button-text">Thanh
                                                            toán</nuxt-link>
                                                    </template>
                                                    <template v-else>
                                                        <nuxt-link to="/" class="a-button-text disable">Xem thêm sản
                                                            phẩm</nuxt-link>
                                                    </template>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["getCart", "getCartTotalPrice", "getCartLength"])
    },
    methods: {
        onChangeQuantity(event, product) {
            let qty = parseInt(event.target.value);
            if (qty > product.stockQuantity) {
                qty = product.stockQuantity;
            }
            this.$store.commit("changeQty", { product, qty });
        },
    }
}
</script>
  
  
  