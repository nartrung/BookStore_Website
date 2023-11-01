<template>
    <!--MAIN-->
    <main>
        <Navbar />
        <!--YOUR ORDER-->
        <div class="container-fluid your-order">
            <div class="a-spacing-top-medium"></div>
            <div class="row">
                <div class="wayfinding-breadcrumbs-container">
                    <ul class="a-unordered-list a-horizontal a-size-small">
                        <li>
                            <span class="a-list-item">
                                <a href="#" class="a-link-normal a-color-tertiary">Tài khoản</a>
                            </span>
                        </li>
                        <li>
                            <span class="a-list-item">></span>
                        </li>
                        <li>
                            <span class="a-list-item">
                                <a href="#" class="a-link-normal a-color-tertiary">Đơn hàng của bạn</a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-2 col-lg-1 col-md-12"></div>
                <div class="col-xl-8 col-lg-9 col-md-12">
                    <div class="row">
                        <h2 class="a-spacing-medium ml-3">Đơn hàng của bạn</h2>
                    </div>
                    <div class="a-row a-spacing-medium custom-view-options">
                        <ul class="a-unordered-list a-nostyle a-horizontal">
                            <li role="tab">
                                <span class="a-list-item"></span>
                            </li>
                            <li class="selected" role="tab">
                                <span class="a-list-item">
                                    <span class="item">Tất cả đơn hàng</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div class="orderContent a-spacing-medium" v-for="order in orders" :key="order._id">

                        <div class="orderContentHeader">
                            <div class="row">
                                <div class="col-xl-3 col-lg-3 col-md-3 text-left">
                                    <div class="a-row">
                                        <span class="a-size-mini a-color-secondary">Ngày giao hàng dự kiến</span>
                                        <br />
                                        <span class="a-size-base a-text-bold a-color-secondary">{{ order.estimatedDelivery
                                        }}</span>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-3">
                                    <div class="a-row">
                                        <span class="a-size-mini a-color-secondary">Thanh toán</span>
                                        <br />
                                        <span class="a-size-base a-text-bold a-color-secondary">{{
                                            order.totalPrice.toLocaleString() }} VND</span>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-7 text-right">
                                    <div class="a-row">
                                        <span class="a-size-mini a-color-secondary">Mã đơn #{{ order._id }}</span>
                                        <br />
                                        &nbsp;
                                        <span class="a-size-base font-weight-bold a-link-normal">Trả hàng</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="orderContentBodyAlt">
                            <div class="a-row">
                                <h1 class="a-size-medium a-text-bold"
                                    style="color: #111 !important;font-family: 'MyWebFont',Arial,sans-serif !important; ">
                                    Trạng thái: <span class="text-danger">{{ order.status }}</span>
                                </h1>
                            </div>
                            <div>
                                <div class="a-spacing-base"></div>
                                <hr>
                                <div class="row">
                                    <div class="col-xl-2 col-md-2 col-4">
                                        <a href="#">
                                            <img class="img-fluid" style="width: 100px;" :src="order.products[0].productID.photo" />
                                        </a>
                                    </div>
                                    <div class="col-xl-10 col-md-10 col-8">
                                        <div class="a-row">
                                            <span class="a-size-small">
                                                <h5>{{ order.products[0].productID.title }}</h5>
                                                Tác giả: <strong>{{ order.products[0].productID.author.name }}</strong>
                                            </span>
                                        </div>
                                        <div class="a-row">
                                            <span class="a-size-mini" style="color: #111; font-weight: 400;">{{
                                                order.products[0].quantity }} sản phẩm</span>
                                        </div>
                                        <div class="a-row">
                                            <span class="a-size-mini a-color-price">{{ (order.products[0].productID.price *
                                                order.products[0].quantity).toLocaleString() }}
                                                VND</span>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                            <div v-for="product in order.products.slice(1)" :key="product._id" class="collapse" :id="order._id.replace(/[0-9]/g, '')">
                                <div class="a-spacing-base"></div>
                                <hr>
                                <div class="row">
                                    <div class="col-xl-2 col-md-2 col-4">
                                        <a href="#">
                                            <img class="img-fluid" style="width: 100px;" :src="product.productID.photo" />
                                        </a>
                                    </div>
                                    <div class="col-xl-10 col-md-10 col-8">
                                        <div class="a-row">
                                            <span class="a-size-small">
                                                <h5>{{ product.productID.title }}</h5>
                                                Tác giả: <strong>{{ product.productID.author.name }}</strong>
                                            </span>
                                        </div>
                                        <div class="a-row">
                                            <span class="a-size-mini" style="color: #111; font-weight: 400;">{{
                                                product.quantity }} sản phẩm</span>
                                        </div>
                                        <div class="a-row">
                                            <span class="a-size-mini a-color-price">{{ (product.productID.price *
                                                product.quantity).toLocaleString() }}
                                                VND</span>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-end">
                                <div class="a-row pr-3 pb-2">
                                    <template v-if="order.status == `Đã giao hàng`">
                                        <span class="a-button-buy-again">Mua lại</span>
                                    </template>
                                    <button class="a-button-view-item" data-toggle="collapse" :data-target="`#${order._id.replace(/[0-9]/g, '')}`">Xem chi tiết/Ẩn bớt</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-1 col-md-12"></div>
            </div>
            <br>
        </div>
        <Footer />
    </main>
    <!--/MAIN-->
</template>

<script>
export default {
    middleware: 'auth',
    async asyncData({ $axios }) {
        try {
            let response = await $axios.$get("/api/orders");
            return {
                orders: response.products
            }
        }
        catch {
            console.log(err);
        }

    },
}

</script>
  