<script lang="ts" setup>
definePageMeta({
    layout: 'dashboard'
});

const empty = ref(true);
</script>


<template>
    <div class="h-screen w-full flex-center relative z-0 overflow-hidden" v-if="empty">
        <div class="flex flex-col w-1/2 items-center gap-y-5">
            <h1 class="text-4xl">No Favorites Yet!</h1>
            <p>Start adding movies to you list to help us curate suggestions just for you.</p>
            <NuxtLink to="/movies" class="btn btn-lg btn-primary w-max">
                Explore Movies
            </NuxtLink>
        </div>
        <img src="/media/images/icons/popcorn.png" alt="" class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -z-[1]">
        <img src="/media/images/bg/movie-reel-lg.png" alt="" class="absolute left-0 bottom-0 -z-[1]">
    </div>
    <section v-else="empty" class="bg-background-500 text-white px-6 pb-10">
        <div class="flex flex-col gap-y-5">
            <div class="py-3">
                <a href="javascript:history.go(-1)" class="w-10 h-10 inline-flex items-center justify-center text-lg">
                    <span class="bi bi-chevron-left"></span>
                </a>
                <button class="modal-open">Compare Modal</button>
            </div>
            <h1 class="text-2xl font-semibold font-roboto">My Favourites Movies</h1>
            <!-- filters -->
            <ul class="flex items-center flex-wrap gap-x-3 text-sm font-medium text-center">
                <li>
                    <a href="#" class="inline-flex px-5 py-2.5 text-white bg-primary-500 rounded-full active" aria-current="page">All</a>
                </li>
                <li>
                    <a href="#"  class="inline-flex px-5 py-2.5 rounded-full bg-background-300 hover:bg-primary-500">Top 5</a>
                </li>
                <li>
                    <a href="#" class="inline-flex px-5 py-2.5 rounded-full bg-background-300 hover:bg-primary-500">New</a>
                </li>
                <li>
                    <a href="#" class="inline-flex px-5 py-2.5 rounded-full bg-background-300 hover:bg-primary-500">Year <span class="bi bl-chrevron-down"></span></a>
                </li>
                <li>
                    <a href="#" class="inline-flex px-5 py-2.5 text-gray-400 cursor-not-allowed dark:text-gray-500">Category <span class="bi bl-chrevron-down"></span></a>
                </li>
            </ul>
            <!-- ranked cards -->
            <div class="grid grid-cols-3 gap-6">
                <div class="rank-card flex items-center gap-x-4">
                    <a href="#" class="rounded-lg overflow-hidden self-stretch w-[147px] h-[224px] flex-none">
                        <div class="bg-gray-500 h-full w-full"></div>
                    </a>
                    <div class="flex flex-col gap-y-2 text-sm">
                        <a href="#">
                            <h3>Sector (2023)</h3>
                        </a>
                        <div class="flex items-center gap-x-1">
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star text-primary-500">&#9733;</span>
                        </div>
                        <dl class="flex items-center gap-x-2">
                            <dt>MPAA Rating:</dt>
                            <dd>PG</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Duration:</dt>
                            <dd>2hrs 24mins</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Added:</dt>
                            <dd>March 15, 2023</dd>
                        </dl>
                        <div class="flex items-center gap-x-2">
                            <button class="btn btn-sm btn-primary">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                <div class="rank-card flex items-center gap-x-4">
                    <a href="#" class="rounded-lg overflow-hidden self-stretch w-[147px] h-[224px] flex-none">
                        <div class="bg-gray-500 h-full w-full"></div>
                    </a>
                    <div class="flex flex-col gap-y-2 text-sm">
                        <a href="#">
                            <h3>Sector (2023)</h3>
                        </a>
                        <div class="flex items-center gap-x-1">
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star text-primary-500">&#9733;</span>
                        </div>
                        <dl class="flex items-center gap-x-2">
                            <dt>MPAA Rating:</dt>
                            <dd>PG</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Duration:</dt>
                            <dd>2hrs 24mins</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Added:</dt>
                            <dd>March 15, 2023</dd>
                        </dl>
                        <div class="flex items-center gap-x-2">
                            <button class="btn btn-sm btn-primary">
                                D
                            </button>
                            <button class="btn btn-sm bg-background-300 text-white">
                                R
                            </button>
                        </div>
                    </div>
                </div>
                <div class="rank-card flex items-center gap-x-4">
                    <a href="#" class="rounded-lg overflow-hidden self-stretch w-[147px] h-[224px] flex-none">
                        <div class="bg-gray-500 h-full w-full"></div>
                    </a>
                    <div class="flex flex-col gap-y-2 text-sm">
                        <a href="#">
                            <h3>Sector (2023)</h3>
                        </a>
                        <div class="flex items-center gap-x-1">
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star text-primary-500">&#9733;</span>
                        </div>
                        <dl class="flex items-center gap-x-2">
                            <dt>MPAA Rating:</dt>
                            <dd>PG</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Duration:</dt>
                            <dd>2hrs 24mins</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Added:</dt>
                            <dd>March 15, 2023</dd>
                        </dl>
                        <div class="flex items-center gap-x-2">
                            <button class="btn btn-sm btn-primary">
                                D
                            </button>
                            <button class="btn btn-sm bg-background-300 text-white">
                                R
                            </button>
                        </div>
                    </div>
                </div>
                <div class="rank-card flex items-center gap-x-4">
                    <a href="#" class="rounded-lg overflow-hidden self-stretch w-[147px] h-[224px] flex-none">
                        <div class="bg-gray-500 h-full w-full"></div>
                    </a>
                    <div class="flex flex-col gap-y-2 text-sm">
                        <a href="#">
                            <h3>Sector (2023)</h3>
                        </a>
                        <div class="flex items-center gap-x-1">
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star text-primary-500">&#9733;</span>
                        </div>
                        <dl class="flex items-center gap-x-2">
                            <dt>MPAA Rating:</dt>
                            <dd>PG</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Duration:</dt>
                            <dd>2hrs 24mins</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Added:</dt>
                            <dd>March 15, 2023</dd>
                        </dl>
                        <div class="flex items-center gap-x-2">
                            <button class="btn btn-sm btn-primary">
                                D
                            </button>
                            <button class="btn btn-sm bg-background-300 text-white">
                                R
                            </button>
                        </div>
                    </div>
                </div>
                <div class="rank-card flex items-center gap-x-4">
                    <a href="#" class="rounded-lg overflow-hidden self-stretch w-[147px] h-[224px] flex-none">
                        <div class="bg-gray-500 h-full w-full"></div>
                    </a>
                    <div class="flex flex-col gap-y-2 text-sm">
                        <a href="#">
                            <h3>Sector (2023)</h3>
                        </a>
                        <div class="flex items-center gap-x-1">
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star text-primary-500">&#9733;</span>
                        </div>
                        <dl class="flex items-center gap-x-2">
                            <dt>MPAA Rating:</dt>
                            <dd>PG</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Duration:</dt>
                            <dd>2hrs 24mins</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Added:</dt>
                            <dd>March 15, 2023</dd>
                        </dl>
                        <div class="flex items-center gap-x-2">
                            <button class="btn btn-sm btn-primary">
                                D
                            </button>
                            <button class="btn btn-sm bg-background-300 text-white">
                                R
                            </button>
                        </div>
                    </div>
                </div>
                <div class="rank-card flex items-center gap-x-4">
                    <a href="#" class="rounded-lg overflow-hidden self-stretch w-[147px] h-[224px] flex-none">
                        <div class="bg-gray-500 h-full w-full"></div>
                    </a>
                    <div class="flex flex-col gap-y-2 text-sm">
                        <a href="#">
                            <h3>Sector (2023)</h3>
                        </a>
                        <div class="flex items-center gap-x-1">
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star text-primary-500">&#9733;</span>
                        </div>
                        <dl class="flex items-center gap-x-2">
                            <dt>MPAA Rating:</dt>
                            <dd>PG</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Duration:</dt>
                            <dd>2hrs 24mins</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Added:</dt>
                            <dd>March 15, 2023</dd>
                        </dl>
                        <div class="flex items-center gap-x-2">
                            <button class="btn btn-sm btn-primary">
                                D
                            </button>
                            <button class="btn btn-sm bg-background-300 text-white">
                                R
                            </button>
                        </div>
                    </div>
                </div>
                <div class="rank-card flex items-center gap-x-4">
                    <a href="#" class="rounded-lg overflow-hidden self-stretch w-[147px] h-[224px] flex-none">
                        <div class="bg-gray-500 h-full w-full"></div>
                    </a>
                    <div class="flex flex-col gap-y-2 text-sm">
                        <a href="#">
                            <h3>Sector (2023)</h3>
                        </a>
                        <div class="flex items-center gap-x-1">
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star text-primary-500">&#9733;</span>
                        </div>
                        <dl class="flex items-center gap-x-2">
                            <dt>MPAA Rating:</dt>
                            <dd>PG</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Duration:</dt>
                            <dd>2hrs 24mins</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Added:</dt>
                            <dd>March 15, 2023</dd>
                        </dl>
                        <div class="flex items-center gap-x-2">
                            <button class="btn btn-sm btn-primary">
                                D
                            </button>
                            <button class="btn btn-sm bg-background-300 text-white">
                                R
                            </button>
                        </div>
                    </div>
                </div>
                <div class="rank-card flex items-center gap-x-4">
                    <a href="#" class="rounded-lg overflow-hidden self-stretch w-[147px] h-[224px] flex-none">
                        <div class="bg-gray-500 h-full w-full"></div>
                    </a>
                    <div class="flex flex-col gap-y-2 text-sm">
                        <a href="#">
                            <h3>Sector (2023)</h3>
                        </a>
                        <div class="flex items-center gap-x-1">
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star text-primary-500">&#9733;</span>
                        </div>
                        <dl class="flex items-center gap-x-2">
                            <dt>MPAA Rating:</dt>
                            <dd>PG</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Duration:</dt>
                            <dd>2hrs 24mins</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Added:</dt>
                            <dd>March 15, 2023</dd>
                        </dl>
                        <div class="flex items-center gap-x-2">
                            <button class="btn btn-sm btn-primary">
                                D
                            </button>
                            <button class="btn btn-sm bg-background-300 text-white">
                                R
                            </button>
                        </div>
                    </div>
                </div>
                <div class="rank-card flex items-center gap-x-4">
                    <a href="#" class="rounded-lg overflow-hidden self-stretch w-[147px] h-[224px] flex-none">
                        <div class="bg-gray-500 h-full w-full"></div>
                    </a>
                    <div class="flex flex-col gap-y-2 text-sm">
                        <a href="#">
                            <h3>Sector (2023)</h3>
                        </a>
                        <div class="flex items-center gap-x-1">
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star-fill text-primary-500">&#9733;</span>
                            <span class="bi bi-star text-primary-500">&#9733;</span>
                        </div>
                        <dl class="flex items-center gap-x-2">
                            <dt>MPAA Rating:</dt>
                            <dd>PG</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Duration:</dt>
                            <dd>2hrs 24mins</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2">
                            <dt>Added:</dt>
                            <dd>March 15, 2023</dd>
                        </dl>
                        <div class="flex items-center gap-x-2">
                            <button class="btn btn-sm btn-primary">
                                D
                            </button>
                            <button class="btn btn-sm bg-background-300 text-white">
                                R
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Pagination -->
            <div class="mt-10 flex items-center justify-between">
                <!-- Help text -->
                <span class="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span class="font-semibold text-gray-900 dark:text-white">1</span> to <span class="font-semibold text-gray-900 dark:text-white">9</span> of <span class="font-semibold text-gray-900 dark:text-white">100</span> Entries
                </span>
                <div class="inline-flex items-center gap-x-4">
                <!-- Buttons -->
                    <button class="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium text-white bg-transparent border hover:border-transparent hover:bg-primary-500" title="Previous">
                        <svg class="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        <span class="sr-only">Previous</span>
                    </button>
                    <button class="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium text-white bg-transparent border hover:border-transparent hover:bg-primary-500" title="Next">
                        <svg class="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        <span class="sr-only">Next</span>
                    </button>
                </div>
                <div class="flex items-center gap-x-2">
                    <span>Go to page</span>
                    <input type="number" class="border border-gray-500 w-16 h-8 rounded-lg px-1.5" min="1" max="11">
                </div>
            </div>
        </div>
    </section>
</template>