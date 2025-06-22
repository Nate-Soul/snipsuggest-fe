<template>
    <header class="py-4 bg-background-500 text-white sticky top-0 border-b border-gray-500">
        <nav class="px-6">
            <div class="flex items-center gap-x-4 justify-between">
                <div class="flex items-center gap-x-2.5">
                    <button class="sidebar-toggler btn btn-md gap-x-2 border border-white rounded-3xl bg-background-400">
                        &lt;
                    </button>
                    <!-- <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                        </li>
                        <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                        </li>
                        <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                        </li>
                        <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                        </li>
                        </ul>
                    </div> -->
                    <form action="#" method="GET">
                        <div class="relative border border-white  rounded-3xl w-100">
                            <input type="search" name="search_query" id="searchQuery" class="h-full w-full bg-transparent rounded-[inherit] py-2.5 px-4" placeholder="Search" />
                            <img src="/media/images/icons/iconamoon_search-thin.svg" alt="" class="absolute top-1/2 transform -translate-y-1/2 right-4" width="16" height="16" />
                        </div>
                    </form>
                </div>
                <div class="flex items-center gap-x-6">
                    <button class="relative">
                        <img src="/media/images/icons/mingcute_notification-fill.svg" height="24" width="24" alt="">
                        <span class="absolute -top-2 -end-2 w-5 h-5 bg-red-500 rounded-full text-xs btn-icon">10</span>
                        <span class="sr-only">Notifications</span>
                    </button>
                    <button class="w-10 h-10 bg-gray-500 rounded-full btn-icon">
                        <img src="/media/images/icons/avatar-default.svg" height="30" width="30" alt=""/>
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>