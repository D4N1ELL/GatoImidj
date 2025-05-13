<script>
  import PinCard from './PinCard.svelte';
  
  export let images = [];
  
  // Define columns based on viewport width
  let columns = 5;
  
  // Create array of column heights to track for masonry layout
  $: columnHeights = Array(columns).fill(0);
  
  // Organize images into columns for masonry layout
  $: organizedImages = organizeImages(images, columns);
  
  function organizeImages(imgs, cols) {
    // Reset column heights
    columnHeights = Array(cols).fill(0);
    
    // Create array of columns
    const columnedImages = Array(cols).fill().map(() => []);
    
    // Place each image in the shortest column
    imgs.forEach(img => {
      const shortestColIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columnedImages[shortestColIndex].push(img);
      columnHeights[shortestColIndex] += img.height / img.width;
    });
    
    return columnedImages;
  }
  
  // Recalculate columns on window resize
  function handleResize() {
    const width = window.innerWidth;
    
    if (width < 600) columns = 2;
    else if (width < 900) columns = 3;
    else if (width < 1200) columns = 4;
    else columns = 5;
  }
</script>

<svelte:window on:resize={handleResize} />

<div class="masonry-grid">
  {#each organizedImages as column, colIndex}
    <div class="masonry-column">
      {#each column as image}
        <PinCard {image} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .masonry-grid {
    display: flex;
    width: 100%;
    gap: 1rem;
  }
  
  .masonry-column {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1rem;
  }
</style>