import { ref, onMounted, onUnmounted, nextTick } from 'vue';

interface UseCarouselScrollOptions {
  scrollAmount?: number;
}

export function useCarouselScroll(carouselId: string, options?: UseCarouselScrollOptions) {
  const carouselRef = ref<HTMLElement | null>(null);
  const prevBtnRef = ref<HTMLButtonElement | null>(null);
  const nextBtnRef = ref<HTMLButtonElement | null>(null);

  const canScrollLeft = ref(false);
  const canScrollRight = ref(false);

  const updateButtonState = () => {
    const carousel = carouselRef.value;
    if (carousel) {
      const tolerance = 1;
      canScrollLeft.value = carousel.scrollLeft > tolerance;
      canScrollRight.value = carousel.scrollLeft < (carousel.scrollWidth - carousel.clientWidth - tolerance);
    }
  };

  // Function to scroll the carousel
  const scrollCarousel = (direction: 'left' | 'right') => {
    const carousel = carouselRef.value;
    if (carousel) {
      const amount = options?.scrollAmount || carousel.clientWidth;
      carousel.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
    }
  };

  // Event handlers for buttons
  const handleNextClick = () => {
    scrollCarousel('right');
  };

  const handlePrevClick = () => {
    scrollCarousel('left');
  };

  onMounted(() => {
    nextTick(() => {
      carouselRef.value = document.querySelector(`#${carouselId}`) as HTMLElement;
      prevBtnRef.value  = document.querySelector(`.overflow-carousel-prev-btn[data-controls='${carouselId}']`) as HTMLButtonElement;
      nextBtnRef.value  = document.querySelector(`.overflow-carousel-next-btn[data-controls='${carouselId}']`) as HTMLButtonElement;

      const carousel = carouselRef.value;
      const prevBtn = prevBtnRef.value;
      const nextBtn = nextBtnRef.value;

      if (carousel && prevBtn && nextBtn) {
        // Attach event listeners
        nextBtn.addEventListener('click', handleNextClick);
        prevBtn.addEventListener('click', handlePrevClick);

        // Listen for scroll events on the carousel itself
        carousel.addEventListener('scroll', updateButtonState);

        // Initial update of button states
        updateButtonState();
      } else {
        console.warn(`Carousel elements for ID '${carouselId}' not found.`);
      }
    });
  });

  onUnmounted(() => {
    const carousel = carouselRef.value;
    const prevBtn = prevBtnRef.value;
    const nextBtn = nextBtnRef.value;

    if (carousel) {
      carousel.removeEventListener('scroll', updateButtonState);
    }
    if (nextBtn) {
      nextBtn.removeEventListener('click', handleNextClick);
    }
    if (prevBtn) {
      prevBtn.removeEventListener('click', handlePrevClick);
    }
  });

  return {
    canScrollLeft,
    canScrollRight,
    scrollCarousel,
  };
}