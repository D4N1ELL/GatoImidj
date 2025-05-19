<script>
  import Header from '../components/Header.svelte';
  import Masonry from '../components/Masonry.svelte';
  import { images } from '../stores/imageStore.js';
  
  // Optional: Add filtering logic here
  let searchQuery = '';
  $: filteredImages = searchQuery 
    ? $images.filter(img => img.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : $images;
    
  function handleSearch(event) {
    searchQuery = event.detail;
  }
</script>

<svelte:head>
  <title>GatoImidj - Explore</title>
</svelte:head>

<main>
  <Header on:search={handleSearch} />
  
  <div class="container">
    <Masonry images={filteredImages} />
  </div>
</main>

<style>
  main {
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .container {
    margin-top: 2rem;
  }
</style>