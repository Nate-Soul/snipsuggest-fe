<template>
    <footer class="bg-background-400 text-white/85 py-14">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
                <div class="flex flex-col gap-y-6">
                    <NuxtLink to="/">
                        <img src="/media/images/logos/logo-dark.png" alt="SnipSuggest" height="44" width="140" />
                    </NuxtLink>
                    <p>Helping you to instantly identify any movie with a snap, sound or line</p>
                    <ul class="flex items-center gap-x-5 text-3xl">
                        <li>
                            <a href="#">
                                <Icon name="tabler:brand-facebook" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Icon name="tabler:brand-linkedin" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Icon name="tabler:brand-x" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Icon name="tabler:brand-tiktok" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col md:items-center">
                    <h6 class="font-semibold mb-4">Quick Links</h6>
                    <ul class="flex flex-col gap-y-2">
                        <li>
                            <a href="/">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/tools">
                                Snip Tools
                            </a>
                        </li>
                        <li>
                            <a href="/#howItWorks">
                                How it Works
                            </a>
                        </li>
                        <li>
                            <a href="/favourites">
                                Favourites
                            </a>
                        </li>
                        <li>
                            <a href="/#faq">
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="hidden lg:flex flex-col items-center">
                    <h6 class="font-semibold mb-4">Features</h6>
                    <ul class="flex flex-col gap-y-2">
                        <li>
                            Audio Recognition
                        </li>
                        <li>
                            Video Frame Splitting
                        </li>
                        <li>
                            Visual Search
                        </li>
                        <li>
                            Text Search
                        </li>
                        <li>
                            Video Clip Search
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col md:items-center">
                    <h6 class="font-semibold mb-4">Company</h6>
                    <ul class="flex flex-col gap-y-2">
                        <li>
                            <a href="/">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/">
                               Our Team
                            </a>
                        </li>
                        <li>
                            <a href="/">
                               Legal
                            </a>
                        </li>
                        <li>
                            <a href="mailto:fuseighthq@gmail.com">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col md:items-center">
                    <h6 class="font-semibold mb-4">Subscribe to our Newsletter</h6>
                    <form action="#" class="flex flex-col gap-y-3">
                        <input type="email" name="news_email" id="newsEmail" class="rounded-2xl bg-transparent border border-white/70 p-2 w-full" placeholder="e.g johndoe@email.com">
                        <button class="btn btn-md btn-primary w-full">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    </footer>
</template>