const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sliderImgs = $$('.main__slider-img');
const dotSliders = $$('.slider__page-dot');
const slideNumber = $('.slider__page-number');
const nextBtn = $('.next-btn');
const prevBtn = $('.prev-btn');
const headerNavbarItems = $$('.header__navbar-item-link');
const sections = $$('section[id]');
const navbarLangs = $$('.header__navbar-lang-link');
const languageShow = $('.header__navbar-lang-choose > span');
const videoProducts = $$('.products__quality-img');
const modal = $('.modal');
const videoElement = $('.modal__video');
const btnIntroBanner = $('.main__banner-intro-btn');
const backToTopBtn = $('.footer__back');
const menuTabMobBtn = $('.header__navbar-menu');
const menuTabMobOverlay = $('.nav__overlay');
const navTabMob = $('.nav__tablet-mobile');
const closeNavBtn = $('.nav__mobile-close');
const navTabMobItem = $$('.nav__tablet-mobile-link');

const app = {
    currentSlider: 0,

    videos: [
        {
            url: 'https://www.youtube.com/embed/d44UTUSTYKU'
        },
        {
            url: 'https://www.youtube.com/embed/fTXd-DpN3AI'
        },
        {
            url: 'https://www.youtube.com/embed/Zzn9-ATB9aU'
        },
        {
            name: 'introBanner',
            url: 'https://www.youtube.com/embed/cUmpJ2zwfVU'
        }
    ],

    handleEvents: function () {
        //Xử lý tự chuyển slide mỗi 8s
        setInterval(function(){
            app.currentSlider++;
            app.nextSlide();
        }, 8000);

        //Xử lý click nút next 
        nextBtn.onclick = function () {
            app.currentSlider++;
            app.nextSlide();
        }
        //Xử lý click nút prev
        prevBtn.onclick = function(){
            app.currentSlider--;
            app.prevSlide();
        }

        //Hàm xử lý click dotSliders
        dotSliders.forEach(function(dot, index){
            dot.onclick = function(){
                app.currentSlider = index;
                app.nextSlide();
            }
        })

        //Xử lý thanh menu khi scroll
        window.addEventListener('scroll', function(){
            app.scrollToSection();
        })

        //Hàm xử lý chọn ngôn ngữ
        navbarLangs.forEach(function(lang){
            lang.onclick = function (e) {
                const languageChoose = $('.header__navbar-lang-link.show');
                languageChoose.classList.remove('show');
                e.target.classList.add('show');
                app.loadLanguage();
            }
        })

        //Xử lý hiện video
        videoProducts.forEach(function(video, index){
            video.onclick = function(){
                modal.classList.add('modal__open');
                videoElement.setAttribute('src', `${app.videos[index].url}`);
            }
        })

        modal.onclick = function(){
            modal.classList.remove('modal__open');
            videoElement.setAttribute('src', '');
        }

        btnIntroBanner.onclick = function(){
            modal.classList.add('modal__open');
            for(var video of app.videos){
                if(video.name === 'introBanner'){
                    videoElement.setAttribute('src', `${video.url}`);
                }
            }
        }

        //Xử lý bấm về đàu trang
        backToTopBtn.onclick = function(){
            document.body.scrollTop = 0; //Safari
            document.documentElement.scrollTop = 0;  //Chrome, Firefox, IE and Opera
        } 

        //Xử lý nav menu cho tablet và mobile
        menuTabMobBtn.onclick = function(){
            app.openNavTabMob();
        }

        closeNavBtn.onclick = function(){
            app.closeNavTabMob();
        }

        menuTabMobOverlay.onclick = function(){
            app.closeNavTabMob();
        }

       
    },

    closeNavTabMob: function(){
        menuTabMobOverlay.style.display = 'none';
        navTabMob.style.opacity = '0';
        navTabMob.style.transform = 'translateX(100%)';
    }, 

    openNavTabMob: function(){
        menuTabMobOverlay.style.display = 'block';
        navTabMob.style.opacity = '1';
        navTabMob.style.transform = 'translateX(0)';
    },

    loadLanguage: function(){
        const languageChoose = $('.header__navbar-lang-link.show');
        languageShow.innerText = languageChoose.innerText;
    },

    //Hàm xử lý chuyển slide 
    nextSlide: function(){
        if(app.currentSlider >= sliderImgs.length){
            app.currentSlider = 0;
        }
        sliderImgs.forEach(function(slide, index){
            if(index === app.currentSlider){
                slide.classList.add('active');
                dotSliders[index].classList.add('slider__page-dot-active');
            }
            else{
                slide.classList.remove('active');
                dotSliders[index].classList.remove('slider__page-dot-active');
            }
        })
        slideNumber.innerText = '0' + (app.currentSlider + 1);
    },

     //Hàm xử lý lùi slide 
    prevSlide: function(){
        if(app.currentSlider < 0){
            app.currentSlider = sliderImgs.length - 1;
        }
        sliderImgs.forEach(function(slide, index){
            if(index === app.currentSlider){
                slide.classList.add('active');
                dotSliders[index].classList.add('slider__page-dot-active');
            }
            else{
                slide.classList.remove('active');
                dotSliders[index].classList.remove('slider__page-dot-active');
            }
        })
        slideNumber.innerText = '0' + (app.currentSlider + 1);
    },

    //Hàm xử lý click menu
    scrollToSection: function(){
        let current = '';
        sections.forEach(function(section){
            const sectionTop = section.offsetTop;
            const sectionHeigh = section.clientHeight;
            if(pageYOffset >= (sectionTop - sectionHeigh / 3)){
                current = section.getAttribute('id');
            }
        })
        
        headerNavbarItems.forEach(function(item){
            item.classList.remove('header__navbar-item-link-active');
            if(item.getAttribute('href') === `#${current}`){
                item.classList.add('header__navbar-item-link-active');
            }
        })

        navTabMobItem.forEach(function(item){
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${current}`){
                item.classList.add('active');
            }
            item.onclick = function(){
                app.closeNavTabMob();
            }
        })
    },

    start: function(){
        this.handleEvents();
        this.loadLanguage();
    }
}

app.start();