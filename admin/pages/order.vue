<template>
    <div>
        <template>
            <Navbar />
            <main>
                <div class="container-fluid c-section">
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-10">
                            <div class="a-spacing-top-medium row"></div>
                            <div class="row">
                                <h3 class="col-10 .offset-2">Quản lý đơn hàng</h3>
                                <strong class="text-secondary col-10 .offset-2">
                                    Tổng cộng: {{ orders.length }} đơn
                                </strong>
                            </div>
                            <hr>
                            <div class="row">
                                <strong class="col-12 ">Tất cả đơn hàng</strong>
                                <div class="col-lg-7">
                                    <table class="table table-bordered table-striped ">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">Mã đơn</th>
                                                <th scope="col">Khách</th>
                                                <th scope="col">Thành tiền</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Chi tiết</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(order, index) in orders.slice().reverse()" :key="order._id">
                                                <td>#{{ (order._id).slice(-4) }}</td>
                                                <td>{{ order.owner.name }}</td>
                                                <td>
                                                    <strong>{{ order.totalPrice.toLocaleString() }} VND</strong>
                                                </td>
                                                <td v-if="order.status === `Đang giao hàng`">
                                                    <span class="badge badge-warning">{{ order.status }}</span>
                                                </td>
                                                <td v-else>
                                                    <span class="badge badge-success">{{ order.status }}</span>
                                                </td>
                                                <td class="text-center">
                                                    <a class="a-button-history mx-auto"
                                                        @click="orderDetail(orders.length - 1 - index)">
                                                        Xem
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-lg-5">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr class="table-secondary">
                                                <th scope="col">
                                                    Mã đơn: #                                                    <span class="text-normal" v-if="orderIndexDetail!=null">{{orders[orderIndexDetail]._id }}
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="table-secondary">
                                                <th v-if="orderIndexDetail != null" scope="col">
                                                    Trạng thái:
                                                    <span v-if="orders[orderIndexDetail].status === `Đang giao hàng`">
                                                        <span class="badge badge-warning">
                                                            {{ orders[orderIndexDetail].status }}
                                                        </span>
                                                        <button class="a-button-confirm mx-2"
                                                            @click="updateOrderStatus(orders[orderIndexDetail]._id)">
                                                            Xác nhận đã giao
                                                        </button>
                                                    </span>
                                                    <span v-else class="badge badge-success">{{
                                                        orders[orderIndexDetail].status }}
                                                    </span>
                                                </th>
                                            </tr>
                                            <template v-if="orderIndexDetail == null">
                                                <tr></tr>
                                            </template>
                                            <template v-else>
                                                <tr class="table-scroll">
                                                    <div class="row px-2 border-bottom" v-for="product in orders[orderIndexDetail].products" :key="product._id" >
                                                        <div class="col-4 ">
                                                            <img :src="product.productID.photo" class="w-100" alt="">
                                                        </div>
                                                        <div class="col-8 mt-3">
                                                            <strong>{{ product.productID.title }}</strong>
                                                            <p>
                                                                <strong>Số lượng:</strong>
                                                                {{ product.quantity }}
                                                            </p>
                                                            <p>
                                                                <strong>Thành tiền:</strong>
                                                                {{ product.price * product.quantity }} VND
                                                            </p>
                                                        </div>
                                                    </div>
                                                </tr>
                                            </template>
                                            <tr class="table-secondary">
                                                <th scope="col">Thông tin giao hàng</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Địa chỉ: </strong>
                                                    <span v-if="orderIndexDetail != null">
                                                        {{ orders[orderIndexDetail].city }}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Giao hàng dự kiến: </strong>
                                                    <span v-if="orderIndexDetail != null">
                                                        {{ orders[orderIndexDetail].estimatedDelivery }}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-1"></div>
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
            let respone = await $axios.$get('http://localhost:3000/api/allOrders');
            return {
                orders: respone.orders
            }
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            orderIndexDetail: null
        }
    },
    methods: {
        orderDetail(index) {
            this.orderIndexDetail = index;
        },
        async updateOrderStatus(id) {
            try {
                let response = await this.$axios.$put(`http://localhost:3000/api/updateOrder/${id}`);
                if(response.success){
                    alert("Xác nhận thành công! Đã giao hàng");
                }
                this.$router.go();
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>