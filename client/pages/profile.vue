<template>
    <div>
        <Navbar />
        <main>
            <div class="container-fluid c-section">
                <div class="row">
                    <div class="col-lg-3 col-sm-2"></div>
                    <div class="col-lg-6 col-sm-8">
                        <div class="a-spacing-top-medium"></div>
                        <h2>Cập nhật thông tin</h2>
                        <br>
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link active font-weight-bold" data-toggle="tab" href="#profile">Cập nhật thông tin</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link font-weight-bold" data-toggle="tab" href="#password">Đổi mật khẩu</a>
                            </li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div id="profile" class="container tab-pane active ">
                                <form @keyup.enter="onUpdateProfile">
                                    <!-- Name -->
                                    <div class="a-spacing-top-medium">
                                        <label>Họ Tên</label>
                                        <input class="a-input-text w-100" v-model="name"
                                            :placeholder="$auth.$state.user.name" />
                                    </div>
                                    <!-- Email -->
                                    <div class="a-spacing-top-medium">
                                        <label>Email</label>
                                        <input class="a-input-text w-100" v-model="email"
                                            :placeholder="$auth.$state.user.email" />
                                    </div>
                                    <div class="a-spacing-top-medium">
                                        <label>Thành phố</label>
                                        <select name="city" id="city" v-model="city" class="a-select-option text-left"
                                            required>
                                            <option v-for="city in cities" :key="city.code" :value="city.name">{{ city.name
                                            }}</option>
                                        </select>
                                    </div>
                                    <div class="a-spacing-top-medium">
                                        <label>Địa chỉ</label>
                                        <input class="a-input-text w-100" v-model="address"
                                            placeholder="VD: 123, Đường A, Phường B, Quận C" />
                                    </div>
                                    <div class="a-spacing-top-medium">
                                        <label>Số điện thoại</label>
                                        <input class="a-input-text w-100" v-model="phone"
                                            :placeholder="$auth.$state.user.phone" />
                                    </div>
                                    <div class="a-alert-content text-danger font-weight-bold">*Vui lòng nhập chính xác thông
                                        tin. Thông tin này sẽ ảnh hưởng đến quá trình giao hàng cho bạn.</div>
                                    <div ref="profileUpdateSuccess"
                                        class="alert alert-success a-spacing-top-medium invisible">
                                        <strong>Cập nhật thành công</strong> Thông tin đã được cập nhật.
                                    </div>
                                    <!-- Button -->

                                </form>
                            </div>
                            <div id="password" class="container tab-pane fade"><br>
                                <!-- Password -->
                                <div class="a-spacing-top-medium">
                                    <label>Mật khẩu</label>
                                    <input type="password" class="a-input-text w-100" v-model="password"
                                        @keyup="checkMatchPass" ref="Pass" />
                                </div>
                                <div class="a-spacing-top-medium">
                                    <label>Nhập lai mật khẩu</label>
                                    <input type="password" class="a-input-text w-100" @keyup="checkMatchPass"
                                        ref="confirmPass" />
                                </div>
                                <span class="a-alert-content text-danger font-weight-bold">
                                    <span v-if="!matchPassword">*Mật khẩu không trùng khớp!!</span>
                                    <span v-else class="invisible">*</span>

                                </span>
                            </div>
                            <div class="row">
                                <div class="a-spacing-top-small">
                                    <span class="a-button-register ml-3">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onUpdateProfile">Cập nhật thông
                                                tin</span>
                                        </span>
                                    </span>
                                </div>
                                <div class="a-spacing-top-small">
                                    <span class="a-button-logout ml-3">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onLogout">Đăng xuất</span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div>


                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-8"></div>
                </div>
            </div>
        </main>
    </div>
</template>
      

<script>
export default {
    async asyncData({ $axios }) {
        try {
            let response = await $axios.$get("https://provinces.open-api.vn/api/?depth=2");
            return {
                cities: response
            }
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            city: "",
            address: "",
            phone: "",
            matchPassword: true,
        };
    },
    methods: {
        async onUpdateProfile() {
            let data = {
                name: this.name,
                email: this.email,
                password: this.password,
                city: this.city,
                address: this.address,
                phone: this.phone,
            };
            try {
                let response = await this.$axios.$put("/api/auth/user", data);
                if (response.success) {
                    this.name = "";
                    this.email = "";
                    this.password = "";
                    this.city = "",
                        this.address = "",
                        this.phone = "",
                        await this.$auth.fetchUser();
                }
                let profileUpdateSuccess = this.$refs.profileUpdateSuccess;
                profileUpdateSuccess.classList.remove("invisible");
                setTimeout(() => {
                    profileUpdateSuccess.classList.add("invisible");
                }, 2000);

            } catch (err) {
                console.log(err);
            }
        },
        async onLogout() {
            await this.$auth.logout();
        },
        async checkMatchPass() {
            let Pass = this.$refs.Pass.value;
            let confirmPass = this.$refs.confirmPass.value;
            this.matchPassword = (Pass == confirmPass);
        },
    }
};
</script>