function locomotiveScrollTrigger(){
    gsap.registerPlugin(ScrollTrigger);


// --- SETUP START ---
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.defaults({ scroller: "#main" });
// --- SETUP END ---



// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function loadingAnimation(){
    var tl=gsap.timeline()

    tl.from(".line h1",{
        y:100,
        opacity: 0,
        duration:0.6,
        delay:0.5,
        stagger: 0.3
    })

    tl.from('#line1-part1, .line h2',{
        opacity: 0,
        onStart: function(){
            var loader= document.querySelector('#line1-part1 h5')
            var counter1=0
            var timer1= setInterval(() => {
                if(counter1 === 100){
                    clearInterval(timer1)
                }
                loader.textContent= counter1;
                counter1+= 2
            }, 35);
        }
    })

    tl.to('.line h2',{
        animationName: 'anime',
        opacity: 1
        
    })

    tl.to('#loader',{
        opacity: 0,
        duration: 0.4,
        delay: 2.5,
    })

    tl.from('#page1',{
        y: 1300,
        delay: 0.4,
        duration:0.8,
        opacity: 0,
    })

    tl.to('#loader',{
        display: 'none' 
    })

    tl.from('#nav',{
        opacity: 0
    })

    tl.from('.hero h1, .hero h2',{
        y: '100%',
        stagger: 0.2
    })
    tl.from('.hero, #page2',{
        opacity:0
    },'-=1.2')
}

function cursorAnimation(){
    
    Shery.mouseFollower({
        skew: true,
        // ease: "cubic-bezier(0.23,1,0.320,1)",
        duration: 1,
    });

    Shery.makeMagnet("#nav-part2 h4");

    const videoContainer = document.querySelector("#video-container");
    const videoCursor = document.querySelector("#play-btn-crsr");
    const video= document.querySelector('#video-container video')

    videoContainer.addEventListener('mouseenter',function(){
        videoContainer.addEventListener('mousemove',function(dets){
            gsap.to("#play-btn-crsr",{
                top: dets.y - videoContainer.getBoundingClientRect().top - 100,
                left: dets.x - videoContainer.getBoundingClientRect().left -100 ,
                ease: "cubic-bezier(0.23,1,0.320,1)",
            });
            gsap.to('.mousefollower',{
                opacity: 0,
            })
        })
        
    })
    videoContainer.addEventListener('mouseleave',function(){
        gsap.to("#play-btn-crsr",{
            top:'-11%',
            left:'71%'
        });
        gsap.to('.mousefollower',{
            opacity: 1,
        })
    })

    var flag=0;
    videoCursor.addEventListener('click',function(){
        if(flag == 0){
            video.play();
            video.style.opacity = 1;
            videoCursor.innerHTML=`<i class="ri-pause-mini-line"></i>`
            videoCursor.style.scale = 0.35
            flag=1
        }else{
            video.pause();
            video.style.opacity = 0
            videoCursor.innerHTML=`<i class="ri-play-fill"></i>`
            videoCursor.style.scale = 1

            flag=0
        }
    })
    
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#flag", {
          x: dets.x,
          y: dets.y
        })
      })
      document.querySelector("#hero3").addEventListener("mouseenter", function () {
        gsap.to("#flag", {
          opacity: 1
        })
      })
      document.querySelector("#hero3").addEventListener("mouseleave", function () {
        gsap.to("#flag", {
          opacity: 0
        })
      })

    
}

function footerAnimation() {

    var clutter = ""
    var clutter2 = ""
    document.querySelector("#page6-container h1").textContent.split("").forEach(function (elem) {
      clutter += `<span>${elem}</span>`
    })
    document.querySelector("#page6-container h1").innerHTML = clutter
    document.querySelector("#page6-container h2").textContent.split("").forEach(function (elem) {
      clutter2 += `<span>${elem}</span>`
    })
    document.querySelector("#page6-container h2").innerHTML = clutter2
  
  
    document.querySelector("#page6-container-text").addEventListener("mouseenter", function () {
      gsap.to("#page6-container h1 span", {
        opacity: 0,
        stagger: 0.02
      })
      gsap.to("#page6-container h2 span", {
        delay: 0.35,
        opacity: 1,
        stagger: 0.1
      })
    })
    document.querySelector("#page6-container-text").addEventListener("mouseleave", function () {
      gsap.to("#page6-container h1 span", {
        opacity: 1,
        stagger: 0.1,
        delay: 0.35,
      })
      gsap.to("#page6-container h2 span", {
        opacity: 0,
        stagger: 0.02
      })
    })
  }

function sheryAnimation(){
    Shery.imageEffect(".image-div", {
        style: 5,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749691738595},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.76,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.69,"range":[0,10]},"metaball":{"value":0.4,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.29,"range":[0,2]},"noise_scale":{"value":13.74,"range":[0,100]}},
        gooey: true,
    });
}

locomotiveScrollTrigger()

cursorAnimation()

loadingAnimation()

sheryAnimation()

footerAnimation()