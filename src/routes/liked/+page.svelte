<script>
    import { likedPins } from '../../stores/likedStore';
    import PinCard from '../../components/PinCard.svelte';
</script>

<main>
    <h1>Your Liked Pins</h1>
    
    {#if $likedPins.length === 0}
        <div class="empty-state">
            <div class="heart-icon">
                <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="#cccccc" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </div>
            <p>You haven't liked any pins yet</p>
            <a href="/" class="discover-button">Discover pins</a>
        </div>
    {:else}
        <div class="pins-grid">
            {#each $likedPins as image (image.url)}
                <PinCard {image} />
            {/each}
        </div>
    {/if}
</main>

<style>
    main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }
    
    h1 {
        text-align: center;
        margin-bottom: 32px;
        font-size: 28px;
    }
    
    .pins-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 24px;
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
    
    .discover-button {
        background-color: #ca001e;
        color: white;
        border: none;
        border-radius: 24px;
        padding: 12px 24px;
        font-weight: bold;
        text-decoration: none;
        transition: background-color 0.2s ease;
    }
    
    .discover-button:hover {
        background-color: #a7001a;
    }
</style>