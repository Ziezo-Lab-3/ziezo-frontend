<template>
  <div class="job-tile" :style="{ width: tileWidth + 'px' }">
    <div class="image-with-details" :style="{ width: imageWidth + 'px', height: imageWidth + 'px', borderRadius: borderRadius + 'px' }">
      <div class="image-container">
        <img :src="job.image" alt="Job Image" :style="{ borderRadius: borderRadius + 'px' }" />
      </div>
      <div class="details-container">
        <div class="details-inner">
          <h2>{{ job.name }}</h2>
          <h3>{{ job.description }}</h3>
          <div class="price-and-button">
            <p class="price">€{{ job.price }}/ u</p>
            <button label="Details" @click="showDialog = true" class="p-button-secondary" />
          </div>
        </div>
      </div>
    </div>
    <DialogJobView v-if="showDialog" :job="job" @close-dialog="showDialog = false" />
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import DialogJobView from "../components/DialogJobView.vue";

const showDialog = ref(false);

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
  tileWidth: {
    type: Number,
    default: 300, // default width for the tile
  },
  imageWidth: {
    type: Number,
    default: 280, // default width for the image
  },
  borderRadius: {
    type: Number,
    default: 10, // default border radius for the tile and image
  },
});

</script>
  
  <style>
  .job-tile {
    display: inline-block;
    margin-right: 10px;
    margin-top: 10px;
  }
  
  .image-with-details {
    position: relative;
    overflow: hidden;
    text-align: left;
    margin-bottom: 10px;
  }
  
  .image-container {
    display: inline-block;
    vertical-align: middle; /* Vertically center the image */
  }
  
  .image-container img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .details-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1) inset;
  }
  
  
  .details-inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  
  .details-inner h2,
  .details-inner h3,
  .details-inner p {
    margin-top: 0;
    margin-bottom: 10px;
    text-align: left;
  }
  
  .details-inner .price {
    margin-top: 20px;
    margin-bottom: 0;
    font-weight: bold;
  }
  
  .details-inner .price-and-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .price-and-button .price {
    margin-top: 0;
    color: #689F38;
    font-size: 1.2rem;
  }
  
  .details-inner button {
    border-radius: 30px;
    color: #255586;
    background-color: #fff;
    border: 2px solid #255586;
    padding: 10px 20px;
    font-size: 1.2rem;
  }
  
  .details-inner button:hover {
    background-color: #255586;
    color: #fff;
    border-color: #fff;
    cursor: pointer;
  }
</style>