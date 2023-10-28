<template>
    <body>
        <Navbar />
        <div class="container mt-3">
            <div class="modal fade" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="a-spacing-top-medium"></div>
                        <div class="d-flex justify-content-center"><img src="/img/success.png" alt=""></div>
                        <div class="modal-header justify-content-center">
                            <h4 class="modal-title">Đặt hàng thành công</h4>
                        </div>
                        <div class="modal-body text-center">
                            Đơn hàng của bạn đã được đặt thành công. BookStore sẽ sớm giao hàng đến bạn.
                        </div>
                        <div class="modal-footer justify-content-center">
                            <span class="a-button-base">
                                <span class="a-button-inner">
                                    <nuxt-link to="/order" class="a-button-text" data-dismiss="modal">Xem đơn
                                        hàng</nuxt-link>
                                </span>
                            </span>
                            <span class="a-button-base">
                                <span class=" a-button-primary">
                                    <nuxt-link to="/" class="a-button-text" data-dismiss="modal">Tiếp tục mua
                                        sắm</nuxt-link>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="shipping-address">
                <div class="a-row a-spacing-large"></div>
                <div class="a-row">
                    <div class="a-size-large a-text-bold a-spacing-mini">Xác nhận đơn hàng</div>
                    <div class="a-row a-spacing-small a-size-mini"></div>
                </div>
                <div class="row">
                    <div class="col-xl-9 col-lg-8 col-md-12">
                        <div class="spc-top a-box a-spacing-small">
                            <div class="a-box-inner">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-7 col-sm-6 col-12">
                                        <div class="a-spacing-base">
                                            <div class="a-row">
                                                <strong>
                                                    Địa chỉ nhận hàng
                                                </strong>
                                                <nuxt-link to="/profile" class="text-info"><small>Thay
                                                        đổi</small></nuxt-link>
                                            </div>
                                            <div class="a-row">
                                                <div class="displayAddressDiv">
                                                    <ul class="displayAddressUL">
                                                        <li>{{ $auth.$state.user.name }}</li>
                                                        <li>{{ $auth.$state.user.city }}</li>
                                                        <li>{{ $auth.$state.user.address }}</li>
                                                        <li>
                                                            SDT:
                                                            <span dir="ltr">{{ $auth.$state.user.phone }}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="a-row">
                                                <span class="shipping-speeds-title a-size-medium">
                                                    <b>Chọn phương thức thanh toán</b>
                                                </span>
                                                <div class="a-spacing-mini wednesday">
                                                    <input type="radio" name="Deli" checked="checked"/>
                                                    <span class="a-radio-label">
                                                        <span class="a-color-secondary">
                                                            Thanh toán khi nhận hàng
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-5 col-sm-6 col-12">
                                        <div class="a-row shipping-speeds">
                                            <fieldset>
                                                <span class="shipping-speeds-title a-size-medium">
                                                    <b>Chọn phương thức vận chuyển:</b>
                                                </span>
                                                <div class="a-spacing-mini wednesday">
                                                    <input type="radio" name="order0" checked="checked"
                                                        @change="onChooseShipping('standard')" />
                                                    <span class="a-radio-label">
                                                        <span class="a-color-success">
                                                            <strong>Tiêu chuẩn - Trong vòng 7 ngày</strong>
                                                        </span>
                                                        <br />
                                                        <span class="a-color-secondary">25,000 VND&nbsp;-&nbsp;Giao hàng
                                                            tiêu
                                                            chuẩn - Không đồng kiểm</span>
                                                    </span>
                                                </div>
                                                <br />
                                                <div class="a-spacing-mini tuesday">
                                                    <input type="radio" name="order0" @change="onChooseShipping('fast')" />
                                                    <span class="a-radio-label">
                                                        <span class="a-color-success">
                                                            <strong>Nhanh - Từ 2-3 ngày <span class="badge badge-danger">Hỏa
                                                                    tốc</span></strong>
                                                        </span>
                                                        <br />
                                                        <span class="a-color-secondary">49,000 VND&nbsp;-&nbsp;Giao hàng
                                                            nhanh -
                                                            Được đồng kiểm</span>
                                                    </span>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="spc-orders a-box">
                            <div class="a-box-inner">
                                <div class="shipping-group">
                                    <div class="a-row text-dark a-text-bold a-size-medium a-spacing-small">Dự kiến giao hàng
                                        vào: <span class="a-color-state">{{ estimatedDelivery.toUpperCase() }}</span> </div>
                                    <div class="a-row a-color-state a-text-bold a-size-medium a-spacing-small">Chi tiết đơn
                                        hàng</div>
                                    <div class="a-row a-spacing-base" v-for="product in getCart" :key="product._id">
                                        <hr>
                                        <div class="row align-items-center">
                                            <div class="col-md-2 col-4">
                                                <img :src="product.photo" style="width: 100px;" />
                                            </div>
                                            <div class="col-md-10 col-8">
                                                <div class="a-row">
                                                    <strong>{{ product.title }}</strong>
                                                </div>
                                                <div class="a-row a-size-small">{{ product.author.name }}</div>
                                                <div class="a-row">
                                                    <span class="a-color-price a-spacing-micro">
                                                        <strong dir="ltr">Giá: {{ (product.price).toLocaleString() }}
                                                            VND</strong>
                                                    </span>
                                                </div>
                                                <div class="a-row">
                                                    <span class="availability a-color-success">Còn hàng</span>
                                                </div>
                                                <div class="a-row">
                                                    <strong>Số lượng mua: {{ product.quantity }}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-12 pl-0">
                        <div class="a-box-group">
                            <div class="a-box a-first">
                                <div class="a-box-inner">
                                    <div class="a-row">
                                        <div id="tfx-header">
                                            <div class="a-box a-alert-info a-spacing-small">
                                                <div class="a-box-inner alert-info-no-icon a-color-alternate-background">
                                                    <strong>
                                                        Chi tiết thanh toán
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="order-summary" style="font-size: 12px;">
                                            <div class="row">
                                                <div class="col-sm-6">Tổng tiền hàng:</div>
                                                <div class="col-sm-6 text-right">{{ (getCartTotalPrice).toLocaleString() }}
                                                    VND</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-6">Phí vận chuyển:</div>
                                                <div class="col-sm-6 text-right">{{ shippingPrice.toLocaleString() }}VND
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-sm-6"></div>
                                                <div class="col-sm-6 text-right">
                                                    <hr />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-6">Tổng tiền trước thuế:</div>
                                                <div class="col-sm-6 text-right">{{ getCartTotalPriceWithShipping }} VND
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-6">Thuế:</div>
                                                <div class="col-sm-6 text-right">0.00 VND</div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="a-color-price a-size-medium a-text-bold">Tổng cộng:
                                                    </div>
                                                </div>
                                                <div class="col-6 text-right">
                                                    <div class="a-color-price a-size-medium a-text-bold">{{
                                                        getCartTotalPriceWithShipping }} VND</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="a-row a-spacing-top-large">
                                            <span class="a-spacing-small a-button-primary a-button-icon">
                                                <span class="a-button-inner" @click="onPurchase">
                                                    <input type="submit" name="submit.add-to-cart" class="a-button-input">
                                                    <span class="a-button-text">Thanh toán ngay</span>
                                                </span>
                                            </span>
                                        </div>
                                        <div class="a-row a-spacing-small a-size-small a-text-center">
                                            Bằng việc chọn <strong>Thanh toán ngay</strong> bạn đã chấp thuận
                                            <a href="#">Điều khoản sử dụng</a>
                                            và
                                            <a href="#">Chính sách riêng tư</a> của BookStore.com
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
        <Footer />
    </body>
</template>
    
<script>
import { mapGetters } from "vuex";
export default {
    layout: "none",
    middleware: 'auth',
    async asyncData({ $axios, store }) {
        try {
            let response = await $axios.$post("/api/shipment", {
                shipment: "standard"
            });

            store.commit("setShipping", {
                price: response.shipment.price,
                estimatedDelivery: response.shipment.estimated
            });

            return {
                shippingPrice: response.shipment.price,
                estimatedDelivery: response.shipment.estimated
            };
        } catch (err) {
            console.log(err);
        }
    },
    computed: {
        ...mapGetters(["getCart", "getCartTotalPrice", "getCartTotalPriceWithShipping", "getEstimateDelivery"])
    },
    methods: {
        async onChooseShipping(shipment) {
            try {
                let response = await this.$axios.$post("/api/shipment", {
                    shipment: shipment
                });

                this.$store.commit("setShipping", {
                    price: response.shipment.price,
                    estimatedDelivery: response.shipment.estimated
                });

                this.shippingPrice = response.shipment.price;
                this.estimatedDelivery = response.shipment.estimated;
            } catch (err) {
                console.log(err);
            }
        },
        async onPurchase() {
            try {
                let data = {
                    cart: this.getCart,
                    estimatedDelivery: this.getEstimateDelivery,
                    totalPrice: this.getCartTotalPriceWithShipping.replaceAll(',','')
                }
                let response = await this.$axios.$post('http://localhost:3000/api/payment', data);
                await this.getCart.forEach(element => {
                    this.$axios.$put(`http://localhost:3000/api/products/${element._id}`, {stockQuantity:element.stockQuantity - element.quantity});
                });                
                if (response.success) {
                    this.$store.commit("clearCart");
                    $("#myModal").modal('show');
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

};
</script>
    