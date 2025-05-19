import { writable } from 'svelte/store';

// Initialize store with data from localStorage if available
const storedLikes = typeof localStorage !== 'undefined' && localStorage.getItem('likedPins') 
    ? JSON.parse(localStorage.getItem('likedPins')) 
    : [];

export const likedPins = writable(storedLikes);

// Subscribe to changes and update localStorage
if (typeof localStorage !== 'undefined') {
    likedPins.subscribe(value => {
        localStorage.setItem('likedPins', JSON.stringify(value));
    });
}

// Helper functions to manipulate liked pins
export function toggleLike(pin) {
    likedPins.update(pins => {
        const index = pins.findIndex(p => p.url === pin.url);
        
        if (index !== -1) {
            // Remove from liked pins
            return pins.filter(p => p.url !== pin.url);
        } else {
            // Add to liked pins
            return [...pins, pin];
        }
    });
}

export function isLiked(imageUrl) {
    let result = false;
    const unsubscribe = likedPins.subscribe(pins => {
        result = pins.some(pin => pin.url === imageUrl);
    });
    unsubscribe();
    return result;
}