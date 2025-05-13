<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let searchInput = '';
  
  function handleSubmit() {
    dispatch('search', searchInput);
  }
</script>

<div class="search-container">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input 
        type="text" 
        placeholder="Search..." 
        bind:value={searchInput}
        on:input={handleSubmit}
      />
    </div>
  </form>
</div>

<style>
  .search-container {
    width: 100%;
    max-width: 400px;
  }
  
  .search-box {
    position: relative;
    width: 100%;
  }
  
  input {
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 2rem;
    border-radius: 24px;
    border: 1px solid #ddd;
    font-size: 1rem;
    outline: none;
  }
  
  input:focus {
    border-color: #aaa;
  }
  
  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.9rem;
    color: #777;
  }
</style>