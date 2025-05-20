<script>
    import { likedPins } from '../../stores/likedStore';
    import Masonry from '../../components/Masonry.svelte';
    import { images } from '../../stores/imageStore.js';
    import PinCard from '../../components/PinCard.svelte';
    import { createEventDispatcher } from 'svelte';
    import { page } from '$app/stores';
    import Header from '../../components/Header.svelte';
    import SearchBar from '../../components/SearchBar.svelte';
    import DarkButton from '../../components/DarkModeSwitch.svelte';

    let searchQuery = '';
    $: filteredImages = searchQuery 
        ? $likedPins.filter(img => img.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : $likedPins;

    function handleSearch(event) {
        searchQuery = event.detail;
    }
</script>

<main>

    <Header on:search={handleSearch} />
    
    {#if $likedPins.length === 0}
        <div class="empty-state">
            <div class="heart-icon">
                <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="#cccccc" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </div>
            <p>You haven't liked any pins yet</p>
        </div>
    {:else}
        <div class="pins-grid">
            <Masonry images={$likedPins} />
        </div>
    {/if}
</main>

<style>
    main {
        width: 100%;
        max-width: 1920px;
        margin: 0 auto;
        padding: 20px;
    }
    
    .pins-grid {
        margin-top: 2rem;
    }
    
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 100px 20px;
        text-align: center;
    }
    
    .heart-icon {
        margin-bottom: 16px;
    }
    
    .empty-state p {
        font-size: 18px;
        color: #666;
        margin-bottom: 24px;
    }
    
</style>