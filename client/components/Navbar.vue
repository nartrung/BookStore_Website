<template>
    <div>
        <header class="">
            <div class="container-fluid dekstop-nav">
                <div class="row">
                    <div class="col-sm-3 col-4">
                        <div class="logo-area">
                            <nuxt-link to="/">
                                <img src="/img/logo.png" alt="" class="img-fluid" style="min-width: 100px;">
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="col-sm-6 col-8 pt-0">
                        <Search />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-2 d-sm-block d-none pl-2">
                        <div class="nav-global-location">
                            <span class="nav-a nav-a-2">
                                <div class="nav-sprite" id="nav-packard-glow-loc-icon"></div>
                                <div id="glow-ingress-block">
                                    <span class="nav-line-1" id="glow-ingress-line1">Giao đến</span>
                                    <template v-if="$auth.$state.loggedIn">
                                        <span class="nav-line-2 truncated" id="glow-ingress-line2">{{ $auth.$state.user.city}}</span>
                                    </template>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-3 p-0 d-none d-md-block">
                        <div class="nav-fill">
                            <div class="nav-shop  d-none d-lg-block">
                                <nuxt-link to="/" class="nav-a nav-a-2 nav-single-row-link">
                                    <span class="nav-line-2">
                                        Trang chủ
                                    </span>
                                </nuxt-link>
                            </div>
                            <div class="nav-xshop-container">
                                <div class="nav-xshop">
                                    <nuxt-link to="/#NewBooks" class="nav-a" style="cursor: pointer;">Sách mới</nuxt-link>
                                    <span class="nav-item dropdown">
                                        <span class="nav-a dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                            Thể loại
                                        </span>
                                        <div class="dropdown-menu">
                                            <nuxt-link v-for="category in categories.categories" :key="category._id"
                                                :to="`/#${removeAccents(category.type)}`" class="dropdown-item" href="#">{{
                                                    category.type }}</nuxt-link>

                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5 col-lg-5 col-md-6 col-sm-9 ml-auto col-12 p-0">
                        <div class="nav-tools">
                            <span class="icp-nav-link-border"></span>
                            <template v-if="$auth.$state.loggedIn">
                                <nuxt-link to="/profile" class="nav-a nav-a-2" id="nav-link-accountList" tabindex="0">
                                    <span class="nav-line-1">Xin chào,</span>
                                    <span class="nav-line-2">
                                        {{ $auth.$state.user.name }}
                                    </span>
                                </nuxt-link>
                                <nuxt-link to="/order" class="nav-a nav-a-2" id="nav-link-accountList" tabindex="0">
                                    <span class="nav-line-1"></span>
                                    <span class="nav-line-2">
                                        Đơn hàng
                                    </span>
                                </nuxt-link>
                                <span class="nav-a nav-a-2 nav-single-row-link">
                                    <span class="nav-line-1"></span>
                                    <span class="nav-line-2" style="text-decoration: underline; cursor: pointer;"
                                        @click="onLogout">Đăng xuất</span>
                                </span>
                            </template>
                            <template v-else>
                                    <nuxt-link to="/login" class="nav-a nav-a-2" id="nav-link-accountList" tabindex="0">
                                        <span class="nav-line-1">Xin chào, Khách</span>
                                        <span class="nav-line-2">
                                            Đăng nhập
                                            <span class="nav-icon nav-arrow" style="visibility: visible;"></span>
                                        </span>
                                    </nuxt-link>
                            </template>
                            <nuxt-link to="/cart" class="nav-a nav-a-2" id="nav-cart">
                                <span aria-hidden="true" class="nav-line-1"></span>
                                <span aria-hidden="true" class="nav-line-2">Giỏ hàng</span>
                                <span class="nav-cart-icon nav-sprite"></span>
                                <span id="nav-cart-count" aria-hidden="true" class="nav-cart-count nav-cart-0">{{
                                    getCartLength }}</span>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            categories: []
        };
    },
    async fetch() {
        try {
            this.categories = await fetch('http://localhost:3000/api/categories')
                .then(res => res.json());
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        async onLogout() {
            await this.$auth.logout();
        },
        removeAccents(str) {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/\s/g, '');
        }
    },
    computed: {
        ...mapGetters(["getCartLength"])
    },
}
</script>
