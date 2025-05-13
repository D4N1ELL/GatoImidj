import { writable } from 'svelte/store';

// This is where you'll import and manage your local images
// For now, we'll create some sample data

// Helper function to create path to local images
// @ts-ignore
function getImagePath(filename) {
  return `catmemes/${filename}`;
}

// Sample image data
const sampleImages = [
  {
    id: 1,
    title: "Cat meme 1",
    url: getImagePath("meme1.png"),
    width: 800,
    height: 1200,
    user: "Nature Lover"
  },
  {
    id: 2,
    title: "Cozy Interior",
    url: getImagePath("interior.jpg"),
    width: 1000,
    height: 800,
    user: "Home Decor"
  },
  {
    id: 3,
    title: "Healthy Breakfast",
    url: getImagePath("breakfast.jpg"),
    width: 900,
    height: 1100,
    user: "FoodieLife"
  },
  {
    id: 4,
    title: "Urban Photography",
    url: getImagePath("urban.jpg"),
    width: 1200,
    height: 800,
    user: "CityScapes"
  },
  {
    id: 5,
    title: "Digital Art Creation",
    url: getImagePath("art.jpg"),
    width: 800,
    height: 800,
    user: "DigitalArtist"
  },
  {
    id: 6,
    title: "Travel Memories",
    url: getImagePath("travel.jpg"),
    width: 1000,
    height: 1500,
    user: "Wanderlust"
  },
  {
    id: 7,
    title: "Minimalist Design",
    url: getImagePath("design.jpg"),
    width: 900,
    height: 700,
    user: "MinimalismArt"
  },
  {
    id: 8,
    title: "Tech Workspace",
    url: getImagePath("workspace.jpg"),
    width: 1100,
    height: 900,
    user: "TechEnthusiast"
  },
  {
    id: 9,
    title: "Sunset View",
    url: getImagePath("sunset.jpg"),
    width: 800,
    height: 1000,
    user: "SkyViewer"
  },
  {
    id: 10,
    title: "Plant Collection",
    url: getImagePath("plants.jpg"),
    width: 700,
    height: 1100,
    user: "PlantLover"
  },
  {
    id: 11,
    title: "Coffee Art",
    url: getImagePath("coffee.jpg"),
    width: 800,
    height: 900,
    user: "CoffeeLover"
  },
  {
    id: 12,
    title: "Book Corner",
    url: getImagePath("books.jpg"),
    width: 900,
    height: 1200,
    user: "BookWorm"
  },
];

// Create a writable store with the sample data
export const images = writable(sampleImages);

// Function to add a new image
// @ts-ignore
export function addImage(image) {
  images.update(imgs => [...imgs, {...image, id: imgs.length + 1}]);
}

// Function to remove an image
// @ts-ignore
export function removeImage(id) {
  images.update(imgs => imgs.filter(img => img.id !== id));
}

// Function to filter images by tag or category (optional enhancement)
// export function filterByTag(tag) {
//   return get(images).filter(img => img.tags && img.tags.includes(tag));
// }