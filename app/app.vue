<template>
  <div class="flex flex-col min-h-screen">
    <!-- <Navbar /> -->
     <TopBanner />
  
    <main class="w-full overflow-x-hidden">
      <NuxtPage />
    </main>

    <div class="fixed top-4 right-4 z-50">
      <UColorModeButton />
    </div>
    
    <footer class="bottom-0 w-full mt-3 py-6 max-md:hidden">
      <p class="text-center px-4">Tip: Add missing keywords naturally</p>
    </footer>
  </div>
</template>
