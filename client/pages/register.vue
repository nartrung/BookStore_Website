<template>
    <div>
        <Navbar />
        <main class="registerPage">
            <div class="container">
                <div class="row">
                    <div class="col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4">
                        <div class="text-center">
                            <span><img src="/img/logo-black.png" alt=""></span>
                        </div>
                        <form class="mt-4">
                            <div class="a-box a-spacing-extra-large">
                                <div class="a-box-inner">
                                    <h1 class="a-spacing-small">Tạo tài khoản</h1>
                                    <div class="a-row">
                                        <label for="ap_customer_name" class="a-form-label">Họ Tên</label>
                                        <input type="text" id="ap_customer_name"
                                            class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                            placeholder="Họ và tên của bạn" v-model="name" required>
                                        <span class="a-alert-content text-danger font-weight-bold">
                                            <span v-if="!validName">*Vui lòng nhập họ tên!</span>
                                            <span v-else class="invisible">*</span>
                                        </span>
                                    </div>
                                    <div class="a-row">
                                        <label for="ap_customer_name" class="a-form-label">Email</label>
                                        <input type="email" id="ap_customer_name"
                                            class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                            placeholder="Email của bạn" ref="email" v-model="email" required>
                                        <span class="a-alert-content text-danger font-weight-bold">
                                            <span v-if="!validEmail">*Email không hợp lệ!</span>
                                            <span v-else class="invisible">*</span>
                                        </span>
                                    </div>
                                    <div class="a-row">
                                        <label for="ap_customer_name" class="a-form-label">Mật khẩu</label>
                                        <input type="password" id="ap_customer_name"
                                            class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                            placeholder="Mật khẩu" ref="password" v-model="password" required @keyup="checkMatchPass">
                                        <span class="a-alert-content text-danger font-weight-bold">
                                            <span v-if="!validPass">*Vui lòng nhập mật khẩu!</span>
                                            <span v-else class="invisible">*</span> 
                                        </span>
                                    </div>
                                    <div class="a-row">
                                        <label for="ap_customer_name" class="a-form-label">Nhập lại mật khẩu</label>
                                        <input type="password" id="ap_customer_name"
                                            class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                            placeholder="Nhập lai mật khẩu" ref="passwordAgain" required @keyup="checkMatchPass">
                                        <span class="a-alert-content text-danger font-weight-bold">
                                            <span v-if="!matchPassword">*Mật khẩu không trùng khớp!!</span>
                                            <span v-else class="invisible">*</span>
                                            
                                        </span>
                                    </div>
                                    <div class="a-row a-spacing-extra-large mb-4">
                                        <span class="a-button-primary">
                                            <span class="a-button-inner">
                                                <span class="a-button-text" @click="onSignup">Tạo tài khoản</span>
                                            </span>
                                        </span>
                                        <div class="a-row a-spacing-top-medium a-size-small">
                                            <b>
                                                Với việc đăng ký tài khoản, đồng nghĩa với bạn đã đồng ý với
                                                <span class="acrCustomerReviewLink">Điều khoản sử dụng</span> và
                                                <span class="acrCustomerReviewLink">Chính sách riêng tư</span> của BookWorm
                                            </b>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="a-row">
                                        <b>
                                            Đã có tài khoản?
                                            <nuxt-link to="/login" class="a-link-emphasis">Đăng nhập ngay</nuxt-link>
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    middleware: "auth",
    auth: "guest",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            validName: true,
            validEmail: true,
            validPass: true,
            matchPassword: true,
        }
    },
    methods: {
        async checkMatchPass(){
            let password = this.$refs.password.value;
            let passwordAgain = this.$refs.passwordAgain.value;
            this.matchPassword = (password == passwordAgain);
        },
        async onSignup() {
            try {
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
                let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                this.validEmail = await (this.$refs.email.value.match(validRegex) != null) && (this.email != "");
                this.validName = await (this.name != "");
                this.validPass = await (this.$refs.password.value.length >=6);
                if (this.matchPassword && this.validName && this.validPass && this.validEmail){
                    let respone = await this.$axios.$post("/api/auth/signup", data);
                    if (respone.success) {
                        this.$auth.loginWith("local", {
                            data: {
                                email: this.email,
                                password: this.password,
                            }
                        });
                        this.$router.push("/");
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>
