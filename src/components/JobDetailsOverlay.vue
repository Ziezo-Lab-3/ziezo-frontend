<template>
    <div class="overlay-wrapper">
      <div class="overlay">
        <div class="overlay-content">
          <img :src="job.image" alt="Job Image" :style="{ borderRadius: borderRadius + 'px' }" />
        </div>
        <div class="overlay-content">
          <div class="close-button" @click="closeOverlay">×</div>
          <h1>{{ job.name }}</h1>
          <h3>{{ job.description }}</h3>
          <p>Price: €{{ job.price }}/ u</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      job: {
        type: Object,
        required: true,
      },
      borderRadius: {
        type: Number,
        default: 10, // default border radius for the image
      },
    },
    methods: {
      closeOverlay() {
        this.$emit("close-overlay");
      },
    },
  };
  </script>
  
  <style scoped>
  .overlay-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .overlay {
    position: relative;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    display: flex;
    max-width: 80%;
  }
  
  .overlay-content {
    flex-basis: 50%;
  }
  
  .overlay-content:first-child img {
    width: 100%;
    height: auto;
  }
  
  .overlay-content:last-child {
    padding-left: 20px;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .overlay-wrapper::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  </style>
  