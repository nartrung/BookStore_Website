<template>
    <div class="registerPage">
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <div class="text-center">
                        <nuxt-link to="/">
                            <img src="/img/logo-black.png" />
                        </nuxt-link>
                    </div>
                    <form class="mt-4">
                        <div class="a-box a-spacing-extra-large">
                            <div class="a-box-inner">
                                <h1 class="a-spacing-small text-center">Đăng nhập
                                    <p class="a-alert-content font-weight-bold text-center">DÀNH CHO QUẢN TRỊ VIÊN</p>
                                </h1>
                                <div class="a-alert-content text-danger font-weight-bold">{{ message }}</div>
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">Tên tài khoản</label>
                                    <input type="text" id="ap_customer_name"
                                        class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                        v-model="username" />
                                </div>
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">Mật khẩu</label>
                                    <input type="password" id="ap_customer_name"
                                        class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                        v-model="password" />
                                </div>
                                <div class="a-row a-spacing-extra-large mb-4">
                                    <span class="a-button-primary">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onLogin">Đăng nhập</span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: "auth",
    auth: "guest",
    data() {
        return {
            username: "",
            password: "",
            message: ""
        };
    },
    methods: {
        async onLogin() {
            try {
                await this.$auth.loginWith("local", {
                    data: {
                        username: this.username,
                        password: this.password
                    }
                });
                this.$router.push('/');
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>