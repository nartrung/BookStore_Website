<template>
  <div>
    <header class="navbar navbar-expand-md navbar-dark py-3">
      <div class="col-sm-2 col-4 mb-2">
        <div class="logo-area">
          <nuxt-link to="/">
            <img src="/img/logo.png" alt="" class="img-fluid" style="min-width: 100px;">
          </nuxt-link>
        </div>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-around .align-items-center" id="collapsibleNavbar">
        <div class="navbar-nav">
          <div class="nav-item pl-3 my-2 flex-fill">
            <nuxt-link to="/"  >
              <button class="a-button-buy-again " style="min-width: 140px; line-height: normal;"> Quản lý sách</button>
            </nuxt-link>
          </div>
          <div class="nav-item pl-3 my-2 flex-fill">
            <nuxt-link to="/category">
              <button class="a-button-buy-again " style="min-width: 140px; line-height: normal"> Quản lý danh mục</button>
            </nuxt-link>
          </div>
          <div class="nav-item pl-3 my-2 flex-fill">
            <nuxt-link to="/author" >
              <button class="a-button-buy-again " style="min-width: 140px; line-height: normal"> Quản lý tác giả</button>
            </nuxt-link>
          </div>
        </div>
        <div>
          <div class="pt-0 d-flex">
            <div class="nav-tools pl-3">
              <span class="icp-nav-link-border"></span>
              <nuxt-link to="/" class="nav-a nav-a-2" id="nav-link-accountList" tabindex="0">
                <span class="nav-line-1">Xin chào,</span>
                <span class="nav-line-2">
                  Quản trị viên
                </span>
              </nuxt-link>
              <span class="nav-a nav-a-2 nav-single-row-link">
                <span class="nav-line-1"></span>
                <span class="nav-line-2" style="text-decoration: underline; cursor: pointer;" @click="onLogout">Đăng
                  xuất</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    async onLogout() {
      await this.$auth.logout();
    }
  },
}
</script>
