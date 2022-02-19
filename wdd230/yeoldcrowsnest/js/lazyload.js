const images = document.querySelectorAll("[data-src]");

if ('IntersectionObserver' in window) {

    const imgOptions = {
        threshold: 0,
        rootMargin: "0px 0px 50px 0px"
    };
    
    let preloadImage = function(img) {
        img.src = img.getAttribute("data-src");
    }

    const imgObserver = new IntersectionObserver((images, imgObserver) => {
        images.forEach(image => {
            if (image.isIntersecting) {
                preloadImage(image.target);
                imgObserver.unobserve(image.target);
            }
        });
    }, imgOptions);

    images.forEach(image => {
        imgObserver.observe(image);
    });
}
else {
    alert('IntersectionObserver is not supported');
}