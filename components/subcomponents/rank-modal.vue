<template>
    <dialog id="rankModal" class="fixed z-50 left-0 top-0 w-full h-full bg-white/10 items-center justify-center hidden">
        <div class="w-3/5 bg-background-500 text-white rounded-2xl gap-y-6 px-8 py-12 relative">
            <button class="close-btn w-8 h-8 absolute top-2 right-2">
                <span class="bi bi-x-lg"></span>
            </button>
            <h4 class="text-center mb-10">Which movie do you prefer?</h4>
            <div class="flex items-stretch justify-center gap-x-8">
                <div class="h-[335px] bg-gray-500 w-[250px] rounded-2xl relative">
                    <div class="absolute top-1/2 transform -translate-y-1/2 -left-5 px-5 py-2.5 text-center text-sm bg-white text-background-300">
                        #1
                    </div>
                </div>
                <div class="h-[335px] bg-gray-500 w-[250px] rounded-2xl relative">
                    <div class="absolute top-1/2 transform -translate-y-1/2 -left-5 px-5 py-2.5 text-center text-sm bg-white text-background-300">
                        #2
                    </div>
                </div>
            </div>
        </div>
    </dialog>
</template>