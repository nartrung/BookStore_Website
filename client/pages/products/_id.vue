<template>
    <div>
        <Navbar />
        <main>
            <div class="a-spacing-top-medium"></div>
            <div class="container-fluid">
                <div class="wayfinding-breadcrumbs-container">
                    <ul class="a-unordered-list a-horizontal a-size-small">
                        <li>
                            <span class="a-list-item">
                                <a href="#" class="a-link-normal a-color-tertiary">{{ product.category.type }}</a>
                            </span>
                        </li>
                        <li>
                            <span class="a-list-item">></span>
                        </li>
                        <li>
                            <span class="a-list-item">
                                <a href="#" class="a-link-normal a-color-tertiary">{{product.title}}</a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="container-fluid">
                <div class="dp-container">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-4">
                            <div class="leftCol">
                                <div class="imgBlock">
                                    <div class="eBooksimg">
                                        <img :src="product.photo" alt="" class="img-fluid">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-8">
                            <div class="centerCol">
                                <div class="titleDiv">
                                    <div class="productTitle">
                                        <span class="largeTitle">{{product.title}}</span>
                                        <span class="smallTitle">(Bìa mềm)</span>
                                    </div>
                                </div>
                                <div class="byLineif">
                                    bởi
                                    <a href="#aboutAuthor" class="authorName">{{product.author.name}}
                                        <i class="fas fa-chevron-down"
                                            style="font-size: 8px !important; color: #555 !important;"></i>
                                    </a> (Tác giả)
                                </div>
                                <div class="reviewGroup"></div>
                                <hr>
                                <div class="mediaMatrix">
                                    <div class="formats">
                                        <span class="link-expander">
                                            >
                                            <span class="tmmShowPrompt">Xem tất cả phiên bản</span>
                                        </span>
                                        <ul>
                                            <li class="swatchElement" style="width: 117px;">
                                                <span class="a-list-item">
                                                    <span class="a-button-toggle">
                                                        <span class="a-button-inner">
                                                            <span class="a-button-text">
                                                                <span>Kindle</span>
                                                                <br>
                                                                <span class="a-color-secondary">-</span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                    <span class="tmm-olp-links"></span>
                                                    <span class="tmm-olp-links">
                                                        <a href="#" class="a-size-mini"></a>
                                                        <span class="kcpAppBox">
                                                            <span class="a-declarative">
                                                                Đọc với
                                                                <span class="a-text-bold">Ứng dụng Bookworm</span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </li>
                                            <li class="swatchElement" style="width: 117px;">
                                                <span class="a-list-item">
                                                    <span class="a-button-toggle">
                                                        <span class="a-button-inner">
                                                            <span class="a-button-text">
                                                                <img src="/img/audiblelogo.png" alt="" class="img-fluid" style="width: 20px;">
                                                                <span>Audible</span>
                                                                <br>
                                                                <span class="a-color-secondary">-</span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                    <span class="tmm-olp-links"></span>
                                                    <span class="tmm-olp-links">
                                                        <a href="#" class="a-size-mini"></a>
                                                        <span class="kcpAppBox">
                                                            <span class="a-declarative">
                                                                Đọc với 
                                                                <span class="a-text-bold">Audible</span> 
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </li>
                                            <li class="swatchElement" style="width: 117px;">
                                                <span class="a-list-item">
                                                    <span class="a-button-toggle">
                                                        <span class="a-button-inner">
                                                            <span class="a-button-text">
                                                                <span>Bìa mềm</span>
                                                                <br>
                                                                <span class="a-color-secondary">-</span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <hr>
                                <div class="bookDescription text-justify">
                                    <div class="bookDescriptionInner">{{ product.description }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3">
                            <div class="combinedBuyBox a-spacing-top-medium">
                                <div class="buyBox">
                                    <div class="a-section">
                                        <div class="clearfix">
                                            <div class="float-left">
                                                <form>
                                                    <input type="radio" id="buying1" name="radio-group checked">
                                                    <label for="buying1">Mua ngay</label>
                                                </form>
                                            </div>
                                            <div class="float-right">
                                                <span class="a-size-medium a-color-price offer-price a-text-normal">
                                                    {{product.price.toLocaleString()}} VND
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="a-spacing-large"></div>
                                    <div class="a-section a-spacing-small a-spacing-top-micro">
                                        <div class="row">
                                            <span class="a-color-base buyboxShippingLabel"></span>
                                        </div>
                                    </div>
                                    <div class="a-section a-spacing-small">
                                        <div class="a-section a-spacing-none">
                                            <span class="a-size-medium a-color-success">Còn hàng</span>
                                        </div>
                                        <div class="a-section a-spacing-mini">Vận chuyển bởi BookStore.com</div>
                                    </div>
                                    <div class="a-section">
                                        <div class="a-button-stack" @click="addProductToCart(product)">
                                            <span class="a-spacing-small a-button-primary a-button-icon">
                                                <span class="a-button-inner">
                                                    <i class="a-icon a-icon-cart"></i>
                                                    <input type="submit" name="submit.add-to-cart" class="a-button-input">
                                                    <span class="a-button-text">Thêm vào giỏ</span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="a-row">
                                        <div class="a-spacing-top-small">
                                            <div class="a-section a-spacing-none">
                                                <div class="a-section a-spacing-none a-spacing-top-mini">
                                                    Đơn hàng sẽ được vận chuyển đến bạn
                                                    <b>trong vòng 7 ngày.</b>
                                                    Vui lòng theo dõi quá trình vận chuyển trong phần <b>Chi tiết</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <span class="a-declarative">
                                        <a href="#" class="a-link-normal">
                                            <div class="a-row a-spacing-mini">
                                                <i class="fas fa-map-marker-alt"></i>
                                                <span class="a-size-small">Giao đến Cần Thơ</span>
                                            </div>
                                        </a>
                                    </span>
                                    <br>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <hr>
                    <div class="books-entity-teaser" id="aboutAuthor">
                        <div class="bucket">
                            <h2>Thông tin tác giả</h2>
                            <div class="content">
                                <div class="row">
                                    <div class="col-md-2 col-sm-4 col-4">
                                        <div class="authorContent">
                                            <div class="authorImageSingle">
                                                <a href="#">
                                                    <img :src="product.author.photo" alt="" class="img-fluid rounded">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-8 col-sm-6 col-6 pl-0">
                                        <div class="mainContent">
                                             <span> Tác giả: <strong class="largeTitle text-info">{{product.author.name}}</strong> </span>
                                            <h3>Tiểu sử</h3>
                                            <div id="authorBio" class="text-justify">{{product.author.about}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Review :product="product" :reviews="reviews"/>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>

<script>
import {mapActions} from "vuex";
export default{
    async asyncData({$axios, params}) {
        try{
            let singleProduct = await $axios.$get(`/api/products/${params.id}`);
            let manyReviews = await $axios.$get(`/api/reviews/${params.id}`);
            const [productRespone, reviewRespone] = await Promise.all([
                singleProduct,
                manyReviews
            ]);
            return{
                product: productRespone.product,
                reviews: reviewRespone.reviews,
            }
        }catch(err){
            console.log(err);
        }
    },
    methods:{
        ...mapActions(["addProductToCart"])
    }
}
</script>