let Gallery = {
  render: async () => {
    let view = /*html*/ `
        <div class="card border-0 col-lg-12 text-content">          
          <div class="col-md-12 lazy-loading-container">
            <h1>
              Enjoy the scenery
            </h1>
            <div class="image-box">
              <img class="" 
                src="/images/gallery/1.jpg">
            </div>
            <div class="image-box">
              <img class="" 
                src="/images/gallery/2.jpg">
            </div>
            <div class="image-box">
              <img class=""  
                src="/images/gallery/3.jpg">
            </div>
            <div class="image-box">
              <img class="lzy_img"  
                data-src="/images/gallery/4.jpg">
            </div>
            <div class="image-box">
              <img class="lzy_img"  
                data-src="/images/gallery/5.jpg">
            </div>
            <div class="image-box">
              <img class="lzy_img"  
                data-src="/images/gallery/6.jpg">
            </div>
            <div class="image-box">
              <img class="lzy_img"  
                data-src="/images/gallery/7.jpg">
            </div>
            <div class="image-box">
              <img class="lzy_img"  
                data-src="/images/gallery/8.jpg">
            </div>
          </div>          
        </div>
    `;
    return view;
  },
  after_render: async () => {
    const options = { root: null, rootMargin: '0px', threshold: 0.2 };

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.9) {
            const lazyImage = entry.target;
            console.log('lazy loading ', lazyImage);
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lzy_img');
          }
        });
      }, options);

      const arr = document.querySelectorAll('img.lzy_img');
      arr.forEach((v) => {
        imageObserver.observe(v);
      });
  },
};

export default Gallery;