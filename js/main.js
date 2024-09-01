const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// 배너 사라지게 하는 기능
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function() {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간sec, 옵션);
    gsap.to(badgeEl, .6, { // 0.6초간 opacity 0으로 변함.
      opacity: 0,
      display: 'none'
    });

    gsap.to(toTopEl, .2, {
      x: 0  // px
    });   
  }
  else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });

    gsap.to(toTopEl, .2, {
      x: 100  // px
    });
  }
}, 300)); // 300ms
// _.throttle(함수, 시간ms)



toTopEl.addEventListener('click', function () {
  console.log('clicked to-top');
  gsap.to(window, .7, {
    scrollTo: 0
  });
});



//----------

// 순차적으로 이미지 나타나게하기
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  // gsap.to(요소, 지속시간sec, 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // 0.7, 1.4, 2.1, 2.7
    opacity: 1
  });
});


// 스와이퍼
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  loop: true,
  autoplay: {
    delay: 3000, // ms
    disableOnInteraction: false,
  },
});

new Swiper('.promotion .swiper', {
  direction: 'horizontal', // 기본값
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000, // ms
    disableOnInteraction: false,
  },  
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
})

new Swiper('.awards .swiper', {
  direction: 'horizontal',
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    prevEl: '.awards .swiper-next'
  }
})





// 토글 프로모션
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion')
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add('hide');
  }
  else {
    // 보임 처리
    promotionEl.classList.remove('hide');
  }
})



// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
// 유튜브 영상 앞 둥둥 떠 있는 효과
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션) // https://gsap.com/docs/v3/GSAP/gsap.to()
  gsap.to(selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    { // 옵션
      y: size,
      repeat: -1, // 무한 반복
      yoyo: true,
      ease: Power1.easeInOut, // https://gsap.com/docs/v3/Eases/
      delay: random(0, delay)
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);




// 스크롤하면서 선택자를 추가하여 css 애니메이션 적용 유도
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      // triggerHook 범위 : 뷰포트 상단 0 ~ 하단 1
      triggerHook: .8 // 감시 요소가 뷰포트 기준 0.8 지점까지 올라오면 다음 함수 setClassToggle 호출.
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});



// 올해가 몇년도인가를 추가
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2024